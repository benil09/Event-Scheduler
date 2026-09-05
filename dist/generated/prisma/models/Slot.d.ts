import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model Slot
 *
 */
export type SlotModel = runtime.Types.Result.DefaultSelection<Prisma.$SlotPayload>;
export type AggregateSlot = {
    _count: SlotCountAggregateOutputType | null;
    _avg: SlotAvgAggregateOutputType | null;
    _sum: SlotSumAggregateOutputType | null;
    _min: SlotMinAggregateOutputType | null;
    _max: SlotMaxAggregateOutputType | null;
};
export type SlotAvgAggregateOutputType = {
    hostId: number | null;
    eventTypeId: number | null;
};
export type SlotSumAggregateOutputType = {
    hostId: number | null;
    eventTypeId: number | null;
};
export type SlotMinAggregateOutputType = {
    id: string | null;
    hostId: number | null;
    eventTypeId: number | null;
    startAt: Date | null;
    endAt: Date | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SlotMaxAggregateOutputType = {
    id: string | null;
    hostId: number | null;
    eventTypeId: number | null;
    startAt: Date | null;
    endAt: Date | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SlotCountAggregateOutputType = {
    id: number;
    hostId: number;
    eventTypeId: number;
    startAt: number;
    endAt: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SlotAvgAggregateInputType = {
    hostId?: true;
    eventTypeId?: true;
};
export type SlotSumAggregateInputType = {
    hostId?: true;
    eventTypeId?: true;
};
export type SlotMinAggregateInputType = {
    id?: true;
    hostId?: true;
    eventTypeId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SlotMaxAggregateInputType = {
    id?: true;
    hostId?: true;
    eventTypeId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SlotCountAggregateInputType = {
    id?: true;
    hostId?: true;
    eventTypeId?: true;
    startAt?: true;
    endAt?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SlotAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Slot to aggregate.
     */
    where?: Prisma.SlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Slots to fetch.
     */
    orderBy?: Prisma.SlotOrderByWithRelationInput | Prisma.SlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Slots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Slots
    **/
    _count?: true | SlotCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SlotAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SlotSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SlotMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SlotMaxAggregateInputType;
};
export type GetSlotAggregateType<T extends SlotAggregateArgs> = {
    [P in keyof T & keyof AggregateSlot]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSlot[P]> : Prisma.GetScalarType<T[P], AggregateSlot[P]>;
};
export type SlotGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotWhereInput;
    orderBy?: Prisma.SlotOrderByWithAggregationInput | Prisma.SlotOrderByWithAggregationInput[];
    by: Prisma.SlotScalarFieldEnum[] | Prisma.SlotScalarFieldEnum;
    having?: Prisma.SlotScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SlotCountAggregateInputType | true;
    _avg?: SlotAvgAggregateInputType;
    _sum?: SlotSumAggregateInputType;
    _min?: SlotMinAggregateInputType;
    _max?: SlotMaxAggregateInputType;
};
export type SlotGroupByOutputType = {
    id: string;
    hostId: number;
    eventTypeId: number;
    startAt: Date;
    endAt: Date;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    _count: SlotCountAggregateOutputType | null;
    _avg: SlotAvgAggregateOutputType | null;
    _sum: SlotSumAggregateOutputType | null;
    _min: SlotMinAggregateOutputType | null;
    _max: SlotMaxAggregateOutputType | null;
};
export type GetSlotGroupByPayload<T extends SlotGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SlotGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SlotGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SlotGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SlotGroupByOutputType[P]>;
}>>;
export type SlotWhereInput = {
    AND?: Prisma.SlotWhereInput | Prisma.SlotWhereInput[];
    OR?: Prisma.SlotWhereInput[];
    NOT?: Prisma.SlotWhereInput | Prisma.SlotWhereInput[];
    id?: Prisma.StringFilter<"Slot"> | string;
    hostId?: Prisma.IntFilter<"Slot"> | number;
    eventTypeId?: Prisma.IntFilter<"Slot"> | number;
    startAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    status?: Prisma.StringFilter<"Slot"> | string;
    createdAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    eventType?: Prisma.XOR<Prisma.EventTypesScalarRelationFilter, Prisma.EventTypesWhereInput>;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    Bookings?: Prisma.BookingListRelationFilter;
};
export type SlotOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    eventType?: Prisma.EventTypesOrderByWithRelationInput;
    host?: Prisma.UserOrderByWithRelationInput;
    Bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type SlotWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    eventTypeId_startAt_endAt?: Prisma.SlotEventTypeIdStartAtEndAtCompoundUniqueInput;
    AND?: Prisma.SlotWhereInput | Prisma.SlotWhereInput[];
    OR?: Prisma.SlotWhereInput[];
    NOT?: Prisma.SlotWhereInput | Prisma.SlotWhereInput[];
    hostId?: Prisma.IntFilter<"Slot"> | number;
    eventTypeId?: Prisma.IntFilter<"Slot"> | number;
    startAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    status?: Prisma.StringFilter<"Slot"> | string;
    createdAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    eventType?: Prisma.XOR<Prisma.EventTypesScalarRelationFilter, Prisma.EventTypesWhereInput>;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    Bookings?: Prisma.BookingListRelationFilter;
}, "id" | "eventTypeId_startAt_endAt">;
export type SlotOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SlotCountOrderByAggregateInput;
    _avg?: Prisma.SlotAvgOrderByAggregateInput;
    _max?: Prisma.SlotMaxOrderByAggregateInput;
    _min?: Prisma.SlotMinOrderByAggregateInput;
    _sum?: Prisma.SlotSumOrderByAggregateInput;
};
export type SlotScalarWhereWithAggregatesInput = {
    AND?: Prisma.SlotScalarWhereWithAggregatesInput | Prisma.SlotScalarWhereWithAggregatesInput[];
    OR?: Prisma.SlotScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SlotScalarWhereWithAggregatesInput | Prisma.SlotScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Slot"> | string;
    hostId?: Prisma.IntWithAggregatesFilter<"Slot"> | number;
    eventTypeId?: Prisma.IntWithAggregatesFilter<"Slot"> | number;
    startAt?: Prisma.DateTimeWithAggregatesFilter<"Slot"> | Date | string;
    endAt?: Prisma.DateTimeWithAggregatesFilter<"Slot"> | Date | string;
    status?: Prisma.StringWithAggregatesFilter<"Slot"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Slot"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Slot"> | Date | string;
};
export type SlotCreateInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    eventType: Prisma.EventTypesCreateNestedOneWithoutSlotsInput;
    host: Prisma.UserCreateNestedOneWithoutSlotsInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type SlotUncheckedCreateInput = {
    id?: string;
    hostId: number;
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type SlotUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventType?: Prisma.EventTypesUpdateOneRequiredWithoutSlotsNestedInput;
    host?: Prisma.UserUpdateOneRequiredWithoutSlotsNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type SlotUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    eventTypeId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type SlotCreateManyInput = {
    id?: string;
    hostId: number;
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SlotUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    eventTypeId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotListRelationFilter = {
    every?: Prisma.SlotWhereInput;
    some?: Prisma.SlotWhereInput;
    none?: Prisma.SlotWhereInput;
};
export type SlotOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SlotEventTypeIdStartAtEndAtCompoundUniqueInput = {
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
};
export type SlotCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SlotAvgOrderByAggregateInput = {
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
};
export type SlotMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SlotMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
    startAt?: Prisma.SortOrder;
    endAt?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SlotSumOrderByAggregateInput = {
    hostId?: Prisma.SortOrder;
    eventTypeId?: Prisma.SortOrder;
};
export type SlotScalarRelationFilter = {
    is?: Prisma.SlotWhereInput;
    isNot?: Prisma.SlotWhereInput;
};
export type SlotCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput> | Prisma.SlotCreateWithoutHostInput[] | Prisma.SlotUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutHostInput | Prisma.SlotCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.SlotCreateManyHostInputEnvelope;
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
};
export type SlotUncheckedCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput> | Prisma.SlotCreateWithoutHostInput[] | Prisma.SlotUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutHostInput | Prisma.SlotCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.SlotCreateManyHostInputEnvelope;
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
};
export type SlotUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput> | Prisma.SlotCreateWithoutHostInput[] | Prisma.SlotUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutHostInput | Prisma.SlotCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.SlotUpsertWithWhereUniqueWithoutHostInput | Prisma.SlotUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.SlotCreateManyHostInputEnvelope;
    set?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    disconnect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    delete?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    update?: Prisma.SlotUpdateWithWhereUniqueWithoutHostInput | Prisma.SlotUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.SlotUpdateManyWithWhereWithoutHostInput | Prisma.SlotUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
};
export type SlotUncheckedUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput> | Prisma.SlotCreateWithoutHostInput[] | Prisma.SlotUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutHostInput | Prisma.SlotCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.SlotUpsertWithWhereUniqueWithoutHostInput | Prisma.SlotUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.SlotCreateManyHostInputEnvelope;
    set?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    disconnect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    delete?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    update?: Prisma.SlotUpdateWithWhereUniqueWithoutHostInput | Prisma.SlotUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.SlotUpdateManyWithWhereWithoutHostInput | Prisma.SlotUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
};
export type SlotCreateNestedManyWithoutEventTypeInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput> | Prisma.SlotCreateWithoutEventTypeInput[] | Prisma.SlotUncheckedCreateWithoutEventTypeInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutEventTypeInput | Prisma.SlotCreateOrConnectWithoutEventTypeInput[];
    createMany?: Prisma.SlotCreateManyEventTypeInputEnvelope;
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
};
export type SlotUncheckedCreateNestedManyWithoutEventTypeInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput> | Prisma.SlotCreateWithoutEventTypeInput[] | Prisma.SlotUncheckedCreateWithoutEventTypeInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutEventTypeInput | Prisma.SlotCreateOrConnectWithoutEventTypeInput[];
    createMany?: Prisma.SlotCreateManyEventTypeInputEnvelope;
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
};
export type SlotUpdateManyWithoutEventTypeNestedInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput> | Prisma.SlotCreateWithoutEventTypeInput[] | Prisma.SlotUncheckedCreateWithoutEventTypeInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutEventTypeInput | Prisma.SlotCreateOrConnectWithoutEventTypeInput[];
    upsert?: Prisma.SlotUpsertWithWhereUniqueWithoutEventTypeInput | Prisma.SlotUpsertWithWhereUniqueWithoutEventTypeInput[];
    createMany?: Prisma.SlotCreateManyEventTypeInputEnvelope;
    set?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    disconnect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    delete?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    update?: Prisma.SlotUpdateWithWhereUniqueWithoutEventTypeInput | Prisma.SlotUpdateWithWhereUniqueWithoutEventTypeInput[];
    updateMany?: Prisma.SlotUpdateManyWithWhereWithoutEventTypeInput | Prisma.SlotUpdateManyWithWhereWithoutEventTypeInput[];
    deleteMany?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
};
export type SlotUncheckedUpdateManyWithoutEventTypeNestedInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput> | Prisma.SlotCreateWithoutEventTypeInput[] | Prisma.SlotUncheckedCreateWithoutEventTypeInput[];
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutEventTypeInput | Prisma.SlotCreateOrConnectWithoutEventTypeInput[];
    upsert?: Prisma.SlotUpsertWithWhereUniqueWithoutEventTypeInput | Prisma.SlotUpsertWithWhereUniqueWithoutEventTypeInput[];
    createMany?: Prisma.SlotCreateManyEventTypeInputEnvelope;
    set?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    disconnect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    delete?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    connect?: Prisma.SlotWhereUniqueInput | Prisma.SlotWhereUniqueInput[];
    update?: Prisma.SlotUpdateWithWhereUniqueWithoutEventTypeInput | Prisma.SlotUpdateWithWhereUniqueWithoutEventTypeInput[];
    updateMany?: Prisma.SlotUpdateManyWithWhereWithoutEventTypeInput | Prisma.SlotUpdateManyWithWhereWithoutEventTypeInput[];
    deleteMany?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
};
export type SlotCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutBookingsInput, Prisma.SlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.SlotWhereUniqueInput;
};
export type SlotUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.SlotCreateWithoutBookingsInput, Prisma.SlotUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.SlotCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.SlotUpsertWithoutBookingsInput;
    connect?: Prisma.SlotWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SlotUpdateToOneWithWhereWithoutBookingsInput, Prisma.SlotUpdateWithoutBookingsInput>, Prisma.SlotUncheckedUpdateWithoutBookingsInput>;
};
export type SlotCreateWithoutHostInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    eventType: Prisma.EventTypesCreateNestedOneWithoutSlotsInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type SlotUncheckedCreateWithoutHostInput = {
    id?: string;
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type SlotCreateOrConnectWithoutHostInput = {
    where: Prisma.SlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput>;
};
export type SlotCreateManyHostInputEnvelope = {
    data: Prisma.SlotCreateManyHostInput | Prisma.SlotCreateManyHostInput[];
    skipDuplicates?: boolean;
};
export type SlotUpsertWithWhereUniqueWithoutHostInput = {
    where: Prisma.SlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.SlotUpdateWithoutHostInput, Prisma.SlotUncheckedUpdateWithoutHostInput>;
    create: Prisma.XOR<Prisma.SlotCreateWithoutHostInput, Prisma.SlotUncheckedCreateWithoutHostInput>;
};
export type SlotUpdateWithWhereUniqueWithoutHostInput = {
    where: Prisma.SlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.SlotUpdateWithoutHostInput, Prisma.SlotUncheckedUpdateWithoutHostInput>;
};
export type SlotUpdateManyWithWhereWithoutHostInput = {
    where: Prisma.SlotScalarWhereInput;
    data: Prisma.XOR<Prisma.SlotUpdateManyMutationInput, Prisma.SlotUncheckedUpdateManyWithoutHostInput>;
};
export type SlotScalarWhereInput = {
    AND?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
    OR?: Prisma.SlotScalarWhereInput[];
    NOT?: Prisma.SlotScalarWhereInput | Prisma.SlotScalarWhereInput[];
    id?: Prisma.StringFilter<"Slot"> | string;
    hostId?: Prisma.IntFilter<"Slot"> | number;
    eventTypeId?: Prisma.IntFilter<"Slot"> | number;
    startAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    endAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    status?: Prisma.StringFilter<"Slot"> | string;
    createdAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Slot"> | Date | string;
};
export type SlotCreateWithoutEventTypeInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutSlotsInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutSlotInput;
};
export type SlotUncheckedCreateWithoutEventTypeInput = {
    id?: string;
    hostId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutSlotInput;
};
export type SlotCreateOrConnectWithoutEventTypeInput = {
    where: Prisma.SlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput>;
};
export type SlotCreateManyEventTypeInputEnvelope = {
    data: Prisma.SlotCreateManyEventTypeInput | Prisma.SlotCreateManyEventTypeInput[];
    skipDuplicates?: boolean;
};
export type SlotUpsertWithWhereUniqueWithoutEventTypeInput = {
    where: Prisma.SlotWhereUniqueInput;
    update: Prisma.XOR<Prisma.SlotUpdateWithoutEventTypeInput, Prisma.SlotUncheckedUpdateWithoutEventTypeInput>;
    create: Prisma.XOR<Prisma.SlotCreateWithoutEventTypeInput, Prisma.SlotUncheckedCreateWithoutEventTypeInput>;
};
export type SlotUpdateWithWhereUniqueWithoutEventTypeInput = {
    where: Prisma.SlotWhereUniqueInput;
    data: Prisma.XOR<Prisma.SlotUpdateWithoutEventTypeInput, Prisma.SlotUncheckedUpdateWithoutEventTypeInput>;
};
export type SlotUpdateManyWithWhereWithoutEventTypeInput = {
    where: Prisma.SlotScalarWhereInput;
    data: Prisma.XOR<Prisma.SlotUpdateManyMutationInput, Prisma.SlotUncheckedUpdateManyWithoutEventTypeInput>;
};
export type SlotCreateWithoutBookingsInput = {
    id?: string;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    eventType: Prisma.EventTypesCreateNestedOneWithoutSlotsInput;
    host: Prisma.UserCreateNestedOneWithoutSlotsInput;
};
export type SlotUncheckedCreateWithoutBookingsInput = {
    id?: string;
    hostId: number;
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SlotCreateOrConnectWithoutBookingsInput = {
    where: Prisma.SlotWhereUniqueInput;
    create: Prisma.XOR<Prisma.SlotCreateWithoutBookingsInput, Prisma.SlotUncheckedCreateWithoutBookingsInput>;
};
export type SlotUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.SlotUpdateWithoutBookingsInput, Prisma.SlotUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.SlotCreateWithoutBookingsInput, Prisma.SlotUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.SlotWhereInput;
};
export type SlotUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.SlotWhereInput;
    data: Prisma.XOR<Prisma.SlotUpdateWithoutBookingsInput, Prisma.SlotUncheckedUpdateWithoutBookingsInput>;
};
export type SlotUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventType?: Prisma.EventTypesUpdateOneRequiredWithoutSlotsNestedInput;
    host?: Prisma.UserUpdateOneRequiredWithoutSlotsNestedInput;
};
export type SlotUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    eventTypeId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotCreateManyHostInput = {
    id?: string;
    eventTypeId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SlotUpdateWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    eventType?: Prisma.EventTypesUpdateOneRequiredWithoutSlotsNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type SlotUncheckedUpdateWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventTypeId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type SlotUncheckedUpdateManyWithoutHostInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    eventTypeId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SlotCreateManyEventTypeInput = {
    id?: string;
    hostId: number;
    startAt: Date | string;
    endAt: Date | string;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SlotUpdateWithoutEventTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutSlotsNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutSlotNestedInput;
};
export type SlotUncheckedUpdateWithoutEventTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutSlotNestedInput;
};
export type SlotUncheckedUpdateManyWithoutEventTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    startAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SlotCountOutputType
 */
