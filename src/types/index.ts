export type PageView = 'home' | 'mqc' | 'about' | 'units' | 'articles' | 'events' | 'donation';

export interface UnitDakwah {
  id: string;
  category: 'Pendidikan' | 'Sosial' | 'Dakwah' | 'Bisnis';
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  subUnits?: string[];
  features: string[];
  icon: string;
  externalUrl?: string;
  internalRoute?: PageView;
  highlighted?: boolean; // For 4th card dark navy styling like reference image
  accentColor?: string;
}

export interface IndividualUnitDakwah {
  id: string;
  pillar: 'Pendidikan' | 'Sosial' | 'Dakwah' | 'Bisnis';
  name: string;
  badge: string;
  tagline: string;
  description: string;
  programs: string[];
  features: string[];
  targetAudience: string;
  channel: string;
  actionText: string;
  internalRoute?: PageView;
  externalUrl?: string;
  icon: string;
  accentBg: string;
  accentText: string;
  isFlagship?: boolean;
}

export interface LegalitasInfo {
  skKemenkumham: string;
  aktaNotaris: string;
  npwp: string;
  nib: string;
  tandaDaftarDinsos: string;
  alamatSekretariat: string;
  kontakTelepon: string;
  email: string;
}

export interface PengurusItem {
  role: string;
  name: string;
  title: string;
  category: 'Pembina' | 'Pengawas' | 'Pengurus Harian' | 'Kepala Unit';
  image?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  category: 'Ulama/Kyai' | 'Jemaah' | 'Donatur' | 'Orang Tua Asuh' | 'Wali Santri';
  quote: string;
  avatar: string;
  institution?: string;
  rating?: number;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  category: 'Tafsir' | 'Tajwid & Al-Quran' | 'Tazkiyatun Nafs' | 'Sosial & Wakaf' | 'Kabar Yayasan';
  readTime: string;
  imageUrl: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Kajian Rutin' | 'Program Sanad' | 'Aksi Sosial' | 'Safari Dakwah' | 'Dauroh';
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  speaker: string;
  speakerTitle: string;
  price: string;
  quotaStatus: string;
  imageUrl: string;
  registrationLink?: string;
}

export interface MQCRegistrationForm {
  fullName: string;
  gender: 'Ikhwan' | 'Akhwat';
  age: string;
  phoneWhatsapp: string;
  email: string;
  addressCity: string;
  mode: 'Offline' | 'Online';
  classType: 'Kelas Reguler' | 'Kelas Privat';
  level: 'Level Pemula' | 'Level Tahsin' | 'Level Tahfizh';
  selectedDays: string;
  selectedTime: string;
  selectedInfaq: 'Rp. 100.000' | 'Rp. 150.000';
  notes?: string;
}

export type RegistrationStatus = 'Baru' | 'Dihubungi' | 'Terverifikasi' | 'Diterima' | 'Batal';

export interface MQCRegistrationRecord extends MQCRegistrationForm {
  id: string;
  registrationDate: string;
  status: RegistrationStatus;
  adminNotes?: string;
}

export interface HeroContent {
  badgeHeadline?: string;
  headline: string;
  highlightText: string;
  headlineSuffix?: string;
  subtitle: string;
  cta1Text?: string;
  cta2Text?: string;
  trustPoint1?: string;
  trustPoint2?: string;
  trustPoint3?: string;
  badge1Label?: string;
  badge1Text?: string;
  statNumber: string;
  statLabel: string;
  imageUrl: string;
  imageAlt?: string;
}

export interface BrandIdentity {
  logoType: 'text' | 'image';
  logoImageUrl?: string;
  logoLetter: string;
  namePrefix: string;
  nameHighlight: string;
  tagline: string;
}


