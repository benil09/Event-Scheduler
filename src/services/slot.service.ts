import { prisma } from "../config/database.js"
import { DateTime } from "luxon"
import { SLOT_GENERATION_DAYS } from "../config/env.js";
import { findExceptionByUserInRange, getActiveAvailabilityRulesByUser } from "../repositories/availabilityRule.repository.js";
import { getAllBookedSlotsByHostInRangeRepo } from "../repositories/slots.repository.js";
import { findActiveEventTypesByHost } from "../repositories/event-type.repository.js";
import { applyExceptionsForDate, overlapsBooked, splitIntoSlots, TimeWindow, windowsForWeekdayRule } from "./slot-generation.service.js";

export interface RegenerateHostSlotInput{
    hostId : number,
    from? : string, // YYYY-MM-DD
    to?: string // YYYY-MM-DD
}


export async function regenerateHostSlots(input:RegenerateHostSlotInput){
    const host = await prisma.user.findUnique({where:{ id:input.hostId }})
    if(!host) return;

    const from = input.from 
        ? DateTime.fromISO(input.from,{zone:'utc'}).startOf('day')
        : DateTime.now().startOf('day')

    const to = input.to 
        ? DateTime.fromISO(input.to,{zone:'utc'}).endOf('day') 
        : from.plus({days:SLOT_GENERATION_DAYS}).endOf('day');

    
    //Best Part
    const [rules,exceptions,EventTypes,bookedSlots] = await Promise.all([
        getActiveAvailabilityRulesByUser(input.hostId),
        findExceptionByUserInRange(input.hostId,from.toJSDate(),to.toJSDate()),
        findActiveEventTypesByHost(input.hostId),
        getAllBookedSlotsByHostInRangeRepo(input.hostId,from.toJSDate(),to.toJSDate())
    ]) 
    
    // convert booked slots into the time window -> compatible with luxon
    const bookedWindows:TimeWindow[] = bookedSlots.map((slot)=> {
        return {
            start: DateTime.fromJSDate(slot.startAt).startOf('minute'),
            end: DateTime.fromJSDate(slot.endAt).endOf('minute')
        }
    })

    for(const event of EventTypes){
        const generatedValidSlotKeys = new Set<string>(); 
        for(const cursor = from ; cursor <= to ; cursor.plus({days:1})){
            const dateKey = cursor.toISODate();
            const dayException = exceptions.filter((ex)=>DateTime.fromJSDate(ex.date,{zone:'utc'}).toISODate() === dateKey)
            const dayExceptionWithTimeZone = dayException.map((ex)=>{
                return{
                    type:ex.type,
                    startTime:ex.startTime,
                    endTime:ex.endTime,
                    timeZone:ex.timezone,
                }
            })


            // this variable is used to store the window of the  
            let window:TimeWindow[]= [];
            for(const rule of rules){
                window.push(...windowsForWeekdayRule(cursor , rule.weekday , rule.startTime , rule.endTime , host.timezone))
            }
            // apply exceptions to the window
            window = applyExceptionsForDate(cursor ,window ,dayExceptionWithTimeZone ) 

            // create slots
            const slots = splitIntoSlots(window ,event.durationMin ,event.bufferBeforeMin , event.bufferAfterMin ) 
                .filter((slot)=> slot.start > DateTime.utc() && !overlapsBooked(slot , bookedWindows , event.bufferBeforeMin , event.bufferAfterMin  ) )

            for(const slot of slots){
                const startAt = slot.start.toUTC().toJSDate();
                const endAt = slot.end.toUTC().toJSDate();

                const key = `${event.id}|${startAt.toISOString()}|${endAt.toISOString()}`;

                generatedValidSlotKeys.add(key);

                await prisma.slot.upsert({
                    where: {
                        eventTypeId_startAt_endAt: {
                            eventTypeId: event.id,
                            startAt,
                            endAt,
                        }
                    },
                    create: {
                        hostId: input.hostId,
                        eventTypeId: event.id,
                        startAt,
                        endAt,
                        status: 'AVAILABLE',
                    },
                    update: {
                        status: 'AVAILABLE',
                    }
                })

                
            }
            
        }

        const futureSlots = await prisma.slot.findMany({
            where:{
                eventTypeId:event.id,
                startAt:{ gte:from.toJSDate() },
                status:{ in : ["BOOKED","BLOCKED"]}
            }
        })

        const existingSlots = new Set<string>();

        for(const slot of futureSlots){
            const key = `${slot.eventTypeId}|${slot.startAt.toISOString()}|${slot.endAt.toISOString()}`;
            if(!generatedValidSlotKeys.has(key)){
                // this slot is no longer valid
                await prisma.slot.update({
                    where:{ id:slot.id },
                    data:{ status:'BLOCKED' }
                })
            }
            existingSlots.add(key);
        }
        }

}