import { useState } from 'react';
import { theme, wrapper } from '../styles';
import { useReveal, useIsMobile } from '../hooks/useReveal';

export default function Video({ videoUrl = null }) {
  const { ref, style: revealStyle } = useReveal();
  const mobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  const renderPlayer = () => {
    if (!videoUrl) {
      return (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}>
          {/* Pulsing accent ring */}
          <div style={{ position: 'relative', width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span aria-hidden style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: `1px solid ${theme.accent}`,
              opacity: 0.3,
              animation: 'glowPulse 2.6s ease-in-out infinite',
            }} />
            <span aria-hidden style={{
              position: 'absolute',
              inset: -8,
              borderRadius: '50%',
              border: `1px solid ${theme.accent}`,
              opacity: hovered ? 0.25 : 0,
              transform: hovered ? 'scale(1.1)' : 'scale(1)',
              transition: `all 700ms ${theme.easeOut}`,
            }} />
            <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'relative' }}>
              <circle cx="24" cy="24" r="23" stroke={hovered ? theme.accent : 'rgba(255,255,255,0.18)'} strokeWidth="1" style={{ transition: `stroke 500ms ${theme.easeOut}` }} />
              <path d="M20 16l12 8-12 8V16z" fill={hovered ? theme.accent : 'rgba(255,255,255,0.25)'} style={{ transition: `fill 500ms ${theme.easeOut}` }} />
            </svg>
          </div>
          <span style={{
            fontFamily: theme.fontMono,
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: theme.textMuted,
          }}>
            Видео будет доступно здесь
          </span>
        </div>
      );
    }

    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const id = videoUrl.includes('youtu.be')
        ? videoUrl.split('/').pop()
        : new URL(videoUrl).searchParams.get('v');
      return (
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      );
    }

    if (videoUrl.includes('vimeo.com')) {
      const id = videoUrl.split('/').pop();
      return (
        <iframe
          src={`https://player.vimeo.com/video/${id}`}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      );
    }

    return (
      <video
        src={videoUrl}
        controls
        preload="metadata"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
      />
    );
  };

  return (
    <section style={{ padding: mobile ? '64px 0' : '96px 0' }}>
      <div ref={ref} style={{ ...wrapper, ...revealStyle, marginBottom: mobile ? 24 : 48 }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: theme.fontMono,
          fontSize: 10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: theme.accent,
          marginBottom: 20,
        }}>
          <span style={{ width: 32, height: 1, background: theme.accent, opacity: 0.6 }} />
          §04 · Видео
        </span>
        <h2 style={{
          fontFamily: theme.fontSerif,
          fontSize: mobile ? 32 : 44,
          fontWeight: 400,
          lineHeight: 1.1,
          color: theme.textPrimary,
          margin: '0 0 12px',
          letterSpacing: '-0.01em',
        }}>
          Разбор <span style={{ fontStyle: 'italic', color: theme.accent }}>проекта</span>
        </h2>
        <p style={{
          fontFamily: theme.fontSans,
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.6,
          color: theme.textMuted,
          margin: 0,
        }}>
          Видеоразбор проектного решения
        </p>
      </div>

      <div style={{ ...wrapper }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            background: hovered ? 'rgba(255,255,255,0.045)' : theme.surface,
            border: `1px solid ${hovered ? 'rgba(200,165,120,0.18)' : theme.border}`,
            borderRadius: 2,
            overflow: 'hidden',
            transition: `all 600ms ${theme.easeOut}`,
            boxShadow: hovered ? '0 24px 60px -28px rgba(200,165,120,0.3)' : 'none',
          }}
        >
          {renderPlayer()}
        </div>
      </div>
    </section>
  );
}
