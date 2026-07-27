import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Scissors,
  Package,
  DollarSign,
  CheckCircle2,
  Clock,
  Sparkles,
  Upload,
  Plus,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Send,
  User
} from 'lucide-react';
import { OrderStage } from '../../types';

export const TailorDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders, updateOrderStatus, updateTailorProgressNote } = useData();

  // Find tailor orders
  const tailorOrders = orders; // Show all demo orders for tailor view
  const pendingOrders = tailorOrders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled');

  const [selectedOrderForNote, setSelectedOrderForNote] = useState<string | null>(pendingOrders[0]?.id || null);
  const [tailorNoteText, setTailorNoteText] = useState('');
  const [progressImageUrl, setProgressImageUrl] = useState('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80');

  const activeOrder = orders.find((o) => o.id === selectedOrderForNote) || pendingOrders[0];

  const handleUpdateNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeOrder && tailorNoteText) {
      updateTailorProgressNote(activeOrder.id, tailorNoteText, progressImageUrl);
      setTailorNoteText('');
      alert('Progress update and note sent to customer!');
    }
  };

  const totalEarnings = tailorOrders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.stitchingPrice, 0) || 1240;

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-16 h-16 rounded-3xl object-cover ring-4 ring-white/30 shadow-lg"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black tracking-tight">Atelier Studio Dashboard</h1>
                  <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white px-2.5 py-0.5 rounded-full">
                    Tailor Partner Portal
                  </span>
                </div>
                <p className="text-xs text-purple-100 mt-1">
                  {currentUser.name} • Savile Row Studio Atelier
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-200 block">Current Earnings</span>
                <span className="text-2xl font-black text-emerald-300">${totalEarnings}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold border border-emerald-400/30">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Incoming Jobs</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{pendingOrders.length}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center shadow-md">
              <Scissors className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cutting & Stitching</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {tailorOrders.filter(o => o.status.includes('stitching') || o.status.includes('cutting')).length || 2}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center shadow-md">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ready for Delivery</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {tailorOrders.filter(o => o.status === 'ready_for_delivery').length || 1}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="glass p-5 rounded-[28px] border border-white/70 shadow-lg flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Completed Jobs</p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {tailorOrders.filter(o => o.status === 'completed').length || 14}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Incoming Orders Workstation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Incoming Orders Queue */}
          <div className="lg:col-span-2 glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/50">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest">Active Stitching Jobs</h2>
              <span className="text-xs font-bold text-purple-900 glass px-3.5 py-1 rounded-full border border-white/80">
                {pendingOrders.length} In Progress
              </span>
            </div>

            <div className="space-y-4">
              {pendingOrders.map((ord) => (
                <div
                  key={ord.id}
                  className={`p-5 rounded-3xl border transition-all space-y-4 ${
                    selectedOrderForNote === ord.id
                      ? 'bg-purple-100/50 border-purple-300 ring-2 ring-purple-300/50 shadow-md'
                      : 'bg-white/50 hover:bg-white/80 border border-white/80 shadow-xs'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{ord.garmentCategory}</span>
                        <span className="text-xs font-bold text-purple-900 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                          {ord.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Customer: <strong className="text-slate-800">{ord.customerName}</strong> ({ord.customerPhone})
                      </p>
                    </div>

                    <span className="text-xs font-extrabold uppercase text-purple-900 bg-white/80 px-3 py-1 rounded-full border border-white shadow-xs self-start sm:self-auto">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                  </div>

                  {/* Customer Measurement Quick Peek */}
                  <div className="p-3.5 bg-white/60 rounded-2xl border border-white/80 text-xs grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Chest / Bust</span>
                      <span className="font-bold text-slate-800">{ord.measurements?.chest || 36}"</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Waist</span>
                      <span className="font-bold text-slate-800">{ord.measurements?.waist || 28}"</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Hips</span>
                      <span className="font-bold text-slate-800">{ord.measurements?.hips || 38}"</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Inseam</span>
                      <span className="font-bold text-slate-800">{ord.measurements?.inseam || 30}"</span>
                    </div>
                  </div>

                  {/* Order Stage Controls for Tailor */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedOrderForNote(ord.id)}
                      className="px-3.5 py-1.5 rounded-xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                    >
                      Attach Progress Photo
                    </button>

                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'cutting_in_progress', 'Started fabric precision cutting.')}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-white text-slate-700 hover:bg-purple-100"
                      >
                        Cutting
                      </button>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'stitching_in_progress', 'Master tailor assembling lining & seams.')}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-white text-slate-700 hover:bg-purple-100"
                      >
                        Stitching
                      </button>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'quality_check', 'Undergoing final steam pressing & seam inspection.')}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white/80 border border-white text-slate-700 hover:bg-purple-100"
                      >
                        Quality Check
                      </button>
                      <button
                        onClick={() => updateOrderStatus(ord.id, 'ready_for_delivery', 'Garment pressed, packaged, and ready for courier pickup.')}
                        className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs hover:bg-emerald-700"
                      >
                        Mark Ready
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Send Progress Note & Photo Widget */}
          <div className="space-y-6">
            <div className="glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-4">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Attach Progress Photo & Note
              </h2>

              {activeOrder && (
                <form onSubmit={handleUpdateNoteSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Selected Order</label>
                    <div className="p-2.5 bg-purple-100/70 rounded-xl text-xs font-bold text-purple-900 border border-purple-200/60">
                      {activeOrder.id} - {activeOrder.garmentCategory} ({activeOrder.customerName})
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Progress Note for Customer</label>
                    <textarea
                      value={tailorNoteText}
                      onChange={(e) => setTailorNoteText(e.target.value)}
                      required
                      rows={3}
                      className="w-full glass-input rounded-2xl p-3 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400 placeholder:text-slate-400"
                      placeholder="e.g. Jacket lining assemble complete! Moving to sleeve fittings tomorrow..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Progress Image URL</label>
                    <input
                      type="text"
                      value={progressImageUrl}
                      onChange={(e) => setProgressImageUrl(e.target.value)}
                      className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-800"
                    />
                  </div>

                  {progressImageUrl && (
                    <img
                      src={progressImageUrl}
                      alt="Progress"
                      className="w-full h-32 rounded-2xl object-cover ring-2 ring-white/80 shadow-md"
                    />
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl card-gradient text-white text-xs font-bold shadow-md shadow-purple-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Progress Update</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
