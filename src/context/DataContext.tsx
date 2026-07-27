import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Order,
  Tailor,
  MeasurementProfile,
  CourierTask,
  NotificationItem,
  Review,
  OrderStage,
  PortfolioItem
} from '../types';
import {
  INITIAL_ORDERS,
  INITIAL_TAILORS,
  INITIAL_MEASUREMENTS,
  INITIAL_COURIER_TASKS,
  INITIAL_NOTIFICATIONS,
  INITIAL_REVIEWS
} from '../data/mockData';

interface DataContextType {
  orders: Order[];
  tailors: Tailor[];
  measurements: MeasurementProfile[];
  courierTasks: CourierTask[];
  notifications: NotificationItem[];
  reviews: Review[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, stage: OrderStage, note?: string, progressImage?: string) => void;
  saveMeasurementProfile: (profile: Partial<MeasurementProfile>) => void;
  deleteMeasurementProfile: (id: string) => void;
  addPortfolioItem: (tailorId: string, item: Partial<PortfolioItem>) => void;
  deletePortfolioItem: (tailorId: string, itemId: string) => void;
  updateCourierTaskStatus: (taskId: string, status: CourierTask['status']) => void;
  addNotification: (notif: Partial<NotificationItem>) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;
  getTailorById: (id: string) => Tailor | undefined;
  getOrderById: (id: string) => Order | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('stitchhub_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [tailors, setTailors] = useState<Tailor[]>(() => {
    const saved = localStorage.getItem('stitchhub_tailors');
    return saved ? JSON.parse(saved) : INITIAL_TAILORS;
  });

  const [measurements, setMeasurements] = useState<MeasurementProfile[]>(() => {
    const saved = localStorage.getItem('stitchhub_measurements');
    return saved ? JSON.parse(saved) : INITIAL_MEASUREMENTS;
  });

  const [courierTasks, setCourierTasks] = useState<CourierTask[]>(() => {
    const saved = localStorage.getItem('stitchhub_courier_tasks');
    return saved ? JSON.parse(saved) : INITIAL_COURIER_TASKS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('stitchhub_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reviews] = useState<Review[]>(INITIAL_REVIEWS);

  useEffect(() => {
    localStorage.setItem('stitchhub_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('stitchhub_tailors', JSON.stringify(tailors));
  }, [tailors]);

  useEffect(() => {
    localStorage.setItem('stitchhub_measurements', JSON.stringify(measurements));
  }, [measurements]);

  useEffect(() => {
    localStorage.setItem('stitchhub_courier_tasks', JSON.stringify(courierTasks));
  }, [courierTasks]);

  useEffect(() => {
    localStorage.setItem('stitchhub_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const getTailorById = (id: string) => tailors.find(t => t.id === id || t.userId === id);
  const getOrderById = (id: string) => orders.find(o => o.id === id);

  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toISOString().split('T')[0];
    const estimatedDate = new Date(Date.now() + 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const initialTimeline = [
      { stage: 'order_placed' as OrderStage, title: 'Order Placed', description: 'Booking confirmed & measurements received', timestamp: `${nowStr} Just Now`, completed: true, current: false },
      { stage: 'pickup_scheduled' as OrderStage, title: 'Pickup Scheduled', description: 'Courier assigned to pick up fabric from your doorstep', completed: true, current: true },
      { stage: 'fabric_picked_up' as OrderStage, title: 'Fabric Picked Up', description: 'Courier collects fabric package', completed: false },
      { stage: 'delivered_to_tailor' as OrderStage, title: 'Material Delivered', description: 'Fabric arrives at tailor atelier', completed: false },
      { stage: 'cutting_in_progress' as OrderStage, title: 'Cutting & Drafting', description: 'Tailor cuts patterns to measurement profile', completed: false },
      { stage: 'stitching_in_progress' as OrderStage, title: 'Bespoke Stitching', description: 'Garment assembly and hand lining', completed: false },
      { stage: 'quality_check' as OrderStage, title: 'Quality Inspection', description: 'Checking seams, buttons, & press finish', completed: false },
      { stage: 'ready_for_delivery' as OrderStage, title: 'Ready for Courier', description: 'Garment packed in garment bag', completed: false },
      { stage: 'out_for_delivery' as OrderStage, title: 'Out for Delivery', description: 'Courier en route to your address', completed: false },
      { stage: 'completed' as OrderStage, title: 'Delivered', description: 'Final doorstep delivery & fit confirmation', completed: false }
    ];

    const newOrder: Order = {
      id: newOrderId,
      customerId: orderData.customerId || 'user_cust_1',
      customerName: orderData.customerName || 'Sarah Jenkins',
      customerEmail: orderData.customerEmail || 'sarah@example.com',
      customerPhone: orderData.customerPhone || '+1 (555) 234-5678',
      deliveryAddress: orderData.deliveryAddress || '742 Evergreen Terrace, Suite 4B, New York, NY',
      tailorId: orderData.tailorId || 'tailor_1',
      tailorName: orderData.tailorName || 'Marco Savile',
      tailorShop: orderData.tailorShop || 'Savile & Co.',
      tailorPhone: orderData.tailorPhone || '+1 (555) 876-5432',
      courierId: 'user_courier_1',
      courierName: 'Leo Swift',
      courierPhone: '+1 (555) 998-1122',
      garmentCategory: orderData.garmentCategory || 'Custom Garment',
      garmentDescription: orderData.garmentDescription || 'Custom fitted garment',
      fabricOption: orderData.fabricOption || 'customer_fabric',
      fabricDescription: orderData.fabricDescription || 'Provided fabric',
      referenceImages: orderData.referenceImages || [],
      measurements: orderData.measurements || INITIAL_MEASUREMENTS[0],
      stitchingPrice: orderData.stitchingPrice || 200,
      courierFee: 15,
      taxFee: 18,
      totalPrice: (orderData.stitchingPrice || 200) + 33,
      status: 'pickup_scheduled',
      createdAt: nowStr,
      estimatedDeliveryDate: estimatedDate,
      timeline: initialTimeline,
      paid: true
    };

    setOrders(prev => [newOrder, ...prev]);

    // Create pickup task for courier
    const newPickupTask: CourierTask = {
      id: `TASK-${Math.floor(100 + Math.random() * 900)}`,
      orderId: newOrderId,
      courierId: 'user_courier_1',
      type: 'pickup',
      fromName: newOrder.customerName,
      fromAddress: newOrder.deliveryAddress,
      fromPhone: newOrder.customerPhone,
      toName: newOrder.tailorShop,
      toAddress: '14 Fashion Avenue, Soho, NY',
      toPhone: newOrder.tailorPhone,
      itemDescription: `${newOrder.garmentCategory} Fabric Package`,
      status: 'pending',
      scheduledTime: 'Today at 03:00 PM',
      payout: 15
    };
    setCourierTasks(prev => [newPickupTask, ...prev]);

    // Add notification
    addNotification({
      userId: newOrder.customerId,
      title: 'Order Confirmed!',
      message: `Your order ${newOrderId} with ${newOrder.tailorName} has been placed. Doorstep fabric pickup is scheduled.`,
      type: 'order',
      link: `/customer/orders`
    });

    // Notify tailor
    addNotification({
      userId: newOrder.tailorId,
      title: 'New Booking Request',
      message: `New order ${newOrderId} received from ${newOrder.customerName} for ${newOrder.garmentCategory}.`,
      type: 'order'
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, stage: OrderStage, note?: string, progressImage?: string) => {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setOrders(prev => prev.map(order => {
      if (order.id !== orderId) return order;

      const stageIndexMap: Record<OrderStage, number> = {
        'order_placed': 0,
        'pickup_scheduled': 1,
        'fabric_picked_up': 2,
        'delivered_to_tailor': 3,
        'cutting_in_progress': 4,
        'stitching_in_progress': 5,
        'quality_check': 6,
        'ready_for_delivery': 7,
        'out_for_delivery': 8,
        'completed': 9,
        'cancelled': -1
      };

      const targetIdx = stageIndexMap[stage];

      const updatedTimeline = order.timeline.map((step, idx) => {
        if (stage === 'cancelled') {
          return { ...step, completed: false, current: false };
        }
        if (idx < targetIdx) {
          return { ...step, completed: true, current: false };
        } else if (idx === targetIdx) {
          return { ...step, completed: true, current: true, timestamp: `${timeNow}` };
        } else {
          return { ...step, completed: false, current: false };
        }
      });

      return {
        ...order,
        status: stage,
        timeline: updatedTimeline,
        tailorNote: note !== undefined ? note : order.tailorNote,
        progressImage: progressImage || order.progressImage
      };
    }));

    // Notify customer
    const orderObj = orders.find(o => o.id === orderId);
    if (orderObj) {
      addNotification({
        userId: orderObj.customerId,
        title: `Order Update: ${orderId}`,
        message: `Your order for ${orderObj.garmentCategory} is now: ${stage.replace(/_/g, ' ').toUpperCase()}`,
        type: 'order',
        link: `/customer/orders`
      });
    }
  };

  const saveMeasurementProfile = (profileData: Partial<MeasurementProfile>) => {
    if (profileData.id) {
      setMeasurements(prev => prev.map(m => m.id === profileData.id ? { ...m, ...profileData, updatedAt: new Date().toISOString().split('T')[0] } as MeasurementProfile : m));
    } else {
      const newProf: MeasurementProfile = {
        id: `meas_${Date.now()}`,
        title: profileData.title || 'New Fit Profile',
        unit: profileData.unit || 'inches',
        gender: profileData.gender || 'female',
        neck: profileData.neck || 14,
        chest: profileData.chest || 36,
        waist: profileData.waist || 28,
        hips: profileData.hips || 38,
        shoulderWidth: profileData.shoulderWidth || 15,
        sleeveLength: profileData.sleeveLength || 23,
        inseam: profileData.inseam || 30,
        notes: profileData.notes || '',
        isDefault: profileData.isDefault || false,
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setMeasurements(prev => [newProf, ...prev]);
    }
  };

  const deleteMeasurementProfile = (id: string) => {
    setMeasurements(prev => prev.filter(m => m.id !== id));
  };

  const addPortfolioItem = (tailorId: string, itemData: Partial<PortfolioItem>) => {
    const newItem: PortfolioItem = {
      id: `port_${Date.now()}`,
      tailorId,
      title: itemData.title || 'Custom Creation',
      category: itemData.category || 'Suits',
      imageUrl: itemData.imageUrl || 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
      description: itemData.description || 'Bespoke hand-tailored piece with fine craftsmanship.',
      startingPrice: itemData.startingPrice || 200,
      completionDays: itemData.completionDays || 5,
      tags: itemData.tags || ['Bespoke', 'Handmade']
    };

    setTailors(prev => prev.map(tailor => {
      if (tailor.id === tailorId || tailor.userId === tailorId) {
        return {
          ...tailor,
          portfolio: [newItem, ...tailor.portfolio]
        };
      }
      return tailor;
    }));
  };

  const deletePortfolioItem = (tailorId: string, itemId: string) => {
    setTailors(prev => prev.map(tailor => {
      if (tailor.id === tailorId || tailor.userId === tailorId) {
        return {
          ...tailor,
          portfolio: tailor.portfolio.filter(p => p.id !== itemId)
        };
      }
      return tailor;
    }));
  };

  const updateCourierTaskStatus = (taskId: string, status: CourierTask['status']) => {
    setCourierTasks(prev => prev.map(t => t.id === taskId ? { ...t, status } : t));
  };

  const addNotification = (notifData: Partial<NotificationItem>) => {
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: notifData.userId || 'user_cust_1',
      title: notifData.title || 'Notification',
      message: notifData.message || '',
      timestamp: 'Just now',
      read: false,
      type: notifData.type || 'system',
      link: notifData.link
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <DataContext.Provider value={{
      orders,
      tailors,
      measurements,
      courierTasks,
      notifications,
      reviews,
      createOrder,
      updateOrderStatus,
      saveMeasurementProfile,
      deleteMeasurementProfile,
      addPortfolioItem,
      deletePortfolioItem,
      updateCourierTaskStatus,
      addNotification,
      markNotificationRead,
      clearAllNotifications,
      getTailorById,
      getOrderById
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
