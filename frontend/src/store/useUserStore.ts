import { create } from 'zustand';
import { apiClient, setApiUserId } from '../api/client';
import type { User } from './types';

/**
 * Normalize a raw user object from the backend.
 * The Prisma schema stores the email as `Email` (capital E),
 * so we always map it to lowercase `email` for the frontend.
 */
function normalizeUser(raw: any): User {
  return {
    ...raw,
    email: raw.email || raw.Email || '',
  };
}

interface UserState {
  currentUserId: number;
  currentUser: User | null;
  users: User[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentUserId: (id: number) => void;
  setGoogleUserProfile: (profile: { id: number; name: string; email: string; avatar?: string }) => void;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  fetchUserById: (id: number) => Promise<User | null>;
  createNewUser: (name: string, email: string) => Promise<User | null>;
  getGoogleAuthUrl: () => Promise<string | null>;
}

const rawSavedId = localStorage.getItem('event_scheduler_user_id');
const savedUserId = rawSavedId && !isNaN(Number(rawSavedId)) ? Number(rawSavedId) : 0;
const savedUserName = localStorage.getItem('event_scheduler_user_name') || '';
const savedUserEmail = localStorage.getItem('event_scheduler_user_email') || '';
const savedUserAvatar = localStorage.getItem('event_scheduler_user_avatar') || '';

// Initialize axios header if user already saved
if (savedUserId > 0) {
  setApiUserId(savedUserId);
}

export const useUserStore = create<UserState>((set, get) => ({
  currentUserId: savedUserId,
  currentUser: savedUserId > 0
    ? {
        id: savedUserId,
        name: savedUserName || `Host #${savedUserId}`,
        email: savedUserEmail,
        avatar: savedUserAvatar,
      }
    : null,
  users: [],
  isLoading: false,
  error: null,

  setCurrentUserId: (id: number) => {
    if (!id || isNaN(id) || id <= 0) return;
    localStorage.setItem('event_scheduler_user_id', String(id));
    setApiUserId(id);
    const existingUser = get().users.find(u => u.id === id);
    const activeUser = existingUser || get().currentUser || {
      id,
      name: localStorage.getItem('event_scheduler_user_name') || `Host #${id}`,
      email: localStorage.getItem('event_scheduler_user_email') || '',
      avatar: localStorage.getItem('event_scheduler_user_avatar') || '',
    };
    set({ currentUserId: id, currentUser: activeUser });
  },

  setGoogleUserProfile: (profile) => {
    if (!profile.id || isNaN(profile.id) || profile.id <= 0) return;
    localStorage.setItem('event_scheduler_user_id', String(profile.id));
    if (profile.name) localStorage.setItem('event_scheduler_user_name', profile.name);
    if (profile.email) localStorage.setItem('event_scheduler_user_email', profile.email);
    if (profile.avatar) localStorage.setItem('event_scheduler_user_avatar', profile.avatar);
    setApiUserId(profile.id);
    set({
      currentUserId: profile.id,
      currentUser: {
        id: profile.id,
        name: profile.name || `Host #${profile.id}`,
        email: profile.email || '',
        avatar: profile.avatar || '',
      },
    });
  },

  logout: () => {
    localStorage.removeItem('event_scheduler_user_id');
    localStorage.removeItem('event_scheduler_user_name');
    localStorage.removeItem('event_scheduler_user_email');
    localStorage.removeItem('event_scheduler_user_avatar');
    setApiUserId(null);
    set({
      currentUserId: 0,
      currentUser: null,
      users: [],
    });
  },

  fetchUsers: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.get('/api/users');
      const rawList = Array.isArray(res.data) ? res.data : (res.data?.data || res.data?.users || []);
      const userList: User[] = rawList.map(normalizeUser);

      const currentId = get().currentUserId;
      let activeUser = null;
      if (currentId > 0) {
        activeUser = userList.find((u: User) => u.id === currentId) || get().currentUser || null;
      }

      set({ users: userList, currentUser: activeUser, isLoading: false });
    } catch (err: any) {
      console.error('Failed to fetch users', err);
      set({ error: err.message || 'Failed to fetch users', isLoading: false });
    }
  },

  fetchUserById: async (id: number) => {
    try {
      const res = await apiClient.get(`/api/users/${id}`);
      const raw = res.data?.data || res.data || null;
      return raw ? normalizeUser(raw) : null;
    } catch (err: any) {
      console.error('Failed to fetch user by ID', err);
      return null;
    }
  },

  createNewUser: async (name: string, email: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await apiClient.post('/api/users/createUser', { name, email });
      const rawUser = res.data?.data || res.data;
      const newUser = rawUser ? normalizeUser(rawUser) : null;
      await get().fetchUsers();
      if (newUser && newUser.id) {
        get().setCurrentUserId(newUser.id);
      }
      set({ isLoading: false });
      return newUser;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || 'Failed to create user',
        isLoading: false,
      });
      return null;
    }
  },

  getGoogleAuthUrl: async () => {
    try {
      const origin = window.location.origin;
      const res = await apiClient.get('/api/auth/google/url', { params: { origin } });
      return res.data?.url || null;
    } catch (err: any) {
      console.error('Failed to get Google Auth URL', err);
      return null;
    }
  },
}));
