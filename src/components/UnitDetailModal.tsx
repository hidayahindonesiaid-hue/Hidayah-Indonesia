import React from 'react';
import { UnitDakwah, PageView } from '../types';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  HeartHandshake, 
  Radio, 
  ShoppingBag,
  Sparkles,
  PhoneCall
} from 'lucide-react';

interface UnitDetailModalProps {
  unit: UnitDakwah | null;
  onClose: () => void;
  setCurrentPage: (page: PageView) => void;
}

export const UnitDetailModal: React.FC<UnitDetailModalProps> = ({
  unit,
  onClose,
  setCurrentPage
}) => {
  if (!unit) return null;

  const handleOpenPage = () => {
    if (unit.internalRoute) {
      setCurrentPage(unit.internalRoute);
      onClose();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getUnitIcon = (cat: string) => {
    switch (cat) {
      case 'Pendidikan': return <GraduationCap className="w-8 h-8 text-blue-600" />;
      case 'Sosial': return <HeartHandshake className="w-8 h-8 text-rose-600" />;
      case 'Dakwah': return <Radio className="w-8 h-8 text-sky-600" />;
      case 'Bisnis': return <ShoppingBag className="w-8 h-8 text-emerald-600" />;
      default: return <Sparkles className="w-8 h-8 text-blue-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            {getUnitIcon(unit.category)}
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Unit {unit.category} Yayasan
            </span>
            <h3 className="text-2xl font-extrabold text-[#0B1B3D] mt-1">{unit.name}</h3>
            <p className="text-xs font-semibold text-slate-500">{unit.shortName}</p>
          </div>
        </div>

        {/* Tagline */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Misi Unit</p>
          <p className="text-sm font-semibold text-[#0B1B3D] italic">
            "{unit.tagline}"
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          {unit.description}
        </p>

        {/* Sub Units / Programs */}
        {unit.subUnits && unit.subUnits.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Divisi & Layanan:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {unit.subUnits.map((sub, i) => (
                <div key={i} className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs font-bold text-[#0B1B3D] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span>{sub}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keunggulan Fitur */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
            Fokus & Manfaat:
          </h4>
          <div className="space-y-2">
            {unit.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-4 border-t border-slate-100">
          {unit.id === 'pendidikan' && (
            <button
              onClick={handleOpenPage}
              className="w-full py-3.5 px-4 rounded-full text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Buka Halaman Lengkap Madrasah Qur'an Center (MQC)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {unit.id === 'sosial' && (
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Kunjungi Website Resmi: mariberbagi.net</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          {unit.id === 'bisnis' && (
            <a
              href={`https://wa.me/6281288997721?text=${encodeURIComponent('Halo HI Mart Hidayah Indonesia, saya ingin menanyakan katalog buku tajwid, mushaf Al-Qur\'an, dan merchandise resmi yayasan.')}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3.5 px-4 rounded-full text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Hubungi CS HI Mart via WhatsApp</span>
              <PhoneCall className="w-4 h-4" />
            </a>
          )}

          {unit.id === 'dakwah' && (
            <button
              onClick={handleOpenPage}
              className="w-full py-3.5 px-4 rounded-full text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <span>Lihat Jadwal Majlis Qolbun Muneeb & Kajian</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100"
          >
            Tutup
          </button>
        </div>

      </div>
    </div>
  );
};
