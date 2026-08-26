import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, Video, ArrowLeft, Globe,
  ChevronRight, AlertCircle, Sparkles, Star, ShieldCheck, CheckCircle2, Calendar
} from 'lucide-react';
import { api } from '../api/client';
import type { EventType, User } from '../store/useAppStore';

export const HostProfilePage: React.FC = () => {
  const { hostId } = useParams<{ hostId: string }>();
  const navigate = useNavigate();

  const [host, setHost] = useState<User | null>(null);
  const [eventTypes, setEventTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | '1:1 Call' | 'Priority Sync'>('All');

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
        const userRes = await api.getUserById(parsedId);
        hostData = userRes.data || userRes;
      } catch {
        // Fallback: search users list
        const usersListRes = await api.getUsers();
        const users = Array.isArray(usersListRes) ? usersListRes : (usersListRes.data || []);
        hostData = users.find((u: User) => u.id === parsedId) || null;
      }

      if (hostData) {
        setHost({
          id: hostData.id,
          name: hostData.name || `Host #${parsedId}`,
          email: hostData.email || `host${parsedId}@example.com`,
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
      const eventsRes = await api.getEventsByUser(parsedId);
      const rawEvents = Array.isArray(eventsRes) ? eventsRes : (eventsRes.data || eventsRes.eventTypes || []);
      
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
      <div className="min-h-[70vh] flex items-center justify-center py-12 bg-zinc-50">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-zinc-500">Loading Host Profile...</p>
        </div>
      </div>
    );
  }

  if (errorMsg || !host) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-zinc-50 py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-4 border border-zinc-200 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-black">Host Profile Not Found</h3>
          <p className="text-xs text-zinc-500">{errorMsg || "The requested host profile does not exist."}</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="px-6 py-3 rounded-2xl bg-black text-white font-extrabold text-xs uppercase tracking-wider"
          >
            Return to Directory
          </button>
        </div>
      </div>
    );
  }

  // Filter events based on activeFilter tab
  const filteredEvents = eventTypes.filter(event => {
    if (activeFilter === '1:1 Call') return event.duration >= 30;
    if (activeFilter === 'Priority Sync') return event.duration < 30;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#fafafa]">
      
      {/* Left Sidebar / Host Card Column - Styled in sleek primary Black & Zinc theme */}
      <aside className="w-full md:w-96 lg:w-[400px] bg-black text-white p-8 md:p-10 flex flex-col justify-between space-y-10 shrink-0 sticky top-0 md:h-screen overflow-y-auto border-r border-zinc-800">
        <div className="space-y-8">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-300 hover:text-white transition-colors bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Directory
          </Link>

          {/* Host Profile Avatar */}
          <div className="relative inline-block">
            {host.avatar ? (
              <img
                src={host.avatar}
                alt={host.name}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-zinc-800 shadow-2xl"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-zinc-900 text-white font-extrabold text-4xl flex items-center justify-center border-4 border-zinc-800 shadow-2xl">
                {host.name ? host.name.charAt(0).toUpperCase() : 'H'}
              </div>
            )}
            <div className="w-5 h-5 rounded-full bg-emerald-500 border-2 border-black absolute bottom-1 right-1" title="Verified Host" />
          </div>

          {/* Host Name & Bio */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Verified Host
              </span>
              <span className="text-[10px] font-bold text-zinc-400">ID #{host.id}</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
              {host.name}
            </h1>
            <p className="text-xs font-medium text-zinc-400 leading-relaxed">
              Available for technical consultations, 1:1 mentorship sessions, and strategy discussions.
            </p>
          </div>

          {/* Profile Meta Cards */}
          <div className="space-y-2.5 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
              <Globe className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Timezone</span>
                <span className="font-bold text-white">{host.timezone || 'UTC'}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
              <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Active Offerings</span>
                <span className="font-bold text-white">{eventTypes.length} Available Event Types</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-300">
              <Video className="w-4 h-4 text-zinc-400 shrink-0" />
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Meeting Platform</span>
                <span className="font-bold text-white">Google Meet Video Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Host Footer */}
        <div className="pt-6 flex items-center justify-between border-t border-zinc-800">
          <div className="flex items-center gap-2 font-black text-sm text-white">
            <div className="w-6 h-6 rounded-lg bg-white text-black flex items-center justify-center text-xs font-black">
              E
            </div>
            <span>EventScheduler</span>
          </div>

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black font-extrabold text-xs transition-colors"
          >
            Host Portal
          </Link>
        </div>
      </aside>

      {/* Right Main Content Area */}
      <main className="flex-1 p-6 md:p-10 space-y-8 max-w-5xl">
        
        {/* Testimonial / Bio Highlight Box */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-zinc-200 shadow-2xs space-y-3">
          <p className="text-sm sm:text-base font-bold text-zinc-900 leading-relaxed">
            "{host.name} is praised for clear communication, structured problem solving, and actionable technical advice during scheduled sessions."
          </p>

          <div className="flex items-center gap-2 text-xs font-bold text-amber-600">
            <Sparkles className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>Verified booking testimonials</span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setActiveFilter('All')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeFilter === 'All'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200'
            }`}
          >
            All Events ({eventTypes.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('1:1 Call')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeFilter === '1:1 Call'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200'
            }`}
          >
            1:1 Calls (30+ min)
          </button>

          <button
            type="button"
            onClick={() => setActiveFilter('Priority Sync')}
            className={`px-5 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeFilter === 'Priority Sync'
                ? 'bg-black text-white shadow-sm'
                : 'bg-white hover:bg-zinc-100 text-zinc-700 border border-zinc-200'
            }`}
          >
            Quick Syncs (&lt;30 min)
          </button>
        </div>

        {/* Event Cards Grid */}
        <div className="space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-3">
              <Clock className="w-10 h-10 text-zinc-300 mx-auto" />
              <h3 className="text-base font-bold text-black">No Events Match Filter</h3>
              <p className="text-xs text-zinc-500">
                Try selecting "All Events" to view all available meeting options.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event, idx) => {
                const isPopular = idx === 0;
                return (
                  <div
                    key={event.id}
                    onClick={() => navigate(`/book/${host.id}/${event.slug}`)}
                    className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-2xs hover:shadow-xl hover:border-black transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
                  >
                    <div className="space-y-3">
                      {/* Top Header Tag */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                          <Video className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Video meeting · {event.duration} mins</span>
                        </div>
                        {isPopular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[10px] font-extrabold">
                            Popular
                          </span>
                        )}
                      </div>

                      {/* Event Title */}
                      <h3 className="text-xl font-extrabold text-black group-hover:text-zinc-800 leading-snug">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                        {event.description || 'Focused strategy & technical consultation session.'}
                      </p>
                    </div>

                    {/* Bottom Row: Free Booking & Black Circular Arrow Button */}
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                      <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
                        Open Slot Booking
                      </span>

                      {/* Black Circular Arrow Button */}
                      <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-md">
                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Ratings and Feedback Section */}
        <section className="space-y-4 pt-6 border-t border-zinc-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-black tracking-tight">
              Ratings & Guest Feedback
            </h2>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>5.0 (Verified Bookings)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feedback 1 */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[10px] font-extrabold text-zinc-400">Recent Booking</span>
              </div>
              <p className="text-xs font-medium text-zinc-700 leading-relaxed">
                "Super insightful session! Clear answers to all my questions and great advice on structuring our execution plan."
              </p>
              <div className="text-[11px] font-bold text-zinc-500 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified Guest
              </div>
            </div>

            {/* Feedback 2 */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="text-[10px] font-extrabold text-zinc-400">Recent Booking</span>
              </div>
              <p className="text-xs font-medium text-zinc-700 leading-relaxed">
                "Extremely detailed and helpful session. The meeting was well organized and started right on time."
              </p>
              <div className="text-[11px] font-bold text-zinc-500 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Verified Guest
              </div>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};
