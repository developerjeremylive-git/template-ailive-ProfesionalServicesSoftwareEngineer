import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X } from 'lucide-react';

export const ComingSoonPopup = ({ isOpen, onClose, platform }: { isOpen: boolean; onClose: () => void; platform: string }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl border border-gray-700 my-8 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/80 to-pink-900/80 px-6 py-4 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-13h2v6h-2V7zm0 8h2v2h-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white">¡Próximamente!</h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6 md:p-8 text-center flex-1 overflow-y-auto">
              <p className="text-gray-300 mb-6">
                La aplicación móvil estará disponible pronto en {platform}.
                <br />
                Mientras tanto, puedes usar nuestra versión web.
              </p>
              <div className="flex justify-center gap-4">
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Entendido
                </motion.button>
                <motion.a
                  href="https://deep-mcp-agent.live/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  Ir a la Web
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const DeepMCPAgentSection = () => {
  const [popup, setPopup] = useState({ isOpen: false, platform: '' });

  const openPopup = (platform: string) => {
    setPopup({ isOpen: true, platform });
  };

  const closePopup = () => {
    setPopup({ isOpen: false, platform: '' });
  };
  return (
    <>
      <ComingSoonPopup
        isOpen={popup.isOpen}
        onClose={closePopup}
        platform={popup.platform}
      />
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
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-lg mx-auto">
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-75 blur-xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 0.7, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                  <div className="flex items-center justify-center mb-6">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center relative overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      <svg className="w-8 h-8 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </motion.div>
                  </div>
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center gap-3 text-yellow-100">
                      <motion.div
                        className="w-5 h-5 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </motion.div>
                      <span><strong>Arquitectura Multi-Agente</strong> - Sistema distribuido de agentes especializados que colaboran para resolver tareas complejas de manera eficiente</span>
                    </div>
                    <div className="flex items-center gap-3 text-yellow-100">
                      <motion.div
                        className="w-5 h-5 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </motion.div>
                      <span><strong>Auto-Mejora Continua</strong> - Aprendizaje federado que optimiza modelos en tiempo real con cada interacción del usuario</span>
                    </div>
                    <div className="flex items-center gap-3 text-yellow-100">
                      <motion.div
                        className="w-5 h-5 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                      </motion.div>
                      <span><strong>Orquestación Inteligente</strong> - Coordinación autónoma de tareas complejas a través de múltiples modelos y herramientas</span>
                    </div>
                    <div className="flex items-center gap-3 text-yellow-100">
                      <motion.div
                        className="w-5 h-5 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </motion.div>
                      <span><strong>MCP Tools Integradas</strong> - Acceso a un ecosistema de herramientas MCP para automatización y procesamiento avanzado</span>
                    </div>
                    <div className="flex items-center gap-3 text-yellow-100">
                      <motion.div
                        className="w-5 h-5 flex items-center justify-center"
                        whileHover={{ scale: 1.2, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                        </svg>
                      </motion.div>
                      <span><strong>Modo Agente Avanzado</strong> - Opera de forma autónoma, planificando y ejecutando tareas complejas sin intervención</span>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 justify-center w-full">
                {/* Sección de Herramientas */}
                <div className="mt-16 w-full max-w-5xl mx-auto">
                  <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-3">Herramientas utilizadas</h3>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                    <motion.a
                      href="https://pypi.org/project/deepagents/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-0.5 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 h-full">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 p-2 bg-amber-500/10 rounded-full w-12 h-12 flex items-center justify-center">
                            <span className="text-2xl" role="img" aria-label="Python">🐍</span>
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-white">DeepAgents PyPI</h4>
                            <p className="text-sm text-gray-400 mt-1">Librería Python para IA</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-amber-400">
                          <span>Ver en PyPI</span>
                          <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://github.com/cryxnet/DeepMCPAgent"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-0.5 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 h-full">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0 p-2.5 bg-blue-500/10 rounded-lg">
                            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.3-3.2-.1-.4-.6-1.6.1-3.4 0 0 1.1-.3 3.5 1.3a12.3 12.3 0 013.3-.4c1.1 0 2.2.1 3.3.4 2.4-1.6 3.5-1.3 3.5-1.3.7 1.8.2 3 .1 3.4.8.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0012 0z" />
                            </svg>
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-white">DeepMCPAgent</h4>
                            <p className="text-sm text-gray-400 mt-1">Repositorio del proyecto</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center text-sm text-blue-400">
                          <span>Ver en GitHub</span>
                          <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.a>

                    <div className="relative group" onMouseEnter={(e) => e.currentTarget.classList.add('is-hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('is-hovered')}>
                      {/* Info button for AWS */}
                      <button 
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const card = (e.currentTarget as HTMLElement).closest('.group');
                          if (card) {
                            card.classList.toggle('is-hovered');
                          }
                        }}
                        className="absolute -top-2 -right-2 z-20 p-1.5 bg-gray-700 rounded-full shadow-md hover:bg-orange-500 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400"
                        aria-label="Mostrar información"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <motion.a
                        href="https://aws.amazon.com/ec2/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-0.5 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/20 block"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0.5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 h-full">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 p-2.5 bg-orange-500/10 rounded-lg">
                              <svg className="w-6 h-6 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-white">AWS EC2</h4>
                              <p className="text-sm text-gray-400 mt-1">Amazon Linux 2023 (kernel-6.1)</p>
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">1 vCPU</span>
                                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">1 GiB RAM</span>
                                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">Python 3.12.9</span>
                                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">PM2</span>
                                <span className="text-xs bg-gray-700/50 text-gray-300 px-2 py-0.5 rounded">SSL/TLS</span>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-orange-400">
                            <span>Ver en AWS</span>
                            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>
                      
                      {/* Popup on hover - positioned above the card */}
                      <div className="absolute z-10 w-60 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible transition-all duration-300 right-0 -top-4 transform translate-y-0 group-[.is-hovered]:opacity-100 group-[.is-hovered]:visible group-[.is-hovered]:-translate-y-[calc(100%+1rem)] overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-orange-900/80 to-yellow-900/80 px-4 py-2 border-b border-orange-500/20">
                          <h4 className="font-semibold text-white text-sm">AWS EC2 Server</h4>
                        </div>
                        <div className="p-4 text-sm text-gray-200">
                          <h4 className="font-semibold text-orange-400 mb-2">Detalles del Servidor AWS EC2</h4>
                          <ul className="space-y-1.5 text-gray-300">
                            <li className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>Certificado SSL para HTTPS seguro</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>Firewall configurado (Security Groups)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>Copias de seguridad automáticas (EBS Snapshots)</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>IP elástica para dirección IP fija</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-orange-400 mr-2">•</span>
                              <span>Monitoreo con CloudWatch</span>
                            </li>
                          </ul>
                        </div>
                        <div className="absolute -bottom-1 right-4 w-4 h-4 bg-gray-800 transform -rotate-45 border-b border-r border-gray-700"></div>
                      </div>
                    </div>

                    <div className="relative group" onMouseEnter={(e) => e.currentTarget.classList.add('is-hovered')} onMouseLeave={(e) => e.currentTarget.classList.remove('is-hovered')}>
                      {/* Info button for Hugging Face */}
                      <button 
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const card = (e.currentTarget as HTMLElement).closest('.group');
                          if (card) {
                            card.classList.toggle('is-hovered');
                          }
                        }}
                        className="absolute -top-2 -right-2 z-20 p-1.5 bg-gray-700 rounded-full shadow-md hover:bg-purple-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                        aria-label="Mostrar información"
                      >
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                      <motion.a
                        href="https://huggingface.co/settings/mcp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-0.5 overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 block"
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="absolute inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 h-full">
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0 p-2 bg-purple-500/10 rounded-lg">
                              <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0a12 12 0 100 24 12 12 0 000-24zm0 2a10 10 0 110 20 10 10 0 010-20zm0 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 110 12 6 6 0 010-12zm0 2a4 4 0 100 8 4 4 0 000-8z" />
                              </svg>
                            </div>
                            <div className="text-left">
                              <h4 className="font-bold text-white">Hugging Face MCP</h4>
                              <p className="text-sm text-gray-400 mt-1">Conectado/a con múltiples herramientas de IA</p>
                            </div>
                          </div>
                          <div className="mt-4 flex items-center text-sm text-purple-400">
                            <span>Ver en Hugging Face</span>
                            <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </div>
                        </div>
                      </motion.a>
                      
                      {/* Popup on hover - positioned above the card */}
                      <div className="absolute z-10 w-60 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible transition-all duration-300 right-0 -top-4 transform translate-y-0 group-[.is-hovered]:opacity-100 group-[.is-hovered]:visible group-[.is-hovered]:-translate-y-[calc(100%+1rem)] overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-900/80 to-blue-900/80 px-4 py-2 border-b border-purple-500/20">
                          <h4 className="font-semibold text-white text-sm">Hugging Face MCP</h4>
                        </div>
                        <div className="p-4 text-sm text-gray-200">
                          
                          <div className="mb-3">
                            <h5 className="text-xs font-medium text-purple-300 mb-1.5">Búsqueda y Modelos:</h5>
                            <ul className="space-y-1.5 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Verificación de Usuario/a (hf_whoami)</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Búsqueda de Espacios y Modelos</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Explorador de Conjuntos de Datos</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Artículos de Investigación</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="text-xs font-medium text-purple-300 mb-1.5">Generación con IA:</h5>
                            <ul className="space-y-1.5 text-gray-300">
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Generación de Imágenes</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Transferencia de Estilo Ghibli</span>
                              </li>
                              <li className="flex items-start">
                                <span className="text-purple-400 mr-2">•</span>
                                <span>Generación de Videos</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="absolute -bottom-1 right-4 w-4 h-4 bg-gray-800 transform -rotate-45 border-b border-r border-gray-700"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 text-left"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                viewport={{ once: true }}
              >
                DeepMCPAgent: La Nueva Generación de Agentes de IA
              </motion.h2>
              <motion.div
                className="text-lg text-violet-200 mb-8 leading-relaxed space-y-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">🔌</span>
                  <span><strong>Conexión automática</strong> — las herramientas se descubren dinámicamente desde servidores MCP (HTTP/SSE)</span>
                </p>
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">🌐</span>
                  <span><strong>APIs externas compatibles</strong> — conéctate a servidores MCP remotos (con cabeceras/autenticación)</span>
                </p>
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">🧠</span>
                  <span><strong>Independiente del modelo</strong> — funciona con cualquier modelo de chat de LangChain (OpenAI, Anthropic, Ollama, Groq, local, …)</span>
                </p>
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">⚡</span>
                  <span><strong>DeepAgents (opcional)</strong> — si está instalado, obtienes un bucle de agente profundo; de lo contrario, usa LangGraph ReAct</span>
                </p>
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">🛠️</span>
                  <span><strong>Argumentos tipados</strong> — JSON-Schema → Pydantic → <code className="bg-purple-900/50 px-1 rounded">BaseTool</code> de LangChain (llamadas validadas y tipadas)</span>
                </p>
                <p className="flex items-start">
                  <span className="text-yellow-400 mr-2">🧪</span>
                  <span><strong>Alto estándar de calidad</strong> — mypy (estricto), ruff, pytest, GitHub Actions, documentación</span>
                </p>

                <div className="mt-6 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <p className="text-yellow-300 font-medium">
                    <span className="text-yellow-500 font-bold">MCP primero.</span> Los agentes no deberían codificar herramientas estáticamente — deberían <strong>descubrirlas</strong> y <strong>llamarlas</strong>. DeepMCPAgent construye ese puente.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="w-full mt-12"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Main CTA Section */}
                <div className="relative max-w-3xl mx-auto">
                  {/* Animated Floating Badge */}
                  <motion.div 
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                    initial={{ y: 10, opacity: 0, scale: 0.9 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ 
                      delay: 0.4, 
                      type: 'spring', 
                      stiffness: 500,
                      damping: 20
                    }}
                    whileHover={{
                      y: -2,
                      transition: { type: 'spring', stiffness: 500, damping: 20 }
                    }}
                  >
                    <div className="relative group/badge">
                      <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-full blur opacity-75 group-hover/badge:opacity-100 transition-all duration-500 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-yellow-400 to-amber-500 text-black text-sm font-bold px-6 py-2.5 rounded-full whitespace-nowrap flex items-center shadow-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                          <motion.span 
                            className="relative flex h-3 w-3"
                            animate={{
                              scale: [1, 1.2, 1],
                              rotate: [0, 10, -10, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                          >
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-600 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-600"></span>
                          </motion.span>
                          ¡3,800 tokens gratis! 🤖✨
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Main CTA Button */}
                  <div className="relative group mt-2">
                    <motion.div 
                      className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-all duration-700"
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                      }}
                    />
                    <motion.a
                      href="https://deep-mcp-agent.live/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative px-12 py-5 rounded-full bg-gradient-to-r from-purple-700 via-pink-700 to-rose-700 text-white font-bold overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/40 transition-all duration-500 flex items-center justify-center gap-3 text-lg border-2 border-transparent group-hover:border-white/20"
                      whileHover={{
                        scale: 1.03,
                        boxShadow: '0 15px 35px -5px rgba(168, 85, 247, 0.6)',
                        y: -2,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.span 
                        className="relative z-10 flex items-center justify-center gap-3"
                        initial={false}
                        animate={{
                          x: [0, 2, -2, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "easeInOut"
                        }}
                      >
                        <span className="drop-shadow-sm">Iniciar Ahora</span>
                        <motion.svg 
                          className="w-6 h-6" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{
                            x: 5,
                            transition: { type: 'spring', stiffness: 500, damping: 20 }
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H4" />
                        </motion.svg>
                      </motion.span>
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <motion.div 
                        className="absolute inset-0 bg-white/5 group-hover:bg-white/0 transition-colors duration-500"
                        initial={false}
                        variants={{
                          hover: {
                            opacity: [0, 0.1, 0],
                            x: ['-100%', '100%'],
                          }
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatType: "loop",
                          ease: "easeInOut"
                        }}
                      />
                    </motion.a>
                  </div>

                  {/* Enhanced App Store Buttons */}
                  <div className="mt-10 flex flex-col sm:flex-row justify-center gap-6 items-center">
                    <motion.button
                      onClick={() => openPopup('App Store')}
                      className="relative px-7 py-4.5 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 text-white font-medium overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center gap-4 w-full sm:w-auto min-w-[190px] border border-gray-700/50 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.03,
                        y: -2,
                        boxShadow: '0 12px 25px -5px rgba(0, 0, 0, 0.25)',
                        borderColor: 'rgba(255, 255, 255, 0.1)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      title="Disponible pronto en App Store"
                    >
                      <div className="p-2.5 bg-black/30 rounded-xl backdrop-blur-sm border border-gray-700/50 group-hover:bg-white/10 transition-colors duration-300">
                        <motion.svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ rotate: 15 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <path d="M17.05 20.28c-.98.95-2.05.8-3 .08a11.54 11.54 0 0 1-3.12-2.94A11.73 11.73 0 0 1 8.7 12a11.73 11.73 0 0 1 2.23-5.42 11.54 11.54 0 0 1 3-2.94c.95-.72 1.99-.89 3-.08 1.17.96 1.16 2.25 1.07 3.34-.05.65-.12 1.49-.12 2.2 0 .71.07 1.54.12 2.2.1 1.08.1 2.36-1.07 3.32z"/>
                        </motion.svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs opacity-70 group-hover:opacity-90 transition-opacity duration-300">Descárgalo en</div>
                        <div className="text-base font-semibold group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">App Store</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 -translate-x-1/2 group-hover:translate-x-0"></div>
                      <motion.div 
                        className="absolute inset-0 border-2 border-transparent group-hover:border-white/5 rounded-xl transition-all duration-500"
                        whileHover={{ 
                          scale: 1.02,
                          borderColor: 'rgba(255, 255, 255, 0.05)'
                        }}
                      />
                    </motion.button>

                    <motion.div 
                      className="text-white/50 text-sm flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    >
                      o
                    </motion.div>

                    <motion.button
                      onClick={() => openPopup('Google Play')}
                      className="relative px-7 py-4.5 rounded-xl bg-gradient-to-br from-green-600/90 to-emerald-700/90 text-white font-medium overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-400 flex items-center justify-center gap-4 w-full sm:w-auto min-w-[190px] border border-green-700/50 backdrop-blur-sm"
                      whileHover={{ 
                        scale: 1.03,
                        y: -2,
                        boxShadow: '0 12px 25px -5px rgba(16, 185, 129, 0.35)',
                        borderColor: 'rgba(255, 255, 255, 0.15)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      title="Disponible pronto en Google Play"
                    >
                      <div className="p-2.5 bg-black/20 rounded-xl backdrop-blur-sm border border-green-600/30 group-hover:bg-white/10 transition-colors duration-300">
                        <motion.svg 
                          className="w-6 h-6" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          whileHover={{ y: -2 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        >
                          <path d="M3.609 1.814L13.792 12 3.61 22.186a1.8 1.8 0 0 1-.75-.646 1.7 1.7 0 0 1-.307-.884v-18.5a1.7 1.7 0 0 1 .306-.884 1.8 1.8 0 0 1 .75-.646zM16.955 11.6l3.77-6.1c.16-.26.15-.5-.03-.7a.6.6 0 0 0-.7-.15l-5.1 2.2-2.5 2.5 4.56 4.25zM8.4 12l-4.8 4.8v-9.6L8.4 12zm8.55 1.6l-4.25 4.3-2.5 2.5 5.1 2.2a.6.6 0 0 0 .7-.15c.18-.2.19-.44.03-.7l-3.08-5.15z"/>
                        </motion.svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs opacity-90 group-hover:opacity-100 transition-opacity duration-300">Consíguelo en</div>
                        <div className="text-base font-semibold group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">Google Play</div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-l from-green-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 skew-x-12 translate-x-1/2 group-hover:translate-x-0"></div>
                      <motion.div 
                        className="absolute inset-0 border-2 border-transparent group-hover:border-white/5 rounded-xl transition-all duration-500"
                        whileHover={{ 
                          scale: 1.02,
                          borderColor: 'rgba(255, 255, 255, 0.08)'
                        }}
                      />
                    </motion.button>
                  </div>
                </div>

                {/* Enhanced GitHub Button */}
                <div className="mt-10 flex justify-center">
                  <motion.a
                    href="https://github.com/developerjeremylive/deepMCPAgent-WebUI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-9 py-4 rounded-full bg-gradient-to-r from-gray-800/90 to-gray-900/90 text-white font-semibold overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center gap-3 border border-gray-700/50 backdrop-blur-sm"
                    whileHover={{
                      scale: 1.03,
                      y: -2,
                      boxShadow: '0 15px 30px -5px rgba(99, 102, 241, 0.4)',
                      borderColor: 'rgba(99, 102, 241, 0.6)',
                      background: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.15), transparent 50%)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span 
                      className="relative z-10 flex items-center justify-center gap-2.5"
                      whileHover={{ 
                        gap: '0.75rem',
                        transition: { type: 'spring', stiffness: 500, damping: 20 }
                      }}
                    >
                      <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(99,102,241,0.6)] transition-all duration-500">
                        Código fuente WebUI
                      </span>
                      <motion.div 
                        className="relative"
                        initial={{ rotate: 0 }}
                        whileHover={{
                          rotate: [0, 5, -5, 5, 0],
                          transition: { 
                            duration: 1,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        <motion.svg 
                          className="w-5 h-5"
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                          initial={{ scale: 1 }}
                          whileHover={{
                            scale: [1, 1.2, 1],
                            transition: {
                              duration: 1,
                              repeat: Infinity,
                              repeatType: "reverse"
                            }
                          }}
                        >
                          <path 
                            fillRule="evenodd" 
                            clipRule="evenodd" 
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.564 9.564 0 0112 7.007c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.027 2.747-1.027.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            fill="currentColor"
                          />
                        </motion.svg>
                        <motion.div 
                          className="absolute inset-0 rounded-full bg-purple-500/10"
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{
                            scale: 1.6,
                            opacity: 0.5,
                            transition: {
                              duration: 0.5,
                              ease: "easeOut"
                            }
                          }}
                        />
                      </motion.div>
                    </motion.span>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/30 to-pink-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <motion.div 
                      className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/20 rounded-full transition-all duration-500"
                      whileHover={{ 
                        scale: 1.02,
                        borderColor: 'rgba(99, 102, 241, 0.3)'
                      }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      initial={false}
                      variants={{
                        hover: {
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "linear"
                      }}
                    />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

const DeepMCPAgentSectionPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
      >
        <motion.div
          ref={popupRef}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-6xl my-8 flex flex-col h-auto max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-900/80 to-emerald-900/80 px-6 py-4 border-b border-teal-500/20 flex items-center justify-between sticky top-0 z-10 rounded-t-2xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">DeepMCP Agent</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 md:p-8 pr-5">
              <DeepMCPAgentSection />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

function DeepMCPAgentCLI() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <motion.button
        className="group relative px-8 py-4 w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full overflow-hidden hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 text-center"
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 20px rgba(192, 132, 252, 0.3)'
        }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative z-10 flex items-center justify-center gap-3">
          <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(217,70,239,0.6)] transition-all duration-500">
            Acceso Directo a la WebApp en Producción
          </span>
          <motion.div
            animate={{
              x: [0, 4, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse'
              }
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.button>
      <div className="absolute -bottom-2 left-1/2 w-4/5 h-1 bg-purple-400/30 rounded-full blur-md transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300" />

      <DeepMCPAgentSectionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </>
  );
}

export default DeepMCPAgentCLI;