export type SlotCountOutputType = {
    Bookings: number;
};
export type SlotCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Bookings?: boolean | SlotCountOutputTypeCountBookingsArgs;
};
/**
 * SlotCountOutputType without action
 */
export type SlotCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SlotCountOutputType
     */
    select?: Prisma.SlotCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SlotCountOutputType without action
 */
export type SlotCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type SlotSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    eventTypeId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    Bookings?: boolean | Prisma.Slot$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.SlotCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slot"]>;
export type SlotSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    eventTypeId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slot"]>;
export type SlotSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    eventTypeId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["slot"]>;
export type SlotSelectScalar = {
    id?: boolean;
    hostId?: boolean;
    eventTypeId?: boolean;
    startAt?: boolean;
    endAt?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SlotOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hostId" | "eventTypeId" | "startAt" | "endAt" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["slot"]>;
export type SlotInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    Bookings?: boolean | Prisma.Slot$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.SlotCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SlotIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type SlotIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    eventType?: boolean | Prisma.EventTypesDefaultArgs<ExtArgs>;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $SlotPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Slot";
    objects: {
        eventType: Prisma.$EventTypesPayload<ExtArgs>;
        host: Prisma.$UserPayload<ExtArgs>;
        Bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        hostId: number;
        eventTypeId: number;
        startAt: Date;
        endAt: Date;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["slot"]>;
    composites: {};
};
export type SlotGetPayload<S extends boolean | null | undefined | SlotDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SlotPayload, S>;
export type SlotCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SlotCountAggregateInputType | true;
};
export interface SlotDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Slot'];
        meta: {
            name: 'Slot';
        };
    };
    /**
     * Find zero or one Slot that matches the filter.
     * @param {SlotFindUniqueArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SlotFindUniqueArgs>(args: Prisma.SelectSubset<T, SlotFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Slot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SlotFindUniqueOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SlotFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Slot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SlotFindFirstArgs>(args?: Prisma.SelectSubset<T, SlotFindFirstArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Slot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindFirstOrThrowArgs} args - Arguments to find a Slot
     * @example
     * // Get one Slot
     * const slot = await prisma.slot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SlotFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SlotFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Slots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Slots
     * const slots = await prisma.slot.findMany()
     *
     * // Get first 10 Slots
     * const slots = await prisma.slot.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const slotWithIdOnly = await prisma.slot.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SlotFindManyArgs>(args?: Prisma.SelectSubset<T, SlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Slot.
     * @param {SlotCreateArgs} args - Arguments to create a Slot.
     * @example
     * // Create one Slot
     * const Slot = await prisma.slot.create({
     *   data: {
     *     // ... data to create a Slot
     *   }
     * })
     *
     */
    create<T extends SlotCreateArgs>(args: Prisma.SelectSubset<T, SlotCreateArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Slots.
     * @param {SlotCreateManyArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SlotCreateManyArgs>(args?: Prisma.SelectSubset<T, SlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Slots and returns the data saved in the database.
     * @param {SlotCreateManyAndReturnArgs} args - Arguments to create many Slots.
     * @example
     * // Create many Slots
     * const slot = await prisma.slot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SlotCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Slot.
     * @param {SlotDeleteArgs} args - Arguments to delete one Slot.
     * @example
     * // Delete one Slot
     * const Slot = await prisma.slot.delete({
     *   where: {
     *     // ... filter to delete one Slot
     *   }
     * })
     *
     */
    delete<T extends SlotDeleteArgs>(args: Prisma.SelectSubset<T, SlotDeleteArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Slot.
     * @param {SlotUpdateArgs} args - Arguments to update one Slot.
     * @example
     * // Update one Slot
     * const slot = await prisma.slot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SlotUpdateArgs>(args: Prisma.SelectSubset<T, SlotUpdateArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Slots.
     * @param {SlotDeleteManyArgs} args - Arguments to filter Slots to delete.
     * @example
     * // Delete a few Slots
     * const { count } = await prisma.slot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SlotDeleteManyArgs>(args?: Prisma.SelectSubset<T, SlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SlotUpdateManyArgs>(args: Prisma.SelectSubset<T, SlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Slots and returns the data updated in the database.
     * @param {SlotUpdateManyAndReturnArgs} args - Arguments to update many Slots.
     * @example
     * // Update many Slots
     * const slot = await prisma.slot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Slots and only return the `id`
     * const slotWithIdOnly = await prisma.slot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends SlotUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Slot.
     * @param {SlotUpsertArgs} args - Arguments to update or create a Slot.
     * @example
     * // Update or create a Slot
     * const slot = await prisma.slot.upsert({
     *   create: {
     *     // ... data to create a Slot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Slot we want to update
     *   }
     * })
     */
    upsert<T extends SlotUpsertArgs>(args: Prisma.SelectSubset<T, SlotUpsertArgs<ExtArgs>>): Prisma.Prisma__SlotClient<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Slots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotCountArgs} args - Arguments to filter Slots to count.
     * @example
     * // Count the number of Slots
     * const count = await prisma.slot.count({
     *   where: {
     *     // ... the filter for the Slots we want to count
     *   }
     * })
    **/
    count<T extends SlotCountArgs>(args?: Prisma.Subset<T, SlotCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SlotCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SlotAggregateArgs>(args: Prisma.Subset<T, SlotAggregateArgs>): Prisma.PrismaPromise<GetSlotAggregateType<T>>;
    /**
     * Group by Slot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends SlotGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SlotGroupByArgs['orderBy'];
    } : {
        orderBy?: SlotGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Slot model
     */
    readonly fields: SlotFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Slot.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SlotClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    eventType<T extends Prisma.EventTypesDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EventTypesDefaultArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    host<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    Bookings<T extends Prisma.Slot$BookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Slot$BookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the Slot model
 */
export interface SlotFieldRefs {
    readonly id: Prisma.FieldRef<"Slot", 'String'>;
    readonly hostId: Prisma.FieldRef<"Slot", 'Int'>;
    readonly eventTypeId: Prisma.FieldRef<"Slot", 'Int'>;
    readonly startAt: Prisma.FieldRef<"Slot", 'DateTime'>;
    readonly endAt: Prisma.FieldRef<"Slot", 'DateTime'>;
    readonly status: Prisma.FieldRef<"Slot", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Slot", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Slot", 'DateTime'>;
}
/**
 * Slot findUnique
 */
export type SlotFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter, which Slot to fetch.
     */
    where: Prisma.SlotWhereUniqueInput;
};
/**
 * Slot findUniqueOrThrow
 */
export type SlotFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter, which Slot to fetch.
     */
    where: Prisma.SlotWhereUniqueInput;
};
/**
 * Slot findFirst
 */
export type SlotFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter, which Slot to fetch.
     */
    where?: Prisma.SlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Slots to fetch.
     */
    orderBy?: Prisma.SlotOrderByWithRelationInput | Prisma.SlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Slots.
     */
    cursor?: Prisma.SlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Slots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Slots.
     */
    distinct?: Prisma.SlotScalarFieldEnum | Prisma.SlotScalarFieldEnum[];
};
/**
 * Slot findFirstOrThrow
 */
export type SlotFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter, which Slot to fetch.
     */
    where?: Prisma.SlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Slots to fetch.
     */
    orderBy?: Prisma.SlotOrderByWithRelationInput | Prisma.SlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Slots.
     */
    cursor?: Prisma.SlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Slots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Slots.
     */
    distinct?: Prisma.SlotScalarFieldEnum | Prisma.SlotScalarFieldEnum[];
};
/**
 * Slot findMany
 */
export type SlotFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter, which Slots to fetch.
     */
    where?: Prisma.SlotWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Slots to fetch.
     */
    orderBy?: Prisma.SlotOrderByWithRelationInput | Prisma.SlotOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Slots.
     */
    cursor?: Prisma.SlotWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Slots from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Slots.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Slots.
     */
    distinct?: Prisma.SlotScalarFieldEnum | Prisma.SlotScalarFieldEnum[];
};
/**
 * Slot create
 */
export type SlotCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * The data needed to create a Slot.
     */
    data: Prisma.XOR<Prisma.SlotCreateInput, Prisma.SlotUncheckedCreateInput>;
};
/**
 * Slot createMany
 */
export type SlotCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Slots.
     */
    data: Prisma.SlotCreateManyInput | Prisma.SlotCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Slot createManyAndReturn
 */
export type SlotCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * The data used to create many Slots.
     */
    data: Prisma.SlotCreateManyInput | Prisma.SlotCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Slot update
 */
export type SlotUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * The data needed to update a Slot.
     */
    data: Prisma.XOR<Prisma.SlotUpdateInput, Prisma.SlotUncheckedUpdateInput>;
    /**
     * Choose, which Slot to update.
     */
    where: Prisma.SlotWhereUniqueInput;
};
/**
 * Slot updateMany
 */
