import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 font-medium"
      aria-label="Toggle language"
    >
      {i18n.language === 'en' ? 'ES' : 'EN'}
    </motion.button>
  );
}