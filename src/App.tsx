/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageView, UnitDakwah } from './types';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PilarDakwahSection } from './components/PilarDakwahSection';
import { AboutSection } from './components/AboutSection';
import { MadrasahQuranPage } from './components/MadrasahQuranPage';
import { DonationSection } from './components/DonationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ArticlesAndEventsSection } from './components/ArticlesAndEventsSection';
import { Footer } from './components/Footer';
import { UnitDetailModal } from './components/UnitDetailModal';
import { LegalAndStructureModal } from './components/LegalAndStructureModal';
import { AdminPanelModal, AdminTab } from './components/AdminPanelModal';
import { MessageCircle, BookOpen, HeartHandshake } from 'lucide-react';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedUnit, setSelectedUnit] = useState<UnitDakwah | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<AdminTab>('pendaftar');

  const handleOpenDonateModal = () => {
    setCurrentPage('donation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminPanel = (tab: AdminTab = 'pendaftar') => {
    setAdminInitialTab(tab);
    setIsAdminPanelOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0B1B3D] selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenAdminPanel={handleOpenAdminPanel}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <Hero
              setCurrentPage={setCurrentPage}
              onOpenDonateModal={handleOpenDonateModal}
              onOpenAdminPanel={handleOpenAdminPanel}
            />
            
            {/* Pilar Dakwah Section: Seluruh unit dakwah di bawah naungan Hidayah Indonesia */}
            <PilarDakwahSection
              setCurrentPage={setCurrentPage}
            />

            {/* Profile, Visi Misi, Kepengurusan, & Legalitas */}
            <AboutSection
              onOpenLegalModal={() => setIsLegalModalOpen(true)}
            />

            {/* Kegiatan Dakwah & Artikel Kajian */}
            <ArticlesAndEventsSection />

            {/* Donasi Mari Berbagi */}
            <DonationSection />

            {/* Testimoni Ulama, Kyai, Jemaah, Donatur, Orang Tua Asuh, & Wali Santri */}
            <TestimonialsSection />
          </>
        )}

        {currentPage === 'mqc' && (
          <MadrasahQuranPage setCurrentPage={setCurrentPage} />
        )}

        {currentPage === 'about' && (
          <div className="pt-6">
            <AboutSection onOpenLegalModal={() => setIsLegalModalOpen(true)} />
            <TestimonialsSection />
          </div>
        )}

        {currentPage === 'units' && (
          <div className="pt-6">
            <PilarDakwahSection
              setCurrentPage={setCurrentPage}
            />
            <AboutSection onOpenLegalModal={() => setIsLegalModalOpen(true)} />
          </div>
        )}

        {currentPage === 'events' && (
          <div className="pt-6">
            <ArticlesAndEventsSection />
          </div>
        )}

        {currentPage === 'donation' && (
          <div className="pt-6">
            <DonationSection />
          </div>
        )}
      </main>

      {/* Floating Action Button for WhatsApp Consultation */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        <button
          onClick={() => {
            setCurrentPage('mqc');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0B1B3D] text-white text-xs font-bold shadow-xl hover:bg-blue-900 transition-all hover:scale-105"
        >
          <BookOpen className="w-4 h-4 text-blue-300" />
          <span>Daftar Madrasah Qur'an</span>
        </button>

        <a
          href="https://wa.me/6281288997721?text=Halo%20Admin%20Yayasan%20Hidayah%20Indonesia,%20saya%20ingin%20bertanya%20seputar%20program%20dakwah%20dan%20pembelajaran%20Al-Qur'an."
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xl shadow-emerald-900/30 transition-all hover:scale-105 active:scale-95"
          title="Chat WhatsApp Admin Resmi"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span>WhatsApp Konsultasi</span>
        </a>
      </div>

      {/* Footer */}
      <Footer
        setCurrentPage={setCurrentPage}
        onOpenLegalModal={() => setIsLegalModalOpen(true)}
        onOpenAdminPanel={() => handleOpenAdminPanel('pendaftar')}
      />

      {/* Unit Detail Modal */}
      <UnitDetailModal
        unit={selectedUnit}
        onClose={() => setSelectedUnit(null)}
        setCurrentPage={setCurrentPage}
      />

      {/* Legal & Organizational Structure Modal */}
      <LegalAndStructureModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        initialTab={adminInitialTab}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
