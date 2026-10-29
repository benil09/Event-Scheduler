import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Clock, Video, Phone, Calendar as CalendarIcon, ArrowRight, ArrowLeft
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useEventStore } from '../store/useEventStore';
import { useAvailabilityStore } from '../store/useAvailabilityStore';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EventSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useUserStore();
  const { addEventType } = useEventStore();
  const { availabilityRules, fetchAvailabilityRules } = useAvailabilityStore();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState<'google_meet' | 'phone'>('google_meet');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAvailabilityRules();
  }, [fetchAvailabilityRules]);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    try {
      const success = await addEventType({
        title: title.trim(),
        slug: slug.trim() || title.toLowerCase().trim().replace(/\s+/g, '-'),
        duration: Number(duration),
        description: description.trim(),
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
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Event Types</span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black tracking-tight">
          Create New Event Type
        </h1>
        <p className="text-xs text-zinc-500 mt-0.5">
          Define your event details. Time slots are generated based on your weekly availability.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Form Fields */}
          <div className="md:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-2xs space-y-5">
              
              {/* Event Title */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 30 Minute Strategy Call"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  URL Slug
                </label>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-500 font-mono">
                  <span>/book/host/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 bg-transparent text-black font-semibold focus:outline-none"
                    placeholder="strategy-call"
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        duration === d
                          ? 'bg-black text-white border-black shadow-xs'
                          : 'bg-white text-zinc-700 border-zinc-200 hover:border-black'
                      }`}
                    >
                      {d} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Type */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Meeting Location
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setLocationType('google_meet')}
                    className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      locationType === 'google_meet'
                        ? 'border-black bg-zinc-100 text-black shadow-2xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-black'
                    }`}
                  >
                    <Video className="w-4 h-4 text-black" />
                    <span>Google Meet</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocationType('phone')}
                    className={`p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer ${
                      locationType === 'phone'
                        ? 'border-black bg-zinc-100 text-black shadow-2xs'
                        : 'border-zinc-200 bg-white text-zinc-600 hover:border-black'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-black" />
                    <span>Phone Call</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell guests what to expect in this meeting..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-black focus:outline-none focus:border-black bg-white resize-none"
                />
              </div>

            </div>
          </div>

          {/* Right Column: Live Preview & Availability Summary */}
          <div className="md:col-span-5 space-y-5">
            
            {/* Live Preview Card */}
            <div className="bg-black text-white rounded-3xl p-6 shadow-xl space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400 block">
                INVITEE PREVIEW
              </span>
              
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-white">
                  {title || 'New Event Type'}
                </h3>
                <p className="text-xs text-zinc-400">
                  with {currentUser?.name || 'You'}
                </p>
              </div>

              {description && (
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  {description}
                </p>
              )}

              <div className="pt-3 border-t border-zinc-800 flex items-center gap-4 text-xs font-bold text-zinc-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {duration} mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5" />
                  {locationType === 'google_meet' ? 'Google Meet' : 'Phone Call'}
                </span>
              </div>
            </div>

            {/* Availability Note */}
            <div className="bg-white rounded-3xl p-5 border border-zinc-200 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-black" />
                <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">
                  Connected Schedule
                </h4>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Slots will automatically align with your active weekly working rules ({availabilityRules.length} rules active).
              </p>
              {availabilityRules.length > 0 && (
                <div className="text-[11px] text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100 font-mono">
                  Active: {availabilityRules.map(r => DAYS_OF_WEEK[r.dayOfWeek]?.slice(0, 3)).join(', ')}
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-5 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-xs font-extrabold text-black transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs flex items-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer disabled:opacity-50"
          >
            <span>{saving ? 'Creating...' : 'Create Event Type'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
