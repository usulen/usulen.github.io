import Link from 'next/link';
import { Eser } from '@/lib/types';

interface Props {
  eser: Eser;
}

export default function EserCard({ eser }: Props) {
  return (
    <Link
      href={`/eser/${eser.id}`}
      className="block rounded-xl border border-gray-200 p-4 hover:border-indigo-400 hover:shadow-md transition-all bg-white"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-gray-900 leading-tight">{eser.title}</h3>
        <span className="shrink-0 text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-full px-2 py-0.5">
          {eser.usul}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
        <span>
          <span className="font-medium text-gray-700">Makam:</span> {eser.makam}
        </span>
        {eser.beste && (
          <span>
            <span className="font-medium text-gray-700">Beste:</span> {eser.beste}
          </span>
        )}
      </div>
    </Link>
  );
}
