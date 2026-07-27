import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { OrderTrackingTimeline } from '../../components/common/OrderTrackingTimeline';
import { ArrowLeft, Scissors, Package } from 'lucide-react';
import { OrderStage } from '../../types';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders, updateOrderStatus } = useData();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const handleUpdateStage = (stage: OrderStage) => {
    if (order) {
      updateOrderStatus(order.id, stage, 'Stage updated via demo controller.');
    }
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center space-y-3">
          <Package className="w-12 h-12 text-slate-400 mx-auto" />
          <h2 className="text-lg font-bold text-slate-800">Order Not Found</h2>
          <Link to="/customer/orders" className="text-xs font-bold text-purple-600 hover:underline">
            Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      
      {/* Top Header */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-6 sm:p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <Link
                to="/customer/orders"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-200 hover:text-white mb-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Orders</span>
              </Link>
              <h1 className="text-2xl font-black">Live Order Tracking</h1>
              <p className="text-xs text-purple-100 mt-0.5">Order {order.id} • {order.garmentCategory}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <OrderTrackingTimeline
          order={order}
          onUpdateStage={handleUpdateStage}
          showAdminControls={true}
        />
      </div>

    </div>
  );
};
