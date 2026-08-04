import { useTranslation } from 'react-i18next';

import About, { Capabilities } from './components/About';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Hero from './components/Hero';
import Navigation from './components/Navigation';
import Projects from './components/Projects';

function App() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        {isEnglish ? 'Skip to content' : 'Saltar al contenido'}
      </a>
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Capabilities />
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="atlas-grid site-footer__inner">
          <p>© 2026 David Misael Villegas Sandoval</p>
          <p>{t('hero.role')}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
