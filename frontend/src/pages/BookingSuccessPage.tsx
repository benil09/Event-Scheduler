import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Calendar as CalendarIcon, User, Video, ArrowLeft, Download } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};

  const eventTitle = state.eventTitle || 'Confirmed Meeting';
  const hostName = state.hostName || 'Host';
  const formattedTime = state.formattedTime || 'Upcoming Scheduled Appointment';
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
      'PRODID:-//EventScheduler//EN',
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
    <div className="max-w-xl mx-auto py-12 px-4 space-y-8">
      
      {/* Header with success checkmark */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100 shadow-xs">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-black tracking-tight mt-2">
            You're scheduled!
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            An email with the calendar invitation has been sent to your inbox.
          </p>
        </div>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-2xs space-y-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">EVENT</span>
          <h2 className="text-xl font-extrabold text-black mt-0.5">{eventTitle}</h2>
        </div>

        <div className="space-y-3 pt-1 border-t border-zinc-100">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <CalendarIcon className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Date & Time</span>
              <p className="text-xs font-bold text-black mt-0.5">{formattedTime}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-100">
            <User className="w-4 h-4 text-zinc-400 mt-0.5 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-bold text-zinc-400 block">Host</span>
              <p className="text-xs font-bold text-black mt-0.5">{hostName}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <a
            href="https://meet.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-xs flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <Video className="w-4 h-4" />
            Join Google Meet
          </a>

          <button
            type="button"
            onClick={handleDownloadIcs}
            className={`py-3 px-4 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              downloaded
                ? 'bg-emerald-500 text-white border-emerald-600'
                : 'border-zinc-200 hover:border-black hover:bg-zinc-50 text-black'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{downloaded ? 'Downloaded!' : 'Add to Calendar (.ics)'}</span>
          </button>
        </div>
      </div>

      <div className="text-center pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Host Directory</span>
        </Link>
      </div>
    </div>
  );
};
