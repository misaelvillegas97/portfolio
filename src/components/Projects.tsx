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
      <div className="page-width">
        <header className="section-heading section-heading--inline">
          <div><p className="eyebrow">{t('projects.eyebrow')}</p><h2 id="projects-title">{t('projects.title')}</h2></div>
          <p>{t('projects.description')}</p>
        </header>
        <div className="case-studies">
          {entries.filter(([, project]) => project.image).map(([key, project], index) => {
            if (!project.image || !project.url) return null;
            return (
              <article className="case-study" key={key} id={key} aria-labelledby={key + '-title'}>
                <header className="case-study__heading">
                  <p className="eyebrow"><span aria-hidden="true">0{index + 1}</span>{project.domain}</p>
                  <h3 id={key + '-title'}>{project.title}{' '}<span>{project.tagline}</span></h3>
                </header>
                <div className="case-study__body">
                  <figure className="case-study__figure">
                    <a className="case-study__image-link" href={project.url} target="_blank" rel="noopener noreferrer" aria-label={t('projects.labels.visit') + ': ' + project.title}>
                      <img src={assetBase + project.image.src} width={project.image.width} height={project.image.height} alt={project.image.alt} loading="lazy" decoding="async" />
                      <span><ArrowUpRight aria-hidden="true" size={15} />{t('projects.labels.visit')}</span>
                    </a>
                    <figcaption>{project.image.caption}</figcaption>
                  </figure>
                  <div className="case-study__copy">
                    <div><h4>{t('projects.labels.problem')}</h4><p>{project.problem}</p></div>
                    <div><h4>{t('projects.labels.contribution')}</h4><p>{project.contribution}</p></div>
                    <div>
                      <h4>{t('projects.labels.capabilities')}</h4>
                      <ul className="project-capabilities" role="list">
                        {project.capabilities.map(capability => <li key={capability}>{capability}</li>)}
                      </ul>
                    </div>
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
                    <p>{project.problem}</p>
                    <p>{project.contribution}</p>
                    <ul className="chip-list" role="list">
                      {project.capabilities.map(capability => <li key={capability}>{capability}</li>)}
                    </ul>
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
