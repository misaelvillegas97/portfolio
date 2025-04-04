import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Database, Server, Bot, CreditCard, Truck, Phone, Building, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Projects() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: t('projects.casino.title'),
      company: "Blaze",
      description: t('projects.casino.description'),
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      tags: ["NodeJS", "NestJS", "ReactJS", "Redux", "Unit Testing", "Integration Testing", "Cryptocurrency", "Fireblock"],
      highlights: t('projects.casino.highlights', { returnObjects: true })
    },
    {
      title: t('projects.enterprise.title'),
      company: "Polodev SPA",
      description: t('projects.enterprise.description'),
      icon: <Bot className="w-12 h-12 text-primary" />,
      tags: ["Angular", "ReactJS", "VanillaJS", "NestJS", "NodeJS", "AWS Lambda", "Microservices", "AWS Bedrock"],
      highlights: t('projects.enterprise.highlights', { returnObjects: true })
    },
    {
      title: t('projects.transport.title'),
      company: "Falabella",
      description: t('projects.transport.description'),
      icon: <Truck className="w-12 h-12 text-primary" />,
      tags: ["Angular", "Java Spring Boot", "NestJS", "NodeJS", "PostgreSQL", "GCP", "Firebase", "MongoDB", "Microservices"],
      highlights: t('projects.transport.highlights', { returnObjects: true })
    },
    {
      title: t('projects.telecom.title'),
      company: "NTT Data",
      description: t('projects.telecom.description'),
      icon: <Phone className="w-12 h-12 text-primary" />,
      tags: ["Angular", "Java Spring Boot", "PHP Magento", "NodeJS", "AWS", "RabbitMQ", "Quarkus"],
      highlights: t('projects.telecom.highlights', { returnObjects: true })
    },
    {
      title: t('projects.intranet.title'),
      company: "Carpetres",
      description: t('projects.intranet.description'),
      icon: <Building className="w-12 h-12 text-primary" />,
      tags: ["Angular", "NodeJS", "PostgreSQL", "GCP", "Content Management"],
      highlights: t('projects.intranet.highlights', { returnObjects: true })
    }
  ];

  return (
    <section id="projects" ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4"
      >
        <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">{t('projects.title')}</h2>
        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group bg-white dark:bg-gray-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      {project.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-primary font-medium">{project.company}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-8">
                  <h4 className="font-semibold mb-4 text-lg">{t('projects.keyAchievements')}:</h4>
                  <ul className="space-y-3">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-gradient-to-r from-primary to-purple-500 rounded-full"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium group-hover:bg-primary/10 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}