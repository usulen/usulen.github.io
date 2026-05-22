'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Props {
  youtubeId: string;
  title: string;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ youtubeId, title }: Props) {
  const playerRef  = useRef<any>(null);
  const holderRef  = useRef<HTMLDivElement>(null);
  const tickRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  const [playing,  setPlaying]  = useState(false);
  const [ready,    setReady]    = useState(false);
  const [current,  setCurrent]  = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume,   setVolume]   = useState(80);

  const stopTick = useCallback(() => {
    if (tickRef.current) { clearInterval(tickRef.current); tickRef.current = null; }
  }, []);

  const startTick = useCallback(() => {
    stopTick();
    tickRef.current = setInterval(() => {
      if (!playerRef.current) return;
      setCurrent(playerRef.current.getCurrentTime?.() ?? 0);
      setDuration(playerRef.current.getDuration?.() ?? 0);
    }, 500);
  }, [stopTick]);

  useEffect(() => {
    let destroyed = false;

    const initPlayer = () => {
      if (destroyed || !holderRef.current) return;
      playerRef.current = new window.YT.Player(holderRef.current, {
        height: '1', width: '1',
        videoId: youtubeId,
        playerVars: { autoplay: 0, controls: 0, rel: 0 },
        events: {
          onReady: (e: any) => {
            if (destroyed) return;
            e.target.setVolume(80);
            setDuration(e.target.getDuration?.() ?? 0);
            setReady(true);
          },
          onStateChange: (e: any) => {
            if (destroyed) return;
            const isPlaying = e.data === window.YT.PlayerState.PLAYING;
            setPlaying(isPlaying);
            isPlaying ? startTick() : stopTick();
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); initPlayer(); };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      destroyed = true;
      stopTick();
      playerRef.current?.destroy();
    };
  }, [youtubeId, startTick, stopTick]);

  const toggle = () => {
    if (!playerRef.current || !ready) return;
    playing ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
  };

  const seek = (delta: number) => {
    if (!playerRef.current || !ready) return;
    const next = Math.max(0, Math.min((playerRef.current.getCurrentTime?.() ?? 0) + delta, duration));
    playerRef.current.seekTo(next, true);
    setCurrent(next);
  };

  const onSeekBar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    playerRef.current?.seekTo(val, true);
    setCurrent(val);
  };

  const onVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    playerRef.current?.setVolume(val);
  };

  const btnCls = 'flex items-center justify-center rounded-full text-white transition-colors disabled:opacity-40';
  const gold   = { background: '#C9963A' };
  const goldHover = 'hover:opacity-90';

  return (
    <div className="mt-3 space-y-2" style={{ color: '#1C0E0A' }}>
      {/* Gizli YouTube iframe */}
      <div style={{ position: 'fixed', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <div ref={holderRef} />
      </div>

      {/* Başlık */}
      <p className="text-xs font-medium truncate" style={{ color: '#6B5040' }}>
        {ready ? title : 'Yükleniyor…'}
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs tabular-nums w-8 shrink-0" style={{ color: '#9A7B5A' }}>{fmt(current)}</span>
        <input
          type="range" min={0} max={duration || 1} step={1} value={current}
          onChange={onSeekBar}
          disabled={!ready}
          className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-40"
          style={{ accentColor: '#C9963A' }}
        />
        <span className="text-xs tabular-nums w-8 shrink-0 text-right" style={{ color: '#9A7B5A' }}>{fmt(duration)}</span>
      </div>

      {/* Kontroller */}
      <div className="flex items-center gap-2">
        {/* 10s geri */}
        <button onClick={() => seek(-10)} disabled={!ready} title="10 saniye geri"
          className={`${btnCls} ${goldHover} w-8 h-8`} style={gold}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 5V2L7 7l5 5V8c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
            <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white" fontFamily="system-ui">10</text>
          </svg>
        </button>

        {/* Play/Pause */}
        <button onClick={toggle} disabled={!ready} title={playing ? 'Durdur' : 'Çal'}
          className={`${btnCls} ${goldHover} w-10 h-10`} style={gold}>
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21"/>
            </svg>
          )}
        </button>

        {/* 10s ileri */}
        <button onClick={() => seek(10)} disabled={!ready} title="10 saniye ileri"
          className={`${btnCls} ${goldHover} w-8 h-8`} style={gold}>
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 5V2l5 5-5 5V8c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6h2c0 4.42-3.58 8-8 8s-8-3.58-8-8 3.58-8 8-8z"/>
            <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="bold" fill="white" fontFamily="system-ui">10</text>
          </svg>
        </button>

        {/* Ses */}
        <div className="flex items-center gap-1.5 ml-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" style={{ color: '#9A7B5A' }}>
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
          </svg>
          <input
            type="range" min={0} max={100} step={1} value={volume}
            onChange={onVolume}
            disabled={!ready}
            className="w-20 h-1.5 rounded-full appearance-none cursor-pointer disabled:opacity-40"
            style={{ accentColor: '#C9963A' }}
          />
        </div>
      </div>
    </div>
  );
}
