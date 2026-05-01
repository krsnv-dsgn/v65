import { useState } from 'react';
import { theme, wrapper } from '../styles';
import { useReveal, useIsMobile } from '../hooks/useReveal';
import { files } from '../data/files';
import FileRow from './FileRow';

export default function TechPackage() {
  const { ref, style: revealStyle } = useReveal();
  const mobile = useIsMobile();
  const [btnHovered, setBtnHovered] = useState(false);

  const handleDownloadAll = () => {
    files.forEach((f, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = `/docs/${f.filename}`;
        a.download = f.filename;
        a.click();
      }, i * 200);
    });
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
          §03 · Техпакет
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
          Технический <span style={{ fontStyle: 'italic', color: theme.accent }}>пакет</span>
        </h2>
        <p style={{
          fontFamily: theme.fontSans,
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.6,
          color: theme.textMuted,
          margin: 0,
        }}>
          Восемь листов для согласования с ТЦ
        </p>
      </div>

      <div style={{ ...wrapper }}>
        <div style={{ border: `1px solid ${theme.border}`, borderRadius: 2, overflow: 'hidden', background: theme.surface }}>
          {files.map((file, i) => (
            <FileRow key={file.number} {...file} isLast={i === files.length - 1} />
          ))}
        </div>

        <button
          onClick={handleDownloadAll}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            width: '100%',
            marginTop: 16,
            padding: '18px 24px',
            background: btnHovered ? 'rgba(200,165,120,0.18)' : 'rgba(200,165,120,0.08)',
            border: `1px solid ${btnHovered ? 'rgba(200,165,120,0.4)' : 'rgba(200,165,120,0.2)'}`,
            borderRadius: 2,
            fontFamily: theme.fontMono,
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: theme.accent,
            cursor: 'pointer',
            transition: `all 500ms ${theme.easeOut}`,
            boxShadow: btnHovered
              ? '0 8px 28px -12px rgba(200,165,120,0.4), 0 0 0 1px rgba(200,165,120,0.1) inset'
              : 'none',
            transform: btnHovered ? 'translateY(-1px)' : 'translateY(0)',
          }}
        >
          {/* Shimmer sweep on hover */}
          <span
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent, rgba(200,165,120,0.18), transparent)',
              transform: btnHovered ? 'translateX(100%)' : 'translateX(-100%)',
              transition: `transform 1100ms ${theme.easeOut}`,
              pointerEvents: 'none',
            }}
          />
          <span style={{ position: 'relative' }}>Скачать весь пакет</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{
            position: 'relative',
            transform: btnHovered ? 'translateY(2px)' : 'translateY(0)',
            transition: `transform 500ms ${theme.easeSpring}`,
          }}>
            <path d="M8 3v8m0 0l-3-3m3 3l3-3M3 13h10" stroke={theme.accent} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  );
}
