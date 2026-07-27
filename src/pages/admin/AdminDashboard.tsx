import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  Package,
  DollarSign,
  ShieldCheck,
  Scissors,
  Truck,
  TrendingUp,
  Search,
  UserCheck,
  BarChart3,
  Check,
  X
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders, tailors } = useData();

  const [activeTab, setActiveTab] = useState<'users' | 'orders' | 'tailors' | 'analytics'>('users');
  const [searchQuery, setSearchQuery] = useState('');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalPrice, 0);
  const platformCommission = Math.round(totalRevenue * 0.12);

  const mockUsers = [
    { id: 'u1', name: 'Sarah Jenkins', email: 'sarah@example.com', role: 'Customer', status: 'Active' },
    { id: 'u2', name: 'Master Giovanni', email: 'giovanni@tailor.com', role: 'Tailor Partner', status: 'Verified' },
    { id: 'u3', name: 'Elena Rostova', email: 'elena@haute.com', role: 'Tailor Partner', status: 'Verified' },
    { id: 'u4', name: 'Leo Swift', email: 'leo@courier.com', role: 'Courier Driver', status: 'Active' },
    { id: 'u5', name: 'Alexander Sterling', email: 'admin@stitchhub.com', role: 'Super Admin', status: 'Active' }
  ];

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg border border-amber-300">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">StitchHub Admin Control Center</h1>
                  <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                    System Admin
                  </span>
                </div>
                <p className="text-xs text-purple-100 mt-1">
                  Platform Operations, User Governance & Revenue Oversight
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-200 block">Platform Commission Fee</span>
                <span className="text-2xl font-black text-emerald-300">${platformCommission}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-400/30">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Analytics Top Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Total Platform Orders</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{orders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center shadow-xs">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Verified Tailors</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{tailors.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center shadow-xs">
              <Scissors className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Gross Merchandise Value</p>
              <p className="text-2xl font-black text-slate-900 mt-1">${totalRevenue}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Active Users</p>
              <p className="text-2xl font-black text-slate-900 mt-1">1,240</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center shadow-xs">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Tab Controls Bar */}
        <div className="glass p-3 rounded-[28px] border border-white/70 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'users' ? 'card-gradient text-white shadow-xs' : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>User Directory</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'orders' ? 'card-gradient text-white shadow-xs' : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>All Orders ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('tailors')}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'tailors' ? 'card-gradient text-white shadow-xs' : 'text-slate-700 hover:bg-white/60'
              }`}
            >
              <Scissors className="w-4 h-4" />
              <span>Tailor Verification</span>
            </button>
          </div>

          <div className="flex items-center gap-2 glass-input px-3 py-2 rounded-xl border border-white/80 w-full sm:w-64">
            <Search className="w-4 h-4 text-purple-600 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user or order ID..."
              className="w-full text-xs text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>
        </div>

        {/* Tab Content Tables */}
        {activeTab === 'users' && (
          <div className="glass rounded-[32px] border border-white/70 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/50 flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Registered Platform Accounts</h2>
              <span className="text-xs text-slate-500 font-medium">{mockUsers.length} Users Listed</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/40 border-b border-white/50 text-slate-500 uppercase font-bold text-[10px]">
                    <th className="p-4">User Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Account Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/50">
                  {mockUsers.map((usr) => (
                    <tr key={usr.id} className="hover:bg-white/60 transition-colors">
                      <td className="p-4 font-bold text-slate-800">{usr.name}</td>
                      <td className="p-4 text-slate-600">{usr.email}</td>
                      <td className="p-4">
                        <span className="bg-purple-100/80 text-purple-900 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-purple-200/50">
                          {usr.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="bg-emerald-100/80 text-emerald-900 px-2.5 py-0.5 rounded-full font-bold text-[10px] border border-emerald-200/50">
                          {usr.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="text-purple-800 hover:underline font-bold text-[11px]">Edit Permissions</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="glass rounded-[32px] border border-white/70 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-white/50">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">All StitchHub Orders Overview</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/40 border-b border-white/50 text-slate-500 uppercase font-bold text-[10px]">
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Garment Category</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Tailor Studio</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Current Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/50">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/60 transition-colors">
                      <td className="p-4 font-bold text-purple-800">{ord.id}</td>
                      <td className="p-4 font-bold text-slate-800">{ord.garmentCategory}</td>
                      <td className="p-4 text-slate-600">{ord.customerName}</td>
                      <td className="p-4 text-slate-600">{ord.tailorName} ({ord.tailorShop})</td>
                      <td className="p-4 font-black text-slate-900">${ord.totalPrice}</td>
                      <td className="p-4">
                        <span className="bg-purple-100/80 text-purple-900 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase border border-purple-200/50">
                          {ord.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tailors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tailors.map((tailor) => (
              <div key={tailor.id} className="glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={tailor.avatar}
                    alt={tailor.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{tailor.name}</h3>
                    <p className="text-xs text-slate-500">{tailor.shopName} • {tailor.location}</p>
                  </div>
                </div>

                <div className="p-3 bg-white/60 rounded-2xl border border-white/80 text-xs flex justify-between">
                  <span>Rating: <strong>{tailor.rating}★</strong></span>
                  <span>Turnaround: <strong>{tailor.turnaroundDays} Days</strong></span>
                  <span>Completed: <strong>{tailor.completedOrdersCount} Jobs</strong></span>
                </div>

                <div className="flex justify-end gap-2">
                  <span className="px-3 py-1 rounded-xl bg-emerald-100/80 text-emerald-900 font-bold text-xs flex items-center gap-1 border border-emerald-200/50">
                    <Check className="w-3.5 h-3.5" />
                    Verified Atelier Partner
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
