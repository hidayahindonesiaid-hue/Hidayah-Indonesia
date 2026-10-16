import { UnitDakwah, IndividualUnitDakwah, LegalitasInfo, PengurusItem, TestimonialItem, ArticleItem, EventItem } from '../types';

export const FOUNDATION_LEGAL: LegalitasInfo = {
  skKemenkumham: 'AHU-0018924.AH.01.04.Tahun 2021',
  aktaNotaris: 'Akta Pendirian No. 14 / Notaris Hj. Siti Rohmah, S.H., M.Kn.',
  npwp: '42.871.932.1-432.000',
  nib: '1238000491823',
  tandaDaftarDinsos: '460/182-Dinsos/2022',
  alamatSekretariat: 'Jl. Raya Jatimekar, RT.001/RW.011 No.339, Jatimekar, Kec. Jatiasih, Kota Bekasi, Jawa Barat 17422',
  kontakTelepon: '+62 812-8899-7721',
  email: 'hidayahindonesia.id@gmail.com',
};

export const VISI_MISI = {
  visi: "Menjadi lembaga dakwah, pendidikan Al-Qur'an, dan sosial terdepan yang profesional, amanah, dan bersanad dalam mewujudkan peradaban umat yang mulia, cerdas, dan mandiri berlandaskan Al-Qur'an dan As-Sunnah.",
  misi: [
    "Menyelenggarakan bimbingan belajar Al-Qur'an bersanad, mudah dipahami, dan berkualitas tinggi untuk ikhwan dan akhwat dari segala usia.",
    "Mencetak penghafal Al-Qur'an (Hafizh/Hafizhah) mutqin dan berakhlak mulia melalui Markaz Hidayah Qur'an.",
    "Menggerakkan kepedulian sosial, santunan yatim, kafalah dai/guru ngaji, dan pemberdayaan dhuafa secara transparan melalui 'Mari Berbagi'.",
    "Menyebarkan syiar Islam rahmatan lil 'alamin dan tazkiyatun nafs melalui media digital HI Media dan Majlis Qolbun Muneeb.",
    "Membangun kemandirian ekonomi yayasan dan umat melalui unit usaha syariah HI Mart."
  ],
  nilai: [
    { label: "Amanah", desc: "Transparan, akuntabel, dan bertanggung jawab dunia akhirat." },
    { label: "Bersanad", desc: "Pengajaran Al-Qur'an dengan silsilah talaqqi terpercaya hingga Rasulullah SAW." },
    { label: "Profesional", desc: "Manajemen tertib dengan pelayanan ramah, tulus, dan terstandar." },
    { label: "Peduli Umat", desc: "Hadir merangkul setiap kalangan tanpa membedakan status sosial." }
  ]
};

