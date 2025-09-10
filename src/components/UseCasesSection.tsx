import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiTrendingUp, FiShield } from 'react-icons/fi';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

const useCases = [
  {
    id: 1,
    title: 'Automatización Inteligente de Procesos',
    description: 'Automatización de flujos de trabajo complejos con IA que aprende y se adapta a las necesidades de su negocio.',
    icon: FiZap,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-900/20',
    metrics: [
      { label: 'Eficiencia', value: '+200%', description: 'Aumento en la productividad' },
      { label: 'Precisión', value: '99.8%', description: 'Tasa de precisión en tareas' },
      { label: 'Ahorro', value: '60%', description: 'Reducción de costos operativos' }
    ],
    features: [
      'Integración con sistemas existentes',
      'Aprendizaje continuo',
      'Monitoreo en tiempo real'
    ]
  },
  {
    id: 2,
    title: 'Análisis Predictivo Avanzado',
    description: 'Predicciones precisas basadas en datos históricos y tendencias del mercado para una mejor toma de decisiones.',
    icon: FiTrendingUp,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-900/20',
    metrics: [
      { label: 'Precisión', value: '97.5%', description: 'Tasa de predicción' },
      { label: 'ROI', value: '5x', description: 'Retorno de inversión' },
      { label: 'Tiempo', value: '-70%', description: 'Reducción en análisis' }
    ],
    features: [
      'Modelos personalizables',
      'Alertas tempranas',
      'Dashboards interactivos'
    ]
  },
  {
    id: 3,
    title: 'Seguridad y Cumplimiento',
    description: 'Protección avanzada contra amenazas y garantía de cumplimiento normativo con IA.',
    icon: FiShield,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-900/20',
    metrics: [
      { label: 'Detección', value: '99.9%', description: 'Tasa de detección' },
      { label: 'Tiempo', value: '-90%', description: 'Respuesta a incidentes' },
      { label: 'Cumplimiento', value: '100%', description: 'Normativas cubiertas' }
    ],
    features: [
      'Monitoreo 24/7',
      'Análisis de comportamiento',
      'Reportes automáticos'
    ]
  }
];

const UseCasesSection = () => {
  const { isDarkTheme } = useApp();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-black to-violet-900/30">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Soluciones de IA para su Negocio
          </motion.h2>
          <motion.p 
            className="text-violet-200 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Descubra cómo nuestras soluciones de IA pueden transformar sus operaciones y potenciar su negocio
          </motion.p>
        </div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.id}
              className={`${useCase.bgColor} backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-all duration-300 transform hover:-translate-y-2`}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
            >
              <div className={`w-14 h-14 ${useCase.iconColor} rounded-lg flex items-center justify-center mb-6`}>
                <useCase.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{useCase.title}</h3>
              <p className="text-violet-200 mb-6">{useCase.description}</p>
              
              <div className="space-y-4 mb-6">
                {useCase.metrics.map((metric, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-violet-300 text-sm">{metric.label}</span>
                    <span className="text-white font-semibold">{metric.value}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <h4 className="text-sm font-medium text-violet-300 mb-3">Características principales:</h4>
                <ul className="space-y-2">
                  {useCase.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-violet-200 text-sm">
                      <svg className="w-4 h-4 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link 
                to="/automation-solutions" 
                className="block mt-6 w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center rounded-lg hover:opacity-90 transition-opacity"
              >
                Saber más
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-white mb-4">¿Listo para transformar su negocio con IA?</h3>
          <p className="text-violet-200 mb-8">Como especialista en IA, me comprometo a ofrecerte soluciones tecnológicas personalizadas que generen un impacto real en tu negocio, optimizando procesos y creando nuevas oportunidades de crecimiento.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity text-center"
            >
              Solicitar Demostración
            </Link>
            <button 
              onClick={scrollToTop}
              className="px-6 py-3 bg-transparent border border-violet-400 text-violet-200 rounded-lg hover:bg-violet-900/30 transition-colors text-center w-full sm:w-auto"
            >
              Ver Casos de Estudio
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UseCasesSection;
