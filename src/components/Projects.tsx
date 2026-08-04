import { ArrowUpRight } from 'lucide-react';
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
}

interface ProjectLabels {
  problem: string;
  contribution: string;
  capabilities: string;
  status: string;
  visit: string;
  upcoming: string;
}

export default function Projects() {
  const { t } = useTranslation();
  const projects = Object.entries(
    t('projects.items', { returnObjects: true }) as Record<string, Project>,
  );
  const labels = t('projects.labels', { returnObjects: true }) as ProjectLabels;

  return (
    <section id="projects" className="section-shell deferred-section projects" aria-labelledby="projects-title">
      <div className="atlas-grid projects__heading">
        <div>
          <p className="eyebrow"><span>02</span>{t('projects.eyebrow')}</p>
          <h2 id="projects-title">{t('projects.title')}</h2>
        </div>
        <p className="section-intro">{t('projects.description')}</p>
      </div>

      <div className="atlas-grid case-studies">
        {projects.map(([key, project], index) => (
          <article className="case-study" key={key}>
            <div className="case-study__rail">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <span>{project.domain}</span>
            </div>
            <header className="case-study__identity">
              <p>{project.status}</p>
              <h3>{project.title}</h3>
              <p className="case-study__tagline">{project.tagline}</p>
            </header>
            <div className="case-study__details">
              <div>
                <h4>{labels.problem}</h4>
                <p>{project.problem}</p>
              </div>
              <div>
                <h4>{labels.contribution}</h4>
                <p>{project.contribution}</p>
              </div>
            </div>
            <footer className="case-study__footer">
              <div>
                <span className="case-study__footer-label">{labels.capabilities}</span>
                <ul className="chip-list" role="list">
                  {project.capabilities.map((capability) => <li key={capability}>{capability}</li>)}
                </ul>
              </div>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${labels.visit}: ${project.title}`}
                >
                  {labels.visit}
                  <ArrowUpRight aria-hidden="true" size={18} />
                </a>
              ) : (
                <span className="case-study__upcoming">
                  <span>{labels.status}</span>
                  {labels.upcoming}
                </span>
              )}
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
