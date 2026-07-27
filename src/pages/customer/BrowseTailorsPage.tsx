import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import {
  Search,
  Scissors,
  Star,
  ShieldCheck,
  Clock,
  Filter,
  MapPin,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const BrowseTailorsPage: React.FC = () => {
  const { tailors } = useData();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('cat') || 'All');
  const [minRating, setMinRating] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);

  const categories = ['All', 'Suits', 'Dresses', 'Traditional', 'Outerwear', 'Alterations'];

  const filteredTailors = tailors.filter((tailor) => {
    const matchesQuery =
      tailor.name.toLowerCase().includes(query.toLowerCase()) ||
      tailor.shopName.toLowerCase().includes(query.toLowerCase()) ||
      tailor.location.toLowerCase().includes(query.toLowerCase()) ||
      tailor.specialties.some((s) => s.toLowerCase().includes(query.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      tailor.portfolio.some((p) => p.category.toLowerCase().includes(selectedCategory.toLowerCase())) ||
      tailor.specialties.some((s) => s.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesRating = tailor.rating >= minRating;
    const matchesPrice = tailor.startingPrice <= maxPrice;

    return matchesQuery && matchesCategory && matchesRating && matchesPrice;
  });

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 sm:p-10 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 space-y-3 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" />
              <span>Certified Master Tailors</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              Browse Expert Artisans & Bespoke Tailors
            </h1>
            <p className="text-xs sm:text-sm text-purple-100 max-w-2xl">
              Select an expert tailor for your suit, evening dress, or traditional attire. Compare ratings, turnaround times, and portfolio creations.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Filter Controls Bar */}
        <div className="glass p-4 sm:p-6 rounded-[32px] border border-white/70 shadow-xl space-y-4">
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            
            {/* Search Input */}
            <div className="flex-1 flex items-center gap-2 glass-input px-3.5 py-2.5 rounded-2xl border border-white/80 w-full">
              <Search className="w-4 h-4 text-purple-600 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tailor by name, specialty, suit, or city..."
                className="w-full text-xs text-slate-800 focus:outline-none placeholder:text-slate-400 bg-transparent"
              />
            </div>

            {/* Rating Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-700 shrink-0">Min Rating:</span>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="bg-white/60 border border-purple-200/50 rounded-xl px-3 py-2 text-xs font-semibold text-purple-950 focus:outline-none"
              >
                <option value={0}>Any Rating</option>
                <option value={4.5}>4.5★ & above</option>
                <option value={4.8}>4.8★ & above</option>
              </select>
            </div>

            {/* Max Price Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-slate-700 shrink-0">Max Price: ${maxPrice}</span>
              <input
                type="range"
                min={100}
                max={600}
                step={25}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="accent-purple-600 cursor-pointer"
              />
            </div>

          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-white/50 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'card-gradient text-white border-transparent shadow-xs'
                    : 'bg-white/60 text-purple-950 border-purple-100/60 hover:bg-white/90'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Tailors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTailors.length === 0 ? (
            <div className="col-span-full py-16 text-center glass rounded-[32px] border border-white/70 p-8 space-y-3 shadow-xl">
              <Scissors className="w-12 h-12 text-purple-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No Tailors Match Your Filter Criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try clearing your search query or adjusting max price range to see more certified tailors.
              </p>
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedCategory('All');
                  setMinRating(0);
                  setMaxPrice(500);
                }}
                className="px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold shadow-xs hover:scale-105 transition-transform"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTailors.map((tailor) => (
              <div
                key={tailor.id}
                className="glass rounded-[32px] overflow-hidden border border-white/70 shadow-xl hover:shadow-2xl transition-all duration-200 flex flex-col justify-between group"
              >
                {/* Cover Header */}
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
                      <span className="font-bold text-amber-600 flex items-center gap-1 bg-amber-50/80 px-2.5 py-0.5 rounded-full border border-amber-200">
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
            ))
          )}
        </div>

      </div>
    </div>
  );
};
