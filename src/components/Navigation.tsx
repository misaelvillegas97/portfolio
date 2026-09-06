import { useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const navItems = [
    { label: t('navigation.projects'), href: '#projects' },
    { label: t('navigation.experience'), href: '#experience' },
    { label: t('navigation.principles'), href: '#principles' },
    { label: t('navigation.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !mobileMenu.current?.contains(event.target)) {
        mobileMenu.current?.removeAttribute('open');
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenu.current?.open) {
        mobileMenu.current.removeAttribute('open');
        mobileMenu.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="atlas-grid navigation" aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}>
        <a className="navigation__brand" href="#home" aria-label={isEnglish ? 'David Villegas Sandoval — Home' : 'David Villegas Sandoval — Inicio'}>
          <span className="navigation__signature" aria-hidden="true" />
          <span className="navigation__wordmark"><span className="navigation__given">David</span><span className="navigation__family">Villegas Sandoval</span></span>
        </a>
        <div className="navigation__desktop">
          <ul className="navigation__links">
            {navItems.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
          </ul>
          <LanguageToggle />
        </div>
        <details className="navigation__mobile" ref={mobileMenu}>
          <summary aria-label={t('navigation.menuLabel')}><Menu aria-hidden="true" size={20} /><span>{isEnglish ? 'Menu' : 'Menú'}</span></summary>
          <div className="navigation__mobile-panel">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')}>{item.label}</a>
                </li>
              ))}
            </ul>
            <LanguageToggle />
          </div>
        </details>
      </nav>
    </header>
  );
}
