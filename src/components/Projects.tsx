import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Project {
  title: string;
  domain: string;
  tagline: string;
  problem: string;
  contribution: string;
  capabilities: string[];
  status: string;
  url?: string;
  image?: { src: string; width: number; height: number; alt: string; caption: string };
}

export default function Projects() {
  const { t, i18n } = useTranslation();
  const projects = t('projects.items', { returnObjects: true }) as Record<string, Project>;
  const entries = Object.entries(projects);
  const assetBase = i18n.resolvedLanguage?.startsWith('en') ? '../' : './';

  return (
    <section id="projects" className="section-shell deferred-section projects" aria-labelledby="projects-title">
      <div className="wrap page-width">
        <header className="section-heading section-heading--inline">
          <h2 id="projects-title">{t('projects.title')}</h2>
          <p>{t('projects.description')}</p>
        </header>
        <div className="case-studies">
          {entries.filter(([, project]) => project.image).map(([key, project]) => {
            if (!project.image || !project.url) return null;
            return (
              <article className={'case-study case-study--' + key} key={key} id={key} aria-labelledby={key + '-title'}>
                <header className="case-study__heading">
                  <h3 id={key + '-title'}>{project.title}</h3>
                  <p>{project.domain}</p>
                </header>
                <div className="case-study__body">
                  <figure className="case-study__figure" aria-label={project.image.caption}>
                    <a className="case-study__image-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={t('projects.labels.visit') + ': ' + project.title}>
                      <div className="case-study__image-stage">
                        <img src={assetBase + project.image.src} width={project.image.width} height={project.image.height} alt={project.image.alt} loading="lazy" decoding="async" />
                      </div>
                      <span className="case-study__image-arrow"><ArrowUpRight aria-hidden="true" size={23} /></span>
                    </a>
                  </figure>
                  <div className="case-study__copy">
                    <p className="case-study__tagline">{project.tagline}</p>
                    <div><h4>{t('projects.labels.contribution')}</h4><p>{project.contribution}</p></div>
                    <details className="case-study__disclosure">
                      <summary>{t('projects.labels.scope')}<ChevronDown aria-hidden="true" size={18} /></summary>
                      <div className="disclosure-body"><div className="disclosure-content">
                        <h4>{t('projects.labels.problem')}</h4><p>{project.problem}</p>
                        <h4>{t('projects.labels.capabilities')}</h4>
                        <ul className="project-capabilities" role="list">
                          {project.capabilities.map(capability => <li key={capability}>{capability}</li>)}
                        </ul>
                      </div></div>
                    </details>
                    <div className="case-study__links">
                      <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer">
                        {t('projects.labels.visit')}<ArrowUpRight aria-hidden="true" size={17} />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="other-projects">
          <h3>{t('projects.otherTitle')}</h3>
          <div className="other-projects__list">
            {entries.filter(([, project]) => !project.image).map(([key, project]) => (
              <article key={key} className="other-project" id={key}>
                <div><h4>{project.title}</h4><p className="other-project__domain">{project.domain}</p></div>
                <div className="other-project__overview">
                  <p>{project.tagline}</p>
                  <details className="case-study__disclosure">
                    <summary>{t('projects.labels.scope')}<ChevronDown aria-hidden="true" size={18} /></summary>
                    <div className="disclosure-body"><div className="disclosure-content">
                      <h5>{t('projects.labels.problem')}</h5><p>{project.problem}</p>
                      <h5>{t('projects.labels.contribution')}</h5><p>{project.contribution}</p>
                      <h5>{t('projects.labels.capabilities')}</h5>
                      <ul className="project-capabilities" role="list">
                        {project.capabilities.map(capability => <li key={capability}>{capability}</li>)}
                      </ul>
                    </div></div>
                  </details>
                </div>
                {project.url ? (
                  <a className="text-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={t('projects.labels.visit') + ': ' + project.title}>{t('projects.labels.visit')}<ArrowUpRight aria-hidden="true" size={16} /></a>
                ) : <span className="project-status">{project.status}</span>}
              </article>
            ))}
          </div>
          <p className="evidence-note">{t('projects.evidenceNote')}</p>
        </div>
      </div>
    </section>
  );
}