export const UNITS_DAKWAH: UnitDakwah[] = [
  {
    id: 'pendidikan',
    category: 'Pendidikan',
    name: "Pendidikan Al-Qur'an",
    shortName: "MQC & MHQ",
    tagline: "Membina Generasi Qur'ani Bersanad & Mutqin",
    description: "Pusat bimbingan baca Al-Qur'an dari nol hingga tahsin dan tahfizh mutqin dengan sanad bersambung.",
    subUnits: [
      "Madrasah Qur'an Center (MQC)",
      "Markaz Hidayah Qur'an (MHQ)"
    ],
    features: [
      "Metode Talaqqi & Iqro interaktif",
      "Kelas Reguler & Privat (Offline/Online)",
      "Program Dauroh & Sertifikasi Sanad",
      "Karantina Tahfizh Ikhwan & Akhwat"
    ],
    icon: 'GraduationCap',
    internalRoute: 'mqc',
    externalUrl: 'https://hidayahindonesia.org/mqc',
    highlighted: false,
    accentColor: '#1E40AF'
  },
  {
    id: 'sosial',
    category: 'Sosial',
    name: "Sosial Kemanusiaan",
    shortName: "Mari Berbagi",
    tagline: "Jembatan Kebaikan untuk Yatim, Dhuafa & Guru Ngaji",
    description: "Platform dan divisi sosial resmi Yayasan Hidayah Indonesia untuk menyalurkan sedekah, infaq, dan wakaf produktif.",
    subUnits: [
      "Mari Berbagi (mariberbagi.net)",
      "Sedekah Al-Qur'an Pelosok",
      "Kafalah Guru Ngaji & Dai",
      "Beasiswa Yatim Penghafal Qur'an"
    ],
    features: [
      "Penyaluran 100% tepat sasaran & transparan",
      "Laporan donasi real-time & foto dokumentasi",
      "Program tebar 10.000 mushaf Al-Qur'an",
      "Bantuan sembako & pengobatan dhuafa"
    ],
    icon: 'HeartHandshake',
    externalUrl: 'https://mariberbagi.net',
    internalRoute: 'donation',
    highlighted: false,
    accentColor: '#2563EB'
  },
  {
    id: 'dakwah',
    category: 'Dakwah',
    name: "Syiar & Majlis Ilmu",
    shortName: "HI Media & Majlis Qolbun Muneeb",
    tagline: "Menyentuh Qolbu, Menebar Hikmah & Kesejukan Iman",
    description: "Kajian rutin tematik, muhasabah hati, serta syiar audio-visual modern melalui multi-platform media sosial.",
    subUnits: [
      "HI Media (Podcast & Kreatif)",
      "Majlis Qolbun Muneeb",
      "Safari Dakwah Komunitas",
      "Kajian Tazkiyatun Nafs"
    ],
    features: [
      "Kajian Ahad Pagi & Malam Pekanan",
      "Dzikir, Doa & Muhasabah Qolbu",
      "Reels Tajwid & Pengetahuan Islam",
      "Live Streaming YouTube & Sosmed"
    ],
    icon: 'Radio',
    externalUrl: 'https://youtube.com/@hidayahindonesia',
    internalRoute: 'events',
    highlighted: false,
    accentColor: '#0EA5E9'
  },
  {
    id: 'bisnis',
    category: 'Bisnis',
    name: "Kemandirian Umat",
    shortName: "HI Mart",
    tagline: "Belanja Berkah, Keuntungan untuk Dakwah & Santri",
    description: "Unit usaha syariah penunjang operasional dakwah: menyediakan buku tajwid ringkas, mushaf Qur'an, busana muslim, dan herbal.",
    subUnits: [
      "Buku Tajwid & Panduan Makhorijul Huruf",
      "Mushaf Al-Qur'an Standar Kemenag & Hafalan",
      "Busana Muslim Syar'i & Merchandise",
      "Madu Murni & Produk Herbal Sunnah"
    ],
    features: [
      "Keuntungan 100% mendukung operasional dakwah",
      "Menyediakan buku wajib peserta MQC",
      "Pengiriman ke seluruh pelosok Indonesia",
      "Katalog produk syariah berkah & halal"
    ],
    icon: 'ShoppingBag',
    externalUrl: 'https://tokopedia.com/himartofficial',
    internalRoute: 'units',
    highlighted: true, // Special styling matching the dark navy card in user's image!
    accentColor: '#0F172A'
  }
];

