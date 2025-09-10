import React from 'react';
import { motion } from 'framer-motion';
import { FiCloud, FiServer, FiShield, FiDatabase, FiGlobe, FiZap, FiLayers, FiCpu } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';
import { useNavigate } from 'react-router-dom';

export default function CloudDevelopmentPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiCloud className="w-6 h-6" />,
      title: 'Arquitectura Cloud Nativa',
      description: 'Te ofrezco diseño e implementación de aplicaciones optimizadas para la nube, utilizando microservicios y contenedores para garantizar máxima eficiencia.'
    },
    {
      icon: <FiServer className="w-6 h-6" />,
      title: 'Infraestructura como Código',
      description: 'Automatizo tu infraestructura con herramientas como Terraform, CloudFormation y Kubernetes para garantizarte despliegues consistentes y reproducibles.'
    },
    {
      icon: <FiShield className="w-6 h-6" />,
      title: 'Seguridad Cloud',
      description: 'Te protejo implementando las mejores prácticas de seguridad, encriptación avanzada y asegurando el cumplimiento normativo en la nube.'
    },
    {
      icon: <FiDatabase className="w-6 h-6" />,
      title: 'Bases de Datos Cloud',
      description: 'Gestiono tus bases de datos escalables en la nube, utilizando servicios administrados para ofrecerte alta disponibilidad y rendimiento óptimo.'
    },
    {
      icon: <FiZap className="w-6 h-6" />,
      title: 'Serverless Computing',
      description: 'Te ayudo a desarrollar aplicaciones serverless que optimizan costos y escalan automáticamente según la demanda de tu negocio.'
    },
    {
      icon: <FiLayers className="w-6 h-6" />,
      title: 'DevOps y CI/CD',
      description: 'Te implemento pipelines de integración y despliegue continuo que permiten entregas rápidas, confiables y con la máxima calidad.'
    }
  ];

  const technologies = [
    'AWS',
    'Azure',
    'Google Cloud',
    'Kubernetes',
    'Docker',
    'Terraform',
    'Jenkins',
    'GitLab CI',
    'Prometheus',
    'Grafana'
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
              Mi Servicio de Desarrollo en la Nube
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-6">
                Escalable y Seguro
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-violet-200 mb-8 max-w-3xl mx-auto"
            >
              Transformo tu negocio con soluciones cloud nativas que maximizan la eficiencia,
              escalabilidad y seguridad de tus aplicaciones, adaptándome a tus necesidades específicas.
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
                ¿Listo para Migrar a la Nube?
              </h2>
              <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                Contáctame hoy para discutir cómo puedo ayudarte a aprovechar todo el
                potencial de la computación en la nube para tu negocio, con soluciones personalizadas que impulsen tu crecimiento.
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