import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, Video, ArrowLeft, Globe,
  ChevronRight, AlertCircle, Calendar
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { apiClient } from '../api/client';
import type { EventType, User } from '../store/types';

export const HostProfilePage: React.FC = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();

  const [host, setHost] = useState<User | null>(null);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { fetchUserById, fetchUsers } = useUserStore();

  const fetchHostProfileAndEvents = useCallback(async () => {
    if (!hostId || isNaN(Number(hostId))) {
      setErrorMsg("Invalid Host ID specified");
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const parsedId = Number(hostId);

      // Fetch Host User Details
      let hostData: User | null = null;
      try {
        hostData = await fetchUserById(parsedId);
      } catch {
        await fetchUsers();
        const users = useUserStore.getState().users;
        hostData = users.find((u: User) => u.id === parsedId) || null;
      }

      if (hostData) {
        setHost({
          id: hostData.id,
          name: hostData.name || `Host #${parsedId}`,
          email: hostData.email || (hostData as any).Email || '',
          avatar: hostData.avatar || '',
          timezone: hostData.timezone || 'UTC',
        });
      } else {
        setHost({
          id: parsedId,
          name: `Host #${parsedId}`,
          email: `host${parsedId}@example.com`,
          timezone: 'UTC',
        });
      }

      // Fetch Host Event Types
      const eventsRes = await apiClient.get(`/api/event-types/user/${parsedId}`);
      const rawEvents = Array.isArray(eventsRes.data) ? eventsRes.data : (eventsRes.data?.data || eventsRes.data?.eventTypes || []);
      
      const mappedEvents: EventType[] = rawEvents
        .filter((e: any) => e.isActive !== false)
        .map((e: any) => ({
          ...e,
          duration: e.durationMin || e.duration || 30,
          isActive: e.isActive !== undefined ? e.isActive : true,
        }));

      setEventTypes(mappedEvents);
    } catch (err: any) {
      console.error("Host profile fetch error", err);
      setErrorMsg(err.message || "Failed to load host profile details");
    } finally {
      setLoading(false);
    }
  }, [hostId]);

  useEffect(() => {
    fetchHostProfileAndEvents();
  }, [fetchHostProfileAndEvents]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-zinc-500">Loading Host Profile...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !host) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 text-center space-y-4 border border-zinc-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-black">Host Not Found</h3>
          <p className="text-xs text-zinc-500">{errorMsg || "The requested host profile does not exist."}</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-5 py-2.5 rounded-xl bg-black text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8">
      
      {/* Back navigation */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>All Hosts</span>
        </Link>
      </div>

      {/* Host Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            {host.avatar ? (
              <img
                src={host.avatar}
                alt={host.name}
                className="w-18 h-18 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md"
              />
            ) : (
              <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-black text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
                {host.name ? host.name.charAt(0).toUpperCase() : 'H'}
              </div>
            )}
            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0.5 right-0.5" title="Active Host" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
              {host.name}
            </h1>
            <p className="text-xs text-zinc-500 font-medium">
              {host.email}
            </p>
            {host.timezone && (
              <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-medium pt-0.5">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span>{host.timezone} Timezone</span>
              </div>
            )}
          </div>
        </div>

        <div className="sm:text-right">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-400 block">
            AVAILABLE EVENTS
          </span>
          <span className="text-2xl font-black text-black">
            {eventTypes.length}
          </span>
        </div>
      </div>

      {/* Event Types Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-extrabold text-black">
            Select an Event Type
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Choose an option below to view available dates and times.
          </p>
        </div>

        {eventTypes.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-3">
            <Calendar className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-bold text-black">No Active Event Types</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              This host has not published any active booking events yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {eventTypes.map((event) => (
              <div
                key={event.id}
                onClick={() => navigate(`/book/${host.id}/${event.slug}`)}
                className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-2xs hover:shadow-lg hover:border-black transition-all cursor-pointer flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-500">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-800 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-zinc-500" />
                      {event.duration} mins
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-400">
                      <Video className="w-3.5 h-3.5" />
                      Google Meet
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-black group-hover:text-zinc-800 leading-snug">
                    {event.title}
                  </h3>

                  {event.description && (
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400 group-hover:text-black transition-colors">
                    View open slots
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-100 group-hover:bg-black group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
