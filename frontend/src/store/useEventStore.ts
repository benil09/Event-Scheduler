import { create } from 'zustand';
import { apiClient, setApiUserId } from '../api/client';
import type { EventType } from './types';
import { useUserStore } from './useUserStore';

interface EventState {
  eventTypes: EventType[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchEventTypes: () => Promise<void>;
  fetchEventTypeById: (eventId: number) => Promise<EventType | null>;
  fetchPublicEventType: (userId: number, slug: string) => Promise<any>;
  addEventType: (data: { title: string; slug: string; duration: number; description?: string; isPrivate?: boolean }) => Promise<boolean>;
  toggleEventTypeActive: (id: number, isActive: boolean) => Promise<boolean>;
  updateEventType: (id: number, data: Partial<{ title: string; slug: string; duration: number; description?: string; isActive?: boolean; isPrivate?: boolean }>) => Promise<boolean>;
  removeEventType: (id: number) => Promise<boolean>;
}

export const useEventStore = create<EventState>((set, get) => ({
  eventTypes: [],
  isLoading: false,
  error: null,

  fetchEventTypes: async () => {
    const userId = useUserStore.getState().currentUserId;
    if (!userId || userId <= 0) return;
    try {
      setApiUserId(userId);
      const res = await apiClient.get(`/api/event-types/user/${userId}`);
      const rawEvents = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.eventTypes || []);
      const events = rawEvents.map((item: any) => ({
        ...item,
        duration: item.durationMin || item.duration || 30,
        isActive: item.isActive !== undefined ? item.isActive : true,
      }));
      set({ eventTypes: events });
    } catch (err: any) {
      console.error('Failed to fetch event types', err);
      set({ eventTypes: [], error: err.message || 'Failed to fetch event types' });
    }
  },

  fetchEventTypeById: async (eventId: number) => {
    try {
      const res = await apiClient.get(`/api/event-types/${eventId}`);
      return res.data?.data || res.data || null;
    } catch (err: any) {
      console.error('Failed to fetch event type by ID', err);
      return null;
    }
  },

  fetchPublicEventType: async (userId: number, slug: string) => {
    try {
      const res = await apiClient.get(`/api/public/users/${userId}/event-types/${slug}`);
      return res.data?.data || res.data || null;
    } catch (err: any) {
      console.error('Failed to fetch public event type', err);
      throw err;
    }
  },

  addEventType: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      const payload = {
        title: data.title,
        slug: data.slug,
        durationMin: Number(data.duration),
        description: data.description,
      };
      await apiClient.post('/api/event-types', payload);
      await get().fetchEventTypes();
      set({ isLoading: false });
      return true;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create event type', isLoading: false });
      return false;
    }
  },

  toggleEventTypeActive: async (id: number, isActive: boolean) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      await apiClient.put(`/api/event-types/${id}`, { isActive });
      await get().fetchEventTypes();
      return true;
    } catch (err: any) {
      console.error('Failed to toggle event status', err);
      return false;
    }
  },

  updateEventType: async (id, data) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      const payload = {
        ...data,
        ...(data.duration ? { durationMin: Number(data.duration) } : {}),
      };
      await apiClient.put(`/api/event-types/${id}`, payload);
      await get().fetchEventTypes();
      return true;
    } catch (err: any) {
      console.error('Failed to update event type', err);
      return false;
    }
  },

  removeEventType: async (id: number) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      await apiClient.delete(`/api/event-types/${id}`);
      await get().fetchEventTypes();
      return true;
    } catch (err: any) {
      console.error('Failed to delete event type', err);
      return false;
    }
  },
}));
