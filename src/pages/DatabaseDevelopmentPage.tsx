import React from 'react';
import { motion } from 'framer-motion';
import { FiDatabase, FiServer, FiShield, FiLayers, FiZap, FiCpu } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';
import { useNavigate } from 'react-router-dom';

export default function DatabaseDevelopmentPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Diseño de Bases de Datos',
      description: 'Te ofrezco arquitecturas de bases de datos optimizadas y escalables, diseñadas específicamente para cubrir las necesidades únicas de tu negocio.'
    },
    {
      icon: <FiServer className="w-6 h-6" />,
      title: 'Alta Disponibilidad',
      description: 'Configuro clusters y replicación para garantizarte acceso continuo a tus datos, minimizando el tiempo de inactividad.'
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Seguridad de Datos',
      description: 'Te protejo implementando políticas de seguridad avanzadas, encriptación de última generación y asegurando el cumplimiento normativo.'
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: 'Migración de Datos',
      description: 'Te ayudo a migrar tus datos de manera segura y eficiente entre diferentes sistemas y plataformas, sin pérdida de información.'
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Optimización de Rendimiento',
      description: 'Mejoro significativamente el rendimiento de tus consultas y optimizo los índices para ofrecerte la máxima eficiencia en tus operaciones.'
    },
    {
      icon: <FiCpu className="w-6 h-6" />,
      title: 'Integración de Sistemas',
      description: 'Te ofrezco una conexión fluida y segura entre tus diferentes bases de datos y sistemas empresariales para una gestión unificada.'
    }
  ];

  const technologies = [
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Redis',
    'Elasticsearch',
    'Oracle',
    'SQL Server',
    'Cassandra',
    'TimescaleDB',
    'Neo4j'
  ];

  return (
    <div className="min-h-screen bg-theme-gradient">
      <Header />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-bold text-white"
            >
              Mi Servicio de Desarrollo de Bases de Datos
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-6">
                Robustas y Escalables
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-violet-200 mb-8 max-w-3xl mx-auto"
            >
              Diseño e implemento arquitecturas de datos que garantizan rendimiento,
              seguridad y escalabilidad para tu negocio, adaptadas a tus necesidades específicas.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Solicita una Consulta Gratuita
              </button>
            </motion.div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-10 transition-all duration-300"
              >
                <div className="text-purple-500 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-violet-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Technologies Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">Tecnologías que Manejo</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="px-6 py-3 bg-white bg-opacity-5 backdrop-blur-sm rounded-full text-violet-200 hover:bg-opacity-10 transition-all duration-300"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Listo para Optimizar tus Datos?
              </h2>
              <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                Contáctame hoy para discutir cómo puedo ayudarte a crear una arquitectura
                de datos robusta, segura y eficiente para tu empresa, adaptada a tus necesidades específicas.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Comienza tu Proyecto
              </button>
            </div>
          </div>
        </div>
      </main>

      <AnimatedFooter />
    </div>
  );
}