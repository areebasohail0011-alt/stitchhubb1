import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Truck,
  Star,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  PackageCheck,
  CheckCircle,
  PhoneCall,
  UserCheck,
  Navigation
} from 'lucide-react';

export const BrowseCouriersPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedService, setSelectedService] = useState('All');
  const [minRating, setMinRating] = useState<number>(0);

  const serviceCategories = ['All', 'Express Pickup', 'Hanger Vans', 'Same-Day Atelier', 'Inter-City Transit'];

  const courierFleets = [
    {
      id: 'cour-1',
      name: 'Swift Doorstep Express',
      serviceType: 'Hyperlocal Fabric Pickup & Express Delivery',
      category: 'Express Pickup',
      pickupSpeed: '< 30 Mins',
      coverage: 'Downtown & Metro Suburbs',
      completedPickups: '4,850+ Bags',
      rating: 4.9,
      trackingType: 'Live GPS Fleet',
      baseRate: '$8.50',
      contactPhone: '+1 (555) 019-2834',
      features: ['Sealed Tamper-Proof Bags', 'Insured Transport', 'Real-Time SMS Alerts']
    },
    {
      id: 'cour-2',
      name: 'Velvet Logistics Hub',
      serviceType: 'Delicate Silk & Luxury Garment Transit',
      category: 'Hanger Vans',
      pickupSpeed: 'Scheduled Slots',
      coverage: 'Citywide Atelier Network',
      completedPickups: '3,200+ Bags',
      rating: 4.95,
      trackingType: 'Temperature & Dust Safe',
      baseRate: '$12.00',
      contactPhone: '+1 (555) 082-9912',
      features: ['Hanger Garment Vans', 'Anti-Crease Carriers', 'Doorstep Fitting Helper']
    },
    {
      id: 'cour-3',
      name: 'Savile Express Logistics',
      serviceType: 'Same-Day Atelier Drop & Return',
      category: 'Same-Day Atelier',
      pickupSpeed: '< 45 Mins',
      coverage: 'Full Metropolitan Area',
      completedPickups: '6,100+ Bags',
      rating: 4.88,
      trackingType: 'Live Rider Map',
      baseRate: '$10.00',
      contactPhone: '+1 (555) 043-1122',
      features: ['Contactless Pickup', 'Zero Damage Protection', 'Digital Proof of Delivery']
    },
    {
      id: 'cour-4',
      name: 'StitchFleet Priority',
      serviceType: 'Urgent Evening Event & Wedding Garment Transit',
      category: 'Express Pickup',
      pickupSpeed: '< 20 Mins',
      coverage: 'Greater Metro Zone',
      completedPickups: '2,400+ Bags',
      rating: 4.92,
      trackingType: 'Priority Dispatch GPS',
      baseRate: '$15.00',
      contactPhone: '+1 (555) 091-7788',
      features: ['Priority Rider Matching', 'Weatherproof Shield', 'Guaranteed Delivery Window']
    },
    {
      id: 'cour-5',
      name: 'Metro Atelier Logistics',
      serviceType: 'Regional Fabric & Bulk Tailoring Distribution',
      category: 'Inter-City Transit',
      pickupSpeed: 'Within 2 Hours',
      coverage: 'Statewide Outlets',
      completedPickups: '8,900+ Bags',
      rating: 4.85,
      trackingType: 'Barcoded Tracking',
      baseRate: '$6.50',
      contactPhone: '+1 (555) 022-3344',
      features: ['Multi-Stop Delivery', 'Bulk Fabric Handling', 'Warehouse Storage']
    }
  ];

  const filteredCouriers = courierFleets.filter((courier) => {
    const matchesQuery =
      courier.name.toLowerCase().includes(query.toLowerCase()) ||
      courier.serviceType.toLowerCase().includes(query.toLowerCase()) ||
      courier.coverage.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedService === 'All' || courier.category === selectedService;

    const matchesRating = courier.rating >= minRating;

    return matchesQuery && matchesCategory && matchesRating;
  });

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 sm:p-10 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Doorstep Logistics Fleet</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Browse Logistics & Courier Partners
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Connect with verified logistics fleets for tamper-proof fabric pickups from your doorstep directly to your tailor's atelier, and safe garment deliveries back to you.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
        
        {/* Search & Filter Bar */}
        <div className="glass p-5 rounded-[28px] border border-white/70 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 glass-input px-4 py-3 rounded-2xl border border-white/80 w-full">
              <Search className="w-4 h-4 text-purple-600 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courier partner, area, or service type..."
                className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
              />
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-600 whitespace-nowrap">Min Rating:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="glass-input px-3 py-2.5 rounded-2xl border border-white/80 text-xs font-bold text-slate-800 bg-white/80 focus:outline-none"
              >
                <option value={0}>All Ratings</option>
                <option value={4.5}>4.5★ & Above</option>
                <option value={4.8}>4.8★ & Above</option>
                <option value={4.9}>4.9★ & Above</option>
              </select>
            </div>

          </div>

          {/* Service Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/50 scrollbar-none">
            {serviceCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedService(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedService === cat
                    ? 'card-gradient text-white shadow-md'
                    : 'bg-white/60 text-slate-700 hover:bg-white border border-white/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Courier List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCouriers.length === 0 ? (
            <div className="col-span-full py-16 text-center glass rounded-[32px] border border-white/70 p-8 space-y-3 shadow-xl">
              <Truck className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-800">No Courier Fleet Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try adjusting your search criteria or resetting filters to view available logistics partners.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedService('All');
                  setMinRating(0);
                }}
                className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold shadow-md hover:scale-105 transition-transform"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredCouriers.map((courier) => (
              <div
                key={courier.id}
                className="glass rounded-[32px] p-6 border border-white/70 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  
                  {/* Courier Header */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/50">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center font-bold shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                        <Truck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm text-slate-900">{courier.name}</h3>
                          <span className="bg-emerald-100/80 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-200/50">
                            Verified
                          </span>
                        </div>
                        <p className="text-[11px] text-purple-800 font-semibold mt-0.5">{courier.serviceType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs bg-white/60 p-3 rounded-2xl border border-white/80">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Pickup Speed</span>
                      <span className="font-extrabold text-purple-900 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-600" />
                        {courier.pickupSpeed}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Base Delivery Fee</span>
                      <span className="font-extrabold text-slate-900">{courier.baseRate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Coverage Zone</span>
                      <span className="font-extrabold text-slate-800 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-purple-600 shrink-0" />
                        <span className="truncate">{courier.coverage}</span>
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Tracking Type</span>
                      <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-emerald-600" />
                        {courier.trackingType}
                      </span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {courier.features.map((feat, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-purple-100/80 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-200/50 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-purple-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-white/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {courier.rating} Score
                  </span>

                  <Link
                    to="/customer/book"
                    className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:scale-105 transition-transform"
                  >
                    <PackageCheck className="w-3.5 h-3.5" />
                    <span>Book Pickup</span>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
