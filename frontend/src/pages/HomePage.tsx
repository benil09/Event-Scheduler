import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, Search, User as UserIcon, ChevronRight, Globe, Calendar
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
    <div className="space-y-12 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Clean Hero Section */}
      <section className="rounded-3xl bg-black text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-80 h-80 rounded-full bg-zinc-800/40 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            Instant Meeting Booking
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Easy scheduling ahead.
          </h1>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Browse available hosts, pick a convenient time slot, and confirm your appointment in seconds — without any account required.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#host-directory"
              className="px-6 py-3 rounded-xl bg-white hover:bg-zinc-100 text-black font-extrabold text-xs uppercase tracking-wider shadow-md inline-flex items-center gap-2 transition-transform hover:scale-[1.02]"
            >
              <span>Browse Hosts</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              to="/login"
              className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Host Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Host Directory Section */}
      <section id="host-directory" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-black">
              Available Hosts
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Select a host to view their event types and book an open time slot.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium focus:outline-none focus:border-black bg-white transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-zinc-500">Loading hosts...</p>
          </div>
        ) : filteredHosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-zinc-200 space-y-3">
            <UserIcon className="w-10 h-10 text-zinc-300 mx-auto" />
            <h3 className="text-base font-bold text-black">No hosts found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">
              {searchQuery ? `No host matched "${searchQuery}".` : 'No registered hosts are available right now.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredHosts.map((host) => (
              <div
                key={host.id}
                className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-2xs hover:shadow-md hover:border-black transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  {/* Host Info */}
                  <div className="flex items-center gap-3.5">
                    <div className="relative shrink-0">
                      {host.avatar ? (
                        <img
                          src={host.avatar}
                          alt={host.name}
                          className="w-13 h-13 rounded-full object-cover border border-zinc-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-13 h-13 rounded-full bg-black text-white font-extrabold text-base flex items-center justify-center shadow-sm">
                          {host.name ? host.name.charAt(0).toUpperCase() : 'H'}
                        </div>
                      )}
                      <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" title="Active Host" />
                    </div>

                    <div className="overflow-hidden">
                      <h3 className="text-base font-extrabold text-black group-hover:text-zinc-800 truncate">
                        {host.name || `Host #${host.id}`}
                      </h3>
                      <p className="text-xs text-zinc-500 truncate">
                        {host.email || ''}
                      </p>
                      {host.timezone && (
                        <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                          <Globe className="w-3 h-3" />
                          <span>{host.timezone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${host.id}`)}
                  className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 group-hover:bg-black text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>View Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};

