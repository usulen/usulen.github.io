import { UsulPattern } from '@/lib/types';

// duration: kaç denominator birimi sürdüğü
//   4/4 → 1 birim = dörtlük nota
//   8/8 → 1 birim = sekizlik nota
//   Formül: quarterEşdeğeri = duration × 4 / denominator

export const USULLER: Record<string, UsulPattern> = {
  'Nim Sofyan': {
    name: 'Nim Sofyan',
    timeSignature: '2/4',
    beats: [
      { stroke: 'Düm', duration: 1   }, // dörtlük
      { stroke: 'Tek', duration: 0.5 }, // sekizlik
    ],
  },
  'Semâî': {
    name: 'Semâî',
    timeSignature: '3/4',
    beats: [
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Tek', duration: 0.5 },
      { stroke: 'Tek', duration: 0.5 },
    ],
  },
  'Sofyan': {
    name: 'Sofyan',
    timeSignature: '4/4',
    beats: [
      { stroke: 'Düm', duration: 2 }, // yarım nota
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Kâ',  duration: 1 },
    ],
  },
  'Türk Aksağı': {
    name: 'Türk Aksağı',
    timeSignature: '5/8',
    beats: [
      { stroke: 'Düm', duration: 2 }, // dörtlük (2 sekizlik)
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Yürük Semâî': {
    name: 'Yürük Semâî',
    timeSignature: '6/4',
    beats: [
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 1   },
      { stroke: 'Tek', duration: 1   },
    ],
  },
  'Devr-i Hindî': {
    name: 'Devr-i Hindî',
    timeSignature: '7/4',
    beats: [
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
    ],
  },
  'Düyek': {
    name: 'Düyek',
    timeSignature: '8/8',
    beats: [
      { stroke: 'Düm', duration: 2   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 2   },
      { stroke: '-',   duration: 1, rest: true },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
    ],
  },
  'Müsemmen': {
    name: 'Müsemmen',
    timeSignature: '8/8',
    beats: [
      { stroke: 'Düm', duration: 2   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Düm', duration: 2   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
    ],
  },
  'Ağır Aksak': {
    name: 'Ağır Aksak',
    timeSignature: '9/4',
    beats: [
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 0.5 },
      { stroke: 'Tek', duration: 0.5 },
    ],
  },
  'Curcuna': {
    name: 'Curcuna',
    timeSignature: '10/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
  'Aksak': {
    name: 'Aksak',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Düm', duration: 3 }, // noktalı dörtlük
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
  'Raks Aksağı': {
    name: 'Raks Aksağı',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 3 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
  'Aksak Semâî': {
    name: 'Aksak Semâî',
    timeSignature: '10/8',
    beats: [
      { stroke: 'Düm', duration: 3 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
  'Devr-i Turan': {
    name: 'Devr-i Turan',
    timeSignature: '7/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 3 }, // noktalı dörtlük
    ],
  },
  'Evfer': {
    name: 'Evfer',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 3 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
  'Lenk Fahte': {
    name: 'Lenk Fahte',
    timeSignature: '10/4',
    beats: [
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Tek', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
      { stroke: 'Düm', duration: 1   },
      { stroke: 'Te',  duration: 0.5 },
      { stroke: 'Ke',  duration: 0.5 },
    ],
  },
};
