import { theme } from '../styles';

export default function ScrollHint() {
  return (
    <div style={{
      position: 'absolute',
      bottom: 32,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
    }}>
      <span style={{
        fontFamily: theme.fontMono,
        fontSize: 9,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: theme.textMuted,
        opacity: 0.7,
      }}>
        Прокрутите
      </span>
      <div style={{
        width: 1,
        height: 32,
        background: `linear-gradient(to bottom, transparent, ${theme.accent})`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <span style={{
          position: 'absolute',
          top: -16,
          left: 0,
          width: 1,
          height: 16,
          background: theme.accent,
          animation: 'scrollLineSlide 2.4s cubic-bezier(0.65, 0, 0.35, 1) infinite',
        }} />
      </div>
    </div>
  );
}
