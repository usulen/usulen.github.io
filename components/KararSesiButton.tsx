'use client';

import { useRef, useState } from 'react';

const KARAR: Record<string, { freq: number; perde: string }> = {
  'Rast':     { freq: 440,    perde: 'Rast' },
  'Uşşak':   { freq: 493.88, perde: 'Dügâh' },
  'Bayati':  { freq: 493.88, perde: 'Dügâh' },
  'Hüseynî': { freq: 493.88, perde: 'Dügâh' },
  'Muhayyer':{ freq: 493.88, perde: 'Dügâh' },
  'Hicaz':   { freq: 493.88, perde: 'Dügâh' },
  'Büselik': { freq: 493.88, perde: 'Dügâh' },
  'Kürdî':   { freq: 493.88, perde: 'Dügâh' },
  'Nevâ':    { freq: 493.88, perde: 'Dügâh' },
};

export default function KararSesiButton({ makam }: { makam: string }) {
  const [playing, setPlaying] = useState(false);
  const ctxRef  = useRef<AudioContext | null>(null);
  const oscRef  = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const karar = KARAR[makam];
  if (!karar) return null;
  const { freq, perde } = karar;

  const stop = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (gainRef.current && ctxRef.current) {
      gainRef.current.gain.cancelScheduledValues(ctxRef.current.currentTime);
      gainRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.1);
    }
    setTimeout(() => {
      oscRef.current?.stop();
      ctxRef.current?.close();
      oscRef.current  = null;
      ctxRef.current  = null;
      gainRef.current = null;
    }, 150);
    setPlaying(false);
  };

  const play = () => {
    const ctx  = new AudioContext();
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.4, ctx.currentTime + 4.6);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 5);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 5.1);
    ctxRef.current  = ctx;
    oscRef.current  = osc;
    gainRef.current = gain;
    setPlaying(true);
    timerRef.current = setTimeout(() => setPlaying(false), 5200);
  };

  const toggle = () => (playing ? stop() : play());

  return (
    <div className="mt-3 flex items-center gap-3">
      <button
        onClick={toggle}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
        aria-label={playing ? 'Durdur' : 'Karar sesini çal'}
      >
        {playing ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>
      <span className="text-sm text-gray-600">Karar Sesi ({perde})</span>
    </div>
  );
}
