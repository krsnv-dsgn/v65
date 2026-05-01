import { theme, wrapper } from '../styles';

export default function Footer() {
  return (
    <footer style={{ padding: '48px 0' }}>
      <div style={{ ...wrapper }}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            fontFamily: theme.fontMono,
            fontSize: 9,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: theme.textMuted,
          }}>
            KRSNV / Карсонов А.В.
          </span>
          <span style={{
            fontFamily: theme.fontMono,
            fontSize: 9,
            letterSpacing: '0.2em',
            color: theme.textMuted,
          }}>
            2026
          </span>
        </div>
      </div>
    </footer>
  );
}
