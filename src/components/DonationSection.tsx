import React, { useState } from 'react';
import { 
  HeartHandshake, 
  ExternalLink, 
  Check, 
  Copy, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  QrCode, 
  Send,
  Building2,
  Users
} from 'lucide-react';

export const DonationSection: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState('Sedekah Al-Qur\'an Pelosok');
  const [selectedAmount, setSelectedAmount] = useState('100.000');
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [copiedBank, setCopiedBank] = useState<string | null>(null);

  const programs = [
    {
      id: 'quran',
      title: "Sedekah Al-Qur'an Pelosok",
      desc: "Menyalurkan mushaf Al-Qur'an standar hafalan untuk santri dan pelosok.",
      target: "Rp 50.000.000",
      collected: "Rp 38.450.000"
    },
    {
      id: 'guru',
      title: "Kafalah Guru Ngaji Bersanad",
      desc: "Memuliakan para ustadz dan ustadzah yang mendedikasikan hidup membina Al-Qur'an.",
      target: "Rp 40.000.000",
      collected: "Rp 29.200.000"
    },
    {
      id: 'yatim',
      title: "Beasiswa Yatim & Dhuafa",
      desc: "Bantuan pendidikan dan akomodasi untuk santri penghafal Al-Qur'an yatim/dhuafa.",
      target: "Rp 60.000.000",
      collected: "Rp 47.800.000"
    },
    {
      id: 'operasional',
      title: "Operasional Dakwah Hidayah Indonesia",
      desc: "Mendukung sarana prasarana kajian, syiar audio-visual, dan sarana majlis.",
      target: "Rp 30.000.000",
      collected: "Rp 21.500.000"
    }
  ];

  const nominals = ['25.000', '50.000', '100.000', '250.000', '500.000'];

  const bankAccounts = [
    {
      bank: 'Bank Syariah Indonesia (BSI)',
      accountNo: '7192837482',
      accountName: 'Yayasan Hidayah Indonesia',
      code: '451'
    },
    {
      bank: 'Bank Mandiri',
      accountNo: '1670002849201',
      accountName: 'Yayasan Hidayah Indonesia',
      code: '008'
    },
    {
      bank: 'Bank BCA',
      accountNo: '5271920381',
      accountName: 'Yayasan Hidayah Indonesia',
      code: '014'
    }
  ];

  const handleCopyAccount = (accNo: string, bank: string) => {
    navigator.clipboard.writeText(accNo);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

  const handleConfirmWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();
    const nominal = customAmount ? customAmount : selectedAmount;
    const message = `*KONFIRMASI INFAQ / DONASI MARI BERBAGI*
_Yayasan Hidayah Indonesia (mariberbagi.net)_
━━━━━━━━━━━━━━━━━━━━
• *Program:* ${selectedProgram}
• *Nominal:* Rp ${nominal}
• *Nama Donatur:* ${donorName || 'Hamba Allah'}
• *No. WhatsApp:* ${donorPhone || '-'}

Alhamdulillah telah ditransfer untuk program kebaikan. Mohon doa dan pencatatannya. Jazakumullahu khairan.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/6281288997721?text=${encoded}`, '_blank');
  };

  return (
    <section id="donasi" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-xs font-semibold text-rose-700 mb-4">
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>Divisi Sosial: Mari Berbagi (mariberbagi.net)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1B3D] tracking-tight">
            Tebarkan Kebaikan, Raih Pahala Jariyah
          </h2>
          <p className="mt-3 text-slate-600 text-base leading-relaxed">
            Setiap rupiah infaq dan sedekah yang Anda salurkan melalui <strong>Mari Berbagi</strong> menjadi aliran pahala tiada henti untuk santri Al-Qur'an, anak yatim, dan guru ngaji di pelosok nusantara.
          </p>

          {/* External Link Direct to mariberbagi.net */}
          <div className="mt-6 flex justify-center">
            <a
              href="https://mariberbagi.net"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all hover:scale-105"
            >
              <span>Kunjungi Website Resmi: mariberbagi.net</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 2 Columns: Programs & Donation Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Programs Showcase */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-[#0B1B3D] mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span>Program Kebaikan Pilihan</span>
            </h3>

            <div className="space-y-4">
              {programs.map((prog) => {
                const isSelected = selectedProgram === prog.title;
                return (
                  <div
                    key={prog.id}
                    onClick={() => setSelectedProgram(prog.title)}
                    className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-md ring-2 ring-blue-500/20'
                        : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-3 h-3 rounded-full ${
                              isSelected ? 'bg-blue-600' : 'bg-slate-300'
                            }`}
                          />
                          <h4 className="text-base font-bold text-[#0B1B3D]">{prog.title}</h4>
                        </div>
                        <p className="text-xs text-slate-600 mt-1 pl-5 leading-relaxed">{prog.desc}</p>
                      </div>

                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                        Terkumpul: {prog.collected}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Official Foundation Accounts */}
            <div className="mt-8 p-6 rounded-3xl bg-slate-50 border border-slate-200/90">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="w-5 h-5 text-[#0B1B3D]" />
                <h4 className="text-sm font-bold text-[#0B1B3D]">Rekening Resmi Yayasan Hidayah Indonesia</h4>
              </div>

              <div className="space-y-3">
                {bankAccounts.map((b) => (
                  <div
                    key={b.bank}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{b.bank}</span>
                      <p className="text-sm font-mono font-extrabold text-[#0B1B3D]">{b.accountNo}</p>
                      <p className="text-[10px] text-slate-400">a.n. {b.accountName}</p>
                    </div>

                    <button
                      onClick={() => handleCopyAccount(b.accountNo, b.bank)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedBank === b.bank ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedBank === b.bank ? 'Tersalin' : 'Salin'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Donation Form & WhatsApp Confirmation */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1B3D] to-[#152B5B] text-white rounded-3xl p-7 sm:p-8 shadow-2xl shadow-blue-950/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">Formulir Cepat</span>
                <h3 className="text-xl font-bold text-white">Salurkan Infaq Sekarang</h3>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-rose-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
            </div>

            <form onSubmit={handleConfirmWhatsapp} className="space-y-5">
              
              {/* Selected Program Display */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Program Terpilih
                </label>
                <div className="p-3 rounded-xl bg-white/10 border border-white/15 text-xs font-bold text-white">
                  {selectedProgram}
                </div>
              </div>

              {/* Nominal Infaq Buttons */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Pilih Nominal Infaq (Rp)
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {nominals.map((nom) => (
                    <button
                      type="button"
                      key={nom}
                      onClick={() => {
                        setSelectedAmount(nom);
                        setCustomAmount('');
                      }}
                      className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                        selectedAmount === nom && !customAmount
                          ? 'bg-white text-[#0B1B3D] shadow-md'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {nom}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Atau masukkan nominal lainnya..."
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 placeholder-slate-400 text-white text-xs outline-none focus:border-white"
                />
              </div>

              {/* Donor Name & Phone */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nama Donatur
                </label>
                <input
                  type="text"
                  placeholder="Hamba Allah / Nama Anda"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 placeholder-slate-400 text-white text-xs outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  No. WhatsApp (Untuk Laporan Penyaluran)
                </label>
                <input
                  type="tel"
                  placeholder="0812xxxxxxxx"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/20 placeholder-slate-400 text-white text-xs outline-none focus:border-white"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-full text-xs font-bold text-[#0B1B3D] bg-white hover:bg-slate-100 shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <Send className="w-4 h-4 text-blue-700" />
                  <span>Konfirmasi Infaq via WhatsApp</span>
                </button>

                <a
                  href="https://mariberbagi.net"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-full text-xs font-semibold text-white bg-blue-600/60 hover:bg-blue-600 border border-white/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Buka Website mariberbagi.net</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Laporan donasi dikirimkan berkala & diaudit secara akuntabel.</span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
