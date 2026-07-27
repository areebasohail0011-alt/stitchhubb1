import React from 'react';
import { Order, OrderStage } from '../../types';
import {
  CheckCircle2,
  Clock,
  Package,
  Scissors,
  Truck,
  Check,
  MapPin,
  Phone,
  User,
  Calendar,
  Sparkles,
  Shirt
} from 'lucide-react';

interface OrderTrackingTimelineProps {
  order: Order;
  onUpdateStage?: (stage: OrderStage) => void;
  showAdminControls?: boolean;
}

export const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({
  order,
  onUpdateStage,
  showAdminControls = false
}) => {
  const currentStepIdx = order.timeline.findIndex(t => t.current) >= 0 
    ? order.timeline.findIndex(t => t.current) 
    : order.timeline.filter(t => t.completed).length - 1;

  const completionPercentage = Math.round(((order.timeline.filter(t => t.completed).length) / order.timeline.length) * 100);

  return (
    <div className="glass rounded-[32px] p-6 sm:p-8 border border-white/70 shadow-xl space-y-8">
      
      {/* Header Summary Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/50">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-slate-900">{order.garmentCategory}</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/60 text-purple-900 border border-purple-200/50">
              {order.id}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
            <span>Tailor: <strong className="text-slate-800">{order.tailorName}</strong> ({order.tailorShop})</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-purple-700 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              Est. Delivery: {order.estimatedDeliveryDate}
            </span>
          </p>
        </div>

        {/* Progress Bar Badge */}
        <div className="flex items-center gap-4 bg-white/60 p-3.5 rounded-2xl border border-white/80 shadow-xs">
          <div className="flex flex-col items-end">
            <span className="text-xs font-bold text-purple-900">{completionPercentage}% Completed</span>
            <span className="text-[10px] text-purple-700 font-medium">
              Stage: {order.status.replace(/_/g, ' ').toUpperCase()}
            </span>
          </div>
          <div className="w-24 bg-purple-200/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="card-gradient h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tailor Note / Progress Photo Banner */}
      {order.tailorNote && (
        <div className="bg-purple-100/50 p-4 rounded-2xl border border-purple-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl card-gradient text-white flex items-center justify-center shrink-0 shadow-xs">
              <Scissors className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-purple-900">Note from Tailor {order.tailorName}:</p>
              <p className="text-xs text-slate-700 mt-0.5">"{order.tailorNote}"</p>
            </div>
          </div>
          {order.progressImage && (
            <img
              src={order.progressImage}
              alt="Stitching Progress"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-white/80 shadow-xs"
            />
          )}
        </div>
      )}

      {/* Timeline Steps */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3.5 sm:before:left-4.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-purple-200/60">
        {order.timeline.map((step, idx) => {
          const isDone = step.completed;
          const isCurrent = step.current || idx === currentStepIdx;

          return (
            <div key={idx} className="relative flex items-start gap-4 group">
              {/* Node Icon */}
              <div
                className={`absolute -left-6 sm:-left-8.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-2xs ${
                  isDone
                    ? 'card-gradient text-white ring-4 ring-purple-100/60'
                    : isCurrent
                    ? 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white ring-4 ring-pink-100 animate-pulse'
                    : 'bg-white/60 text-slate-400 border border-white/80'
                }`}
              >
                {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
              </div>

              {/* Step Content */}
              <div className={`flex-1 p-4 rounded-2xl border transition-all ${
                isCurrent 
                  ? 'bg-white/80 border-purple-300 shadow-md ring-2 ring-purple-300/50' 
                  : isDone 
                  ? 'bg-white/50 border-white/80' 
                  : 'bg-white/20 border-white/40 opacity-60'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-purple-900' : isDone ? 'text-slate-800' : 'text-slate-400'}`}>
                    {step.title}
                  </span>
                  {step.timestamp && (
                    <span className="text-[10px] text-purple-700 font-semibold bg-purple-100/60 px-2 py-0.5 rounded-full border border-purple-200/40">
                      {step.timestamp}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Courier & Delivery Contact Details Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/50">
        <div className="p-4 rounded-2xl bg-white/50 border border-white/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200/50">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-500">Courier Partner</p>
            <p className="text-xs font-bold text-slate-800">{order.courierName || 'Assigned Local Courier'}</p>
            <p className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3 text-blue-600" />
              {order.courierPhone || '+1 (555) 998-1122'}
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/50 border border-white/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-purple-700 flex items-center justify-center shrink-0 border border-purple-200/50">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold text-slate-500">Delivery Address</p>
            <p className="text-xs font-bold text-slate-800 truncate max-w-[200px] sm:max-w-xs">{order.deliveryAddress}</p>
            <p className="text-xs text-slate-600 mt-0.5">Customer: {order.customerName}</p>
          </div>
        </div>
      </div>

      {/* Optional Demo Interactive Stage Changer for Reviewers */}
      {showAdminControls && onUpdateStage && (
        <div className="bg-purple-100/40 p-4 rounded-2xl border border-purple-200/50 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-pink-500" />
              Demo Stage Controller (Test Timeline)
            </span>
            <span className="text-[10px] text-purple-700 font-medium">Click to update order stage live:</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {(
              [
                'pickup_scheduled',
                'fabric_picked_up',
                'delivered_to_tailor',
                'cutting_in_progress',
                'stitching_in_progress',
                'quality_check',
                'ready_for_delivery',
                'out_for_delivery',
                'completed'
              ] as OrderStage[]
            ).map((st) => (
              <button
                key={st}
                onClick={() => onUpdateStage(st)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg border transition-all ${
                  order.status === st
                    ? 'card-gradient text-white border-transparent shadow-xs'
                    : 'bg-white/80 text-slate-700 border-purple-200/60 hover:bg-white'
                }`}
              >
                {st.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
