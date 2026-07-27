import { User, Tailor, Order, MeasurementProfile, CourierTask, NotificationItem, Review } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_cust_1',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    role: 'customer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Suite 4B',
    city: 'New York, NY',
    joinedDate: 'Jan 2025'
  },
  {
    id: 'user_tailor_1',
    name: 'Marco Savile',
    email: 'marco@savilecraft.com',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 876-5432',
    address: '14 Fashion Avenue, Soho',
    city: 'New York, NY',
    rating: 4.9,
    specialty: ['Bespoke Suits', 'Formal Tuxedos', 'Italian Cuts'],
    joinedDate: 'Nov 2024'
  },
  {
    id: 'user_tailor_2',
    name: 'Elena Rostova',
    email: 'elena@couturecraft.com',
    role: 'tailor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 345-6789',
    address: '88 Design Street, Garment District',
    city: 'New York, NY',
    rating: 4.85,
    specialty: ['Evening Gowns', 'Bridal Wear', 'Silk Alterations'],
    joinedDate: 'Dec 2024'
  },
  {
    id: 'user_courier_1',
    name: 'Leo Swift',
    email: 'leo@stitchhubcourier.com',
    role: 'courier',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 998-1122',
    address: 'Hub #3, Downtown Dispatch',
    city: 'New York, NY',
    vehicleType: 'Eco Electric Van',
    joinedDate: 'Feb 2025'
  },
  {
    id: 'user_admin_1',
    name: 'Alexandra Vance',
    email: 'admin@stitchhub.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+1 (555) 000-1111',
    address: 'StitchHub HQ, 100 Tech Blvd',
    city: 'New York, NY',
    commissionRate: 12,
    joinedDate: 'Oct 2024'
  }
];

