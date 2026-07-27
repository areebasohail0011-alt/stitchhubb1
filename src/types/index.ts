export type UserRole = 'customer' | 'tailor' | 'courier' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  joinedDate?: string;
  // Role specific fields
  rating?: number;
  specialty?: string[];
  vehicleType?: string;
  commissionRate?: number;
}

export interface MeasurementProfile {
  id: string;
  title: string; // e.g. "Formal Suit Fit", "Ethnic Sherwani", "Casual Dress"
  unit: 'cm' | 'inches';
  gender: 'male' | 'female' | 'unisex';
  neck?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  shoulderWidth?: number;
  sleeveLength?: number;
  inseam?: number;
  outseam?: number;
  thigh?: number;
  notes?: string;
  isDefault?: boolean;
  updatedAt: string;
}

export interface PortfolioItem {
  id: string;
  tailorId: string;
  title: string;
  category: string; // e.g. "Suiting", "Evening Gowns", "Traditional / Ethnic", "Alterations", "Casual Wear"
  imageUrl: string;
  description: string;
  startingPrice: number;
  completionDays: number;
  tags: string[];
}

export interface Tailor {
  id: string;
  userId: string;
  name: string;
  shopName: string;
  avatar: string;
  coverImage: string;
  location: string;
  city: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  bio: string;
  startingPrice: number;
  turnaroundDays: number;
  verified: boolean;
  activeOrdersCount: number;
  completedOrdersCount: number;
  portfolio: PortfolioItem[];
  pricingList: {
    category: string;
    item: string;
    price: number;
  }[];
}

export type OrderStage = 
  | 'order_placed'
  | 'pickup_scheduled'
  | 'fabric_picked_up'
  | 'delivered_to_tailor'
  | 'cutting_in_progress'
  | 'stitching_in_progress'
  | 'quality_check'
  | 'ready_for_delivery'
  | 'out_for_delivery'
  | 'completed'
  | 'cancelled';

export interface OrderTimelineStep {
  stage: OrderStage;
  title: string;
  description: string;
  timestamp?: string;
  completed: boolean;
  current?: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  tailorId: string;
  tailorName: string;
  tailorShop: string;
  tailorPhone: string;
  courierId?: string;
  courierName?: string;
  courierPhone?: string;
  garmentCategory: string; // e.g. "Men's 3-Piece Tuxedo Suit"
  garmentDescription: string;
  fabricOption: 'customer_fabric' | 'tailor_fabric';
  fabricDescription?: string;
  referenceImages: string[];
  measurements: MeasurementProfile;
  stitchingPrice: number;
  courierFee: number;
  taxFee: number;
  totalPrice: number;
  status: OrderStage;
  createdAt: string;
  estimatedDeliveryDate: string;
  timeline: OrderTimelineStep[];
  tailorNote?: string;
  progressImage?: string;
  deliveryProofOtp?: string;
  paid: boolean;
}

export interface CourierTask {
  id: string;
  orderId: string;
  courierId: string;
  type: 'pickup' | 'delivery';
  fromName: string;
  fromAddress: string;
  fromPhone: string;
  toName: string;
  toAddress: string;
  toPhone: string;
  itemDescription: string;
  status: 'pending' | 'accepted' | 'in_transit' | 'completed';
  scheduledTime: string;
  payout: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'system' | 'payment' | 'promo';
  link?: string;
}

export interface Review {
  id: string;
  tailorId: string;
  customerName: string;
  customerAvatar: string;
  rating: number;
  comment: string;
  date: string;
  garmentType: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isFallback?: boolean;
}
