import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Calendar as CalendarIcon, Globe, ChevronLeft, CheckCircle2, AlertCircle, CalendarCheck, User, Mail, FileText } from 'lucide-react';
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
      const formattedTimeStr = `${slotStartTime.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} at ${slotStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

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
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-zinc-500">Loading schedule options...</p>
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
        <h3 className="text-lg font-bold text-black">Event Not Found</h3>
        <p className="text-xs text-zinc-500">{errorMsg}</p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 rounded-xl bg-black text-white font-bold text-xs"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="bg-white rounded-3xl border border-zinc-200 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Left Column: Event & Host Summary */}
        <div className="md:col-span-5 p-8 bg-zinc-50 border-r border-zinc-200 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center font-extrabold text-lg shadow-md">
                {host?.name.charAt(0) || 'H'}
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Host Profile</h4>
                <p className="text-sm font-extrabold text-black">{host?.name}</p>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <h2 className="text-2xl font-extrabold text-black leading-tight">
                {eventType?.title}
              </h2>
              <div className="flex items-center gap-4 text-xs font-bold text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-black" />
                  {eventType?.duration} mins
                </span>
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-black" />
                  {host?.timezone || 'UTC'}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed pt-2">
              {eventType?.description || 'Please select an available date and time slot to confirm your appointment.'}
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-200 text-[11px] text-zinc-400 font-medium">
            Powered by EventScheduler & Google Calendar Integration
          </div>
        </div>

        {/* Right Column: Date Picker + Time Slots + Guest Details on SAME SCREEN */}
        <div className="md:col-span-7 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Step Header */}
            <div className="border-b border-zinc-100 pb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-black uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-black" />
                Select Date & Time Slot
              </h3>
              {selectedSlot && (
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Change Slot
                </button>
              )}
            </div>

            {/* Date Picker Bar */}
            <div>
              <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
                Pick Date
              </label>
              <input
                type="date"
                value={selectedDateStr}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => {
                  setSelectedDateStr(e.target.value);
                  setSelectedSlot(null);
                }}
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black bg-white"
              />
            </div>

            {/* Available Time Slots Grid for Selected Date */}
            {!selectedSlot ? (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-black uppercase tracking-wider">
                  Available Slots for {new Date(selectedDateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                </label>

                {filteredSlots.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                    <CalendarCheck className="w-8 h-8 text-zinc-300 mx-auto mb-2" />
                    <p className="text-xs font-bold text-zinc-600">
                      No slots available for {new Date(selectedDateStr).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}.
                    </p>
                    <p className="text-[11px] text-zinc-400 mt-1">Please select another date on the calendar.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
                    {filteredSlots.map((slot) => {
                      const startTime = new Date(slot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className="py-3 px-3 rounded-xl text-xs font-extrabold border border-zinc-300 hover:border-black hover:bg-black hover:text-white text-zinc-800 transition-all flex items-center justify-center gap-1.5 shadow-2xs group"
                        >
                          <Clock className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                          <span>{startTime}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ) : (
              /* Guest Booking Form right below selected slot on the same screen */
              <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2 border-t border-zinc-100">
                <div className="p-3.5 rounded-2xl bg-black text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Selected Slot</span>
                    <span className="text-sm font-extrabold">
                      {new Date(selectedSlot.startAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(selectedSlot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Your Full Name *</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-zinc-300 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Email Address *</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-zinc-300 text-sm font-bold text-black focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1">Additional Notes</label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      placeholder="Please share anything that will help prepare for our meeting."
                      value={guestNotes}
                      onChange={(e) => setGuestNotes(e.target.value)}
                      className="w-full px-4 py-2.5 pl-10 rounded-xl border border-zinc-300 text-sm font-medium text-black focus:outline-none focus:ring-2 focus:ring-black resize-none"
                    />
                    <FileText className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  {submitting ? (
                    <span>Processing Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Confirm & Book Appointment
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
