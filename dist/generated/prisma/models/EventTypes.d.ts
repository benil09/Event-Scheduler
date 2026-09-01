import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model EventTypes
 *
 */
export type EventTypesModel = runtime.Types.Result.DefaultSelection<Prisma.$EventTypesPayload>;
export type AggregateEventTypes = {
    _count: EventTypesCountAggregateOutputType | null;
    _avg: EventTypesAvgAggregateOutputType | null;
    _sum: EventTypesSumAggregateOutputType | null;
    _min: EventTypesMinAggregateOutputType | null;
    _max: EventTypesMaxAggregateOutputType | null;
};
export type EventTypesAvgAggregateOutputType = {
    id: number | null;
    hostId: number | null;
    durationMin: number | null;
    bufferBeforeMin: number | null;
    bufferAfterMin: number | null;
};
export type EventTypesSumAggregateOutputType = {
    id: number | null;
    hostId: number | null;
    durationMin: number | null;
    bufferBeforeMin: number | null;
    bufferAfterMin: number | null;
};
export type EventTypesMinAggregateOutputType = {
    id: number | null;
    hostId: number | null;
    title: string | null;
    description: string | null;
    slug: string | null;
    locationType: string | null;
    locationValue: string | null;
    durationMin: number | null;
    isActive: boolean | null;
    bufferBeforeMin: number | null;
    bufferAfterMin: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EventTypesMaxAggregateOutputType = {
    id: number | null;
    hostId: number | null;
    title: string | null;
    description: string | null;
    slug: string | null;
    locationType: string | null;
    locationValue: string | null;
    durationMin: number | null;
    isActive: boolean | null;
    bufferBeforeMin: number | null;
    bufferAfterMin: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type EventTypesCountAggregateOutputType = {
    id: number;
    hostId: number;
    title: number;
    description: number;
    slug: number;
    locationType: number;
    locationValue: number;
    durationMin: number;
    isActive: number;
    bufferBeforeMin: number;
    bufferAfterMin: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type EventTypesAvgAggregateInputType = {
    id?: true;
    hostId?: true;
    durationMin?: true;
    bufferBeforeMin?: true;
    bufferAfterMin?: true;
};
export type EventTypesSumAggregateInputType = {
    id?: true;
    hostId?: true;
    durationMin?: true;
    bufferBeforeMin?: true;
    bufferAfterMin?: true;
};
export type EventTypesMinAggregateInputType = {
    id?: true;
    hostId?: true;
    title?: true;
    description?: true;
    slug?: true;
    locationType?: true;
    locationValue?: true;
    durationMin?: true;
    isActive?: true;
    bufferBeforeMin?: true;
    bufferAfterMin?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EventTypesMaxAggregateInputType = {
    id?: true;
    hostId?: true;
    title?: true;
    description?: true;
    slug?: true;
    locationType?: true;
    locationValue?: true;
    durationMin?: true;
    isActive?: true;
    bufferBeforeMin?: true;
    bufferAfterMin?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type EventTypesCountAggregateInputType = {
    id?: true;
    hostId?: true;
    title?: true;
    description?: true;
    slug?: true;
    locationType?: true;
    locationValue?: true;
    durationMin?: true;
    isActive?: true;
    bufferBeforeMin?: true;
    bufferAfterMin?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type EventTypesAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EventTypes to aggregate.
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventTypes to fetch.
     */
    orderBy?: Prisma.EventTypesOrderByWithRelationInput | Prisma.EventTypesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.EventTypesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned EventTypes
    **/
    _count?: true | EventTypesCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: EventTypesAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: EventTypesSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: EventTypesMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: EventTypesMaxAggregateInputType;
};
export type GetEventTypesAggregateType<T extends EventTypesAggregateArgs> = {
    [P in keyof T & keyof AggregateEventTypes]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateEventTypes[P]> : Prisma.GetScalarType<T[P], AggregateEventTypes[P]>;
};
export type EventTypesGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventTypesWhereInput;
    orderBy?: Prisma.EventTypesOrderByWithAggregationInput | Prisma.EventTypesOrderByWithAggregationInput[];
    by: Prisma.EventTypesScalarFieldEnum[] | Prisma.EventTypesScalarFieldEnum;
    having?: Prisma.EventTypesScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: EventTypesCountAggregateInputType | true;
    _avg?: EventTypesAvgAggregateInputType;
    _sum?: EventTypesSumAggregateInputType;
    _min?: EventTypesMinAggregateInputType;
    _max?: EventTypesMaxAggregateInputType;
};
export type EventTypesGroupByOutputType = {
    id: number;
    hostId: number;
    title: string;
    description: string | null;
    slug: string;
    locationType: string;
    locationValue: string | null;
    durationMin: number;
    isActive: boolean;
    bufferBeforeMin: number;
    bufferAfterMin: number;
    createdAt: Date;
    updatedAt: Date;
    _count: EventTypesCountAggregateOutputType | null;
    _avg: EventTypesAvgAggregateOutputType | null;
    _sum: EventTypesSumAggregateOutputType | null;
    _min: EventTypesMinAggregateOutputType | null;
    _max: EventTypesMaxAggregateOutputType | null;
};
export type GetEventTypesGroupByPayload<T extends EventTypesGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<EventTypesGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof EventTypesGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], EventTypesGroupByOutputType[P]> : Prisma.GetScalarType<T[P], EventTypesGroupByOutputType[P]>;
}>>;
export type EventTypesWhereInput = {
    AND?: Prisma.EventTypesWhereInput | Prisma.EventTypesWhereInput[];
    OR?: Prisma.EventTypesWhereInput[];
    NOT?: Prisma.EventTypesWhereInput | Prisma.EventTypesWhereInput[];
    id?: Prisma.IntFilter<"EventTypes"> | number;
    hostId?: Prisma.IntFilter<"EventTypes"> | number;
    title?: Prisma.StringFilter<"EventTypes"> | string;
    description?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    slug?: Prisma.StringFilter<"EventTypes"> | string;
    locationType?: Prisma.StringFilter<"EventTypes"> | string;
    locationValue?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    durationMin?: Prisma.IntFilter<"EventTypes"> | number;
    isActive?: Prisma.BoolFilter<"EventTypes"> | boolean;
    bufferBeforeMin?: Prisma.IntFilter<"EventTypes"> | number;
    bufferAfterMin?: Prisma.IntFilter<"EventTypes"> | number;
    createdAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    Slots?: Prisma.SlotListRelationFilter;
    Bookings?: Prisma.BookingListRelationFilter;
};
export type EventTypesOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    locationType?: Prisma.SortOrder;
    locationValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    host?: Prisma.UserOrderByWithRelationInput;
    Slots?: Prisma.SlotOrderByRelationAggregateInput;
    Bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type EventTypesWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    slug?: string;
    hostId_slug?: Prisma.EventTypesHostIdSlugCompoundUniqueInput;
    AND?: Prisma.EventTypesWhereInput | Prisma.EventTypesWhereInput[];
    OR?: Prisma.EventTypesWhereInput[];
    NOT?: Prisma.EventTypesWhereInput | Prisma.EventTypesWhereInput[];
    hostId?: Prisma.IntFilter<"EventTypes"> | number;
    title?: Prisma.StringFilter<"EventTypes"> | string;
    description?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    locationType?: Prisma.StringFilter<"EventTypes"> | string;
    locationValue?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    durationMin?: Prisma.IntFilter<"EventTypes"> | number;
    isActive?: Prisma.BoolFilter<"EventTypes"> | boolean;
    bufferBeforeMin?: Prisma.IntFilter<"EventTypes"> | number;
    bufferAfterMin?: Prisma.IntFilter<"EventTypes"> | number;
    createdAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
    host?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    Slots?: Prisma.SlotListRelationFilter;
    Bookings?: Prisma.BookingListRelationFilter;
}, "id" | "id" | "slug" | "hostId_slug">;
export type EventTypesOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    locationType?: Prisma.SortOrder;
    locationValue?: Prisma.SortOrderInput | Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.EventTypesCountOrderByAggregateInput;
    _avg?: Prisma.EventTypesAvgOrderByAggregateInput;
    _max?: Prisma.EventTypesMaxOrderByAggregateInput;
    _min?: Prisma.EventTypesMinOrderByAggregateInput;
    _sum?: Prisma.EventTypesSumOrderByAggregateInput;
};
export type EventTypesScalarWhereWithAggregatesInput = {
    AND?: Prisma.EventTypesScalarWhereWithAggregatesInput | Prisma.EventTypesScalarWhereWithAggregatesInput[];
    OR?: Prisma.EventTypesScalarWhereWithAggregatesInput[];
    NOT?: Prisma.EventTypesScalarWhereWithAggregatesInput | Prisma.EventTypesScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"EventTypes"> | number;
    hostId?: Prisma.IntWithAggregatesFilter<"EventTypes"> | number;
    title?: Prisma.StringWithAggregatesFilter<"EventTypes"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"EventTypes"> | string | null;
    slug?: Prisma.StringWithAggregatesFilter<"EventTypes"> | string;
    locationType?: Prisma.StringWithAggregatesFilter<"EventTypes"> | string;
    locationValue?: Prisma.StringNullableWithAggregatesFilter<"EventTypes"> | string | null;
    durationMin?: Prisma.IntWithAggregatesFilter<"EventTypes"> | number;
    isActive?: Prisma.BoolWithAggregatesFilter<"EventTypes"> | boolean;
    bufferBeforeMin?: Prisma.IntWithAggregatesFilter<"EventTypes"> | number;
    bufferAfterMin?: Prisma.IntWithAggregatesFilter<"EventTypes"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"EventTypes"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"EventTypes"> | Date | string;
};
export type EventTypesCreateInput = {
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutEventTypesInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutEventTypeInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesUncheckedCreateInput = {
    id?: number;
    hostId: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutEventTypeInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesUpdateInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutEventTypesNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutEventTypeNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutEventTypeNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesCreateManyInput = {
    id?: number;
    hostId: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventTypesUpdateManyMutationInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventTypesUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type EventTypesListRelationFilter = {
    every?: Prisma.EventTypesWhereInput;
    some?: Prisma.EventTypesWhereInput;
    none?: Prisma.EventTypesWhereInput;
};
export type EventTypesOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type EventTypesHostIdSlugCompoundUniqueInput = {
    hostId: number;
    slug: string;
};
export type EventTypesCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    locationType?: Prisma.SortOrder;
    locationValue?: Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventTypesAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
};
export type EventTypesMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    locationType?: Prisma.SortOrder;
    locationValue?: Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventTypesMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    locationType?: Prisma.SortOrder;
    locationValue?: Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type EventTypesSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    hostId?: Prisma.SortOrder;
    durationMin?: Prisma.SortOrder;
    bufferBeforeMin?: Prisma.SortOrder;
    bufferAfterMin?: Prisma.SortOrder;
};
export type EventTypesScalarRelationFilter = {
    is?: Prisma.EventTypesWhereInput;
    isNot?: Prisma.EventTypesWhereInput;
};
export type EventTypesCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput> | Prisma.EventTypesCreateWithoutHostInput[] | Prisma.EventTypesUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutHostInput | Prisma.EventTypesCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.EventTypesCreateManyHostInputEnvelope;
    connect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
};
export type EventTypesUncheckedCreateNestedManyWithoutHostInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput> | Prisma.EventTypesCreateWithoutHostInput[] | Prisma.EventTypesUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutHostInput | Prisma.EventTypesCreateOrConnectWithoutHostInput[];
    createMany?: Prisma.EventTypesCreateManyHostInputEnvelope;
    connect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
};
export type EventTypesUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput> | Prisma.EventTypesCreateWithoutHostInput[] | Prisma.EventTypesUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutHostInput | Prisma.EventTypesCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.EventTypesUpsertWithWhereUniqueWithoutHostInput | Prisma.EventTypesUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.EventTypesCreateManyHostInputEnvelope;
    set?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    disconnect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    delete?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    connect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    update?: Prisma.EventTypesUpdateWithWhereUniqueWithoutHostInput | Prisma.EventTypesUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.EventTypesUpdateManyWithWhereWithoutHostInput | Prisma.EventTypesUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.EventTypesScalarWhereInput | Prisma.EventTypesScalarWhereInput[];
};
export type EventTypesUncheckedUpdateManyWithoutHostNestedInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput> | Prisma.EventTypesCreateWithoutHostInput[] | Prisma.EventTypesUncheckedCreateWithoutHostInput[];
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutHostInput | Prisma.EventTypesCreateOrConnectWithoutHostInput[];
    upsert?: Prisma.EventTypesUpsertWithWhereUniqueWithoutHostInput | Prisma.EventTypesUpsertWithWhereUniqueWithoutHostInput[];
    createMany?: Prisma.EventTypesCreateManyHostInputEnvelope;
    set?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    disconnect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    delete?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    connect?: Prisma.EventTypesWhereUniqueInput | Prisma.EventTypesWhereUniqueInput[];
    update?: Prisma.EventTypesUpdateWithWhereUniqueWithoutHostInput | Prisma.EventTypesUpdateWithWhereUniqueWithoutHostInput[];
    updateMany?: Prisma.EventTypesUpdateManyWithWhereWithoutHostInput | Prisma.EventTypesUpdateManyWithWhereWithoutHostInput[];
    deleteMany?: Prisma.EventTypesScalarWhereInput | Prisma.EventTypesScalarWhereInput[];
};
export type EventTypesCreateNestedOneWithoutSlotsInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutSlotsInput, Prisma.EventTypesUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutSlotsInput;
    connect?: Prisma.EventTypesWhereUniqueInput;
};
export type EventTypesUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutSlotsInput, Prisma.EventTypesUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutSlotsInput;
    upsert?: Prisma.EventTypesUpsertWithoutSlotsInput;
    connect?: Prisma.EventTypesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventTypesUpdateToOneWithWhereWithoutSlotsInput, Prisma.EventTypesUpdateWithoutSlotsInput>, Prisma.EventTypesUncheckedUpdateWithoutSlotsInput>;
};
export type EventTypesCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutBookingsInput, Prisma.EventTypesUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.EventTypesWhereUniqueInput;
};
export type EventTypesUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.EventTypesCreateWithoutBookingsInput, Prisma.EventTypesUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.EventTypesCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.EventTypesUpsertWithoutBookingsInput;
    connect?: Prisma.EventTypesWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.EventTypesUpdateToOneWithWhereWithoutBookingsInput, Prisma.EventTypesUpdateWithoutBookingsInput>, Prisma.EventTypesUncheckedUpdateWithoutBookingsInput>;
};
export type EventTypesCreateWithoutHostInput = {
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Slots?: Prisma.SlotCreateNestedManyWithoutEventTypeInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesUncheckedCreateWithoutHostInput = {
    id?: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutEventTypeInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesCreateOrConnectWithoutHostInput = {
    where: Prisma.EventTypesWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput>;
};
export type EventTypesCreateManyHostInputEnvelope = {
    data: Prisma.EventTypesCreateManyHostInput | Prisma.EventTypesCreateManyHostInput[];
    skipDuplicates?: boolean;
};
export type EventTypesUpsertWithWhereUniqueWithoutHostInput = {
    where: Prisma.EventTypesWhereUniqueInput;
    update: Prisma.XOR<Prisma.EventTypesUpdateWithoutHostInput, Prisma.EventTypesUncheckedUpdateWithoutHostInput>;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutHostInput, Prisma.EventTypesUncheckedCreateWithoutHostInput>;
};
export type EventTypesUpdateWithWhereUniqueWithoutHostInput = {
    where: Prisma.EventTypesWhereUniqueInput;
    data: Prisma.XOR<Prisma.EventTypesUpdateWithoutHostInput, Prisma.EventTypesUncheckedUpdateWithoutHostInput>;
};
export type EventTypesUpdateManyWithWhereWithoutHostInput = {
    where: Prisma.EventTypesScalarWhereInput;
    data: Prisma.XOR<Prisma.EventTypesUpdateManyMutationInput, Prisma.EventTypesUncheckedUpdateManyWithoutHostInput>;
};
export type EventTypesScalarWhereInput = {
    AND?: Prisma.EventTypesScalarWhereInput | Prisma.EventTypesScalarWhereInput[];
    OR?: Prisma.EventTypesScalarWhereInput[];
    NOT?: Prisma.EventTypesScalarWhereInput | Prisma.EventTypesScalarWhereInput[];
    id?: Prisma.IntFilter<"EventTypes"> | number;
    hostId?: Prisma.IntFilter<"EventTypes"> | number;
    title?: Prisma.StringFilter<"EventTypes"> | string;
    description?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    slug?: Prisma.StringFilter<"EventTypes"> | string;
    locationType?: Prisma.StringFilter<"EventTypes"> | string;
    locationValue?: Prisma.StringNullableFilter<"EventTypes"> | string | null;
    durationMin?: Prisma.IntFilter<"EventTypes"> | number;
    isActive?: Prisma.BoolFilter<"EventTypes"> | boolean;
    bufferBeforeMin?: Prisma.IntFilter<"EventTypes"> | number;
    bufferAfterMin?: Prisma.IntFilter<"EventTypes"> | number;
    createdAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"EventTypes"> | Date | string;
};
export type EventTypesCreateWithoutSlotsInput = {
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutEventTypesInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesUncheckedCreateWithoutSlotsInput = {
    id?: number;
    hostId: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesCreateOrConnectWithoutSlotsInput = {
    where: Prisma.EventTypesWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutSlotsInput, Prisma.EventTypesUncheckedCreateWithoutSlotsInput>;
};
export type EventTypesUpsertWithoutSlotsInput = {
    update: Prisma.XOR<Prisma.EventTypesUpdateWithoutSlotsInput, Prisma.EventTypesUncheckedUpdateWithoutSlotsInput>;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutSlotsInput, Prisma.EventTypesUncheckedCreateWithoutSlotsInput>;
    where?: Prisma.EventTypesWhereInput;
};
export type EventTypesUpdateToOneWithWhereWithoutSlotsInput = {
    where?: Prisma.EventTypesWhereInput;
    data: Prisma.XOR<Prisma.EventTypesUpdateWithoutSlotsInput, Prisma.EventTypesUncheckedUpdateWithoutSlotsInput>;
};
export type EventTypesUpdateWithoutSlotsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutEventTypesNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesUncheckedUpdateWithoutSlotsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesCreateWithoutBookingsInput = {
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    host: Prisma.UserCreateNestedOneWithoutEventTypesInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesUncheckedCreateWithoutBookingsInput = {
    id?: number;
    hostId: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutEventTypeInput;
};
export type EventTypesCreateOrConnectWithoutBookingsInput = {
    where: Prisma.EventTypesWhereUniqueInput;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutBookingsInput, Prisma.EventTypesUncheckedCreateWithoutBookingsInput>;
};
export type EventTypesUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.EventTypesUpdateWithoutBookingsInput, Prisma.EventTypesUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.EventTypesCreateWithoutBookingsInput, Prisma.EventTypesUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.EventTypesWhereInput;
};
export type EventTypesUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.EventTypesWhereInput;
    data: Prisma.XOR<Prisma.EventTypesUpdateWithoutBookingsInput, Prisma.EventTypesUncheckedUpdateWithoutBookingsInput>;
};
export type EventTypesUpdateWithoutBookingsInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    host?: Prisma.UserUpdateOneRequiredWithoutEventTypesNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    hostId?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesCreateManyHostInput = {
    id?: number;
    title: string;
    description?: string | null;
    slug: string;
    locationType?: string;
    locationValue?: string | null;
    durationMin: number;
    isActive?: boolean;
    bufferBeforeMin?: number;
    bufferAfterMin?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type EventTypesUpdateWithoutHostInput = {
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Slots?: Prisma.SlotUpdateManyWithoutEventTypeNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesUncheckedUpdateWithoutHostInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutEventTypeNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutEventTypeNestedInput;
};
export type EventTypesUncheckedUpdateManyWithoutHostInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    locationType?: Prisma.StringFieldUpdateOperationsInput | string;
    locationValue?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    durationMin?: Prisma.IntFieldUpdateOperationsInput | number;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    bufferBeforeMin?: Prisma.IntFieldUpdateOperationsInput | number;
    bufferAfterMin?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type EventTypesCountOutputType
 */
export type EventTypesCountOutputType = {
    Slots: number;
    Bookings: number;
};
export type EventTypesCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    Slots?: boolean | EventTypesCountOutputTypeCountSlotsArgs;
    Bookings?: boolean | EventTypesCountOutputTypeCountBookingsArgs;
};
/**
 * EventTypesCountOutputType without action
 */
export type EventTypesCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypesCountOutputType
     */
    select?: Prisma.EventTypesCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * EventTypesCountOutputType without action
 */
export type EventTypesCountOutputTypeCountSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotWhereInput;
};
/**
 * EventTypesCountOutputType without action
 */
export type EventTypesCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type EventTypesSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    title?: boolean;
    description?: boolean;
    slug?: boolean;
    locationType?: boolean;
    locationValue?: boolean;
    durationMin?: boolean;
    isActive?: boolean;
    bufferBeforeMin?: boolean;
    bufferAfterMin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    Slots?: boolean | Prisma.EventTypes$SlotsArgs<ExtArgs>;
    Bookings?: boolean | Prisma.EventTypes$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.EventTypesCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventTypes"]>;
export type EventTypesSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    title?: boolean;
    description?: boolean;
    slug?: boolean;
    locationType?: boolean;
    locationValue?: boolean;
    durationMin?: boolean;
    isActive?: boolean;
    bufferBeforeMin?: boolean;
    bufferAfterMin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventTypes"]>;
export type EventTypesSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    hostId?: boolean;
    title?: boolean;
    description?: boolean;
    slug?: boolean;
    locationType?: boolean;
    locationValue?: boolean;
    durationMin?: boolean;
    isActive?: boolean;
    bufferBeforeMin?: boolean;
    bufferAfterMin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["eventTypes"]>;
export type EventTypesSelectScalar = {
    id?: boolean;
    hostId?: boolean;
    title?: boolean;
    description?: boolean;
    slug?: boolean;
    locationType?: boolean;
    locationValue?: boolean;
    durationMin?: boolean;
    isActive?: boolean;
    bufferBeforeMin?: boolean;
    bufferAfterMin?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type EventTypesOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "hostId" | "title" | "description" | "slug" | "locationType" | "locationValue" | "durationMin" | "isActive" | "bufferBeforeMin" | "bufferAfterMin" | "createdAt" | "updatedAt", ExtArgs["result"]["eventTypes"]>;
export type EventTypesInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    Slots?: boolean | Prisma.EventTypes$SlotsArgs<ExtArgs>;
    Bookings?: boolean | Prisma.EventTypes$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.EventTypesCountOutputTypeDefaultArgs<ExtArgs>;
};
export type EventTypesIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type EventTypesIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    host?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $EventTypesPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "EventTypes";
    objects: {
        host: Prisma.$UserPayload<ExtArgs>;
        Slots: Prisma.$SlotPayload<ExtArgs>[];
        Bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        hostId: number;
        title: string;
        description: string | null;
        slug: string;
        locationType: string;
        locationValue: string | null;
        durationMin: number;
        isActive: boolean;
        bufferBeforeMin: number;
        bufferAfterMin: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["eventTypes"]>;
    composites: {};
};
export type EventTypesGetPayload<S extends boolean | null | undefined | EventTypesDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$EventTypesPayload, S>;
export type EventTypesCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<EventTypesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: EventTypesCountAggregateInputType | true;
};
export interface EventTypesDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['EventTypes'];
        meta: {
            name: 'EventTypes';
        };
    };
    /**
     * Find zero or one EventTypes that matches the filter.
     * @param {EventTypesFindUniqueArgs} args - Arguments to find a EventTypes
     * @example
     * // Get one EventTypes
     * const eventTypes = await prisma.eventTypes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventTypesFindUniqueArgs>(args: Prisma.SelectSubset<T, EventTypesFindUniqueArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one EventTypes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventTypesFindUniqueOrThrowArgs} args - Arguments to find a EventTypes
     * @example
     * // Get one EventTypes
     * const eventTypes = await prisma.eventTypes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventTypesFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, EventTypesFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EventTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesFindFirstArgs} args - Arguments to find a EventTypes
     * @example
     * // Get one EventTypes
     * const eventTypes = await prisma.eventTypes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventTypesFindFirstArgs>(args?: Prisma.SelectSubset<T, EventTypesFindFirstArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first EventTypes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesFindFirstOrThrowArgs} args - Arguments to find a EventTypes
     * @example
     * // Get one EventTypes
     * const eventTypes = await prisma.eventTypes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventTypesFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, EventTypesFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more EventTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventTypes
     * const eventTypes = await prisma.eventTypes.findMany()
     *
     * // Get first 10 EventTypes
     * const eventTypes = await prisma.eventTypes.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const eventTypesWithIdOnly = await prisma.eventTypes.findMany({ select: { id: true } })
     *
     */
    findMany<T extends EventTypesFindManyArgs>(args?: Prisma.SelectSubset<T, EventTypesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a EventTypes.
     * @param {EventTypesCreateArgs} args - Arguments to create a EventTypes.
     * @example
     * // Create one EventTypes
     * const EventTypes = await prisma.eventTypes.create({
     *   data: {
     *     // ... data to create a EventTypes
     *   }
     * })
     *
     */
    create<T extends EventTypesCreateArgs>(args: Prisma.SelectSubset<T, EventTypesCreateArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many EventTypes.
     * @param {EventTypesCreateManyArgs} args - Arguments to create many EventTypes.
     * @example
     * // Create many EventTypes
     * const eventTypes = await prisma.eventTypes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends EventTypesCreateManyArgs>(args?: Prisma.SelectSubset<T, EventTypesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many EventTypes and returns the data saved in the database.
     * @param {EventTypesCreateManyAndReturnArgs} args - Arguments to create many EventTypes.
     * @example
     * // Create many EventTypes
     * const eventTypes = await prisma.eventTypes.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many EventTypes and only return the `id`
     * const eventTypesWithIdOnly = await prisma.eventTypes.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends EventTypesCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, EventTypesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a EventTypes.
     * @param {EventTypesDeleteArgs} args - Arguments to delete one EventTypes.
     * @example
     * // Delete one EventTypes
     * const EventTypes = await prisma.eventTypes.delete({
     *   where: {
     *     // ... filter to delete one EventTypes
     *   }
     * })
     *
     */
    delete<T extends EventTypesDeleteArgs>(args: Prisma.SelectSubset<T, EventTypesDeleteArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one EventTypes.
     * @param {EventTypesUpdateArgs} args - Arguments to update one EventTypes.
     * @example
     * // Update one EventTypes
     * const eventTypes = await prisma.eventTypes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends EventTypesUpdateArgs>(args: Prisma.SelectSubset<T, EventTypesUpdateArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more EventTypes.
     * @param {EventTypesDeleteManyArgs} args - Arguments to filter EventTypes to delete.
     * @example
     * // Delete a few EventTypes
     * const { count } = await prisma.eventTypes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends EventTypesDeleteManyArgs>(args?: Prisma.SelectSubset<T, EventTypesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EventTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventTypes
     * const eventTypes = await prisma.eventTypes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends EventTypesUpdateManyArgs>(args: Prisma.SelectSubset<T, EventTypesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more EventTypes and returns the data updated in the database.
     * @param {EventTypesUpdateManyAndReturnArgs} args - Arguments to update many EventTypes.
     * @example
     * // Update many EventTypes
     * const eventTypes = await prisma.eventTypes.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more EventTypes and only return the `id`
     * const eventTypesWithIdOnly = await prisma.eventTypes.updateManyAndReturn({
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
    updateManyAndReturn<T extends EventTypesUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, EventTypesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one EventTypes.
     * @param {EventTypesUpsertArgs} args - Arguments to update or create a EventTypes.
     * @example
     * // Update or create a EventTypes
     * const eventTypes = await prisma.eventTypes.upsert({
     *   create: {
     *     // ... data to create a EventTypes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventTypes we want to update
     *   }
     * })
     */
    upsert<T extends EventTypesUpsertArgs>(args: Prisma.SelectSubset<T, EventTypesUpsertArgs<ExtArgs>>): Prisma.Prisma__EventTypesClient<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of EventTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesCountArgs} args - Arguments to filter EventTypes to count.
     * @example
     * // Count the number of EventTypes
     * const count = await prisma.eventTypes.count({
     *   where: {
     *     // ... the filter for the EventTypes we want to count
     *   }
     * })
    **/
    count<T extends EventTypesCountArgs>(args?: Prisma.Subset<T, EventTypesCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], EventTypesCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a EventTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EventTypesAggregateArgs>(args: Prisma.Subset<T, EventTypesAggregateArgs>): Prisma.PrismaPromise<GetEventTypesAggregateType<T>>;
    /**
     * Group by EventTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventTypesGroupByArgs} args - Group by arguments.
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
    groupBy<T extends EventTypesGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: EventTypesGroupByArgs['orderBy'];
    } : {
        orderBy?: EventTypesGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, EventTypesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventTypesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the EventTypes model
     */
    readonly fields: EventTypesFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for EventTypes.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__EventTypesClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    host<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    Slots<T extends Prisma.EventTypes$SlotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EventTypes$SlotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    Bookings<T extends Prisma.EventTypes$BookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.EventTypes$BookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the EventTypes model
 */
export interface EventTypesFieldRefs {
    readonly id: Prisma.FieldRef<"EventTypes", 'Int'>;
    readonly hostId: Prisma.FieldRef<"EventTypes", 'Int'>;
    readonly title: Prisma.FieldRef<"EventTypes", 'String'>;
    readonly description: Prisma.FieldRef<"EventTypes", 'String'>;
    readonly slug: Prisma.FieldRef<"EventTypes", 'String'>;
    readonly locationType: Prisma.FieldRef<"EventTypes", 'String'>;
    readonly locationValue: Prisma.FieldRef<"EventTypes", 'String'>;
    readonly durationMin: Prisma.FieldRef<"EventTypes", 'Int'>;
    readonly isActive: Prisma.FieldRef<"EventTypes", 'Boolean'>;
    readonly bufferBeforeMin: Prisma.FieldRef<"EventTypes", 'Int'>;
    readonly bufferAfterMin: Prisma.FieldRef<"EventTypes", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"EventTypes", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"EventTypes", 'DateTime'>;
}
/**
 * EventTypes findUnique
 */
export type EventTypesFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter, which EventTypes to fetch.
     */
    where: Prisma.EventTypesWhereUniqueInput;
};
/**
 * EventTypes findUniqueOrThrow
 */
export type EventTypesFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter, which EventTypes to fetch.
     */
    where: Prisma.EventTypesWhereUniqueInput;
};
/**
 * EventTypes findFirst
 */
export type EventTypesFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter, which EventTypes to fetch.
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventTypes to fetch.
     */
    orderBy?: Prisma.EventTypesOrderByWithRelationInput | Prisma.EventTypesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EventTypes.
     */
    cursor?: Prisma.EventTypesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventTypes.
     */
    distinct?: Prisma.EventTypesScalarFieldEnum | Prisma.EventTypesScalarFieldEnum[];
};
/**
 * EventTypes findFirstOrThrow
 */
export type EventTypesFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter, which EventTypes to fetch.
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventTypes to fetch.
     */
    orderBy?: Prisma.EventTypesOrderByWithRelationInput | Prisma.EventTypesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for EventTypes.
     */
    cursor?: Prisma.EventTypesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventTypes.
     */
    distinct?: Prisma.EventTypesScalarFieldEnum | Prisma.EventTypesScalarFieldEnum[];
};
/**
 * EventTypes findMany
 */
export type EventTypesFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter, which EventTypes to fetch.
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of EventTypes to fetch.
     */
    orderBy?: Prisma.EventTypesOrderByWithRelationInput | Prisma.EventTypesOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing EventTypes.
     */
    cursor?: Prisma.EventTypesWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` EventTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` EventTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of EventTypes.
     */
    distinct?: Prisma.EventTypesScalarFieldEnum | Prisma.EventTypesScalarFieldEnum[];
};
/**
 * EventTypes create
 */
export type EventTypesCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * The data needed to create a EventTypes.
     */
    data: Prisma.XOR<Prisma.EventTypesCreateInput, Prisma.EventTypesUncheckedCreateInput>;
};
/**
 * EventTypes createMany
 */
export type EventTypesCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many EventTypes.
     */
    data: Prisma.EventTypesCreateManyInput | Prisma.EventTypesCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * EventTypes createManyAndReturn
 */
export type EventTypesCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * The data used to create many EventTypes.
     */
    data: Prisma.EventTypesCreateManyInput | Prisma.EventTypesCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * EventTypes update
 */
export type EventTypesUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * The data needed to update a EventTypes.
     */
    data: Prisma.XOR<Prisma.EventTypesUpdateInput, Prisma.EventTypesUncheckedUpdateInput>;
    /**
     * Choose, which EventTypes to update.
     */
    where: Prisma.EventTypesWhereUniqueInput;
};
/**
 * EventTypes updateMany
 */
export type EventTypesUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update EventTypes.
     */
    data: Prisma.XOR<Prisma.EventTypesUpdateManyMutationInput, Prisma.EventTypesUncheckedUpdateManyInput>;
    /**
     * Filter which EventTypes to update
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * Limit how many EventTypes to update.
     */
    limit?: number;
};
/**
 * EventTypes updateManyAndReturn
 */
