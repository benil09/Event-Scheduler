import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar as CalendarIcon, User, Video, Mail, HelpCircle, ArrowLeft } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const eventTitle = state.eventTitle || 'Strategy Sync & Product Roadmap';
  const hostName = state.hostName || 'Sarah Jenkins';
  const formattedTime = state.formattedTime || 'Tuesday, Nov 12, 2024 2:00 PM — 2:45 PM (GMT-5)';
  const slotStartAt = state.slotStartAt || new Date().toISOString();

  const handleDownloadIcs = () => {
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
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 space-y-10">
      
      {/* Top Hero Section matching Image 4 */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <div className="w-20 h-20 rounded-full bg-black text-white flex items-center justify-center mx-auto shadow-xl">
          <Check className="w-10 h-10 stroke-[3]" />
        </div>

        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252] block">
          BOOKING CONFIRMED
        </span>

        <h1 className="text-4xl font-extrabold text-[#1b1b1b] tracking-tight">
          You're all set!
        </h1>

        <p className="text-sm text-[#525252] leading-relaxed">
          We've sent a confirmation email and calendar invitation to your inbox.
        </p>
      </div>

      {/* Main Event Card matching Image 4 */}
      <div className="bg-white rounded-2xl p-8 border-2 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] space-y-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">EVENT</span>
            <h2 className="text-2xl font-extrabold text-black mt-1">{eventTitle}</h2>
          </div>

          <div className="w-12 h-12 rounded-full bg-black text-white font-extrabold text-lg flex items-center justify-center shadow-md">
            {hostName.charAt(0)}
          </div>
        </div>

        {/* Two Detail Boxes: Date & Time + Host Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Box 1: Date & Time */}
          <div className="p-4 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-[#e2e2e2] flex items-center justify-center text-black shrink-0">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#525252] block">Date & Time</span>
              <p className="text-xs font-extrabold text-black mt-0.5">{formattedTime}</p>
            </div>
          </div>

          {/* Box 2: Host Info */}
          <div className="p-4 rounded-xl border border-[#e2e2e2] bg-[#f9f9f9] flex items-start gap-3">
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
            className="py-3 px-4 rounded-xl bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <Video className="w-4 h-4" />
            Join Google Meet
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className="py-3 px-4 rounded-xl border border-[#e2e2e2] hover:bg-[#F5F5F5] text-xs font-extrabold text-black flex items-center justify-center gap-2 transition-colors"
          >
            <CalendarIcon className="w-4 h-4" />
            Add to Calendar (.ics)
          </button>
        </div>
      </div>

      {/* Bottom Info Cards matching Image 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {/* Card 1: Email Confirmation Sent */}
        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e2] shadow-2xs flex items-start gap-3">
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
        <div className="bg-white p-5 rounded-2xl border border-[#e2e2e2] shadow-2xs flex items-start gap-3">
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

      <div className="text-center pt-4">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-black hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};
