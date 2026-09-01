// Shared TypeScript interfaces for all domain stores

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  timezone?: string;
  createdAt?: string;
}

export interface EventType {
  id: number;
  userId: number;
  title: string;
  slug: string;
  duration: number;
  description?: string;
  isActive?: boolean;
  isPrivate?: boolean;
  createdAt?: string;
}

export interface Booking {
  id: number;
  hostId: number;
  eventTypeId: number;
  slotId: string;
  inviteeEmail?: string;
  inviteeName?: string;
  inviteeNote?: string;
  guestName?: string;
  guestEmail?: string;
  guestNotes?: string;
  status: string;
  slot?: {
    id: string;
    startAt: string;
    endAt: string;
  };
  eventType?: EventType;
  startTime?: string;
  endTime?: string;
  createdAt?: string;
}

export interface AvailabilityRule {
  id: number;
  userId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface AvailabilityException {
  id: number;
  userId: number;
  date: string;
  type: string;
  startTime?: string;
  endTime?: string;
  reason?: string;
}

export interface SlotItem {
  id: string | number;
  startAt: string;
  endAt: string;
  status: string;
}
