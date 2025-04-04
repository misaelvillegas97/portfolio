import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { 
      name: 'Angular',
      icon: 'https://cdn.svgporn.com/logos/angular-icon.svg',
      category: 'Frontend'
    },
    { 
      name: 'NGRX',
      icon: 'https://ngrx.io/assets/images/badge.svg',
      category: 'Frontend'
    },
    { 
      name: 'React',
      icon: 'https://cdn.svgporn.com/logos/react.svg',
      category: 'Frontend'
    },
    { 
      name: 'Redux',
      icon: 'https://cdn.svgporn.com/logos/redux.svg',
      category: 'Frontend'
    },
    { 
      name: 'TailwindCSS',
      icon: 'https://cdn.svgporn.com/logos/tailwindcss-icon.svg',
      category: 'Frontend'
    },
    { 
      name: 'Framer Motion',
      icon: 'https://cdn.svgporn.com/logos/framer.svg',
      category: 'Frontend'
    },
    { 
      name: 'Sass',
      icon: 'https://cdn.svgporn.com/logos/sass.svg',
      category: 'Frontend'
    },
    { 
      name: 'NestJS',
      icon: 'https://cdn.svgporn.com/logos/nestjs.svg',
      category: 'Backend'
    },
    { 
      name: 'NodeJS',
      icon: 'https://cdn.svgporn.com/logos/nodejs-icon.svg',
      category: 'Backend'
    },
    { 
      name: 'Express',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
      category: 'Backend'
    },
    { 
      name: 'Java',
      icon: 'https://cdn.svgporn.com/logos/java.svg',
      category: 'Backend'
    },
    { 
      name: 'Spring Boot',
      icon: 'https://cdn.svgporn.com/logos/spring-icon.svg',
      category: 'Backend'
    },
    { 
      name: 'PostgreSQL',
      icon: 'https://cdn.svgporn.com/logos/postgresql.svg',
      category: 'Databases'
    },
    { 
      name: 'MongoDB',
      icon: 'https://cdn.svgporn.com/logos/mongodb-icon.svg',
      category: 'Databases'
    },
    { 
      name: 'Redis',
      icon: 'https://cdn.svgporn.com/logos/redis.svg',
      category: 'Databases'
    },
    { 
      name: 'MySQL',
      icon: 'https://cdn.svgporn.com/logos/mysql.svg',
      category: 'Databases'
    },
    { 
      name: 'AWS',
      icon: 'https://cdn.svgporn.com/logos/aws.svg',
      category: 'Cloud'
    },
    { 
      name: 'GCP',
      icon: 'https://cdn.svgporn.com/logos/google-cloud.svg',
      category: 'Cloud'
    },
    { 
      name: 'Firebase',
      icon: 'https://cdn.svgporn.com/logos/firebase.svg',
      category: 'Cloud'
    },
    { 
      name: 'Docker',
      icon: 'https://cdn.svgporn.com/logos/docker-icon.svg',
      category: 'Tools'
    },
    { 
      name: 'Git',
      icon: 'https://cdn.svgporn.com/logos/git-icon.svg',
      category: 'Tools'
    },
    { 
      name: 'Playwright',
      icon: 'https://cdn.svgporn.com/logos/playwright.svg',
      category: 'Automatization'
    },
    { 
      name: 'Puppeteer',
      icon: 'https://cdn.svgporn.com/logos/puppeteer.svg',
      category: 'Automatization'
    },
    { 
      name: 'Cypress',
      icon: 'https://cdn.svgporn.com/logos/cypress.svg',
      category: 'Automatization'
    }
  ];

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section id="about" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">{t('about.title')}</h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-lg mb-6 leading-relaxed">{t('about.description1')}</p>
            <p className="text-lg mb-6 leading-relaxed">{t('about.description2')}</p>
            <p className="text-lg mb-6 leading-relaxed">{t('about.description3')}</p>
            <p className="text-lg mb-6 leading-relaxed">{t('about.description4')}</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8">{t('about.technicalSkills')}</h3>
            <div className="space-y-8">
              {categories.map((category) => (
                <div key={category}>
                  <h4 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">{category}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {skills
                      .filter(skill => skill.category === category)
                      .map((skill) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={inView ? { opacity: 1, y: 0 } : {}}
                          transition={{ duration: 0.5 }}
                          className="group flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md"
                        >
                          <img 
                            src={skill.icon} 
                            alt={skill.name}
                            className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {skill.name}
                          </span>
                        </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}