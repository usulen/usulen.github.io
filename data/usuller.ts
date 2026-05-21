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
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Semâî': {
    name: 'Semâî',
    timeSignature: '3/4',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Sofyan': {
    name: 'Sofyan',
    timeSignature: '4/4',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Kâ',  duration: 1 },
    ],
  },
  // ── 5 zamanlı ────────────────────────────────────────────────────────────
  'Türk Aksağı': {
    name: 'Türk Aksağı',
    timeSignature: '5/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  // ── 6 zamanlı ────────────────────────────────────────────────────────────
  'Yürük Semâî': {
    name: 'Yürük Semâî',
    timeSignature: '6/8',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Sengin Semâî': {
    name: 'Sengin Semâî',
    timeSignature: '6/4',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  // ── 7 zamanlı ────────────────────────────────────────────────────────────
  'Devr-i Hindî': {
    name: 'Devr-i Hindî',
    timeSignature: '7/4',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Devr-i Turan': {
    name: 'Devr-i Turan',
    timeSignature: '7/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 3 },
    ],
  },
  // ── 8 zamanlı ────────────────────────────────────────────────────────────
  'Düyek': {
    name: 'Düyek',
    timeSignature: '8/8',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Ağır Düyek': {
    name: 'Ağır Düyek',
    timeSignature: '8/4',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Müsemmen': {
    name: 'Müsemmen',
    timeSignature: '8/8',
    beats: [
      { stroke: 'Düm', duration: 3 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 3 },
    ],
  },
  // ── 9 zamanlı ────────────────────────────────────────────────────────────
  'Aksak': {
    name: 'Aksak',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Ağır Aksak': {
    name: 'Ağır Aksak',
    timeSignature: '9/4',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Evfer': {
    name: 'Evfer',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Raks Aksağı': {
    name: 'Raks Aksağı',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 3 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  'Oynak': {
    name: 'Oynak',
    timeSignature: '9/8',
    beats: [
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Tek', duration: 1 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 2 },
    ],
  },
  // ── 10 zamanlı ───────────────────────────────────────────────────────────
  'Curcuna': {
    name: 'Curcuna',
    timeSignature: '10/8',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Kâ',  duration: 2 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Aksak Semâî': {
    name: 'Aksak Semâî',
    timeSignature: '10/4',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Kâ',  duration: 2 },
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Tek', duration: 1 },
    ],
  },
  'Lenk Fahte': {
    name: 'Lenk Fahte',
    timeSignature: '10/4',
    beats: [
      { stroke: 'Düm', duration: 2 },
      { stroke: 'Tek', duration: 3 },
      { stroke: 'Düm', duration: 1 },
      { stroke: 'Tek', duration: 2 },
      { stroke: 'Te',  duration: 1 },
      { stroke: 'Ke',  duration: 1 },
    ],
  },
};
