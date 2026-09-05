import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  Plus, Calendar, Clock, Copy, Check, ExternalLink, Trash2, 
  AlertCircle, RefreshCw, CheckCircle2, User, Users, Coffee, X
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useEventStore } from '../store/useEventStore';
import { useBookingStore } from '../store/useBookingStore';
import { useAvailabilityStore } from '../store/useAvailabilityStore';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// ─── Modal: Add Availability Rule ──────────────────────────────────────────
const AddRuleModal: React.FC<{
  onClose: () => void;
  onSave: (day: number, start: string, end: string) => Promise<void>;
}> = ({ onClose, onSave }) => {
  const [day, setDay] = useState(1);
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('17:00');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (start >= end) { setErr('End time must be after start time.'); return; }
    setSaving(true);
    setErr('');
    try {
      await onSave(day, start, end);
      onClose();
    } catch {
      setErr('Failed to save rule. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 space-y-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-black">Add Availability Rule</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Define a recurring weekly time window when you are available.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Day Selection */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">Day of Week</label>
            <div className="flex flex-wrap gap-2">
              {DAYS_OF_WEEK.map((d, i) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDay(i)}
                  className={`px-3 py-1.5 rounded-full text-xs font-extrabold border transition-all ${
                    day === i
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                  }`}
                >
                  {d.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Time Windows */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">Start Time</label>
              <input
                type="time"
                value={start}
                onChange={e => setStart(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white focus:outline-none focus:border-black"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">End Time</label>
              <input
                type="time"
                value={end}
                onChange={e => setEnd(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white focus:outline-none focus:border-black"
              />
            </div>
          </div>

          {err && <p className="text-xs font-semibold text-rose-600">{err}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-extrabold text-black hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-extrabold transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Add Rule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Modal: Add Exception ──────────────────────────────────────────────────
const EXCEPTION_TYPES = [
  { value: 'BLOCK_FULL_DAY', label: '🚫 Block Full Day', desc: 'Mark the entire date as unavailable' },
  { value: 'BLOCK_PARTIAL', label: '⏳ Block Partial Hours', desc: 'Block specific hours on this date' },
  { value: 'ADD_AVAILABLE_WINDOW', label: '✅ Add Extra Hours', desc: 'Add extra availability outside regular hours' },
];

const AddExceptionModal: React.FC<{
  onClose: () => void;
  onSave: (data: { date: string; type: string; startTime?: string; endTime?: string; reason?: string }) => Promise<void>;
}> = ({ onClose, onSave }) => {
  const [date, setDate] = useState('');
  const [type, setType] = useState('BLOCK_FULL_DAY');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('12:00');
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');

  const needsTimes = type === 'BLOCK_PARTIAL' || type === 'ADD_AVAILABLE_WINDOW';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) { setErr('Please select a valid date.'); return; }
    if (needsTimes && startTime >= endTime) { setErr('End time must be after start time.'); return; }
    setSaving(true);
    setErr('');
    try {
      await onSave({
        date,
        type,
        startTime: needsTimes ? startTime : undefined,
        endTime: needsTimes ? endTime : undefined,
        reason: reason.trim() || undefined,
      });
      onClose();
    } catch {
      setErr('Failed to save exception. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 space-y-6 animate-in fade-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-black">Add Date Exception</h2>
            <p className="text-xs text-zinc-500 mt-0.5">Override your standard schedule for a specific date.</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-zinc-100 text-zinc-500 hover:text-black transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Picker */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={e => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white focus:outline-none focus:border-black"
            />
          </div>

          {/* Exception Type */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">Exception Type</label>
            <div className="space-y-2">
              {EXCEPTION_TYPES.map(opt => (
                <label
                  key={opt.value}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    type === opt.value ? 'border-black bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="exType"
                    value={opt.value}
                    checked={type === opt.value}
                    onChange={() => setType(opt.value)}
                    className="mt-0.5 accent-black"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-black">{opt.label}</p>
                    <p className="text-[11px] text-zinc-500">{opt.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Time Range */}
          {needsTimes && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">Start Time</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white focus:outline-none focus:border-black"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">End Time</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white focus:outline-none focus:border-black"
                />
              </div>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-extrabold text-black uppercase tracking-wider block">
              Reason <span className="normal-case font-normal text-zinc-400">(optional)</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Holiday, Vacation, Doctor's appointment…"
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-zinc-200 text-sm font-semibold text-black bg-white placeholder:font-normal placeholder:text-zinc-400 focus:outline-none focus:border-black"
            />
          </div>

          {err && <p className="text-xs font-semibold text-rose-600">{err}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-zinc-200 text-xs font-extrabold text-black hover:bg-zinc-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-extrabold transition-colors disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Add Exception'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Main Dashboard Page Component ─────────────────────────────────────────
export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUserId, currentUser, setGoogleUserProfile } = useUserStore();
  const { eventTypes, fetchEventTypes, removeEventType, toggleEventTypeActive, error: eventError } = useEventStore();
  const { bookings, fetchBookings, cancelBooking } = useBookingStore();
  const {
    availabilityRules, availabilityExceptions,
    fetchAvailabilityRules, fetchAvailabilityExceptions,
    addAvailabilityRule, removeAvailabilityRule,
    addAvailabilityException, removeAvailabilityException,
  } = useAvailabilityStore();

  const error = eventError;

  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedProfile, setCopiedProfile] = useState(false);
  const [togglingId, setTogglingId] = useState<number | null>(null);

  // Tab state derived from URL params
  const activeTabParam = searchParams.get('tab');
  const activeTab: 'events' | 'availability' | 'bookings' = 
    activeTabParam === 'availability' ? 'availability' : activeTabParam === 'bookings' ? 'bookings' : 'events';

  // Availability sub-tab state ('rules' vs 'exceptions')
  const [availSubTab, setAvailSubTab] = useState<'rules' | 'exceptions'>('rules');

  // Modal open states
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [showExceptionModal, setShowExceptionModal] = useState(false);

  useEffect(() => {
    // Handle OAuth Callback Params if present
    const paramUserId = searchParams.get('userId');
    const paramName = searchParams.get('name');
    const paramEmail = searchParams.get('email');
    const paramAvatar = searchParams.get('avatar');

    if (paramUserId) {
      const parsedId = Number(paramUserId);
      if (!isNaN(parsedId) && parsedId > 0) {
        setGoogleUserProfile({
          id: parsedId,
          name: paramName || `Host #${parsedId}`,
          email: paramEmail || '',
          avatar: paramAvatar || '',
        });
        setSearchParams({}, { replace: true });
      }
    }
  }, [searchParams, setSearchParams, setGoogleUserProfile]);

  useEffect(() => {
    if (currentUserId > 0) {
      fetchEventTypes();
      fetchBookings();
      fetchAvailabilityRules();
      fetchAvailabilityExceptions();
    }
  }, [currentUserId, fetchEventTypes, fetchBookings, fetchAvailabilityRules, fetchAvailabilityExceptions]);

  const copyPublicLink = (slug: string, id: number) => {
    const url = `${window.location.origin}/book/${currentUserId}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const copyHostProfileLink = () => {
    const url = `${window.location.origin}/profile/${currentUserId}`;
    navigator.clipboard.writeText(url);
    setCopiedProfile(true);
    setTimeout(() => setCopiedProfile(false), 2000);
  };

  const handleToggleActive = async (id: number, currentStatus: boolean) => {
    setTogglingId(id);
    await toggleEventTypeActive(id, !currentStatus);
    setTogglingId(null);
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

  const exceptionTypeBadge = (type: string) => {
    if (type === 'BLOCK_FULL_DAY' || type === 'UNAVAILABLE') {
      return { label: 'Full Day Blocked', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    }
    if (type === 'BLOCK_PARTIAL') {
      return { label: 'Partial Hours Blocked', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    }
    if (type === 'ADD_AVAILABLE_WINDOW') {
      return { label: 'Extra Hours Added', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    }
    return { label: type, color: 'text-zinc-700 bg-zinc-50 border-zinc-200' };
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Modals */}
      {showRuleModal && (
        <AddRuleModal
          onClose={() => setShowRuleModal(false)}
          onSave={async (day, start, end) => {
            await addAvailabilityRule({ dayOfWeek: day, startTime: start, endTime: end });
          }}
        />
      )}
      {showExceptionModal && (
        <AddExceptionModal
          onClose={() => setShowExceptionModal(false)}
          onSave={async (data) => {
            await addAvailabilityException(data);
          }}
        />
      )}

      {/* Top Header Section */}
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

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={copyHostProfileLink}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-300 hover:border-black bg-white text-black font-extrabold text-xs uppercase tracking-wider shadow-2xs transition-all hover:scale-[1.02] cursor-pointer"
          >
            {copiedProfile ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedProfile ? 'Profile Link Copied!' : 'Share Host Profile'}</span>
          </button>

          <Link
            to="/events/new"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4 text-white stroke-[3]" />
            Create New Event Type
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Tab 1: Event Types */}
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

                    {/* Interactive Toggle Switch UI */}
                    <button
                      onClick={() => handleToggleActive(event.id, event.isActive ?? true)}
                      disabled={togglingId === event.id}
                      className={`w-11 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                        event.isActive ?? true ? 'bg-black justify-end' : 'bg-zinc-300 justify-start'
                      }`}
                      title={event.isActive ?? true ? 'Active (Click to disable)' : 'Inactive (Click to enable)'}
                    >
                      <div className="w-5 h-5 rounded-full bg-white shadow-sm" />
                    </button>
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
                      rel="noopener noreferrer"
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

            {/* Create New Event Card */}
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

          {/* Right Column: Widgets */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Integrations Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-5">
              <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#525252]">INTEGRATIONS</span>
                <button onClick={() => fetchEventTypes()} title="Refresh Integrations">
                  <RefreshCw className="w-3.5 h-3.5 text-[#525252] hover:text-black transition-colors" />
                </button>
              </div>

              <div className="space-y-3">
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
                  Manage all availability
                </Link>
              </div>
            </div>

            {/* Weekly Summary Widget */}
            <div className="bg-black text-white rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#848484] block">
                WEEKLY SUMMARY
              </span>
              <div>
                <div className="text-4xl font-extrabold text-white tracking-tight">
                  {bookings.length} <span className="text-xl font-bold text-[#848484]">Bookings</span>
                </div>
              </div>

              <div className="pt-4 flex items-end gap-2 h-16">
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[30%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[50%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[40%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[80%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[100%]" />
                <div className="flex-1 bg-[#303030] rounded-t-sm h-[45%]" />
              </div>
            </div>

            {/* Pro Tip Widget */}
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-2">
              <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">Pro Tip</h4>
              <p className="text-xs text-[#525252] leading-relaxed">
                Set availability rules carefully to automatically open recurring booking slots for invitees.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Availability Rules & Exceptions (Cleaned Sub-tab Structure) */}
      {activeTab === 'availability' && (
        <div className="space-y-6">

          {/* Sub-tab Navigation & Action Button Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-zinc-200 pb-4">
            {/* Sub-tabs */}
            <div className="flex items-center bg-zinc-100 rounded-xl p-1 gap-1">
              <button
                type="button"
                onClick={() => setAvailSubTab('rules')}
                className={`px-5 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  availSubTab === 'rules'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-500 hover:text-black'
                }`}
              >
                📅 Weekly Working Hours
                {availabilityRules.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-extrabold">
                    {availabilityRules.length}
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setAvailSubTab('exceptions')}
                className={`px-5 py-2.5 rounded-lg text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  availSubTab === 'exceptions'
                    ? 'bg-white text-black shadow-sm'
                    : 'text-zinc-500 hover:text-black'
                }`}
              >
                🚫 Date Exceptions
                {availabilityExceptions.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-extrabold">
                    {availabilityExceptions.length}
                  </span>
                )}
              </button>
            </div>

            {/* Contextual Action Button opening popup modal */}
            {availSubTab === 'rules' ? (
              <button
                type="button"
                onClick={() => setShowRuleModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Add Availability Rule
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowExceptionModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                Add Date Exception
              </button>
            )}
          </div>

          {/* Sub-tab 1: Weekly Hours List */}
          {availSubTab === 'rules' && (
            <div className="bg-white rounded-2xl border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f3f3f3] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-black">Weekly Working Hours</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Recurring rules defining your standard weekly window for booking slots.
                  </p>
                </div>
              </div>

              {availabilityRules.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h4 className="text-sm font-extrabold text-black mb-1">No Availability Rules Configured</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-4">
                    Click "Add Availability Rule" to specify your weekly availability.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowRuleModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add First Rule
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#f3f3f3]">
                  {availabilityRules.map((rule) => (
                    <div key={rule.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#f9f9f9] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center text-[11px] font-extrabold uppercase tracking-wide shrink-0">
                          {DAYS_OF_WEEK[rule.dayOfWeek]?.slice(0, 3)}
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-black">{DAYS_OF_WEEK[rule.dayOfWeek]}</p>
                          <p className="text-xs font-mono font-semibold text-zinc-500">{rule.startTime} – {rule.endTime}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAvailabilityRule(rule.id)}
                        className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Remove Rule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sub-tab 2: Date Exceptions List */}
          {availSubTab === 'exceptions' && (
            <div className="bg-white rounded-2xl border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
              <div className="px-6 py-5 border-b border-[#f3f3f3] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-black">Date Exceptions & Overrides</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Override your standard schedule for specific dates (holidays, partial blocks, or extra hours).
                  </p>
                </div>
              </div>

              {availabilityExceptions.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-zinc-400" />
                  </div>
                  <h4 className="text-sm font-extrabold text-black mb-1">No Date Exceptions Configured</h4>
                  <p className="text-xs text-zinc-500 max-w-xs mx-auto mb-4">
                    Block a day off or adjust hours for a specific date using date exceptions.
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowExceptionModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Exception
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#f3f3f3]">
                  {availabilityExceptions.map((ex) => {
                    const badge = exceptionTypeBadge(ex.type);
                    return (
                      <div key={ex.id} className="flex items-center justify-between px-6 py-4 hover:bg-[#f9f9f9] transition-colors group">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-zinc-100 text-black flex flex-col items-center justify-center shrink-0">
                            <span className="text-[10px] font-extrabold uppercase text-zinc-500">
                              {new Date(ex.date).toLocaleDateString(undefined, { month: 'short' })}
                            </span>
                            <span className="text-lg font-extrabold leading-none">
                              {new Date(ex.date).getDate()}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-extrabold text-black">
                              {new Date(ex.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                                {badge.label}
                              </span>
                              {ex.startTime && ex.endTime && (
                                <span className="text-[11px] font-mono font-semibold text-zinc-500">
                                  {ex.startTime} – {ex.endTime}
                                </span>
                              )}
                              {ex.reason && (
                                <span className="text-[11px] text-zinc-400 italic truncate max-w-[200px]">
                                  "{ex.reason}"
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAvailabilityException(ex.id)}
                          className="p-2 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                          title="Remove Exception"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

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
                  ? new Date(slotStart).toLocaleDateString(undefined, { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) 
                  : 'N/A';
                const formattedTime = slotStart 
                  ? new Date(slotStart).toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false }) 
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
                      type="button"
                      onClick={() => handleCancelBooking(booking.id)}
                      className="px-4 py-2 rounded-xl border border-[#e2e2e2] hover:border-rose-300 hover:bg-rose-50 text-xs font-bold text-[#1b1b1b] hover:text-rose-600 transition-colors self-start sm:self-auto cursor-pointer"
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
