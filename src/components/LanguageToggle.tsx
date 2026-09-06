import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;
  const destination = isEnglish ? '../' : './en/';

  return (
    <a className="language-link" href={destination} hrefLang={isEnglish ? 'es-CL' : 'en'} lang={isEnglish ? 'es' : 'en'}
      aria-label={t('navigation.languageLabel')}
      onClick={(event) => {
        const candidates = Array.from(document.querySelectorAll('main section[id], main article[id], #capabilities')).filter((element) => {
          const bounds = element.getBoundingClientRect();
          return bounds.top < 180 && bounds.bottom > 100;
        });
        const current = candidates[candidates.length - 1];
        event.currentTarget.href = destination + (current ? '#' + current.id : window.location.hash);
      }}>
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} /><span>{isEnglish ? 'ES' : 'EN'}</span>
    </a>
  );
}