export const ALL_INDIVIDUAL_UNITS: IndividualUnitDakwah[] = [
  {
    id: 'mqc',
    pillar: 'Pendidikan',
    name: "Madrasah Qur'an Center (MQC)",
    badge: "Bimbingan Belajar Al-Qur'an",
    tagline: "Bimbingan Belajar Al-Qur'an Bersanad Metode Talaqqi & Iqro (Ikhwan & Akhwat)",
    description: "Pusat bimbingan membaca Al-Qur'an terpadu dari tingkat dasar nol hingga mahir tajwid dan tahfizh. Menyediakan kelas reguler dan privat dengan pengajar bersanad, baik secara tatap muka (offline) di Jatimekar Bekasi maupun jarak jauh (online) via Zoom, Google Meet, dan WA Grup.",
    programs: [
      "Kelas Reguler (5-8 santri / kelompok intensif)",
      "Kelas Privat One-on-One personal",
      "Level 1: Pemula (Nol & Iqro)",
      "Level 2: Tahsin & Makhorijul Huruf",
      "Level 3: Tahfizh Hafalan Mutqin"
    ],
    features: [
      "Metode Talaqqi terbukti mudah dipahami",
      "Gratis biaya pendaftaran Rp 50.000",
      "Pilihan jam: 05.00, 09.00, 16.00, 20.00 WIB",
      "Pengajar lulusan sanad qira'ah resmi",
      "Free Buku Tajwid Ringkas (5 Pendaftar Pertama)"
    ],
    targetAudience: "Mulai usia 13 tahun, Remaja, Mahasiswa, Pekerja, hingga Lansia",
    channel: "Offline (Jatimekar, Bekasi) & Online (Zoom / GMeet / WA)",
    actionText: "Buka Halaman Lengkap MQC",
    internalRoute: 'mqc',
    icon: 'GraduationCap',
    accentBg: 'bg-blue-50',
    accentText: 'text-blue-700',
    isFlagship: true
  },
  {
    id: 'mhq',
    pillar: 'Pendidikan',
    name: "Markaz Hidayah Qur'an (MHQ)",
    badge: "Karantina & Kaderisasi Tahfizh",
    tagline: "Kaderisasi Penghafal Al-Qur'an Mutqin 30 Juz & Pengambilan Sanad Qira'ah",
    description: "Lembaga kaderisasi santri tahfizh intensif yang mencetak huffazh Al-Qur'an berakhlak mulia dengan hafalan mutqin (kokoh) serta menyelenggarakan dauroh sanad qira'ah riwayat Hafsh 'an 'Ashim jalur Asy-Syathibiyyah.",
    programs: [
      "Karantina Tahfizh Intensif 30 Juz Mutqin",
      "Dauroh Sanad Matan Al-Jazariyyah & Tuhfatul Athfal",
      "Program Ujian Tasmi' Bil Ghaib Sekali Duduk",
      "Kaderisasi Dai & Pengajar Al-Qur'an Bersanad"
    ],
    features: [
      "Asrama terpisah kondusif & asatidzah mukim",
      "Ijazah sanad bersambung hingga Rasulullah SAW",
      "Sistem murajaah harian terukur & tasmi'",
      "Program beasiswa penuh santri dhuafa berprestasi"
    ],
    targetAudience: "Santri Ikhwan & Akhwat lulusan SMP/SMA yang ingin mutqin 30 juz",
    channel: "Pondok Tahfizh MHQ & Dauroh Khusus",
    actionText: "Pelajari Program MHQ",
    internalRoute: 'events',
    icon: 'BookOpen',
    accentBg: 'bg-indigo-50',
    accentText: 'text-indigo-700'
  },
  {
    id: 'mariberbagi',
    pillar: 'Sosial',
    name: "Mari Berbagi (mariberbagi.net)",
    badge: "Filantropi & Kemanusiaan",
    tagline: "Jembatan Kebaikan untuk Sedekah Al-Qur'an, Yatim, Dhuafa & Guru Ngaji",
    description: "Divisi sosial dan kemanusiaan resmi Yayasan Hidayah Indonesia yang mengelola dan menyalurkan sedekah, infaq, dan wakaf Al-Qur'an secara profesional, amanah, dan transparan melalui platform mariberbagi.net.",
    programs: [
      "Tebar Wakaf Al-Qur'an ke Pelosok Nusantara",
      "Kafalah & Tunjangan Guru Ngaji Bersanad",
      "Beasiswa Pendidikan Santri Yatim & Dhuafa",
      "Paket Sembako Berkah, Khitanan Massal & Bantuan Bencana"
    ],
    features: [
      "Laporan penyaluran transparan dan terdokumentasi",
      "Rekening yayasan resmi BSI, Mandiri, BCA",
      "Konfirmasi donasi instan via WhatsApp",
      "Platform digital terintegrasi mariberbagi.net"
    ],
    targetAudience: "Mustahiq dhuafa, anak yatim binaan, guru ngaji pelosok",
    channel: "Platform mariberbagi.net & Relawan Lapangan",
    actionText: "Salurkan Donasi di mariberbagi.net",
    externalUrl: "https://mariberbagi.net",
    internalRoute: 'donation',
    icon: 'HeartHandshake',
    accentBg: 'bg-rose-50',
    accentText: 'text-rose-700',
    isFlagship: true
  },
  {
    id: 'himedia',
    pillar: 'Dakwah',
    name: "HI Media",
    badge: "Multimedia & Syiar Digital",
    tagline: "Rumah Produksi Syiar Kreatif, Podcast Dakwah, & Konten Tajwid Modern",
    description: "Divisi multimedia penyiaran dakwah yang memproduksi konten audio-visual edukatif, rekaman kajian ilmiah para asatidzah, podcast 'Cahaya Hidayah', serta video panduan makhorijul huruf yang mudah dipahami.",
    programs: [
      "Podcast Inspirasi 'Cahaya Hidayah'",
      "Reels & Short Video Panduan Tajwid Aplikatif",
      "Live Streaming Kajian Rutin Pekanan",
      "Publikasi Artikel Tafsir & Tazkiyatun Nafs"
    ],
    features: [
      "Format konten visual modern ramah anak muda",
      "Kualitas produksi audio-visual full HD",
      "Distribusi YouTube, Instagram, TikTok, & Spotify",
      "Menjawab persoalan aqidah & ibadah harian"
    ],
    targetAudience: "Netizen muslim, pemuda hijrah, keluarga, jemaah umum",
    channel: "YouTube @hidayahindonesia, Instagram, TikTok, Podcast",
    actionText: "Tonton Kanal HI Media",
    externalUrl: "https://youtube.com/@hidayahindonesia",
    internalRoute: 'events',
    icon: 'Radio',
    accentBg: 'bg-sky-50',
    accentText: 'text-sky-700'
  },
  {
    id: 'qolbunmuneeb',
    pillar: 'Dakwah',
    name: "Majlis Qolbun Muneeb",
    badge: "Majlis Ilmu & Pembinaan Qolbu",
    tagline: "Menyentuh Qolbu, Menghidupkan Dzikir, & Mempererat Ukhuwah Umat",
    description: "Majlis ta'lim rutin pembinaan hati dan tazkiyatun nafs berlandaskan Al-Qur'an dan Sunnah. Menghadirkan siraman rohani yang menyejukkan jiwa, dzikir pagi petang, muhasabah, dan kajian tematik keluarga sakinah.",
    programs: [
      "Kajian Akbar Rutin Ahad Pagi",
      "Majlis Dzikir & Muhasabah Qolbu",
      "Kajian Tematik Fiqih Keluarga & Tazkiyatun Nafs",
      "Safari Dakwah Komunitas & Halaqah Jemaah"
    ],
    features: [
      "Suasana majlis yang hangat, teduh, dan penuh kekeluargaan",
      "Terbuka untuk ikhwan, akhwat, dan keluarga",
      "Sesi tanya jawab interaktif seputar problematika hati",
      "Sistem hybrid: hadir di aula yayasan atau via Zoom"
    ],
    targetAudience: "Jemaah umum, keluarga muslim, komunitas taklim",
    channel: "Aula Hidayah Indonesia (Jatimekar) & Live Zoom",
    actionText: "Lihat Jadwal Majlis Qolbun Muneeb",
    internalRoute: 'events',
    icon: 'Sparkles',
    accentBg: 'bg-amber-50',
    accentText: 'text-amber-800'
  },
  {
    id: 'himart',
    pillar: 'Bisnis',
    name: "HI Mart (Hidayah Mart)",
    badge: "Kemandirian Ekonomi Syariah",
    tagline: "Belanja Berkah, 100% Keuntungan untuk Operasional Dakwah & Santri",
    description: "Unit usaha syariah penunjang kemandirian dakwah yayasan. Menyediakan buku tajwid ringkas resmi MQC, mushaf Al-Qur'an hafalan standar Kemenag RI, busana muslim syar'i, serta madu murni & produk herbal sunnah.",
    programs: [
      "Penyediaan Buku Tajwid Ringkas Resmi MQC",
      "Pengadaan Mushaf Al-Qur'an Wakaf & Hafalan Terstandar",
      "Koleksi Busana Muslim/Muslimah Syar'i & Gamis",
      "Madu Murni & Produk Herbal Sunnah Thibbun Nabawi"
    ],
    features: [
      "100% laba usaha dialokasikan untuk operasional dakwah",
      "Melayani pengiriman ke seluruh Indonesia",
      "Produk halal, berkualitas tinggi, dan bersertifikasi",
      "Pemesanan langsung dan ramah via WhatsApp"
    ],
    targetAudience: "Santri, wali santri, donatur, jemaah majlis, masyarakat umum",
    channel: "Store Fisik di Jatimekar & Online WhatsApp / Marketplace",
    actionText: "Pesan Produk HI Mart via WA",
    externalUrl: "https://wa.me/6281288997721?text=Halo%20HI%20Mart,%20saya%20ingin%20melihat%20katalog%20buku%20tajwid,%20mushaf,%20dan%20produk%20resmi.",
    icon: 'ShoppingBag',
    accentBg: 'bg-emerald-50',
    accentText: 'text-emerald-800'
  }
];

