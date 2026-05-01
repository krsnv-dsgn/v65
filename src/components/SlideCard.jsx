import { useState } from 'react';
import { theme } from '../styles';
import { useReveal, useIsMobile } from '../hooks/useReveal';

export default function SlideCard({ number, tag, title, description, index }) {
  const { ref, style: revealStyle, visible } = useReveal(index * 80);
  const mobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...revealStyle,
        display: 'flex',
        gap: 20,
        padding: mobile ? '20px 16px' : '28px 24px',
        background: hovered ? 'rgba(255,255,255,0.045)' : theme.surface,
        border: `1px solid ${hovered ? 'rgba(200,165,120,0.18)' : theme.border}`,
        borderRadius: 2,
        transform: visible
          ? (hovered ? 'translateY(-2px)' : 'translateY(0)')
          : 'translateY(32px)',
        transition: `${revealStyle.transition}, background 600ms ${theme.easeOut}, border-color 600ms ${theme.easeOut}, box-shadow 600ms ${theme.easeOut}`,
        boxShadow: hovered
          ? '0 12px 32px -16px rgba(200,165,120,0.25), 0 0 0 1px rgba(200,165,120,0.05) inset'
          : '0 1px 0 rgba(255,255,255,0.02) inset',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Accent edge bar that grows in on hover */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 2,
          background: theme.accent,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: `transform 600ms ${theme.easeOut}`,
        }}
      />

      <div style={{
        width: 48,
        height: 48,
        minWidth: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? 'rgba(200,165,120,0.18)' : 'rgba(200,165,120,0.1)',
        border: `1px solid ${hovered ? 'rgba(200,165,120,0.35)' : 'rgba(200,165,120,0.2)'}`,
        borderRadius: 2,
        fontFamily: theme.fontMono,
        fontSize: 13,
        color: theme.accent,
        transition: `all 500ms ${theme.easeOut}`,
        boxShadow: hovered ? '0 0 24px rgba(200,165,120,0.18)' : 'none',
      }}>
        {number}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <span style={{
          fontFamily: theme.fontMono,
          fontSize: 9,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: theme.accent,
          display: 'block',
          marginBottom: 8,
          opacity: hovered ? 1 : 0.85,
          transition: `opacity 500ms ${theme.easeOut}`,
        }}>
          {tag}
        </span>
        <h3 style={{
          fontFamily: theme.fontSerif,
          fontSize: mobile ? 18 : 22,
          fontWeight: 400,
          lineHeight: 1.2,
          color: theme.textPrimary,
          margin: '0 0 6px',
          letterSpacing: '-0.005em',
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: theme.fontSans,
          fontSize: 13,
          fontWeight: 300,
          lineHeight: 1.6,
          color: theme.textMuted,
          margin: 0,
        }}>
          {description}
        </p>
      </div>
    </div>
  );
}