export const INITIAL_TAILORS: Tailor[] = [
  {
    id: 'tailor_1',
    userId: 'user_tailor_1',
    name: 'Marco Savile',
    shopName: 'Savile & Co. Bespoke Atelier',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&auto=format&fit=crop&q=80',
    location: '14 Fashion Avenue, Soho',
    city: 'New York, NY',
    rating: 4.9,
    reviewCount: 128,
    specialties: ['Bespoke Suits', 'Tuxedos', 'Italian Cut Coats', 'Leather Jackets'],
    bio: 'Master tailor with over 18 years of experience trained in Savile Row techniques. Specializing in crisp Italian canvas suits, custom wool coats, and red-carpet tuxedos.',
    startingPrice: 180,
    turnaroundDays: 5,
    verified: true,
    activeOrdersCount: 4,
    completedOrdersCount: 342,
    pricingList: [
      { category: 'Suits', item: '2-Piece Custom Suit', price: 250 },
      { category: 'Suits', item: '3-Piece Tuxedo Suit', price: 340 },
      { category: 'Outerwear', item: 'Wool Trench Coat', price: 220 },
      { category: 'Shirts', item: 'Custom Fitted Dress Shirt', price: 65 },
      { category: 'Alterations', item: 'Suit Jacket / Pant Hemming', price: 40 }
    ],
    portfolio: [
      {
        id: 'port_1',
        tailorId: 'tailor_1',
        title: 'Midnight Navy Italian Wool Suit',
        category: 'Suits',
        imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&auto=format&fit=crop&q=80',
        description: 'Hand-canvassedSuper 150s wool suit with working button cuffs and peak lapels.',
        startingPrice: 280,
        completionDays: 5,
        tags: ['Navy', 'Bespoke', 'Wool', 'Formal']
      },
      {
        id: 'port_2',
        tailorId: 'tailor_1',
        title: 'Classic Black Tie Satin Tuxedo',
        category: 'Suits',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
        description: 'Silk satin shawl collar tuxedo crafted with seamless internal lining.',
        startingPrice: 340,
        completionDays: 6,
        tags: ['Black Tie', 'Tuxedo', 'Silk Satin']
      },
      {
        id: 'port_3',
        tailorId: 'tailor_1',
        title: 'Camel Cashmere Overcoat',
        category: 'Outerwear',
        imageUrl: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop&q=80',
        description: 'Double-breasted luxurious cashmere coat with horn buttons.',
        startingPrice: 310,
        completionDays: 7,
        tags: ['Cashmere', 'Camel', 'Winter']
      }
    ]
  },
  {
    id: 'tailor_2',
    userId: 'user_tailor_2',
    name: 'Elena Rostova',
    shopName: 'Rostova Couture Studio',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1537832816519-689ad163238b?w=800&auto=format&fit=crop&q=80',
    location: '88 Design Street, Garment District',
    city: 'New York, NY',
    rating: 4.88,
    reviewCount: 94,
    specialties: ['Evening Gowns', 'Bridal Dresses', 'Silk Corsetry', 'Custom Embroidery'],
    bio: 'Paris-trained fashion designer crafting bespoke evening wear, bridal gowns, and exquisite custom embroidery. Passionate about drape, precision corsetry, and fluid movement.',
    startingPrice: 195,
    turnaroundDays: 6,
    verified: true,
    activeOrdersCount: 3,
    completedOrdersCount: 215,
    pricingList: [
      { category: 'Dresses', item: 'Bespoke Silk Evening Gown', price: 290 },
      { category: 'Dresses', item: 'Cocktail Dress', price: 180 },
      { category: 'Bridal', item: 'Custom Bridal Gown Stitching', price: 550 },
      { category: 'Alterations', item: 'Complex Dress Fitting & Hemming', price: 65 }
    ],
    portfolio: [
      {
        id: 'port_4',
        tailorId: 'tailor_2',
        title: 'Emerald Silk Velvet Evening Gown',
        category: 'Dresses',
        imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop&q=80',
        description: 'Floor-length draping silk velvet gown with hand-stitched beaded neckline.',
        startingPrice: 320,
        completionDays: 6,
        tags: ['Silk Velvet', 'Emerald', 'Gown']
      },
      {
        id: 'port_5',
        tailorId: 'tailor_2',
        title: 'Pastel Lavender Organza A-Line Dress',
        category: 'Dresses',
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80',
        description: 'Lightweight layered organza gown with delicate floral embroidery.',
        startingPrice: 240,
        completionDays: 5,
        tags: ['Organza', 'Lavender', 'Summer']
      }
    ]
  },
  {
    id: 'tailor_3',
    userId: 'user_tailor_3',
    name: 'Rajesh & Meera Khan',
    shopName: 'Heritage Ethnic Crafts',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&auto=format&fit=crop&q=80',
    location: '202 Spice & Silk Way, Queens',
    city: 'New York, NY',
    rating: 4.95,
    reviewCount: 156,
    specialties: ['Ethnic Sherwanis', 'Bridal Lehengas', 'Anarkali Suits', 'Zardozi Embroidery'],
    bio: 'Family-owned traditional atelier specializing in royal ethnic wear, heavy zardozi handwork, festive sherwanis, and custom bridal lehengas with flawless fit.',
    startingPrice: 150,
    turnaroundDays: 7,
    verified: true,
    activeOrdersCount: 6,
    completedOrdersCount: 480,
    pricingList: [
      { category: 'Traditional', item: 'Royal Velvet Sherwani', price: 280 },
      { category: 'Traditional', item: 'Designer Bridal Lehenga Set', price: 420 },
      { category: 'Traditional', item: 'Silk Anarkali Suit', price: 160 },
      { category: 'Casual', item: 'Handloom Cotton Kurta Set', price: 85 }
    ],
    portfolio: [
      {
        id: 'port_6',
        tailorId: 'tailor_3',
        title: 'Maroon Velvet Zardozi Sherwani',
        category: 'Traditional',
        imageUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
        description: 'Intricate golden wire work on deep burgundy velvet with custom stole.',
        startingPrice: 310,
        completionDays: 7,
        tags: ['Sherwani', 'Velvet', 'Zardozi']
      }
    ]
  }
];

