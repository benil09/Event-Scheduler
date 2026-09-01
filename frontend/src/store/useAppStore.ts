/**
 * @deprecated useAppStore has been split into domain-specific stores.
 * Please import from the individual stores directly:
 *   - useUserStore  -> from './useUserStore' or from './index'
 *   - useEventStore -> from './useEventStore' or from './index'
 *   - useBookingStore -> from './useBookingStore' or from './index'
 *   - useAvailabilityStore -> from './useAvailabilityStore' or from './index'
 *
 * This file provides re-exports for backward compatibility only.
 */
export type { User, EventType, Booking, AvailabilityRule, AvailabilityException, SlotItem } from './types';
export { useUserStore } from './useUserStore';
export { useEventStore } from './useEventStore';
export { useBookingStore } from './useBookingStore';
export { useAvailabilityStore } from './useAvailabilityStore';
