import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Clock, Video, Phone, Info, Calendar as CalendarIcon, ArrowRight, ExternalLink
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useEventStore } from '../store/useEventStore';
import { useAvailabilityStore } from '../store/useAvailabilityStore';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EventSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const { addEventType } = useEventStore();
  const { availabilityRules, availabilityExceptions, fetchAvailabilityRules, fetchAvailabilityExceptions } = useAvailabilityStore();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [duration, setDuration] = useState(15);
  const [locationType, setLocationType] = useState<'google_meet' | 'phone'>('google_meet');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAvailabilityRules();
    fetchAvailabilityExceptions();
  }, [fetchAvailabilityRules, fetchAvailabilityExceptions]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    try {
      const success = await addEventType({
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
        duration: Number(duration),
        description,
      });

      if (success) {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Error creating event type:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e2e2] pb-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">
            CONFIGURATION / EVENT DETAILS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1b1b] tracking-tight mt-1">
            Create Event Type
          </h1>
          <p className="text-sm text-[#525252] mt-1 max-w-xl">
            Configure your meeting details. Slots will automatically be generated based on your global availability rules.
          </p>
        </div>

        {/* Completion Badge */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#e2e2e2] shadow-2xs self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-[#525252] block">Completion</span>
            <span className="text-lg font-extrabold text-black">80%</span>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs">
            ✓
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Event Basics (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-5">
              <div className="flex items-center gap-2 border-b border-[#f3f3f3] pb-3">
                <Info className="w-4 h-4 text-black" />
                <h3 className="text-base font-extrabold text-black">Event Basics</h3>
              </div>

              {/* Event Name */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#525252] uppercase tracking-wider mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 15 Minute Discovery Call"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-sm font-semibold text-black focus:outline-none focus:border-black bg-white"
                />
              </div>

              {/* Duration & Frequency */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-[#525252] uppercase tracking-wider mb-2">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-xs font-semibold text-black bg-white focus:outline-none focus:border-black"
                  >
                    <option value={15}>15 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>60 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-extrabold text-[#525252] uppercase tracking-wider mb-2">
                    Frequency
                  </label>
                  <select
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-xs font-semibold text-black bg-white focus:outline-none focus:border-black"
                  >
                    <option value="once">Once only</option>
                    <option value="recurring">Recurring</option>
                  </select>
                </div>
              </div>

              {/* Location Selectors */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#525252] uppercase tracking-wider mb-2">
                  Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType('google_meet')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all cursor-pointer ${
                      locationType === 'google_meet'
                        ? 'border-black bg-[#F5F5F5] text-black shadow-2xs'
                        : 'border-[#e2e2e2] bg-white text-[#525252] hover:border-black'
                    }`}
                  >
                    <Video className="w-5 h-5 text-black" />
                    <span>Google Meet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('phone')}
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all cursor-pointer ${
                      locationType === 'phone'
                        ? 'border-black bg-[#F5F5F5] text-black shadow-2xs'
                        : 'border-[#e2e2e2] bg-white text-[#525252] hover:border-black'
                    }`}
                  >
                    <Phone className="w-5 h-5 text-black" />
                    <span>Phone Call</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-extrabold text-[#525252] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Briefly describe what this meeting is for..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-xs font-medium text-black focus:outline-none focus:border-black bg-white resize-none"
                />
              </div>
            </div>

            {/* LIVE PREVIEW Card */}
            <div className="bg-black text-white rounded-2xl p-6 shadow-xl space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#848484] block">
                LIVE PREVIEW
              </span>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-2xl font-extrabold text-white">
                    {title || 'Discovery Call'}
                  </h4>
                  <p className="text-xs text-[#848484] mt-1">
                    with {currentUser?.name || 'Alexander Kinetic'}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#1b1b1b] border border-[#303030] flex items-center justify-center text-white">
                  <Clock className="w-4 h-4" />
                </div>
              </div>

              <div className="pt-4 border-t border-[#303030] flex items-center gap-4 text-xs font-bold text-white">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {duration} min
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  {locationType === 'google_meet' ? 'Google Meet' : 'Phone Call'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Global Availability Summary (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-5">
              
              <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-black" />
                  <h3 className="text-base font-extrabold text-black">Active Global Availability</h3>
                </div>
                <Link
                  to="/dashboard?tab=availability"
                  target="_blank"
                  className="text-xs font-extrabold text-black hover:underline flex items-center gap-1"
                >
                  Manage Hours <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <p className="text-xs text-zinc-500">
                Slots for <strong>{title || 'this event'}</strong> will be generated using your global host working hours and date exceptions. Bookings across all your events automatically lock those time slots to prevent double-booking.
              </p>

              {/* Weekly Working Hours List */}
              <div className="space-y-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-black block">
                  Recurring Weekly Hours
                </span>
                {availabilityRules.length === 0 ? (
                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-500 font-medium">
                    Default schedule: Mon–Fri, 09:00 – 17:00
                  </div>
                ) : (
                  <div className="space-y-2">
                    {availabilityRules.map(rule => (
                      <div key={rule.id} className="p-3 rounded-xl border border-zinc-200 bg-zinc-50 flex items-center justify-between text-xs font-bold">
                        <span className="text-black">{DAYS_OF_WEEK[rule.dayOfWeek]}</span>
                        <span className="font-mono text-zinc-600">{rule.startTime} – {rule.endTime}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Exceptions */}
              {availabilityExceptions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-black block">
                    Active Date Exceptions ({availabilityExceptions.length})
                  </span>
                  <div className="space-y-1.5">
                    {availabilityExceptions.map(ex => (
                      <div key={ex.id} className="p-2.5 rounded-xl border border-rose-100 bg-rose-50/50 flex items-center justify-between text-xs">
                        <span className="font-bold text-black">
                          {new Date(ex.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        <span className="font-semibold text-rose-600 text-[11px]">
                          {ex.reason || 'Blocked'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e2e2] py-4 px-8 z-40 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#525252]">
            <span className="font-semibold cursor-pointer hover:text-black underline" onClick={() => navigate('/dashboard')}>
              Discard Draft
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 rounded-xl border border-[#e2e2e2] hover:bg-[#F5F5F5] text-xs font-extrabold text-black transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-60"
            >
              {saving ? 'Saving & Generating Slots...' : 'Save & Finish'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
