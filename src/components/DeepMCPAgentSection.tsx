import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeatureCard = ({ title, description, icon, isActive, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`flex-shrink-0 w-80 snap-center cursor-pointer ${!isActive ? 'opacity-70 hover:opacity-100' : ''}`}
    whileHover={{ scale: isActive ? 1.02 : 0.98 }}
    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  >
    <div className={`h-full bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm rounded-xl p-6 border-2 transition-all duration-300 ${isActive ? 'border-pink-400/60 shadow-lg shadow-pink-500/20' : 'border-purple-500/20'}`}>
      <motion.div 
        className="text-4xl mb-4"
        animate={{ y: isActive ? [-5, 5, -5] : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {icon}
      </motion.div>
      <h4 className="text-xl font-bold text-white mb-2">{title}</h4>
      <p className="text-violet-200">{description}</p>
    </div>
  </motion.div>
);

export const DeepMCPAgentSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const features = [
    {
      title: "Múltiples Modelos",
      description: "Elige entre diferentes modelos de IA incluyendo GPT-3.5, GPT-4 y Google Gemini",
      icon: "🤖"
    },
    {
      title: "Manejo Avanzado",
      description: "Soporta varios formatos de entrada/salida incluyendo texto, imágenes y datos estructurados",
      icon: "📊"
    },
    {
      title: "Hugging Face",
      description: "Conéctate sin problemas con miles de modelos y herramientas del ecosistema Hugging Face",
      icon: "🤗"
    },
    {
      title: "Chat Interactivo",
      description: "Interfaz de lenguaje natural con soporte para contenido enriquecido y conversaciones de múltiples turnos",
      icon: "💬"
    },
    {
      title: "Configuración Avanzada",
      description: "Ajusta parámetros como temperatura, tokens máximos y métodos de muestreo",
      icon: "⚙️"
    },
    {
      title: "Tiempo Real",
      description: "Transmite respuestas con soporte para carga progresiva de contenido",
      icon: "⚡"
    },
    {
      title: "Gestión de Sesiones",
      description: "Historial de conversaciones persistente con conciencia del contexto",
      icon: "📚"
    }
  ];

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const activeCard = scrollContainer.children[activeIndex];
    if (activeCard) {
      // Get current scroll position
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Scroll the container horizontally without affecting vertical scroll
      activeCard.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
      
      // Restore the vertical scroll position
      window.scrollTo({
        top: scrollTop,
        behavior: 'auto'
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = (e: Event) => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };
    
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      // Add type assertion to handle the event type
      const scrollHandler = handleScroll as EventListener;
      scrollContainer.addEventListener('wheel', scrollHandler);
      scrollContainer.addEventListener('touchmove', scrollHandler);
      
      const scrollToCard = (index: number) => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;
          const card = container.children[index] as HTMLElement;
          if (card) {
            const containerWidth = container.offsetWidth;
            const cardWidth = card.offsetWidth;
            const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2);
            
            container.scrollTo({
              left: scrollLeft,
              behavior: 'smooth'
            });
          }
        }
      };

      const interval = setInterval(() => {
        if (!isPaused) {
          const nextIndex = (activeIndex + 1) % features.length;
          setActiveIndex(nextIndex);
          scrollToCard(nextIndex);
        }
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(scrollTimeout);
        scrollContainer.removeEventListener('wheel', scrollHandler);
        scrollContainer.removeEventListener('touchmove', scrollHandler);
      };
    }
  }, [activeIndex, isPaused, features.length]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="py-20 bg-black/20 relative overflow-hidden"
    >
      {/* Neuron background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
            >
              <motion.div
                className="w-2 h-2 bg-purple-500 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: Math.random() * 2 + 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              {[...Array(3)].map((_, j) => (
                <motion.div
                  key={j}
                  className="absolute top-1/2 left-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-500 to-transparent"
                  style={{
                    transform: `rotate(${j * 120}deg)`,
                    transformOrigin: "0 0",
                  }}
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                    scaleX: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          className="text-left max-w-4xl mx-auto"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 text-center"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            viewport={{ once: true }}
          >
            🌐 WebUI de DeepMCPAgent
          </motion.h2>
          
          <motion.div
            className="text-lg text-violet-200 mb-12 leading-relaxed space-y-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-white">
              Experimenta DeepMCPAgent a través de una interfaz web intuitiva, desarrollada por{' '}
              <a 
                href="https://www.linkedin.com/in/jeremy-live/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-pink-400 hover:text-pink-300 underline"
              >
                Jeremy Live
              </a>. La interfaz web ofrece una forma fácil de interactuar con las capacidades del agente sin necesidad de escribir código.
            </p>

            <div className="mt-10">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🎯</span> Características Principales
              </h3>
              <div className="relative w-full mt-12 overflow-hidden">
                <div className="relative">
                  <div 
                    ref={scrollContainerRef}
                    className="flex space-x-6 pb-8 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-4"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    <AnimatePresence>
                      {features.map((feature, index) => (
                        <FeatureCard
                          key={index}
                          {...feature}
                          isActive={activeIndex === index}
                          onClick={() => setActiveIndex(index)}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent pointer-events-none"></div>
                  <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/90 to-transparent pointer-events-none"></div>
                </div>
                
                {/* Carousel Controls */}
                <div className="relative z-10 mt-8 flex flex-col items-center">
                  {/* Pause/Play Button */}
                  <button 
                    onClick={() => setIsPaused(!isPaused)}
                    className="mb-4 text-white p-2 rounded-full hover:bg-gray-700/50 transition-colors flex items-center justify-center"
                    aria-label={isPaused ? 'Reanudar' : 'Pausar'}
                  >
                    {isPaused ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>

                  {/* Progress Bar */}
                  <div className="w-full max-w-md h-1 bg-gray-700 rounded-full overflow-hidden mb-6">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: isPaused ? '100%' : '0%' }}
                      transition={{ 
                        duration: 5,
                        repeat: isPaused ? 0 : Infinity,
                        ease: 'linear'
                      }}
                    />
                  </div>

                  {/* Dots Navigation */}
                  <div className="flex justify-center space-x-3">
                    {features.map((_, index) => (
                      <motion.button
                        key={index}
                        className={`w-3 h-3 rounded-full focus:outline-none ${
                          activeIndex === index ? 'bg-pink-400' : 'bg-purple-500/30'
                        }`}
                        onClick={() => setActiveIndex(index)}
                        whileHover={{ scale: 1.5 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        aria-label={`Ir a característica ${index + 1}`}
                      >
                        <motion.span 
                          className="block w-full h-full rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: activeIndex === index ? 1 : 0.6,
                            opacity: activeIndex === index ? 1 : 0.6
                          }}
                          transition={{ 
                            scale: { type: 'spring', stiffness: 500, damping: 30 },
                            opacity: { duration: 0.2 }
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🖼️</span> Contenido Multimedia y Generación de Imágenes
              </h3>
              <p className="mb-4">
                La interfaz de chat admite manejo avanzado de medios a través de las herramientas MCP de Hugging Face:
              </p>
              
              <h4 className="text-xl font-semibold text-white mt-6 mb-3">Capacidades de Generación de Imágenes</h4>
              <motion.ul className="space-y-4 mb-8">
                {[
                  {
                    title: "Texto a Imagen",
                    description: "Genera imágenes de alta calidad a partir de descripciones de texto usando modelos de última generación"
                  },
                  {
                    title: "Imagen a Imagen",
                    description: "Transforma y mejora imágenes existentes basado en instrucciones de texto"
                  },
                  {
                    title: "Procesamiento por Lotes",
                    description: "Genera múltiples variaciones de imágenes en una sola solicitud"
                  },
                  {
                    title: "Transferencia de Estilo",
                    description: "Aplica estilos artísticos a imágenes generadas o cargadas"
                  },
                  {
                    title: "Mejora de Resolución",
                    description: "Aumenta la resolución de imágenes manteniendo la calidad"
                  }
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start bg-gradient-to-r from-purple-900/20 to-transparent p-4 rounded-xl border-l-4 border-pink-400/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                  >
                    <motion.span 
                      className="text-pink-400 mr-3 text-xl"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        delay: 0.5 + (index * 0.1),
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    >
                      •
                    </motion.span>
                    <div>
                      <strong className="text-pink-200">{item.title}</strong>:
                      <span className="text-violet-200 ml-1">{item.description}</span>
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <h4 className="text-xl font-semibold text-white mt-8 mb-3">Operaciones de Imagen Soportadas</h4>
              <motion.ul className="space-y-4 mb-8">
                {[
                  "Generación múltiple de imágenes con diferentes parámetros",
                  "Edición y manipulación de imágenes mediante lenguaje natural",
                  "Soporte para varias proporciones y resoluciones de aspecto",
                  "Integración con Stable Diffusion y otros modelos líderes de generación de imágenes",
                  "Vista previa en tiempo real de imágenes generadas"
                ].map((item, index) => (
                  <motion.li 
                    key={index}
                    className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-r from-pink-900/10 to-purple-900/10 backdrop-blur-sm"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ 
                      delay: 0.2 + (index * 0.15),
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                  >
                    <motion.span 
                      className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-pink-400 to-purple-500"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ 
                        delay: 0.3 + (index * 0.15),
                        duration: 0.5,
                        ease: "easeOut"
                      }}
                    />
                    <div className="flex items-center">
                      <motion.span 
                        className="text-pink-400 mr-3 text-2xl"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          delay: 0.4 + (index * 0.15),
                          type: "spring",
                          stiffness: 200,
                          damping: 10
                        }}
                      >
                        →
                      </motion.span>
                      <span className="text-violet-200">{item}</span>
                    </div>
                    <motion.div 
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500/50 to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ 
                        delay: 0.6 + (index * 0.15),
                        duration: 0.8,
                        ease: "easeOut"
                      }}
                    />
                  </motion.li>
                ))}
              </motion.ul>

              <h4 className="text-xl font-semibold text-white mt-8 mb-3">Tipos de Datos Soportados</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <div className="font-bold text-pink-300 mb-2">📝 Texto</div>
                  <p className="text-violet-200">Procesamiento y generación de lenguaje natural</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <div className="font-bold text-pink-300 mb-2">🖼️ Imágenes</div>
                  <p className="text-violet-200">Generación, edición y análisis</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <div className="font-bold text-pink-300 mb-2">📊 Datos Estructurados</div>
                  <p className="text-violet-200">Procesamiento de datos JSON y tabulares</p>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <div className="font-bold text-pink-300 mb-2">💻 Código</div>
                  <p className="text-violet-200">Resaltado de sintaxis y resultados de ejecución</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DeepMCPAgentSection;
