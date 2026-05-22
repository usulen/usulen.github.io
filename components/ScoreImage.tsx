'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
  scorePaths: string[];
  title: string;
}

export default function ScoreImage({ scorePaths, title }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <>
      {/* Nota görselleri — tıklanabilir */}
      <div className="space-y-4">
        {scorePaths.map((src, i) => (
          <div
            key={i}
            className="relative cursor-zoom-in group"
            onClick={() => setOpen(true)}
            title="Büyütmek için tıklayın"
          >
            <Image
              src={src}
              alt={`${title} notası${scorePaths.length > 1 ? ` (sayfa ${i + 1})` : ''}`}
              width={900}
              height={500}
              className="w-full h-auto rounded-lg transition-all duration-150 group-hover:brightness-95"
              style={{ border: '1px solid #D4C4A0' }}
              unoptimized
            />
            <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150 pointer-events-none"
                 style={{ border: '2px solid #C9963A' }} />
          </div>
        ))}
        <p className="text-center text-xs" style={{ color: '#B8A080' }}>
          Büyütmek için tıklayın
        </p>
      </div>

      {/* Zoom overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-8 px-4"
          style={{ background: 'rgba(28,10,10,0.88)' }}
          onClick={() => setOpen(false)}
        >
          {/* Kapat butonu */}
          <button
            onClick={() => setOpen(false)}
            className="fixed top-4 right-5 z-10 flex items-center justify-center w-9 h-9 rounded-full text-white text-lg leading-none"
            style={{ background: 'rgba(201,150,58,0.85)' }}
            aria-label="Kapat"
          >
            ✕
          </button>

          {/* Görseller */}
          <div
            className="w-full space-y-4"
            style={{ maxWidth: 1000 }}
            onClick={(e) => e.stopPropagation()}
          >
            {scorePaths.map((src, i) => (
              <div key={i} className="rounded-lg overflow-hidden" style={{ background: '#EDE4CC' }}>
                <Image
                  src={src}
                  alt={`${title} notası${scorePaths.length > 1 ? ` (sayfa ${i + 1})` : ''}`}
                  width={1800}
                  height={1000}
                  className="w-full h-auto"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
