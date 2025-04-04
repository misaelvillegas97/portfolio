import { motion } from 'framer-motion';
import { Github, Linkedin, ExternalLink, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-block">
              <h1 className="text-4xl md:text-7xl font-bold !leading-normal mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">{t('hero.greeting')}</h1>
            </div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl text-gray-600 dark:text-gray-300 mb-6 font-light"
          >{t('hero.role')}</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >{t('hero.description')}</motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.a
              href="/assets/CV David Misael Villegas Sandoval.pdf"
              download
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <Download size={20} className="relative z-10" />
              <span className="relative z-10 font-medium">{t('hero.downloadCV')}</span>
            </motion.a>
            
            <div className="flex justify-center gap-8">
              <motion.a 
                href="https://github.com/misaelvillegas97" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.1 }}
              >
                <Github size={28} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/misaelv/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={28} />
              </motion.a>
              <motion.a 
                href="https://platzi.com/p/misaelv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:-translate-y-1"
                whileHover={{ scale: 1.1 }}
              >
                <ExternalLink size={28} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}