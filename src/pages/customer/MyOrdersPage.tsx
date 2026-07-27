import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Package, Search, ChevronRight, Clock, CheckCircle2, Scissors, Truck } from 'lucide-react';

export const MyOrdersPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders } = useData();

  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const userOrders = orders.filter(
    (o) => o.customerId === currentUser.id || o.customerEmail === currentUser.email
  );

  const filteredOrders = userOrders.filter((ord) => {
    const matchesTab =
      activeTab === 'all'
        ? true
        : activeTab === 'active'
        ? ord.status !== 'completed' && ord.status !== 'cancelled'
        : ord.status === activeTab;

    const matchesQuery =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.garmentCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.tailorName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesQuery;
  });

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30">
              Customer Orders
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">My Stitching Orders</h1>
            <p className="text-xs text-purple-100">Track order stages, courier pickups, and final delivery status</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Controls Bar */}
        <div className="glass p-4 rounded-[28px] border border-white/70 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto scrollbar-none">
            {(['all', 'active', 'completed', 'cancelled'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'card-gradient text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                {tab} Orders
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 glass-input px-3 py-2 rounded-xl border border-white/80 w-full sm:w-64">
            <Search className="w-4 h-4 text-purple-600 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order ID or garment..."
              className="w-full text-xs text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
            />
          </div>

        </div>

        {/* Orders Cards List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="py-16 text-center glass rounded-[32px] border border-white/70 p-8 space-y-3 shadow-xl">
              <Package className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Orders Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You don't have any orders matching this category filter.
              </p>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="glass p-6 rounded-[32px] border border-white/70 shadow-xl hover:shadow-2xl transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">{ord.garmentCategory}</span>
                      <span className="text-xs font-bold text-purple-900 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                        {ord.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Placed on {ord.createdAt} • Tailor: <strong className="text-slate-800">{ord.tailorName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold uppercase text-purple-900 bg-white/80 px-3 py-1 rounded-full border border-white shadow-xs">
                      {ord.status.replace(/_/g, ' ')}
                    </span>
                    <Link
                      to={`/customer/track/${ord.id}`}
                      className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md flex items-center gap-1"
                    >
                      <span>Track Order</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-white/60 p-3.5 rounded-2xl border border-white/80">
                  <div>
                    <span className="text-slate-500 font-medium block">Total Price:</span>
                    <span className="font-bold text-slate-900">${ord.totalPrice}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Est. Delivery:</span>
                    <span className="font-bold text-slate-900">{ord.estimatedDeliveryDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium block">Courier Partner:</span>
                    <span className="font-bold text-purple-800">{ord.courierName || 'Assigned Courier'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
