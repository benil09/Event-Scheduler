import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, User as UserIcon, LogOut, LayoutDashboard, ArrowRight } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { currentUserId, currentUser, logout, fetchUsers } = useUserStore();

  useEffect(() => {
    if (currentUserId && currentUserId > 0) {
      fetchUsers();
    }
  }, [currentUserId]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-[#1b1b1b] font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-lg text-black tracking-tight block leading-none">EventScheduler</span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block mt-0.5">
                    Guest Booking & Scheduling
                  </span>
                </div>
              </Link>

              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-2">
                <Link
                  to="/"
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-colors ${
                    location.pathname === '/'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  Overview & Hosts
                </Link>
              </nav>
            </div>

            {/* Right Status & Auth */}
            <div className="flex items-center gap-3">
              {/* Host Auth State */}
              {currentUserId && currentUserId > 0 ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-xs font-bold text-zinc-900 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-black" />
                    <span>Host Workspace</span>
                  </Link>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black text-white text-xs font-bold">
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>{currentUser?.name || `Host #${currentUserId}`}</span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    className="p-2 rounded-xl border border-zinc-200 hover:border-black hover:bg-black hover:text-white text-zinc-500 transition-colors"
                    title="Logout Host Session"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all hover:scale-[1.02]"
                >
                  <span>Host Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Public Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-semibold">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-black" />
            <span className="font-extrabold text-black">EventScheduler</span>
            <span>— High-Performance Appointment Engine</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-black transition-colors">Home & Host Directory</Link>
            <Link to="/login" className="hover:text-black transition-colors">Host Portal Login</Link>
            <a href="http://localhost:8080" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Temporal UI</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
