import React, { useState } from 'react';
import { TestimonialItem } from '../types';
import { useApp } from '../context/AppContext';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('Semua');

  const categories = [
    'Semua',
    'Ulama/Kyai',
    'Jemaah',
    'Donatur',
    'Orang Tua Asuh',
    'Wali Santri'
  ];

  const filtered = activeCategory === 'Semua'
    ? testimonials
    : testimonials.filter((item) => item.category === activeCategory);

  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-semibold text-blue-900 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Apresiasi & Amanah Umat</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Kata Mereka Tentang Hidayah Indonesia
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Testimoni jujur dari para ulama, jemaah majlis ta'lim, donatur dermawan, orang tua asuh, dan wali santri Madrasah Qur'an Center.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? 'bg-[#0B1B3D] text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top: Category Tag & Rating Stars */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Quote Text */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-slate-200 absolute -top-1 -left-1 -z-0 opacity-80" />
                  <p className="text-xs text-slate-700 leading-relaxed relative z-10 italic">
                    "{item.quote}"
                  </p>
                </div>
              </div>

              {/* Bottom: Avatar & Name */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D] flex items-center gap-1">
                    <span>{item.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    {item.role} {item.institution ? `• ${item.institution}` : ''}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
