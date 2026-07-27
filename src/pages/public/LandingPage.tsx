import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Scissors,
  Sparkles,
  Truck,
  ShieldCheck,
  Star,
  ChevronRight,
  Search,
  Ruler,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Bot,
  Heart,
  CheckCircle,
  Shirt,
  UserCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { tailors, reviews } = useData();
  const navigate = useNavigate();

  const [searchCategory, setSearchCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/browse-tailors?q=${encodeURIComponent(searchQuery)}&cat=${encodeURIComponent(searchCategory)}`);
  };

  const faqs = [
    {
      q: "How does the doorstep fabric pickup work?",
      a: "When you place a stitching order on StitchHub, a local courier partner is automatically assigned to pick up your fabric package directly from your home or office doorstep and safely deliver it to your tailor's studio."
    },
    {
      q: "How do I make sure my body measurements are accurate?",
      a: "You can save measurement profiles in your Customer Profile. Our AI Assistant 'Stitchy' provides step-by-step guidance on taking accurate neck, chest, waist, hips, sleeve, and inseam measurements using a standard tape!"
    },
    {
      q: "What if I don't have my own fabric?",
      a: "No problem! When booking a tailor, you can choose 'Select Tailor's Fabric' option. Tailors list their finest imported wools, silks, linens, and organza fabrics in their studio catalog."
    },
    {
      q: "How long does custom stitching take?",
      a: "Standard turnaround time ranges between 4 to 7 business days depending on the complexity of the garment (e.g. 2-piece suit vs intricate bridal gown). Express 3-day options are also available."
    },
    {
      q: "What if the garment needs minor fitting adjustments?",
      a: "Every StitchHub order includes our 100% Fit Guarantee. If minor alterations are needed after delivery, courier pickup for a free alteration tweak is arranged within 7 days!"
    }
  ];

  const featuredCouriers = [
    {
      id: 'cour-1',
      name: 'Swift Doorstep Express',
      serviceType: 'Hyperlocal Fabric Pickup & Express Delivery',
      pickupSpeed: '< 30 Mins',
      coverage: 'Downtown & Metro Suburbs',
      completedPickups: '4,850+ Bags',
      rating: 4.9,
      trackingType: 'Live GPS Fleet',
      features: ['Sealed Tamper-Proof Bags', 'Insured Transport', 'Real-Time SMS Alerts']
    },
    {
      id: 'cour-2',
      name: 'Velvet Logistics Hub',
      serviceType: 'Delicate Silk & Luxury Garment Transit',
      pickupSpeed: 'Scheduled Slots',
      coverage: 'Citywide Atelier Network',
      completedPickups: '3,200+ Bags',
      rating: 4.95,
      trackingType: 'Temperature & Dust Safe',
      features: ['Hanger Garment Vans', 'Anti-Crease Carriers', 'Doorstep Fitting Helper']
    },
    {
      id: 'cour-3',
      name: 'Savile Express Logistics',
      serviceType: 'Same-Day Atelier Drop & Return',
      pickupSpeed: '< 45 Mins',
      coverage: 'Full Metropolitan Area',
      completedPickups: '6,100+ Bags',
      rating: 4.88,
      trackingType: 'Live Rider Map',
      features: ['Contactless Pickup', 'Zero Damage Protection', 'Digital Proof of Delivery']
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-purple-500 selection:text-white">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        
        {/* Background Decorative Blur Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-purple-400/30 via-pink-400/20 to-purple-300/30 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-purple-900 text-xs font-bold shadow-sm">
              <Sparkles className="w-4 h-4 text-pink-500 animate-pulse" />
              <span>Next-Gen AI Tailoring & Doorstep Delivery</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12]">
              Bespoke Tailoring, <br />
              <span className="gradient-text">
                Reimagined with AI Precision.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Connect with top certified master tailors. Upload body measurements, request doorstep fabric pickup, track stitching live, and consult our Gemini AI Assistant.
            </p>

            {/* Search Bar Widget */}
            <form
              onSubmit={handleSearchSubmit}
              className="mt-8 glass p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border border-white/80 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2"
            >
              <div className="flex-1 flex items-center gap-2 px-3 py-2 w-full">
                <Search className="w-5 h-5 text-purple-600 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by tailor, suit, dress, or location..."
                  className="w-full text-xs sm:text-sm text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
                />
              </div>

              <select
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="px-3 py-2 text-xs font-semibold text-purple-900 bg-white/60 border border-purple-200/50 rounded-xl focus:ring-2 focus:ring-purple-400 w-full sm:w-auto"
              >
                <option value="">All Categories</option>
                <option value="Suits">Suits & Tuxedos</option>
                <option value="Dresses">Evening Gowns</option>
                <option value="Traditional">Traditional / Ethnic</option>
                <option value="Alterations">Alterations</option>
              </select>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl card-gradient text-white text-xs sm:text-sm font-bold shadow-md shadow-purple-500/25 hover:shadow-lg hover:scale-[1.02] transition-all shrink-0"
              >
                Find Tailor
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/browse-tailors"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 shadow-md transition-all flex items-center gap-2"
              >
                <span>Browse Certified Tailors</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/signup?role=tailor"
                className="px-6 py-3.5 rounded-2xl glass border border-white/80 text-purple-900 text-xs sm:text-sm font-bold hover:bg-white/80 shadow-xs transition-all flex items-center gap-2"
              >
                <Scissors className="w-4 h-4 text-pink-500" />
                <span>Join as a Tailor Partner</span>
              </Link>
            </div>

          </div>

          {/* Stats Banner */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="glass p-5 rounded-2xl border border-white/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-purple-900">500+</span>
              <p className="text-xs text-slate-500 font-medium mt-1">Verified Tailors</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-pink-600">12,000+</span>
              <p className="text-xs text-slate-500 font-medium mt-1">Stitched Garments</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-purple-900">4.9 ★</span>
              <p className="text-xs text-slate-500 font-medium mt-1">Average Customer Rating</p>
            </div>
            <div className="glass p-5 rounded-2xl border border-white/60 text-center">
              <span className="text-2xl sm:text-3xl font-black text-pink-600">100%</span>
              <p className="text-xs text-slate-500 font-medium mt-1">Doorstep Courier Pickup</p>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-widest glass px-3.5 py-1.5 rounded-full border border-white/60">
              Seamless 5-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How StitchHub Delivers Perfect Fit
            </h2>
            <p className="text-sm text-slate-600">
              From selecting a master artisan to doorstep courier delivery, enjoy effortless bespoke tailoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            
            <div className="glass p-6 rounded-[28px] border border-white/70 relative group hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-purple-500/20">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Pick a Tailor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse tailor profiles, reviews, specialties, portfolios, and price tiers.
              </p>
            </div>

            <div className="glass p-6 rounded-[28px] border border-white/70 relative group hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-purple-500/20">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Submit Measurements</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your measurements & reference design photos in minutes.
              </p>
            </div>

            <div className="glass p-6 rounded-[28px] border border-white/70 relative group hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-pink-500/20">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Doorstep Pickup</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courier collects your fabric package directly from your home.
              </p>
            </div>

            <div className="glass p-6 rounded-[28px] border border-white/70 relative group hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl card-gradient text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-purple-500/20">
                4
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Crafting & Inspection</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Master tailor stitches your garment & passes thorough quality checks.
              </p>
            </div>

            <div className="glass p-6 rounded-[28px] border border-white/70 relative group hover:shadow-xl transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg mb-4 shadow-md shadow-emerald-500/20">
                5
              </div>
              <h3 className="font-bold text-sm text-slate-900 mb-1">Doorstep Delivery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Courier delivers your freshly pressed custom fitted garment!
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* TOP TAILORS SPOTLIGHT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold text-pink-700 uppercase tracking-widest glass px-3.5 py-1.5 rounded-full border border-white/60">
                Featured Artisans
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Featured Master Tailors
              </h2>
            </div>
            <Link
              to="/browse-tailors"
              className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:text-purple-900"
            >
              <span>View All Tailors ({tailors.length})</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tailors.map((tailor) => (
              <div
                key={tailor.id}
                className="glass rounded-[32px] overflow-hidden border border-white/70 shadow-xl hover:shadow-2xl transition-all group flex flex-col"
              >
                {/* Cover & Avatar */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={tailor.coverImage}
                    alt={tailor.shopName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  
                  {tailor.verified && (
                    <span className="absolute top-3 right-3 glass text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs border border-white/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Atelier
                    </span>
                  )}

                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-3">
                    <img
                      src={tailor.avatar}
                      alt={tailor.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white/90 shadow-md shrink-0"
                    />
                    <div className="text-white">
                      <h3 className="font-bold text-sm leading-tight drop-shadow-xs">{tailor.name}</h3>
                      <p className="text-[11px] text-slate-200">{tailor.shopName}</p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-600 flex items-center gap-1 bg-amber-50/80 px-2 py-0.5 rounded-full border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {tailor.rating} ({tailor.reviewCount} reviews)
                      </span>
                      <span className="text-slate-600 font-medium flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-600" />
                        {tailor.turnaroundDays} Days Avg
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {tailor.bio}
                    </p>

                    {/* Specialty Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tailor.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-semibold bg-white/60 text-purple-900 px-2.5 py-0.5 rounded-lg border border-purple-200/50"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Stitching From</span>
                      <span className="text-lg font-black text-slate-900">${tailor.startingPrice}</span>
                    </div>

                    <Link
                      to={`/tailor-profile/${tailor.id}`}
                      className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md"
                    >
                      Book Tailor
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED LOGISTICS & COURIER PARTNERS */}
      <section className="py-16 my-6 bg-purple-900/5 rounded-[40px] border border-purple-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-extrabold text-purple-900 uppercase tracking-widest glass px-3.5 py-1.5 rounded-full border border-white/60">
                Doorstep Logistics Fleet
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
                Featured Logistics & Courier Partners
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Safe, tamper-proof fabric collection and freshly pressed garment delivery at your doorstep
              </p>
            </div>

            <div className="flex items-center gap-2 glass px-4 py-2 rounded-2xl border border-white/80 shadow-xs self-start md:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800">100% Sealed & Insured Transit</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCouriers.map((courier) => (
              <div
                key={courier.id}
                className="glass rounded-[32px] p-6 border border-white/70 shadow-xl hover:shadow-2xl transition-all flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
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

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white/60 p-3 rounded-2xl border border-white/80">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Avg Pickup Speed</span>
                      <span className="font-extrabold text-purple-900">{courier.pickupSpeed}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Coverage Zone</span>
                      <span className="font-extrabold text-slate-800">{courier.coverage}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Completed Pickups</span>
                      <span className="font-extrabold text-slate-800">{courier.completedPickups}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">Tracking Type</span>
                      <span className="font-extrabold text-emerald-700">{courier.trackingType}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {courier.features.map((feat, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-purple-100/80 text-purple-900 px-2.5 py-1 rounded-lg border border-purple-200/50 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-purple-600" />
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/50 flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {courier.rating} Courier Score
                  </span>

                  <span className="px-3 py-1.5 rounded-xl bg-purple-900 text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                    <UserCheck className="w-3.5 h-3.5 text-pink-400" />
                    <span>Active Express Fleet</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* AI CHATBOT HIGHLIGHT BANNER */}
      <section className="py-16 my-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-gradient rounded-[32px] p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl shadow-purple-500/20">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold">
                <Bot className="w-4 h-4 text-pink-300 animate-pulse" />
                <span>Powered by Google Gemini API</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Meet Stitchy — Your Personal AI Fashion & Tailoring Guide
              </h2>
              <p className="text-sm text-purple-100 leading-relaxed">
                Unsure about measurements, suit fabrics, or how fabric pickup works? Ask Stitchy anytime for instant 24/7 expert assistance.
              </p>
              <div className="pt-2">
                <Link
                  to="/chatbot"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-purple-900 text-xs font-extrabold shadow-lg hover:scale-[1.03] transition-transform"
                >
                  <Bot className="w-4 h-4 text-pink-600" />
                  <span>Chat with Stitchy AI Now</span>
                </Link>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 max-w-md w-full space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/30">
                  <Bot className="w-5 h-5 text-pink-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Sample Stitchy Conversation</p>
                  <p className="text-[10px] text-purple-200">Real-time Gemini AI response</p>
                </div>
              </div>
              <div className="p-3 bg-purple-950/40 backdrop-blur-md rounded-2xl text-xs text-purple-100 space-y-2 border border-white/20">
                <p className="text-pink-300 font-semibold">User: "What's the best fabric for an outdoor summer tuxedo?"</p>
                <p className="text-slate-100">Stitchy: "For outdoor summer formals, I recommend lightweight tropical wool (Super 120s) or a mohair-wool blend! They breathe exceptionally well while keeping a sharp structure."</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-widest glass px-3.5 py-1.5 rounded-full border border-white/60">
              Customer Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Loved by Fashion Lovers Nationwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div key={rev.id} className="glass p-6 rounded-[28px] border border-white/70 space-y-4 shadow-lg">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/50">
                  <img
                    src={rev.customerAvatar}
                    alt={rev.customerName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-300"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{rev.customerName}</h4>
                    <p className="text-[10px] text-purple-700 font-semibold">{rev.garmentType}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-extrabold text-purple-900 uppercase tracking-widest glass px-3.5 py-1.5 rounded-full border border-white/60">
              Got Questions?
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass rounded-2xl border border-white/70 overflow-hidden shadow-md transition-all"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-bold text-sm text-slate-800 flex items-center justify-between gap-4 hover:text-purple-700"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-600 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-white/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
