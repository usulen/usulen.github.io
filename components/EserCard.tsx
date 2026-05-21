import Link from 'next/link';
import { Eser } from '@/lib/types';

export default function EserCard({ eser }: { eser: Eser }) {
  const num = eser.id.replace('eser-', '');

  return (
    <Link href={`/eser/${eser.id}`} className="block eser-card group">
      <div className="h-full rounded-xl border-l-4 p-5"
           style={{
             background: '#FFFCF5',
             borderColor: '#E0D0B0',
             borderLeftColor: '#C9963A',
             border: '1px solid #E0D0B0',
             borderLeft: '4px solid #C9963A',
           }}>

        {/* Numara + başlık */}
        <div className="flex items-start gap-2 mb-3">
          <span className="text-xs font-bold mt-0.5 shrink-0 w-5 text-right"
                style={{ color: '#C9963A', fontVariantNumeric: 'tabular-nums' }}>
            {num}
          </span>
          <h3 className="font-playfair font-semibold leading-snug text-base"
              style={{ color: '#1C0E0A' }}>
            {eser.title}
          </h3>
        </div>

        {/* Etiketler */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {eser.makam && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: '#F5EDD8', color: '#7C4A1A', border: '1px solid #E0C89A' }}>
              {eser.makam}
            </span>
          )}
          {eser.usul && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: '#F0EAF5', color: '#4A2A7C', border: '1px solid #C8A8E0' }}>
              {eser.usul}
            </span>
          )}
        </div>

        {/* Bestekâr */}
        {eser.beste && (
          <p className="text-xs" style={{ color: '#9A7B5A' }}>
            <span style={{ color: '#6B5040' }}>Beste: </span>{eser.beste}
          </p>
        )}
      </div>
    </Link>
  );
}
