import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LegalitasInfo, 
  IndividualUnitDakwah, 
  ArticleItem, 
  EventItem, 
  TestimonialItem, 
  MQCRegistrationRecord, 
  RegistrationStatus, 
  HeroContent,
  PengurusItem,
  BrandIdentity
} from '../types';
import { 
  FOUNDATION_LEGAL, 
  VISI_MISI, 
  ALL_INDIVIDUAL_UNITS, 
  ARTICLES_DATA, 
  EVENTS_DATA, 
  TESTIMONIALS_DATA,
  PENGURUS_DATA
} from '../data/mockData';

export interface AdminSettings {
  mqcWhatsappTarget: string; // The destination WA number for MQC form submissions
  generalWhatsapp: string;
}

interface AppContextType {
  // State
  brandIdentity: BrandIdentity;
  foundationLegal: LegalitasInfo;
  adminSettings: AdminSettings;
  heroContent: HeroContent;
  visiMisi: typeof VISI_MISI;
  units: IndividualUnitDakwah[];
  articles: ArticleItem[];
  events: EventItem[];
  testimonials: TestimonialItem[];
  registrations: MQCRegistrationRecord[];
  pengurusList: PengurusItem[];

  // Mutators
  updateBrandIdentity: (data: Partial<BrandIdentity>) => void;
  updateFoundationLegal: (data: Partial<LegalitasInfo>) => void;
  updateAdminSettings: (data: Partial<AdminSettings>) => void;
  updateHeroContent: (data: Partial<HeroContent>) => void;
  updateVisiMisi: (visi: string, misi: string[]) => void;
  
  // Articles CRUD
  addArticle: (article: Omit<ArticleItem, 'id'>) => void;
  updateArticle: (id: string, article: Partial<ArticleItem>) => void;
  deleteArticle: (id: string) => void;

