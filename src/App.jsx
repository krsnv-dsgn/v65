import { theme } from './styles';
import Hero from './components/Hero';
import Presentation from './components/Presentation';
import TechPackage from './components/TechPackage';
import Video from './components/Video';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div style={{ background: theme.bg, color: theme.textPrimary, minHeight: '100vh', fontFamily: theme.fontSans, position: 'relative' }}>
      <ScrollProgress />
      <Hero />
      <Presentation />
      <TechPackage />
      <Video />
      <Footer />
    </div>
  );
}