export const PENGURUS_DATA: PengurusItem[] = [
  {
    role: "Ketua Dewan Pembina",
    name: "Ust. H. Ahmad Fauzi, Lc., M.A.",
    title: "Alumni Universitas Al-Azhar Kairo, Pakar Fiqih & Dakwah",
    category: "Pembina"
  },
  {
    role: "Anggota Dewan Pembina",
    name: "Dr. K.H. Syamsul Huda, M.Pd.I.",
    title: "Akademisi & Tokoh Pendidikan Islam",
    category: "Pembina"
  },
  {
    role: "Ketua Dewan Pengawas",
    name: "H. Bambang Irawan, S.E., M.M.",
    title: "Praktisi Manajemen & Keuangan Syariah",
    category: "Pengawas"
  },
  {
    role: "Ketua Yayasan",
    name: "Ust. Muhammad Ridwan, S.Pd.I., Al-Hafizh",
    title: "Pemegang Sanad Qira'ah 'Ashim, Dai & Praktisi Al-Qur'an",
    category: "Pengurus Harian"
  },
  {
    role: "Sekretaris Yayasan",
    name: "M. Alfi Syahrin, S.Kom.",
    title: "Spesialis Operasional & Tata Kelola Digital",
    category: "Pengurus Harian"
  },
  {
    role: "Bendahara Yayasan",
    name: "Hj. Nurul Hidayati, S.Ak.",
    title: "Akuntan Publik & Pengawas Keuangan Umat",
    category: "Pengurus Harian"
  },
  {
    role: "Direktur Madrasah Qur'an Center (MQC)",
    name: "Ust. Abdul Wahid, S.Ag., Al-Hafizh",
    title: "Pengajar Al-Qur'an Bersanad & Pengasuh Talaqqi",
    category: "Kepala Unit"
  },
  {
    role: "Direktur Sosial (Mari Berbagi)",
    name: "Ir. Hendra Saputra",
    title: "Koordinator Program Pemberdayaan & Donasi Umat",
    category: "Kepala Unit"
  },
  {
    role: "Kepala HI Media & Majlis Qolbun Muneeb",
    name: "Rizky Kurniawan, S.Sos.",
    title: "Pengarah Kreatif Konten Dakwah & Penyiaran",
    category: "Kepala Unit"
  },
  {
    role: "Manajer HI Mart",
    name: "Fathur Rahman, S.E.",
    title: "Pengembangan Usaha Syariah & Kemandirian Yayasan",
    category: "Kepala Unit"
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: "K.H. Dr. Ahmad Syahid, M.A.",
    role: "Pimpinan Pondok Pesantren Tahfizh & Pengasuh Majlis",
    category: "Ulama/Kyai",
    quote: "Keberadaan Hidayah Indonesia dengan metode bimbingan Al-Qur'an bersanad dan kepedulian sosialnya adalah oase di tengah umat. Madrasah Qur'an Center membimbing santri dengan kesabaran luar biasa dan makhraj yang sangat terjaga.",
    avatar: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
    institution: "Pesantren Darul Huffazh",
    rating: 5
  },
  {
    id: 'testi-2',
    name: "Syaikh Dr. Mahmud Al-Mishri",
    role: "Muqri Qira'ah 'Asyrah & Penasehat Sanad MQC",
    category: "Ulama/Kyai",
    quote: "Para pengajar di Madrasah Qur'an Center memegang komitmen tinggi pada keaslian sanad bacaan Al-Qur'an. Metode talaqqi yang diterapkan memudahkan masyarakat umum untuk membaca Al-Qur'an sesuai standar tajwid yang shahih.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    institution: "Dewan Muqri Internasional",
    rating: 5
  },
  {
    id: 'testi-3',
    name: "Ibu Hj. Endang Rahmawati",
    role: "Jemaah Rutin Majlis Qolbun Muneeb",
    category: "Jemaah",
    quote: "Setiap menghadiri kajian Majlis Qolbun Muneeb, hati rasanya kembali tenang dan disiram kesejukan. Penjelasan ustadz sangat menyentuh qolbu, aplikatif dalam kehidupan keluarga, dan suasananya sangat hangat.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 'testi-4',
    name: "Bpk. Ir. Rahmat Hidayat",
    role: "Donatur Rutin Program Mari Berbagi",
    category: "Donatur",
    quote: "Yang membuat saya loyal menyalurkan sedekah ke Mari Berbagi (mariberbagi.net) adalah transparansi laporannya. Foto dan video dokumentasi penyaluran Al-Qur'an dan santunan yatim selalu dilaporkan detail dan tepat sasaran.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 'testi-5',
    name: "Ibu Dra. Sri Wahyuni",
    role: "Orang Tua Asuh 3 Santri Tahfizh",
    category: "Orang Tua Asuh",
    quote: "Melihat perkembangan hafalan anak asuh saya yang kini sudah mencapai 15 juz dengan bacaan yang begitu merdu dan benar adalah kebahagiaan terbesar. Terima kasih Hidayah Indonesia telah memfasilitasi ladang amal jariyah ini.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    rating: 5
  },
  {
    id: 'testi-6',
    name: "Bpk. Dedi Kurniawan, S.T.",
    role: "Wali Santri MQC Kelas Reguler & Peserta Tahsin Dewasa",
    category: "Wali Santri",
    quote: "Awalnya anak saya malu belajar mengaji karena merasa terlambat. Tapi di Madrasah Qur'an Center gurunya sangat sabar, tidak menghakimi, dan metodenya menyenangkan. Sekarang bukan cuma anak saya, saya pun ikut kelas privat tahsin malam hari!",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    rating: 5
  }
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'art-1',
    title: "Adab Membaca & Menghafal Al-Qur'an Menurut Imam An-Nawawi",
    slug: 'adab-membaca-menghafal-quran',
    excerpt: "Panduan penting bagi para penuntut ilmu Al-Qur'an dalam membersihkan niat, menjaga makhraj, dan menyucikan qolbu saat berinteraksi dengan firman Allah.",
    content: "Imam An-Nawawi rahimahullah dalam kitabnya At-Tibyan fi Adab Hamalatil Qur'an menekankan bahwa interaksi dengan Al-Qur'an harus didasari niat ikhlas lillahi ta'ala semata. Bukan untuk dipuji, bukan untuk ketenaran, melainkan untuk mencari ridho Allah dan menegakkan petunjuk-Nya dalam dada.\n\nDalam proses belajar di Madrasah Qur'an Center, penanaman adab menjadi pondasi utama sebelum santri memasuki tahap tahsin maupun tahfizh mutqin...",
    author: "Ust. Muhammad Ridwan, S.Pd.I., Al-Hafizh",
    authorRole: "Ketua Yayasan Hidayah Indonesia",
    date: "14 Oktober 2026",
    category: "Tajwid & Al-Quran",
    readTime: "4 menit baca",
    imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'art-2',
    title: "Mengenal Kaidah Makhorijul Huruf: Kunci Kesempurnaan Bacaan Al-Qur'an",
    slug: 'mengenal-makhorijul-huruf',
    excerpt: "Kesalahan makhraj dapat mengubah arti kata dalam ayat Al-Qur'an. Pelajari lima tempat keluarnya huruf secara terstruktur dengan metode talaqqi.",
    content: "Makharijul huruf adalah tempat keluarnya huruf hijaiyah saat diucapkan. Para ulama qira'ah membaginya ke dalam 5 rongga utama: Al-Jauf (rongga mulut dan tenggorokan), Al-Halq (tenggorokan), Al-Lisan (lidah), Asy-Syafatain (kedua bibir), dan Al-Khaisyum (pangkal hidung).\n\nDi Madrasah Qur'an Center Hidayah Indonesia, pembelajaran makhraj diajarkan secara visual dan praktik langsung berhadapan dengan ustadz bersanad...",
    author: "Ust. Abdul Wahid, S.Ag., Al-Hafizh",
    authorRole: "Direktur MQC",
    date: "10 Oktober 2026",
    category: "Tajwid & Al-Quran",
    readTime: "6 menit baca",
    imageUrl: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'art-3',
    title: "Makna Qolbun Muneeb: Hati yang Senantiasa Kembali kepada Allah",
    slug: 'makna-qolbun-muneeb-hati-kembali',
    excerpt: "Kajian tafsir Surah Qaf ayat 31-33 tentang ciri-ciri mukmin pemilik hati yang bertobat, lembut, dan senantiasa rindu bersujud.",
    content: "Kata 'Muneeb' berasal dari kata anaba-yunibu yang bermakna kembali berulang-ulang dengan penuh kerendahan dan kecintaan kepada Allah. Dalam Majlis Qolbun Muneeb, kita diajak tidak hanya mengasah lisan dengan bacaan Al-Qur'an, tetapi menghidupkan hati agar terbebas dari penyakit hasad, riya', dan kelalaian dunia...",
    author: "Ust. H. Ahmad Fauzi, Lc., M.A.",
    authorRole: "Dewan Pembina Yayasan",
    date: "05 Oktober 2026",
    category: "Tazkiyatun Nafs",
    readTime: "5 menit baca",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'art-4',
    title: "Sedekah Jariyah: Mengapa Wakaf Al-Qur'an Mengalirkan Pahala Tiada Henti?",
    slug: 'keutamaan-wakaf-al-quran',
    excerpt: "Setiap huruf yang dibaca oleh para santri dan penghafal Al-Qur'an pelosok menjadi timbangan amal berat bagi para donatur Mari Berbagi.",
    content: "Rasulullah SAW bersabda: 'Jika anak Adam meninggal dunia, terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, atau anak sholeh yang mendoakannya.' (HR. Muslim). Melalui program Mari Berbagi (mariberbagi.net), donasi Anda disalurkan langsung menjadi mushaf Al-Qur'an hafalan untuk santri pelosok nusantara...",
    author: "Ir. Hendra Saputra",
    authorRole: "Direktur Mari Berbagi",
    date: "28 September 2026",
    category: "Sosial & Wakaf",
    readTime: "4 menit baca",
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80"
  }
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-1',
    title: "Kajian Akbar & Dzikir Bersama: Menyucikan Jiwa dengan Nur Al-Qur'an",
    category: "Kajian Rutin",
    date: "Ahad, 25 Oktober 2026",
    time: "08.30 - 11.30 WIB",
    location: "Masjid / Aula Hidayah Indonesia, Jl. Raya Jatimekar No. 339, Bekasi & Live Zoom",
    isOnline: true,
    speaker: "Ust. H. Ahmad Fauzi, Lc., M.A. & Ust. Muhammad Ridwan, Al-Hafizh",
    speakerTitle: "Dewan Pembina & Ketua Yayasan Hidayah Indonesia",
    price: "Gratis untuk Umum (Infaq Sukarela)",
    quotaStatus: "Terbuka untuk 300 Jemaah",
    imageUrl: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'evt-2',
    title: "Dauroh Sanad Matan Al-Jazariyyah Angkatan VII",
    category: "Program Sanad",
    date: "14 - 15 November 2026",
    time: "08.00 - 16.30 WIB",
    location: "Markaz Hidayah Qur'an (MHQ) & Zoom VIP",
    isOnline: true,
    speaker: "Syaikh Dr. Mahmud Al-Mishri & Asatidzah MQC",
    speakerTitle: "Muqri Qira'ah 'Asyrah Bersanad Internasional",
    price: "Rp 350.000 (Kitab, Sertifikat Sanad, Konsumsi)",
    quotaStatus: "Sisa 8 Kursi",
    imageUrl: "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'evt-3',
    title: "Aksi Mari Berbagi: Khitanan Massal & Santunan 100 Yatim Dhuafa",
    category: "Aksi Sosial",
    date: "Sabtu, 28 November 2026",
    time: "07.30 - 14.00 WIB",
    location: "Sekretariat Hidayah Indonesia, Jatimekar, Bekasi",
    isOnline: false,
    speaker: "Tim Medis Dokter Muslim & Relawan Mari Berbagi",
    speakerTitle: "Divisi Sosial Yayasan Hidayah Indonesia",
    price: "100% Gratis untuk Dhuafa",
    quotaStatus: "100 Anak Yatim Binaan",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80"
  },
  {
    id: 'evt-4',
    title: "Webinar Bimbingan Belajar Al-Qur'an: Menghapus Rasa Malu Belajar Ngaji di Usia Dewasa",
    category: "Dauroh",
    date: "Jumat Malam, 06 November 2026",
    time: "19.45 - 21.30 WIB",
    location: "Zoom Cloud Meeting & YouTube Live HI Media",
    isOnline: true,
    speaker: "Ust. Abdul Wahid, S.Ag., Al-Hafizh",
    speakerTitle: "Direktur Madrasah Qur'an Center",
    price: "Gratis (E-Sertifikat Tersedia)",
    quotaStatus: "500 Peserta Online",
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80"
  }
];

