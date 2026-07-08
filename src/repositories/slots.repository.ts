import { prisma } from "../config/database.js";

export async function getAllBookedSlotsByHostInRangeRepo(hostId:number,startDate: Date,endDate: Date){
    return prisma.slot.findMany({
        where:{
            hostId,
            startAt:{
                gte:startDate,
                lte:endDate
            },status:"BOOKED"            
        }
    })
}