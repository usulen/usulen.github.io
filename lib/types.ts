export interface UsulBeat {
  stroke: string;    // Düm | Tek | Te | Ke | Kâ | - vb.
  duration: number;  // Kaç denominator birimi sürdüğü (ör. 4/4'te Düm=2, Tek=1)
  rest?: boolean;    // Susma işareti mi?
}

export interface UsulPattern {
  name: string;           // "Düyek"
  timeSignature: string;  // "8/8"
  beats: UsulBeat[];
}

export interface Eser {
  id: string;
  title: string;
  makam: string;
  usul: string;
  beste?: string;
  gufte?: string;
  form?: string;
  scorePath?: string;
  audioPath?: string;
  usulPatternKey: string;
  timeSignatureOverride?: string; // Eser farklı bir zaman işareti kullanıyorsa (ör. '4/8')
}
