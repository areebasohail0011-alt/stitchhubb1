import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Scissors,
  Ruler,
  Image as ImageIcon,
  Truck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  DollarSign,
  Upload,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const BookTailorPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { tailors, measurements, createOrder } = useData();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedTailorId = searchParams.get('tailorId') || tailors[0].id;
  const tailor = tailors.find((t) => t.id === selectedTailorId || t.userId === selectedTailorId) || tailors[0];

  const [step, setStep] = useState<number>(1);

  // Form State
  const [garmentCategory, setGarmentCategory] = useState("Men's 3-Piece Tuxedo Suit");
  const [garmentDescription, setGarmentDescription] = useState("Peak lapels, double-vent back jacket with slim fit trousers.");
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<string>(measurements[0]?.id || '');
  const [fabricOption, setFabricOption] = useState<'customer_fabric' | 'tailor_fabric'>('customer_fabric');
  const [fabricDescription, setFabricDescription] = useState("3.5 Yards Navy Super 150s Wool Blend Fabric");
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address || '742 Evergreen Terrace, Suite 4B, New York, NY');
  const [referenceImages, setReferenceImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80'
  ]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const stitchingPrice = tailor.pricingList[0]?.price || tailor.startingPrice;
  const courierFee = 15;
  const taxFee = Math.round(stitchingPrice * 0.08);
  const totalPrice = stitchingPrice + courierFee + taxFee;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setReferenceImages([result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompleteBooking = () => {
    const chosenMeasurement = measurements.find((m) => m.id === selectedMeasurementId) || measurements[0];

    const newOrder = createOrder({
      customerId: currentUser.id,
      customerName: currentUser.name,
      customerEmail: currentUser.email,
      customerPhone: currentUser.phone || '+1 (555) 234-5678',
      deliveryAddress,
      tailorId: tailor.id,
      tailorName: tailor.name,
      tailorShop: tailor.shopName,
      tailorPhone: '+1 (555) 876-5432',
      garmentCategory,
      garmentDescription,
      fabricOption,
      fabricDescription,
      referenceImages,
      measurements: chosenMeasurement,
      stitchingPrice,
      paid: true
    });

    setStep(4); // Confirmation step
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Top Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30">
              Step {step} of 4
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2">Book Stitching with {tailor.name}</h1>
            <p className="text-xs text-purple-100">{tailor.shopName} • {tailor.location}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Step Progress Pills */}
        <div className="grid grid-cols-4 gap-2 text-center text-xs font-bold">
          <div className={`p-3 rounded-2xl border transition-all ${step >= 1 ? 'card-gradient text-white border-transparent shadow-md' : 'glass text-slate-500 border-white/70'}`}>
            1. Garment
          </div>
          <div className={`p-3 rounded-2xl border transition-all ${step >= 2 ? 'card-gradient text-white border-transparent shadow-md' : 'glass text-slate-500 border-white/70'}`}>
            2. Fit & Fabric
          </div>
          <div className={`p-3 rounded-2xl border transition-all ${step >= 3 ? 'card-gradient text-white border-transparent shadow-md' : 'glass text-slate-500 border-white/70'}`}>
            3. Summary
          </div>
          <div className={`p-3 rounded-2xl border transition-all ${step === 4 ? 'bg-emerald-600 text-white border-transparent shadow-md' : 'glass text-slate-500 border-white/70'}`}>
            4. Confirmed
          </div>
        </div>

        {/* STEP 1: Garment Details */}
        {step === 1 && (
          <div className="glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Choose Garment & Design Requirements</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Garment Type / Style</label>
                <select
                  value={garmentCategory}
                  onChange={(e) => setGarmentCategory(e.target.value)}
                  className="w-full bg-white/60 border border-purple-200/50 rounded-2xl px-4 py-3 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-purple-400"
                >
                  <option value="Men's 3-Piece Tuxedo Suit">Men's 3-Piece Tuxedo Suit ($260)</option>
                  <option value="Bespoke Italian Blazer & Trousers">Bespoke Italian Blazer & Trousers ($220)</option>
                  <option value="Lavender Silk Evening Gown">Lavender Silk Evening Gown ($290)</option>
                  <option value="Royal Velvet Sherwani">Royal Velvet Sherwani ($280)</option>
                  <option value="Custom Fitted Dress Shirt">Custom Fitted Dress Shirt ($65)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Design & Styling Notes</label>
                <textarea
                  value={garmentDescription}
                  onChange={(e) => setGarmentDescription(e.target.value)}
                  rows={3}
                  className="w-full glass-input rounded-2xl p-4 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400 placeholder:text-slate-400"
                  placeholder="Mention lapel width, pockets, lining preferences, vents, or split details..."
                />
              </div>

              {/* Reference Image Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Upload Reference Design Sketch or Photo</label>
                <div className="border-2 border-dashed border-purple-300/60 rounded-2xl p-6 text-center hover:bg-white/50 transition-colors bg-white/30">
                  <Upload className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Click to upload photo or sketch</p>
                  <p className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, or WEBP formats</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="ref-img-upload"
                  />
                  <label
                    htmlFor="ref-img-upload"
                    className="mt-3 inline-block px-4 py-2 rounded-xl card-gradient text-white text-xs font-bold cursor-pointer hover:scale-105 transition-transform shadow-xs"
                  >
                    Select File
                  </label>
                </div>

                {(imagePreview || referenceImages[0]) && (
                  <div className="mt-3 flex items-center gap-3 p-3 bg-purple-100/60 rounded-2xl border border-purple-200/50">
                    <img
                      src={imagePreview || referenceImages[0]}
                      alt="Reference"
                      className="w-14 h-14 rounded-xl object-cover ring-2 ring-white shadow-xs"
                    />
                    <p className="text-xs font-bold text-purple-900">Reference Photo Attached!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-2xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md flex items-center gap-2"
              >
                <span>Continue to Fit & Fabric</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Measurement & Fabric */}
        {step === 2 && (
          <div className="glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Measurements Profile & Fabric Handling</h2>

            <div className="space-y-6">
              
              {/* Select Saved Measurement */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Select Saved Body Measurement Profile</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {measurements.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMeasurementId(m.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        selectedMeasurementId === m.id
                          ? 'bg-purple-100/70 border-purple-400 shadow-xs ring-2 ring-purple-300/50'
                          : 'bg-white/50 border-white/80 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-slate-900">{m.title}</span>
                        {selectedMeasurementId === m.id && (
                          <CheckCircle2 className="w-4 h-4 text-purple-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500">
                        Chest: {m.chest}" • Waist: {m.waist}" • Hips: {m.hips}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fabric Option */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">Fabric Provisioning Option</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div
                    onClick={() => setFabricOption('customer_fabric')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      fabricOption === 'customer_fabric'
                        ? 'bg-purple-100/70 border-purple-400 shadow-xs ring-2 ring-purple-300/50'
                        : 'bg-white/50 border-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Truck className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-bold text-slate-900">Provide Own Fabric (Doorstep Courier Pickup)</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Our courier partner collects your fabric package from your home address.
                    </p>
                  </div>

                  <div
                    onClick={() => setFabricOption('tailor_fabric')}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      fabricOption === 'tailor_fabric'
                        ? 'bg-purple-100/70 border-purple-400 shadow-xs ring-2 ring-purple-300/50'
                        : 'bg-white/50 border-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Scissors className="w-4 h-4 text-pink-600" />
                      <span className="text-xs font-bold text-slate-900">Select Tailor's Studio Fabric</span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Tailor provides premium imported fabric directly from their atelier inventory.
                    </p>
                  </div>

                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Doorstep Pickup & Delivery Address</label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  className="w-full glass-input rounded-2xl p-3.5 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400"
                />
              </div>

            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-2xl bg-white/60 text-slate-700 text-xs font-bold hover:bg-white/90 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-2xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md flex items-center gap-2"
              >
                <span>Review Order & Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Order Review & Payment */}
        {step === 3 && (
          <div className="glass p-6 sm:p-8 rounded-[32px] border border-white/70 shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Order Summary & Payment Breakdown</h2>

            <div className="p-4 bg-purple-100/50 rounded-2xl border border-purple-200/60 space-y-3 text-xs">
              <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-purple-200/50">
                <span>Selected Artisan</span>
                <span>{tailor.name} ({tailor.shopName})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Garment Category:</span>
                <span className="font-bold text-slate-800">{garmentCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Fabric Provisioning:</span>
                <span className="font-bold text-purple-800">{fabricOption === 'customer_fabric' ? 'Doorstep Pickup (Provided Fabric)' : "Tailor Studio Fabric"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pickup & Delivery Address:</span>
                <span className="font-bold text-slate-800 truncate max-w-xs">{deliveryAddress}</span>
              </div>
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-2 text-xs pt-2">
              <div className="flex justify-between text-slate-600">
                <span>Tailor Bespoke Stitching Fee</span>
                <span className="font-bold text-slate-800">${stitchingPrice}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Doorstep Courier Pickup & Delivery</span>
                <span className="font-bold text-slate-800">${courierFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Service Tax & Platform Insurance</span>
                <span className="font-bold text-slate-800">${taxFee}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-slate-900 pt-3 border-t border-white/60">
                <span>Total Payment Amount</span>
                <span className="text-purple-800">${totalPrice}</span>
              </div>
            </div>

            <div className="p-3 bg-emerald-100/60 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Fit Guarantee included. Free minor fitting alterations within 7 days of delivery.</span>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-2xl bg-white/60 text-slate-700 text-xs font-bold hover:bg-white/90 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleCompleteBooking}
                className="px-8 py-3.5 rounded-2xl card-gradient text-white text-xs font-extrabold shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
              >
                Confirm & Pay ${totalPrice}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Order Confirmed */}
        {step === 4 && (
          <div className="glass p-8 rounded-[32px] border border-white/70 shadow-xl text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Your order has been transmitted to <strong>{tailor.name}</strong>. Courier partner Leo Swift is assigned for doorstep fabric pickup.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/customer/orders')}
                className="px-6 py-3 rounded-2xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md"
              >
                Go to My Orders
              </button>

              <button
                onClick={() => navigate('/customer')}
                className="px-6 py-3 rounded-2xl bg-white/60 text-slate-700 text-xs font-bold hover:bg-white/90 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
