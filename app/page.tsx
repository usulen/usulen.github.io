'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { ESERLER } from '@/data/eserler';
import EserCard from '@/components/EserCard';
import FilterBar from '@/components/FilterBar';
import HakkindaModal from '@/components/HakkindaModal';

export default function HomePage() {
  const [search, setSearch]           = useState('');
  const [selectedMakam, setSelectedMakam] = useState('');
  const [selectedUsul, setSelectedUsul]   = useState('');

  const makamlar = useMemo(() => [...new Set(ESERLER.map((e) => e.makam).filter(Boolean))].sort(), []);
  const usuller  = useMemo(() => [...new Set(ESERLER.map((e) => e.usul).filter(Boolean))].sort(),  []);

  const filtered = useMemo(() => ESERLER.filter((e) => {
    if (selectedMakam && e.makam !== selectedMakam) return false;
    if (selectedUsul  && e.usul  !== selectedUsul)  return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        e.title.toLowerCase().includes(q) ||
        e.makam.toLowerCase().includes(q) ||
        e.usul.toLowerCase().includes(q)  ||
        (e.beste ?? '').toLowerCase().includes(q)
      );
    }
    return true;
  }), [search, selectedMakam, selectedUsul]);

  return (
    <main className="min-h-screen" style={{ background: '#F5EDD8' }}>

      {/* ── Hero başlık ─────────────────────────────────────────── */}
      <header className="hero-pattern">
        <div className="max-w-5xl mx-auto px-6 pt-3 pb-0 flex justify-end">
          <HakkindaModal />
        </div>
        <div className="max-w-5xl mx-auto px-6 py-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <Image
              src="/logo.png"
              alt="Usûlen logo"
              width={200}
              height={200}
              className="rounded-xl w-32 h-32 md:w-48 md:h-48"
              unoptimized
            />
            <p className="text-sm font-light tracking-[0.2em] uppercase"
               style={{ color: '#C9963A' }}>
              Usûl &amp; Solfej Eğitimi
            </p>
          </div>
        </div>
      </header>

      {/* ── İçerik ──────────────────────────────────────────────── */}
      {/* Manuscript sayfa wrapper */}
      <div className="mx-auto px-4 py-4 md:px-8 md:py-8"
           style={{
             maxWidth: 1200,
             background: '#FFFCF5',
             minHeight: '60vh',
             boxShadow: '0 0 60px rgba(28,10,10,0.08)',
           }}>

        {/* Filtreler */}
        <div className="rounded-2xl border p-4 mb-6"
             style={{ background: '#F5EDD8', borderColor: '#E0D0B0' }}>
          <FilterBar
            makamlar={makamlar}
            usuller={usuller}
            selectedMakam={selectedMakam}
            selectedUsul={selectedUsul}
            onMakamChange={setSelectedMakam}
            onUsulChange={setSelectedUsul}
            search={search}
            onSearchChange={setSearch}
          />
        </div>

        <p className="text-xs font-medium tracking-wide uppercase mb-4"
           style={{ color: '#9A7B5A' }}>
          {filtered.length} eser
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((eser) => (
            <EserCard key={eser.id} eser={eser} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center py-20 text-sm" style={{ color: '#9A7B5A' }}>
              Eser bulunamadı.
            </p>
          )}
        </div>
      </div>

      {/* ── Alt bilgi ───────────────────────────────────────────── */}
      <footer className="py-8 text-center text-xs" style={{ color: '#9A7B5A', borderTop: '1px solid #E0D0B0', background: '#FFFCF5', maxWidth: 1200, margin: '0 auto' }}>
        <span style={{ color: '#C9963A' }}>❖</span>
        <span className="mx-3">Türk Müziği Usûl ve Solfej Eğitimi</span>
        <span style={{ color: '#C9963A' }}>❖</span>
      </footer>
    </main>
  );
}
