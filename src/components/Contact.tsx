import { ArrowUpRight, Download, Github, Instagram, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;

  return (
    <section id="contact" className="contact deferred-section" aria-labelledby="contact-title">
      <div className="atlas-grid contact__layout">
        <header>
          <p className="eyebrow"><span>05</span>{t('contact.eyebrow')}</p>
          <h2 id="contact-title">{t('contact.title')}</h2>
          <p>{t('contact.description')}</p>
          <p className="contact__availability">{t('contact.availability')}</p>
        </header>

        <address className="contact__actions">
          <a
            className="contact__primary"
            href="https://www.linkedin.com/in/misaelv/"
            target="_blank"
            rel="me noopener noreferrer"
          >
            <Linkedin aria-hidden="true" size={21} />
            <span>
              <small>{t('contact.primaryLabel')}</small>
              linkedin.com/in/misaelv
            </span>
            <ArrowUpRight aria-hidden="true" size={21} />
          </a>
          <a
            className="contact__cv"
            href={isEnglish
              ? '../assets/CV David Misael Villegas Sandoval.pdf'
              : './assets/CV David Misael Villegas Sandoval.pdf'}
            download
          >
            <Download aria-hidden="true" size={19} />
            {t('contact.cvLabel')}
          </a>
          <div className="social-links" aria-label={isEnglish ? 'Social profiles' : 'Perfiles sociales'}>
            <a href="https://github.com/misaelvillegas97" target="_blank" rel="me noopener noreferrer" aria-label="GitHub">
              <Github aria-hidden="true" size={19} />
              <span>GitHub</span>
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a href="https://www.instagram.com/*mslv.*/" target="_blank" rel="me noopener noreferrer" aria-label="Instagram">
              <Instagram aria-hidden="true" size={19} />
              <span>Instagram</span>
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}
