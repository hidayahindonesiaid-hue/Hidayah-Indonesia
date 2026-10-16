import React from 'react';
import { UNITS_DAKWAH } from '../data/mockData';
import { PageView, UnitDakwah } from '../types';
import { 
  GraduationCap, 
  HeartHandshake, 
  Radio, 
  ShoppingBag, 
  ArrowUpRight, 
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface FourUnitsSectionProps {
  setCurrentPage: (page: PageView) => void;
  onSelectUnit: (unit: UnitDakwah) => void;
}

export const FourUnitsSection: React.FC<FourUnitsSectionProps> = ({
  setCurrentPage,
  onSelectUnit
}) => {
  const getIcon = (iconName: string, isDark: boolean) => {
    const className = `w-5 h-5 ${isDark ? 'text-white' : 'text-[#0B1B3D]'}`;
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'HeartHandshake':
        return <HeartHandshake className={className} />;
      case 'Radio':
        return <Radio className={className} />;
      case 'ShoppingBag':
        return <ShoppingBag className={className} />;
      default:
        return <GraduationCap className={className} />;
    }
  };

  const handleAction = (unit: UnitDakwah) => {
    if (unit.id === 'pendidikan') {
      setCurrentPage('mqc');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (unit.id === 'sosial') {
      setCurrentPage('donation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (unit.id === 'dakwah') {
      setCurrentPage('events');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onSelectUnit(unit);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-900 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Pilar Ekosistem Yayasan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            4 Unit Dakwah Hidayah Indonesia
          </h2>
          <p className="text-slate-600 mt-2 text-base leading-relaxed">
            Menghubungkan pendidikan Al-Qur'an bersanad, kepedulian sosial kemanusiaan, syiar multimedia, dan unit usaha kemandirian umat.
          </p>
        </div>

        {/* 4 Cards Grid - Matches user's uploaded reference image (3 light cards + 1 signature dark navy card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {UNITS_DAKWAH.map((unit) => {
            const isDark = unit.highlighted;

            return (
              <div
                key={unit.id}
                className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 transition-all duration-300 ${
                  isDark
                    ? 'bg-[#0B1B3D] text-white shadow-xl shadow-blue-950/20 ring-1 ring-blue-900'
                    : 'bg-white text-slate-800 border border-slate-200/90 hover:border-blue-300 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Card Top: Icon and Indicator Dot */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        isDark ? 'bg-white/10 backdrop-blur-md' : 'bg-blue-50'
                      }`}
                    >
                      {getIcon(unit.icon, !!isDark)}
                    </div>

                    {/* Blue dot indicator matching reference UI */}
                    <div
                      className={`w-3 h-3 rounded-full ${
                        isDark ? 'bg-blue-400' : 'bg-blue-600'
                      }`}
                    />
                  </div>

                  {/* Category Pill Tag */}
                  <span
                    className={`inline-block text-[11px] font-bold tracking-wider uppercase mb-2 ${
                      isDark ? 'text-blue-300' : 'text-blue-700'
                    }`}
                  >
                    Unit {unit.category}
                  </span>

                  {/* Title & Short Name */}
                  <h3
                    className={`text-xl font-bold tracking-tight mb-1.5 ${
                      isDark ? 'text-white' : 'text-[#0B1B3D]'
                    }`}
                  >
                    {unit.name}
                  </h3>
                  
                  <p
                    className={`text-xs font-semibold mb-3 ${
                      isDark ? 'text-blue-200' : 'text-slate-500'
                    }`}
                  >
                    {unit.shortName}
                  </p>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed mb-5 ${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {unit.description}
                  </p>

                  {/* Sub Units / Features List */}
                  <div className="space-y-1.5 mb-6">
                    {unit.subUnits?.map((sub, idx) => (
                      <div
                        key={idx}
                        className={`text-[11px] font-medium flex items-center gap-1.5 ${
                          isDark ? 'text-slate-200' : 'text-slate-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isDark ? 'bg-blue-400' : 'bg-blue-600'
                          }`}
                        />
                        <span>{sub}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Bottom: Action Button matching reference pill UI */}
                <div className="pt-4 border-t border-slate-100/20">
                  <button
                    onClick={() => handleAction(unit)}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isDark
                        ? 'bg-white text-[#0B1B3D] hover:bg-slate-100 active:scale-95'
                        : 'bg-[#0B1B3D] text-white hover:bg-blue-900 active:scale-95'
                    }`}
                  >
                    <span>
                      {unit.id === 'pendidikan'
                        ? 'Buka Laman MQC'
                        : unit.id === 'sosial'
                        ? 'Donasi Mari Berbagi'
                        : unit.id === 'dakwah'
                        ? 'Lihat Kajian & Media'
                        : 'Katalog HI Mart'}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Informative Note for User */}
        <div className="mt-8 p-4 rounded-2xl bg-blue-50/60 border border-blue-100/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-700">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>
              Setiap unit dakwah memiliki program khusus: <strong>Madrasah Qur'an Center (MQC)</strong> untuk bimbingan Al-Qur'an terpadu, <strong>Mari Berbagi (mariberbagi.net)</strong> untuk kepedulian sosial, dan <strong>HI Mart</strong> untuk kemandirian ekonomi.
            </span>
          </div>
          <button
            onClick={() => setCurrentPage('mqc')}
            className="text-blue-700 hover:text-blue-900 font-bold shrink-0 inline-flex items-center gap-1"
          >
            <span>Kunjungi MQC</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
