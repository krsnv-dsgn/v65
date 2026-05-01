import { theme } from '../styles';
import { useScrollProgress } from '../hooks/useReveal';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: 'rgba(255,255,255,0.03)',
        zIndex: 100,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        height: '100%',
        width: `${progress * 100}%`,
        background: `linear-gradient(90deg, transparent, ${theme.accent} 50%, ${theme.accent})`,
        boxShadow: `0 0 12px ${theme.accent}`,
        transition: 'width 120ms linear',
      }} />
    </div>
  );
}
