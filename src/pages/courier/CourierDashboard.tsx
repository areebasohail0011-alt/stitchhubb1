import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Truck,
  MapPin,
  Phone,
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  User,
  Scissors,
  Check
} from 'lucide-react';
import { OrderStage } from '../../types';

export const CourierDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { orders, updateOrderStatus } = useData();

  const [activeTab, setActiveTab] = useState<'pickups' | 'deliveries' | 'completed'>('pickups');

  const pickupOrders = orders.filter((o) => o.status === 'pickup_scheduled' || o.status === 'fabric_picked_up');
  const deliveryOrders = orders.filter((o) => o.status === 'ready_for_delivery' || o.status === 'out_for_delivery');
  const completedDeliveries = orders.filter((o) => o.status === 'completed');

  const displayedOrders = activeTab === 'pickups' ? pickupOrders : activeTab === 'deliveries' ? deliveryOrders : completedDeliveries;

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-black text-2xl shadow-lg border border-white/30">
                <Truck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-black">Courier Dispatch Terminal</h1>
                  <span className="text-[10px] font-bold bg-white/20 text-white px-2.5 py-0.5 rounded-full border border-white/30">
                    Partner Driver
                  </span>
                </div>
                <p className="text-xs text-purple-100 mt-1">
                  {currentUser.name} • Swift Doorstep Logistics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-200 block">Deliveries Today</span>
                <span className="text-2xl font-black text-white">{displayedOrders.length} Tasks</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Tab Buttons Bar */}
        <div className="glass p-3 rounded-[28px] border border-white/70 shadow-xl flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('pickups')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pickups'
                ? 'card-gradient text-white shadow-md'
                : 'text-slate-700 hover:bg-white/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Fabric Pickups ({pickupOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('deliveries')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'deliveries'
                ? 'card-gradient text-white shadow-md'
                : 'text-slate-700 hover:bg-white/60'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Doorstep Deliveries ({deliveryOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('completed')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'completed'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-white/60'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Completed ({completedDeliveries.length})</span>
          </button>
        </div>

        {/* Dispatch Orders Cards List */}
        <div className="space-y-4">
          {displayedOrders.length === 0 ? (
            <div className="py-16 text-center glass rounded-[32px] border border-white/70 p-8 space-y-3 shadow-xl">
              <Truck className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Logistics Tasks Pending</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                There are currently no dispatch requests assigned in this category.
              </p>
            </div>
          ) : (
            displayedOrders.map((ord) => (
              <div
                key={ord.id}
                className="glass p-6 rounded-[32px] border border-white/70 shadow-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900">{ord.garmentCategory}</span>
                      <span className="text-xs font-bold text-purple-900 bg-purple-100/80 px-2.5 py-0.5 rounded-full border border-purple-200/50">
                        {ord.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Tailor Atelier: <strong className="text-slate-800">{ord.tailorName}</strong> ({ord.tailorShop})
                    </p>
                  </div>

                  <span className="text-xs font-extrabold uppercase text-purple-900 bg-white/80 px-3 py-1 rounded-full border border-white shadow-xs self-start sm:self-auto">
                    {ord.status.replace(/_/g, ' ')}
                  </span>
                </div>

                {/* Pickup & Drop Addresses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  <div className="p-4 bg-white/60 rounded-2xl border border-white/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-800 block">Customer Pickup / Delivery</span>
                    <p className="font-bold text-slate-800">{ord.customerName}</p>
                    <p className="text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      {ord.deliveryAddress}
                    </p>
                    <p className="text-slate-500 flex items-center gap-1 pt-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {ord.customerPhone}
                    </p>
                  </div>

                  <div className="p-4 bg-white/60 rounded-2xl border border-white/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-purple-800 block">Tailor Studio Location</span>
                    <p className="font-bold text-slate-800">{ord.tailorShop}</p>
                    <p className="text-slate-600 flex items-center gap-1">
                      <Scissors className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      Savile Row Atelier Street 12, NYC
                    </p>
                    <p className="text-slate-500 flex items-center gap-1 pt-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {ord.tailorPhone || '+1 (555) 876-5432'}
                    </p>
                  </div>

                </div>

                {/* One-Click Courier Action Stepper */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/50">
                  <span className="text-xs text-slate-600 font-medium">Update Logistics Status:</span>

                  <div className="flex flex-wrap gap-2">
                    {activeTab === 'pickups' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'fabric_picked_up', 'Courier collected fabric package from customer doorstep.')}
                          className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                        >
                          Mark Fabric Picked Up
                        </button>

                        <button
                          onClick={() => updateOrderStatus(ord.id, 'delivered_to_tailor', 'Fabric package delivered directly to tailor studio.')}
                          className="px-4 py-2 rounded-xl bg-purple-900 text-white text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                        >
                          Deliver to Tailor Atelier
                        </button>
                      </>
                    )}

                    {activeTab === 'deliveries' && (
                      <>
                        <button
                          onClick={() => updateOrderStatus(ord.id, 'out_for_delivery', 'Finished pressed garment loaded into courier delivery van.')}
                          className="px-4 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                        >
                          Out for Doorstep Delivery
                        </button>

                        <button
                          onClick={() => updateOrderStatus(ord.id, 'completed', 'Customer received freshly pressed garment. Order complete!')}
                          className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:scale-105 transition-transform shadow-xs flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>Mark Delivered to Customer</span>
                        </button>
                      </>
                    )}
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