export type SlotUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Slots.
     */
    data: Prisma.XOR<Prisma.SlotUpdateManyMutationInput, Prisma.SlotUncheckedUpdateManyInput>;
    /**
     * Filter which Slots to update
     */
    where?: Prisma.SlotWhereInput;
    /**
     * Limit how many Slots to update.
     */
    limit?: number;
};
/**
 * Slot updateManyAndReturn
 */
export type SlotUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * The data used to update Slots.
     */
    data: Prisma.XOR<Prisma.SlotUpdateManyMutationInput, Prisma.SlotUncheckedUpdateManyInput>;
    /**
     * Filter which Slots to update
     */
    where?: Prisma.SlotWhereInput;
    /**
     * Limit how many Slots to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Slot upsert
 */
export type SlotUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * The filter to search for the Slot to update in case it exists.
     */
    where: Prisma.SlotWhereUniqueInput;
    /**
     * In case the Slot found by the `where` argument doesn't exist, create a new Slot with this data.
     */
    create: Prisma.XOR<Prisma.SlotCreateInput, Prisma.SlotUncheckedCreateInput>;
    /**
     * In case the Slot was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SlotUpdateInput, Prisma.SlotUncheckedUpdateInput>;
};
/**
 * Slot delete
 */
export type SlotDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
    /**
     * Filter which Slot to delete.
     */
    where: Prisma.SlotWhereUniqueInput;
};
/**
 * Slot deleteMany
 */
export type SlotDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Slots to delete
     */
    where?: Prisma.SlotWhereInput;
    /**
     * Limit how many Slots to delete.
     */
    limit?: number;
};
/**
 * Slot.Bookings
 */
export type Slot$BookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    cursor?: Prisma.BookingWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
/**
 * Slot without action
 */
export type SlotDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Slot
     */
    select?: Prisma.SlotSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Slot
     */
    omit?: Prisma.SlotOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SlotInclude<ExtArgs> | null;
};
//# sourceMappingURL=Slot.d.ts.map