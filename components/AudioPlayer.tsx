'use client';

import { useEffect, useRef, useState } from 'react';

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

export default function AudioPlayer({ youtubeId, title }: Props) {
  const playerRef = useRef<any>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let destroyed = false;

    const initPlayer = () => {
      if (destroyed || !holderRef.current) return;
      playerRef.current = new window.YT.Player(holderRef.current, {
        height: '1',
        width: '1',
        videoId: youtubeId,
        playerVars: { autoplay: 0, controls: 0, rel: 0 },
        events: {
          onReady: () => { if (!destroyed) setReady(true); },
          onStateChange: (e: any) => {
            if (!destroyed) setPlaying(e.data === window.YT.PlayerState.PLAYING);
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
      playerRef.current?.destroy();
    };
  }, [youtubeId]);

  const toggle = () => {
    if (!playerRef.current || !ready) return;
    if (playing) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="mt-4 flex items-center gap-3">
      {/* Gizli YouTube iframe */}
      <div style={{ position: 'fixed', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
        <div ref={holderRef} />
      </div>

      <button
        onClick={toggle}
        disabled={!ready}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white transition-colors"
        aria-label={playing ? 'Durdur' : 'Çal'}
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
      <span className="text-sm text-gray-600">{ready ? title : 'Yükleniyor…'}</span>
    </div>
  );
}
