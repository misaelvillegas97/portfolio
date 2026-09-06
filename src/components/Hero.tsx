import { ArrowDownRight, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const sectors = t('hero.sectors', { returnObjects: true }) as string[];

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="atlas-grid hero__layout">
        <div className="hero__copy">
          <p className="eyebrow">{t('hero.role')}</p>
          <h1 id="hero-title">{t('hero.title')}</h1>
          <p className="hero__subtitle">{t('hero.subtitle')}</p>
          <p className="hero__description">{t('hero.description')}</p>
          <div className="hero__actions">
            <a className="action-link action-link--primary" href="#projects">
              {t('hero.primaryCta')}<ArrowDownRight aria-hidden="true" size={19} />
            </a>
            <a className="action-link action-link--secondary"
              href={isEnglish ? '../assets/CV David Misael Villegas Sandoval.pdf' : './assets/CV David Misael Villegas Sandoval.pdf'} download>
              <Download aria-hidden="true" size={18} />{t('hero.secondaryCta')}
            </a>
          </div>
          <a className="text-link hero__contact" href="#contact">{t('hero.contactCta')}</a>
        </div>
        <aside className="hero__sectors" aria-labelledby="hero-sectors-title">
          <p className="hero__career">{t('hero.careerLabel')}</p>
          <p className="hero__career-description">{t('hero.careerDescription')}</p>
          <p id="hero-sectors-title" className="hero__sectors-title">{t('hero.sectorsLabel')}</p>
          <ul className="hero__sectors-list" role="list">
            {sectors.map((sector) => <li key={sector}>{sector}</li>)}
          </ul>
          <a className="text-link" href="#experience">{t('hero.experienceCta')}<ArrowDownRight aria-hidden="true" size={16} /></a>
        </aside>
      </div>
    </section>
  );
}
