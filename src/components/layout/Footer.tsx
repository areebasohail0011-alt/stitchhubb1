import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, Heart, Sparkles, Mail, Phone, MapPin, Bot } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/85 backdrop-blur-xl text-slate-300 pt-16 pb-12 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Scissors className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                StitchHub
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              AI-powered online tailoring platform connecting custom cloth lovers with certified master tailors and doorstep courier pickup & delivery.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#github" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Sparkles className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Scissors className="w-4 h-4" />
              </a>
              <a href="#mail" className="w-9 h-9 rounded-full bg-slate-800 hover:bg-purple-600 flex items-center justify-center text-slate-300 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/browse-tailors" className="hover:text-purple-400 transition-colors">Browse Master Tailors</Link></li>
              <li><Link to="/customer/orders" className="hover:text-purple-400 transition-colors">Order Tracking</Link></li>
              <li><Link to="/customer/measurements" className="hover:text-purple-400 transition-colors">Body Measurements</Link></li>
              <li><Link to="/chatbot" className="hover:text-purple-400 transition-colors flex items-center gap-1"><Bot className="w-3.5 h-3.5 text-pink-400" /> Stitchy AI Assistant</Link></li>
            </ul>
          </div>

          {/* User Dashboards */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link to="/customer" className="hover:text-purple-400 transition-colors">Customer Dashboard</Link></li>
              <li><Link to="/tailor" className="hover:text-purple-400 transition-colors">Tailor Studio</Link></li>
              <li><Link to="/courier" className="hover:text-purple-400 transition-colors">Courier Dispatch</Link></li>
              <li><Link to="/admin" className="hover:text-purple-400 transition-colors">Admin Console</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                <span>100 Fashion District Blvd, NY</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-purple-400 shrink-0" />
                <span>+1 (800) STITCH-HUB</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span>support@stitchhub.app</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 StitchHub Platform. All rights reserved. Original University Project.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
            <span>for custom fashion enthusiasts.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
