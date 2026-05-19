'use client';

import { UsulPattern as UsulPatternType, NOTE_SYMBOLS, NoteValue } from '@/lib/types';

const STROKE_COLORS: Record<string, string> = {
  Düm: 'bg-red-50 text-red-800 border-red-300',
  Tek: 'bg-blue-50 text-blue-800 border-blue-300',
  Ke:  'bg-green-50 text-green-800 border-green-300',
  Te:  'bg-yellow-50 text-yellow-800 border-yellow-300',
  '-': 'bg-gray-50 text-gray-400 border-gray-200',
};

const NOTE_SIZES: Record<NoteValue, string> = {
  'whole':          'text-2xl',
  'half':           'text-2xl',
  'quarter':        'text-xl',
  'dotted-quarter': 'text-xl',
  'eighth':         'text-lg',
  'dotted-eighth':  'text-lg',
  'sixteenth':      'text-base',
  'rest-quarter':   'text-xl',
  'rest-eighth':    'text-lg',
  'rest-sixteenth': 'text-base',
};

interface Props {
  pattern: UsulPatternType;
}

export default function UsulPattern({ pattern }: Props) {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-sm font-semibold text-gray-600">Usûl:</span>
        <span className="text-sm font-bold">{pattern.name}</span>
        <span className="text-xs text-gray-400 ml-1">({pattern.timeSignature})</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {pattern.beats.map((beat, i) => {
          const color = STROKE_COLORS[beat.stroke] ?? 'bg-gray-50 text-gray-600 border-gray-200';
          const noteSymbol = beat.noteValue ? NOTE_SYMBOLS[beat.noteValue] : null;
          const noteSize = beat.noteValue ? NOTE_SIZES[beat.noteValue] : 'text-xl';

          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-between min-w-[52px] px-2 pt-1 pb-2 rounded-lg border ${color} select-none`}
            >
              {/* Sıra numarası */}
              <span className="text-[10px] text-gray-400 leading-none mb-1">{i + 1}</span>

              {/* Nota sembolü */}
              <span
                className={`leading-none ${noteSize} font-light`}
                title={beat.noteValue ?? ''}
                style={{ fontFamily: 'serif' }}
              >
                {noteSymbol ?? ''}
              </span>

              {/* Vuruş adı */}
              <span className="text-xs font-bold leading-none mt-1">
                {beat.stroke === '-' ? '—' : beat.stroke}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
