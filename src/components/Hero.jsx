import { useEffect, useState } from 'react';
import { theme, wrapper } from '../styles';
import { useIsMobile, useMouseParallax, useScrollProgress } from '../hooks/useReveal';
import ScrollHint from './ScrollHint';

export default function Hero() {
  const mobile = useIsMobile();
  const { x, y } = useMouseParallax();
  const progress = useScrollProgress();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Hero fades and lifts as user scrolls past it
  const heroFade = Math.max(0, 1 - progress * 4);
  const heroLift = progress * 60;

  // Soft glow follows cursor with damped lag
  const glowX = x * 100;
  const glowY = y * 100;

  const intro = (delay) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 1100ms ${theme.easeOut} ${delay}ms, transform 1100ms ${theme.easeOut} ${delay}ms`,
  });

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        opacity: heroFade,
        transform: `translateY(${-heroLift}px)`,
        willChange: 'opacity, transform',
      }}
    >
      {/* Animated coordinate grid */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '-60px',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          animation: 'gridDrift 32s linear infinite',
          maskImage: 'radial-gradient(ellipse at center, #000 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, #000 40%, transparent 80%)',
        }}
      />

      {/* Soft accent glow that follows cursor */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(200,165,120,0.10), transparent 50%)`,
          transition: 'background 200ms linear',
        }}
      />

      {/* Subtle vignette for depth */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      <div style={{
        ...wrapper,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 32,
        position: 'relative',
        zIndex: 1,
        ...intro(0),
      }}>
        <span style={{ fontFamily: theme.fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.textMuted, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: theme.accent,
            boxShadow: `0 0 8px ${theme.accent}`,
            animation: 'glowPulse 3s ease-in-out infinite',
          }} />
          KRSNV / Карсонов А.В.
        </span>
        <span style={{ fontFamily: theme.fontMono, fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: theme.textMuted }}>
          Стадия П
        </span>
      </div>

      <div style={{ ...wrapper, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', position: 'relative', zIndex: 1 }}>
        <span style={{
          ...intro(200),
          display: 'inline-block',
          fontFamily: theme.fontMono,
          fontSize: 10,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: theme.accent,
          marginBottom: 24,
          padding: '6px 12px',
          border: `1px solid rgba(200,165,120,0.25)`,
          borderRadius: 2,
          background: 'rgba(200,165,120,0.06)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          alignSelf: 'flex-start',
        }}>
          ТЦ Горбушкин Двор · В-65
        </span>

        <h1 style={{
          fontFamily: theme.fontSerif,
          fontSize: mobile ? 40 : 64,
          fontWeight: 400,
          lineHeight: 1.05,
          color: theme.textPrimary,
          margin: '0 0 28px',
          letterSpacing: '-0.01em',
          ...intro(400),
        }}>
          Салон <span style={{ fontStyle: 'italic', color: theme.accent }}>электроники</span>
        </h1>

        <p style={{
          fontFamily: theme.fontSans,
          fontSize: mobile ? 14 : 16,
          fontWeight: 300,
          lineHeight: 1.7,
          color: theme.textMuted,
          margin: 0,
          maxWidth: 460,
          ...intro(600),
        }}>
          Закрытая проектная страница. Презентация решения, технический пакет и видеоразбор для согласования с заказчиками и ТЦ.
        </p>

        <div style={{
          display: 'flex',
          gap: 24,
          marginTop: 48,
          fontFamily: theme.fontMono,
          fontSize: 10,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: theme.textMuted,
          ...intro(800),
        }}>
          <span><span style={{ color: theme.accent }}>11</span> разделов</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span><span style={{ color: theme.accent }}>8</span> чертежей</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span><span style={{ color: theme.accent }}>1</span> разбор</span>
        </div>
      </div>

      <div style={{ ...intro(1100) }}>
        <ScrollHint />
      </div>
    </section>
  );
}
