import { create } from 'zustand';
import { apiClient, setApiUserId } from '../api/client';
import type { AvailabilityRule, AvailabilityException } from './types';
import { useUserStore } from './useUserStore';

interface AvailabilityState {
  availabilityRules: AvailabilityRule[];
  availabilityExceptions: AvailabilityException[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchAvailabilityRules: () => Promise<void>;
  addAvailabilityRule: (rule: { dayOfWeek: number; startTime: string; endTime: string }) => Promise<boolean>;
  removeAvailabilityRule: (id: number) => Promise<boolean>;
  fetchAvailabilityExceptions: () => Promise<void>;
  addAvailabilityException: (exception: { date: string; type: string; startTime?: string; endTime?: string; reason?: string }) => Promise<boolean>;
  removeAvailabilityException: (id: number) => Promise<boolean>;
}

export const useAvailabilityStore = create<AvailabilityState>((set, get) => ({
  availabilityRules: [],
  availabilityExceptions: [],
  isLoading: false,
  error: null,

  fetchAvailabilityRules: async () => {
    const userId = useUserStore.getState().currentUserId;
    if (!userId || userId <= 0) return;
    try {
      setApiUserId(userId);
      const res = await apiClient.get('/api/availability/rules');
      const rawRules = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.rules || []);
      const rules = rawRules.map((r: any) => ({
        ...r,
        dayOfWeek: r.weekday !== undefined ? r.weekday : r.dayOfWeek,
      }));
      set({ availabilityRules: rules });
    } catch (err: any) {
      console.error('Failed to fetch availability rules', err);
      set({ availabilityRules: [], error: err.message || 'Failed to fetch rules' });
    }
  },

  addAvailabilityRule: async (rule) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      const payload = {
        weekday: Number(rule.dayOfWeek),
        startTime: rule.startTime,
        endTime: rule.endTime,
        isActive: true,
        timezone: 'UTC',
      };
      await apiClient.post('/api/availability/rules', payload);
      await get().fetchAvailabilityRules();
      return true;
    } catch (err: any) {
      console.error('Failed to add availability rule', err);
      return false;
    }
  },

  removeAvailabilityRule: async (id: number) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      await apiClient.delete(`/api/availability/rules/${id}`);
      await get().fetchAvailabilityRules();
      return true;
    } catch (err: any) {
      console.error('Failed to delete availability rule', err);
      return false;
    }
  },

  fetchAvailabilityExceptions: async () => {
    const userId = useUserStore.getState().currentUserId;
    if (!userId || userId <= 0) return;
    try {
      setApiUserId(userId);
      const res = await apiClient.get('/api/availability/exceptions');
      const exceptions = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.exceptions || []);
      set({ availabilityExceptions: exceptions });
    } catch (err: any) {
      console.error('Failed to fetch availability exceptions', err);
      set({ availabilityExceptions: [], error: err.message || 'Failed to fetch exceptions' });
    }
  },

  addAvailabilityException: async (exception) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      const mappedType = exception.type === 'UNAVAILABLE' ? 'BLOCK_FULL_DAY' : exception.type;
      const payload = {
        date: exception.date,
        type: mappedType,
        startTime: exception.startTime,
        endTime: exception.endTime,
        reason: exception.reason || undefined,
        timezone: 'UTC',
      };
      await apiClient.post('/api/availability/exceptions', payload);
      await get().fetchAvailabilityExceptions();
      return true;
    } catch (err: any) {
      console.error('Failed to add availability exception', err);
      return false;
    }
  },

  removeAvailabilityException: async (id: number) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      await apiClient.delete(`/api/availability/exceptions/${id}`);
      await get().fetchAvailabilityExceptions();
      return true;
    } catch (err: any) {
      console.error('Failed to delete availability exception', err);
      return false;
    }
  },
}));
