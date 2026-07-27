import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Mail, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetDone, setResetDone] = useState(false);

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setResetDone(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100/50 via-purple-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-purple-100 shadow-2xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-slate-900">StitchHub</span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 pt-2">Reset Password</h2>
          <p className="text-xs text-slate-500">We will send an OTP reset code to your email</p>
        </div>

        {resetDone ? (
          <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
            <h3 className="text-sm font-bold text-emerald-900">Password Reset Successfully!</h3>
            <p className="text-xs text-slate-600">You can now sign in with your new password.</p>
            <Link
              to="/login"
              className="inline-block px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs"
            >
              Back to Sign In
            </Link>
          </div>
        ) : !submitted ? (
          <form onSubmit={handleRequestSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Account Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Send OTP Code</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-xs text-purple-900">
              OTP code sent to <strong>{email}</strong>. (Simulated code: <strong>8921</strong>)
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Enter 4-Digit OTP</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs font-mono text-slate-800 tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400"
                  placeholder="8921"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:shadow-lg transition-all"
            >
              Update Password
            </button>
          </form>
        )}

        <div className="text-center text-xs text-slate-500">
          Remember your password?{' '}
          <Link to="/login" className="text-purple-700 font-bold hover:underline">
            Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
};
