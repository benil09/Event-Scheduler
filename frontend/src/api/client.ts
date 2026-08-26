import axios from 'axios';

// API Base URL - defaults to localhost in dev, or relative path on Vercel to route via Vercel edge proxy
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:8000');

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper to set or update the x-user-id header dynamically
export const setApiUserId = (userId: number | null) => {
  if (userId && !isNaN(Number(userId)) && Number(userId) > 0) {
    apiClient.defaults.headers.common['x-user-id'] = String(userId);
  } else {
    delete apiClient.defaults.headers.common['x-user-id'];
  }
};

// User API
export const api = {
  // Google Auth
  getGoogleAuthUrl: async () => {
    const origin = window.location.origin;
    const res = await apiClient.get('/api/auth/google/url', {
      params: { origin },
    });
    return res.data;
  },

  // Users
  getUsers: async () => {
    const res = await apiClient.get('/api/users');
    return res.data;
  },
  getUserById: async (id: number) => {
    const res = await apiClient.get(`/api/users/${id}`);
    return res.data;
  },
  createUser: async (data: { name: string; email: string; timezone?: string }) => {
    const res = await apiClient.post('/api/users/createUser', data);
    return res.data;
  },

  // Event Types
  getEventsByUser: async (hostId: number) => {
    const res = await apiClient.get(`/api/event-types/user/${hostId}`);
    return res.data;
  },
  getEventTypeById: async (eventId: number) => {
    const res = await apiClient.get(`/api/event-types/${eventId}`);
    return res.data;
  },
  getPublicEventType: async (userId: number, slug: string) => {
    const res = await apiClient.get(`/api/public/users/${userId}/event-types/${slug}`);
    return res.data;
  },
  createEventType: async (data: { title: string; slug: string; duration: number; description?: string; isPrivate?: boolean }) => {
    const payload = {
      title: data.title,
      slug: data.slug,
      durationMin: Number(data.duration),
      description: data.description,
    };
    const res = await apiClient.post('/api/event-types', payload);
    return res.data;
  },
  updateEventType: async (eventId: number, data: Partial<{ title: string; slug: string; duration: number; description?: string; isActive?: boolean; isPrivate?: boolean }>) => {
    const payload = {
      ...data,
      ...(data.duration ? { durationMin: Number(data.duration) } : {}),
    };
    const res = await apiClient.put(`/api/event-types/${eventId}`, payload);
    return res.data;
  },
  deleteEventType: async (eventId: number) => {
    const res = await apiClient.delete(`/api/event-types/${eventId}`);
    return res.data;
  },

  // Availability Rules
  getAvailabilityRules: async () => {
    const res = await apiClient.get('/api/availability/rules');
    return res.data;
  },
  createAvailabilityRule: async (data: { dayOfWeek: number; startTime: string; endTime: string }) => {
    const payload = {
      weekday: Number(data.dayOfWeek),
      startTime: data.startTime,
      endTime: data.endTime,
      isActive: true,
      timezone: 'UTC',
    };
    const res = await apiClient.post('/api/availability/rules', payload);
    return res.data;
  },
  deleteAvailabilityRule: async (id: number) => {
    const res = await apiClient.delete(`/api/availability/rules/${id}`);
    return res.data;
  },

  // Availability Exceptions
  getAvailabilityExceptions: async () => {
    const res = await apiClient.get('/api/availability/exceptions');
    return res.data;
  },
  createAvailabilityException: async (data: { date: string; type: string; startTime?: string; endTime?: string; reason?: string }) => {
    const mappedType = data.type === 'UNAVAILABLE' ? 'BLOCK_FULL_DAY' : data.type;
    const payload = {
      date: data.date,
      type: mappedType,
      startTime: data.startTime,
      endTime: data.endTime,
      reason: data.reason || undefined,
      timezone: 'UTC',
    };
    const res = await apiClient.post('/api/availability/exceptions', payload);
    return res.data;
  },
  deleteAvailabilityException: async (id: number) => {
    const res = await apiClient.delete(`/api/availability/exceptions/${id}`);
    return res.data;
  },

  // Bookings
  getBookings: async () => {
    const res = await apiClient.get('/api/bookings');
    return res.data;
  },
  createBooking: async (data: {
    slotId: string;
    inviteeName: string;
    inviteeEmail: string;
    inviteeNotes?: string;
    hostId?: number;
  }) => {
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
    return res.data;
  },
  deleteBooking: async (id: number) => {
    const res = await apiClient.delete(`/api/bookings/${id}`);
    return res.data;
  },
};
