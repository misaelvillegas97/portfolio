import { ArrowDownRight, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import SystemsMap from './SystemsMap';

interface Signal {
  value: string;
  label: string;
}

export default function Hero() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const signals = Object.values(
    t('hero.signals', { returnObjects: true }) as Record<string, Signal>,
  );

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="atlas-grid hero__layout">
        <div className="hero__copy">
          <p className="eyebrow"><span>00</span>{t('hero.eyebrow')}</p>
          <h1 id="hero-title">{t('hero.title')}</h1>
          <div className="hero__identity">
            <strong>{t('hero.name')}</strong>
            <span>{t('hero.role')}</span>
          </div>
          <p className="hero__description">{t('hero.description')}</p>
          <div className="hero__actions">
            <a className="action-link action-link--primary" href="#projects">
              {t('hero.primaryCta')}
              <ArrowDownRight aria-hidden="true" size={19} />
            </a>
            <a
              className="action-link action-link--secondary"
              href={isEnglish
                ? '../assets/CV David Misael Villegas Sandoval.pdf'
                : './assets/CV David Misael Villegas Sandoval.pdf'}
              download
            >
              <Download aria-hidden="true" size={18} />
              {t('hero.secondaryCta')}
            </a>
          </div>
        </div>

        <SystemsMap />

        <dl className="hero__signals" aria-label={isEnglish ? 'Professional signals' : 'Señales profesionales'}>
          {signals.map((signal) => (
            <div key={signal.value}>
              <dt>{signal.label}</dt>
              <dd>{signal.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
