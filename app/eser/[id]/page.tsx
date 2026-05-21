import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ESERLER } from '@/data/eserler';
import { USULLER } from '@/data/usuller';
import UsulStaff from '@/components/UsulStaff';
import AudioPlayer from '@/components/AudioPlayer';
import KararSesiButton from '@/components/KararSesiButton';
import HakkindaModal from '@/components/HakkindaModal';

export function generateStaticParams() {
  return ESERLER.map((e) => ({ id: e.id }));
}

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EserPage({ params }: Props) {
  const { id } = await params;
  const eser = ESERLER.find((e) => e.id === id);
  if (!eser) notFound();

  const pattern = USULLER[eser.usulPatternKey];
  const num = eser.id.replace('eser-', '');

  return (
    <main className="min-h-screen" style={{ background: '#F5EDD8' }}>

      {/* ── Üst bar ─────────────────────────────────────────────── */}
      <header className="hero-pattern border-b" style={{ borderColor: '#C9963A33' }}>
        <div className="mx-auto px-6 py-3 flex items-center gap-3" style={{ maxWidth: 1400 }}>
          <Link href="/">
            <Image src="/logo.png" alt="Usûlen" width={40} height={40} className="rounded-lg" unoptimized />
          </Link>
          <span style={{ color: '#C9963A55' }}>|</span>
          <Link href="/" className="text-sm font-medium" style={{ color: '#C9963A' }}>
            ← Geri
          </Link>
          <span style={{ color: '#C9963A55' }}>|</span>
          <span className="text-sm truncate font-playfair" style={{ color: '#F5EDD8' }}>
            {num}. {eser.title}
          </span>
          <div className="ml-auto">
            <HakkindaModal />
          </div>
        </div>
      </header>

      {/* ── Ana içerik — manuscript sayfa ───────────────────────── */}
      <div className="mx-auto px-8 py-8"
           style={{
             maxWidth: 1400,
             minHeight: '90vh',
           }}>

        {/* Sayfa başlığı */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-lg font-bold mt-1 shrink-0" style={{ color: '#C9963A' }}>{num}.</span>
          <h1 className="font-playfair text-3xl font-bold leading-tight" style={{ color: '#1C0E0A' }}>
            {eser.title}
          </h1>
        </div>

        {/* Altın ayırıcı */}
        <div className="flex items-center gap-3 my-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, #C9963A88, transparent)' }} />
          <span style={{ color: '#C9963A' }}>❖</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to left, #C9963A88, transparent)' }} />
        </div>

        {/* ── İki kolon layout ────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-[1fr_1.4fr] items-start">

          {/* SOL — Metadata + Usûl + Ses */}
          <div className="space-y-6 sticky top-4">

            {/* Metadata */}
            <div className="rounded-xl p-5" style={{ background: '#EDE4CC', border: '1px solid #D4C4A0' }}>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                {eser.makam && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9A7B5A' }}>Makam</dt>
                    <dd className="font-semibold text-base" style={{ color: '#1C0E0A' }}>{eser.makam}</dd>
                  </div>
                )}
                {eser.usul && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9A7B5A' }}>Usûl</dt>
                    <dd className="font-semibold text-base" style={{ color: '#1C0E0A' }}>{eser.usul}</dd>
                  </div>
                )}
                {eser.beste && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9A7B5A' }}>Bestekâr</dt>
                    <dd className="font-medium" style={{ color: '#1C0E0A' }}>{eser.beste}</dd>
                  </div>
                )}
                {eser.gufte && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: '#9A7B5A' }}>Güftekâr</dt>
                    <dd className="font-medium" style={{ color: '#1C0E0A' }}>{eser.gufte}</dd>
                  </div>
                )}
              </dl>
            </div>

            {/* Usûl porte */}
            {pattern && (
              <div className="rounded-xl p-5" style={{ background: '#EDE4CC', border: '1px solid #D4C4A0' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9A7B5A' }}>
                  Usûl — {pattern.name} ({pattern.timeSignature})
                </p>
                <UsulStaff pattern={pattern} timeSignature={eser.timeSignatureOverride} />
              </div>
            )}
            {eser.usulPatternKey && !pattern && (
              <p className="text-sm" style={{ color: '#9A7B5A' }}>
                Usûl deseni henüz tanımlanmamış: {eser.usulPatternKey}
              </p>
            )}

            {/* Ses oynatıcılar */}
            {(eser.youtubeId || eser.makam) && (
              <div className="rounded-xl p-5" style={{ background: '#EDE4CC', border: '1px solid #D4C4A0' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: '#9A7B5A' }}>Dinle</p>
                {eser.youtubeId && (
                  <AudioPlayer youtubeId={eser.youtubeId} title={eser.title} />
                )}
                {eser.makam && (
                  <KararSesiButton makam={eser.makam} />
                )}
              </div>
            )}
          </div>

          {/* SAĞ — Nota */}
          <div>
            {eser.scorePaths && eser.scorePaths.length > 0 ? (
              <div className="rounded-xl p-5" style={{ background: '#EDE4CC', border: '1px solid #D4C4A0' }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: '#9A7B5A' }}>Nota</p>
                <div className="space-y-4">
                  {eser.scorePaths.map((src, i) => (
                    <Image
                      key={i}
                      src={src}
                      alt={`${eser.title} notası${eser.scorePaths!.length > 1 ? ` (sayfa ${i + 1})` : ''}`}
                      width={900}
                      height={500}
                      className="w-full h-auto rounded-lg"
                      style={{ border: '1px solid #D4C4A0' }}
                      unoptimized
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl p-10 text-center text-sm h-full flex items-center justify-center"
                   style={{ border: '2px dashed #E0D0B0', color: '#9A7B5A' }}>
                Nota görüntüsü henüz eklenmemiş.
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-xs"
              style={{ color: '#9A7B5A', borderTop: '1px solid #D4C4A0', maxWidth: 1400, margin: '0 auto' }}>
        <span style={{ color: '#C9963A' }}>❖</span>
        <span className="mx-3">Türk Sanat Müziği Usûl ve Solfej Eğitimi</span>
        <span style={{ color: '#C9963A' }}>❖</span>
      </footer>
    </main>
  );
}
