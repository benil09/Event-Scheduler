import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar as CalendarIcon, User, Video, Mail, HelpCircle, ArrowLeft, Download, Sparkles } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const eventTitle = state.eventTitle || 'Strategy Sync & Product Roadmap';
  const hostName = state.hostName || 'Alexander Reed';
  const formattedTime = state.formattedTime || 'Tuesday, Nov 12, 2024 2:00 PM — 2:45 PM (GMT-5)';
  const slotStartAt = state.slotStartAt || new Date().toISOString();

  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadIcs = () => {
    setDownloaded(true);
    const startDate = new Date(slotStartAt);
    const endDate = new Date(startDate.getTime() + 30 * 60000);

    const formatDateForIcs = (d: Date) => {
      return d.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kinetic Platform//Event Scheduler//EN',
      'BEGIN:VEVENT',
      `SUMMARY:${eventTitle} with ${hostName}`,
      `DESCRIPTION:Confirmed appointment for ${eventTitle}.`,
      `DTSTART:${formatDateForIcs(startDate)}`,
      `DTEND:${formatDateForIcs(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${eventTitle.toLowerCase().replace(/\s+/g, '-')}-invite.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10 relative overflow-hidden">
      
      {/* Decorative Celebration Floating Particles */}
      <div className="absolute top-6 left-12 w-3 h-3 rounded-full bg-emerald-400 animate-float-slow opacity-75 pointer-events-none" />
      <div className="absolute top-12 right-16 w-4 h-4 rounded-md bg-black animate-float-fast opacity-60 pointer-events-none" />
      <div className="absolute top-24 left-1/4 w-2 h-2 rounded-full bg-amber-400 animate-float-slow opacity-80 pointer-events-none" />
      <div className="absolute top-20 right-1/3 w-3 h-3 rounded-full bg-[#171717] animate-float-fast opacity-50 pointer-events-none" />

      {/* Top Hero Section with Pop & Pulse Animation */}
      <div className="text-center space-y-4 max-w-xl mx-auto animate-card-slide-up">
        <div className="relative inline-block">
          {/* Animated Glow Ring */}
          <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-2xl animate-pulse-glow">
            <div className="animate-checkmark-pop">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
          </div>
          {/* Sparkle Icon Accent */}
          <Sparkles className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252] block">
            BOOKING CONFIRMED
          </span>
          <h1 className="text-4xl font-extrabold text-[#1b1b1b] tracking-tight mt-1">
            You're all set!
          </h1>
          <p className="text-sm text-[#525252] leading-relaxed mt-2">
            We've sent a confirmation email and calendar invitation to your inbox.
          </p>
        </div>
      </div>

      {/* Main Event Card matching Image 4 with Slide-up Animation */}
      <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] space-y-6 max-w-2xl mx-auto animate-card-slide-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">EVENT</span>
            <h2 className="text-2xl font-extrabold text-black mt-1">{eventTitle}</h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-black text-white font-extrabold text-lg flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform">
            {hostName.charAt(0)}
          </div>
        </div>

        {/* Two Detail Boxes: Date & Time + Host Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Box 1: Date & Time */}
          <div className="p-4 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-start gap-3 hover:border-black transition-colors">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e2e2] flex items-center justify-center text-black shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#525252] block">Date & Time</span>
              <p className="text-xs font-extrabold text-black mt-0.5">{formattedTime}</p>
            </div>
          </div>

          {/* Box 2: Host Info */}
          <div className="p-4 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-start gap-3 hover:border-black transition-colors">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e2e2] flex items-center justify-center text-black shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#525252] block">Host</span>
              <p className="text-xs font-extrabold text-black mt-0.5">{hostName}</p>
              <p className="text-[11px] text-[#525252]">Host Director</p>
            </div>
          </div>
        </div>

        {/* Action Buttons matching Image 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3.5 px-4 rounded-xl bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98] group"
          >
            <Video className="w-4 h-4 group-hover:animate-pulse" />
            Join Google Meet
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className={`py-3.5 px-4 rounded-xl border transition-all text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer ${
              downloaded
                ? 'bg-emerald-500 text-white border-emerald-600 scale-105'
                : 'border-[#e2e2e2] hover:border-black hover:bg-[#F5F5F5] text-black hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Downloaded Invite!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Add to Calendar (.ics)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Info Cards matching Image 4 with Staggered Fade-in */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto animate-card-slide-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
        {/* Card 1: Email Confirmation Sent */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e2] shadow-2xs flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#e2e2e2] flex items-center justify-center text-black shrink-0">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">EMAIL CONFIRMATION SENT</h4>
            <p className="text-xs text-[#525252] mt-1 leading-relaxed">
              You'll find all the meeting details and a link to reschedule in your inbox.
            </p>
          </div>
        </div>

        {/* Card 2: Need to Make Changes? */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e2] shadow-2xs flex items-start gap-3 hover:shadow-md transition-shadow">
          <div className="w-8 h-8 rounded-lg bg-[#F5F5F5] border border-[#e2e2e2] flex items-center justify-center text-black shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-black uppercase tracking-wider">NEED TO MAKE CHANGES?</h4>
            <p className="text-xs text-[#525252] mt-1 leading-relaxed">
              Use the link in your email or contact support directly.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 animate-card-slide-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards] flex items-center justify-center gap-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-black hover:underline transition-transform hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Home & Host Directory
        </Link>
      </div>
    </div>
  );
};
