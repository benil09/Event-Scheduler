import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, CalendarCheck, CalendarRange, ChevronDown, 
  LogOut, Menu, X, ExternalLink
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

interface SidebarLayoutProps {
  children: React.ReactNode;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, currentUserId, logout } = useUserStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowProfileMenu(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    {
      name: 'Event Types',
      to: '/dashboard',
      icon: Calendar,
      isActive: location.pathname === '/dashboard' && !location.search,
    },
    {
      name: 'Scheduled Bookings',
      to: '/dashboard?tab=bookings',
      icon: CalendarCheck,
      isActive: location.search.includes('tab=bookings'),
    },
    {
      name: 'Availability Hours',
      to: '/dashboard?tab=availability',
      icon: CalendarRange,
      isActive: location.search.includes('tab=availability'),
    },
  ];

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b] font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-[#e2e2e2] px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-500 hover:text-black hover:bg-zinc-100 md:hidden cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* EventScheduler Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base text-black tracking-tight block leading-tight">EventScheduler</span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Host Portal</span>
            </div>
          </Link>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-3">
          {currentUserId > 0 && (
            <Link
              to={`/profile/${currentUserId}`}
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-zinc-200 hover:border-black text-xs font-bold text-zinc-700 hover:text-black transition-colors"
            >
              <span>Public Profile</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          )}

          {/* Host User Avatar Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl border border-zinc-200 hover:border-black transition-all bg-white cursor-pointer"
            >
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'H'}
                </div>
              )}
              <span className="text-xs font-bold text-zinc-800 hidden sm:inline">{currentUser?.name || 'My Account'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-zinc-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2.5 border-b border-zinc-100 flex items-center gap-3">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center">
                      {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'H'}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-extrabold text-black truncate">{currentUser?.name || 'Host Account'}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{currentUser?.email || ''}</p>
                  </div>
                </div>

                <Link
                  to="/"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 flex items-center gap-2"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Explore All Hosts
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-zinc-100 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#e2e2e2] px-4 py-3 space-y-1 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  item.isActive ? 'bg-black text-white' : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.name}
              </Link>
            );
          })}
        </div>
      )}

      {/* Body Area with Left Sidebar + Content */}
      <div className="flex-1 flex min-h-[calc(100vh-4rem-3.5rem)]">
        {/* Left Sidebar */}
        <aside className="w-60 bg-white border-r border-[#e2e2e2] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest px-3 mb-2 block">
              Menu
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all ${
                    item.isActive
                      ? 'bg-black text-white shadow-sm'
                      : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/70 text-[11px] text-zinc-500 space-y-1">
            <p className="font-bold text-black">Fast Scheduling</p>
            <p>Invitees pick from your open slots automatically.</p>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Footer Bar */}
      <footer className="h-12 bg-white border-t border-[#e2e2e2] px-4 md:px-8 flex items-center justify-between text-xs text-zinc-400 font-medium">
        <div>EventScheduler · Fast & Simple Meetings</div>
        <Link to="/" className="hover:text-black transition-colors font-semibold">
          Host Directory
        </Link>
      </footer>
    </div>
  );
};
