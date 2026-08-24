import { create } from 'zustand';
import { api, setApiUserId } from '../api/client';

export interface User {
  id: number;
  name: string;
  email: string;
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

interface AppState {
  currentUserId: number;
  currentUser: User | null;
  users: User[];
  eventTypes: EventType[];
  bookings: Booking[];
  availabilityRules: AvailabilityRule[];
  availabilityExceptions: AvailabilityException[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUserId: (id: number) => void;
  fetchUsers: () => Promise<void>;
  createNewUser: (name: string, email: string) => Promise<User | null>;
  fetchEventTypes: () => Promise<void>;
  addEventType: (data: { title: string; slug: string; duration: number; description?: string }) => Promise<boolean>;
  removeEventType: (id: number) => Promise<boolean>;
  fetchBookings: () => Promise<void>;
  cancelBooking: (id: number) => Promise<boolean>;
  fetchAvailabilityRules: () => Promise<void>;
  addAvailabilityRule: (rule: { dayOfWeek: number; startTime: string; endTime: string }) => Promise<boolean>;
  removeAvailabilityRule: (id: number) => Promise<boolean>;
  fetchAvailabilityExceptions: () => Promise<void>;
  addAvailabilityException: (exception: { date: string; type: string; startTime?: string; endTime?: string; reason?: string }) => Promise<boolean>;
  removeAvailabilityException: (id: number) => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUserId: Number(localStorage.getItem('event_scheduler_user_id')) || 1,
  currentUser: null,
  users: [],
  eventTypes: [],
  bookings: [],
  availabilityRules: [],
  availabilityExceptions: [],
  isLoading: false,
  error: null,

  setCurrentUserId: (id: number) => {
    localStorage.setItem('event_scheduler_user_id', String(id));
    setApiUserId(id);
    const user = get().users.find(u => u.id === id) || null;
    set({ currentUserId: id, currentUser: user });
    get().fetchEventTypes();
    get().fetchBookings();
    get().fetchAvailabilityRules();
    get().fetchAvailabilityExceptions();
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.getUsers();
      const userList = Array.isArray(res) ? res : (res.data || res.users || []);
      const activeUser = userList.find((u: User) => u.id === get().currentUserId) || userList[0] || null;
      const activeId = activeUser ? activeUser.id : get().currentUserId;
      setApiUserId(activeId);
      set({ 
        users: userList, 
        currentUser: activeUser,
        currentUserId: activeId,
        isLoading: false 
      });
      // Fetch user's event types, bookings, rules, exceptions automatically
      get().fetchEventTypes();
      get().fetchBookings();
      get().fetchAvailabilityRules();
      get().fetchAvailabilityExceptions();
    } catch (err: any) {
      console.error("Failed to fetch users", err);
      set({ error: err.message || 'Failed to fetch users', isLoading: false });
    }
  },

  createNewUser: async (name: string, email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await api.createUser({ name, email });
      const newUser = res.data || res;
      await get().fetchUsers();
      if (newUser && newUser.id) {
        get().setCurrentUserId(newUser.id);
      }
      set({ isLoading: false });
      return newUser;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create user', isLoading: false });
      return null;
    }
  },

  fetchEventTypes: async () => {
    const userId = get().currentUserId;
    if (!userId) return;
    try {
      setApiUserId(userId);
      const res = await api.getEventsByUser(userId);
      const rawEvents = Array.isArray(res) ? res : (res.data || res.eventTypes || []);
      const events = rawEvents.map((item: any) => ({
        ...item,
        duration: item.durationMin || item.duration || 30,
      }));
      set({ eventTypes: events });
    } catch (err: any) {
      console.error("Failed to fetch event types", err);
      set({ eventTypes: [] });
    }
  },

  addEventType: async (data) => {
    set({ isLoading: true, error: null });
    try {
      setApiUserId(get().currentUserId);
      await api.createEventType(data);
      await get().fetchEventTypes();
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create event type', isLoading: false });
      return false;
    }
  },

  removeEventType: async (id: number) => {
    try {
      setApiUserId(get().currentUserId);
      await api.deleteEventType(id);
      await get().fetchEventTypes();
      return true;
    } catch (err: any) {
      console.error("Failed to delete event type", err);
      return false;
    }
  },

  fetchBookings: async () => {
    const userId = get().currentUserId;
    if (!userId) return;
    try {
      setApiUserId(userId);
      const res = await api.getBookings();
      const rawList = Array.isArray(res) ? res : (res.data || res.bookings || []);
      const bookingList = rawList.map((b: any) => ({
        ...b,
        guestName: b.inviteeName || b.guestName || 'Guest',
        guestEmail: b.inviteeEmail || b.guestEmail || '',
        guestNotes: b.inviteeNote || b.guestNotes || '',
        startTime: b.slot?.startAt || b.startTime || b.startAt || b.createdAt,
        endTime: b.slot?.endAt || b.endTime || b.endAt,
      }));
      set({ bookings: bookingList });
    } catch (err: any) {
      console.error("Failed to fetch bookings", err);
      set({ bookings: [] });
    }
  },

  cancelBooking: async (id: number) => {
    try {
      setApiUserId(get().currentUserId);
      await api.deleteBooking(id);
      await get().fetchBookings();
      return true;
    } catch (err: any) {
      console.error("Failed to cancel booking", err);
      return false;
    }
  },

  fetchAvailabilityRules: async () => {
    try {
      setApiUserId(get().currentUserId);
      const res = await api.getAvailabilityRules();
      const rawRules = Array.isArray(res) ? res : (res.data || res.rules || []);
      const rules = rawRules.map((r: any) => ({
        ...r,
        dayOfWeek: r.weekday !== undefined ? r.weekday : r.dayOfWeek,
      }));
      set({ availabilityRules: rules });
    } catch (err: any) {
      console.error("Failed to fetch availability rules", err);
      set({ availabilityRules: [] });
    }
  },

  addAvailabilityRule: async (rule) => {
    try {
      setApiUserId(get().currentUserId);
      await api.createAvailabilityRule(rule);
      await get().fetchAvailabilityRules();
      return true;
    } catch (err: any) {
      console.error("Failed to add rule", err);
      return false;
    }
  },

  removeAvailabilityRule: async (id: number) => {
    try {
      setApiUserId(get().currentUserId);
      await api.deleteAvailabilityRule(id);
      await get().fetchAvailabilityRules();
      return true;
    } catch (err: any) {
      console.error("Failed to delete rule", err);
      return false;
    }
  },

  fetchAvailabilityExceptions: async () => {
    try {
      setApiUserId(get().currentUserId);
      const res = await api.getAvailabilityExceptions();
      const exceptions = Array.isArray(res) ? res : (res.data || res.exceptions || []);
      set({ availabilityExceptions: exceptions });
    } catch (err: any) {
      console.error("Failed to fetch availability exceptions", err);
      set({ availabilityExceptions: [] });
    }
  },

  addAvailabilityException: async (exception) => {
    try {
      setApiUserId(get().currentUserId);
      await api.createAvailabilityException(exception);
      await get().fetchAvailabilityExceptions();
      return true;
    } catch (err: any) {
      console.error("Failed to add exception", err);
      return false;
    }
  },

  removeAvailabilityException: async (id: number) => {
    try {
      setApiUserId(get().currentUserId);
      await api.deleteAvailabilityException(id);
      await get().fetchAvailabilityExceptions();
      return true;
    } catch (err: any) {
      console.error("Failed to delete exception", err);
      return false;
    }
  }
}));
