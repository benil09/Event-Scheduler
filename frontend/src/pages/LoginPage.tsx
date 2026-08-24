import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Calendar, AlertCircle } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { api } from '../api/client';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUserId } = useAppStore();

  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(searchParams.get('error'));

  useEffect(() => {
    if (currentUserId && currentUserId > 0) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUserId, navigate]);

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    setErrorMsg(null);
    try {
      const res = await api.getGoogleAuthUrl();
      if (res && res.url) {
        window.location.href = res.url;
      } else {
        throw new Error('Google Auth URL was not returned');
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to connect to Google Auth');
      setLoadingGoogle(false);
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
            <h1 className="text-2xl font-extrabold text-black tracking-tight">Host Authentication</h1>
            <p className="text-xs font-medium text-zinc-500 mt-1">
              Sign in with your Google account to access your scheduler & calendar integration.
            </p>
          </div>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Primary Method: Sign in with Google */}
        <div className="space-y-4 pt-2">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loadingGoogle}
            className="w-full py-4 px-4 rounded-2xl bg-black hover:bg-zinc-800 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer"
          >
            {loadingGoogle ? (
              <span className="animate-pulse">Connecting to Google...</span>
            ) : (
              <>
                {/* Official Google G Logo */}
                <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>
          <p className="text-[11px] text-center text-zinc-400 font-medium">
            Requires Google Calendar permissions to sync appointment invites.
          </p>
        </div>
      </div>
    </div>
  );
};
