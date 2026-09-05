import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Share2, Search, Bell, ChevronDown, 
  LogOut, Sliders, Menu, X
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

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1b1b1b] font-sans flex flex-col selection:bg-black selection:text-white">
      {/* Top Header Bar */}
      <header className="h-16 bg-white border-b border-[#e2e2e2] px-4 md:px-6 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#525252] hover:text-black md:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Kinetic Logo */}
          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-extrabold text-sm tracking-tighter group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </div>
            <span className="font-extrabold text-lg text-black tracking-tight font-sans">Kinetic</span>
          </Link>

          {/* Top Horizontal Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold tracking-wide text-[#525252]">
            <Link 
              to="/dashboard" 
              className={`hover:text-black transition-colors ${location.pathname === '/dashboard' && !location.search ? 'text-black font-extrabold' : ''}`}
            >
              Events
            </Link>
            <Link 
              to="/dashboard?tab=bookings" 
              className={`hover:text-black transition-colors ${location.search.includes('tab=bookings') ? 'text-black font-extrabold' : ''}`}
            >
              Scheduled
            </Link>
            <Link
              to="/dashboard?tab=availability"
              className={`hover:text-black transition-colors ${location.search.includes('tab=availability') ? 'text-black font-extrabold' : ''}`}
            >
              Integrations
            </Link>
          </nav>
        </div>

        {/* Top Right Utilities */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 rounded-lg text-[#525252] hover:text-black hover:bg-[#F5F5F5] transition-colors" title="Search">
            <Search className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-lg text-[#525252] hover:text-black hover:bg-[#F5F5F5] transition-colors relative" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-black absolute top-2 right-2 border border-white" />
          </button>

          {/* Host User Avatar Menu */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full border border-[#e2e2e2] hover:border-black transition-all bg-white"
            >
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center">
                  {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'H'}
                </div>
              )}
              <ChevronDown className="w-3.5 h-3.5 text-[#525252] mr-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-[#171717] shadow-[4px_4px_0px_rgba(0,0,0,1)] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-2.5 border-b border-[#e2e2e2] flex items-center gap-3">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-9 h-9 rounded-full object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-black text-white font-extrabold text-xs flex items-center justify-center">
                      {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'H'}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-extrabold text-black truncate">{currentUser?.name || `Host #${currentUserId}`}</p>
                    <p className="text-[11px] text-[#525252] truncate">{currentUser?.email || 'Authenticated User'}</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  onClick={() => setShowProfileMenu(false)}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-[#1b1b1b] hover:bg-[#F5F5F5] flex items-center gap-2"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  Dashboard Overview
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-[#e2e2e2]"
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
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold ${
              location.pathname === '/dashboard' && !location.search ? 'bg-black text-white' : 'text-[#525252]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            Event Types
          </Link>
          <Link
            to="/dashboard?tab=bookings"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold ${
              location.search.includes('tab=bookings') ? 'bg-black text-white' : 'text-[#525252]'
            }`}
          >
            <Clock className="w-4 h-4" />
            Scheduled Events
          </Link>

          <Link
            to="/dashboard?tab=availability"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold ${
              location.search.includes('tab=availability') ? 'bg-black text-white' : 'text-[#525252]'
            }`}
          >
            <Share2 className="w-4 h-4" />
            Integrations & Hours
          </Link>
        </div>
      )}

      {/* Body Area with Left Sidebar + Content */}
      <div className="flex-1 flex min-h-[calc(100vh-4rem-3.5rem)]">
        {/* Left Sidebar */}
        <aside className="w-60 bg-white border-r border-[#e2e2e2] p-4 flex flex-col justify-between shrink-0 hidden md:flex">
          <div className="space-y-1.5">
            <Link
              to="/dashboard"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                location.pathname === '/dashboard' && !location.search
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[#525252] hover:text-black hover:bg-[#F5F5F5]'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Event Types
            </Link>

            <Link
              to="/dashboard?tab=bookings"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                location.search.includes('tab=bookings')
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[#525252] hover:text-black hover:bg-[#F5F5F5]'
              }`}
            >
              <Clock className="w-4 h-4" />
              Scheduled Events
            </Link>

            <Link
              to="/dashboard?tab=availability"
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold tracking-wide transition-all ${
                location.search.includes('tab=availability')
                  ? 'bg-black text-white shadow-sm'
                  : 'text-[#525252] hover:text-black hover:bg-[#F5F5F5]'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Integrations
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Footer Bar */}
      <footer className="h-14 bg-white border-t border-[#e2e2e2] px-4 md:px-8 flex items-center justify-between text-xs font-semibold text-[#525252]">
        <div>© 2024 Kinetic Platform.</div>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="hover:text-black cursor-pointer transition-colors">Support</span>
          <span className="hover:text-black cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-black cursor-pointer transition-colors">Terms</span>
        </div>
      </footer>
    </div>
  );
};
