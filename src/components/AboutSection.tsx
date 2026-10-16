import React, { useState } from 'react';
import { PENGURUS_DATA } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Target, 
  Compass, 
  Users, 
  FileText, 
  Check, 
  Copy, 
  ExternalLink,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AboutSectionProps {
  onOpenLegalModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenLegalModal }) => {
  const { foundationLegal, visiMisi } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showAllPengurus, setShowAllPengurus] = useState(false);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const displayedPengurus = showAllPengurus ? PENGURUS_DATA : PENGURUS_DATA.slice(0, 4);

  return (
    <section id="tentang" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-semibold text-blue-900 mb-4">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Profil Resmi Yayasan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Mengenal Lebih Dekat Hidayah Indonesia
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Didirikan dengan komitmen kuat menjaga kemurnian bacaan Al-Qur'an bersanad, menguatkan solidaritas kemanusiaan, serta membangun peradaban generasi yang tangguh dan bertakwa.
          </p>
        </div>

        {/* Bento Grid Layout - Inspired by modern bento UI in reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
          
          {/* Bento Card 1: Visi & Misi (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Arah & Tujuan</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">Visi & Misi Yayasan</h3>
                </div>
              </div>

              {/* Visi */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/40 border border-blue-100 mb-6">
                <p className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  Visi Utama
                </p>
                <p className="text-sm font-medium text-slate-800 leading-relaxed italic">
                  "{visiMisi.visi}"
                </p>
              </div>

              {/* Misi List */}
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Misi Strategis:</p>
                <ul className="space-y-2.5">
                  {visiMisi.misi.map((m, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Core Values Tag pills */}
            <div className="pt-6 mt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {visiMisi.nilai.map((n, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                  <p className="text-xs font-bold text-[#0B1B3D]">{n.label}</p>
                  <p className="text-[10px] text-slate-500 line-clamp-1">{n.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bento Card 2: Legalitas Resmi Yayasan (Span 5) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1B3D] to-[#152B5B] text-white rounded-3xl p-8 shadow-xl shadow-blue-950/20 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Amanah & Sah Hukum</span>
                    <h3 className="text-xl font-bold text-white">Nomor Legalitas</h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold">
                  Terverifikasi
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Yayasan Hidayah Indonesia didirikan secara sah dengan keputusan Menteri Hukum dan HAM RI serta izin operasional sosial:
              </p>

              {/* Legal items with quick copy */}
              <div className="space-y-3">
                
                {/* SK Kemenkumham */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-300 uppercase block">SK Kemenkumham RI</span>
                    <span className="text-xs font-mono font-bold text-white">{foundationLegal.skKemenkumham}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(foundationLegal.skKemenkumham, 'kemenkumham')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    title="Salin No. SK"
                  >
                    {copiedKey === 'kemenkumham' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Akta Notaris */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-300 uppercase block">Akta Notaris</span>
                    <span className="text-xs font-mono font-bold text-white">{foundationLegal.aktaNotaris}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(foundationLegal.aktaNotaris, 'akta')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    title="Salin Akta"
                  >
                    {copiedKey === 'akta' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* NPWP Yayasan */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-300 uppercase block">NPWP Yayasan</span>
                    <span className="text-xs font-mono font-bold text-white">{foundationLegal.npwp}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(foundationLegal.npwp, 'npwp')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    title="Salin NPWP"
                  >
                    {copiedKey === 'npwp' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* NIB */}
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-300 uppercase block">NIB (Nomor Induk Berusaha)</span>
                    <span className="text-xs font-mono font-bold text-white">{foundationLegal.nib}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(foundationLegal.nib, 'nib')}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-colors"
                    title="Salin NIB"
                  >
                    {copiedKey === 'nib' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

              </div>
            </div>

            {/* Bottom Modal Trigger */}
            <div className="pt-6 mt-6 border-t border-white/15">
              <button
                onClick={onOpenLegalModal}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-white text-[#0B1B3D] hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>Lihat Dokumen Legal & Detail Pengurus</span>
              </button>
            </div>
          </div>

        </div>

        {/* Structure / Kepengurusan Section */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Amanah & Struktur</span>
                <h3 className="text-xl font-bold text-[#0B1B3D]">Susunan Dewan & Kepengurusan</h3>
              </div>
            </div>

            <button
              onClick={() => setShowAllPengurus(!showAllPengurus)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1.5 py-1.5 px-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span>{showAllPengurus ? 'Tampilkan Lebih Ringkas' : 'Lihat Seluruh Pengurus (10 Anggota)'}</span>
              {showAllPengurus ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Pengurus Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedPengurus.map((p, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/30 transition-all text-left"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded-md mb-2">
                  {p.role}
                </span>
                <h4 className="text-sm font-bold text-[#0B1B3D] leading-snug">{p.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-normal">{p.title}</p>
              </div>
            ))}
          </div>

          {/* Secretariat Address Note */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              <strong className="text-slate-800">Alamat Sekretariat:</strong> {foundationLegal.alamatSekretariat}
            </div>
            <div className="shrink-0 flex items-center gap-4 text-blue-700 font-semibold">
              <span>Telp: {foundationLegal.kontakTelepon}</span>
              <span>•</span>
              <span>Email: {foundationLegal.email}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
