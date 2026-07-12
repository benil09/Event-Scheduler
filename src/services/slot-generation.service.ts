import { DateTime, Interval } from "luxon";
export interface TimeWindow {
    start: DateTime;
    end: DateTime;
}

/**
 * Given the time and date we will return absolute DateTime object in Host's timezone
 * 
 * 
 * Input:
 * time : "09:30"
 * date : "2026-01-01"
 * timezone : "UTC"
 * 
 * output : "2026-01-01T09:30:00Z"
 */

export  function parseTimeOnDate(date:DateTime , time:string , timezone:string){
    const [hour,minute] = time.split(":").map(Number)

    return date.setZone(timezone).set({
        hour,
        minute,
        second:0,
        millisecond:0
    })
}

/**
 * [{09:00 - 12:00},{11:00-16:00}] => [{09:00-16:00}]
 * [{09:00 - 12:00},{14:00 - 16:00}] =>  [ {09:00, 12:00} , { 14:00, 17:00 } ]
 */


export  function mergeWindows(windows:TimeWindow[]):TimeWindow[]{ 
    if(windows.length == 0 ) return [];

    const sorted = [...windows].sort((a,b)=> a.start.toMillis() - b.start.toMillis()) // sorting acording to start time 

    const mergedResult : TimeWindow[] = [sorted[0]];

    for(let i = 0 ; i < sorted.length ; i++){
        const current = sorted[i];
        const last = mergedResult[mergedResult.length -1];

        if(current.start <= last.end){
            last.end = current.end > last.end ? current.end : last.end;
        }else{
            mergedResult.push(current);
        }
    }

    return mergedResult;
}

// this function created the slots according to  total time windows
// example : time window [09:00-17:00] and duration is 30 minutes
// then it will create slots of 30 minutes
export function splitIntoSlots(windows:TimeWindow[], durationInMinutes:number , bufferBeforeMinutes:number , bufferAfterMinutes:number ): TimeWindow[]{
            
    const slots : TimeWindow[] = [];

    const totalMinutes = bufferBeforeMinutes + durationInMinutes + bufferAfterMinutes;

    for(const window of windows){
        let cursor = window.start

        while(cursor.plus({minutes:totalMinutes}) <= window.end ){
            const slotStart = cursor.plus({minutes:bufferBeforeMinutes})
            const slotEnd = slotStart.plus({minutes:durationInMinutes})

            slots.push({start : slotStart , end : slotEnd })
            cursor = cursor.plus({ minutes: durationInMinutes });
        }

    }   
    return slots;
}

// this function is used to create window by subtracting the window with block interval
// suppose windows = [09:00-17:00] and block = [12:00-13:00]
// then it will return [{start:09:00 , end:12:00} , {start:13:00 , end:17:00}]
export function subtractWindows(windows:TimeWindow[],block:TimeWindow):TimeWindow[]{
        const result :TimeWindow[] = [];

        for(const window of windows ){
            //Luxon has an Interval class. Instead of manually checking, Does A overlap B? Luxon already knows how.
            const interval = Interval.fromDateTimes(window.start,window.end)
            const blockIntervals = Interval.fromDateTimes(block.start,block.end)

            if(!interval.overlaps(blockIntervals)){
                result.push(window);
                continue;
            } else {
                if(block.start > window.start){
                    result.push({start:window.start , end:block.start})
                }

                if(block.end < window.end){
                    result.push({start:block.end , end:window.end})
                }
            }
        }
        return result.filter(win=>win.start <= win.end); // drop zero length interval
}   

//Its entire job is to answer one simple question: “Can this slot still be booked?”If the answer is No, don’t show it.
export function overlapsBooked(slot:TimeWindow,bookedSlots:TimeWindow[],bufferBeforeMinutes:number , bufferAfterMinutes:number):boolean{
    const paddedStart = slot.start.minus({minutes:bufferBeforeMinutes})
    const paddedEnd = slot.end.plus({minutes:bufferAfterMinutes})


    return bookedSlots.some((booked)=>{
        const  interval = Interval.fromDateTimes(paddedStart,paddedEnd)
        const  bookedInterval = Interval.fromDateTimes(booked.start,booked.end)

        return interval.overlaps(bookedInterval);
    }
    );
}           

export function applyExceptionsForDate(date:DateTime , baseWindows:TimeWindow[] , exceptions:Array<{type:string ,startTime:string | null  , endTime:string | null ,timeZone: string }> ): TimeWindow[]{
    let windows = [... baseWindows]

    for(const ex of exceptions){
        if(ex.type === "BLOCK_FULL_DAY" ){
            return []; // no slots for this date
        }

        if(ex.type === "BLOCK_PARTIAL" && ex.startTime && ex.endTime){
            const block = {
                start : parseTimeOnDate(date , ex.startTime ,ex.timeZone),
                end : parseTimeOnDate(date , ex.endTime,ex.timeZone)
            }

            windows = subtractWindows(windows,block); 
        }

        if(ex.type === "ADD_AVAILABLE_WINDOW" && ex.startTime && ex.endTime){
            windows.push({
                start : parseTimeOnDate(date,ex.startTime,ex.timeZone),
                end : parseTimeOnDate(date , ex.endTime, ex.timeZone )
            })
        }
    }
    return mergeWindows(windows);
}

export function windowsForWeekdayRule(date:DateTime , weekday:number , startTime:string , endTime:string , timeZone : string ):TimeWindow[]{
    const localDate = date.setZone(timeZone).startOf('day')
    const luxonWeekday = weekday === 0 ? 7 : weekday;

    if(date.weekday !== luxonWeekday) return [];

    const start = parseTimeOnDate(localDate , startTime , timeZone);
    const end = parseTimeOnDate(localDate , endTime , timeZone);

    if(!start.isValid && !end.isValid && start >= end) return [];
    
    return [{start , end}]
}