import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Package,
  Ruler,
  Clock,
  CheckCircle2,
  Plus,
  Scissors,
  ChevronRight,
  Sparkles,
  Bot,
  Truck,
  ArrowRight
} from 'lucide-react';

export const CustomerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders, measurements, tailors } = useData();

  const userOrders = orders.filter(o => o.customerId === currentUser.id || o.customerEmail === currentUser.email);
  const activeOrders = userOrders.filter(o => o.status !== 'completed' && o.status !== 'cancelled');
  const latestOrder = activeOrders[0] || userOrders[0];

  return (
    <div className="min-h-screen pb-16">
      
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-white/30 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight">Welcome back, {currentUser.name}!</h1>
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-0.5 rounded-full">
                    Customer Portal
                  </span>
                </div>
                <p className="text-xs text-purple-100 mt-1">
                  Manage your bespoke orders, body measurements, and doorstep courier tracking.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/customer/book"
                className="px-5 py-2.5 rounded-2xl bg-white text-purple-900 text-xs font-bold shadow-md hover:scale-[1.02] transition-transform flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-pink-600" />
                <span>Book New Tailor</span>
              </Link>
              <Link
                to="/chatbot"
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-2 backdrop-blur-md"
              >
                <Bot className="w-4 h-4 text-pink-300 animate-pulse" />
                <span>Ask AI Stitchy</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Orders</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{activeOrders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center shadow-md">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Measurements</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{measurements.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Ruler className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {userOrders.filter(o => o.status === 'completed').length}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Spent</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                ${userOrders.reduce((acc, o) => acc + o.totalPrice, 0)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Scissors className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Active Order Spotlight Bar */}
        {latestOrder && (
          <div className="glass p-6 rounded-[32px] border border-white/80 shadow-xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl card-gradient text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-purple-900">ACTIVE ORDER STATUS</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/60 text-purple-900 border border-purple-300/50">
                      {latestOrder.id}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-0.5">{latestOrder.garmentCategory}</h3>
                </div>
              </div>

              <Link
                to={`/customer/track/${latestOrder.id}`}
                className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold hover:scale-[1.02] transition-transform shadow-md flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Track Live Progress</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs border-t border-white/40">
              <div>
                <span className="text-slate-500 font-medium">Tailor Studio:</span>
                <p className="font-bold text-slate-800">{latestOrder.tailorName} ({latestOrder.tailorShop})</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Current Stage:</span>
                <p className="font-bold text-purple-700 uppercase">{latestOrder.status.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Est. Delivery:</span>
                <p className="font-bold text-slate-800">{latestOrder.estimatedDeliveryDate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions & Recent Orders Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Orders List */}
          <div className="lg:col-span-2 glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/50">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">My Recent Orders</h2>
              <Link to="/customer/orders" className="text-xs font-bold text-purple-700 hover:underline">
                View All Orders
              </Link>
            </div>

            <div className="space-y-4">
              {userOrders.length === 0 ? (
                <p className="text-xs text-slate-400 py-6 text-center">No orders placed yet. Find a tailor and book now!</p>
              ) : (
                userOrders.slice(0, 3).map((ord) => (
                  <div
                    key={ord.id}
                    className="p-4 rounded-2xl bg-white/50 hover:bg-white/80 border border-white/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{ord.garmentCategory}</span>
                        <span className="text-[10px] font-semibold text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200/50">
                          {ord.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">
                        Tailor: <strong className="text-slate-700">{ord.tailorName}</strong> • Price: ${ord.totalPrice}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase text-purple-800 bg-white/80 px-2.5 py-1 rounded-lg border border-purple-200/60 shadow-xs">
                        {ord.status.replace(/_/g, ' ')}
                      </span>
                      <Link
                        to={`/customer/track/${ord.id}`}
                        className="p-2 rounded-xl card-gradient text-white hover:scale-105 transition-transform shadow-xs"
                        title="Track Order"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick Shortcuts & Saved Fits */}
          <div className="space-y-6">
            
            {/* Quick Actions Widget */}
            <div className="glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Quick Actions</h2>
              
              <div className="space-y-2">
                <Link
                  to="/browse-tailors"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 text-purple-950 text-xs font-bold transition-all border border-purple-100/50"
                >
                  <div className="flex items-center gap-2.5">
                    <Scissors className="w-4 h-4 text-purple-600" />
                    <span>Browse Tailors Catalog</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/customer/measurements"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 text-pink-950 text-xs font-bold transition-all border border-pink-100/50"
                >
                  <div className="flex items-center gap-2.5">
                    <Ruler className="w-4 h-4 text-pink-600" />
                    <span>Manage Body Measurements</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/chatbot"
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white/60 hover:bg-white/90 text-indigo-950 text-xs font-bold transition-all border border-indigo-100/50"
                >
                  <div className="flex items-center gap-2.5">
                    <Bot className="w-4 h-4 text-indigo-600 animate-pulse" />
                    <span>Ask AI Stitchy Assistant</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Default Measurement Card */}
            <div className="glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Fit Profile</h3>
                <Link to="/customer/measurements" className="text-[11px] font-bold text-purple-700 hover:underline">
                  Edit
                </Link>
              </div>

              {measurements[0] ? (
                <div className="p-3.5 bg-white/60 rounded-2xl border border-white/80 text-xs space-y-1">
                  <p className="font-bold text-slate-800">{measurements[0].title}</p>
                  <p className="text-[11px] text-slate-500">
                    Chest: {measurements[0].chest}" • Waist: {measurements[0].waist}" • Hips: {measurements[0].hips}"
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400">No fit profile saved yet.</p>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