export const INITIAL_MEASUREMENTS: MeasurementProfile[] = [
  {
    id: 'meas_1',
    title: 'Formal Suit Profile',
    unit: 'inches',
    gender: 'female',
    neck: 14.5,
    chest: 36,
    waist: 28,
    hips: 38,
    shoulderWidth: 15.5,
    sleeveLength: 23,
    inseam: 30,
    outseam: 39.5,
    thigh: 21,
    notes: 'Prefers tapered trousers and slim fitting waist contours.',
    isDefault: true,
    updatedAt: '2026-06-15'
  },
  {
    id: 'meas_2',
    title: 'Summer Evening Dress Fit',
    unit: 'inches',
    gender: 'female',
    chest: 35.5,
    waist: 27.5,
    hips: 38.5,
    shoulderWidth: 15,
    sleeveLength: 22.5,
    notes: 'Prefers slightly relaxed waist for fluid drape dresses.',
    isDefault: false,
    updatedAt: '2026-07-01'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-8921',
    customerId: 'user_cust_1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 (555) 234-5678',
    deliveryAddress: '742 Evergreen Terrace, Suite 4B, New York, NY',
    tailorId: 'tailor_1',
    tailorName: 'Marco Savile',
    tailorShop: 'Savile & Co. Bespoke Atelier',
    tailorPhone: '+1 (555) 876-5432',
    courierId: 'user_courier_1',
    courierName: 'Leo Swift',
    courierPhone: '+1 (555) 998-1122',
    garmentCategory: 'Women\'s Tailored Power Suit',
    garmentDescription: 'Double-breasted Italian wool blazer with wide-leg high-waist trousers.',
    fabricOption: 'customer_fabric',
    fabricDescription: '3.5 Yards Italian Plum Wool Blend Fabric',
    referenceImages: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80'
    ],
    measurements: INITIAL_MEASUREMENTS[0],
    stitchingPrice: 260,
    courierFee: 15,
    taxFee: 22,
    totalPrice: 297,
    status: 'stitching_in_progress',
    createdAt: '2026-07-24',
    estimatedDeliveryDate: '2026-07-29',
    tailorNote: 'Pattern cutting completed. Main body stitching and canvas structure in progress.',
    progressImage: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=80',
    paid: true,
    timeline: [
      { stage: 'order_placed', title: 'Order Placed', description: 'Booking confirmed & measurements verified', timestamp: '2026-07-24 09:30 AM', completed: true },
      { stage: 'pickup_scheduled', title: 'Pickup Scheduled', description: 'Courier assigned to pick up fabric', timestamp: '2026-07-24 11:15 AM', completed: true },
      { stage: 'fabric_picked_up', title: 'Fabric Picked Up', description: 'Courier Leo collected fabric from doorstep', timestamp: '2026-07-24 03:00 PM', completed: true },
      { stage: 'delivered_to_tailor', title: 'Material Delivered', description: 'Delivered to Savile & Co. Atelier', timestamp: '2026-07-25 10:00 AM', completed: true },
      { stage: 'cutting_in_progress', title: 'Cutting & Drafting', description: 'Precision pattern cutting completed', timestamp: '2026-07-26 02:00 PM', completed: true },
      { stage: 'stitching_in_progress', title: 'Bespoke Stitching', description: 'Tailor Marco is stitching garment body', timestamp: '2026-07-27 09:00 AM', completed: true, current: true },
      { stage: 'quality_check', title: 'Quality Inspection', description: 'Checking seams, buttons, & press finish', completed: false },
      { stage: 'ready_for_delivery', title: 'Ready for Courier', description: 'Garment packed in garment bag', completed: false },
      { stage: 'out_for_delivery', title: 'Out for Delivery', description: 'Courier on route to your address', completed: false },
      { stage: 'completed', title: 'Delivered to You', description: 'Final doorstep delivery & fit confirmation', completed: false }
    ]
  },
  {
    id: 'ORD-7412',
    customerId: 'user_cust_1',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah@example.com',
    customerPhone: '+1 (555) 234-5678',
    deliveryAddress: '742 Evergreen Terrace, Suite 4B, New York, NY',
    tailorId: 'tailor_2',
    tailorName: 'Elena Rostova',
    tailorShop: 'Rostova Couture Studio',
    tailorPhone: '+1 (555) 345-6789',
    courierId: 'user_courier_1',
    courierName: 'Leo Swift',
    courierPhone: '+1 (555) 998-1122',
    garmentCategory: 'Lavender Silk Evening Gown',
    garmentDescription: 'Layered organza A-line dress with subtle corset lining.',
    fabricOption: 'tailor_fabric',
    fabricDescription: 'French Silk Organza & Satin Lining (Selected from Tailor Studio)',
    referenceImages: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80'
    ],
    measurements: INITIAL_MEASUREMENTS[1],
    stitchingPrice: 320,
    courierFee: 15,
    taxFee: 26,
    totalPrice: 361,
    status: 'completed',
    createdAt: '2026-07-10',
    estimatedDeliveryDate: '2026-07-16',
    tailorNote: 'Completed & pressed. Customer confirmed perfect fitting!',
    paid: true,
    timeline: [
      { stage: 'order_placed', title: 'Order Placed', description: 'Booking confirmed', timestamp: '2026-07-10 10:00 AM', completed: true },
      { stage: 'delivered_to_tailor', title: 'Material Prepared', description: 'Silk selected at Studio', timestamp: '2026-07-11 11:00 AM', completed: true },
      { stage: 'stitching_in_progress', title: 'Stitching Complete', description: 'Finished with care', timestamp: '2026-07-14 04:00 PM', completed: true },
      { stage: 'quality_check', title: 'Quality Passed', description: 'Inspection green', timestamp: '2026-07-15 01:00 PM', completed: true },
      { stage: 'out_for_delivery', title: 'Out for Delivery', description: 'Courier Leo dispatched', timestamp: '2026-07-16 09:30 AM', completed: true },
      { stage: 'completed', title: 'Delivered', description: 'Successfully delivered to customer', timestamp: '2026-07-16 02:15 PM', completed: true }
    ]
  }
];

