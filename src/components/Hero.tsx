import { ArrowDown, ArrowDownRight, ChevronDown, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const sectors = t('hero.sectors', { returnObjects: true }) as string[];

  return (
    <section id="home" className="hero hero--centred" data-enter aria-labelledby="hero-title">
      <div className="wrap page-width hero__layout">
        <div className="hero__copy">
          <h1 id="hero-title" aria-label={t('hero.title')}>
            <span className="hero__line">David Villegas</span>{' '}
            <span className="hero__line">Sandoval<span className="hero__period" aria-hidden="true">.</span></span>
          </h1>
          <p className="hero__role">{t('hero.role')}</p>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <p className="hero__description">{t('hero.description')}</p>
          <div className="hero__actions">
            <a className="action-link action-link--primary" href="#projects">
              {t('hero.primaryCta')}<span className="action-link__icon"><ArrowDownRight aria-hidden="true" size={19} /></span>
            </a>
            <a className="action-link action-link--secondary"
              href={isEnglish ? '../assets/CV David Misael Villegas Sandoval.pdf' : './assets/CV David Misael Villegas Sandoval.pdf'} download>
              {t('hero.secondaryCta')}<Download aria-hidden="true" size={18} />
            </a>
          </div>
        </div>
        <div className="hero__baseline">
          <details className="hero__sectors">
            <summary>{t('hero.careerLabel')}<ChevronDown aria-hidden="true" size={16} /></summary>
            <div className="hero__sectors-content">
              <p className="hero__career-description">{t('hero.careerDescription')}</p>
              <p className="hero__sectors-title">{t('hero.sectorsLabel')}</p>
              <ul className="hero__sectors-list" role="list">
                {sectors.map((sector) => <li key={sector}>{sector}</li>)}
              </ul>
              <a className="text-link" href="#experience">{t('hero.experienceCta')}<ArrowDownRight aria-hidden="true" size={16} /></a>
            </div>
          </details>
          <a className="text-link hero__contact" href="#contact">{t('hero.contactCta')}</a>
          <a className="hero__scroll" href="#projects" aria-label={t('hero.primaryCta')}><ArrowDown aria-hidden="true" size={22} /></a>
        </div>
      </div>
    </section>
  );
}
