'use client';

import { useState, useMemo } from 'react';
import { ESERLER } from '@/data/eserler';
import EserCard from '@/components/EserCard';
import FilterBar from '@/components/FilterBar';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [selectedMakam, setSelectedMakam] = useState('');
  const [selectedUsul, setSelectedUsul] = useState('');

  const makamlar = useMemo(
    () => [...new Set(ESERLER.map((e) => e.makam))].sort(),
    []
  );
  const usuller = useMemo(
    () => [...new Set(ESERLER.map((e) => e.usul))].sort(),
    []
  );

  const filtered = useMemo(() => {
    return ESERLER.filter((e) => {
      if (selectedMakam && e.makam !== selectedMakam) return false;
      if (selectedUsul && e.usul !== selectedUsul) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          e.title.toLowerCase().includes(q) ||
          e.makam.toLowerCase().includes(q) ||
          e.usul.toLowerCase().includes(q) ||
          (e.beste ?? '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, selectedMakam, selectedUsul]);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <h1 className="text-xl font-bold text-indigo-700 leading-none">
            Türk Müziği Usûlleri
          </h1>
          <p className="text-xs text-gray-500 mt-0.5">
            Solfej Eğitim Sitesi
          </p>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
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

        <p className="text-sm text-gray-400 mt-4 mb-3">
          {filtered.length} eser bulundu
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((eser) => (
            <EserCard key={eser.id} eser={eser} />
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-16">
              Eser bulunamadı.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
