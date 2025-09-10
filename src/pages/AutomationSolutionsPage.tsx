import React from 'react';
import { motion } from 'framer-motion';
import { FiDatabase, FiCpu, FiCloud, FiZap, FiMessageSquare, FiServer, FiClock, FiCode, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';

export default function AutomationSolutionsPage() {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const solutions = [
        {
            icon: <FiCpu className="w-6 h-6" />,
            title: 'Cloudflare Agents API',
            description: 'Te ofrezco un conjunto completo de herramientas para construir agentes inteligentes y escalables que gestionan tu lógica de negocio y estado en tiempo real.',
            features: [
                'Agente del lado del servidor con gestión de estado',
                'WebSocket API para comunicación bidireccional',
                'Sincronización y persistencia de estado',
                'Integración con React y frameworks modernos'
            ],
            useCases: [
                'Aplicaciones interactivas de alta performance',
                'Sistemas con estado distribuido',
                'Automatización con baja latencia',
                'Interfaces en tiempo real'
            ]
        },
        {
            icon: <FiCpu className="w-6 h-6" />,
            title: 'Model Context Protocol (MCP)',
            description: 'Te implemento un estándar abierto que actúa como un "USB-C para aplicaciones de IA", conectando tus sistemas de IA con aplicaciones externas de manera fluida.',
            features: [
                'Conexiones remotas e locales',
                'Roles definidos (Hosts, Clients, Servers)',
                'Protocolo estandarizado de comunicación',
                'Soporte para HTTP/SSE y stdio'
            ],
            useCases: [
                'Extensión de capacidades de IA',
                'Integración de herramientas externas',
                'Sistemas de automatización distribuidos'
            ]
        },
        {
            icon: <FiDatabase className="w-6 h-6" />,
            title: 'Cloudflare AutoRAG',
            description: 'Te proporciono una solución totalmente administrada para crear pipelines de retrieval-augmented generation (RAG) personalizados para tus necesidades.',
            features: [
                'Indexación Automatizada continua',
                'Integración con Cloudflare Workers',
                'Caching de Similitud optimizado'
            ],
            useCases: [
                'Chatbots de Soporte personalizados',
                'Herramientas Internas eficientes',
                'Búsqueda de Conocimiento Empresarial'
            ]
        },
        {
            icon: <FiCloud className="w-6 h-6" />,
            title: 'Cloudflare Workflows',
            description: 'Te ayudo a implementar un motor de ejecución duradero para orquestar tus aplicaciones de múltiples pasos de manera confiable.',
            features: [
                'Ejecución Duradera y confiable',
                'Automatización de Retries',
                'Persistencia de Estado',
                'Integración Flexible'
            ],
            useCases: [
                'Procesamiento de Transacciones',
                'Integración de Servicios',
                'Automatización de procesos'
            ]
        },
        {
            icon: <FiCpu className="w-6 h-6" />,
            title: 'Workers AI',
            description: 'Te ofrezco una plataforma serverless para ejecutar tus modelos de machine learning y tareas de IA en la infraestructura global de Cloudflare.',
            features: [
                'Ejecución de modelos de IA en el Edge',
                'Infraestructura escalable sin servidor',
                'Optimización automática de recursos',
                'Integración sencilla con aplicaciones'
            ],
            useCases: [
                'Chatbots y asistentes virtuales',
                'Recomendaciones personalizadas',
                'Análisis en tiempo real',
                'Procesamiento de IA distribuido'
            ]
        },
    ];

    const apiFeatures = [
        {
            icon: <FiGlobe className="w-6 h-6" />,
            title: 'Browse the Web',
            description: 'Te implemento esta funcionalidad en la Agents API de Cloudflare, permitiendo a tus agentes realizar solicitudes HTTP y conectarse a la web en tiempo real para ti.',
            benefits: [
                'Acceso a Información Externa',
                'Respuesta Dinámica',
                'Integración en Tiempo Real'
            ]
        },
        {
            icon: <FiDatabase className="w-6 h-6" />,
            title: 'Retrieval Augmented Generation (RAG)',
            description: 'Te ayudo a implementar el componente RAG en la Agents API, permitiendo a tus agentes combinar la generación de contenido por IA con la recuperación de información externa relevante para ti.',
            benefits: [
                'Respuestas Contextualizadas',
                'Aplicaciones de Soporte y Asistencia',
                'Optimización de la Información'
            ]
        },
        {
            icon: <FiServer className="w-6 h-6" />,
            title: 'MCP Agent API',
            description: 'Te ofrezco una extensión de la plataforma Cloudflare Agents para construir y desplegar tus propios servidores MCP personalizados.',
            benefits: [
                'Integración de herramientas personalizadas',
                'Persistencia de estado duradero',
                'Sincronización de estado avanzada',
                'Soporte para hibernación eficiente'
            ]
        },
        {
            icon: <FiMessageSquare className="w-6 h-6" />,
            title: 'WebSocket API',
            description: 'Te implemento conexiones en tiempo real para tus aplicaciones interactivas con comunicación bidireccional.',
            benefits: [
                'Comunicación en tiempo real',
                'Gestión de eventos avanzada',
                'Actualizaciones instantáneas'
            ]
        },
        {
            icon: <FiZap className="w-6 h-6" />,
            title: 'State Synchronization API',
            description: 'Te ofrezco sincronización automática del estado entre múltiples conexiones o instancias de tus aplicaciones.',
            benefits: [
                'Sincronización en tiempo real',
                'Coherencia de datos garantizada',
                'Actualizaciones automáticas'
            ]
        },
        {
            icon: <FiServer className="w-6 h-6" />,
            title: 'SQL & Scheduling API',
            description: 'Te proporciono soluciones de base de datos integrada y programación de tareas automatizadas personalizadas.',
            benefits: [
                'Almacenamiento persistente',
                'Programación flexible de tareas',
                'Consultas SQL optimizadas'
            ]
        },
        {
            icon: <FiClock className="w-6 h-6" />,
            title: 'Scheduling API',
            description: 'Te ayudo a programar tareas para ejecución futura, ya sea puntual, con retraso o en base a un cronograma que se ajuste a tus necesidades.',
            benefits: [
                'Programación de Tareas',
                'Automatización y Recordatorios',
                'Gestión de Cron Jobs',
                'Automatiza procesos de larga duración'
            ]
        },
        {
            icon: <FiCode className="w-6 h-6" />,
            title: 'Client API y React API',
            description: 'Te ofrezco clases y hooks personalizados para conectar y sincronizar el estado del agente en tus aplicaciones cliente.',
            benefits: [
                'Agente del Lado del Cliente',
                'Integración con Frameworks Modernos',
                'Experiencia de usuario coherente'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-theme-gradient">
            <Header />

            <main className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Hero Section */}
                    <div className="text-center mb-11">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-6xl font-bold text-white"
                        >
                            Mis Soluciones de
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pb-6">
                                Automatización Inteligente
                            </span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-xl text-violet-200 max-w-3xl mx-auto"
                        >
                            Cloudflare AutoRAG, MCP, Workflows y IA Agent: Potencia tu negocio con soluciones
                            de automatización avanzada y procesamiento inteligente.
                        </motion.p>
                    </div>

                    {/* Solutions Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.03, y: -5 }}
                                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-purple-500/20 hover:bg-white/10 transition-all duration-500 transform hover:border-purple-500/30"
                            >
                                <motion.div
                                    className="text-purple-500 mb-4"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ duration: 0.2 }}
                                >{solution.icon}</motion.div>
                                <h3 className="text-2xl font-semibold text-white mb-4 bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">{solution.title}</h3>
                                <p className="text-violet-200 mb-6 leading-relaxed">{solution.description}</p>

                                <div className="mb-6 relative">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2"></span>
                                        Características Clave:
                                    </h4>
                                    <ul className="space-y-3">
                                        {solution.features.map((feature, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="text-violet-200 flex items-center group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="relative">
                                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center">
                                        <span className="w-1 h-6 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full mr-2"></span>
                                        Casos de Uso:
                                    </h4>
                                    <ul className="space-y-3">
                                        {solution.useCases.map((useCase, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="text-violet-200 flex items-center group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                                {useCase}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* API Features Section */}
                    <div className="text-center mb-12">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 mb-4"
                        >
                            APIs y Características Avanzadas
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-violet-200 text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            Herramientas y APIs potentes para construir soluciones de automatización robustas y escalables.
                        </motion.p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {apiFeatures.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.03, y: -5 }}
                                    className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-xl hover:shadow-purple-500/20 hover:bg-white/10 transition-all duration-500 transform hover:border-purple-500/30"
                                >
                                    <motion.div
                                        className="text-purple-500 mb-4"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >{feature.icon}</motion.div>
                                    <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-violet-200 mb-4">{feature.title}</h3>
                                    <p className="text-violet-200 mb-6 leading-relaxed">{feature.description}</p>

                                    <ul className="space-y-3">
                                        {feature.benefits.map((benefit, idx) => (
                                            <motion.li
                                                key={idx}
                                                className="text-violet-200 flex items-center group"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></span>
                                                {benefit}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center">
                        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-12 backdrop-blur-sm">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                ¿Listo para Automatizar tu Negocio?
                            </h2>
                            <p className="text-violet-200 mb-8 max-w-2xl mx-auto">
                                Descubre cómo mis soluciones de automatización inteligente pueden
                                transformar tus procesos empresariales y hacer crecer tu negocio.
                            </p>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300"
                            >
                                Solicita una Demostración
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <AnimatedFooter />
        </div>
    );
}