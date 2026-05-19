'use client';

import { UsulPattern as UsulPatternType } from '@/lib/types';

const STROKE_COLORS: Record<string, string> = {
  Düm: 'bg-red-50 text-red-800 border-red-300',
  Tek: 'bg-blue-50 text-blue-800 border-blue-300',
  Ke:  'bg-green-50 text-green-800 border-green-300',
  Te:  'bg-yellow-50 text-yellow-800 border-yellow-300',
  Kâ:  'bg-purple-50 text-purple-800 border-purple-300',
  '-': 'bg-gray-50 text-gray-400 border-gray-200',
};

interface Props { pattern: UsulPatternType }

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
          <div key={i} className={`flex flex-col items-center min-w-[48px] px-2 py-1 rounded border text-sm font-semibold ${STROKE_COLORS[beat.stroke] ?? 'bg-gray-100'}`}>
            <span className="text-xs text-gray-400 leading-none">{i + 1}</span>
            <span className="leading-none mt-0.5">{beat.stroke}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
