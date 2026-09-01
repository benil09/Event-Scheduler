import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, Zap, ArrowRight, 
  Search, User as UserIcon, Sparkles, ChevronRight, RefreshCw
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import type { User } from '../store/types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [hosts, setHosts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHosts = async () => {
      setLoading(true);
      try {
        await useUserStore.getState().fetchUsers();
        const userList = useUserStore.getState().users;
        setHosts(userList);
      } catch (err) {
        console.error("Failed to load hosts for directory", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  const filteredHosts = hosts.filter(h => 
    (h.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (h.email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-black text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
        {/* Background Subtle Patterns */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-zinc-800/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-72 h-72 rounded-full bg-zinc-700/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-extrabold uppercase tracking-widest text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            Zero Guest Auth Required • Instant Booking
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Schedule Meetings Effortlessly with your Host.
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Welcome to <strong className="text-white">EventScheduler</strong>. Browse active hosts, explore available event types, inspect real-time available time slots, and schedule appointments instantly — no guest account required.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#host-directory"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-zinc-100 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <span>Explore Hosts & Book Event</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/login"
              className="px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Host Login / Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Overview Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 block">
            HOW IT WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-black">
            Seamless Guest Experience, Powerful Host Control
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-black">1. Pick a Host & Event</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Explore host profiles, view strategy calls, code reviews, or discovery sessions, and select the event type that fits your needs.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-black">2. Choose Date & Slot</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our real-time availability engine computes non-overlapping open time slots tailored to host timezone and work schedules.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-2xs hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-black">3. Automated Confirmation</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Temporal backend workflow triggers instant booking validation, email dispatch, and calendar invitations with Google Meet link.
            </p>
          </div>
        </div>
      </section>

      {/* Host Directory Showcase Section */}
      <section id="host-directory" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-zinc-500 block">
              HOST SHOWCASE DIRECTORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-1">
              Select a Host to View Profile & Book
            </h2>
          </div>

          {/* Host Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search host by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-zinc-200 text-xs font-medium focus:outline-none focus:border-black bg-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-bold text-zinc-500">Loading available hosts...</p>
          </div>
        ) : filteredHosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-3">
            <UserIcon className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-bold text-black">No hosts found</h3>
            <p className="text-xs text-zinc-500">
              {searchQuery ? `No host matched "${searchQuery}"` : 'No registered hosts are available right now.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHosts.map((host) => (
              <div
                key={host.id}
                className="bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xs hover:shadow-xl hover:border-black transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  {/* Host Avatar & Name */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {host.avatar ? (
                        <img
                          src={host.avatar}
                          alt={host.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-black text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                          {host.name ? host.name.charAt(0).toUpperCase() : 'H'}
                        </div>
                      )}
                      <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Active Host" />
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-lg font-extrabold text-black group-hover:text-zinc-800 truncate">
                        {host.name || `Host #${host.id}`}
                      </h3>
                      <p className="text-xs font-medium text-zinc-500 truncate">
                        {host.email || `host${host.id}@example.com`}
                      </p>
                     
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    Available for consultations, strategy sessions, technical discussions, and code reviews.
                  </p>
                </div>

                {/* Card CTA */}
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${host.id}`)}
                  className="w-full py-3 px-4 rounded-xl bg-black group-hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>View Profile</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
