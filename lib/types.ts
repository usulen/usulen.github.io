export type NoteValue =
  | 'whole'           // o
  | 'half'            // 𝅗𝅥
  | 'quarter'         // ♩
  | 'dotted-quarter'  // ♩.
  | 'eighth'          // ♪
  | 'dotted-eighth'   // ♪.
  | 'sixteenth'       // ♬
  | 'rest-quarter'    // 𝄽
  | 'rest-eighth'     // 𝄾
  | 'rest-sixteenth'; // 𝄿

export const NOTE_SYMBOLS: Record<NoteValue, string> = {
  'whole':          '𝅝',
  'half':           '𝅗𝅥',
  'quarter':        '♩',
  'dotted-quarter': '♩.',
  'eighth':         '♪',
  'dotted-eighth':  '♪.',
  'sixteenth':      '♬',
  'rest-quarter':   '𝄽',
  'rest-eighth':    '𝄾',
  'rest-sixteenth': '𝄿',
};

export interface UsulBeat {
  stroke: string;       // Düm | Tek | Te | Ke | - (veya özel)
  noteValue?: NoteValue; // nota değeri
}

export interface UsulPattern {
  name: string;           // e.g. "Düyek"
  timeSignature: string;  // e.g. "8/8"
  beats: UsulBeat[];      // ordered beat strokes for one cycle
}

export interface Eser {
  id: string;
  title: string;
  makam: string;
  usul: string;
  beste?: string;   // composer
  gufte?: string;   // lyricist
  form?: string;    // şarkı, türkü, etc.
  scorePath?: string;  // /scores/<id>.png
  audioPath?: string;  // /audio/<id>.mp3
  usulPatternKey: string; // matches UsulPattern.name
}