  // Events CRUD
  addEvent: (event: Omit<EventItem, 'id'>) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (testi: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, testi: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Units CRUD
  addUnit: (unit: Omit<IndividualUnitDakwah, 'id'>) => void;
  updateUnit: (id: string, unit: Partial<IndividualUnitDakwah>) => void;
  deleteUnit: (id: string) => void;

  // Registrations CRUD (Santri MQC)
  addRegistration: (reg: Omit<MQCRegistrationRecord, 'id' | 'registrationDate' | 'status'>) => MQCRegistrationRecord;
  updateRegistrationStatus: (id: string, status: RegistrationStatus) => void;
  updateRegistration: (id: string, data: Partial<MQCRegistrationRecord>) => void;
  deleteRegistration: (id: string) => void;

  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'hidayah_indonesia_cms_v1';

const INITIAL_HERO: HeroContent = {
  badgeHeadline: "Yayasan Hidayah Indonesia • Dakwah & Bimbingan Al-Qur'an",
  headline: 'Menebar Hidayah, Membangun Generasi',
  highlightText: "Qur'ani",
  headlineSuffix: '& Berdaya',
  subtitle: "Wadah dakwah terpadu yang membina umat melalui bimbingan Al-Qur'an bersanad di Madrasah Qur'an Center (MQC), kepedulian sosial Mari Berbagi, syiar HI Media, serta kemandirian HI Mart.",
  cta1Text: "Daftar Bimbingan Qur'an",
  cta2Text: "Donasi Mari Berbagi",
  trustPoint1: "Metode Talaqqi Bersanad",
  trustPoint2: "Legalitas SK Kemenkumham",
  trustPoint3: "Offline & Online Zoom/GMeet",
  badge1Label: "SK Kemenkumham",
  badge1Text: "Yayasan Resmi Terdaftar",
  statNumber: "1.200+",
  statLabel: "Santri & Jemaah Aktif",
  imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=1000&auto=format&fit=crop&q=80',
  imageAlt: "Pengajar Madrasah Qur'an Center Hidayah Indonesia"
};

const INITIAL_BRAND_IDENTITY: BrandIdentity = {
  logoType: 'text',
  logoImageUrl: '',
  logoLetter: 'H',
  namePrefix: 'Hidayah',
  nameHighlight: 'Indonesia',
  tagline: 'Menebar Hidayah • Membina Umat'
};

const INITIAL_ADMIN_SETTINGS: AdminSettings = {
  mqcWhatsappTarget: '6281288997721',
  generalWhatsapp: '6281288997721'
};

const INITIAL_REGISTRATIONS: MQCRegistrationRecord[] = [
  {
    id: 'REG-2026-001',
    fullName: 'Ahmad Farhan Al-Ghifari',
    gender: 'Ikhwan',
    age: '24',
    phoneWhatsapp: '081298765432',
    email: 'farhan.ghifari@gmail.com',
    addressCity: 'Jatiasih, Kota Bekasi',
    mode: 'Offline',
    classType: 'Kelas Reguler',
    level: 'Level Tahsin',
    selectedDays: 'Senin & Rabu',
    selectedTime: '20.00',
    selectedInfaq: 'Rp. 150.000',
    notes: 'Ingin memperbaiki makhraj huruf dan hukum tajwid nun sukun.',
    registrationDate: '2026-10-14 14:32',
    status: 'Terverifikasi',
    adminNotes: 'Sudah dihubungi via WA, konfirmasi hadir orientasi offline pekan depan.'
  },
  {
    id: 'REG-2026-002',
    fullName: 'Siti Sarah Nurhaliza',
    gender: 'Akhwat',
    age: '29',
    phoneWhatsapp: '085712349876',
    email: 'siti.sarah@yahoo.com',
    addressCity: 'Bandung / Online',
    mode: 'Online',
    classType: 'Kelas Privat',
    level: 'Level Pemula',
    selectedDays: 'Selasa & Kamis',
    selectedTime: '09.00',
    selectedInfaq: 'Rp. 150.000',
    notes: 'Belajar dari nol huruf hijaiyah, mohon bimbingan ustadzah sabar.',
    registrationDate: '2026-10-15 09:15',
    status: 'Baru',
    adminNotes: 'Menunggu plotting jadwal ustadzah pengampu privat.'
  },
  {
    id: 'REG-2026-003',
    fullName: 'Rizky Ramadhan',
    gender: 'Ikhwan',
    age: '16',
    phoneWhatsapp: '087855443322',
    email: 'rizky.ramadhan@gmail.com',
    addressCity: 'Pondok Gede, Bekasi',
    mode: 'Offline',
    classType: 'Kelas Reguler',
    level: 'Level Tahfizh',
    selectedDays: 'Sabtu & Ahad',
    selectedTime: '16.00',
    selectedInfaq: 'Rp. 100.000',
    notes: 'Target murojaah juz 28, 29, 30 untuk persiapan seleksi sanad.',
    registrationDate: '2026-10-15 19:40',
    status: 'Diterima',
    adminNotes: 'Lulus tes bacaan awal, masuk kelas halaqah Tahfizh Sabtu sore.'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial from localStorage or defaults
  const [foundationLegal, setFoundationLegal] = useState<LegalitasInfo>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_legal`);
      return saved ? JSON.parse(saved) : FOUNDATION_LEGAL;
    } catch {
      return FOUNDATION_LEGAL;
    }
  });

  const [brandIdentity, setBrandIdentity] = useState<BrandIdentity>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_brand_identity`);
      return saved ? JSON.parse(saved) : INITIAL_BRAND_IDENTITY;
    } catch {
      return INITIAL_BRAND_IDENTITY;
    }
  });

  const [adminSettings, setAdminSettings] = useState<AdminSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_admin_settings`);
      return saved ? JSON.parse(saved) : INITIAL_ADMIN_SETTINGS;
    } catch {
      return INITIAL_ADMIN_SETTINGS;
    }
  });

  const [heroContent, setHeroContent] = useState<HeroContent>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_hero`);
      return saved ? JSON.parse(saved) : INITIAL_HERO;
    } catch {
      return INITIAL_HERO;
    }
  });

  const [visiMisi, setVisiMisi] = useState<typeof VISI_MISI>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_visimisi`);
      return saved ? JSON.parse(saved) : VISI_MISI;
    } catch {
      return VISI_MISI;
    }
  });

  const [units, setUnits] = useState<IndividualUnitDakwah[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_units`);
      return saved ? JSON.parse(saved) : ALL_INDIVIDUAL_UNITS;
    } catch {
      return ALL_INDIVIDUAL_UNITS;
    }
  });

  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_articles`);
      return saved ? JSON.parse(saved) : ARTICLES_DATA;
    } catch {
      return ARTICLES_DATA;
    }
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_events`);
      return saved ? JSON.parse(saved) : EVENTS_DATA;
    } catch {
      return EVENTS_DATA;
    }
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_testimonials`);
      return saved ? JSON.parse(saved) : TESTIMONIALS_DATA;
    } catch {
      return TESTIMONIALS_DATA;
    }
  });

  const [registrations, setRegistrations] = useState<MQCRegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_registrations`);
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  const [pengurusList, setPengurusList] = useState<PengurusItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pengurus`);
      return saved ? JSON.parse(saved) : PENGURUS_DATA;
    } catch {
      return PENGURUS_DATA;
    }
  });

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_legal`, JSON.stringify(foundationLegal));
    } catch (e) { console.error(e); }
  }, [foundationLegal]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_brand_identity`, JSON.stringify(brandIdentity));
    } catch (e) { console.error(e); }
  }, [brandIdentity]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_admin_settings`, JSON.stringify(adminSettings));
    } catch (e) { console.error(e); }
  }, [adminSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_hero`, JSON.stringify(heroContent));
    } catch (e) { console.error(e); }
  }, [heroContent]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_visimisi`, JSON.stringify(visiMisi));
    } catch (e) { console.error(e); }
  }, [visiMisi]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_units`, JSON.stringify(units));
    } catch (e) { console.error(e); }
  }, [units]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_articles`, JSON.stringify(articles));
    } catch (e) { console.error(e); }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_events`, JSON.stringify(events));
    } catch (e) { console.error(e); }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_testimonials`, JSON.stringify(testimonials));
    } catch (e) { console.error(e); }
  }, [testimonials]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_registrations`, JSON.stringify(registrations));
    } catch (e) { console.error(e); }
  }, [registrations]);

  // Mutators
  const updateBrandIdentity = (data: Partial<BrandIdentity>) => {
    setBrandIdentity(prev => ({ ...prev, ...data }));
  };

  const updateFoundationLegal = (data: Partial<LegalitasInfo>) => {
    setFoundationLegal(prev => ({ ...prev, ...data }));
  };

  const updateAdminSettings = (data: Partial<AdminSettings>) => {
    setAdminSettings(prev => ({ ...prev, ...data }));
  };

  const updateHeroContent = (data: Partial<HeroContent>) => {
    setHeroContent(prev => ({ ...prev, ...data }));
  };

  const updateVisiMisi = (visi: string, misi: string[]) => {
    setVisiMisi(prev => ({ ...prev, visi, misi }));
  };

  // Article Actions
  const addArticle = (article: Omit<ArticleItem, 'id'>) => {
    const newArticle: ArticleItem = {
      ...article,
      id: `art-${Date.now()}`
    };
    setArticles(prev => [newArticle, ...prev]);
  };

  const updateArticle = (id: string, updated: Partial<ArticleItem>) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteArticle = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  // Event Actions
  const addEvent = (evt: Omit<EventItem, 'id'>) => {
    const newEvt: EventItem = {
      ...evt,
      id: `evt-${Date.now()}`
    };
    setEvents(prev => [newEvt, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updated } : e));
  };

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Testimonial Actions
  const addTestimonial = (testi: Omit<TestimonialItem, 'id'>) => {
    const newTesti: TestimonialItem = {
      ...testi,
      id: `testi-${Date.now()}`
    };
    setTestimonials(prev => [newTesti, ...prev]);
  };

  const updateTestimonial = (id: string, updated: Partial<TestimonialItem>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Units Actions
  const addUnit = (unit: Omit<IndividualUnitDakwah, 'id'>) => {
    const newUnit: IndividualUnitDakwah = {
      ...unit,
      id: `unit-${Date.now()}`
    };
    setUnits(prev => [...prev, newUnit]);
  };

  const updateUnit = (id: string, updated: Partial<IndividualUnitDakwah>) => {
    setUnits(prev => prev.map(u => u.id === id ? { ...u, ...updated } : u));
  };

  const deleteUnit = (id: string) => {
    setUnits(prev => prev.filter(u => u.id !== id));
  };

  // Registration Actions (Santri MQC)
  const addRegistration = (reg: Omit<MQCRegistrationRecord, 'id' | 'registrationDate' | 'status'>) => {
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newReg: MQCRegistrationRecord = {
      ...reg,
      id: `REG-${new Date().getFullYear()}-${String(registrations.length + 1).padStart(3, '0')}`,
      registrationDate: dateStr,
      status: 'Baru'
    };
    setRegistrations(prev => [newReg, ...prev]);
    return newReg;
  };

  const updateRegistrationStatus = (id: string, status: RegistrationStatus) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const updateRegistration = (id: string, data: Partial<MQCRegistrationRecord>) => {
    setRegistrations(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const deleteRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setBrandIdentity(INITIAL_BRAND_IDENTITY);
    setFoundationLegal(FOUNDATION_LEGAL);
    setAdminSettings(INITIAL_ADMIN_SETTINGS);
    setHeroContent(INITIAL_HERO);
    setVisiMisi(VISI_MISI);
    setUnits(ALL_INDIVIDUAL_UNITS);
    setArticles(ARTICLES_DATA);
    setEvents(EVENTS_DATA);
    setTestimonials(TESTIMONIALS_DATA);
    setRegistrations(INITIAL_REGISTRATIONS);
    setPengurusList(PENGURUS_DATA);
  };

  return (
    <AppContext.Provider
      value={{
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
        pengurusList,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
