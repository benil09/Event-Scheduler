import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Globe, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Video } from 'lucide-react';
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

  // Filter slots for the chosen date
  const filteredSlots = availableSlots.filter(slot => {
    const slotDate = new Date(slot.startAt);
    return (
      slotDate.getFullYear() === selectedDate.getFullYear() &&
      slotDate.getMonth() === selectedDate.getMonth() &&
      slotDate.getDate() === selectedDate.getDate()
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
          onClick={() => navigate(userId ? `/profile/${userId}` : '/')}
          className="px-4 py-2 rounded-xl bg-black text-white font-bold text-xs"
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
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-4">
      {/* Back to Host Profile Navigation */}
      <div>
        <button
          type="button"
          onClick={() => navigate(userId ? `/profile/${userId}` : '/')}
          className="inline-flex items-center gap-2 text-xs font-extrabold text-zinc-600 hover:text-black transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Host Profile & All Events
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#e2e2e2] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        
        {/* Left Column: Host Info matching Image 3 */}
        <div className="md:col-span-5 p-8 bg-white border-r border-[#e2e2e2] flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Host Avatar with active status green dot */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {host?.avatar ? (
                  <img src={host.avatar} alt={host.name} className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-black text-white font-extrabold text-xl flex items-center justify-center border-2 border-white shadow-md">
                    {host?.name ? host.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                )}
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0" />
              </div>

              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#525252]">HOST</span>
                <h3 className="text-xl font-extrabold text-black">{host?.name || 'Alexander Reed'}</h3>
              </div>
            </div>

            {/* Event Title & Description */}
            <div>
              <h2 className="text-2xl font-extrabold text-black leading-snug">
                {eventType?.title || '30 Minute Strategy Session'}
              </h2>
              <p className="text-xs text-[#525252] leading-relaxed mt-2">
                {eventType?.description || 'A focused, high-impact session to audit your current workflow, identify bottlenecks, and map out a 90-day execution plan.'}
              </p>
            </div>

            {/* Meta Rows matching Image 3 */}
            <div className="space-y-3 pt-2 text-xs font-semibold text-[#1b1b1b]">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#525252]" />
                <span>{eventType?.duration} min</span>
              </div>
              <div className="flex items-center gap-3">
                <Video className="w-4 h-4 text-[#525252]" />
                <span>Google Meet</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#525252]" />
                <span>GMT +0:00 (London)</span>
              </div>
            </div>

            {/* Quote Block matching Image 3 */}
            <div className="pt-4 border-t border-[#f3f3f3]">
              <p className="text-xs text-[#525252] italic">
                "The goal is clarity, not just conversation."
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Date & Slot Selector matching Image 3 */}
        <div className="md:col-span-7 p-8 bg-white flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-3">
              <h3 className="text-xl font-extrabold text-black">
                {selectedSlot ? 'Confirm Booking Details' : 'Select a Date'}
              </h3>
              {selectedSlot && (
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="text-xs font-extrabold text-[#525252] hover:text-black flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to Calendar
                </button>
              )}
            </div>

            {!selectedSlot ? (
              <div className="space-y-6">
                {/* Month Navigator Header matching Image 3 */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-black">{currentMonthName}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handlePrevMonth}
                      className="p-1.5 rounded-lg border border-[#e2e2e2] hover:bg-[#F5F5F5] transition-colors" 
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4 text-black" />
                    </button>
                    <button 
                      onClick={handleNextMonth}
                      className="p-1.5 rounded-lg border border-[#e2e2e2] hover:bg-[#F5F5F5] transition-colors" 
                      title="Next Month"
                    >
                      <ChevronRight className="w-4 h-4 text-black" />
                    </button>
                  </div>
                </div>

                {/* Day Headers (S M T W T F S) matching Image 3 */}
                <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-[#525252]">
                  <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                </div>

                {/* Circular Date Grid matching Image 3 */}
                <div className="grid grid-cols-7 gap-2 text-center">
                  {/* Empty offset cells for days before day 1 */}
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`offset-${i}`} className="w-9 h-9 mx-auto" />
                  ))}

                  {Array.from({ length: daysInCurrentMonth }, (_, i) => i + 1).map((dayNum) => {
                    const dateObj = new Date(year, month, dayNum);
                    const isSelected = selectedDate.getDate() === dayNum && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        onClick={() => setSelectedDate(dateObj)}
                        className={`w-9 h-9 rounded-full mx-auto text-xs font-bold transition-all flex items-center justify-center ${
                          isSelected
                            ? 'bg-black text-white shadow-md scale-105'
                            : 'bg-transparent text-black hover:bg-[#F5F5F5]'
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                {/* Available Slots Section for Selected Date */}
                <div className="pt-4 border-t border-[#f3f3f3] space-y-3">
                  <label className="block text-xs font-extrabold text-black uppercase tracking-wider">
                    Available Slots for {selectedDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </label>

                  {filteredSlots.length === 0 ? (
                    <p className="text-xs text-[#525252] italic">
                      No slots available for this date. Select another date on the calendar.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto pr-1">
                      {filteredSlots.map((slot) => {
                        const isBooked = slot.status === 'BOOKED' || slot.status === 'BLOCKED';
                        const startTime = new Date(slot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        
                        if (isBooked) {
                          return (
                            <div
                              key={slot.id}
                              className="py-2.5 px-3 rounded-xl text-xs font-bold border border-zinc-200 bg-zinc-100 text-zinc-400 cursor-not-allowed flex items-center justify-between opacity-70 select-none"
                              title="This slot has already been booked"
                            >
                              <span className="line-through flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                                {startTime}
                              </span>
                              <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded">
                                Booked
                              </span>
                            </div>
                          );
                        }

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            onClick={() => setSelectedSlot(slot)}
                            className="py-3 px-3 rounded-xl text-xs font-extrabold border border-[#e2e2e2] hover:border-black hover:bg-black hover:text-white text-black transition-all flex items-center justify-center gap-1.5 shadow-2xs group"
                          >
                            <Clock className="w-3.5 h-3.5 text-[#525252] group-hover:text-white" />
                            <span>{startTime}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Guest Booking Form matching Image 3 style */
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="p-4 rounded-xl bg-black text-white flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#848484] block">Selected Appointment</span>
                    <span className="text-sm font-extrabold">
                      {new Date(selectedSlot.startAt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} at {new Date(selectedSlot.startAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-sm font-semibold text-black focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-sm font-semibold text-black focus:outline-none focus:border-black bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1">Notes / Objectives</label>
                  <textarea
                    rows={3}
                    placeholder="Please share anything that will help prepare for our meeting."
                    value={guestNotes}
                    onChange={(e) => setGuestNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-[#e2e2e2] text-xs font-medium text-black focus:outline-none focus:border-black bg-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-black hover:bg-[#262626] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
                >
                  {submitting ? 'Processing Booking...' : 'Confirm & Schedule Appointment'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
