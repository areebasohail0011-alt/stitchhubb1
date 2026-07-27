import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  Scissors,
  Check,
  Plus,
  ArrowRight,
  User,
  MessageSquare,
  Sparkles,
  Phone
} from 'lucide-react';

export const TailorProfilePage: React.FC = () => {
  const { tailorId } = useParams<{ tailorId: string }>();
  const { tailors, reviews } = useData();
  const navigate = useNavigate();

  const tailor = tailors.find((t) => t.id === tailorId || t.userId === tailorId) || tailors[0];
  const tailorReviews = reviews.filter((r) => r.tailorId === tailor.id);

  const [activeTab, setActiveTab] = useState<'portfolio' | 'pricing' | 'reviews'>('portfolio');
  const [selectedPortfolioImg, setSelectedPortfolioImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen pb-20">
      
      {/* Cover Header */}
      <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
        <img
          src={tailor.coverImage}
          alt={tailor.shopName}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={tailor.avatar}
              alt={tailor.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-white/60 shadow-2xl shrink-0"
            />
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black">{tailor.name}</h1>
                {tailor.verified && (
                  <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Atelier
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-purple-200 font-semibold">{tailor.shopName}</p>
              <p className="text-xs text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-pink-400" />
                {tailor.location}, {tailor.city}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(`/customer/book?tailorId=${tailor.id}`)}
            className="px-6 py-3.5 rounded-2xl card-gradient text-white text-xs sm:text-sm font-extrabold shadow-lg shadow-purple-500/30 hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto border border-white/20"
          >
            <Scissors className="w-4 h-4" />
            <span>Book Tailor Now</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Tailor Quick Info Banner */}
        <div className="glass p-6 rounded-[32px] border border-white/70 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Rating</span>
            <p className="text-xl font-black text-amber-500 flex items-center justify-center gap-1 mt-1">
              <Star className="w-5 h-5 fill-amber-500" />
              {tailor.rating}
            </p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Completed Jobs</span>
            <p className="text-xl font-black text-slate-900 mt-1">{tailor.completedOrdersCount}+</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Avg Turnaround</span>
            <p className="text-xl font-black text-purple-800 mt-1">{tailor.turnaroundDays} Days</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase">Starting Price</span>
            <p className="text-xl font-black text-slate-900 mt-1">${tailor.startingPrice}</p>
          </div>
        </div>

        {/* Bio & Specialties Box */}
        <div className="glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-xl space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About Master Artisan</h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{tailor.bio}</p>

          <div className="pt-2">
            <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Artisan Specialties:</span>
            <div className="flex flex-wrap gap-2">
              {tailor.specialties.map((spec, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold bg-purple-100/80 text-purple-900 px-3 py-1 rounded-full border border-purple-200/60"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-white/60 flex items-center gap-6">
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'portfolio'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Portfolio Creations ({tailor.portfolio.length})
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'pricing'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pricing Sheet ({tailor.pricingList.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-extrabold transition-all border-b-2 ${
              activeTab === 'reviews'
                ? 'border-purple-600 text-purple-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Customer Reviews ({tailorReviews.length})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tailor.portfolio.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPortfolioImg(item.imageUrl)}
                className="glass rounded-[32px] overflow-hidden border border-white/70 shadow-xl hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/20">
                    ${item.startingPrice}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-sm text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="text-[10px] bg-white/60 text-slate-700 px-2 py-0.5 rounded-md font-medium border border-white/80">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="glass rounded-[32px] p-6 border border-white/70 shadow-xl divide-y divide-white/50">
            {tailor.pricingList.map((tier, idx) => (
              <div key={idx} className="py-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-900 uppercase bg-purple-100/80 px-2 py-0.5 rounded-full border border-purple-200/50">
                    {tier.category}
                  </span>
                  <p className="text-sm font-bold text-slate-800 mt-1">{tier.item}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-black text-slate-900">${tier.price}</span>
                  <span className="text-[10px] text-slate-500 block font-medium">Base Stitching Fee</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-4">
            {tailorReviews.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center glass rounded-[32px] border border-white/70">
                No customer reviews yet.
              </p>
            ) : (
              tailorReviews.map((rev) => (
                <div key={rev.id} className="glass p-6 rounded-[32px] border border-white/70 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={rev.customerAvatar}
                        alt={rev.customerName}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{rev.customerName}</h4>
                        <p className="text-[10px] text-purple-800 font-semibold">{rev.garmentType}</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200/80 shadow-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-500" />
                      {rev.rating}.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic">"{rev.comment}"</p>
                  <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* Fullscreen Image Preview Modal */}
      {selectedPortfolioImg && (
        <div
          onClick={() => setSelectedPortfolioImg(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selectedPortfolioImg}
            alt="Portfolio Large Preview"
            className="max-w-3xl max-h-[85vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
