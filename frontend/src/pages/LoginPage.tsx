import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight, Plus, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { currentUserId, users, setCurrentUserId, fetchUsers, createNewUser, isLoading } = useAppStore();

  const [inputUserId, setInputUserId] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleIdLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const idNum = Number(inputUserId);
    if (isNaN(idNum) || idNum <= 0) {
      alert('Please enter a valid numerical User ID (e.g. 3)');
      return;
    }
    setCurrentUserId(idNum);
    navigate('/dashboard');
  };

  const handleQuickSelect = (id: number) => {
    setCurrentUserId(id);
    navigate('/dashboard');
  };

  const handleCreateHost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    const newUser = await createNewUser(name, email);
    if (newUser && newUser.id) {
      setCurrentUserId(newUser.id);
      setShowCreateModal(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-2xl">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-lg shadow-black/20">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-black tracking-tight">Host Login Portal</h1>
            <p className="text-xs font-medium text-zinc-500 mt-1">Enter your Host User ID to access your scheduling workspace.</p>
          </div>
        </div>

        {/* Form 1: Enter Host ID */}
        <form onSubmit={handleIdLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-black uppercase tracking-wider mb-2">
              Host User ID
            </label>
            <div className="relative">
              <input
                type="number"
                required
                placeholder="e.g. 3"
                value={inputUserId}
                onChange={(e) => setInputUserId(e.target.value)}
                className="w-full px-4 py-3.5 pl-11 rounded-xl border border-zinc-300 text-base font-bold text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
              <User className="w-5 h-5 text-zinc-400 absolute left-3.5 top-4" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-[1.01]"
          >
            <span>Login to Host Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Select Detected Users */}
        {users.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-zinc-100">
            <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center">
              Or Quick Select Detected Host Account
            </label>

            <div className="space-y-2">
              {users.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => handleQuickSelect(u.id)}
                  className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                    currentUserId === u.id
                      ? 'border-black bg-black text-white font-bold'
                      : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${currentUserId === u.id ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-800'}`}>
                      {u.id}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{u.name}</div>
                      <div className={`text-[11px] ${currentUserId === u.id ? 'text-zinc-300' : 'text-zinc-500'}`}>{u.email}</div>
                    </div>
                  </div>
                  {currentUserId === u.id && (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Register New Account Link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setShowCreateModal(false)}
            className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            Create new host account
          </button>
        </div>

        {/* Register New Host Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-zinc-200 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="text-lg font-extrabold text-black">Register New Host Account</h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="text-zinc-400 hover:text-black text-xs font-bold"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleCreateHost} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-black mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. alex@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs shadow-md"
                >
                  Create & Login As New Host
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
