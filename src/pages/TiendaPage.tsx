import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiCode, FiDatabase, FiCloud, FiServer, FiLayers, FiGlobe, FiSmartphone } from 'react-icons/fi';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';

interface Product {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  price: number;
  icon: React.ReactNode;
  category: 'basic' | 'advanced';
}

const products: Product[] = [
  // Productos Básicos
  {
    id: 'spa-001',
    name: 'Plantilla de Código para Aplicaciones Web de Página Única con Animaciones Suaves',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    price: 49.99,
    icon: <FiShoppingCart />,
    category: 'basic'
  },
  {
    id: 'spa-002',
    name: 'Plantilla de Código para Aplicaciones Web de Página Única con Elementos Informativos y Animaciones Suaves',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    price: 49.99,
    icon: <FiShoppingCart />,
    category: 'basic'
  },
  {
    id: 'basic-1',
    name: 'Plantilla E-commerce Básico',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    price: 49.99,
    icon: <FiShoppingCart />,
    category: 'basic'
  },
  {
    id: 'basic-2',
    name: 'Blog Personal Pro',
    description: 'Plantilla moderno para blog con sistema de gestión de contenidos.',
    techStack: ['Next.js', 'Markdown', 'Vercel'],
    price: 29.99,
    icon: <FiCode />,
    category: 'basic'
  },
  {
    id: 'basic-3',
    name: 'Dashboard Starter',
    description: 'Panel de control con gráficos y análisis básicos.',
    techStack: ['Vue.js', 'Chart.js', 'Firebase'],
    price: 39.99,
    icon: <FiDatabase />,
    category: 'basic'
  },
  {
    id: 'basic-4',
    name: 'Landing Page Kit',
    description: 'Kit de inicio para landing pages con componentes reutilizables.',
    techStack: ['React', 'Styled Components', 'Netlify'],
    price: 24.99,
    icon: <FiGlobe />,
    category: 'basic'
  },
  {
    id: 'basic-5',
    name: 'Portfolio Plantilla',
    description: 'Plantilla para portfolio profesional con animaciones suaves.',
    techStack: ['React', 'Framer Motion', 'TailwindCSS'],
    price: 34.99,
    icon: <FiLayers />,
    category: 'basic'
  },
  {
    id: 'basic-6',
    name: 'API Starter Kit',
    description: 'Kit de inicio para crear APIs RESTful con autenticación.',
    techStack: ['Express.js', 'JWT', 'MongoDB'],
    price: 44.99,
    icon: <FiServer />,
    category: 'basic'
  },
  {
    id: 'basic-7',
    name: 'Chat App Plantilla',
    description: 'Plantilla para aplicación de chat en tiempo real.',
    techStack: ['React', 'Socket.io', 'Node.js'],
    price: 54.99,
    icon: <FiSmartphone />,
    category: 'basic'
  },
  {
    id: 'basic-8',
    name: 'Cloud Storage App',
    description: 'Aplicación de almacenamiento en la nube con interfaz intuitiva.',
    techStack: ['React', 'AWS S3', 'Express.js'],
    price: 49.99,
    icon: <FiCloud />,
    category: 'basic'
  },

  // Productos Avanzados
  {
    id: 'multispa-001',
    name: 'Plantilla Premium de Aplicación Multi-Página con Elementos Interactivos y Animaciones Dinámicas',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    price: 110.99,
    icon: <FiShoppingCart />,
    category: 'advanced'
  },
  {
    id: 'multispa-002',
    name: 'Plantilla Premium de Aplicación Multi-Página Bilingüe con Elementos Interactivos y Animaciones Dinámicas',
    description: 'Plantilla responsive para tienda online con carrito de compras y pasarela de pago.',
    techStack: ['React', 'TailwindCSS', 'Node.js', 'MongoDB'],
    price: 199.99,
    icon: <FiShoppingCart />,
    category: 'advanced'
  },
  {
    id: 'advanced-1',
    name: 'E-commerce Enterprise Suite',
    description: 'Solución completa de comercio electrónico con análisis avanzado y gestión de inventario.',
    techStack: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    price: 299.99,
    icon: <FiShoppingCart />,
    category: 'advanced'
  },
  {
    id: 'advanced-2',
    name: 'CMS Empresarial',
    description: 'Sistema de gestión de contenidos escalable con flujos de trabajo personalizables.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Redis'],
    price: 249.99,
    icon: <FiCode />,
    category: 'advanced'
  },
  {
    id: 'advanced-3',
    name: 'Analytics Dashboard Pro',
    description: 'Dashboard empresarial con análisis predictivo e IA.',
    techStack: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
    price: 399.99,
    icon: <FiDatabase />,
    category: 'advanced'
  },
  {
    id: 'advanced-4',
    name: 'SaaS Starter Kit',
    description: 'Kit completo para crear aplicaciones SaaS con facturación y suscripciones.',
    techStack: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    price: 499.99,
    icon: <FiCloud />,
    category: 'advanced'
  },
  {
    id: 'advanced-5',
    name: 'IoT Platform Plantilla',
    description: 'Plataforma para gestión de dispositivos IoT con análisis en tiempo real.',
    techStack: ['React', 'Node.js', 'MQTT', 'InfluxDB'],
    price: 599.99,
    icon: <FiServer />,
    category: 'advanced'
  },
  {
    id: 'advanced-6',
    name: 'AI Development Kit',
    description: 'Kit de desarrollo para integración de IA con modelos preentrenados.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    price: 699.99,
    icon: <FiLayers />,
    category: 'advanced'
  },
  {
    id: 'advanced-7',
    name: 'Microservices Boilerplate',
    description: 'Plantilla para arquitectura de microservicios con orquestación.',
    techStack: ['Node.js', 'Docker', 'Kubernetes', 'gRPC'],
    price: 799.99,
    icon: <FiGlobe />,
    category: 'advanced'
  },
  {
    id: 'advanced-8',
    name: 'Enterprise Mobile Suite',
    description: 'Suite completa para desarrollo de aplicaciones móviles empresariales.',
    techStack: ['React Native', 'GraphQL', 'Firebase', 'Redux'],
    price: 899.99,
    icon: <FiSmartphone />,
    category: 'advanced'
  }
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePayPalCheckout = async () => {
    window.open(`https://www.paypal.com/paypalme/yourAccount/${product.price}`, '_blank');
  };

  return (
    <>
      <motion.div
        className="h-[420px] bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer border border-purple-500/20 hover:border-purple-500/40 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:shadow-xl transition-all duration-500 overflow-hidden group hover:translate-y-[-3px]"
        whileHover={{ scale: 1.02, y: -3 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-purple-400 text-4xl mb-4 group-hover:scale-110 transition-transform duration-500 ease-out">{product.icon}</div>
        <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 group-hover:text-white transition-colors duration-300 line-clamp-4">{product.name}</h3>
        <p className="text-violet-200 text-sm mb-4 line-clamp-1 group-hover:text-violet-100 transition-colors duration-300">{product.description}</p>
        <div className="text-3xl font-bold text-white mb-4 flex items-center gap-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-500 transition-all duration-300">
          <span className="text-lg text-violet-300 group-hover:text-purple-400">$</span>
          {product.price}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto">
          {product.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-500/30 hover:text-white transform hover:scale-105 transition-all duration-300 ease-out"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 max-w-2xl w-full mx-4 border border-purple-500/30 shadow-xl shadow-purple-500/20"
          >
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4 ">{product.name}</h2>
            <p className="text-violet-200 text-lg mb-8">{product.description}</p>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Stack Tecnológico:</h3>
              <div className="flex flex-wrap gap-3">
                {product.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium backdrop-blur-sm border border-purple-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-8 flex items-center gap-2">
              <span className="text-2xl text-violet-300">$</span>
              {product.price}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handlePayPalCheckout}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Pagar con PayPal
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-700 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-600 transition-colors duration-300"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

const TiendaPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-gradient pt-20 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      <Header />
      <motion.h1
        className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Tienda de Software
      </motion.h1>
      <main className="container mx-auto px-4 py-16 relative z-10">
        {/* Carrusel de Productos Avanzados */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-8">Soluciones Avanzadas</h2>
          <div className="overflow-x-auto pb-6 pt-3 px-3 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-500/10 hover:scrollbar-thumb-purple-400 transition-colors duration-200">
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
        </section>
        {/* Carrusel de Productos Básicos */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-8">Plantillas y Productos Básicos</h2>
          <div className="overflow-x-auto pb-6 pt-3 px-3 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-purple-500/10 hover:scrollbar-thumb-purple-400 transition-colors duration-200">
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
        </section>

      </main>
      <AnimatedFooter />
    </div>
  );
};

export default TiendaPage;