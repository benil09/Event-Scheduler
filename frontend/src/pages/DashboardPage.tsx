import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Plus, Calendar, Clock, Copy, Check, ExternalLink, Trash2, 
  UserCheck, AlertCircle, RefreshCw, Layers, CalendarOff
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    currentUserId, currentUser, eventTypes, bookings, availabilityRules, availabilityExceptions, isLoading, error,
    setCurrentUserId, fetchEventTypes, fetchBookings, fetchAvailabilityRules, fetchAvailabilityExceptions,
    removeEventType, cancelBooking, addAvailabilityRule, removeAvailabilityRule, addAvailabilityException, removeAvailabilityException
  } = useAppStore();

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'availability' | 'bookings'>('events');

  // Availability Rule form state
  const [selectedDay, setSelectedDay] = useState(1); // Monday
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');

  // Availability Exception form state
  const [exceptionDate, setExceptionDate] = useState(new Date().toISOString().split('T')[0]);
  const [exceptionType, setExceptionType] = useState('UNAVAILABLE');
  const [exceptionReason, setExceptionReason] = useState('');

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

  const handleAddException = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exceptionDate) return;
    await addAvailabilityException({
      date: exceptionDate,
      type: exceptionType,
      reason: exceptionReason,
    });
    setExceptionReason('');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="bg-black rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-zinc-300">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            Authenticated Host: {currentUser?.name || `Host #${currentUserId}`} ({currentUser?.email || 'Active Google Session'})
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Host Control Center
          </h1>
          <p className="text-zinc-300 text-sm leading-relaxed max-w-2xl">
            Configure your event types, set weekly working hours & date exceptions, and review guest appointments generated via your public booking links.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/events/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs tracking-wider uppercase hover:bg-zinc-100 shadow-md transition-all hover:scale-[1.02]"
            >
              <Plus className="w-4 h-4 text-black" />
              Add Event Type
            </Link>
            <button
              onClick={() => setActiveTab('availability')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs tracking-wider uppercase border border-zinc-700 transition-colors"
            >
              Configure Working Hours & Exceptions
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black">Event Types</span>
            <Clock className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-extrabold text-black">{eventTypes.length}</div>
          <p className="text-xs font-medium text-zinc-500 mt-1">Configured for public booking</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black">Confirmed Bookings</span>
            <Calendar className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-extrabold text-black">{bookings.length}</div>
          <p className="text-xs font-medium text-zinc-500 mt-1">Guest appointments</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black">Working Rules</span>
            <Layers className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-extrabold text-black">{availabilityRules.length}</div>
          <p className="text-xs font-medium text-zinc-500 mt-1">Active weekly rules</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black">Date Exceptions</span>
            <CalendarOff className="w-4 h-4 text-black" />
          </div>
          <div className="text-3xl font-extrabold text-black">{availabilityExceptions.length}</div>
          <p className="text-xs font-medium text-zinc-500 mt-1">Date overrides & off days</p>
        </div>
      </div>

      {/* Workspace Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'events'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              My Event Types ({eventTypes.length})
            </button>
            <button
              onClick={() => setActiveTab('availability')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'availability'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Working Hours & Exceptions
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all ${
                activeTab === 'bookings'
                  ? 'bg-black text-white shadow-sm'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              Guest Bookings ({bookings.length})
            </button>
          </div>

          <button
            onClick={() => { fetchEventTypes(); fetchBookings(); fetchAvailabilityRules(); fetchAvailabilityExceptions(); }}
            className="p-2 rounded-xl text-zinc-500 hover:text-black hover:bg-zinc-100 transition-colors"
            title="Sync Latest Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Tab 1: Event Types Grid */}
        {activeTab === 'events' && (
          <div>
            {eventTypes.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-zinc-300 max-w-lg mx-auto my-8">
                <div className="w-12 h-12 rounded-2xl bg-zinc-100 text-black flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-extrabold text-black mb-1">No Event Types Configured</h3>
                <p className="text-xs text-zinc-500 mb-6">
                  Create your first event type (e.g. 30 Min Consultation) to generate public booking links.
                </p>
                <Link
                  to="/events/new"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  Add Event Type
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {eventTypes.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="px-2.5 py-1 rounded-full bg-black text-white text-xs font-extrabold">
                          {event.duration} mins
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDeleteEventType(event.id)}
                            className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Event Type"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-extrabold text-black group-hover:text-zinc-600 transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                          {event.description || 'No description provided.'}
                        </p>
                      </div>

                      <div className="pt-2 text-xs text-zinc-500 font-mono font-semibold">
                        Public Link: /book/{currentUserId}/{event.slug}
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-6 mt-4 border-t border-zinc-100 flex items-center gap-2">
                      <button
                        onClick={() => copyPublicLink(event.slug, event.id)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-xs font-bold text-black transition-colors"
                      >
                        {copiedId === event.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied Link!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/book/${currentUserId}/${event.slug}`}
                        target="_blank"
                        className="p-2 rounded-xl bg-black text-white hover:bg-zinc-800 transition-colors"
                        title="Open Guest Booking Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Availability Rules & Exceptions */}
        {activeTab === 'availability' && (
          <div className="space-y-8">
            {/* Section 1: Weekly Working Hours (Rules) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xs space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-extrabold text-black">1. Weekly Working Hours (Recurring Rules)</h3>
                <p className="text-xs text-zinc-500">Define your standard available days and time windows for guest appointments.</p>
              </div>

              {/* Add Rule Form */}
              <form onSubmit={handleAddRule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">Day of Week</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  >
                    {DAYS_OF_WEEK.map((day, idx) => (
                      <option key={day} value={idx}>{day}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Working Rule
                  </button>
                </div>
              </form>

              {/* Existing Rules */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-black uppercase tracking-wider">Active Rules List</h4>
                {availabilityRules.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">No rules added yet. Default hours (09:00 - 17:00) apply.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availabilityRules.map((rule) => (
                      <div key={rule.id} className="p-4 rounded-2xl border border-zinc-200 bg-white flex items-center justify-between shadow-2xs">
                        <div>
                          <span className="text-sm font-extrabold text-black block">{DAYS_OF_WEEK[rule.dayOfWeek]}</span>
                          <span className="text-xs text-zinc-600 font-mono font-bold">{rule.startTime} - {rule.endTime}</span>
                        </div>
                        <button
                          onClick={() => removeAvailabilityRule(rule.id)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Rule"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Section 2: Date Exceptions & Overrides */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xs space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <h3 className="text-lg font-extrabold text-black">2. Date Exceptions & Specific Off Days</h3>
                <p className="text-xs text-zinc-500">Block specific dates (e.g., holidays, vacation) or override your standard availability for specific days.</p>
              </div>

              {/* Add Exception Form */}
              <form onSubmit={handleAddException} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200">
                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">Specific Date</label>
                  <input
                    type="date"
                    required
                    value={exceptionDate}
                    onChange={(e) => setExceptionDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">Exception Type</label>
                  <select
                    value={exceptionType}
                    onChange={(e) => setExceptionType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  >
                    <option value="UNAVAILABLE">Unavailable (Block Entire Day)</option>
                    <option value="CUSTOM">Custom Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-black uppercase tracking-wider mb-1">Reason / Note</label>
                  <input
                    type="text"
                    placeholder="e.g. Vacation / Holiday"
                    value={exceptionReason}
                    onChange={(e) => setExceptionReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 text-xs font-bold text-black bg-white"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Date Exception
                  </button>
                </div>
              </form>

              {/* Existing Exceptions List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-black uppercase tracking-wider">Active Date Exceptions List</h4>
                {availabilityExceptions.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">No date exceptions added yet. Standard working rules apply to all dates.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availabilityExceptions.map((exc) => (
                      <div key={exc.id} className="p-4 rounded-2xl border border-zinc-200 bg-white flex items-center justify-between shadow-2xs">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-black block">
                              {new Date(exc.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-800 text-[10px] font-extrabold uppercase">
                              {exc.type}
                            </span>
                          </div>
                          {exc.reason && (
                            <span className="text-xs text-zinc-500 font-medium block mt-0.5">{exc.reason}</span>
                          )}
                        </div>
                        <button
                          onClick={() => removeAvailabilityException(exc.id)}
                          className="p-2 rounded-xl text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove Exception"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Guest Bookings */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xs overflow-hidden">
            {bookings.length === 0 ? (
              <div className="p-12 text-center">
                <Calendar className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <h4 className="text-base font-extrabold text-black mb-1">No Guest Bookings Received Yet</h4>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  When invitees book an appointment via your public link, their confirmed bookings will appear here instantly.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100">
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
                    <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-zinc-50 transition-colors">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-black text-base">{guestName}</span>
                          {guestEmail && <span className="text-xs text-zinc-500">({guestEmail})</span>}
                          <span className="px-2.5 py-0.5 rounded-full bg-black text-white text-[10px] font-extrabold uppercase tracking-wider">
                            {booking.status || 'CONFIRMED'}
                          </span>
                        </div>
                        <div className="text-xs font-bold text-zinc-800">
                          Event: {eventTitle}
                        </div>
                        <div className="text-xs text-zinc-700 flex items-center gap-4">
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
                          <p className="text-xs text-zinc-600 italic mt-1 bg-zinc-50 p-2.5 rounded-xl border border-zinc-200">
                            "{guestNotes}"
                          </p>
                        )}
                      </div>

                      <button
                        onClick={() => handleCancelBooking(booking.id)}
                        className="px-4 py-2 rounded-xl border border-zinc-300 hover:border-rose-300 hover:bg-rose-50 text-xs font-bold text-zinc-700 hover:text-rose-600 transition-colors self-start sm:self-auto"
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
    </div>
  );
};