export const MQC_PROGRAM_DATA = {
  title: "Bimbingan Belajar Al-Quran",
  target: "Ikhwan & Akhwat",
  modes: ["Online", "Offline"],
  offlineLocation: "Hidayah Indonesia, Jl raya jatimekar, rt.001, rw011 No.339, RT.003/RW.011, Jatimekar, Kec. Jatiasih, Kota Bks, Jawa Barat 17422",
  onlineLocation: "Zoom Meeting / Google Meet / Wa Grup",
  classes: [
    {
      id: "reguler",
      name: "Kelas Reguler",
      badge: "Paling Diminati",
      subtitle: "Belajar bersama dalam kelompok kecil dengan pendampingan intensif",
      points: [
        { label: "Metode Talaqqi + Menggunakan Iqro", desc: "Belajar langsung dengan metode yang terbukti efektif" },
        { label: "Jadwal Sudah Ditentukan", desc: "Pilih waktu belajar sesuai kesibukan Anda" },
        { label: "Gratis Biaya Pendaftaran", desc: "Gratis biaya pendaftaran sebesar Rp 50.000, cukup bayar infaq bulanan" }
      ],
      ratio: "5 - 8 orang per kelompok",
      infaqMonthly: "Rp 100.000 - Rp 150.000",
      registrationFee: "Rp 0 (Hemat Rp 50.000)"
    },
    {
      id: "privat",
      name: "Kelas Privat",
      badge: "Eksklusif & Fokus Penuh",
      subtitle: "One-on-one learning dengan perhatian penuh dari pengajar",
      points: [
        { label: "Pendampingan Personal", desc: "Fokus penuh untuk kemajuan bacaan Anda" },
        { label: "Waktu Sepenuhnya Anda", desc: "Atur jadwal fleksibel sesuai keinginan dan waktu luang Anda" },
        { label: "Gratis Biaya Pendaftaran", desc: "Gratis biaya pendaftaran sebesar Rp 50.000, cukup bayar infaq bulanan" }
      ],
      ratio: "1 Santri - 1 Pengajar (Intensif)",
      infaqMonthly: "Mulai Rp 150.000 / paket",
      registrationFee: "Rp 0 (Hemat Rp 50.000)"
    }
  ],
  levels: [
    {
      number: 1,
      name: "Level Pemula",
      tagline: "Untuk Anda yang baru mulai atau ingin mengulang dari dasar",
      bullets: [
        "Cocok untuk yang belum bisa membaca Al-Quran, atau masih terbata-bata",
        "Mengenal huruf hijaiyah, harakat, dan cara membacanya dengan benar",
        "Belajar bertahap menggunakan Iqro",
        "Membangun dasar pelafalan (makhraj) sejak awal"
      ],
      targetSantri: "Anak-anak (13+ thn), Remaja, Dewasa, hingga Lansia",
      accent: "from-blue-600 to-indigo-700"
    },
    {
      number: 2,
      name: "Level Tahsin",
      tagline: "Untuk Anda yang sudah bisa membaca Al-Quran dan ingin bacaannya benar dan baik",
      bullets: [
        "Memperbaiki bacaan sesuai kaidah tajwid",
        "Melatih makhraj dan sifat huruf agar pelafalan tepat",
        "Mempelajari hukum bacaan seperti nun sukun, mim sukun, mad, dan waqaf-ibtida'",
        "Dikoreksi langsung oleh pengajar melalui metode talaqqi (menyimak dan membaca langsung di hadapan guru)"
      ],
      targetSantri: "Peserta yang ingin memperbaiki kefasihan dan hukum tajwid",
      accent: "from-sky-700 to-blue-900"
    },
    {
      number: 3,
      name: "Level Tahfizh",
      tagline: "Untuk Anda yang ingin menghafal Al-Quran dengan bacaan yang benar",
      bullets: [
        "Cocok untuk yang sudah lancar membaca dan memiliki dasar tajwid",
        "Setoran hafalan baru dan murajaah (mengulang hafalan) di hadapan pengajar",
        "Hafalan disimak langsung agar tetap terjaga kebenarannya",
        "Menjaga kualitas bacaan sambil menambah hafalan secara mutqin"
      ],
      targetSantri: "Peserta yang ingin menjaga hafalan mutqin bersanad",
      accent: "from-slate-800 to-blue-950"
    }
  ],
  daysOptions: [
    "Senin & Rabu",
    "Selasa & Kamis",
    "Senin & Kamis",
    "Selasa & Rabu",
    "Sabtu & Ahad"
  ],
  timeSlots: [
    { time: "05.00", label: "Pagi Ba'da Subuh", desc: "Segar & hening untuk talaqqi Al-Qur'an" },
    { time: "09.00", label: "Pagi Menjelang Siang", desc: "Cocok untuk ibu rumah tangga & wirausaha" },
    { time: "16.00", label: "Sore Ba'da Ashar", desc: "Waktu santai sepulang sekolah/aktivitas" },
    { time: "20.00", label: "Malam Ba'da Isya", desc: "Favorit pekerja kantor & profesional" }
  ],
  advantages: [
    "Pengajar standar bacaan bersanad",
    "Pertemuan 2x Sepekan",
    "Durasi belajar 60 Menit",
    "Jumlah peserta 5-8 orang",
    "Waktu fleksibel",
    "Mudah dipahami",
    "Usia mulai dari 13 tahun",
    "Tersedia online & offline",
    "Grup bimbingan khusus peserta"
  ],
  infaqOptions: [
    { amount: "Rp. 100.000", note: "Pilihan infaq bulanan terjangkau" },
    { amount: "Rp. 150.000", note: "Pilihan infaq bulanan + infaq operasional dakwah" }
  ],
  specialPromo: {
    title: "Spesial 5 Pendaftar Pertama",
    perks: [
      "Free Buku Tajwid Ringkas",
      "Free Biaya Pendaftaran (Hemat Rp 50.000)"
    ],
    note: "Kuota promo terbatas setiap awal bulan untuk 5 pendaftar tercepat."
  }
};
