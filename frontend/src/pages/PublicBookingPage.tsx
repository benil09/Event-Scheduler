import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Globe, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Video } from 'lucide-react';
import { useEventStore } from '../store/useEventStore';
import { useBookingStore } from '../store/useBookingStore';
import type { EventType, User as UserModel, SlotItem } from '../store/types';

export const PublicBookingPage: React.FC = () => {
  const { userId, slug } = useParams<{ userId: string; slug: string }>();
  const navigate = useNavigate();
  const { fetchPublicEventType } = useEventStore();
  const { createBooking } = useBookingStore();

  const [host, setHost] = useState<UserModel | null>(null);
  const [eventType, setEventType] = useState<EventType | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Calendar Date State
  const [currentMonthDate, setCurrentMonthDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<SlotItem | null>(null);

  // Guest Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestNotes, setGuestNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchPublicEventDetails = useCallback(async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      if (!userId || !slug) return;
      const eventData = await fetchPublicEventType(Number(userId), slug);

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
  }, [userId, slug]);

  useEffect(() => {
    fetchPublicEventDetails();
  }, [fetchPublicEventDetails]);

  const handlePrevMonth = () => {
    const newD = new Date(currentMonthDate);
    newD.setMonth(newD.getMonth() - 1);
    setCurrentMonthDate(newD);
  };

  const handleNextMonth = () => {
    const newD = new Date(currentMonthDate);
    newD.setMonth(newD.getMonth() + 1);
    setCurrentMonthDate(newD);
  };

  // Filter slots for the chosen date using UTC date comparison
  const filteredSlots = availableSlots.filter(slot => {
    const slotDate = new Date(slot.startAt);
    return (
      slotDate.getUTCFullYear() === selectedDate.getFullYear() &&
      slotDate.getUTCMonth() === selectedDate.getMonth() &&
      slotDate.getUTCDate() === selectedDate.getDate()
    );
  });

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !selectedSlot || !eventType || !userId) return;

    setSubmitting(true);
    try {
      const bookingPayload = {
        slotId: String(selectedSlot.id),
        inviteeName: guestName.trim(),
        inviteeEmail: guestEmail.trim(),
        inviteeNotes: guestNotes.trim(),
        hostId: Number(userId),
      };

      const result = await createBooking(bookingPayload);

      const slotStartTime = new Date(selectedSlot.startAt);
      const formattedTimeStr = `${slotStartTime.toLocaleDateString(undefined, { timeZone: 'UTC', weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })} at ${slotStartTime.toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false })}`;

      navigate('/booking-confirmed', {
        state: {
          booking: result?.data?.booking || result?.booking || bookingPayload,
          hostName: host?.name || `Host #${userId}`,
          eventTitle: eventType.title,
          duration: eventType.duration,
          formattedTime: formattedTimeStr,
          slotStartAt: selectedSlot.startAt,
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
          <div className="w-8 h-8 border-3 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-zinc-500">Loading available times...</p>
        </div>
      </div>
    );
  }

  if (errorMsg && !eventType) {
    return (
      <div className="max-w-md mx-auto py-12 text-center space-y-4">
        <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-black">Event Not Found</h3>
        <p className="text-xs text-zinc-500">{errorMsg}</p>
        <button
          onClick={() => navigate(userId ? `/profile/${userId}` : '/')}
          className="px-5 py-2.5 rounded-xl bg-black text-white font-bold text-xs cursor-pointer"
        >
          Return to Host Profile
        </button>
      </div>
    );
  }

  const currentMonthName = currentMonthDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-4">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => navigate(userId ? `/profile/${userId}` : '/')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-black transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Host Profile</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        
        {/* Left Column: Event & Host Info */}
        <div className="md:col-span-5 p-6 sm:p-8 bg-zinc-50/50 border-r border-zinc-200 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Host Avatar and Name */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {host?.avatar ? (
                  <img src={host.avatar} alt={host.name} className="w-13 h-13 rounded-full object-cover border border-zinc-200 shadow-xs" />
                ) : (
                  <div className="w-13 h-13 rounded-full bg-black text-white font-extrabold text-lg flex items-center justify-center shadow-xs">
                    {host?.name ? host.name.charAt(0).toUpperCase() : 'H'}
                  </div>
                )}
                <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-zinc-400">HOST</span>
                <h3 className="text-base font-extrabold text-black leading-tight">{host?.name}</h3>
              </div>
            </div>

            {/* Event Title & Description */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-black leading-snug">
                {eventType?.title}
              </h2>
              {eventType?.description && (
                <p className="text-xs text-zinc-600 leading-relaxed">
                  {eventType.description}
                </p>
              )}
            </div>

            {/* Metadata Rows */}
            <div className="space-y-2.5 pt-2 text-xs font-semibold text-zinc-700">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{eventType?.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-zinc-400" />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-zinc-400" />
                <span>{host?.timezone || 'UTC'} Timezone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Date & Slot Picker or Guest Form */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <h3 className="text-base font-extrabold text-black">
                {selectedSlot ? 'Enter Your Details' : 'Select a Date & Time'}
              </h3>
              {selectedSlot && (
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs font-bold text-zinc-500 hover:text-black flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to times
                </button>
              )}
            </div>

            {!selectedSlot ? (
              <div className="space-y-6">
                {/* Month Navigator Header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-black">{currentMonthName}</span>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 transition-colors cursor-pointer" 
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4 text-black" />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-100 transition-colors cursor-pointer" 
                      title="Next Month"
                    >
                      <ChevronRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                {/* Day Headers (S M T W T F S) */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-zinc-400">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-1 text-center">
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`offset-${i}`} className="w-8 h-8 mx-auto" />
                  ))}

                  {Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map((dayNum) => {
                    const dateObj = new Date(year, month, dayNum);
                    const isSelected = selectedDate.getDate() === dayNum && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => setSelectedDate(dateObj)}
                        className={`w-8 h-8 rounded-full mx-auto text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                          isSelected
                            ? 'bg-black text-white shadow-xs'
                            : 'text-black hover:bg-zinc-100'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                {/* Available Slots */}
                <div className="pt-4 border-t border-zinc-100 space-y-3">
                  <span className="block text-xs font-extrabold text-black uppercase tracking-wider">
                    Slots for {selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>

                  {filteredSlots.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic">
                      No open slots on this date. Please select another date.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto pr-1">
                      {filteredSlots.map((slot) => {
                        const isBooked = slot.status === 'BOOKED' || slot.status === 'BLOCKED';
                        const startTime = new Date(slot.startAt).toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false });
                        
                        if (isBooked) {
                          return (
                            <div
                              key={slot.id}
                              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-zinc-100 bg-zinc-50 text-zinc-300 line-through cursor-not-allowed text-center select-none"
                            >
                              {startTime}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className="py-2.5 px-3 rounded-xl text-xs font-bold border border-zinc-200 hover:border-black hover:bg-black hover:text-white text-black transition-all flex items-center justify-center gap-1.5 cursor-pointer group"
                          >
                            <Clock className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
                            <span>{startTime}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Guest Booking Form */
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="p-3.5 rounded-xl bg-zinc-900 text-white flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 block">Selected Slot</span>
                    <span className="font-bold">
                      {new Date(selectedSlot.startAt).toLocaleDateString(undefined, { timeZone: 'UTC', weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(selectedSlot.startAt).toLocaleTimeString([], { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false })}
                    </span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">Notes (Optional)</label>
                  <textarea
                    rows={3}
                    placeholder="Anything the host should know before the meeting..."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs font-medium text-black focus:outline-none focus:border-black bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {submitting ? 'Confirming...' : 'Confirm Booking'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
