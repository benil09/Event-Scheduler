import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar as CalendarIcon, Globe, ChevronLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../api/client';
import type { EventType, User as UserModel } from '../store/useAppStore';

export interface SlotItem {
  id: string | number;
  startAt: string;
  endAt: string;
  status: string;
}

export const PublicBookingPage: React.FC = () => {
  const { userId, slug } = useParams<{ userId: string; slug: string }>();
  const navigate = useNavigate();

  const [host, setHost] = useState<UserModel | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Booking Flow State
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);
  const [step, setStep] = useState<'slot-selection' | 'guest-form'>('slot-selection');

  // Guest details form
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPublicEventDetails();
  }, [userId, slug]);

  const fetchPublicEventDetails = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (!userId || !slug) return;
      const res = await api.getPublicEventType(Number(userId), slug);
      const eventData = res.data || res;

      if (eventData) {
        setEventType({
          ...eventData,
          duration: eventData.durationMin || eventData.duration || 30,
        });

        const hostData = eventData.host || {};
        setHost({
          id: hostData.id || Number(userId),
          name: hostData.name || `Host #${userId}`,
          email: hostData.Email || hostData.email || `host${userId}@example.com`,
          timezone: hostData.timezone || 'UTC',
        });

        if (Array.isArray(eventData.availableSlots)) {
          setAvailableSlots(eventData.availableSlots);
        }
      }
    } catch (err: any) {
      console.error("Public event fetch error", err);
      setErrorMsg(err.response?.data?.message || 'Could not fetch public event details');
    } finally {
      setLoading(false);
    }
  };

  // Filter available slots for the chosen date
  const filteredSlots = availableSlots.filter(slot => {
    const slotDate = new Date(slot.startAt).toISOString().split('T')[0];
    return slotDate === selectedDateStr;
  });

  const handleSlotSelect = (slot: SlotItem) => {
    setSelectedSlot(slot);
    setStep('guest-form');
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestEmail || !selectedSlot || !eventType || !userId) return;

    setSubmitting(true);
    try {
      const bookingPayload = {
        slotId: String(selectedSlot.id),
        inviteeName: guestName,
        inviteeEmail: guestEmail,
        inviteeNotes: guestNotes,
        hostId: Number(userId),
      };

      const result = await api.createBooking(bookingPayload);

      const slotStartTime = new Date(selectedSlot.startAt);
      const formattedTimeStr = `${slotStartTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })} at ${slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      navigate('/booking-confirmed', {
        state: {
          booking: result.data?.booking || result.booking || bookingPayload,
          hostName: host?.name || `Host #${userId}`,
          eventTitle: eventType.title,
          duration: eventType.duration,
          formattedTime: formattedTimeStr,
        },
      });
    } catch (err: any) {
      console.error("Booking submission error", err);
      alert(err.response?.data?.message || 'Failed to submit booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading schedule options...</p>
        </div>
      </div>
    );
  }

  if (errorMsg && !eventType) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Event Not Found</h3>
        <p className="text-xs text-slate-500">{errorMsg}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
        {/* Left Column: Event Metadata */}
        <div className="md:col-span-5 p-8 bg-slate-50 border-r border-slate-200/80 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-brand-500/20">
                {host?.name.charAt(0) || 'H'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Host</h4>
                <p className="text-sm font-bold text-slate-900">{host?.name}</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {eventType?.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-brand-600" />
                  {eventType?.duration} mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-brand-600" />
                  {host?.timezone || 'UTC'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              {eventType?.description || 'Please select an available date and time slot to confirm your appointment.'}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200/60 text-[11px] text-slate-400">
            Powered by EventScheduler & Temporal Workflows
          </div>
        </div>

        {/* Right Column: Slot Picker or Guest Form */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between">
          {step === 'slot-selection' ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-brand-600" />
                  Select Date & Time Slot
                </h3>
              </div>

              {/* Date Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">Selected Date</label>
                <input
                  type="date"
                  value={selectedDateStr}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDateStr(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              {/* Time Slots Grid */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-600">Available Time Slots</label>
                {filteredSlots.length === 0 ? (
                  <div className="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-500">
                      No slots available for {new Date(selectedDateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}.
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">Please pick another date.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {filteredSlots.map((slot) => {
                      const startTime = new Date(slot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <button
                          key={slot.id}
                          onClick={() => handleSlotSelect(slot)}
                          className="py-3 px-2 rounded-xl text-xs font-bold border border-slate-200 hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 text-slate-700 transition-all flex items-center justify-center gap-1 group"
                        >
                          <span>{startTime}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Step 2: Guest Details Form */
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <button
                  type="button"
                  onClick={() => setStep('slot-selection')}
                  className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to times
                </button>
                {selectedSlot && (
                  <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                    {new Date(selectedSlot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900">Enter Your Information</h3>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Additional Notes</label>
                <textarea
                  rows={2}
                  placeholder="Please share anything that will help prepare for our meeting."
                  value={guestNotes}
                  onChange={(e) => setGuestNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-md shadow-brand-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
              >
                {submitting ? (
                  <span>Processing Booking...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Booking
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
