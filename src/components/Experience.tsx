import { useTranslation } from 'react-i18next';

interface ExperienceItem {
  company: string;
  role: string;
  period: {
    start: string;
    end: string;
  };
  summary: string;
  capabilities: string[];
}

export default function Experience() {
  const { t } = useTranslation();
  const items = Object.values(
    t('experience.items', { returnObjects: true }) as Record<string, ExperienceItem>,
  );

  return (
    <section id="experience" className="section-shell deferred-section experience" aria-labelledby="experience-title">
      <div className="atlas-grid section-layout">
        <header className="section-heading">
          <p className="eyebrow">{t('experience.eyebrow')}</p>
          <h2 id="experience-title">{t('experience.title')}</h2>
          <p>{t('experience.description')}</p>
          <p className="experience-note">{t('experience.note')}</p>
        </header>
        <ol className="experience-list" role="list">
          {items.map((item) => (
            <li key={`${item.company}-${item.period.start}`}>
              <div className="experience-list__period">
                <time dateTime={item.period.start}>{item.period.start.replace('-', ' / ')}</time>
                <span aria-hidden="true">—</span>
                {item.period.end === 'present' ? (
                  <span>{t('experience.present')}</span>
                ) : (
                  <time dateTime={item.period.end}>{item.period.end.replace('-', ' / ')}</time>
                )}
              </div>
              <div className="experience-list__content">
                <p>{item.company}</p>
                <h3 lang="en">{item.role}</h3>
                <p>{item.summary}</p>
                <ul className="chip-list" role="list">
                  {item.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