export type EventTypesUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * The data used to update EventTypes.
     */
    data: Prisma.XOR<Prisma.EventTypesUpdateManyMutationInput, Prisma.EventTypesUncheckedUpdateManyInput>;
    /**
     * Filter which EventTypes to update
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * Limit how many EventTypes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * EventTypes upsert
 */
export type EventTypesUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * The filter to search for the EventTypes to update in case it exists.
     */
    where: Prisma.EventTypesWhereUniqueInput;
    /**
     * In case the EventTypes found by the `where` argument doesn't exist, create a new EventTypes with this data.
     */
    create: Prisma.XOR<Prisma.EventTypesCreateInput, Prisma.EventTypesUncheckedCreateInput>;
    /**
     * In case the EventTypes was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.EventTypesUpdateInput, Prisma.EventTypesUncheckedUpdateInput>;
};
/**
 * EventTypes delete
 */
export type EventTypesDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
    /**
     * Filter which EventTypes to delete.
     */
    where: Prisma.EventTypesWhereUniqueInput;
};
/**
 * EventTypes deleteMany
 */
export type EventTypesDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which EventTypes to delete
     */
    where?: Prisma.EventTypesWhereInput;
    /**
     * Limit how many EventTypes to delete.
     */
    limit?: number;
};
/**
 * EventTypes.Slots
 */
export type EventTypes$SlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.SlotWhereInput;
    orderBy?: Prisma.SlotOrderByWithRelationInput | Prisma.SlotOrderByWithRelationInput[];
    cursor?: Prisma.SlotWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SlotScalarFieldEnum | Prisma.SlotScalarFieldEnum[];
};
/**
 * EventTypes.Bookings
 */
export type EventTypes$BookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * EventTypes without action
 */
export type EventTypesDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventTypes
     */
    select?: Prisma.EventTypesSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the EventTypes
     */
    omit?: Prisma.EventTypesOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.EventTypesInclude<ExtArgs> | null;
};
//# sourceMappingURL=EventTypes.d.ts.map