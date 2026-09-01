import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  ShieldCheck,
  ArrowRight,
  RefreshCw,
  Sparkles,
  X,
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore';

type AuthTab = 'login' | 'signup';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    currentUserId,
    getGoogleAuthUrl,
    signupHost,
    verifyOtp,
    resendOtp,
    loginHost,
  } = useUserStore();

  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // OTP Modal State
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Messages & Feedback
  const [errorMsg, setErrorMsg] = useState<string | null>(searchParams.get('error'));
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [modalErrorMsg, setModalErrorMsg] = useState<string | null>(null);
  const [modalSuccessMsg, setModalSuccessMsg] = useState<string | null>(null);

  // Resend Timer
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [isResending, setIsResending] = useState(false);

  // Disable Google Auth in Production
  const isGoogleAuthDisabled =
    import.meta.env.PROD || import.meta.env.VITE_ENABLE_GOOGLE_AUTH === 'false';

  useEffect(() => {
    if (currentUserId && currentUserId > 0) {
      navigate('/dashboard', { replace: true });
    }
  }, [currentUserId, navigate]);

  // Focus first input box when OTP Modal opens
  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 100);
    }
  }, [showOtpModal]);

  // Handle countdown timer for OTP resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const resetFormState = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setModalErrorMsg(null);
    setModalSuccessMsg(null);
  };

  const handleGoogleLogin = async () => {
    if (isGoogleAuthDisabled) return;
    setLoadingGoogle(true);
    resetFormState();
    try {
      const url = await getGoogleAuthUrl();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Google Auth URL was not returned');
      }
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to connect to Google Auth');
      setLoadingGoogle(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setIsSubmitting(true);

    const res = await loginHost(email, password);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard', { replace: true });
    } else if (res.isUnverified && res.email) {
      setEmail(res.email);
      setOtpDigits(['', '', '', '', '', '']);
      setShowOtpModal(true);
      setModalErrorMsg('Your email is not verified yet. Please enter the verification code.');
      setResendTimer(30);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFormState();
    setIsSubmitting(true);

    const res = await signupHost(name, email, password);
    setIsSubmitting(false);

    if (res.success) {
      if (res.email) setEmail(res.email);
      setOtpDigits(['', '', '', '', '', '']);
      setShowOtpModal(true);
      setModalSuccessMsg(res.message || 'A 6-digit verification code has been sent to your email.');
      setResendTimer(60);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric digits
    const digit = value.replace(/\D/g, '').slice(-1);
    const newOtp = [...otpDigits];
    newOtp[index] = digit;
    setOtpDigits(newOtp);

    // Auto movement to the next input box if a digit was typed
    if (digit && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Auto movement to previous box on Backspace if current box is empty
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim().replace(/\D/g, '');
    if (pasted.length === 6) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleVerifyOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalErrorMsg(null);
    setModalSuccessMsg(null);

    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      setModalErrorMsg('Please enter all 6 digits of your verification code.');
      return;
    }

    setIsSubmitting(true);
    const res = await verifyOtp(email, fullOtp);
    setIsSubmitting(false);

    if (res.success) {
      setShowOtpModal(false);
      navigate('/dashboard', { replace: true });
    } else {
      setModalErrorMsg(res.message);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || isResending) return;

    setModalErrorMsg(null);
    setModalSuccessMsg(null);
    setIsResending(true);
    const res = await resendOtp(email);
    setIsResending(false);

    if (res.success) {
      setModalSuccessMsg(res.message);
      setResendTimer(60);
    } else {
      setModalErrorMsg(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 bg-[#fafafa] relative">
      <div className="max-w-md w-full space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-zinc-200 shadow-2xl transition-all duration-300">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center mx-auto shadow-lg shadow-black/20">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-black tracking-tight">
              {activeTab === 'login' ? 'Host Portal Sign In' : 'Host Portal Sign Up'}
            </h1>
            <p className="text-xs font-medium text-zinc-500 mt-1">
              {activeTab === 'login'
                ? 'Sign in to access your dashboard, availability, and event types.'
                : 'Create your host account to start scheduling meetings.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div className="flex bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200/80">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              resetFormState();
            }}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'login'
                ? 'bg-black text-white shadow-md'
                : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('signup');
              resetFormState();
            }}
            className={`flex-1 py-3 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'signup'
                ? 'bg-black text-white shadow-md'
                : 'text-zinc-500 hover:text-black hover:bg-zinc-200/50'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>

        {/* Page Error / Success Banners */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* TAB 1: LOGIN (Sign In) */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer shadow-md"
            >
              <span>{isSubmitting ? 'Signing in...' : 'Sign In as Host'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* TAB 2: SIGNUP (Create Account) */}
        {activeTab === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="Alexander Reed"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  placeholder="alexander@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold text-black uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-zinc-200 text-xs font-semibold text-black focus:outline-none focus:border-black bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-black cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSubmitting ? 'Creating Account...' : 'Continue to Verification'}</span>
            </button>
          </form>
        )}

        {/* Divider & Google OAuth */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-zinc-200 w-full" />
          <span className="bg-white px-3 text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest absolute">
            OR
          </span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loadingGoogle || isGoogleAuthDisabled}
          title={
            isGoogleAuthDisabled
              ? 'Google Sign-In is disabled in production'
              : 'Sign in with Google'
          }
          className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-zinc-50 text-black border border-zinc-200 font-extrabold text-xs shadow-sm flex items-center justify-center gap-3 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loadingGoogle ? (
            <span className="animate-pulse">Connecting to Google...</span>
          ) : (
            <>
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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
              <span>
                {isGoogleAuthDisabled
                  ? 'Google Sign-In (Disabled in Production)'
                  : 'Sign in with Google'}
              </span>
            </>
          )}
        </button>
      </div>

      {/* POPUP MODAL WINDOW FOR OTP VERIFICATION */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative animate-scaleUp">
            {/* Close Modal Button */}
            <button
              type="button"
              onClick={() => setShowOtpModal(false)}
              className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Icon & Text */}
            <div className="text-center space-y-2 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h2 className="text-xl font-black text-black">Enter Verification Code</h2>
              <p className="text-xs font-medium text-zinc-500 px-2">
                We sent a 6-digit One-Time Password (OTP) to <br />
                <span className="font-bold text-black">{email}</span>
              </p>
            </div>

            {/* Modal Alerts */}
            {modalErrorMsg && (
              <div className="p-3.5 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{modalErrorMsg}</span>
              </div>
            )}

            {modalSuccessMsg && (
              <div className="p-3.5 mb-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
                <span>{modalSuccessMsg}</span>
              </div>
            )}

            {/* OTP Verification Form */}
            <form onSubmit={handleVerifyOtpSubmit} className="space-y-6">
              <div>
                <label className="block text-center text-xs font-extrabold text-black uppercase tracking-wider mb-3">
                  6-Digit OTP Code
                </label>
                <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputsRef.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-black text-black bg-zinc-50 border border-zinc-300 rounded-xl focus:border-black focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/10 transition-all"
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || otpDigits.join('').length !== 6}
                className="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-zinc-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isSubmitting ? 'Verifying Code...' : 'Verify & Complete Signup'}</span>
              </button>

              <div className="text-center pt-2 space-y-2 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendTimer > 0 || isResending}
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-black hover:underline disabled:opacity-50 disabled:no-underline cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
                  <span>
                    {resendTimer > 0
                      ? `Resend code in ${resendTimer}s`
                      : isResending
                      ? 'Sending...'
                      : 'Resend Verification Code'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
