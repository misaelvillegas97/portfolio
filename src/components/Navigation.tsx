import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';
import { setDisclosureOpen } from '../lib/disclosureMotion';

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
        setDisclosureOpen(mobileMenu.current, false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenu.current?.open) {
        setDisclosureOpen(mobileMenu.current, false);
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
      <nav className="wrap atlas-grid navigation" aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}>
        <a className="navigation__brand" href="#home" aria-label={isEnglish ? 'David Villegas Sandoval — Home' : 'David Villegas Sandoval — Inicio'}>
          <img className="navigation__signature" src={isEnglish ? '../favicon.svg' : './favicon.svg'} width={32} height={32} alt="" aria-hidden="true" />
          <span className="navigation__wordmark"><span className="navigation__given">David</span><span className="navigation__family">Villegas Sandoval</span></span>
        </a>
        <div className="navigation__desktop">
          <ul className="navigation__links">
            {navItems.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}
          </ul>
          <LanguageToggle />
        </div>
        <details className="navigation__mobile" ref={mobileMenu}>
          <summary aria-label={t('navigation.menuLabel')}><span>{isEnglish ? 'Menu' : 'Menú'}</span><span className="menu-glyph" aria-hidden="true"><span /><span /></span></summary>
          <div className="navigation__mobile-panel">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={(event) => setDisclosureOpen(event.currentTarget.closest('details'), false)}>{item.label}</a>
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
