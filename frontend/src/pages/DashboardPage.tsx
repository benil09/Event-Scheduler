import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Plus, Calendar, Clock, Copy, Check, ExternalLink, Trash2, 
  AlertCircle, RefreshCw, CheckCircle2, User, Users, Coffee
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    currentUserId, currentUser, eventTypes, bookings, availabilityRules, error,
    setCurrentUserId, fetchEventTypes, fetchBookings, fetchAvailabilityRules, fetchAvailabilityExceptions,
    removeEventType, cancelBooking, addAvailabilityRule, removeAvailabilityRule
  } = useAppStore();

  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  // Tab state derived from URL params or default to 'events'
  const activeTabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<'events' | 'availability' | 'bookings'>(
    activeTabParam === 'availability' ? 'availability' : activeTabParam === 'bookings' ? 'bookings' : 'events'
  );

  // Availability Rule form state
  const [selectedDay, setSelectedDay] = useState(1); // Monday
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  useEffect(() => {
    if (activeTabParam === 'availability' || activeTabParam === 'bookings') {
      setActiveTab(activeTabParam as any);
    } else {
      setActiveTab('events');
    }
  }, [activeTabParam]);

  useEffect(() => {
    // Handle OAuth Callback Params if present
    const paramUserId = searchParams.get('userId');
    if (paramUserId) {
      const parsedId = Number(paramUserId);
      if (!isNaN(parsedId) && parsedId > 0) {
        setCurrentUserId(parsedId);
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (currentUserId > 0) {
      fetchEventTypes();
      fetchBookings();
      fetchAvailabilityRules();
      fetchAvailabilityExceptions();
    }
  }, [currentUserId]);

  const copyPublicLink = (slug: string, id: number) => {
    const url = `${window.location.origin}/book/${currentUserId}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteEventType = async (id: number) => {
    if (confirm('Are you sure you want to delete this event type?')) {
      await removeEventType(id);
    }
  };

  const handleCancelBooking = async (id: number) => {
    if (confirm('Cancel this upcoming booking?')) {
      await cancelBooking(id);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    await addAvailabilityRule({
      dayOfWeek: Number(selectedDay),
      startTime,
      endTime,
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Section matching Image 1 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">
            DASHBOARD OVERVIEW
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1b1b] tracking-tight mt-1">
            Manage your availability
          </h1>
          <p className="text-sm text-[#525252] mt-1">
            Create and manage event types that allow people to book time on your calendar.
          </p>
        </div>

        <Link
          to="/events/new"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all self-start sm:self-auto hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-white stroke-[3]" />
          Create New Event Type
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tab Content Display */}
      {activeTab === 'events' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Grid: Event Cards (Span 8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {eventTypes.map((event, idx) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F5F5F5] border border-[#e2e2e2] flex items-center justify-center text-black">
                      {idx % 3 === 0 ? <User className="w-5 h-5" /> : idx % 3 === 1 ? <Users className="w-5 h-5" /> : <Coffee className="w-5 h-5" />}
                    </div>

                    {/* Toggle Switch UI */}
                    <div className="w-11 h-6 rounded-full bg-black p-0.5 flex items-center justify-end cursor-pointer">
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-black group-hover:text-[#525252] transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#525252] mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{event.duration} mins</span>
                    </div>
                  </div>
                </div>

                {/* Footer Link & Actions */}
                <div className="pt-6 mt-6 border-t border-[#f3f3f3] flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#525252] font-mono truncate">
                    kinetic.com/user/{event.slug}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => copyPublicLink(event.slug, event.id)}
                      className="p-2 rounded-lg text-[#525252] hover:text-black hover:bg-[#F5F5F5] transition-colors"
                      title="Copy Public Link"
                    >
                      {copiedId === event.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <Link
                      to={`/book/${currentUserId}/${event.slug}`}
                      target="_blank"
                      className="p-2 rounded-lg text-[#525252] hover:text-black hover:bg-[#F5F5F5] transition-colors"
                      title="Open Booking Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteEventType(event.id)}
                      className="p-2 rounded-lg text-[#525252] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Event Type"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Create New Event Card (Dashed Border Card) */}
            <Link
              to="/events/new"
              className="bg-transparent rounded-2xl p-8 border-2 border-dashed border-[#cfc4c5] hover:border-black transition-all flex flex-col items-center justify-center text-center space-y-3 min-h-[220px] group"
            >
              <div className="w-12 h-12 rounded-full border-2 border-[#1b1b1b] flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 stroke-[2.5]" />
              </div>
              <span className="text-sm font-extrabold text-black">Create New Event</span>
            </Link>
          </div>

          {/* Right Column: Widgets matching Image 1 (Span 4) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* 1. INTEGRATIONS Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-5">
              <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#525252]">INTEGRATIONS</span>
                <button onClick={() => fetchEventTypes()} title="Refresh Integrations">
                  <RefreshCw className="w-3.5 h-3.5 text-[#525252] hover:text-black transition-colors" />
                </button>
              </div>

              <div className="space-y-3">
                {/* Google Calendar Connected */}
                <div className="p-3.5 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e2e2] flex items-center justify-center font-bold text-xs">
                      📅
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-black">Google Calendar</p>
                      <p className="text-[11px] text-[#525252]">{currentUser?.email || 'Connected'}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                </div>

                {/* Google Meet Connected */}
                <div className="p-3.5 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white border border-[#e2e2e2] flex items-center justify-center font-bold text-xs">
                      📹
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-black">Google Meet</p>
                      <p className="text-[11px] text-[#525252]">Auto-generated links</p>
                    </div>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                </div>
              </div>

              <div className="pt-2 text-center">
                <Link
                  to="/dashboard?tab=availability"
                  className="text-xs font-bold text-[#1b1b1b] hover:underline"
                >
                  Manage all integrations
                </Link>
              </div>
            </div>

            {/* 2. WEEKLY SUMMARY Widget (Solid Black Card) */}
            <div className="bg-black text-white rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#848484] block">
                WEEKLY SUMMARY
              </span>
              <div>
                <div className="text-4xl font-extrabold text-white tracking-tight">
                  {bookings.length || 24} <span className="text-xl font-bold text-[#848484]">Bookings</span>
                </div>
              </div>

              {/* Graphic Bar Graph */}
              <div className="pt-4 flex items-end gap-2 h-16">
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[30%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[50%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[40%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[80%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[100%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[45%]" />
              </div>
            </div>

            {/* 3. Pro Tip Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-2">
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">Pro Tip</h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                Set a "minimum notice period" to avoid surprise meetings. You can find this in your account settings.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Availability Rules & Exceptions */}
      {activeTab === 'availability' && (
        <div className="space-y-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-6">
            <div className="border-b border-[#f3f3f3] pb-4">
              <h3 className="text-lg font-extrabold text-black">Weekly Working Hours (Recurring Rules)</h3>
              <p className="text-xs text-[#525252]">Define your standard available days and time windows for guest appointments.</p>
            </div>

            {/* Add Rule Form */}
            <form onSubmit={handleAddRule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-[#f9f9f9] p-4 rounded-xl border border-[#e2e2e2]">
              <div>
                <label className="block text-[11px] font-extrabold text-black uppercase tracking-wider mb-1">Day of Week</label>
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-[#e2e2e2] text-xs font-bold text-black bg-white"
                >
                  {DAYS_OF_WEEK.map((day, idx) => (
                    <option key={day} value={idx}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-black uppercase tracking-wider mb-1">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e2e2e2] text-xs font-bold text-black bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-black uppercase tracking-wider mb-1">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-[#e2e2e2] text-xs font-bold text-black bg-white"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2 rounded-lg bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Rule
                </button>
              </div>
            </form>

            {/* Rules List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availabilityRules.map((rule) => (
                <div key={rule.id} className="p-4 rounded-xl border border-[#e2e2e2] bg-white flex items-center justify-between shadow-2xs">
                  <div>
                    <span className="text-sm font-extrabold text-black block">{DAYS_OF_WEEK[rule.dayOfWeek]}</span>
                    <span className="text-xs text-[#525252] font-mono font-bold">{rule.startTime} - {rule.endTime}</span>
                  </div>
                  <button
                    onClick={() => removeAvailabilityRule(rule.id)}
                    className="p-2 rounded-lg text-[#525252] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Guest Bookings */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="w-12 h-12 text-[#cfc4c5] mx-auto mb-3" />
              <h4 className="text-base font-extrabold text-black mb-1">No Guest Bookings Received Yet</h4>
              <p className="text-xs text-[#525252] max-w-sm mx-auto">
                When invitees book an appointment via your public link, their confirmed bookings will appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#f3f3f3]">
              {bookings.map((booking) => {
                const guestName = booking.inviteeName || booking.guestName || 'Guest';
                const guestEmail = booking.inviteeEmail || booking.guestEmail || '';
                const guestNotes = booking.inviteeNote || booking.guestNotes || '';
                const eventTitle = booking.eventType?.title || 'Appointment';
                const slotStart = booking.slot?.startAt || booking.startTime;
                
                const formattedDate = slotStart 
                  ? new Date(slotStart).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
                  : 'N/A';
                const formattedTime = slotStart 
                  ? new Date(slotStart).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                  : 'N/A';

                return (
                  <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#f9f9f9] transition-colors">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-black text-base">{guestName}</span>
                        {guestEmail && <span className="text-xs text-[#525252]">({guestEmail})</span>}
                        <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-wider">
                          {booking.status || 'CONFIRMED'}
                        </span>
                      </div>
                      <div className="text-xs font-extrabold text-black">
                        Event: {eventTitle}
                      </div>
                      <div className="text-xs text-[#525252] flex items-center gap-4">
                        <span className="flex items-center gap-1 font-bold">
                          <Calendar className="w-4 h-4 text-black" />
                          {formattedDate}
                        </span>
                        <span className="flex items-center gap-1 font-mono font-bold">
                          <Clock className="w-4 h-4 text-black" />
                          {formattedTime}
                        </span>
                      </div>
                      {guestNotes && (
                        <p className="text-xs text-[#525252] italic mt-1 bg-[#F5F5F5] p-2.5 rounded-xl border border-[#e2e2e2]">
                          "{guestNotes}"
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => handleCancelBooking(booking.id)}
                      className="px-4 py-2 rounded-xl border border-[#e2e2e2] hover:border-rose-300 hover:bg-rose-50 text-xs font-bold text-[#1b1b1b] hover:text-rose-600 transition-colors self-start sm:self-auto"
                    >
                      Cancel Booking
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
