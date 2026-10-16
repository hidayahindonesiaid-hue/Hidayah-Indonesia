import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Users, 
  Phone, 
  FileText, 
  Calendar, 
  Sparkles, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  Download, 
  Upload, 
  MessageCircle, 
  CheckCircle2, 
  Lock, 
  Key, 
  RefreshCw, 
  Building2, 
  Search, 
  Eye, 
  AlertCircle,
  Image as ImageIcon,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { RegistrationStatus, ArticleItem, EventItem, TestimonialItem, IndividualUnitDakwah, MQCRegistrationRecord, BrandIdentity } from '../types';

export type AdminTab = 'pendaftar' | 'kontak_wa' | 'header_brand' | 'konten_hero' | 'pilar_units' | 'artikel' | 'kegiatan' | 'testimoni';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: AdminTab;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({ isOpen, onClose, initialTab }) => {
  const {
    brandIdentity,
    foundationLegal,
    adminSettings,
    heroContent,
    visiMisi,
    units,
    articles,
    events,
    testimonials,
    registrations,
    updateBrandIdentity,
    updateFoundationLegal,
    updateAdminSettings,
    updateHeroContent,
    updateVisiMisi,
    addArticle,
    updateArticle,
    deleteArticle,
    addEvent,
    updateEvent,
    deleteEvent,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    addUnit,
    updateUnit,
    deleteUnit,
    addRegistration,
    updateRegistrationStatus,
    updateRegistration,
    deleteRegistration,
    resetToDefaults
  } = useApp();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab || 'pendaftar');

  // Synchronize when initialTab changes or modal opens
  React.useEffect(() => {
    if (initialTab && isOpen) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Search & Filter for Registrations
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('Semua');
  const [selectedRegDetail, setSelectedRegDetail] = useState<MQCRegistrationRecord | null>(null);

  // States for adding / editing
  const [isAddingReg, setIsAddingReg] = useState(false);
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [editingTestiId, setEditingTestiId] = useState<string | null>(null);
  const [isAddingTesti, setIsAddingTesti] = useState(false);
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);

  // Success alert
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const showSuccess = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3000);
  };

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkeyInput === 'admin123' || passkeyInput === 'admin') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Kata sandi salah. Gunakan kata sandi default: admin123');
    }
  };

  const handleQuickLogin = () => {
    setIsAuthenticated(true);
    setAuthError('');
  };

  // Helper function to read file to Base64
  const handleFileUpload = (file: File, callback: (base64Url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        callback(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Export registrations to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) {
      alert('Belum ada data pendaftar.');
      return;
    }
    const headers = ['ID', 'Nama', 'Gender', 'Usia', 'No WA', 'Email', 'Kota', 'Mode', 'Kelas', 'Level', 'Hari', 'Jam', 'Infaq', 'Tanggal', 'Status'];
    const rows = registrations.map(r => [
      r.id,
      `"${r.fullName}"`,
      r.gender,
      r.age,
      `"${r.phoneWhatsapp}"`,
      r.email,
      `"${r.addressCity}"`,
      r.mode,
      `"${r.classType}"`,
      `"${r.level}"`,
      `"${r.selectedDays}"`,
      `"${r.selectedTime}"`,
      `"${r.selectedInfaq}"`,
      `"${r.registrationDate}"`,
      r.status
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Pendaftar_MQC_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  // Filtered registrations
  const filteredRegs = registrations.filter(r => {
    const matchSearch = r.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phoneWhatsapp.includes(searchQuery) ||
      r.addressCity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'Semua' ? true : r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-6xl w-full h-[92vh] max-h-[900px] flex flex-col overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Top Header */}
        <div className="bg-[#0B1B3D] text-white px-6 py-4 flex items-center justify-between border-b border-blue-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">Panel Admin Hidayah Indonesia</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
                  CMS & Database
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Pengelolaan Konten, Foto, Pilar Dakwah, & Data Santri Pendaftar MQC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => {
                  if (confirm('Yakin ingin mereset seluruh data kembali ke bawaan sistem?')) {
                    resetToDefaults();
                    showSuccess('Data berhasil direset ke pengaturan awal.');
                  }
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-rose-600/40 text-slate-200 transition-colors"
                title="Reset seluruh perubahan data"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Bawaan</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Global Success Notification */}
        {successNotice && (
          <div className="bg-emerald-600 text-white px-6 py-2.5 text-xs font-bold flex items-center justify-between shrink-0 animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
              <span>{successNotice}</span>
            </div>
            <button onClick={() => setSuccessNotice(null)} className="text-white hover:text-emerald-200">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Body Content */}
        {!isAuthenticated ? (
          /* LOGIN DIALOG */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-slate-200 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto shadow-sm">
                <Key className="w-8 h-8 text-blue-600" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-[#0B1B3D]">Autentikasi Admin</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Masukkan kata sandi pengelola untuk mengedit konten dan melihat data santri pendaftar.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Masukkan Kata Sandi (default: admin123)"
                  value={passkeyInput}
                  onChange={(e) => setPasskeyInput(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 text-sm outline-none font-mono text-center tracking-widest"
                />

                <div className="space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-md"
                  >
                    Masuk Panel Admin
                  </button>

                  <button
                    type="button"
                    onClick={handleQuickLogin}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    Login Cepat (Demo Mode)
                  </button>
                </div>
              </form>

              <p className="text-[11px] text-slate-400">
                Yayasan Hidayah Indonesia • Sistem Pengelolaan Internal
              </p>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <aside className="w-full md:w-64 bg-slate-50 border-r border-slate-200 p-3 sm:p-4 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-y-auto shrink-0">
              
              <button
                onClick={() => setActiveTab('pendaftar')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'pendaftar'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Pendaftar MQC</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'pendaftar' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  {registrations.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('kontak_wa')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'kontak_wa'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Tujuan & Kontak</span>
              </button>

              <button
                onClick={() => setActiveTab('konten_hero')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'konten_hero'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Profil & Hero Web</span>
              </button>

              <button
                onClick={() => setActiveTab('pilar_units')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'pilar_units'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Pilar Dakwah ({units.length})</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('artikel')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'artikel'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-sky-500" />
                  <span>Artikel & Kajian</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'artikel' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {articles.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('kegiatan')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'kegiatan'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Agenda Kegiatan</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  activeTab === 'kegiatan' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {events.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('testimoni')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all text-left shrink-0 ${
                  activeTab === 'testimoni'
                    ? 'bg-[#0B1B3D] text-white shadow-md'
                    : 'text-slate-700 hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-rose-500" />
                  <span>Testimoni ({testimonials.length})</span>
                </div>
              </button>

            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-5 sm:p-7 overflow-y-auto bg-white">

              {/* ==================================================== */}
              {/* TAB 1: DATA PENDAFTAR SANTRI MQC                      */}
              {/* ==================================================== */}
              {activeTab === 'pendaftar' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#0B1B3D]">Data Pendaftar Madrasah Qur'an Center</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kelola data calon santri yang mendaftar melalui formulir web, status seleksi, dan komunikasi WhatsApp.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                      </button>

                      <button
                        onClick={() => setIsAddingReg(true)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Tambah Santri</span>
                      </button>
                    </div>
                  </div>

                  {/* Search and Filter */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-8 relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cari berdasarkan nama, no WhatsApp, kota domisili, atau ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs outline-none focus:border-blue-600"
                      />
                    </div>

                    <div className="sm:col-span-4">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs outline-none bg-white font-medium"
                      >
                        <option value="Semua">Semua Status Pendaftaran</option>
                        <option value="Baru">Status: Baru</option>
                        <option value="Dihubungi">Status: Dihubungi</option>
                        <option value="Terverifikasi">Status: Terverifikasi</option>
                        <option value="Diterima">Status: Diterima</option>
                        <option value="Batal">Status: Batal</option>
                      </select>
                    </div>
                  </div>

                  {/* Registrations Table */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
                          <tr>
                            <th className="px-4 py-3">ID / Tanggal</th>
                            <th className="px-4 py-3">Nama Santri</th>
                            <th className="px-4 py-3">WhatsApp</th>
                            <th className="px-4 py-3">Mode & Kelas</th>
                            <th className="px-4 py-3">Level & Jadwal</th>
                            <th className="px-4 py-3">Infaq</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3 text-right">Aksi</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredRegs.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="px-4 py-10 text-center text-slate-400">
                                Tidak ada data pendaftar yang cocok dengan pencarian.
                              </td>
                            </tr>
                          ) : (
                            filteredRegs.map((reg) => (
                              <tr key={reg.id} className="hover:bg-blue-50/40 transition-colors">
                                <td className="px-4 py-3 font-mono font-bold text-slate-700">
                                  <div>{reg.id}</div>
                                  <div className="text-[10px] text-slate-400 font-normal">{reg.registrationDate}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-bold text-[#0B1B3D]">{reg.fullName}</div>
                                  <div className="text-[10px] text-slate-500">
                                    {reg.gender} • {reg.age} thn • {reg.addressCity}
                                  </div>
                                </td>
                                <td className="px-4 py-3 font-mono">
                                  <a
                                    href={`https://wa.me/${reg.phoneWhatsapp.replace(/^0/, '62').replace(/\D/g, '')}?text=${encodeURIComponent(`Assalamu'alaikum wr. wb. Saudara/i ${reg.fullName}, kami dari Admin Madrasah Qur'an Center (MQC) Hidayah Indonesia ingin mengonfirmasi pendaftaran bimbingan Al-Qur'an Anda.`)}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200"
                                    title="Hubungi santri via WhatsApp"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>{reg.phoneWhatsapp}</span>
                                  </a>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                    reg.mode === 'Offline' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'
                                  }`}>
                                    {reg.mode}
                                  </span>
                                  <div className="text-[11px] font-medium text-slate-600 mt-0.5">{reg.classType}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="font-semibold text-slate-800">{reg.level}</div>
                                  <div className="text-[10px] text-slate-500">{reg.selectedDays} • {reg.selectedTime} WIB</div>
                                </td>
                                <td className="px-4 py-3 font-semibold text-blue-700">
                                  {reg.selectedInfaq}
                                </td>
                                <td className="px-4 py-3">
                                  <select
                                    value={reg.status}
                                    onChange={(e) => {
                                      updateRegistrationStatus(reg.id, e.target.value as RegistrationStatus);
                                      showSuccess(`Status ${reg.fullName} diubah menjadi ${e.target.value}`);
                                    }}
                                    className={`px-2 py-1 rounded-lg font-bold text-[10px] outline-none border cursor-pointer ${
                                      reg.status === 'Baru' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                      reg.status === 'Dihubungi' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                                      reg.status === 'Terverifikasi' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                      reg.status === 'Diterima' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                      'bg-slate-100 text-slate-600 border-slate-200'
                                    }`}
                                  >
                                    <option value="Baru">Baru</option>
                                    <option value="Dihubungi">Dihubungi</option>
                                    <option value="Terverifikasi">Terverifikasi</option>
                                    <option value="Diterima">Diterima</option>
                                    <option value="Batal">Batal</option>
                                  </select>
                                </td>
                                <td className="px-4 py-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => setSelectedRegDetail(reg)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                                      title="Lihat Detail & Catatan Admin"
                                    >
                                      <Eye className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => {
                                        if (confirm(`Hapus data pendaftar ${reg.fullName}?`)) {
                                          deleteRegistration(reg.id);
                                          showSuccess('Data pendaftar berhasil dihapus.');
                                        }
                                      }}
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                                      title="Hapus"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 2: NOMOR WHATSAPP TUJUAN & KONTAK                 */}
              {/* ==================================================== */}
              {activeTab === 'kontak_wa' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h4 className="text-xl font-extrabold text-[#0B1B3D]">Pengaturan Kontak & WhatsApp Penerima Pendaftaran</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah nomor WhatsApp admin tujuan saat calon santri mengirimkan formulir bimbingan Al-Qur'an.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nomor WhatsApp Tujuan Formulir MQC (Format Internasional: 628xxxxxxxx) *
                      </label>
                      <input
                        type="text"
                        value={adminSettings.mqcWhatsappTarget}
                        onChange={(e) => updateAdminSettings({ mqcWhatsappTarget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm outline-none focus:border-blue-600 bg-white"
                        placeholder="Contoh: 6281288997721"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Pesan formulir calon santri MQC akan otomatis dialihkan ke nomor WhatsApp ini saat mereka menekan tombol kirim formulir.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nomor WhatsApp Layanan Umum / Konsultasi Yayasan
                      </label>
                      <input
                        type="text"
                        value={adminSettings.generalWhatsapp}
                        onChange={(e) => updateAdminSettings({ generalWhatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 font-mono text-sm outline-none focus:border-blue-600 bg-white"
                        placeholder="Contoh: 6281288997721"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Alamat Email Resmi Yayasan
                      </label>
                      <input
                        type="email"
                        value={foundationLegal.email}
                        onChange={(e) => updateFoundationLegal({ email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Alamat Sekretariat Lengkap
                      </label>
                      <textarea
                        rows={3}
                        value={foundationLegal.alamatSekretariat}
                        onChange={(e) => updateFoundationLegal({ alamatSekretariat: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm outline-none focus:border-blue-600 bg-white"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => showSuccess('Pengaturan kontak & nomor WhatsApp berhasil disimpan!')}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan Kontak</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 3: KONTEN HERO & PROFIL YAYASAN                  */}
              {/* ==================================================== */}
              {activeTab === 'konten_hero' && (
                <div className="space-y-6 max-w-3xl">
                  <div>
                    <h4 className="text-xl font-extrabold text-[#0B1B3D]">Konten Hero & Profil Yayasan</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Ubah teks headline, foto pengajar di halaman utama (upload dari file komputer/galeri), dan data legalitas.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-5">
                    {/* Live Preview Banner */}
                    <div className="p-4 rounded-xl bg-white border border-blue-200 shadow-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5 text-blue-600" />
                          Pratinjau Langsung Hero (Live Preview)
                        </span>
                        <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold">Tampilan Pengunjung</span>
                      </div>
                      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2">
                        {heroContent.badgeHeadline && (
                          <span className="inline-block text-[10px] font-semibold text-blue-800 bg-blue-100/70 px-2 py-0.5 rounded-full">
                            {heroContent.badgeHeadline}
                          </span>
                        )}
                        <h4 className="text-base sm:text-lg font-extrabold text-[#0B1B3D]">
                          {heroContent.headline} <span className="text-blue-600">{heroContent.highlightText}</span> {heroContent.headlineSuffix || '& Berdaya'}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2">
                          {heroContent.subtitle}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-1">
                          <span className="text-[11px] font-bold text-white bg-[#0B1B3D] px-3 py-1 rounded-full">
                            {heroContent.cta1Text || "Daftar Bimbingan Qur'an"}
                          </span>
                          <span className="text-[11px] font-bold text-[#0B1B3D] bg-white border border-slate-300 px-3 py-1 rounded-full">
                            {heroContent.cta2Text || "Donasi Mari Berbagi"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2">1. Teks Judul & Subjudul Hero</h5>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Tagline / Lencana Atas (Pill Badge di Atas Judul)</label>
                      <input
                        type="text"
                        value={heroContent.badgeHeadline || ''}
                        onChange={(e) => updateHeroContent({ badgeHeadline: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        placeholder="Contoh: Yayasan Hidayah Indonesia • Dakwah & Bimbingan Al-Qur'an"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Headline Utama</label>
                        <input
                          type="text"
                          value={heroContent.headline}
                          onChange={(e) => updateHeroContent({ headline: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          placeholder="Menebar Hidayah, Membangun Generasi"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Teks Sorotan Biru</label>
                        <input
                          type="text"
                          value={heroContent.highlightText}
                          onChange={(e) => updateHeroContent({ highlightText: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          placeholder="Qur'ani"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Akhiran Judul</label>
                        <input
                          type="text"
                          value={heroContent.headlineSuffix || '& Berdaya'}
                          onChange={(e) => updateHeroContent({ headlineSuffix: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                          placeholder="& Berdaya"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul / Deskripsi Lengkap Hero</label>
                      <textarea
                        rows={3}
                        value={heroContent.subtitle}
                        onChange={(e) => updateHeroContent({ subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                      />
                    </div>

                    {/* Tombol CTA Hero */}
                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2 pt-2">2. Tombol Aksi (CTA) Hero</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol Utama (CTA 1 - Navy)</label>
                        <input
                          type="text"
                          value={heroContent.cta1Text || "Daftar Bimbingan Qur'an"}
                          onChange={(e) => updateHeroContent({ cta1Text: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium"
                          placeholder="Daftar Bimbingan Qur'an"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol Kedua (CTA 2 - Putih)</label>
                        <input
                          type="text"
                          value={heroContent.cta2Text || "Donasi Mari Berbagi"}
                          onChange={(e) => updateHeroContent({ cta2Text: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white font-medium"
                          placeholder="Donasi Mari Berbagi"
                        />
                      </div>
                    </div>

                    {/* 3 Keunggulan / Checklist di Bawah Tombol */}
                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2 pt-2">3. Poin Keunggulan / Checklist Hero</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Poin Keunggulan 1</label>
                        <input
                          type="text"
                          value={heroContent.trustPoint1 || "Metode Talaqqi Bersanad"}
                          onChange={(e) => updateHeroContent({ trustPoint1: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Poin Keunggulan 2</label>
                        <input
                          type="text"
                          value={heroContent.trustPoint2 || "Legalitas SK Kemenkumham"}
                          onChange={(e) => updateHeroContent({ trustPoint2: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Poin Keunggulan 3</label>
                        <input
                          type="text"
                          value={heroContent.trustPoint3 || "Offline & Online Zoom/GMeet"}
                          onChange={(e) => updateHeroContent({ trustPoint3: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
                        />
                      </div>
                    </div>

                    {/* Badge Melayang Kiri Atas & Kanan Bawah */}
                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2 pt-2">4. Kartu Melayang (Floating Badges)</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-blue-700 uppercase">Kartu Kiri Atas (Legalitas)</span>
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block">Label Kecil</label>
                          <input
                            type="text"
                            value={heroContent.badge1Label || "SK Kemenkumham"}
                            onChange={(e) => updateHeroContent({ badge1Label: e.target.value })}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block">Teks Utama</label>
                          <input
                            type="text"
                            value={heroContent.badge1Text || "Yayasan Resmi Terdaftar"}
                            onChange={(e) => updateHeroContent({ badge1Text: e.target.value })}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-bold"
                          />
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-blue-700 uppercase">Kartu Kanan Bawah (Statistik)</span>
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block">Angka Statistik</label>
                          <input
                            type="text"
                            value={heroContent.statNumber}
                            onChange={(e) => updateHeroContent({ statNumber: e.target.value })}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs font-extrabold"
                            placeholder="1.200+"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-500 font-semibold block">Label Statistik</label>
                          <input
                            type="text"
                            value={heroContent.statLabel}
                            onChange={(e) => updateHeroContent({ statLabel: e.target.value })}
                            className="w-full px-2.5 py-1.5 border rounded-lg text-xs"
                            placeholder="Santri & Jemaah Aktif"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Foto Hero: Upload dari Galeri atau URL */}
                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2 pt-2">5. Foto Hero Pengajar</h5>
                    <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                        <div className="relative group shrink-0">
                          <img
                            src={heroContent.imageUrl}
                            alt={heroContent.imageAlt || "Hero Preview"}
                            className="w-24 h-32 object-cover rounded-xl border border-slate-300 shadow-sm"
                          />
                          <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded font-mono">
                            Preview
                          </span>
                        </div>

                        <div className="space-y-2.5 flex-1">
                          <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">
                              Upload Foto dari Perangkat (Galeri HP / File Komputer)
                            </label>
                            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-sm transition-all">
                              <Upload className="w-4 h-4" />
                              <span>Pilih File Gambar</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleFileUpload(file, (url) => {
                                      updateHeroContent({ imageUrl: url });
                                      showSuccess('Foto hero berhasil diunggah!');
                                    });
                                  }
                                }}
                              />
                            </label>
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Atau Masukkan URL Gambar Langsung</label>
                            <input
                              type="text"
                              placeholder="https://..."
                              value={heroContent.imageUrl}
                              onChange={(e) => updateHeroContent({ imageUrl: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-slate-500 font-semibold block mb-0.5">Teks Alt / Keterangan Foto</label>
                            <input
                              type="text"
                              placeholder="Pengajar Madrasah Qur'an Center Hidayah Indonesia"
                              value={heroContent.imageAlt || ''}
                              onChange={(e) => updateHeroContent({ imageAlt: e.target.value })}
                              className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-700 bg-white"
                            />
                          </div>

                          {/* Quick Presets */}
                          <div className="pt-1">
                            <span className="text-[10px] text-slate-500 block mb-1">Pilihan Cepat Foto Islami Rekomendasi:</span>
                            <div className="flex flex-wrap gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  updateHeroContent({ imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80' });
                                  showSuccess('Foto hero diganti ke Guru Qur\'an 1');
                                }}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[10px] text-slate-700 font-medium border border-slate-200"
                              >
                                Foto Guru Qur'an 1
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updateHeroContent({ imageUrl: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=1000&auto=format&fit=crop&q=80' });
                                  showSuccess('Foto hero diganti ke Mushaf & Halaqah');
                                }}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[10px] text-slate-700 font-medium border border-slate-200"
                              >
                                Mushaf & Halaqah
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updateHeroContent({ imageUrl: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=1000&auto=format&fit=crop&q=80' });
                                  showSuccess('Foto hero diganti ke Belajar Qur\'an');
                                }}
                                className="px-2 py-1 rounded bg-slate-100 hover:bg-blue-50 text-[10px] text-slate-700 font-medium border border-slate-200"
                              >
                                Belajar Qur'an
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Legalitas Yayasan */}
                    <h5 className="font-bold text-sm text-[#0B1B3D] border-b border-slate-200 pb-2 pt-4">Legalitas Yayasan</h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">SK Kemenkumham RI</label>
                        <input
                          type="text"
                          value={foundationLegal.skKemenkumham}
                          onChange={(e) => updateFoundationLegal({ skKemenkumham: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">Akta Pendirian Notaris</label>
                        <input
                          type="text"
                          value={foundationLegal.aktaNotaris}
                          onChange={(e) => updateFoundationLegal({ aktaNotaris: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">NPWP Yayasan</label>
                        <input
                          type="text"
                          value={foundationLegal.npwp}
                          onChange={(e) => updateFoundationLegal({ npwp: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-600 block mb-1">NIB</label>
                        <input
                          type="text"
                          value={foundationLegal.nib}
                          onChange={(e) => updateFoundationLegal({ nib: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <button
                        onClick={() => showSuccess('Konten Hero dan Legalitas berhasil disimpan!')}
                        className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan Perubahan Profil</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 4: KELOLA PILAR DAKWAH & UNIT                    */}
              {/* ==================================================== */}
              {activeTab === 'pilar_units' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#0B1B3D]">Kelola Pilar & Unit Dakwah</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Edit konten dari masing-masing unit dakwah di bawah naungan Hidayah Indonesia.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {units.map((unit) => (
                      <div key={unit.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                              Pilar {unit.pillar}
                            </span>
                            <h5 className="font-bold text-sm text-[#0B1B3D] mt-1">{unit.name}</h5>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-500">Slogan / Tagline</label>
                          <input
                            type="text"
                            value={unit.tagline}
                            onChange={(e) => updateUnit(unit.id, { tagline: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-500">Deskripsi Lengkap</label>
                          <textarea
                            rows={2}
                            value={unit.description}
                            onChange={(e) => updateUnit(unit.id, { description: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-500">Akses / Lokasi</label>
                          <input
                            type="text"
                            value={unit.channel}
                            onChange={(e) => updateUnit(unit.id, { channel: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs bg-white"
                          />
                        </div>

                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={() => showSuccess(`Perubahan unit ${unit.name} berhasil disimpan.`)}
                            className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900"
                          >
                            Simpan Unit
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 5: KELOLA ARTIKEL & KAJIAN                        */}
              {/* ==================================================== */}
              {activeTab === 'artikel' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#0B1B3D]">Kelola Artikel & Isi Kajian</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tambah, edit, dan upload foto artikel kajian dari galeri/file komputer.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingArticle(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tulis Artikel Baru</span>
                    </button>
                  </div>

                  {/* Form Tambah Artikel Baru */}
                  {isAddingArticle && (
                    <AddArticleForm
                      onCancel={() => setIsAddingArticle(false)}
                      onSave={(data) => {
                        addArticle(data);
                        setIsAddingArticle(false);
                        showSuccess('Artikel baru berhasil dipublikasikan!');
                      }}
                      handleFileUpload={handleFileUpload}
                    />
                  )}

                  {/* List Artikel */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {articles.map((art) => (
                      <div key={art.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={art.imageUrl}
                              alt={art.title}
                              className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                {art.category}
                              </span>
                              <h5 className="font-bold text-sm text-[#0B1B3D] mt-1 leading-snug">{art.title}</h5>
                              <p className="text-[11px] text-slate-400 mt-0.5">{art.author} • {art.date}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{art.excerpt}</p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                          <label className="text-[11px] font-semibold text-blue-600 cursor-pointer hover:underline flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Ganti Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  handleFileUpload(f, (url) => {
                                    updateArticle(art.id, { imageUrl: url });
                                    showSuccess('Foto artikel berhasil diperbarui.');
                                  });
                                }
                              }}
                            />
                          </label>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                const newTitle = prompt('Ubah judul artikel:', art.title);
                                if (newTitle) {
                                  updateArticle(art.id, { title: newTitle });
                                  showSuccess('Judul artikel berhasil diperbarui.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Edit Judul"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus artikel "${art.title}"?`)) {
                                  deleteArticle(art.id);
                                  showSuccess('Artikel berhasil dihapus.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 6: KELOLA AGENDA KEGIATAN                         */}
              {/* ==================================================== */}
              {activeTab === 'kegiatan' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#0B1B3D]">Kelola Agenda Kegiatan & Kajian</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Tambah, edit, dan upload poster kajian dari file galeri.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingEvent(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Kegiatan Baru</span>
                    </button>
                  </div>

                  {/* Form Tambah Event Baru */}
                  {isAddingEvent && (
                    <AddEventForm
                      onCancel={() => setIsAddingEvent(false)}
                      onSave={(data) => {
                        addEvent(data);
                        setIsAddingEvent(false);
                        showSuccess('Kegiatan baru berhasil ditambahkan!');
                      }}
                      handleFileUpload={handleFileUpload}
                    />
                  )}

                  {/* List Kegiatan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((evt) => (
                      <div key={evt.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-3 mb-3">
                            <img
                              src={evt.imageUrl}
                              alt={evt.title}
                              className="w-20 h-20 object-cover rounded-xl border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                {evt.category}
                              </span>
                              <h5 className="font-bold text-sm text-[#0B1B3D] mt-1 leading-snug">{evt.title}</h5>
                              <p className="text-[11px] text-slate-500 mt-0.5">{evt.date} • {evt.time}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-1">
                            <strong>Narasumber:</strong> {evt.speaker}
                          </p>
                          <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">
                            <strong>Lokasi:</strong> {evt.location}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                          <label className="text-[11px] font-semibold text-blue-600 cursor-pointer hover:underline flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Ganti Poster</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  handleFileUpload(f, (url) => {
                                    updateEvent(evt.id, { imageUrl: url });
                                    showSuccess('Poster kegiatan berhasil diperbarui.');
                                  });
                                }
                              }}
                            />
                          </label>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                const newTitle = prompt('Ubah judul kegiatan:', evt.title);
                                if (newTitle) {
                                  updateEvent(evt.id, { title: newTitle });
                                  showSuccess('Judul kegiatan berhasil diperbarui.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                              title="Edit Judul"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Hapus kegiatan "${evt.title}"?`)) {
                                  deleteEvent(evt.id);
                                  showSuccess('Kegiatan berhasil dihapus.');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                              title="Hapus"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================================================== */}
              {/* TAB 7: KELOLA TESTIMONI                               */}
              {/* ==================================================== */}
              {activeTab === 'testimoni' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-extrabold text-[#0B1B3D]">Kelola Testimoni Umat</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kyai/Ulama, Jemaah, Donatur, Orang Tua Asuh, dan Wali Santri MQC.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingTesti(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900 transition-colors shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Testimoni</span>
                    </button>
                  </div>

                  {/* Form Tambah Testimoni Baru */}
                  {isAddingTesti && (
                    <AddTestiForm
                      onCancel={() => setIsAddingTesti(false)}
                      onSave={(data) => {
                        addTestimonial(data);
                        setIsAddingTesti(false);
                        showSuccess('Testimoni baru berhasil ditambahkan!');
                      }}
                      handleFileUpload={handleFileUpload}
                    />
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((testi) => (
                      <div key={testi.id} className="p-4 rounded-2xl border border-slate-200 bg-white flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={testi.avatar}
                              alt={testi.name}
                              className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                            />
                            <div>
                              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                                {testi.category}
                              </span>
                              <h5 className="font-bold text-xs text-[#0B1B3D] mt-0.5">{testi.name}</h5>
                              <p className="text-[10px] text-slate-500">{testi.role}</p>
                            </div>
                          </div>
                          <p className="text-xs text-slate-600 italic line-clamp-3 leading-relaxed">
                            "{testi.quote}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
                          <label className="text-[11px] font-semibold text-blue-600 cursor-pointer hover:underline flex items-center gap-1">
                            <ImageIcon className="w-3.5 h-3.5" />
                            <span>Ganti Foto</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const f = e.target.files?.[0];
                                if (f) {
                                  handleFileUpload(f, (url) => {
                                    updateTestimonial(testi.id, { avatar: url });
                                    showSuccess('Foto profil testimoni berhasil diperbarui.');
                                  });
                                }
                              }}
                            />
                          </label>

                          <button
                            onClick={() => {
                              if (confirm(`Hapus testimoni dari ${testi.name}?`)) {
                                deleteTestimonial(testi.id);
                                showSuccess('Testimoni berhasil dihapus.');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                            title="Hapus"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </main>
          </div>
        )}

      </div>

      {/* Modal Detail Santri Pendaftar */}
      {selectedRegDetail && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setSelectedRegDetail(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full uppercase">
              Detail Pendaftar MQC
            </span>
            <h3 className="text-xl font-bold text-[#0B1B3D] mt-2">{selectedRegDetail.fullName}</h3>
            <p className="text-xs text-slate-500">ID: {selectedRegDetail.id} • Didaftar: {selectedRegDetail.registrationDate}</p>

            <div className="space-y-2.5 my-5 text-xs text-slate-700 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <p><strong>WhatsApp:</strong> {selectedRegDetail.phoneWhatsapp}</p>
              <p><strong>Kategori & Usia:</strong> {selectedRegDetail.gender} • {selectedRegDetail.age} tahun</p>
              <p><strong>Kota / Domisili:</strong> {selectedRegDetail.addressCity}</p>
              <p><strong>Mode Belajar:</strong> {selectedRegDetail.mode}</p>
              <p><strong>Tipe Kelas:</strong> {selectedRegDetail.classType}</p>
              <p><strong>Level Pilihan:</strong> {selectedRegDetail.level}</p>
              <p><strong>Jadwal:</strong> {selectedRegDetail.selectedDays} (Pukul {selectedRegDetail.selectedTime} WIB)</p>
              <p><strong>Infaq Bulanan:</strong> {selectedRegDetail.selectedInfaq}</p>
              <p><strong>Catatan Santri:</strong> {selectedRegDetail.notes || '-'}</p>
            </div>

            {/* Catatan Admin Internal */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Admin Internal:</label>
              <textarea
                rows={2}
                value={selectedRegDetail.adminNotes || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedRegDetail({ ...selectedRegDetail, adminNotes: val });
                  updateRegistration(selectedRegDetail.id, { adminNotes: val });
                }}
                placeholder="Tulis catatan tindak lanjut admin di sini..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${selectedRegDetail.phoneWhatsapp.replace(/^0/, '62').replace(/\D/g, '')}?text=${encodeURIComponent(`Assalamu'alaikum wr. wb. Saudara/i ${selectedRegDetail.fullName}, kami dari Admin Madrasah Qur'an Center (MQC) Hidayah Indonesia...`)}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Kirim Pesan WhatsApp</span>
              </a>

              <button
                onClick={() => setSelectedRegDetail(null)}
                className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Tambah Santri Manual */}
      {isAddingReg && (
        <AddSantriManualModal
          onClose={() => setIsAddingReg(false)}
          onSave={(data) => {
            addRegistration(data);
            setIsAddingReg(false);
            showSuccess('Santri pendaftar baru berhasil ditambahkan secara manual.');
          }}
        />
      )}

    </div>
  );
};

// Sub-component: Form Tambah Artikel Baru
const AddArticleForm: React.FC<{
  onCancel: () => void;
  onSave: (data: Omit<ArticleItem, 'id'>) => void;
  handleFileUpload: (file: File, callback: (url: string) => void) => void;
}> = ({ onCancel, onSave, handleFileUpload }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Tajwid & Al-Quran');
  const [author, setAuthor] = useState('Ustadz Hidayah Indonesia');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert('Mohon lengkapi judul dan isi artikel');
    onSave({
      title,
      slug: title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-'),
      category,
      author,
      authorRole: 'Asatidzah Yayasan Hidayah Indonesia',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '4 menit baca',
      excerpt: excerpt || content.substring(0, 120) + '...',
      content,
      imageUrl
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h5 className="font-bold text-sm text-[#0B1B3D]">Form Artikel Baru</h5>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Judul Artikel *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Kategori *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          >
            <option value="Tajwid & Al-Quran">Tajwid & Al-Quran</option>
            <option value="Tafsir">Tafsir</option>
            <option value="Tazkiyatun Nafs">Tazkiyatun Nafs</option>
            <option value="Sosial & Wakaf">Sosial & Wakaf</option>
            <option value="Kabar Yayasan">Kabar Yayasan</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Kutipan Singkat (Excerpt)</label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Ringkasan 1-2 kalimat..."
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Isi Lengkap Artikel *</label>
        <textarea
          rows={5}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tuliskan isi kajian selengkapnya di sini..."
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
        />
      </div>

      {/* Upload Foto Artikel */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
        <img src={imageUrl} alt="Preview" className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0" />
        <div className="flex-1 space-y-1">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Foto dari Galeri</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f, setImageUrl);
              }}
            />
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded"
            placeholder="Atau link URL foto..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-200">
          Batal
        </button>
        <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900">
          Publikasikan Artikel
        </button>
      </div>
    </form>
  );
};

// Sub-component: Form Tambah Kegiatan Baru
const AddEventForm: React.FC<{
  onCancel: () => void;
  onSave: (data: Omit<EventItem, 'id'>) => void;
  handleFileUpload: (file: File, callback: (url: string) => void) => void;
}> = ({ onCancel, onSave, handleFileUpload }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Kajian Rutin');
  const [date, setDate] = useState('Ahad, 15 November 2026');
  const [time, setTime] = useState('08.30 - 11.30 WIB');
  const [location, setLocation] = useState('Aula Hidayah Indonesia, Jatimekar & Live Zoom');
  const [speaker, setSpeaker] = useState('Ust. Muhammad Ridwan, Al-Hafizh');
  const [speakerTitle, setSpeakerTitle] = useState('Ketua Yayasan Hidayah Indonesia');
  const [price, setPrice] = useState('Gratis (Infaq Sukarela)');
  const [quotaStatus, setQuotaStatus] = useState('Terbuka 200 Jemaah');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return alert('Mohon isi judul kegiatan');
    onSave({
      title,
      category,
      date,
      time,
      location,
      isOnline: location.toLowerCase().includes('zoom') || location.toLowerCase().includes('online'),
      speaker,
      speakerTitle,
      price,
      quotaStatus,
      imageUrl
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h5 className="font-bold text-sm text-[#0B1B3D]">Form Kegiatan / Kajian Baru</h5>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Judul Kegiatan *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Kegiatan *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          >
            <option value="Kajian Rutin">Kajian Rutin</option>
            <option value="Program Sanad">Program Sanad</option>
            <option value="Aksi Sosial">Aksi Sosial</option>
            <option value="Safari Dakwah">Safari Dakwah</option>
            <option value="Dauroh">Dauroh</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Hari & Tanggal *</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Jam Pelaksanaan *</label>
          <input
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Biaya / Infaq</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Narasumber / Penceramah</label>
          <input
            type="text"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Lokasi Kegiatan</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
      </div>

      {/* Upload Poster */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
        <img src={imageUrl} alt="Poster" className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0" />
        <div className="flex-1 space-y-1">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Poster dari Galeri</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f, setImageUrl);
              }}
            />
          </label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded"
            placeholder="Atau link URL poster..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-200">
          Batal
        </button>
        <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900">
          Simpan Kegiatan
        </button>
      </div>
    </form>
  );
};

// Sub-component: Form Tambah Testimoni Baru
const AddTestiForm: React.FC<{
  onCancel: () => void;
  onSave: (data: Omit<TestimonialItem, 'id'>) => void;
  handleFileUpload: (file: File, callback: (url: string) => void) => void;
}> = ({ onCancel, onSave, handleFileUpload }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<any>('Jemaah');
  const [role, setRole] = useState('Jemaah Majlis');
  const [quote, setQuote] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quote) return alert('Mohon isi nama dan kalimat testimoni');
    onSave({
      name,
      category,
      role,
      quote,
      avatar,
      rating: 5
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-slate-50 border border-slate-300 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <h5 className="font-bold text-sm text-[#0B1B3D]">Form Testimoni Baru</h5>
        <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Nama Tokoh / Jemaah *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Testimoni *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          >
            <option value="Ulama/Kyai">Ulama/Kyai</option>
            <option value="Jemaah">Jemaah</option>
            <option value="Donatur">Donatur</option>
            <option value="Orang Tua Asuh">Orang Tua Asuh</option>
            <option value="Wali Santri">Wali Santri</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Peran / Status</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1">Isi Testimoni / Kutipan *</label>
        <textarea
          rows={3}
          required
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white"
        />
      </div>

      {/* Upload Foto Avatar */}
      <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
        <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" />
        <div className="flex-1 space-y-1">
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span>Upload Foto Profil dari Galeri</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFileUpload(f, setAvatar);
              }}
            />
          </label>
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="w-full px-2 py-1 text-[11px] border border-slate-200 rounded"
            placeholder="Atau link URL avatar..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-200">
          Batal
        </button>
        <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#0B1B3D] hover:bg-blue-900">
          Simpan Testimoni
        </button>
      </div>
    </form>
  );
};

// Sub-component: Form Tambah Santri Manual
const AddSantriManualModal: React.FC<{
  onClose: () => void;
  onSave: (data: Omit<MQCRegistrationRecord, 'id' | 'registrationDate' | 'status'>) => void;
}> = ({ onClose, onSave }) => {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState<'Ikhwan' | 'Akhwat'>('Ikhwan');
  const [age, setAge] = useState('20');
  const [phoneWhatsapp, setPhoneWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [mode, setMode] = useState<'Offline' | 'Online'>('Offline');
  const [classType, setClassType] = useState<'Kelas Reguler' | 'Kelas Privat'>('Kelas Reguler');
  const [level, setLevel] = useState<'Level Pemula' | 'Level Tahsin' | 'Level Tahfizh'>('Level Tahsin');
  const [selectedDays, setSelectedDays] = useState('Senin & Rabu');
  const [selectedTime, setSelectedTime] = useState('20.00');
  const [selectedInfaq, setSelectedInfaq] = useState<'Rp. 100.000' | 'Rp. 150.000'>('Rp. 100.000');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phoneWhatsapp) return alert('Mohon isi nama dan nomor WhatsApp');
    onSave({
      fullName,
      gender,
      age,
      phoneWhatsapp,
      email,
      addressCity,
      mode,
      classType,
      level,
      selectedDays,
      selectedTime,
      selectedInfaq,
      notes
    });
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
        <button onClick={onClose} className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <h4 className="text-lg font-bold text-[#0B1B3D] mb-4">Input Data Santri Manual</h4>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Santri *</label>
            <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
              <select value={gender} onChange={e => setGender(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="Ikhwan">Ikhwan</option>
                <option value="Akhwat">Akhwat</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Usia (Tahun)</label>
              <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">No. WhatsApp *</label>
              <input type="tel" required placeholder="08xxxxxxxx" value={phoneWhatsapp} onChange={e => setPhoneWhatsapp(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kota Domisili</label>
              <input type="text" placeholder="Bekasi / Jakarta" value={addressCity} onChange={e => setAddressCity(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mode Belajar *</label>
              <select value={mode} onChange={e => setMode(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="Offline">Offline (Bekasi)</option>
                <option value="Online">Online (Zoom/WA)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tipe Kelas *</label>
              <select value={classType} onChange={e => setClassType(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="Kelas Reguler">Kelas Reguler</option>
                <option value="Kelas Privat">Kelas Privat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Level Belajar *</label>
              <select value={level} onChange={e => setLevel(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="Level Pemula">Level Pemula</option>
                <option value="Level Tahsin">Level Tahsin</option>
                <option value="Level Tahfizh">Level Tahfizh</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Infaq Pilihan</label>
              <select value={selectedInfaq} onChange={e => setSelectedInfaq(e.target.value as any)} className="w-full px-3 py-2 border rounded-xl bg-white">
                <option value="Rp. 100.000">Rp. 100.000</option>
                <option value="Rp. 150.000">Rp. 150.000</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pilihan Hari</label>
              <input type="text" value={selectedDays} onChange={e => setSelectedDays(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pilihan Jam</label>
              <input type="text" value={selectedTime} onChange={e => setSelectedTime(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Catatan Pendaftar</label>
            <textarea rows={2} value={notes} onChange={e => setNotes(e.target.value)} className="w-full px-3 py-2 border rounded-xl" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 font-semibold">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl font-bold text-white bg-[#0B1B3D] hover:bg-blue-900">
              Simpan Data Santri
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
