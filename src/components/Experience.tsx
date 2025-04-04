import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

export default function Experience() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: t('experience.roles.senior'),
      company: "Blaze",
      location: `${t('experience.remote')} - Brazil`,
      period: `Nov 2024 - ${t('experience.present')}`,
      description: t('experience.blaze.description', { returnObjects: true })
    },
    {
      title: t('experience.roles.seniorConsultant'),
      company: "Polodev SPA",
      location: `${t('experience.remote')} - Chile`,
      period: `Feb 2024 - ${t('experience.present')}`,
      description: t('experience.polodev.description', { returnObjects: true })
    },
    {
      title: t('experience.roles.senior'),
      company: "Falabella",
      location: "Chile",
      period: "Sep 2021 - Dec 2023",
      description: t('experience.falabella.description', { returnObjects: true })
    },
    {
      title: t('experience.roles.semiSenior'),
      company: "NTT Data",
      location: "Chile",
      period: "Sep 2019 - Sep 2021",
      description: t('experience.nttdata.description', { returnObjects: true })
    },
    {
      title: t('experience.roles.junior'),
      company: "Carpetres",
      location: "Chile",
      period: "Jul 2018 - Sep 2019",
      description: t('experience.carpetres.description', { returnObjects: true })
    },
    {
      title: t('experience.roles.entry'),
      company: "Innoapsion",
      location: "Chile",
      period: "Jul 2017 - Jan 2018",
      description: t('experience.innoapsion.description', { returnObjects: true })
    }
  ];

  return (
    <section id="experience" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold mb-8">{t('experience.title')}</h2>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="border-l-2 border-primary pl-8 relative"
            >
              <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0" />
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
              </div>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                <span className="font-medium">{exp.company}</span>
                <span>•</span>
                <span>{exp.location}</span>
              </div>
              <ul className="list-disc list-inside space-y-2">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-gray-700 dark:text-gray-300">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}