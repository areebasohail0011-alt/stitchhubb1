import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Ruler, Plus, Trash2, CheckCircle2, Edit3, Save, Sparkles, HelpCircle, Bot } from 'lucide-react';
import { MeasurementProfile } from '../../types';

export const UploadMeasurementsPage: React.FC = () => {
  const { measurements, saveMeasurementProfile, deleteMeasurementProfile } = useData();

  const [editingProfile, setEditingProfile] = useState<Partial<MeasurementProfile> | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [unit, setUnit] = useState<'cm' | 'inches'>('inches');
  const [title, setTitle] = useState('My Formal Fit Profile');
  const [neck, setNeck] = useState<number>(14.5);
  const [chest, setChest] = useState<number>(36);
  const [waist, setWaist] = useState<number>(28);
  const [hips, setHips] = useState<number>(38);
  const [shoulderWidth, setShoulderWidth] = useState<number>(15.5);
  const [sleeveLength, setSleeveLength] = useState<number>(23);
  const [inseam, setInseam] = useState<number>(30);
  const [notes, setNotes] = useState('Prefers slim tapered waist contour.');

  const handleOpenEdit = (prof: MeasurementProfile) => {
    setEditingProfile(prof);
    setTitle(prof.title);
    setUnit(prof.unit);
    setNeck(prof.neck || 14);
    setChest(prof.chest || 36);
    setWaist(prof.waist || 28);
    setHips(prof.hips || 38);
    setShoulderWidth(prof.shoulderWidth || 15);
    setSleeveLength(prof.sleeveLength || 23);
    setInseam(prof.inseam || 30);
    setNotes(prof.notes || '');
    setShowAddModal(true);
  };

  const handleOpenNew = () => {
    setEditingProfile(null);
    setTitle('New Custom Fit Profile');
    setUnit('inches');
    setNeck(14.5);
    setChest(36);
    setWaist(28);
    setHips(38);
    setShoulderWidth(15.5);
    setSleeveLength(23);
    setInseam(30);
    setNotes('');
    setShowAddModal(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMeasurementProfile({
      id: editingProfile?.id,
      title,
      unit,
      neck,
      chest,
      waist,
      hips,
      shoulderWidth,
      sleeveLength,
      inseam,
      notes
    });
    setShowAddModal(false);
  };

  return (
    <div className="min-h-screen pb-20">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="card-gradient text-white rounded-[32px] p-8 shadow-xl shadow-purple-500/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full border border-white/30">
                Body Measurement Vault
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2">Manage Your Body Measurements</h1>
              <p className="text-xs text-purple-100">Save custom fit profiles to re-use when booking tailors</p>
            </div>

            <button
              onClick={handleOpenNew}
              className="px-5 py-2.5 rounded-2xl bg-white text-purple-950 hover:bg-white/90 text-xs font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center gap-2 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 text-purple-700" />
              <span>Add New Fit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        
        {/* Saved Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {measurements.map((m) => (
            <div
              key={m.id}
              className="glass rounded-[32px] p-6 border border-white/70 shadow-xl space-y-4 hover:shadow-2xl transition-all"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/50">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl card-gradient text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                    <span className="text-[10px] text-purple-700 font-bold uppercase">
                      Unit: {m.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-2 rounded-xl text-purple-900 hover:bg-white/80 transition-colors"
                    title="Edit Profile"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteMeasurementProfile(m.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50/80 transition-colors"
                    title="Delete Profile"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-white/60 p-4 rounded-2xl border border-white/80">
                <div>
                  <span className="text-slate-500 font-medium block">Neck:</span>
                  <span className="font-bold text-slate-900">{m.neck || '-'} {m.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Chest / Bust:</span>
                  <span className="font-bold text-slate-900">{m.chest || '-'} {m.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Waist:</span>
                  <span className="font-bold text-slate-900">{m.waist || '-'} {m.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Hips:</span>
                  <span className="font-bold text-slate-900">{m.hips || '-'} {m.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Shoulder:</span>
                  <span className="font-bold text-slate-900">{m.shoulderWidth || '-'} {m.unit}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Inseam:</span>
                  <span className="font-bold text-slate-900">{m.inseam || '-'} {m.unit}</span>
                </div>
              </div>

              {m.notes && (
                <p className="text-xs text-slate-600 italic">"{m.notes}"</p>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Add / Edit Profile Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass rounded-[32px] border border-white/80 shadow-2xl p-6 sm:p-8 max-w-lg w-full space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/50">
              <h2 className="text-base font-extrabold text-slate-900">
                {editingProfile ? 'Edit Measurement Profile' : 'Add New Fit Profile'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Profile Name</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400"
                  placeholder="e.g. Formal Suit Fit"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Measurement Unit</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setUnit('inches')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${unit === 'inches' ? 'card-gradient text-white border-transparent' : 'bg-white/60 text-slate-700 border-white/80'}`}
                  >
                    Inches (in)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('cm')}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${unit === 'cm' ? 'card-gradient text-white border-transparent' : 'bg-white/60 text-slate-700 border-white/80'}`}
                  >
                    Centimeters (cm)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Neck ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={neck}
                    onChange={(e) => setNeck(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Chest / Bust ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={chest}
                    onChange={(e) => setChest(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Waist ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hips ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={hips}
                    onChange={(e) => setHips(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Shoulder Width ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={shoulderWidth}
                    onChange={(e) => setShoulderWidth(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Inseam ({unit})</label>
                  <input
                    type="number"
                    step="0.1"
                    value={inseam}
                    onChange={(e) => setInseam(Number(e.target.value))}
                    className="w-full glass-input rounded-xl p-2 text-xs font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Fitting Notes / Preferences</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full glass-input rounded-xl p-2 text-xs text-slate-800"
                  placeholder="e.g. Likes extra room around hips, tapered trousers..."
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/60 text-slate-700 text-xs font-bold hover:bg-white/90"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl card-gradient text-white text-xs font-bold hover:scale-105 transition-transform shadow-md"
                >
                  Save Profile
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
