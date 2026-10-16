import React from 'react';
import { FOUNDATION_LEGAL, PENGURUS_DATA } from '../data/mockData';
import { 
  X, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Copy, 
  Check, 
  Award,
  Building
} from 'lucide-react';

interface LegalAndStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalAndStructureModal: React.FC<LegalAndStructureModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl border border-slate-100">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Legalitas Resmi & Transparansi
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1B3D] mt-1">
              Yayasan Hidayah Indonesia
            </h3>
          </div>
        </div>

        {/* Legal Numbers List */}
        <div className="space-y-3 mb-8">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Dokumen & Surat Keputusan Pemerintah:</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* SK Kemenkumham */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">SK Kemenkumham RI</span>
                <p className="text-xs font-mono font-bold text-[#0B1B3D]">{FOUNDATION_LEGAL.skKemenkumham}</p>
              </div>
              <button
                onClick={() => handleCopy(FOUNDATION_LEGAL.skKemenkumham, 'sk')}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs"
              >
                {copiedKey === 'sk' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Akta Notaris */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Akta Pendirian Notaris</span>
                <p className="text-xs font-mono font-bold text-[#0B1B3D]">{FOUNDATION_LEGAL.aktaNotaris}</p>
              </div>
              <button
                onClick={() => handleCopy(FOUNDATION_LEGAL.aktaNotaris, 'akta')}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs"
              >
                {copiedKey === 'akta' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* NPWP */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">NPWP Yayasan</span>
                <p className="text-xs font-mono font-bold text-[#0B1B3D]">{FOUNDATION_LEGAL.npwp}</p>
              </div>
              <button
                onClick={() => handleCopy(FOUNDATION_LEGAL.npwp, 'npwp')}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs"
              >
                {copiedKey === 'npwp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* NIB */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">NIB (Nomor Induk Berusaha)</span>
                <p className="text-xs font-mono font-bold text-[#0B1B3D]">{FOUNDATION_LEGAL.nib}</p>
              </div>
              <button
                onClick={() => handleCopy(FOUNDATION_LEGAL.nib, 'nib')}
                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs"
              >
                {copiedKey === 'nib' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

          </div>

          <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-blue-950 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-700 shrink-0" />
            <span>Tanda Daftar Dinas Sosial / Kesbangpol: <strong>{FOUNDATION_LEGAL.tandaDaftarDinsos}</strong></span>
          </div>
        </div>

        {/* Struktur Dewan & Pengurus Yayasan */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Susunan Lengkap Kepengurusan Yayasan:</span>
          </h4>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {PENGURUS_DATA.map((p, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-left text-xs"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700">{p.role}</span>
                  <p className="font-bold text-[#0B1B3D]">{p.name}</p>
                  <p className="text-[11px] text-slate-500">{p.title}</p>
                </div>
                <span className="text-[10px] font-semibold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                  {p.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Address and Contacts */}
        <div className="p-4 rounded-2xl bg-slate-100/70 border border-slate-200 text-xs text-slate-700 space-y-1.5 mb-6">
          <p className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{FOUNDATION_LEGAL.alamatSekretariat}</span>
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-600" />
              <span>{FOUNDATION_LEGAL.kontakTelepon}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>{FOUNDATION_LEGAL.email}</span>
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-[#0B1B3D] text-white hover:bg-blue-900 transition-colors"
        >
          Tutup Informasi Legalitas
        </button>

      </div>
    </div>
  );
};
