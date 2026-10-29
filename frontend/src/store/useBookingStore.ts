import { create } from 'zustand';
import { apiClient, setApiUserId } from '../api/client';
import type { Booking } from './types';
import { useUserStore } from './useUserStore';

interface BookingState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchBookings: () => Promise<void>;
  createBooking: (data: {
    slotId: string;
    inviteeName: string;
    inviteeEmail: string;
    inviteeNotes?: string;
    hostId?: number;
  }) => Promise<any>;
  cancelBooking: (id: number) => Promise<boolean>;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,

  fetchBookings: async () => {
    const userId = useUserStore.getState().currentUserId;
    if (!userId || userId <= 0) return;
    try {
      setApiUserId(userId);
      const res = await apiClient.get('/api/bookings');
      const rawList = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.bookings || []);
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
      console.error('Failed to fetch bookings', err);
      set({ bookings: [], error: err.message || 'Failed to fetch bookings' });
    }
  },

  createBooking: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Set hostId in header if provided (guest booking flow)
      if (data.hostId) {
        setApiUserId(data.hostId);
      }
      const payload = {
        slotId: String(data.slotId),
        inviteeName: data.inviteeName.trim(),
        inviteeEmail: data.inviteeEmail.trim(),
        inviteeNotes: (data.inviteeNotes || '').trim(),
      };
      const res = await apiClient.post('/api/bookings', payload);
      set({ isLoading: false });
      return res.data;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to create booking', isLoading: false });
      throw err;
    }
  },

  cancelBooking: async (id: number) => {
    try {
      const userId = useUserStore.getState().currentUserId;
      setApiUserId(userId);
      await apiClient.delete(`/api/bookings/${id}`);
      await get().fetchBookings();
      return true;
    } catch (err: any) {
      console.error('Failed to cancel booking', err);
      return false;
    }
  },
}));
