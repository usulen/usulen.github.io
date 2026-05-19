'use client';

import { UsulPattern as UsulPatternType } from '@/lib/types';

const STROKE_COLORS: Record<string, string> = {
  Düm: 'bg-red-100 text-red-800 border-red-300',
  Tek: 'bg-blue-100 text-blue-800 border-blue-300',
  Ke: 'bg-green-100 text-green-800 border-green-300',
  Te: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  '-': 'bg-gray-100 text-gray-400 border-gray-200',
};

interface Props {
  pattern: UsulPatternType;
}

export default function UsulPattern({ pattern }: Props) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-600">Usûl:</span>
        <span className="text-sm font-bold">{pattern.name}</span>
        <span className="text-xs text-gray-400 ml-1">({pattern.timeSignature})</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {pattern.beats.map((beat, i) => (
          <div
            key={i}
            className={`flex flex-col items-center justify-center min-w-[48px] px-2 py-1 rounded border text-sm font-semibold ${STROKE_COLORS[beat.stroke] ?? 'bg-gray-100'}`}
          >
            <span className="text-xs text-gray-400 leading-none">{i + 1}</span>
            <span className="leading-none mt-0.5">{beat.stroke}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
