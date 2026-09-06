import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const email = t('contact.email');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }
  }

  return (
    <section id="contact" className="contact deferred-section" aria-labelledby="contact-title">
      <div className="atlas-grid contact__layout">
        <header>
          <p className="eyebrow">{t('contact.eyebrow')}</p>
          <h2 id="contact-title">{t('contact.title')}</h2>
          <p>{t('contact.description')}</p>
          <p className="contact__availability">{t('contact.availability')}</p>
        </header>
        <div className="contact__actions">
          <address>
            <span className="eyebrow">{t('contact.emailLabel')}</span>
            <a className="contact__email" href={'mailto:' + email + '?subject=' + encodeURIComponent(t('contact.emailSubject'))}>{email}<ArrowUpRight aria-hidden="true" size={23} /></a>
          </address>
          <p>{t('contact.nextStep')}</p>
          <button type="button" className="text-link copy-email" onClick={() => { void copyEmail(); }}>
            {copyStatus === 'copied' ? <Check aria-hidden="true" size={16} /> : <Copy aria-hidden="true" size={16} />}
            {t('contact.copyLabel')}
          </button>
          <p className="copy-status" role="status" aria-live="polite">{copyStatus === 'copied' ? t('contact.copied') : copyStatus === 'error' ? t('contact.copyError') : ''}</p>
          <div className="contact__links">
            <a className="text-link" href="https://www.linkedin.com/in/misaelv/" target="_blank" rel="me noopener noreferrer">
              <Linkedin aria-hidden="true" size={18} />{t('contact.primaryLabel')}<ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <a className="text-link" href={isEnglish ? '../assets/CV David Misael Villegas Sandoval.pdf' : './assets/CV David Misael Villegas Sandoval.pdf'} download>
              <Download aria-hidden="true" size={18} />{t('contact.cvLabel')}
            </a>
            <a className="text-link" href="https://github.com/misaelvillegas97" target="_blank" rel="me noopener noreferrer">
              <Github aria-hidden="true" size={18} />GitHub<ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