export const INITIAL_COURIER_TASKS: CourierTask[] = [
  {
    id: 'TASK-101',
    orderId: 'ORD-8921',
    courierId: 'user_courier_1',
    type: 'pickup',
    fromName: 'Sarah Jenkins',
    fromAddress: '742 Evergreen Terrace, Suite 4B, NY',
    fromPhone: '+1 (555) 234-5678',
    toName: 'Savile & Co. Atelier',
    toAddress: '14 Fashion Avenue, Soho, NY',
    toPhone: '+1 (555) 876-5432',
    itemDescription: 'Plum Wool Blend Fabric Package (1.8 kg)',
    status: 'completed',
    scheduledTime: '2026-07-24 02:30 PM',
    payout: 15
  },
  {
    id: 'TASK-102',
    orderId: 'ORD-8921',
    courierId: 'user_courier_1',
    type: 'delivery',
    fromName: 'Savile & Co. Atelier',
    fromAddress: '14 Fashion Avenue, Soho, NY',
    fromPhone: '+1 (555) 876-5432',
    toName: 'Sarah Jenkins',
    toAddress: '742 Evergreen Terrace, Suite 4B, NY',
    toPhone: '+1 (555) 234-5678',
    itemDescription: 'Tailored Women\'s Blazer & Trousers in Garment Bag',
    status: 'pending',
    scheduledTime: '2026-07-29 11:00 AM',
    payout: 18
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'user_cust_1',
    title: 'Order Status Update',
    message: 'Your order ORD-8921 is now in Bespoke Stitching stage at Savile & Co.',
    timestamp: '2 hours ago',
    read: false,
    type: 'order',
    link: '/customer/orders'
  },
  {
    id: 'notif_2',
    userId: 'user_cust_1',
    title: 'Fabric Picked Up',
    message: 'Courier Leo Swift collected your fabric for ORD-8921.',
    timestamp: '3 days ago',
    read: true,
    type: 'order',
    link: '/customer/track/ORD-8921'
  },
  {
    id: 'notif_3',
    userId: 'user_tailor_1',
    title: 'New Booking Request',
    message: 'You have a new custom suit stitching request from Sarah Jenkins.',
    timestamp: '3 days ago',
    read: true,
    type: 'order'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev_1',
    tailorId: 'tailor_1',
    customerName: 'Victoria S.',
    customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Marco is a true artist! The suit fits like a second skin. The doorstep fabric pickup was super convenient.',
    date: 'July 18, 2026',
    garmentType: 'Italian Wool Suit'
  },
  {
    id: 'rev_2',
    tailorId: 'tailor_1',
    customerName: 'Marcus T.',
    customerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Flawless stitching quality. Turnaround was even faster than expected!',
    date: 'June 29, 2026',
    garmentType: '3-Piece Tuxedo'
  },
  {
    id: 'rev_3',
    tailorId: 'tailor_2',
    customerName: 'Emily Vance',
    customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Elena crafted my dream silk evening gown. The fit from my uploaded measurements was 100% accurate!',
    date: 'July 2, 2026',
    garmentType: 'Silk Evening Gown'
  }
];
