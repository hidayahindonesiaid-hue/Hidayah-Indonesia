import React, { useState } from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import { 
  Menu, 
  X, 
  HeartHandshake, 
  ChevronRight,
  Edit3
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  setCurrentPage: (page: PageView) => void;
  onOpenLegalModal: () => void;
  onOpenAdminPanel?: (tab?: 'header_brand') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  setCurrentPage,
  onOpenLegalModal,
  onOpenAdminPanel
}) => {
  const { brandIdentity } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Beranda', page: 'home' as PageView },
    { label: 'Tentang Kami', page: 'about' as PageView },
    { label: 'Pilar Dakwah', page: 'units' as PageView },
    { label: 'Kajian & Agenda', page: 'events' as PageView },
  ];

  const handleNavClick = (page: PageView) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name (Dapat Diedit Admin) */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group text-left focus:outline-none relative"
            title="Klik untuk ke Beranda"
          >
            {brandIdentity.logoType === 'image' && brandIdentity.logoImageUrl ? (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center shadow-md border border-slate-200 group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={brandIdentity.logoImageUrl}
                  alt={`${brandIdentity.namePrefix} ${brandIdentity.nameHighlight}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#0B1B3D] to-[#1E3A8A] flex items-center justify-center text-white shadow-md shadow-blue-950/20 group-hover:scale-105 transition-transform shrink-0">
                <span className="font-extrabold text-xl tracking-tight text-white font-serif">
                  {brandIdentity.logoLetter || 'H'}
                </span>
              </div>
            )}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#0B1B3D]">
                  {brandIdentity.namePrefix || 'Hidayah'}
                </span>
                <span className="text-xl font-bold tracking-tight text-blue-600">
                  {brandIdentity.nameHighlight || 'Indonesia'}
                </span>
              </div>
              {brandIdentity.tagline && (
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-widest hidden sm:block">
                  {brandIdentity.tagline}
                </p>
              )}
            </div>

            {/* Tombol Cepat Edit Header (Admin) */}
            {onOpenAdminPanel && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAdminPanel('header_brand');
                }}
                title="Edit Logo, Nama, & Tagline Header di Panel Admin"
                className="opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 px-2 py-0.5 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold border border-blue-200 hidden md:inline-flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Edit3 className="w-3 h-3 text-blue-600" />
                <span>Edit Brand</span>
              </span>
            )}
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  currentPage === item.page
                    ? 'text-[#0B1B3D] bg-blue-50/90 font-semibold'
                    : 'text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-50'
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#0B1B3D] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action Button: Tombol Donasi */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('donation')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#0B1B3D] hover:bg-[#152B5B] shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <HeartHandshake className="w-4 h-4 text-rose-400 group-hover:scale-110 transition-transform" />
              <span>Donasi</span>
            </button>
          </div>

          {/* Mobile Menu & Action Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('donation')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#0B1B3D] active:scale-95"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-rose-400" />
              <span>Donasi</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top duration-200">
          <div className="space-y-1 mb-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-blue-50 text-[#0B1B3D] font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => handleNavClick('donation')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-sm"
            >
              <HeartHandshake className="w-4 h-4 text-rose-400" />
              <span>Donasi Mari Berbagi</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
