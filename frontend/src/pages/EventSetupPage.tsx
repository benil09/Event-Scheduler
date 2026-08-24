import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Video, Phone, Globe, Info, Check, ArrowRight, Calendar as CalendarIcon
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00'];

export const EventSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { addEventType, currentUser } = useAppStore();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [duration, setDuration] = useState(15);
  const [locationType, setLocationType] = useState<'google_meet' | 'phone'>('google_meet');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);

  // Availability grid selected slots matrix (Day idx x Hour idx)
  const [gridState, setGridState] = useState<Record<string, boolean>>({
    '1-1': true, '1-2': true, '1-4': true, // TUE
    '2-2': true, '2-4': true, // WED
    '3-1': true, '3-2': true, '3-4': true, // THU
    '4-1': true, '4-2': true, '4-4': true, // FRI
  });

  const toggleGridSlot = (dayIdx: number, hourIdx: number) => {
    const key = `${dayIdx}-${hourIdx}`;
    setGridState(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setSaving(true);
    const success = await addEventType({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      duration: Number(duration),
      description,
    });
    setSaving(false);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header Bar matching Image 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e2e2e2] pb-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">
            CONFIGURATION / EVENT DETAILS
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1b1b1b] tracking-tight mt-1">
            Create Event Type
          </h1>
          <p className="text-sm text-[#525252] mt-1 max-w-xl">
            Define your meeting parameters. Once configured, you can share a direct link or embed this calendar on your personal site.
          </p>
        </div>

        {/* Completion Progress Badge */}
        <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#e2e2e2] shadow-2xs self-start sm:self-auto">
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase text-[#525252] block">Completion</span>
            <span className="text-lg font-extrabold text-black">65%</span>
          </div>
          <div className="w-9 h-9 rounded-full border-2 border-black flex items-center justify-center font-bold text-xs">
            ✓
          </div>
        </div>
      </div>

      {/* Main Grid: Event Basics + Availability Grid */}
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
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all ${
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
                    className={`p-4 rounded-xl border flex flex-col items-center justify-center gap-2 text-xs font-extrabold transition-all ${
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

            {/* LIVE PREVIEW Black Card matching Image 2 */}
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

          {/* Right Column: Availability Grid (Span 6) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-[#e2e2e2] shadow-[0_2px_8px_rgba(0,0,0,0.04)] space-y-6">
              
              {/* Header with Weekly / Specific Dates Toggle */}
              <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-4">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-black" />
                  <h3 className="text-base font-extrabold text-black">Availability Grid</h3>
                </div>

                <div className="bg-[#F5F5F5] p-1 rounded-xl flex items-center gap-1 text-xs font-bold border border-[#e2e2e2]">
                  <span className="px-3 py-1.5 rounded-lg bg-white text-black shadow-2xs">Weekly</span>
                  <span className="px-3 py-1.5 rounded-lg text-[#525252] hover:text-black cursor-pointer">Specific Dates</span>
                </div>
              </div>

              {/* Days Header */}
              <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-black border-b border-[#f3f3f3] pb-2">
                {DAYS.map((d, i) => (
                  <span key={d} className={i >= 5 ? 'text-rose-600 font-extrabold' : 'text-black'}>
                    {d}
                  </span>
                ))}
              </div>

              {/* Interactive Time Slots Grid Matrix matching Image 2 */}
              <div className="space-y-2">
                {HOURS.map((hour, hIdx) => (
                  <div key={hour} className="grid grid-cols-8 items-center gap-2">
                    <span className="text-[11px] font-bold font-mono text-[#525252] text-right pr-2">
                      {hour}
                    </span>
                    {DAYS.map((_, dIdx) => {
                      const isSelected = gridState[`${dIdx}-${hIdx}`];
                      return (
                        <button
                          key={dIdx}
                          type="button"
                          onClick={() => toggleGridSlot(dIdx, hIdx)}
                          className={`h-11 rounded-lg border transition-all flex items-center justify-center ${
                            isSelected
                              ? 'bg-black border-black text-white shadow-2xs'
                              : 'bg-[#F5F5F5] border-[#e2e2e2] text-transparent hover:border-black'
                          }`}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Timezone Box */}
              <div className="bg-[#F5F5F5] p-3.5 rounded-xl border border-[#e2e2e2] flex items-center justify-between text-xs font-bold text-black">
                <span className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-black" />
                  Timezone: America/New_York (GMT-4)
                </span>
                <span className="text-xs font-extrabold text-[#525252] underline cursor-pointer hover:text-black">
                  Change
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar matching Image 2 */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e2e2e2] py-4 px-8 z-40 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-[#525252]">
            <span className="font-semibold cursor-pointer hover:text-black underline" onClick={() => navigate('/dashboard')}>
              Discard Draft
            </span>
            <span>•</span>
            <span className="italic font-medium">Last saved 2 minutes ago</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2.5 rounded-xl border border-[#e2e2e2] hover:bg-[#F5F5F5] text-xs font-extrabold text-black transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform hover:scale-[1.01]"
            >
              {saving ? 'Saving...' : 'Save & Finish'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
