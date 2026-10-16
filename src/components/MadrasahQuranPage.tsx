import React, { useState } from 'react';
import { MQC_PROGRAM_DATA } from '../data/mockData';
import { MQCRegistrationForm, PageView } from '../types';
import { useApp } from '../context/AppContext';
import { 
  BookOpen, 
  MapPin, 
  Video, 
  Users, 
  UserCheck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Gift, 
  Sparkles, 
  Send, 
  ChevronRight, 
  HelpCircle,
  Copy,
  Check,
  ArrowLeft,
  ExternalLink,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

interface MadrasahQuranPageProps {
  setCurrentPage: (page: PageView) => void;
}

export const MadrasahQuranPage: React.FC<MadrasahQuranPageProps> = ({ setCurrentPage }) => {
  const { addRegistration, adminSettings } = useApp();

  // Registration Form State
  const [formData, setFormData] = useState<MQCRegistrationForm>({
    fullName: '',
    gender: 'Ikhwan',
    age: '',
    phoneWhatsapp: '',
    email: '',
    addressCity: '',
    mode: 'Offline',
    classType: 'Kelas Reguler',
    level: 'Level Pemula',
    selectedDays: 'Senin & Rabu',
    selectedTime: '20.00',
    selectedInfaq: 'Rp. 100.000',
    notes: ''
  });

  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(MQC_PROGRAM_DATA.offlineLocation);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneWhatsapp) {
      alert('Mohon lengkapi Nama Lengkap dan Nomor WhatsApp Anda.');
      return;
    }

    // Save record to internal database
    addRegistration(formData);

    // Dynamic WhatsApp destination configured by Admin
    const adminPhone = adminSettings.mqcWhatsappTarget.replace(/^0/, '62').replace(/\D/g, '') || '6281288997721';
    const message = `*FORMULIR PENDAFTARAN MADRASAH QUR'AN CENTER (MQC)*
_Yayasan Hidayah Indonesia_
━━━━━━━━━━━━━━━━━━━━
• *Nama Lengkap:* ${formData.fullName}
• *Jenis Kelamin:* ${formData.gender}
• *Usia:* ${formData.age || '-'} Tahun
• *No. WhatsApp:* ${formData.phoneWhatsapp}
• *Kota / Domisili:* ${formData.addressCity || '-'}

*PILIHAN BELAJAR:*
• *Mode Belajar:* ${formData.mode} (${formData.mode === 'Offline' ? 'Jatimekar, Bekasi' : 'Zoom/Meet/WA'})
• *Tipe Kelas:* ${formData.classType}
• *Level Belajar:* ${formData.level}
• *Pilihan Hari:* ${formData.selectedDays}
• *Pilihan Jam:* ${formData.selectedTime} WIB
• *Pilihan Infaq Bulanan:* ${formData.selectedInfaq}

*KLAIM PROMO 5 PENDAFTAR PERTAMA:*
✓ Free Buku Tajwid Ringkas
✓ Free Biaya Pendaftaran Rp 50.000

Catatan: ${formData.notes || 'Siap memulai belajar Al-Qur\'an'}
━━━━━━━━━━━━━━━━━━━━
Mohon informasi jadwal orientasi dan konfirmasi kelas. Terima kasih.`;

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${adminPhone}?text=${encoded}`;
    
    // Set status and open WA in safe way
    setRegistrationSubmitted(true);
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      
      {/* Top Banner Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#0B1B3D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Beranda Yayasan</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Pendaftaran Angkatan Baru Dibuka
            </span>
          </div>
        </div>
      </div>

      {/* Hero Section of MQC */}
      <section className="relative overflow-hidden pt-12 pb-16 bg-gradient-to-b from-white via-blue-50/30 to-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-xs font-bold text-blue-900 shadow-xs">
              <Sparkles className="w-4 h-4 text-blue-700" />
              <span>Unit Pendidikan Yayasan Hidayah Indonesia</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B1B3D] tracking-tight leading-tight">
              Madrasah Qur'an Center <span className="text-blue-600">(MQC)</span>
            </h1>

            <p className="text-xl sm:text-2xl font-semibold text-slate-700">
              Bimbingan Belajar Al-Quran • <span className="text-blue-700">Ikhwan & Akhwat</span>
            </p>

            <p className="text-slate-600 max-w-2xl mx-auto text-base leading-relaxed">
              Belajar membaca Al-Qur'an dari dasar hingga tahsin dan tahfizh mutqin dengan metode talaqqi yang mudah dipahami, dibimbing langsung oleh ustadz dan ustadzah bersanad.
            </p>

            {/* Quick Badge Pills: Online & Offline */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Kelas Offline: Jatimekar, Bekasi</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-semibold text-slate-800">
                <Video className="w-4 h-4 text-blue-600" />
                <span>Kelas Online: Zoom / Google Meet / WA</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                <Gift className="w-4 h-4 text-emerald-600" />
                <span>Gratis Biaya Pendaftaran Rp 50.000</span>
              </div>
            </div>

            {/* CTA anchor to form */}
            <div className="pt-4">
              <a
                href="#formulir-pendaftaran"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white bg-[#0B1B3D] hover:bg-[#152B5B] shadow-xl shadow-blue-950/20 hover:-translate-y-0.5 transition-all"
              >
                <span>Daftar Sekarang & Klaim Buku Tajwid Gratis</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Special Promo Banner (Spesial 5 Pendaftar Pertama) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-16">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-amber-900/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
              <Flame className="w-8 h-8 text-yellow-200 animate-pulse" />
            </div>
            <div>
              <div className="inline-block px-3 py-0.5 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider mb-1">
                Promo Eksklusif Terbatas
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold">
                Spesial 5 Pendaftar Pertama Bulan Ini
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm mt-1">
                Dapatkan bonus langsung tanpa diundi begitu formulir pendaftaran terverifikasi:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-left">
              <p className="text-[11px] font-bold uppercase text-yellow-200">Bonus 1</p>
              <p className="text-xs font-bold text-white">Free Buku Tajwid Ringkas</p>
            </div>
            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-left">
              <p className="text-[11px] font-bold uppercase text-yellow-200">Bonus 2</p>
              <p className="text-xs font-bold text-white">Free Biaya Pendaftaran Rp 50.000</p>
            </div>
            <a
              href="#formulir-pendaftaran"
              className="px-5 py-3 rounded-full text-xs font-bold bg-white text-amber-800 hover:bg-yellow-50 shadow-md transition-colors"
            >
              Ambil Promo
            </a>
          </div>
        </div>
      </section>

      {/* Lokasi Belajar Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Lokasi Offline */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">Tatap Muka Langsung</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">Lokasi Belajar Offline</h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-1">Alamat Lengkap MQC:</p>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {MQC_PROGRAM_DATA.offlineLocation}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Ruang belajar ber-AC, nyaman, kondusif, terpisah ikhwan & akhwat, dilengkapi mushaf standar, papan makhraj, dan area parkir.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-slate-100">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAddress ? 'Alamat Tersalin' : 'Salin Alamat'}</span>
              </button>

              <a
                href="https://maps.google.com/?q=Hidayah+Indonesia+Jatimekar+Jatiasih+Bekasi"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Buka Petunjuk Google Maps</span>
              </a>
            </div>
          </div>

          {/* Lokasi Online */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Video className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Fleksibel dari Mana Saja</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">Lokasi Belajar Online</h3>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 mb-5">
                <p className="text-xs font-bold text-blue-900 uppercase mb-1">Platform Pembelajaran:</p>
                <p className="text-sm font-semibold text-[#0B1B3D]">
                  {MQC_PROGRAM_DATA.onlineLocation}
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-6">
                Sangat cocok bagi Anda yang berada di luar Bekasi, pekerja sibuk, ibu rumah tangga, atau santri yang ingin belajar nyaman dari rumah dengan audio interaktif berkualitas HD.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Link Zoom/Meet dibagikan di grup WhatsApp kelas sebelum sesi dimulai.</span>
            </div>
          </div>

        </div>
      </section>

      {/* Pilihan Kelas Belajar (Kelas Reguler vs Kelas Privat) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Format Pembelajaran</span>
          <h2 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight mt-1">
            Pilihan Kelas Belajar
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Pilih metode belajar yang paling sesuai dengan ritme dan preferensi belajar Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MQC_PROGRAM_DATA.classes.map((cls) => {
            const isReguler = cls.id === 'reguler';
            return (
              <div
                key={cls.id}
                className={`relative rounded-3xl p-8 transition-all ${
                  isReguler
                    ? 'bg-white border-2 border-blue-500 shadow-xl shadow-blue-900/10 ring-4 ring-blue-500/10'
                    : 'bg-white border border-slate-200 shadow-md hover:border-slate-300'
                }`}
              >
                {/* Badge Top */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                      isReguler
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-800 text-white'
                    }`}
                  >
                    {cls.badge}
                  </span>

                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {cls.registrationFee}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-[#0B1B3D] mb-1">
                  {cls.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mb-6">
                  {cls.subtitle}
                </p>

                {/* Points List */}
                <div className="space-y-4 mb-8">
                  {cls.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{pt.label}</h4>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{pt.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer of card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Kapasitas Sesi</span>
                    <span className="text-xs font-bold text-slate-800">{cls.ratio}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">Pilihan Infaq</span>
                    <span className="text-xs font-bold text-blue-700">{cls.infaqMonthly}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="#formulir-pendaftaran"
                    onClick={() => setFormData({ ...formData, classType: cls.name as any })}
                    className={`w-full py-3 px-4 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isReguler
                        ? 'bg-[#0B1B3D] text-white hover:bg-blue-900 shadow-md'
                        : 'bg-slate-100 text-[#0B1B3D] hover:bg-slate-200'
                    }`}
                  >
                    <span>Pilih {cls.name}</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Pilihan Level Belajar (3 Level Lengkap) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Kurikulum Berjenjang</span>
          <h2 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight mt-1">
            Pilihan Level Belajar
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Disusun bertahap dari pemula nol hingga tahfizh bersanad agar bacaan Anda benar dan tartil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {MQC_PROGRAM_DATA.levels.map((lvl) => (
            <div
              key={lvl.number}
              className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-xl transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                {/* Level Header with Number Tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1B3D] text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                    {lvl.number}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    Tahapan {lvl.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#0B1B3D] mb-1.5 group-hover:text-blue-600 transition-colors">
                  {lvl.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-6 italic">
                  "{lvl.tagline}"
                </p>

                {/* Bullet Points */}
                <div className="space-y-3 mb-6">
                  {lvl.bullets.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Santri Box */}
              <div className="pt-4 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-[11px] text-slate-600 mb-4">
                  <strong className="text-slate-800">Sasaran:</strong> {lvl.targetSantri}
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, level: lvl.name as any });
                    const el = document.getElementById('formulir-pendaftaran');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-[#0B1B3D] bg-blue-50/70 hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Daftar {lvl.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* Pilihan Hari & Pilihan Jam Belajar (Grid Visual) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Pilihan Hari */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Jadwal Fleksibel</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">Pilihan Hari Belajar</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pertemuan diadakan <strong>2x sepekan</strong> dengan durasi 60 menit per sesi:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MQC_PROGRAM_DATA.daysOptions.map((day, i) => (
                  <div
                    key={i}
                    onClick={() => setFormData({ ...formData, selectedDays: day })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      formData.selectedDays === day
                        ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-xs font-bold text-slate-800">{day}</span>
                    </div>
                    {formData.selectedDays === day && (
                      <Check className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Pilihan Jam */}
            <div className="lg:col-span-6 space-y-6 lg:border-l lg:border-slate-100 lg:pl-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Waktu Sesi</span>
                  <h3 className="text-xl font-bold text-[#0B1B3D]">Pilihan Jam Belajar</h3>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tersedia 4 pilihan jam belajar yang dapat disesuaikan dengan aktivitas harian Anda:
              </p>

              <div className="grid grid-cols-2 gap-3">
                {MQC_PROGRAM_DATA.timeSlots.map((slot, i) => (
                  <div
                    key={i}
                    onClick={() => setFormData({ ...formData, selectedTime: slot.time })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      formData.selectedTime === slot.time
                        ? 'border-blue-600 bg-blue-50/80 shadow-xs ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:border-blue-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base font-extrabold text-[#0B1B3D]">{slot.time} WIB</span>
                      {formData.selectedTime === slot.time && (
                        <Check className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{slot.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9 Keunggulan MQC */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Kenapa Memilih Kami?</span>
          <h2 className="text-3xl font-extrabold text-[#0B1B3D] tracking-tight mt-1">
            9 Keunggulan Madrasah Qur'an Center
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Standar kurikulum bersanad, suasana belajar nyaman, dan metode yang dirancang agar setiap santri percaya diri membaca Al-Qur'an.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MQC_PROGRAM_DATA.advantages.map((adv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex items-start gap-3.5 text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0B1B3D] leading-snug">{adv}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Fasilitas resmi Yayasan Hidayah Indonesia.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Infaq Pilihan Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-[#0B1B3D] to-[#152B5B] text-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-blue-950/20 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            Infaq Bulanan Terjangkau
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Pilihan Infaq Bimbingan Al-Qur'an
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto mb-8">
            Yayasan Hidayah Indonesia berkomitmen menghadirkan bimbingan berkualitas tanpa membebani. Biaya pendaftaran Rp 50.000 <strong>GRATIS</strong>, cukup infaq bulanan pilihan Anda:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            {MQC_PROGRAM_DATA.infaqOptions.map((opt, i) => (
              <div
                key={i}
                onClick={() => setFormData({ ...formData, selectedInfaq: opt.amount as any })}
                className={`p-5 rounded-2xl cursor-pointer transition-all border ${
                  formData.selectedInfaq === opt.amount
                    ? 'bg-white text-[#0B1B3D] border-white shadow-xl scale-105'
                    : 'bg-white/10 text-white border-white/20 hover:bg-white/15'
                }`}
              >
                <div className="text-xs font-semibold opacity-80 uppercase">Infaq Pilihan</div>
                <div className="text-2xl font-extrabold my-1">{opt.amount}</div>
                <div className="text-[11px] opacity-75">{opt.note}</div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-400">
            *Infaq disalurkan untuk kafalah guru ngaji bersanad dan operasional sarana belajar santri.
          </p>
        </div>
      </section>

      {/* FORMULIR PENDAFTARAN RESMI MQC (Interactive Form) */}
      <section id="formulir-pendaftaran" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold mb-3">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Formulir Pendaftaran Resmi</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
              Formulir Pendaftaran MQC
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Isi data di bawah ini untuk mengamankan kuota dan klaim Free Buku Tajwid Ringkas. Data akan langsung terhubung ke WhatsApp Admin MQC.
            </p>
          </div>

          {registrationSubmitted && (
            <div className="mb-8 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold">Pendaftaran Berhasil Dikirim ke WhatsApp!</h4>
                <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                  Terima kasih, <strong>{formData.fullName}</strong>. Admin Madrasah Qur'an Center akan segera memverifikasi formulir Anda dan mengirimkan informasi jadwal talaqqi.
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Identitas Diri */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Yusuf"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  No. WhatsApp Aktif *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 081234567890"
                  value={formData.phoneWhatsapp}
                  onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-sm outline-none transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kategori Peserta *
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none bg-white"
                >
                  <option value="Ikhwan">Ikhwan (Laki-laki)</option>
                  <option value="Akhwat">Akhwat (Perempuan)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Usia (Tahun)
                </label>
                <input
                  type="number"
                  placeholder="Mulai 13 thn"
                  min="13"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Kota Domisili
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Bekasi / Jakarta"
                  value={formData.addressCity}
                  onChange={(e) => setFormData({ ...formData, addressCity: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none"
                />
              </div>
            </div>

            {/* Pilihan Mode & Tipe Kelas */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Mode Pembelajaran *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  onClick={() => setFormData({ ...formData, mode: 'Offline' })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between ${
                    formData.mode === 'Offline'
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-rose-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Offline (Tatap Muka)</p>
                      <p className="text-[11px] text-slate-500">Jl. Raya Jatimekar, Bekasi</p>
                    </div>
                  </div>
                  {formData.mode === 'Offline' && <Check className="w-4 h-4 text-blue-600" />}
                </div>

                <div
                  onClick={() => setFormData({ ...formData, mode: 'Online' })}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between ${
                    formData.mode === 'Online'
                      ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">Online (Jarak Jauh)</p>
                      <p className="text-[11px] text-slate-500">Zoom / GMeet / WA Grup</p>
                    </div>
                  </div>
                  {formData.mode === 'Online' && <Check className="w-4 h-4 text-blue-600" />}
                </div>
              </div>
            </div>

            {/* Tipe Kelas & Level */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tipe Kelas *
                </label>
                <select
                  value={formData.classType}
                  onChange={(e) => setFormData({ ...formData, classType: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none bg-white font-medium"
                >
                  <option value="Kelas Reguler">Kelas Reguler (Kelompok 5-8 Orang)</option>
                  <option value="Kelas Privat">Kelas Privat (One-on-One)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilihan Level Belajar *
                </label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none bg-white font-medium"
                >
                  <option value="Level Pemula">Level 1 - Pemula (Dasar / Iqro)</option>
                  <option value="Level Tahsin">Level 2 - Tahsin (Tajwid & Makhraj)</option>
                  <option value="Level Tahfizh">Level 3 - Tahfizh (Hafalan Mutqin)</option>
                </select>
              </div>
            </div>

            {/* Jadwal: Hari & Jam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilihan Hari Belajar *
                </label>
                <select
                  value={formData.selectedDays}
                  onChange={(e) => setFormData({ ...formData, selectedDays: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none bg-white font-medium"
                >
                  {MQC_PROGRAM_DATA.daysOptions.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pilihan Jam Belajar *
                </label>
                <select
                  value={formData.selectedTime}
                  onChange={(e) => setFormData({ ...formData, selectedTime: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none bg-white font-medium"
                >
                  {MQC_PROGRAM_DATA.timeSlots.map((s) => (
                    <option key={s.time} value={s.time}>
                      Pukul {s.time} WIB ({s.label})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pilihan Infaq Bulanan */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilihan Infaq Bulanan *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {MQC_PROGRAM_DATA.infaqOptions.map((opt) => (
                  <label
                    key={opt.amount}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs font-bold ${
                      formData.selectedInfaq === opt.amount
                        ? 'border-blue-600 bg-blue-50 text-blue-900'
                        : 'border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="infaq"
                        checked={formData.selectedInfaq === opt.amount}
                        onChange={() => setFormData({ ...formData, selectedInfaq: opt.amount as any })}
                        className="text-blue-600 focus:ring-0"
                      />
                      <span>{opt.amount} / bulan</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Catatan / Kesiapan Belajar */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                rows={2}
                placeholder="Ceritakan latar belakang bacaan Anda saat ini atau target belajar yang diinginkan..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-full text-sm font-bold text-white bg-[#0B1B3D] hover:bg-[#152B5B] shadow-xl shadow-blue-950/20 hover:shadow-2xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-blue-300" />
                <span>Kirim Pendaftaran & Buka WhatsApp Admin MQC</span>
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Biaya pendaftaran Rp 50.000 GRATIS. Data Anda dijaga kerahasiaannya sesuai amanah yayasan.
              </p>
            </div>

          </form>

        </div>
      </section>

    </div>
  );
};
