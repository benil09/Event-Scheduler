import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, User, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    booking?: any;
    hostName?: string;
    eventTitle?: string;
    duration?: number;
    formattedTime?: string;
  } || {};

  return (
    <div className="max-w-xl mx-auto py-12 px-4">
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xl text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-1">
          <h1 className="text-2xl font-extrabold text-slate-900">You're Scheduled!</h1>
          <p className="text-xs text-slate-500">
            A calendar invitation has been generated and queued for delivery.
          </p>
        </div>

        {/* Booking Summary Card */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/60 text-left space-y-4">
          <div className="border-b border-slate-200/60 pb-3">
            <h3 className="text-lg font-bold text-slate-900">
              {state.eventTitle || '30 Min Sync'}
            </h3>
            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
              <User className="w-3.5 h-3.5 text-brand-600" />
              Hosted by {state.hostName || 'Host'}
            </p>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <span className="font-semibold">{state.formattedTime || 'Confirmed Date & Time'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>{state.duration || 30} minutes duration</span>
            </div>

            {state.booking?.guestEmail && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-600" />
                <span>Confirmation sent to <strong className="text-slate-900">{state.booking.guestEmail}</strong></span>
              </div>
            )}
          </div>
        </div>

        {/* Workflow Info Badge */}
        <div className="p-3 rounded-xl bg-brand-50/60 border border-brand-100 text-brand-800 text-xs flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-600" />
          <span>Temporal Workflow active for reminders and Google Calendar sync.</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
