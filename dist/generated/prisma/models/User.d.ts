import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserAvgAggregateOutputType = {
    id: number | null;
};
export type UserSumAggregateOutputType = {
    id: number | null;
};
export type UserMinAggregateOutputType = {
    id: number | null;
    Email: string | null;
    name: string | null;
    slug: string | null;
    timezone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: number | null;
    Email: string | null;
    name: string | null;
    slug: string | null;
    timezone: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    Email: number;
    name: number;
    slug: number;
    timezone: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserAvgAggregateInputType = {
    id?: true;
};
export type UserSumAggregateInputType = {
    id?: true;
};
export type UserMinAggregateInputType = {
    id?: true;
    Email?: true;
    name?: true;
    slug?: true;
    timezone?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    Email?: true;
    name?: true;
    slug?: true;
    timezone?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    Email?: true;
    name?: true;
    slug?: true;
    timezone?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _avg?: UserAvgAggregateInputType;
    _sum?: UserSumAggregateInputType;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: number;
    Email: string;
    name: string;
    slug: string;
    timezone: string;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _avg: UserAvgAggregateOutputType | null;
    _sum: UserSumAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.IntFilter<"User"> | number;
    Email?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    slug?: Prisma.StringFilter<"User"> | string;
    timezone?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    EventTypes?: Prisma.EventTypesListRelationFilter;
    AvailabilityRule?: Prisma.AvailabilityRuleListRelationFilter;
    AvailabilityException?: Prisma.AvailabilityExceptionListRelationFilter;
    Slots?: Prisma.SlotListRelationFilter;
    Bookings?: Prisma.BookingListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    Email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    timezone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    EventTypes?: Prisma.EventTypesOrderByRelationAggregateInput;
    AvailabilityRule?: Prisma.AvailabilityRuleOrderByRelationAggregateInput;
    AvailabilityException?: Prisma.AvailabilityExceptionOrderByRelationAggregateInput;
    Slots?: Prisma.SlotOrderByRelationAggregateInput;
    Bookings?: Prisma.BookingOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number;
    Email?: string;
    slug?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    name?: Prisma.StringFilter<"User"> | string;
    timezone?: Prisma.StringFilter<"User"> | string;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    EventTypes?: Prisma.EventTypesListRelationFilter;
    AvailabilityRule?: Prisma.AvailabilityRuleListRelationFilter;
    AvailabilityException?: Prisma.AvailabilityExceptionListRelationFilter;
    Slots?: Prisma.SlotListRelationFilter;
    Bookings?: Prisma.BookingListRelationFilter;
}, "id" | "id" | "Email" | "slug">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    Email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    timezone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _avg?: Prisma.UserAvgOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
    _sum?: Prisma.UserSumOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.IntWithAggregatesFilter<"User"> | number;
    Email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    slug?: Prisma.StringWithAggregatesFilter<"User"> | string;
    timezone?: Prisma.StringWithAggregatesFilter<"User"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesUncheckedCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutHostInput;
};
export type UserUpdateInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUncheckedUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutHostNestedInput;
};
export type UserCreateManyInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    Email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    timezone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserAvgOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    Email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    timezone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    Email?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    slug?: Prisma.SortOrder;
    timezone?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserSumOrderByAggregateInput = {
    id?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type UserCreateNestedOneWithoutEventTypesInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventTypesInput, Prisma.UserUncheckedCreateWithoutEventTypesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventTypesInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutEventTypesNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutEventTypesInput, Prisma.UserUncheckedCreateWithoutEventTypesInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutEventTypesInput;
    upsert?: Prisma.UserUpsertWithoutEventTypesInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutEventTypesInput, Prisma.UserUpdateWithoutEventTypesInput>, Prisma.UserUncheckedUpdateWithoutEventTypesInput>;
};
export type UserCreateNestedOneWithoutAvailabilityRuleInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityRuleInput, Prisma.UserUncheckedCreateWithoutAvailabilityRuleInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAvailabilityRuleInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAvailabilityRuleNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityRuleInput, Prisma.UserUncheckedCreateWithoutAvailabilityRuleInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAvailabilityRuleInput;
    upsert?: Prisma.UserUpsertWithoutAvailabilityRuleInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAvailabilityRuleInput, Prisma.UserUpdateWithoutAvailabilityRuleInput>, Prisma.UserUncheckedUpdateWithoutAvailabilityRuleInput>;
};
export type UserCreateNestedOneWithoutAvailabilityExceptionInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedCreateWithoutAvailabilityExceptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAvailabilityExceptionInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAvailabilityExceptionNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedCreateWithoutAvailabilityExceptionInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAvailabilityExceptionInput;
    upsert?: Prisma.UserUpsertWithoutAvailabilityExceptionInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAvailabilityExceptionInput, Prisma.UserUpdateWithoutAvailabilityExceptionInput>, Prisma.UserUncheckedUpdateWithoutAvailabilityExceptionInput>;
};
export type UserCreateNestedOneWithoutSlotsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSlotsInput, Prisma.UserUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSlotsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutSlotsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutSlotsInput, Prisma.UserUncheckedCreateWithoutSlotsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutSlotsInput;
    upsert?: Prisma.UserUpsertWithoutSlotsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutSlotsInput, Prisma.UserUpdateWithoutSlotsInput>, Prisma.UserUncheckedUpdateWithoutSlotsInput>;
};
export type UserCreateNestedOneWithoutBookingsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutBookingsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutBookingsInput;
    upsert?: Prisma.UserUpsertWithoutBookingsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutBookingsInput, Prisma.UserUpdateWithoutBookingsInput>, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserCreateWithoutEventTypesInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    AvailabilityRule?: Prisma.AvailabilityRuleCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateWithoutEventTypesInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutHostInput;
};
export type UserCreateOrConnectWithoutEventTypesInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventTypesInput, Prisma.UserUncheckedCreateWithoutEventTypesInput>;
};
export type UserUpsertWithoutEventTypesInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutEventTypesInput, Prisma.UserUncheckedUpdateWithoutEventTypesInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutEventTypesInput, Prisma.UserUncheckedCreateWithoutEventTypesInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutEventTypesInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutEventTypesInput, Prisma.UserUncheckedUpdateWithoutEventTypesInput>;
};
export type UserUpdateWithoutEventTypesInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    AvailabilityRule?: Prisma.AvailabilityRuleUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateWithoutEventTypesInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutHostNestedInput;
};
export type UserCreateWithoutAvailabilityRuleInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesCreateNestedManyWithoutHostInput;
    AvailabilityException?: Prisma.AvailabilityExceptionCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateWithoutAvailabilityRuleInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesUncheckedCreateNestedManyWithoutHostInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutHostInput;
};
export type UserCreateOrConnectWithoutAvailabilityRuleInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityRuleInput, Prisma.UserUncheckedCreateWithoutAvailabilityRuleInput>;
};
export type UserUpsertWithoutAvailabilityRuleInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAvailabilityRuleInput, Prisma.UserUncheckedUpdateWithoutAvailabilityRuleInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityRuleInput, Prisma.UserUncheckedCreateWithoutAvailabilityRuleInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAvailabilityRuleInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAvailabilityRuleInput, Prisma.UserUncheckedUpdateWithoutAvailabilityRuleInput>;
};
export type UserUpdateWithoutAvailabilityRuleInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUpdateManyWithoutHostNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateWithoutAvailabilityRuleInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUncheckedUpdateManyWithoutHostNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutHostNestedInput;
};
export type UserCreateWithoutAvailabilityExceptionInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateWithoutAvailabilityExceptionInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesUncheckedCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutHostInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutHostInput;
};
export type UserCreateOrConnectWithoutAvailabilityExceptionInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedCreateWithoutAvailabilityExceptionInput>;
};
export type UserUpsertWithoutAvailabilityExceptionInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedUpdateWithoutAvailabilityExceptionInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedCreateWithoutAvailabilityExceptionInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAvailabilityExceptionInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAvailabilityExceptionInput, Prisma.UserUncheckedUpdateWithoutAvailabilityExceptionInput>;
};
export type UserUpdateWithoutAvailabilityExceptionInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateWithoutAvailabilityExceptionInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUncheckedUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutHostNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutHostNestedInput;
};
export type UserCreateWithoutSlotsInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionCreateNestedManyWithoutUserInput;
    Bookings?: Prisma.BookingCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateWithoutSlotsInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesUncheckedCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedCreateNestedManyWithoutUserInput;
    Bookings?: Prisma.BookingUncheckedCreateNestedManyWithoutHostInput;
};
export type UserCreateOrConnectWithoutSlotsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutSlotsInput, Prisma.UserUncheckedCreateWithoutSlotsInput>;
};
export type UserUpsertWithoutSlotsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutSlotsInput, Prisma.UserUncheckedUpdateWithoutSlotsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutSlotsInput, Prisma.UserUncheckedCreateWithoutSlotsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutSlotsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutSlotsInput, Prisma.UserUncheckedUpdateWithoutSlotsInput>;
};
export type UserUpdateWithoutSlotsInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUpdateManyWithoutUserNestedInput;
    Bookings?: Prisma.BookingUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateWithoutSlotsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUncheckedUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedUpdateManyWithoutUserNestedInput;
    Bookings?: Prisma.BookingUncheckedUpdateManyWithoutHostNestedInput;
};
export type UserCreateWithoutBookingsInput = {
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotCreateNestedManyWithoutHostInput;
};
export type UserUncheckedCreateWithoutBookingsInput = {
    id?: number;
    Email: string;
    name: string;
    slug: string;
    timezone?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    EventTypes?: Prisma.EventTypesUncheckedCreateNestedManyWithoutHostInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedCreateNestedManyWithoutUserInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedCreateNestedManyWithoutUserInput;
    Slots?: Prisma.SlotUncheckedCreateNestedManyWithoutHostInput;
};
export type UserCreateOrConnectWithoutBookingsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
};
export type UserUpsertWithoutBookingsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutBookingsInput, Prisma.UserUncheckedCreateWithoutBookingsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutBookingsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutBookingsInput, Prisma.UserUncheckedUpdateWithoutBookingsInput>;
};
export type UserUpdateWithoutBookingsInput = {
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUpdateManyWithoutHostNestedInput;
};
export type UserUncheckedUpdateWithoutBookingsInput = {
    id?: Prisma.IntFieldUpdateOperationsInput | number;
    Email?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    slug?: Prisma.StringFieldUpdateOperationsInput | string;
    timezone?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    EventTypes?: Prisma.EventTypesUncheckedUpdateManyWithoutHostNestedInput;
    AvailabilityRule?: Prisma.AvailabilityRuleUncheckedUpdateManyWithoutUserNestedInput;
    AvailabilityException?: Prisma.AvailabilityExceptionUncheckedUpdateManyWithoutUserNestedInput;
    Slots?: Prisma.SlotUncheckedUpdateManyWithoutHostNestedInput;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    EventTypes: number;
    AvailabilityRule: number;
    AvailabilityException: number;
    Slots: number;
    Bookings: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    EventTypes?: boolean | UserCountOutputTypeCountEventTypesArgs;
    AvailabilityRule?: boolean | UserCountOutputTypeCountAvailabilityRuleArgs;
    AvailabilityException?: boolean | UserCountOutputTypeCountAvailabilityExceptionArgs;
    Slots?: boolean | UserCountOutputTypeCountSlotsArgs;
    Bookings?: boolean | UserCountOutputTypeCountBookingsArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountEventTypesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.EventTypesWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAvailabilityRuleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilityRuleWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAvailabilityExceptionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvailabilityExceptionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountSlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SlotWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountBookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    Email?: boolean;
    name?: boolean;
    slug?: boolean;
    timezone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    EventTypes?: boolean | Prisma.User$EventTypesArgs<ExtArgs>;
    AvailabilityRule?: boolean | Prisma.User$AvailabilityRuleArgs<ExtArgs>;
    AvailabilityException?: boolean | Prisma.User$AvailabilityExceptionArgs<ExtArgs>;
    Slots?: boolean | Prisma.User$SlotsArgs<ExtArgs>;
    Bookings?: boolean | Prisma.User$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    Email?: boolean;
    name?: boolean;
    slug?: boolean;
    timezone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    Email?: boolean;
    name?: boolean;
    slug?: boolean;
    timezone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    Email?: boolean;
    name?: boolean;
    slug?: boolean;
    timezone?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "Email" | "name" | "slug" | "timezone" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    EventTypes?: boolean | Prisma.User$EventTypesArgs<ExtArgs>;
    AvailabilityRule?: boolean | Prisma.User$AvailabilityRuleArgs<ExtArgs>;
    AvailabilityException?: boolean | Prisma.User$AvailabilityExceptionArgs<ExtArgs>;
    Slots?: boolean | Prisma.User$SlotsArgs<ExtArgs>;
    Bookings?: boolean | Prisma.User$BookingsArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        EventTypes: Prisma.$EventTypesPayload<ExtArgs>[];
        AvailabilityRule: Prisma.$AvailabilityRulePayload<ExtArgs>[];
        AvailabilityException: Prisma.$AvailabilityExceptionPayload<ExtArgs>[];
        Slots: Prisma.$SlotPayload<ExtArgs>[];
        Bookings: Prisma.$BookingPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: number;
        Email: string;
        name: string;
        slug: string;
        timezone: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    EventTypes<T extends Prisma.User$EventTypesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$EventTypesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$EventTypesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    AvailabilityRule<T extends Prisma.User$AvailabilityRuleArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$AvailabilityRuleArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilityRulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    AvailabilityException<T extends Prisma.User$AvailabilityExceptionArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$AvailabilityExceptionArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvailabilityExceptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    Slots<T extends Prisma.User$SlotsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$SlotsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    Bookings<T extends Prisma.User$BookingsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$BookingsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'Int'>;
    readonly Email: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly slug: Prisma.FieldRef<"User", 'String'>;
    readonly timezone: Prisma.FieldRef<"User", 'String'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.EventTypes
 */
export type User$EventTypesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.EventTypesWhereInput;
    orderBy?: Prisma.EventTypesOrderByWithRelationInput | Prisma.EventTypesOrderByWithRelationInput[];
    cursor?: Prisma.EventTypesWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.EventTypesScalarFieldEnum | Prisma.EventTypesScalarFieldEnum[];
};
/**
 * User.AvailabilityRule
 */
