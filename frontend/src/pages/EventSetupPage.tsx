import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Sparkles, ArrowLeft, Info } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const EventSetupPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserId, addEventType, isLoading } = useAppStore();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [duration, setDuration] = useState(30);
  const [description, setDescription] = useState('');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    const autoSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(autoSlug);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) return;

    const success = await addEventType({
      title,
      slug,
      duration: Number(duration),
      description,
    });

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-extrabold text-black">Add New Event Type</h1>
            <p className="text-xs font-medium text-zinc-500">Configure appointment parameters and public URL slug.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xs space-y-6">
            <h3 className="text-base font-extrabold text-black border-b border-zinc-100 pb-3">
              Event Details
            </h3>

            {/* Event Title */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Event Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 30 Min Strategy Call"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
            </div>

            {/* Slug URL */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                URL Slug *
              </label>
              <div className="flex items-center rounded-xl border border-zinc-300 overflow-hidden focus-within:ring-2 focus-within:ring-black">
                <span className="px-3.5 py-3 bg-zinc-100 text-xs font-mono font-bold text-zinc-600 border-r border-zinc-300 select-none">
                  /book/{currentUserId}/
                </span>
                <input
                  type="text"
                  required
                  placeholder="30-min-strategy-call"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full px-3 py-3 text-sm font-mono font-bold text-black focus:outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Duration *
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[15, 30, 45, 60].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDuration(mins)}
                    className={`py-3 rounded-xl text-xs font-extrabold border transition-all ${
                      duration === mins
                        ? 'bg-black border-black text-white shadow-md'
                        : 'bg-white border-zinc-300 text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {mins} mins
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Description / Instructions
              </label>
              <textarea
                rows={3}
                placeholder="A quick 1-on-1 meeting to discuss your goals..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 rounded-xl border border-zinc-300 text-xs font-bold text-zinc-700 hover:bg-zinc-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 rounded-xl bg-black hover:bg-zinc-800 text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              Save & Publish Event Type
            </button>
          </div>
        </form>

        {/* Live Preview Column */}
        <div className="space-y-4">
          <div className="bg-black rounded-3xl p-6 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-zinc-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Live Card Preview
            </div>

            <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 space-y-3">
              <div className="inline-block px-2.5 py-1 rounded-full bg-white text-black text-xs font-extrabold">
                {duration} mins
              </div>

              <h4 className="text-lg font-extrabold text-white">
                {title || 'Untitled Event'}
              </h4>

              <p className="text-xs text-zinc-300 line-clamp-3">
                {description || 'No description added yet.'}
              </p>

              <div className="pt-2 border-t border-zinc-800 flex items-center gap-1 text-[11px] font-mono font-bold text-zinc-400">
                <Link2 className="w-3.5 h-3.5" />
                /book/{currentUserId}/{slug || 'your-slug'}
              </div>
            </div>

            <div className="flex items-start gap-2 text-zinc-400 text-xs leading-relaxed pt-2">
              <Info className="w-4 h-4 flex-shrink-0 text-white mt-0.5" />
              <span>Guests will see this card when visiting your public booking link.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
