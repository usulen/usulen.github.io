export type Stroke = 'Düm' | 'Tek' | 'Ke' | 'Te' | '-';

export interface UsulBeat {
  stroke: Stroke;
  label?: string; // optional sub-label (e.g. "Ka")
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