export type User$AvailabilityRuleArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityRule
     */
    select?: Prisma.AvailabilityRuleSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AvailabilityRule
     */
    omit?: Prisma.AvailabilityRuleOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AvailabilityRuleInclude<ExtArgs> | null;
    where?: Prisma.AvailabilityRuleWhereInput;
    orderBy?: Prisma.AvailabilityRuleOrderByWithRelationInput | Prisma.AvailabilityRuleOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityRuleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilityRuleScalarFieldEnum | Prisma.AvailabilityRuleScalarFieldEnum[];
};
/**
 * User.AvailabilityException
 */
export type User$AvailabilityExceptionArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AvailabilityException
     */
    select?: Prisma.AvailabilityExceptionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the AvailabilityException
     */
    omit?: Prisma.AvailabilityExceptionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.AvailabilityExceptionInclude<ExtArgs> | null;
    where?: Prisma.AvailabilityExceptionWhereInput;
    orderBy?: Prisma.AvailabilityExceptionOrderByWithRelationInput | Prisma.AvailabilityExceptionOrderByWithRelationInput[];
    cursor?: Prisma.AvailabilityExceptionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvailabilityExceptionScalarFieldEnum | Prisma.AvailabilityExceptionScalarFieldEnum[];
};
/**
 * User.Slots
 */
export type User$SlotsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User.Bookings
 */
export type User$BookingsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
//# sourceMappingURL=User.d.ts.map