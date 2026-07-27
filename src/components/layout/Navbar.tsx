import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Scissors,
  User,
  LogOut,
  Bell,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Truck,
  Search,
  Check,
  Bot
} from 'lucide-react';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { currentUser, switchRole, logout } = useAuth();
  const { notifications, markNotificationRead } = useData();
  const navigate = useNavigate();
  const location = useLocation();

  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userNotifs = notifications.filter(n => n.userId === currentUser.id || currentUser.role === 'admin');
  const unreadCount = userNotifs.filter(n => !n.read).length;

  const handleRoleSelect = (role: UserRole) => {
    switchRole(role);
    setShowRoleDropdown(false);
    if (role === 'customer') navigate('/customer');
    else if (role === 'tailor') navigate('/tailor');
    else if (role === 'courier') navigate('/courier');
    else if (role === 'admin') navigate('/admin');
  };

  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case 'customer':
        return { label: 'Customer Portal', bg: 'bg-purple-100 text-purple-700 border-purple-200' };
      case 'tailor':
        return { label: 'Tailor Studio', bg: 'bg-pink-100 text-pink-700 border-pink-200' };
      case 'courier':
        return { label: 'Courier Hub', bg: 'bg-blue-100 text-blue-700 border-blue-200' };
      case 'admin':
        return { label: 'Admin Console', bg: 'bg-amber-100 text-amber-800 border-amber-200' };
    }
  };

  const badge = getRoleBadge(currentUser.role);

  return (
    <header className="relative z-40 mx-3 sm:mx-6 lg:mx-8 my-3 glass rounded-2xl transition-all shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <Scissors className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 bg-clip-text text-transparent">
                  StitchHub
                </span>
                <span className="text-[10px] font-medium text-purple-400 -mt-1 tracking-wider uppercase">
                  AI Tailoring Platform
                </span>
              </div>
            </Link>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/browse-tailors"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/browse-tailors' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                Browse Tailors
              </Link>
              <Link
                to="/browse-couriers"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === '/browse-couriers' ? 'text-purple-700 font-semibold bg-purple-50' : 'text-slate-600 hover:text-purple-700 hover:bg-slate-50'
                }`}
              >
                Browse Couriers
              </Link>
              <Link
                to="/chatbot"
                className="px-3 py-2 rounded-lg text-purple-600 font-medium hover:bg-purple-50 transition-colors flex items-center gap-1.5"
              >
                <Bot className="w-4 h-4 text-pink-500 animate-pulse" />
                <span>AI Stitchy</span>
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-3">
            
            {/* Quick Demo Role Switcher Badge */}
            <div className="relative">
              <button
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-2xs transition-all hover:shadow-xs ${badge.bg}`}
                title="Switch demo user role"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{badge.label}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-xl border border-white/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Quick Role Preview
                  </div>
                  <button
                    onClick={() => handleRoleSelect('customer')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      currentUser.role === 'customer' ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-purple-500" />
                      <span>Customer Dashboard</span>
                    </div>
                    {currentUser.role === 'customer' && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('tailor')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      currentUser.role === 'tailor' ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Scissors className="w-4 h-4 text-pink-500" />
                      <span>Tailor Studio</span>
                    </div>
                    {currentUser.role === 'tailor' && <Check className="w-3.5 h-3.5 text-pink-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('courier')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      currentUser.role === 'courier' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-blue-500" />
                      <span>Courier Hub</span>
                    </div>
                    {currentUser.role === 'courier' && <Check className="w-3.5 h-3.5 text-blue-600" />}
                  </button>

                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors ${
                      currentUser.role === 'admin' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      <span>Admin Console</span>
                    </div>
                    {currentUser.role === 'admin' && <Check className="w-3.5 h-3.5 text-amber-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 transition-colors"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 glass rounded-2xl shadow-xl border border-white/60 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications</span>
                    <span className="text-[11px] text-purple-600 font-medium">{userNotifs.length} Total</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 my-1">
                    {userNotifs.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 text-center">No notifications yet</p>
                    ) : (
                      userNotifs.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                            n.read ? 'bg-white opacity-70' : 'bg-purple-50/50 hover:bg-purple-50'
                          }`}
                        >
                          <p className="text-xs font-semibold text-slate-800">{n.title}</p>
                          <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{n.message}</p>
                          <span className="text-[9px] text-purple-500 font-medium mt-1 block">{n.timestamp}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-purple-50 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400/50"
                />
                <span className="hidden lg:inline-block text-xs font-semibold text-slate-700">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 glass rounded-2xl shadow-xl border border-white/60 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        if (currentUser.role === 'customer') navigate('/customer');
                        else if (currentUser.role === 'tailor') navigate('/tailor');
                        else if (currentUser.role === 'courier') navigate('/courier');
                        else navigate('/admin');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-purple-50 rounded-xl transition-colors text-left"
                    >
                      <User className="w-4 h-4 text-purple-600" />
                      <span>My Dashboard</span>
                    </button>

                    <Link
                      to="/login"
                      onClick={() => setShowUserDropdown(false)}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-purple-50 rounded-xl transition-colors"
                    >
                      <User className="w-4 h-4 text-purple-600" />
                      <span>Switch Account</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-slate-100">
                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition-colors font-medium text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Primary Action Button */}
            <Link
              to={currentUser.role === 'customer' ? '/customer' : `/${currentUser.role}`}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-semibold shadow-md shadow-purple-500/20 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all"
            >
              <span>Go to Dashboard</span>
            </Link>

          </div>
        </div>
      </div>
    </header>
  );
};
