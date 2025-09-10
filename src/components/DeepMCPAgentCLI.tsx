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
              className="flex gap-4 flex-wrap"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                  ¡Próximamente en producción!
                </div>
                <motion.a
                  href="#"
                  className="relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden group-hover:opacity-90 cursor-not-allowed inline-flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ pointerEvents: 'none' }}
                >
                  <span className="relative z-10">Ver Demostración</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </motion.a>
              </div>
              
              <motion.a
                href="#"
                className="relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden group inline-flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Ver WebUI</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default DeepMCPAgentSection;
