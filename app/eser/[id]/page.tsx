import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ESERLER } from '@/data/eserler';
import { USULLER } from '@/data/usuller';
import UsulStaff from '@/components/UsulStaff';
import AudioPlayer from '@/components/AudioPlayer';

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

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <Link
            href="/"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            ← Geri
          </Link>
          <span className="text-gray-300">|</span>
          <h1 className="text-lg font-bold text-gray-900 truncate">{eser.title}</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* Metadata */}
        <section className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">{eser.title}</h2>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            <div>
              <dt className="text-gray-500 font-medium">Makam</dt>
              <dd className="text-gray-800">{eser.makam}</dd>
            </div>
            <div>
              <dt className="text-gray-500 font-medium">Usûl</dt>
              <dd className="text-gray-800">{eser.usul}</dd>
            </div>
            {eser.beste && (
              <div>
                <dt className="text-gray-500 font-medium">Bestekâr</dt>
                <dd className="text-gray-800">{eser.beste}</dd>
              </div>
            )}
            {eser.gufte && (
              <div>
                <dt className="text-gray-500 font-medium">Güftekâr</dt>
                <dd className="text-gray-800">{eser.gufte}</dd>
              </div>
            )}
          </dl>

          {/* Usûl porte gösterimi */}
          {pattern && (
            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Usûl — {pattern.name} ({pattern.timeSignature})
              </p>
              <UsulStaff pattern={pattern} />
            </div>
          )}
          {eser.usulPatternKey && !pattern && (
            <p className="mt-4 text-sm text-gray-400">Usûl deseni henüz tanımlanmamış: {eser.usulPatternKey}</p>
          )}

          {/* Audio */}
          {eser.audioPath && (
            <AudioPlayer src={eser.audioPath} title={eser.title} />
          )}
        </section>

        {/* Sheet music */}
        {eser.scorePath && (
          <section className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">Nota</h3>
            <div className="relative w-full">
              <Image
                src={eser.scorePath}
                alt={`${eser.title} notası`}
                width={800}
                height={400}
                className="w-full h-auto rounded-lg border border-gray-100"
                unoptimized
              />
            </div>
          </section>
        )}

        {!eser.scorePath && (
          <section className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-400">
            Nota görüntüsü henüz eklenmemiş.
          </section>
        )}
      </div>
    </main>
  );
}
