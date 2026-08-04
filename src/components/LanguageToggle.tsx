import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageToggle() {
  const { i18n, t } = useTranslation();
  const isEnglish = i18n.resolvedLanguage?.startsWith('en') ?? false;

  return (
    <a
      className="language-link"
      href={isEnglish ? '../' : './en/'}
      hrefLang={isEnglish ? 'es-CL' : 'en'}
      lang={isEnglish ? 'es' : 'en'}
      aria-label={t('navigation.languageLabel')}
    >
      <Languages aria-hidden="true" size={16} strokeWidth={1.8} />
      <span>{isEnglish ? 'ES' : 'EN'}</span>
    </a>
  );
}
