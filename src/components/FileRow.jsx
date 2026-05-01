import { useState } from 'react';
import { theme } from '../styles';

export default function FileRow({ number, name, filename, isLast }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`/docs/${filename}`}
      download
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '18px 20px',
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
        background: hovered ? 'rgba(200,165,120,0.05)' : 'transparent',
        textDecoration: 'none',
        transition: `background 450ms ${theme.easeOut}, padding-left 450ms ${theme.easeOut}`,
        cursor: 'pointer',
        paddingLeft: hovered ? 28 : 20,
        overflow: 'hidden',
      }}
    >
      {/* Sweeping accent line on hover */}
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
          transformOrigin: 'center',
          transition: `transform 500ms ${theme.easeOut}`,
        }}
      />

      <span style={{
        fontFamily: theme.fontMono,
        fontSize: 11,
        color: hovered ? theme.accent : theme.textMuted,
        minWidth: 24,
        transition: `color 450ms ${theme.easeOut}`,
      }}>
        {number}
      </span>

      <span style={{
        fontFamily: theme.fontSans,
        fontSize: 14,
        fontWeight: 400,
        color: theme.textPrimary,
        flex: 1,
      }}>
        {name}
      </span>

      <span style={{
        fontFamily: theme.fontMono,
        fontSize: 9,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: theme.textMuted,
      }}>
        PDF
      </span>

      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        transform: hovered ? 'translateY(2px)' : 'translateY(0)',
        transition: `transform 500ms ${theme.easeSpring}`,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 3v8m0 0l-3-3m3 3l3-3M3 13h10"
            stroke={hovered ? theme.accent : theme.textMuted}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: `stroke 450ms ${theme.easeOut}` }}
          />
        </svg>
      </span>
    </a>
  );
}
