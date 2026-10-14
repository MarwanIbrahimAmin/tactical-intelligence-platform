import React from 'react';
import { Play, Pause, Volume2, Maximize2 } from 'lucide-react';

interface ClipPlayerProps {
  clipRef: string;
  interval?: { start: string; end: string };
  title?: string;
}

export const ClipPlayer: React.FC<ClipPlayerProps> = ({ clipRef, interval, title }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div style={{
      background: 'var(--deep-navy)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      position: 'relative',
      aspectRatio: '16 / 9',
      width: '100%',
      border: '1px solid var(--border-default)',
    }}>
      {/* Video placeholder */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: 'var(--slate-gray)',
        gap: 'var(--space-3)',
      }}>
        <div style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          background: 'rgba(184, 240, 90, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: '2px solid rgba(184, 240, 90, 0.3)',
        }}
          onClick={() => setIsPlaying(!isPlaying)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(184, 240, 90, 0.2)';
            e.currentTarget.style.borderColor = 'var(--tactical-lime)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(184, 240, 90, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(184, 240, 90, 0.3)';
          }}
        >
          {isPlaying
            ? <Pause size={26} color="var(--tactical-lime)" />
            : <Play size={26} color="var(--tactical-lime)" style={{ marginLeft: 3 }} />}
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: 'var(--off-white)' }}>
          {title || 'Match Clip'}
        </span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-muted)' }}>
          Demo — video playback simulated
        </span>
      </div>

      {/* Bottom controls bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 'var(--space-3) var(--space-4)',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ background: 'none', border: 'none', color: 'var(--off-white)', cursor: 'pointer', padding: 2 }}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {interval && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--slate-gray)', fontWeight: 500 }}>
              {interval.start} – {interval.end}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Volume2 size={16} color="var(--text-muted)" />
          <Maximize2 size={16} color="var(--text-muted)" />
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 'var(--space-4)',
        right: 'var(--space-4)',
        height: 4,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 2,
      }}>
        <div style={{
          width: isPlaying ? '45%' : '0%',
          height: '100%',
          background: 'var(--tactical-lime)',
          borderRadius: 2,
          transition: 'width 0.5s',
        }} />
      </div>
    </div>
  );
};
