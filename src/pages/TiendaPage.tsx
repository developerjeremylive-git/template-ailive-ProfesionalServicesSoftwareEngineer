import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCode, FiDatabase, FiCloud, FiServer, FiLayers, FiGlobe, FiSmartphone } from 'react-icons/fi';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';

interface TechCategory {
  name: string;
  technologies: {
    name: string;
    description: string;
  }[];
}

interface Product {
  id: string;
  name: string;
  description: string;
  techStack: TechCategory[];
  previewStack?: string[];
  price: number;
  icon: React.ReactNode;
  category: 'basic' | 'advanced';
  coming_soon?: boolean;
}

const products: Product[] = [
  // Productos Básicos
  {
    id: 'spa-001',
    name: 'Plantilla de Código para Aplicaciones Web de Página Única con Animaciones Suaves',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'TailwindCSS', description: 'Framework CSS' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 8.99,
    icon: <FiShoppingCart />,
    category: 'basic'
  },
  {
    id: 'spa-002',
    name: 'Plantilla de Código para Aplicaciones Web de Página Única con Elementos Informativos y Animaciones Suaves',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'TailwindCSS', description: 'Framework CSS' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 14.99,
    icon: <FiShoppingCart />,
    category: 'basic'
  },
  {
    id: 'basic-1',
    name: 'Plantilla E-commerce Básico',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'TailwindCSS', description: 'Framework CSS' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 49.99,
    icon: <FiShoppingCart />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-2',
    name: 'Blog Personal Pro',
    description: 'Plantilla moderno para blog con sistema de gestión de contenidos.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Next.js', description: 'Framework React con SSR' },
        { name: 'Markdown', description: 'Formato de contenido' },
        { name: 'Vercel', description: 'Plataforma de despliegue' }
      ]
    }],
    price: 29.99,
    icon: <FiCode />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-3',
    name: 'Dashboard Starter',
    description: 'Panel de control con gráficos y análisis básicos.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Vue.js', description: 'Framework progresivo de UI' },
        { name: 'Chart.js', description: 'Biblioteca de gráficos' },
        { name: 'Firebase', description: 'Plataforma de desarrollo' }
      ]
    }],
    price: 39.99,
    icon: <FiDatabase />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-4',
    name: 'Landing Page Kit',
    description: 'Kit de inicio para landing pages con componentes reutilizables.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Styled Components', description: 'CSS en JS' },
        { name: 'Netlify', description: 'Plataforma de despliegue' }
      ]
    }],
    price: 24.99,
    icon: <FiGlobe />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-5',
    name: 'Portfolio Plantilla',
    description: 'Plantilla para portfolio profesional con animaciones suaves.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Framer Motion', description: 'Biblioteca de animaciones' },
        { name: 'TailwindCSS', description: 'Framework CSS' }
      ]
    }],
    price: 34.99,
    icon: <FiLayers />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-6',
    name: 'API Starter Kit',
    description: 'Kit de inicio para crear APIs RESTful con autenticación.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Express.js', description: 'Framework de Node.js' },
        { name: 'JWT', description: 'Autenticación con tokens' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 44.99,
    icon: <FiServer />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-7',
    name: 'Chat App Plantilla',
    description: 'Plantilla para aplicación de chat en tiempo real.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Socket.io', description: 'Biblioteca para tiempo real' },
        { name: 'Node.js', description: 'Runtime de JavaScript' }
      ]
    }],
    price: 54.99,
    icon: <FiSmartphone />,
    category: 'basic',
    coming_soon: true
  },
  {
    id: 'basic-8',
    name: 'Cloud Storage App',
    description: 'Aplicación de almacenamiento en la nube con interfaz intuitiva.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'AWS S3', description: 'Almacenamiento en la nube' },
        { name: 'Express.js', description: 'Framework de Node.js' }
      ]
    }],
    price: 49.99,
    icon: <FiCloud />,
    category: 'basic',
    coming_soon: true
  },

  // Productos Avanzados
  {
    id: 'multispa-001',
    name: 'Plantilla Premium de Aplicación Multi-Página con Elementos Interactivos y Animaciones Dinámicas',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'TailwindCSS', description: 'Framework CSS' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 49.99,
    icon: <FiShoppingCart />,
    category: 'advanced'
  },
  {
    id: 'multispa-002',
    name: 'Suite Empresarial SaaS Premium: Plataforma Web Multi-Idioma con Sistema de Suscripciones',
    description: 'Solución SaaS completa con sistema de suscripciones y pagos automatizados mediante PayPal y Stripe. Incluye formularios de contacto personalizables, seguimiento de suscriptores al boletín, autenticación robusta y panel de administración multilingüe.',
    previewStack: ['React 18', 'TypeScript', 'Supabase', 'Cloudflare'],
    techStack: [
      {
        name: 'Frontend',
        technologies: [
          { name: 'React 18', description: 'Framework principal para la interfaz de usuario' },
          { name: 'TypeScript', description: 'Lenguaje con tipado estático para desarrollo robusto' },
          { name: 'Vite', description: 'Bundler y herramienta de desarrollo moderna' },
          { name: 'TailwindCSS', description: 'Framework CSS utilitario para estilos modernos' },
          { name: 'Framer Motion', description: 'Biblioteca para animaciones fluidas' },
          { name: 'React Router', description: 'Enrutamiento declarativo para React' },
          { name: 'React Hot Toast', description: 'Sistema de notificaciones elegante' }
        ]
      },
      {
        name: 'Backend/Serverless',
        technologies: [
          { name: 'Cloudflare Workers', description: 'Plataforma serverless para computación en el edge' },
          { name: 'Hono', description: 'Framework web ultraligero para Workers' },
          { name: 'DeepSeek', description: 'Integración con modelos de IA avanzados' }
        ]
      },
      {
        name: 'Base de datos y Autenticación',
        technologies: [
          { name: 'Supabase', description: 'Plataforma backend-as-a-service con PostgreSQL y autenticación' }
        ]
      },
      {
        name: 'Pagos',
        technologies: [
          { name: 'Stripe', description: 'Procesamiento de pagos seguro y flexible' },
          { name: 'PayPal', description: 'Método de pago alternativo internacional' }
        ]
      },
      {
        name: 'Herramientas de Desarrollo',
        technologies: [
          { name: 'ESLint', description: 'Herramienta de linting para código consistente' },
          { name: 'Wrangler', description: 'CLI para desarrollo y deploy en Cloudflare' },
          { name: 'Node.js v20', description: 'Entorno de ejecución JavaScript moderno' }
        ]
      }
    ],
    price: 89.99,
    icon: <FiShoppingCart />,
    category: 'advanced'
  },
  {
    id: 'advanced-1',
    name: 'E-commerce Enterprise Suite',
    description: 'Solución completa de comercio electrónico con análisis avanzado y gestión de inventario.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Next.js', description: 'Framework React con SSR' },
        { name: 'GraphQL', description: 'Lenguaje de consultas' },
        { name: 'PostgreSQL', description: 'Base de datos SQL' },
        { name: 'Redis', description: 'Base de datos en memoria' }
      ]
    }],
    price: 299.99,
    icon: <FiShoppingCart />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-2',
    name: 'CMS Empresarial',
    description: 'Sistema de gestión de contenidos escalable con flujos de trabajo personalizables.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' },
        { name: 'Redis', description: 'Base de datos en memoria' }
      ]
    }],
    price: 249.99,
    icon: <FiCode />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-3',
    name: 'Analytics Dashboard Pro',
    description: 'Dashboard empresarial con análisis predictivo e IA.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Vue.js', description: 'Framework progresivo de UI' },
        { name: 'Python', description: 'Lenguaje de programación' },
        { name: 'TensorFlow', description: 'Framework de ML' },
        { name: 'PostgreSQL', description: 'Base de datos SQL' }
      ]
    }],
    price: 399.99,
    icon: <FiDatabase />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-4',
    name: 'SaaS Starter Kit',
    description: 'Kit completo para crear aplicaciones SaaS con facturación y suscripciones.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'Stripe', description: 'Plataforma de pagos' },
        { name: 'MongoDB', description: 'Base de datos NoSQL' }
      ]
    }],
    price: 499.99,
    icon: <FiCloud />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-5',
    name: 'IoT Platform Plantilla',
    description: 'Plataforma para gestión de dispositivos IoT con análisis en tiempo real.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React', description: 'Framework de UI' },
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'MQTT', description: 'Protocolo IoT' },
        { name: 'InfluxDB', description: 'Base de datos de series temporales' }
      ]
    }],
    price: 599.99,
    icon: <FiServer />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-6',
    name: 'AI Development Kit',
    description: 'Kit de desarrollo para integración de IA con modelos preentrenados.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Python', description: 'Lenguaje de programación' },
        { name: 'TensorFlow', description: 'Framework de ML' },
        { name: 'FastAPI', description: 'Framework web de Python' },
        { name: 'Redis', description: 'Base de datos en memoria' }
      ]
    }],
    price: 699.99,
    icon: <FiLayers />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-7',
    name: 'Microservices Boilerplate',
    description: 'Plantilla para arquitectura de microservicios con orquestación.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'Node.js', description: 'Runtime de JavaScript' },
        { name: 'Docker', description: 'Plataforma de contenedores' },
        { name: 'Kubernetes', description: 'Orquestación de contenedores' },
        { name: 'gRPC', description: 'Framework RPC' }
      ]
    }],
    price: 799.99,
    icon: <FiGlobe />,
    category: 'advanced',
    coming_soon: true
  },
  {
    id: 'advanced-8',
    name: 'Enterprise Mobile Suite',
    description: 'Suite completa para desarrollo de aplicaciones móviles empresariales.',
    techStack: [{
      name: 'Stack Principal',
      technologies: [
        { name: 'React Native', description: 'Framework móvil' },
        { name: 'GraphQL', description: 'Lenguaje de consultas' },
        { name: 'Firebase', description: 'Plataforma de desarrollo' },
        { name: 'Redux', description: 'Gestión de estado' }
      ]
    }],
    price: 899.99,
    icon: <FiSmartphone />,
    category: 'advanced',
    coming_soon: true
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeepseekEnabled, setIsDeepseekEnabled] = useState(false);
  const [selectedSupportPlan, setSelectedSupportPlan] = useState<'3' | '6' | '12' | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const deepseekPrice = 29.99;
  const supportPlanPrices = {
    '3': 49.99,
    '6': 89.99,
    '12': 159.99
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    if (isDeepseekEnabled) total += deepseekPrice;
    if (selectedSupportPlan) total += supportPlanPrices[selectedSupportPlan];
    return total.toFixed(2);
  };

  useEffect(() => {
    if (!isModalOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.6;
      videoRef.current.onended = () => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        }
      };
    }
  }, [isModalOpen]);

  const handlePayPalCheckout = async () => {
    window.open(`https://www.paypal.com/paypalme/jeremylivegonzalez/${calculateTotalPrice()}`, '_blank');
  };

  return (
    <>
      <motion.div
        className={`h-[420px] bg-gradient-to-br ${product.coming_soon ? 'from-white/5 to-white/5' : 'from-white/5 to-white/10'} backdrop-blur-sm rounded-2xl p-8 ${product.coming_soon ? 'cursor-not-allowed' : 'cursor-pointer'} border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-500 overflow-hidden group hover:translate-y-[-3px] relative`}
        whileHover={!product.coming_soon ? { scale: 1.02, y: -3 } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
        onClick={() => !product.coming_soon && setIsModalOpen(true)}
      >
        <div className={`text-purple-400 text-4xl mb-4 ${product.coming_soon ? 'opacity-50' : 'group-hover:scale-110'} transition-transform duration-500 ease-out`}>{product.icon}</div>
        {product.coming_soon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] rounded-2xl z-10">
            <span className="text-white text-2xl font-bold tracking-wider animate-pulse">Próximamente</span>
          </div>
        )}
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 group-hover:text-white transition-colors duration-300 line-clamp-4">{product.name}</h3>
        <p className="text-violet-200 text-sm mb-4 line-clamp-1 group-hover:text-violet-100 transition-colors duration-300">{product.description}</p>
        <div className="text-3xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300">
          <span className="text-lg text-violet-300 group-hover:text-purple-400">$</span>
          {product.price}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {product.previewStack?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium backdrop-blur-md border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transform hover:scale-105 transition-all duration-300 ease-out"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 overflow-y-auto py-8" onClick={() => setIsModalOpen(false)}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-purple-900/95 rounded-3xl p-8 max-w-4xl w-full mx-auto my-auto relative border border-purple-500/40 shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(139,92,246,0.4)] transition-shadow duration-500"
          >
            <div className="flex flex-col gap-8">
              {product.price === 89.99 && (
                <div className="w-full rounded-xl overflow-hidden ring-2 ring-purple-500/30 shadow-lg shadow-purple-500/20">
                  <video
                    ref={videoRef}
                    className="w-full h-[400px] object-cover"
                    controls
                    autoPlay
                    muted
                  >
                    <source src="/videos/pro89.mp4" type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-pink-500 mb-6 relative group/tooltip animate-gradient-x"
                  >
                    {product.name}
                    <div className="absolute bottom-full left-0 mb-2 w-72 p-4 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-purple-500/30 opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-300 z-50">
                      <p className="text-violet-200 text-sm">{product.description}</p>
                    </div>
                  </h2>

                  <div className="mb-8 group relative">
                    <h3 className="text-xl font-semibold text-white mb-4">Stack Tecnológico:</h3>
                    <div className="space-y-4">
                      {Array.isArray(product.techStack[0]?.technologies) ? (
                        <div className="flex flex-wrap gap-2">
                          {product.techStack.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium backdrop-blur-md border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transform hover:scale-105 transition-all duration-300 ease-out"
                            >
                              {tech.name}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {product.techStack.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="relative cursor-pointer">
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className="text-lg font-semibold text-purple-300">{category.name}</h4>
                                <span className="text-xs text-violet-400">(Hover para ver detalles)</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {category.technologies.map((tech, techIndex) => (
                                  <div key={techIndex} className="group/tech relative">
                                    <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium backdrop-blur-md border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.3)] transform hover:scale-105 transition-all duration-300 ease-out">
                                      {tech.name}
                                    </span>
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-4 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] border border-purple-500/30 opacity-0 invisible group-hover/tech:opacity-100 group-hover/tech:visible transition-all duration-200 z-10">
                                      <div className="text-sm text-violet-200">{tech.description}</div>
                                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 transform rotate-45 w-2 h-2 bg-gray-800/95"></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="absolute -translate-x-[calc(17%)] w-[calc(100%+50rem)] bg-gray-800/95 backdrop-blur-md rounded-xl p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transform -translate-y-[500px] transition-all duration-300 ease-out z-20 shadow-[0_0_30px_rgba(139,92,246,0.3)] border border-purple-500/40">
                      <h4 className="text-xl font-semibold text-white mb-4">Stack Tecnológico Completo</h4>
                      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
                        <div className="space-y-4 w-[calc(100%+12.3rem)]" style={{ gridColumn: 'span 1.5' }}>
                          <h5 className="text-lg font-semibold text-purple-300">Frontend</h5>
                          <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-4">
                              {product.techStack.find(cat => cat.name === 'Frontend')?.technologies.map((tech, techIndex) => (
                                <div key={techIndex} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                  <div className="font-medium text-white mb-1">{tech.name}</div>
                                  <div className="text-sm text-violet-200">{tech.description}</div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">

                        </div>
                        <div className="space-y-4">
                          <h5 className="text-lg font-semibold text-purple-300">Backend/Serverless</h5>
                          <div className="space-y-2">
                            {product.techStack.find(cat => cat.name === 'Backend/Serverless')?.technologies.map((tech, techIndex) => (
                              <div key={techIndex} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                <div className="font-medium text-white mb-1">{tech.name}</div>
                                <div className="text-sm text-violet-200">{tech.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h5 className="text-lg font-semibold text-purple-300">Base de datos y Autenticación</h5>
                          <div className="space-y-2">
                            {product.techStack.find(cat => cat.name === 'Base de datos y Autenticación')?.technologies.map((tech, techIndex) => (
                              <div key={techIndex} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                <div className="font-medium text-white mb-1">{tech.name}</div>
                                <div className="text-sm text-violet-200">{tech.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h5 className="text-lg font-semibold text-purple-300">Pagos</h5>
                          <div className="space-y-2">
                            {product.techStack.find(cat => cat.name === 'Pagos')?.technologies.map((tech, techIndex) => (
                              <div key={techIndex} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                <div className="font-medium text-white mb-1">{tech.name}</div>
                                <div className="text-sm text-violet-200">{tech.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h5 className="text-lg font-semibold text-purple-300">Herramientas de Desarrollo</h5>
                          <div className="space-y-2">
                            {product.techStack.find(cat => cat.name === 'Herramientas de Desarrollo')?.technologies.map((tech, techIndex) => (
                              <div key={techIndex} className="bg-purple-500/10 rounded-lg p-3 border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/20 transition-all duration-300 shadow-[0_0_10px_rgba(139,92,246,0.1)] hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                                <div className="font-medium text-white mb-1">{tech.name}</div>
                                <div className="text-sm text-violet-200">{tech.description}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 
                  Crea dos extra para el producto, son checkbox, deben tener un hover que muestre la info de cada uno, tu colocale el precio, el precio se suma al precio del producto.:
                  - Deepseek: Worker AI of cloudflare that give access to the model DeepSeek-R1-Distill-Qwen-32B dialy with 10K tokens
                  - Deepseek/cualquier otro LLM + Soporte tecnico (3/6/12 meses)

                estos extra van hacer checkBox que al estar activados se va a cambiar el boton de "Pagar con Paypal" y el numero del precio por el producto + el extra que se haya seleccionado.              
                */}

                </div>
                <div>
                  <div className="sticky top-8">
                    {/* <p className="text-violet-200 text-lg mb-8">{product.description}</p> */}

                    <div className="mb-8">
                      <h3 className="text-xl font-semibold text-white mb-4">Extras Disponibles:</h3>
                      <div className="space-y-4 mb-8">
                        <div className="relative group/deepseek">
                          <label className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isDeepseekEnabled}
                              onChange={(e) => setIsDeepseekEnabled(e.target.checked)}
                              className="form-checkbox h-5 w-5 text-purple-500 rounded border-purple-500/30 bg-purple-500/10 focus:ring-purple-500 focus:ring-offset-0"
                            />
                            <span className="text-white">Deepseek AI Worker</span>
                            <span className="text-purple-400 font-medium">${deepseekPrice}/mes</span>
                          </label>
                          <div className="absolute bottom-full left-0 mb-2 w-72 p-4 bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-xl opacity-0 invisible group-hover/deepseek:opacity-100 group-hover/deepseek:visible transition-all duration-200 z-10">
                            <div className="text-sm text-violet-200">Worker AI de Cloudflare que da acceso al modelo DeepSeek-R1-Distill-Qwen-32B con 10K tokens diarios</div>
                            <div className="absolute bottom-0 left-6 translate-y-1/2 transform rotate-45 w-2 h-2 bg-gray-800/95"></div>
                          </div>
                        </div>

                        <div className="relative w-full max-w-xs">
                          <select
                            value={selectedSupportPlan || ''}
                            onChange={(e) => setSelectedSupportPlan(e.target.value as '3' | '6' | '12' | null)}
                            className="w-full px-4 py-3 bg-purple-500/10 text-white rounded-xl border border-purple-500/30 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer transition-all duration-300 hover:bg-purple-500/20"
                          >
                            <option value="" className="bg-gray-900">Seleccionar plan de soporte</option>
                            <option value="3" className="bg-gray-900">3 meses - Soporte básico (${supportPlanPrices['3']})</option>
                            <option value="6" className="bg-gray-900">6 meses - Soporte prioritario (${supportPlanPrices['6']})</option>
                            <option value="12" className="bg-gray-900">12 meses - Soporte premium (${supportPlanPrices['12']})</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 flex items-center gap-2">
                      <span className="text-2xl text-violet-300">$</span>
                      {calculateTotalPrice()}
                    </div>
                    {(isDeepseekEnabled || selectedSupportPlan) && (
                      <div className="mb-6 space-y-2">
                        <div className="text-sm text-violet-200">
                          <span className="font-medium">Precio base:</span> ${product.price}
                        </div>
                        {isDeepseekEnabled && (
                          <div className="text-sm text-violet-200">
                            <span className="font-medium">Deepseek AI:</span> +${deepseekPrice}
                          </div>
                        )}
                        {selectedSupportPlan && (
                          <div className="text-sm text-violet-200">
                            <span className="font-medium">Soporte ({selectedSupportPlan} meses):</span> +${supportPlanPrices[selectedSupportPlan]}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      <button
                        onClick={handlePayPalCheckout}
                        className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white py-4 px-6 rounded-xl font-medium shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transform hover:scale-105 transition-all duration-300 animate-gradient-x"
                      >
                        Pagar con PayPal
                      </button>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="w-full bg-gray-700/80 backdrop-blur-sm text-white py-4 px-6 rounded-xl font-medium border border-gray-600/30 hover:bg-gray-600/80 hover:border-gray-500/40 transition-all duration-300 shadow-lg"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const TiendaPage: React.FC = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (isScrolling) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isScrolling]);

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      e.currentTarget.scrollLeft += e.deltaY;
      setIsScrolling(true);
      clearTimeout((window as any).scrollTimeout);
      (window as any).scrollTimeout = setTimeout(() => setIsScrolling(false), 800);
    }
  };

  return (
    <div className="min-h-screen bg-theme-gradient pt-32 relative overflow-y-scroll scrollbar-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
      <style>{`
  ::-webkit-scrollbar {
    display: none;
  }
  * {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <Header />
      <motion.h1
        className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 text-center mb-20 drop-shadow-[0_0_25px_rgba(168,85,247,0.35)] tracking-tight leading-none px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        Tienda de Software
      </motion.h1>
      <main className="container mx-auto px-4 relative z-10 mb-11"
      >
        {/* Carrusel de Productos Avanzados */}
        <section className="mb-14">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">Soluciones Avanzadas</h2>
          <div className="relative">
            <div className="overflow-x-auto pb-6 pt-3 px-3 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-500/10 hover:scrollbar-thumb-purple-400 transition-colors duration-200 scroll-smooth"
              onWheel={handleWheel}
            >
              <div className="flex gap-6" style={{ minWidth: 'max-content', paddingTop: '3px', paddingBottom: '3px' }}>
                {products
                  .filter(product => product.category === 'advanced')
                  .map(product => (
                    <div key={product.id} className="w-80 flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-1 bg-purple-500/30 rounded-full transition-all duration-300"
                  style={{
                    transform: `scaleX(${i === Math.floor((document.querySelector('.overflow-x-auto')?.scrollLeft || 0) / 200) ? 1.5 : 1})`,
                    opacity: i === Math.floor((document.querySelector('.overflow-x-auto')?.scrollLeft || 0) / 200) ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Carrusel de Productos Básicos */}
        <section>
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3">Plantillas y Productos Básicos</h2>
            <p className="text-violet-200 text-lg">Comienza rápidamente con nuestras plantillas optimizadas y productos esenciales</p>
          </div>
          <div className="relative">
            <div className="overflow-x-auto pb-6 pt-3 px-3 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-500/10 hover:scrollbar-thumb-purple-400 transition-colors duration-200 scroll-smooth"
              onWheel={handleWheel}
            >
              <div className="flex gap-6" style={{ minWidth: 'max-content', paddingTop: '3px', paddingBottom: '3px' }}>
                {products
                  .filter(product => product.category === 'basic')
                  .map(product => (
                    <div key={product.id} className="w-80 flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex gap-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-1 bg-purple-500/30 rounded-full transition-all duration-300"
                  style={{
                    transform: `scaleX(${i === Math.floor((document.querySelector('.overflow-x-auto:last-child')?.scrollLeft || 0) / 200) ? 1.5 : 1})`,
                    opacity: i === Math.floor((document.querySelector('.overflow-x-auto:last-child')?.scrollLeft || 0) / 200) ? 1 : 0.3
                  }}
                />
              ))}
            </div>
          </div>
        </section>

      </main>
      <AnimatedFooter />
    </div >
  );
};

export default TiendaPage;