import React from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import { FOUNDATION_LEGAL } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  HeartHandshake, 
  BookOpen, 
  ArrowUpRight,
  ExternalLink,
  Lock
} from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageView) => void;
  onOpenLegalModal: () => void;
  onOpenAdminPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentPage,
  onOpenLegalModal,
  onOpenAdminPanel
}) => {
  const { brandIdentity } = useApp();

  const handleNav = (page: PageView) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1B3D] text-white pt-16 pb-12 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Profile (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              {brandIdentity.logoType === 'image' && brandIdentity.logoImageUrl ? (
                <div className="w-10 h-10 rounded-2xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20 shrink-0">
                  <img
                    src={brandIdentity.logoImageUrl}
                    alt={`${brandIdentity.namePrefix} ${brandIdentity.nameHighlight}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white shadow-md font-serif font-extrabold text-xl shrink-0">
                  {brandIdentity.logoLetter || 'H'}
                </div>
              )}
              <div>
                <span className="text-xl font-bold tracking-tight text-white">{brandIdentity.namePrefix || 'Hidayah'}</span>
                <span className="text-xl font-bold tracking-tight text-blue-400 ml-1">{brandIdentity.nameHighlight || 'Indonesia'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Yayasan Hidayah Indonesia adalah lembaga nirlaba dakwah, pendidikan Al-Qur'an bersanad, kepedulian sosial kemanusiaan, dan kemandirian umat yang berkomitmen mewujudkan peradaban Qur'ani yang mulia dan berdaya.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
              <p className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SK Kemenkumham RI:</span>
              </p>
              <p className="font-mono text-emerald-300">{FOUNDATION_LEGAL.skKemenkumham}</p>
            </div>
          </div>

          {/* Col 2: Pilar Dakwah Links (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Pilar Dakwah
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => handleNav('mqc')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                  <span>Madrasah Qur'an Center (MQC)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('units')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                  <span>Markaz Hidayah Qur'an (MHQ)</span>
                </button>
              </li>
              <li>
                <a
                  href="https://mariberbagi.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 group-hover:scale-125 transition-transform" />
                  <span>Mari Berbagi (mariberbagi.net)</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400 group-hover:scale-125 transition-transform" />
                  <span>HI Media & Majlis Qolbun Muneeb</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('units')}
                  className="hover:text-white transition-colors flex items-center gap-1.5 group text-left"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform" />
                  <span>HI Mart (Katalog Buku & Produk)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Halaman Utama (Span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                  Profil & Visi Misi
                </button>
              </li>
              <li>
                <button onClick={onOpenLegalModal} className="hover:text-white transition-colors">
                  Legalitas & Pengurus
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Isi Kajian & Agenda
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('donation')} className="hover:text-white transition-colors">
                  Donasi & Infaq
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Alamat & Kontak (Span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider">
              Kantor Sekretariat
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{FOUNDATION_LEGAL.alamatSekretariat}</span>
            </p>
            <div className="space-y-1.5 text-xs text-slate-300 pt-1">
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{FOUNDATION_LEGAL.kontakTelepon}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{FOUNDATION_LEGAL.email}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} Yayasan Hidayah Indonesia. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-[11px]">
            <span>Legalitas SK: {FOUNDATION_LEGAL.skKemenkumham}</span>
            <span>•</span>
            <button onClick={onOpenLegalModal} className="text-blue-300 hover:underline">
              Cek Keabsahan Yayasan
            </button>
            <span>•</span>
            <button
              onClick={onOpenAdminPanel}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-all border border-white/10 font-bold active:scale-95"
              title="Panel Pengelolaan Konten, Foto & Data Santri MQC"
            >
              <Lock className="w-3 h-3 text-blue-300" />
              <span>Panel Admin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
