import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, User as UserIcon, LogOut, LayoutDashboard, Clock } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUserId, currentUser, setCurrentUserId, fetchUsers } = useUserStore();

  const isPublicPage = location.pathname.startsWith('/book') || location.pathname === '/booking-confirmed';
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (currentUserId && currentUserId > 0) {
      fetchUsers();
    }
  }, [currentUserId]);

  const handleLogout = () => {
    localStorage.removeItem('event_scheduler_user_id');
    setCurrentUserId(0);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-8">
            <Link to={currentUserId ? "/dashboard" : "/login"} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-black tracking-tight block">EventScheduler</span>
                <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider block -mt-1">
                  {isPublicPage ? 'Guest Booking Portal' : 'Host Control Center'}
                </span>
              </div>
            </Link>

            {/* Admin Host Navigation Links */}
            {!isPublicPage && !isLoginPage && currentUserId > 0 && (
              <nav className="hidden md:flex items-center gap-1">
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-colors ${
                    location.pathname === '/dashboard' || location.pathname === '/'
                      ? 'bg-black text-white shadow-sm'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Host Workspace
                </Link>
                <Link
                  to="/events/new"
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-colors ${
                    location.pathname.startsWith('/events')
                      ? 'bg-black text-white shadow-sm'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  Add Event Type
                </Link>
              </nav>
            )}
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            

            {/* Host Auth Controls */}
            {!isPublicPage && !isLoginPage && currentUserId > 0 ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-bold text-zinc-900">
                  <UserIcon className="w-4 h-4 text-black" />
                  <span>{currentUser?.name || `Host #${currentUserId}`}</span>
                  <span className="bg-black text-white px-1.5 py-0.5 rounded text-[10px]">ID: {currentUserId}</span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-xl border border-zinc-200 hover:border-black hover:bg-black hover:text-white text-zinc-500 transition-colors"
                  title="Logout Host Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : isLoginPage ? (
              <div className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Host Identification</div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};
