import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Principle { title: string; description: string }

export default function About() {
  const { t } = useTranslation();
  const principles = Object.values(t('principles.items', { returnObjects: true }) as Record<string, Principle>);
  const technologies = t('capabilities.technologies', { returnObjects: true }) as string[];

  return (
    <section id="principles" className="section-shell deferred-section approach" aria-labelledby="principles-title">
      <div className="wrap page-width">
        <header className="section-heading">
          <h2 id="principles-title">
            {t('principles.title').split(' ').map((word, index) => (
              <span className="method-word" key={index}>{word}{' '}</span>
            ))}
          </h2>
          <p>{t('principles.description')}</p>
        </header>
        <ol className="principles-list" role="list">
          {principles.map((principle, index) => (
            <li key={principle.title}>
              <span className="principles-list__node" aria-hidden="true"><span>{index + 1}</span></span>
              <h3>{principle.title}</h3><p>{principle.description}</p>
            </li>
          ))}
        </ol>
        <div id="capabilities" className="capabilities">
          <details>
            <summary>{t('capabilities.title')}<ChevronDown aria-hidden="true" size={18} /></summary>
            <div className="disclosure-body"><div className="disclosure-content">
              <p>{t('capabilities.description')}</p>
              <ul className="technology-index" aria-label={t('capabilities.eyebrow')} role="list">
                {technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
            </div></div>
          </details>
        </div>
      </div>
    </section>
  );
}
