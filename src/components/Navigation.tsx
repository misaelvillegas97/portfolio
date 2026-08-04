import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import LanguageToggle from './LanguageToggle';

export default function Navigation() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const navItems = [
    { label: t('navigation.principles'), href: '#principles' },
    { label: t('navigation.projects'), href: '#projects' },
    { label: t('navigation.experience'), href: '#experience' },
    { label: t('navigation.capabilities'), href: '#capabilities' },
    { label: t('navigation.contact'), href: '#contact' },
  ];

  return (
    <header className="site-header">
      <nav
        className="atlas-grid navigation"
        aria-label={isEnglish ? 'Primary navigation' : 'Navegación principal'}
      >
        <a className="navigation__brand" href="#home" aria-label={t('navigation.home')}>
          <span className="navigation__mark" aria-hidden="true">D/VM</span>
          <span className="navigation__name">David Misael</span>
        </a>

        <div className="navigation__desktop">
          <ul className="navigation__links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
          <LanguageToggle />
        </div>

        <details className="navigation__mobile">
          <summary aria-label={t('navigation.menuLabel')}>
            <Menu aria-hidden="true" size={20} strokeWidth={1.8} />
            <span>{isEnglish ? 'Menu' : 'Menú'}</span>
          </summary>
          <div className="navigation__mobile-panel">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')}
                  >
                    {item.label}
                  </a>
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
