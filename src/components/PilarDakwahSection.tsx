import React, { useState } from 'react';
import { UNITS_DAKWAH } from '../data/mockData';
import { PageView, IndividualUnitDakwah } from '../types';
import { useApp } from '../context/AppContext';
import { 
  GraduationCap, 
  HeartHandshake, 
  Radio, 
  ShoppingBag, 
  BookOpen, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  Users, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Building2,
  PhoneCall
} from 'lucide-react';

interface PilarDakwahSectionProps {
  setCurrentPage: (page: PageView) => void;
  onOpenUnitModal?: (unitId: string) => void;
}

export const PilarDakwahSection: React.FC<PilarDakwahSectionProps> = ({
  setCurrentPage,
}) => {
  const { units } = useApp();
  const [activePillarFilter, setActivePillarFilter] = useState<string>('Semua');

  const filterTabs = [
    { label: 'Semua Unit', count: units.length, value: 'Semua' },
    { label: 'Pilar Pendidikan', count: units.filter(u => u.pillar === 'Pendidikan').length, value: 'Pendidikan' },
    { label: 'Pilar Sosial', count: units.filter(u => u.pillar === 'Sosial').length, value: 'Sosial' },
    { label: 'Pilar Dakwah', count: units.filter(u => u.pillar === 'Dakwah').length, value: 'Dakwah' },
    { label: 'Pilar Bisnis', count: units.filter(u => u.pillar === 'Bisnis').length, value: 'Bisnis' },
  ];

  const filteredUnits = activePillarFilter === 'Semua'
    ? units
    : units.filter((u) => u.pillar === activePillarFilter);

  const getUnitIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-6 h-6 text-blue-600" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-indigo-600" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6 text-rose-600" />;
      case 'Radio': return <Radio className="w-6 h-6 text-sky-600" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-600" />;
      default: return <Sparkles className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleUnitAction = (unit: IndividualUnitDakwah) => {
    if (unit.internalRoute) {
      setCurrentPage(unit.internalRoute);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (unit.externalUrl) {
      window.open(unit.externalUrl, '_blank');
    }
  };

  return (
    <section id="pilar-dakwah" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-semibold text-blue-900 mb-4">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Ekosistem Terintegrasi Yayasan</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0B1B3D] tracking-tight">
            Pilar Dakwah Hidayah Indonesia
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Menghadirkan seluruh unit dakwah yang bergerak bersama di bawah naungan Yayasan Hidayah Indonesia: membina bacaan Al-Qur'an bersanad, menggerakkan aksi sosial kemanusiaan, memperluas syiar multimedia, serta membangun kemandirian ekonomi syariah.
          </p>
        </div>

        {/* 4 Pilar Overview Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {UNITS_DAKWAH.map((p, idx) => (
            <div
              key={p.id}
              onClick={() => setActivePillarFilter(p.category)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                activePillarFilter === p.category
                  ? 'border-blue-600 bg-blue-50/80 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200/90 bg-slate-50/60 hover:bg-white hover:border-blue-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase text-slate-400">Pilar {idx + 1}</span>
                <span className="w-2 h-2 rounded-full bg-blue-600" />
              </div>
              <h4 className="text-sm font-extrabold text-[#0B1B3D]">{p.category}</h4>
              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{p.shortName}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActivePillarFilter(tab.value)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                activePillarFilter === tab.value
                  ? 'bg-[#0B1B3D] text-white shadow-md shadow-blue-950/20'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activePillarFilter === tab.value
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Units Grid: Showing ALL individual units */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredUnits.map((unit) => {
            return (
              <div
                key={unit.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-7">
                  
                  {/* Card Top: Icon, Pillar Tag, & Channel */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${unit.accentBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                      {getUnitIcon(unit.icon)}
                    </div>

                    <div className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${unit.accentBg} ${unit.accentText}`}>
                        Pilar {unit.pillar}
                      </span>
                      {unit.isFlagship && (
                        <span className="block text-[10px] font-semibold text-emerald-600 mt-1">
                          ★ Unit Unggulan
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Unit Title */}
                  <h3 className="text-xl font-bold text-[#0B1B3D] mb-1 group-hover:text-blue-700 transition-colors">
                    {unit.name}
                  </h3>

                  {/* Slogan */}
                  <p className="text-xs font-semibold text-blue-600 mb-4 line-clamp-1">
                    "{unit.tagline}"
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">
                    {unit.description}
                  </p>

                  {/* Programs List */}
                  <div className="space-y-3 mb-6 pt-4 border-t border-slate-100">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Program & Layanan Utama:
                    </p>
                    <div className="space-y-1.5">
                      {unit.programs.map((prog, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{prog}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Audience / Channel info */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-800">Akses / Lokasi:</strong> {unit.channel}
                    </p>
                    <p className="line-clamp-1">
                      <strong className="text-slate-800">Sasaran:</strong> {unit.targetAudience}
                    </p>
                  </div>

                </div>

                {/* Card Bottom CTA Button */}
                <div className="p-7 pt-0">
                  <button
                    onClick={() => handleUnitAction(unit)}
                    className="w-full py-3.5 px-4 rounded-2xl text-xs font-bold bg-[#0B1B3D] text-white hover:bg-blue-900 transition-all shadow-md flex items-center justify-center gap-2 group-hover:translate-x-0.5 active:scale-95"
                  >
                    <span>{unit.actionText}</span>
                    {unit.externalUrl ? (
                      <ExternalLink className="w-3.5 h-3.5 text-blue-300" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-blue-300" />
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-14 p-6 rounded-3xl bg-gradient-to-r from-blue-900 via-[#0B1B3D] to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-base font-bold">Kolaborasi Terpadu di Bawah Yayasan Hidayah Indonesia</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Setiap unit dakwah beroperasi selaras untuk kemaslahatan umat berlandaskan Al-Qur'an dan Sunnah.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setCurrentPage('mqc');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full text-xs font-bold bg-white text-[#0B1B3D] hover:bg-blue-50 transition-colors shrink-0 shadow-md flex items-center gap-2"
          >
            <span>Daftar Madrasah Qur'an (MQC)</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
