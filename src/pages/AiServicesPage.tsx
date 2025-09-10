import React from 'react';
import { motion } from 'framer-motion';
import { FiCpu, FiCode, FiZap, FiShield, FiDatabase, FiCloud, FiServer } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';
import { useNavigate } from 'react-router-dom';

export default function AiServicesPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const departments = [
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: 'Investigación en IA',
      description: 'Avanzada investigación en modelos de lenguaje, visión por computadora y aprendizaje por refuerzo para desarrollar soluciones innovadoras.',
      metrics: '15+ Proyectos de Investigación',
      features: ['Modelos de última generación', 'Publicaciones académicas', 'Colaboraciones con universidades']
    },
    {
      icon: <FiCode className="w-8 h-8" />,
      title: 'Ingeniería de IA',
      description: 'Diseño e implementación de sistemas de IA escalables y robustos para entornos de producción.',
      metrics: '50+ Modelos en Producción',
      features: ['Arquitecturas escalables', 'Pipelines de MLOps', 'Monitoreo de modelos']
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: 'IA Aplicada',
      description: 'Soluciones prácticas de IA para optimización de procesos y generación de valor en diversos sectores.',
      metrics: '30+ Casos de Éxito',
      features: ['Automatización de procesos', 'Análisis predictivo', 'Sistemas de recomendación']
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: 'Ética y Seguridad',
      description: 'Garantizamos el desarrollo responsable y seguro de aplicaciones de IA.',
      metrics: '100% Cumplimiento',
      features: ['Auditorías de ética', 'Protección de datos', 'Explicabilidad de modelos']
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: 'Ingeniería de Datos',
      description: 'Preparación y gestión de datos de calidad para entrenar modelos de IA efectivos.',
      metrics: '10+ TB Procesados',
      features: ['ETL Avanzado', 'Lakes de datos', 'Gobernanza de datos']
    },
    {
      icon: <FiCloud className="w-8 h-8" />,
      title: 'Cloud y DevOps',
      description: 'Despliegue y gestión de soluciones de IA en la nube con infraestructura como código.',
      metrics: '99.9% Uptime',
      features: ['Multi-nube', 'Autoescalado', 'CI/CD para IA']
    }
  ];

  const aiProducts = [
    {
      name: 'MAaaS Platform',
      description: 'Plataforma Multi-Agent as a Service para orquestar modelos de IA',
      category: 'Infraestructura',
      icon: <FiServer className="w-6 h-6" />
    },
    {
      name: 'NLP Suite',
      description: 'Herramientas avanzadas de Procesamiento de Lenguaje Natural',
      category: 'Herramientas',
      icon: <FiCode className="w-6 h-6" />
    },
    {
      name: 'Vision AI',
      description: 'Soluciones de visión por computadora para análisis de imágenes y video',
      category: 'Aplicaciones',
      icon: <FiCpu className="w-6 h-6" />
    },
    {
      name: 'PredictX',
      description: 'Plataforma de análisis predictivo para series temporales',
      category: 'Análisis',
      icon: <FiZap className="w-6 h-6" />
    }
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
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              Mis Servicios de IA
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-4">
                Soluciones Inteligentes
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-violet-200 mb-8 max-w-3xl mx-auto"
            >
              Transformo tus datos en soluciones inteligentes con modelos de IA personalizados,
              fine-tuning de LLMs y agentes inteligentes adaptados a tus necesidades específicas.
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

          {/* Departments Section */}
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold text-white mb-12 text-center"
            >
              Mis Especialidades en IA
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {departments.map((dept, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 hover:bg-opacity-10 transition-all duration-300 border border-white/5 hover:border-purple-500/30"
                >
                  <div className="text-purple-500 mb-4">{dept.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{dept.title}</h3>
                  <p className="text-violet-200 mb-4">{dept.description}</p>
                  <div className="text-purple-300 text-sm font-medium mb-3">{dept.metrics}</div>
                  <ul className="space-y-2">
                    {dept.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-violet-200 text-sm">
                        <span className="text-purple-500 mr-2">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          {/* AI Products Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Mis Productos de IA</h2>
              <p className="text-violet-200 max-w-2xl mx-auto">
                Soluciones listas para implementar que aprovechan mi experiencia en inteligencia artificial para impulsar tu negocio.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiProducts.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 border border-white/5"
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 mb-4">
                    {product.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-violet-200 text-sm mb-3">{product.description}</p>
                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300">
                    {product.category}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tecnologías que Utilizo */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <h2 className="text-3xl font-bold text-white mb-4">Tecnologías de Vanguardia</h2>
              <p className="text-violet-200 max-w-2xl mx-auto">
                Utilizo las herramientas y marcos más avanzados en el ecosistema de IA para ofrecerte soluciones de vanguardia.
              </p>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'TensorFlow', category: 'ML Framework' },
                { name: 'PyTorch', category: 'Deep Learning' },
                { name: 'Hugging Face', category: 'NLP' },
                { name: 'OpenAI', category: 'LLMs' },
                { name: 'LangChain', category: 'Agents' },
                { name: 'Ray', category: 'Distributed' },
                { name: 'Kubernetes', category: 'Orchestration' },
                { name: 'Docker', category: 'Containers' },
                { name: 'FastAPI', category: 'Backend' },
                { name: 'React', category: 'Frontend' },
                { name: 'PostgreSQL', category: 'Database' },
                { name: 'Redis', category: 'Caching' },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all duration-300 border border-white/5"
                >
                  <div className="text-2xl font-bold text-white mb-1">{tech.name}</div>
                  <div className="text-xs text-violet-300">{tech.category}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-4">
                ¿Listo para Transformar tu Negocio con IA?
              </h2>
              <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                Como experto en IA, me especializo en crear soluciones a medida que transforman tu negocio. 
                Juntos podemos convertir tus desafíos en oportunidades de crecimiento e innovación tecnológica.
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