import React, { useEffect, useState } from 'react';
import { Settings, Calendar, Plus, Trash2, CheckCircle, ExternalLink, User as UserIcon } from 'lucide-react';
import { useUserStore } from '../store/useUserStore';
import { useAvailabilityStore } from '../store/useAvailabilityStore';
import { API_BASE_URL } from '../api/client';

const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const SettingsPage: React.FC = () => {
  const { currentUserId, currentUser, fetchUsers, createNewUser } = useUserStore();
  const { availabilityRules, fetchAvailabilityRules, addAvailabilityRule, removeAvailabilityRule } = useAvailabilityStore();

  const [selectedDay, setSelectedDay] = useState(1); // Monday
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [addingRule, setAddingRule] = useState(false);

  // New User Form
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchAvailabilityRules();
  }, [currentUserId]);

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingRule(true);
    await addAvailabilityRule({
      dayOfWeek: Number(selectedDay),
      startTime,
      endTime,
    });
    setAddingRule(false);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    await createNewUser(newUserName, newUserEmail);
    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="border-b border-slate-200/80 pb-5">
        <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
          <Settings className="w-6 h-6 text-brand-600" />
          Settings & Integrations
        </h1>
        <p className="text-xs text-slate-500">Manage Google Calendar OAuth, working hours, and host identities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Google Calendar Integration */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Google Calendar Integration</h3>
              <p className="text-xs text-slate-500">Sync bookings & check for conflicts automatically.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2 text-xs text-slate-600">
            <div className="flex items-center gap-2 text-emerald-700 font-bold">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Azure AKS OAuth Endpoint Ready
            </div>
            <p>
              Redirect URI configured at: <code className="bg-slate-200/70 px-1 py-0.5 rounded text-[11px]">{API_BASE_URL}/api/integrations/google/callback</code>
            </p>
          </div>

          <a
            href={`${API_BASE_URL}/api/integrations/google/callback`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/20 transition-colors"
          >
            Connect / Test Google OAuth Callback
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Card 2: Host Identity Switcher */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <UserIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">User Identity Manager</h3>
              <p className="text-xs text-slate-500">Active Host ID: {currentUserId} ({currentUser?.name || 'Default Host'})</p>
            </div>
          </div>

          <form onSubmit={handleCreateUser} className="space-y-3 pt-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
              <input
                type="email"
                required
                placeholder="Email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
            >
              Add Host User
            </button>
          </form>
        </div>
      </div>

      {/* Availability Rules Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Host Working Hours & Availability Rules</h3>
            <p className="text-xs text-slate-500">Define which days and times you are available for appointments.</p>
          </div>
        </div>

        {/* Add Rule Form */}
        <form onSubmit={handleAddRule} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Day of Week</label>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            >
              {DAYS_OF_WEEK.map((day, idx) => (
                <option key={day} value={idx}>{day}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-white"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={addingRule}
              className="w-full py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Working Rule
            </button>
          </div>
        </form>

        {/* Existing Rules List */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Active Rules</h4>
          {availabilityRules.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No rules added yet. Default hours (09:00 - 17:00) apply.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {availabilityRules.map((rule) => (
                <div key={rule.id} className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{DAYS_OF_WEEK[rule.dayOfWeek]}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{rule.startTime} - {rule.endTime}</span>
                  </div>
                  <button
                    onClick={() => removeAvailabilityRule(rule.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
