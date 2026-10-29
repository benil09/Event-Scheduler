import { DateTime } from "luxon";
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
export declare function parseTimeOnDate(date: DateTime, time: string, timezone: string): DateTime<true> | DateTime<false>;
/**
 * [{09:00 - 12:00},{11:00-16:00}] => [{09:00-16:00}]
 * [{09:00 - 12:00},{14:00 - 16:00}] =>  [ {09:00, 12:00} , { 14:00, 17:00 } ]
 */
export declare function mergeWindows(windows: TimeWindow[]): TimeWindow[];
export declare function splitIntoSlots(windows: TimeWindow[], durationInMinutes: number, bufferBeforeMinutes: number, bufferAfterMinutes: number): TimeWindow[];
export declare function subtractWindows(windows: TimeWindow[], block: TimeWindow): TimeWindow[];
export declare function overlapsBooked(slot: TimeWindow, bookedSlots: TimeWindow[], bufferBeforeMinutes: number, bufferAfterMinutes: number): boolean;
export declare function applyExceptionsForDate(date: DateTime, baseWindows: TimeWindow[], exceptions: Array<{
    type: string;
    startTime: string | null;
    endTime: string | null;
    timeZone: string;
}>): TimeWindow[];
export declare function windowsForWeekdayRule(date: DateTime, weekday: number, startTime: string, endTime: string, timeZone: string): TimeWindow[];
//# sourceMappingURL=slot-generation.service.d.ts.map