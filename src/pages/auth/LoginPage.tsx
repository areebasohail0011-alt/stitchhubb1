import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Scissors, Lock, Mail, ArrowRight, User, Sparkles, Check, ShieldCheck, Truck } from 'lucide-react';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = (searchParams.get('role') as UserRole) || 'customer';

  const [email, setEmail] = useState('sarah@example.com');
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, selectedRole);
    if (success) {
      if (selectedRole === 'customer') navigate('/customer');
      else if (selectedRole === 'tailor') navigate('/tailor');
      else if (selectedRole === 'courier') navigate('/courier');
      else if (selectedRole === 'admin') navigate('/admin');
    } else {
      setErrorMsg('Invalid login credentials. Try using one of the Quick Demo buttons below.');
    }
  };

  const handleQuickDemoRole = (role: UserRole) => {
    switchRole(role);
    if (role === 'customer') navigate('/customer');
    else if (role === 'tailor') navigate('/tailor');
    else if (role === 'courier') navigate('/courier');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100/50 via-purple-50/30 to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-purple-100 shadow-2xl p-8 space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <Scissors className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black text-slate-900">StitchHub</span>
          </Link>
          <h2 className="text-xl font-extrabold text-slate-900 pt-2">Welcome Back</h2>
          <p className="text-xs text-slate-500">Sign in to manage your tailoring orders & profile</p>
        </div>

        {/* Quick Demo Role Switcher Bar */}
        <div className="bg-purple-50/80 p-3 rounded-2xl border border-purple-100 space-y-2">
          <p className="text-[10px] font-bold text-purple-900 uppercase tracking-wider text-center flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            Instant Demo Logins (Click to Test)
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              onClick={() => handleQuickDemoRole('customer')}
              className="px-2 py-1.5 rounded-xl bg-white border border-purple-200 text-purple-700 text-[11px] font-bold hover:bg-purple-600 hover:text-white transition-all shadow-2xs text-center"
            >
              Customer
            </button>
            <button
              onClick={() => handleQuickDemoRole('tailor')}
              className="px-2 py-1.5 rounded-xl bg-white border border-pink-200 text-pink-700 text-[11px] font-bold hover:bg-pink-600 hover:text-white transition-all shadow-2xs text-center"
            >
              Tailor
            </button>
            <button
              onClick={() => handleQuickDemoRole('courier')}
              className="px-2 py-1.5 rounded-xl bg-white border border-blue-200 text-blue-700 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all shadow-2xs text-center"
            >
              Courier
            </button>
            <button
              onClick={() => handleQuickDemoRole('admin')}
              className="px-2 py-1.5 rounded-xl bg-white border border-amber-200 text-amber-800 text-[11px] font-bold hover:bg-amber-600 hover:text-white transition-all shadow-2xs text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200 text-center">
            {errorMsg}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="customer">Customer Portal</option>
              <option value="tailor">Tailor Studio</option>
              <option value="courier">Courier Dispatch</option>
              <option value="admin">Admin Console</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <Link to="/forgot-password" className="text-[11px] text-purple-600 font-medium hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-700 font-bold hover:underline">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
};
