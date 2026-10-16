import React from 'react';
import { PageView } from '../types';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  BookOpen, 
  HeartHandshake, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';

interface HeroProps {
  setCurrentPage: (page: PageView) => void;
  onOpenDonateModal: () => void;
  onOpenAdminPanel?: (tab?: 'konten_hero') => void;
}

export const Hero: React.FC<HeroProps> = ({ setCurrentPage, onOpenDonateModal, onOpenAdminPanel }) => {
  const { heroContent } = useApp();

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9]">
      {/* Subtle decorative background blur */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-slate-200/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">

            {/* Top Pill / Tagline & Admin Edit Quick Action */}
            <div className="flex flex-wrap items-center gap-3">
              {heroContent.badgeHeadline && (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-blue-900 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>{heroContent.badgeHeadline}</span>
                </div>
              )}

              {onOpenAdminPanel && (
                <button
                  onClick={() => onOpenAdminPanel('konten_hero')}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-500 hover:text-[#0B1B3D] bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all active:scale-95"
                  title="Edit semua teks dan foto hero di Panel Admin"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Edit Konten Hero</span>
                </button>
              )}
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1B3D] tracking-tight leading-[1.12]">
              {heroContent.headline} <span className="text-blue-600">{heroContent.highlightText}</span> {heroContent.headlineSuffix || '& Berdaya'}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              {heroContent.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage('mqc')}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold text-white bg-[#0B1B3D] hover:bg-[#152B5B] shadow-lg shadow-blue-950/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-blue-300" />
                <span>{heroContent.cta1Text || "Daftar Bimbingan Qur'an"}</span>
              </button>

              <button
                onClick={onOpenDonateModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold text-[#0B1B3D] bg-white border border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 shadow-xs hover:shadow-md transition-all duration-200 group"
              >
                <HeartHandshake className="w-4 h-4 text-rose-500 group-hover:scale-110 transition-transform" />
                <span>{heroContent.cta2Text || "Donasi Mari Berbagi"}</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-4 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-700">{heroContent.trustPoint1 || "Metode Talaqqi Bersanad"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-700">{heroContent.trustPoint2 || "Legalitas SK Kemenkumham"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-xs font-medium text-slate-700">{heroContent.trustPoint3 || "Offline & Online Zoom/GMeet"}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Image Card Frame */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-3 shadow-2xl shadow-slate-300/60 border border-slate-200/80">
                <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[4/5] sm:aspect-[4/4.5]">
                  <img
                    src={heroContent.imageUrl}
                    alt={heroContent.imageAlt || "Pengajar Madrasah Qur'an Center Hidayah Indonesia"}
                    className="w-full h-full object-cover object-top opacity-95 hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D]/90 via-[#0B1B3D]/20 to-transparent" />

                  {/* Plus Badge on top right like the reference image */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                    <Sparkles className="w-4 h-4 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* Floating Stat Card 1 - Top Left */}
              <div className="absolute -top-5 -left-4 sm:-left-6 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{heroContent.badge1Label || "SK Kemenkumham"}</p>
                  <p className="text-xs font-bold text-slate-800">{heroContent.badge1Text || "Yayasan Resmi Terdaftar"}</p>
                </div>
              </div>

              {/* Floating Stat Card 2 - Bottom Right */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[#0B1B3D] text-white rounded-2xl p-4 shadow-xl border border-blue-900/50 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 flex items-center justify-center text-blue-300">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-extrabold text-white leading-none">{heroContent.statNumber || "1.200+"}</p>
                  <p className="text-xs text-slate-300 mt-1">{heroContent.statLabel || "Santri & Jemaah Aktif"}</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
