import React, { useState } from 'react';
import { ArticleItem, EventItem } from '../types';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  ArrowRight, 
  Share2, 
  X, 
  CheckCircle2,
  Video,
  Sparkles,
  Ticket
} from 'lucide-react';

export const ArticlesAndEventsSection: React.FC = () => {
  const { articles, events } = useApp();
  const [activeTab, setActiveTab] = useState<'kegiatan' | 'artikel'>('kegiatan');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="kajian" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-900 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Syiar Ilmu & Agenda Dakwah</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
              Kegiatan Dakwah & Artikel Kajian
            </h2>
            <p className="mt-2 text-slate-600 text-sm max-w-xl">
              Ikuti jadwal majlis kajian rutin, dauroh sanad quran, aksi kemanusiaan, serta renungan isi kajian ilmiah para asatidzah.
            </p>
          </div>

          {/* Tab Switcher Pills */}
          <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('kegiatan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'kegiatan'
                  ? 'bg-[#0B1B3D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Agenda Kegiatan ({events.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('artikel')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'artikel'
                  ? 'bg-[#0B1B3D] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Artikel & Isi Kajian ({articles.length})</span>
            </button>
          </div>
        </div>

        {/* Tab Content 1: Agenda Kegiatan */}
        {activeTab === 'kegiatan' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
                    <img
                      src={evt.imageUrl}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-md">
                      {evt.category}
                    </span>

                    {evt.isOnline && (
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 text-[10px] font-bold flex items-center gap-1">
                        <Video className="w-3 h-3 text-emerald-400" />
                        <span>Online Available</span>
                      </span>
                    )}

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <p className="text-xs text-blue-200 font-semibold">{evt.speaker}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-[#0B1B3D] group-hover:text-blue-700 transition-colors leading-snug mb-4">
                      {evt.title}
                    </h3>

                    <div className="space-y-2 text-xs text-slate-600 mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-semibold text-slate-800">{evt.date}</span>
                        <span>•</span>
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-bold text-emerald-700">{evt.price}</span>
                        <span className="text-slate-400">|</span>
                        <span className="text-[11px] text-slate-500">{evt.quotaStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Buka untuk umum</span>
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors"
                  >
                    <span>Detail & Pendaftaran</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Tab Content 2: Artikel & Ringkasan Kajian */}
        {activeTab === 'artikel' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[#0B1B3D] text-[10px] font-extrabold shadow-sm">
                      {art.category}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span>{art.readTime}</span>
                    </div>

                    <h3 className="text-sm font-bold text-[#0B1B3D] group-hover:text-blue-700 transition-colors leading-snug mb-2 line-clamp-2">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setSelectedArticle(art)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Baca Kajian Lengkap</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Modal: Full Article Reader */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              {selectedArticle.category}
            </span>

            <h2 className="text-2xl font-extrabold text-[#0B1B3D] mb-3 leading-snug">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center gap-3 text-xs text-slate-500 pb-4 mb-6 border-b border-slate-100">
              <span className="font-semibold text-slate-800">{selectedArticle.author}</span>
              <span>•</span>
              <span>{selectedArticle.date}</span>
              <span>•</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-sm"
            />

            <div className="prose prose-slate max-w-none text-sm text-slate-700 leading-relaxed space-y-4 whitespace-pre-line">
              {selectedArticle.content}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">Yayasan Hidayah Indonesia • HI Media</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-[#0B1B3D] text-white hover:bg-blue-900"
              >
                Tutup Bacaan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Event Registration Details */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full mb-3">
              {selectedEvent.category}
            </span>

            <h2 className="text-xl font-extrabold text-[#0B1B3D] mb-4 leading-snug">
              {selectedEvent.title}
            </h2>

            <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600 shrink-0" />
                <span><strong>Waktu:</strong> {selectedEvent.date} ({selectedEvent.time})</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span><strong>Tempat:</strong> {selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Narasumber:</strong> {selectedEvent.speaker} ({selectedEvent.speakerTitle})</span>
              </div>
              <div className="flex items-center gap-2">
                <Ticket className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Infaq / Tiket:</strong> {selectedEvent.price} ({selectedEvent.quotaStatus})</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
              Pendaftaran peserta dilakukan melalui WhatsApp panitia dakwah Hidayah Indonesia untuk pendataan jemaah dan pengiriman link siaran/materi.
            </p>

            <div className="space-y-2">
              <a
                href={`https://wa.me/6281288997721?text=${encodeURIComponent(`Halo Panitia Hidayah Indonesia, saya ingin mendaftar kegiatan: ${selectedEvent.title}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 shadow-md"
              >
                <span>Daftar via WhatsApp Panitia</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setSelectedEvent(null)}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
