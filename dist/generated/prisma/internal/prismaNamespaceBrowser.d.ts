import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly EventTypes: "EventTypes";
    readonly AvailabilityRule: "AvailabilityRule";
    readonly AvailabilityException: "AvailabilityException";
    readonly Slot: "Slot";
    readonly Booking: "Booking";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly Email: "Email";
    readonly name: "name";
    readonly slug: "slug";
    readonly timezone: "timezone";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const EventTypesScalarFieldEnum: {
    readonly id: "id";
    readonly hostId: "hostId";
    readonly title: "title";
    readonly description: "description";
    readonly slug: "slug";
    readonly locationType: "locationType";
    readonly locationValue: "locationValue";
    readonly durationMin: "durationMin";
    readonly isActive: "isActive";
    readonly bufferBeforeMin: "bufferBeforeMin";
    readonly bufferAfterMin: "bufferAfterMin";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type EventTypesScalarFieldEnum = (typeof EventTypesScalarFieldEnum)[keyof typeof EventTypesScalarFieldEnum];
export declare const AvailabilityRuleScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly weekday: "weekday";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly isActive: "isActive";
    readonly timezone: "timezone";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AvailabilityRuleScalarFieldEnum = (typeof AvailabilityRuleScalarFieldEnum)[keyof typeof AvailabilityRuleScalarFieldEnum];
export declare const AvailabilityExceptionScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly date: "date";
    readonly type: "type";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly timezone: "timezone";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AvailabilityExceptionScalarFieldEnum = (typeof AvailabilityExceptionScalarFieldEnum)[keyof typeof AvailabilityExceptionScalarFieldEnum];
export declare const SlotScalarFieldEnum: {
    readonly id: "id";
    readonly hostId: "hostId";
    readonly eventTypeId: "eventTypeId";
    readonly startAt: "startAt";
    readonly endAt: "endAt";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SlotScalarFieldEnum = (typeof SlotScalarFieldEnum)[keyof typeof SlotScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly hostId: "hostId";
    readonly eventTypeId: "eventTypeId";
    readonly slotId: "slotId";
    readonly inviteeEmail: "inviteeEmail";
    readonly inviteeNote: "inviteeNote";
    readonly inviteeName: "inviteeName";
    readonly status: "status";
    readonly meetLink: "meetLink";
    readonly calenderEventId: "calenderEventId";
    readonly cancelledAt: "cancelledAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map