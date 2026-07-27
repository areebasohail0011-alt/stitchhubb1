import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Scissors, Lock, Mail, User, Phone, MapPin, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const SignUpPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signup({
      name,
      email,
      phone,
      role
    });
    if (role === 'customer') navigate('/customer');
    else if (role === 'tailor') navigate('/tailor');
    else if (role === 'courier') navigate('/courier');
    else navigate('/admin');
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
          <h2 className="text-xl font-extrabold text-slate-900 pt-2">Create Your Account</h2>
          <p className="text-xs text-slate-500">Join StitchHub as a customer, tailor, or courier partner</p>
        </div>

        <form onSubmit={handleSignUpSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Account Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  role === 'customer'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-purple-50'
                }`}
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('tailor')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  role === 'tailor'
                    ? 'bg-pink-600 text-white border-pink-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-pink-50'
                }`}
              >
                Tailor
              </button>
              <button
                type="button"
                onClick={() => setRole('courier')}
                className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                  role === 'courier'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-blue-50'
                }`}
              >
                Courier
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="e.g. Jane Doe"
              />
            </div>
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
                placeholder="jane@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
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
            <span>Register & Start</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link to="/login" className="text-purple-700 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </div>
    </div>
  );
};
