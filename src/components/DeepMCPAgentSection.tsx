import React from 'react';
import { motion } from 'framer-motion';

export const DeepMCPAgentSection = () => {
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
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Múltiples Modelos</strong>: Elige entre diferentes modelos de IA incluyendo GPT-3.5, GPT-4 y Google Gemini</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Manejo Avanzado de Datos</strong>: Soporta varios formatos de entrada/salida incluyendo texto, imágenes y datos estructurados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Integración con Hugging Face</strong>: Conéctate sin problemas con miles de modelos y herramientas del ecosistema Hugging Face</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Chat Interactivo</strong>: Interfaz de lenguaje natural con soporte para contenido enriquecido y conversaciones de múltiples turnos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Configuración de Modelos</strong>: Ajusta parámetros como temperatura, tokens máximos y métodos de muestreo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Respuestas en Tiempo Real</strong>: Transmite respuestas con soporte para carga progresiva de contenido</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Gestión de Sesiones</strong>: Historial de conversaciones persistente con conciencia del contexto</span>
                </li>
              </ul>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">🖼️</span> Contenido Multimedia y Generación de Imágenes
              </h3>
              <p className="mb-4">
                La interfaz de chat admite manejo avanzado de medios a través de las herramientas MCP de Hugging Face:
              </p>
              
              <h4 className="text-xl font-semibold text-white mt-6 mb-3">Capacidades de Generación de Imágenes</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Texto a Imagen</strong>: Genera imágenes de alta calidad a partir de descripciones de texto usando modelos de última generación</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Imagen a Imagen</strong>: Transforma y mejora imágenes existentes basado en instrucciones de texto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Procesamiento por Lotes</strong>: Genera múltiples variaciones de imágenes en una sola solicitud</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Transferencia de Estilo</strong>: Aplica estilos artísticos a imágenes generadas o cargadas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span><strong>Mejora de Resolución</strong>: Aumenta la resolución de imágenes manteniendo la calidad</span>
                </li>
              </ul>

              <h4 className="text-xl font-semibold text-white mt-8 mb-3">Operaciones de Imagen Soportadas</h4>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>Generación múltiple de imágenes con diferentes parámetros</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>Edición y manipulación de imágenes mediante lenguaje natural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>Soporte para varias proporciones y resoluciones de aspecto</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>Integración con Stable Diffusion y otros modelos líderes de generación de imágenes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-pink-400 mr-2">•</span>
                  <span>Vista previa en tiempo real de imágenes generadas</span>
                </li>
              </ul>

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
