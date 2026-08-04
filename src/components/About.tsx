import { useTranslation } from 'react-i18next';

interface Principle {
  title: string;
  description: string;
}

interface CapabilityGroup extends Principle {
  items: string[];
}

export default function About() {
  const { t } = useTranslation();
  const principles = Object.values(
    t('principles.items', { returnObjects: true }) as Record<string, Principle>,
  );

  return (
    <section id="principles" className="section-shell deferred-section" aria-labelledby="principles-title">
      <div className="atlas-grid section-layout">
        <header className="section-heading">
          <p className="eyebrow"><span>01</span>{t('principles.eyebrow')}</p>
          <h2 id="principles-title">{t('principles.title')}</h2>
        </header>
        <div className="section-content">
          <p className="section-intro">{t('principles.description')}</p>
          <ol className="principles-list">
            {principles.map((principle, index) => (
              <li key={principle.title}>
                <span className="principles-list__number">0{index + 1}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function Capabilities() {
  const { t } = useTranslation();
  const groups = Object.values(
    t('capabilities.groups', { returnObjects: true }) as Record<string, CapabilityGroup>,
  );
  const technologies = t('capabilities.technologies', { returnObjects: true }) as string[];

  return (
    <section id="capabilities" className="section-shell deferred-section capabilities" aria-labelledby="capabilities-title">
      <div className="atlas-grid section-layout">
        <header className="section-heading">
          <p className="eyebrow"><span>04</span>{t('capabilities.eyebrow')}</p>
          <h2 id="capabilities-title">{t('capabilities.title')}</h2>
        </header>
        <div className="section-content">
          <p className="section-intro">{t('capabilities.description')}</p>
          <div className="capability-groups">
            {groups.map((group, index) => (
              <article key={group.title}>
                <span className="capability-groups__number">0{index + 1}</span>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <ul>
                  {group.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <ul className="technology-index" aria-label={t('capabilities.eyebrow')}>
            {technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
