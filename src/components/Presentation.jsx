import { theme, wrapper } from '../styles';
import { useReveal, useIsMobile } from '../hooks/useReveal';
import { slides } from '../data/slides';
import SlideCard from './SlideCard';

export default function Presentation() {
  const { ref, style: revealStyle } = useReveal();
  const mobile = useIsMobile();

  return (
    <section style={{ padding: mobile ? '64px 0' : '96px 0' }}>
      <div ref={ref} style={{ ...wrapper, ...revealStyle, marginBottom: mobile ? 32 : 56 }}>
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
          §02 · Презентация
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
          Что <span style={{ fontStyle: 'italic', color: theme.accent }}>внутри</span> проекта
        </h2>
        <p style={{
          fontFamily: theme.fontSans,
          fontSize: 14,
          fontWeight: 300,
          lineHeight: 1.6,
          color: theme.textMuted,
          margin: 0,
        }}>
          Одиннадцать листов проектного решения
        </p>
      </div>

      <div style={{ ...wrapper, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {slides.map((slide, i) => (
          <SlideCard key={slide.number} {...slide} index={i} />
        ))}
      </div>
    </section>
  );
}
