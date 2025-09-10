import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { useApp } from './context/AppContext'
import { useLanguage } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ApiProvider } from './context/ApiContext'
import Header from './components/Header'
import AnimatedFooter from './components/AnimatedFooter'
import UseCasesSection from './components/UseCasesSection'
import NeuralNetworkBackground from './components/NeuralNetworkBackground'
import ScrollToTop from './components/ScrollToTop'
import AuthPopup from './components/AuthPopup'
import ProfileImage from './components/ProfileImage'
import DocsPage from './pages/DocsPage'
import ModelsPage from './pages/ModelsPage'
import ModelDetailPage from './pages/ModelDetailPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import InteractiveDemoPage from './pages/InteractiveDemoPage'
import StarterDashboard from './pages/StarterDashboard'
import DeepMCPAgentSection from './components/DeepMCPAgentSection'
import DeepMCPAgentCLI from './components/DeepMCPAgentCLI'
import ProDashboard from './pages/ProDashboard'
import EnterpriseDashboard from './pages/EnterpriseDashboard'
import SubscriptionPage from './pages/SubscriptionPage'
import SubscriptionSuccessPage from './pages/SubscriptionSuccessPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import PlanManagementPage from './pages/PlanManagementPage'
import AboutPage from './pages/AboutPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import AiToolsPage from './pages/AiToolsPage'
import DashboardPreview from './components/DashboardPreview'
import ExploreModelsPopup from './components/ExploreModelsPopup'
import LearnMorePopup from './components/LearnMorePopup'
import SubscriptionPopup from './components/SubscriptionPopup'
import { useState } from 'react'
import React, { useEffect } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import WebDevelopmentPage from './pages/WebDevelopmentPage'
import CustomSoftwarePage from './pages/CustomSoftwarePage'
import CloudDevelopmentPage from './pages/CloudDevelopmentPage'
import DatabaseDevelopmentPage from './pages/DatabaseDevelopmentPage'
import MobileAppDevelopmentPage from './pages/MobileAppDevelopmentPage'
import SaaSDevelopmentPage from './pages/SaaSDevelopmentPage'
import TechnicalSupportPage from './pages/TechnicalSupportPage'
import AiServicesPage from './pages/AiServicesPage'
import EcommercePage from './pages/EcommercePage'
import WordPressPage from './pages/WordPressPage'
import TiendaPage from './pages/TiendaPage'
import AutomationSolutionsPage from './pages/AutomationSolutionsPage'
import { motion } from 'framer-motion'

// Protected route component for user account and settings pages
const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Only protect user-specific pages after loading completes
  if (!isLoading && !user && (window.location.pathname.includes('/profile') ||
    window.location.pathname.includes('/settings') ||
    window.location.pathname.includes('/plan-management'))) {
    return <Navigate to="/pricing" />;
  }

  return children;
};

// Dashboard redirect based on user subscription
function DashboardRoute() {
  const { user, userSubscription } = useAuth();

  // If not logged in, default to interactive demo
  if (!user) {
    return <Navigate to="/interactive-demo" />;
  }

  // Redirect based on subscription plan
  switch (userSubscription?.plan_id) {
    case '2':
      return <Navigate to="/starter-dashboard" />;
    case '3':
      return <Navigate to="/pro-dashboard" />;
    case '4':
      return <Navigate to="/enterprise-dashboard" />;
    default:
      return <Navigate to="/interactive-demo" />;
  }
}

function AppContent() {
  const { language } = useLanguage()
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState('')
  const [popupContent, setPopupContent] = useState('')
  const [isExploreModelsOpen, setIsExploreModelsOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [isGraphEnabled, setIsGraphEnabled] = useState(true)

  const handleProductClick = (title: string, description: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setPopupTitle(title)
    setPopupContent(description)
    setShowPopup(true)
  }

  return (
    <>
      {isGraphEnabled && <NeuralNetworkBackground />}
      <ScrollToTop />
      <AuthPopup />
      <Routes>
        {/* Public Routes */}
        <Route path="/reset-password" element={<AuthPopup triggerReason="manual" />} />
        <Route path="/ecommerce" element={<EcommercePage />} />
        <Route path="/wordpress" element={<WordPressPage />} />
        <Route path="/web-development" element={<WebDevelopmentPage />} />
        <Route path="/custom-software" element={<CustomSoftwarePage />} />
        <Route path="/cloud-development" element={<CloudDevelopmentPage />} />
        <Route path="/database-development" element={<DatabaseDevelopmentPage />} />
        <Route path="/mobile-app-development" element={<MobileAppDevelopmentPage />} />
        <Route path="/saas-development" element={<SaaSDevelopmentPage />} />
        <Route path="/technical-support" element={<TechnicalSupportPage />} />
        <Route path="/ai-services" element={<AiServicesPage />} />
        <Route path="/automation-solutions" element={<AutomationSolutionsPage />} />
        <Route path="/" element={
          <div className="min-h-screen bg-theme-gradient">
            <Header variant="default" />
            <div className="pt-20 pb-20">
              <div className="container mx-auto px-4">
                <div className="text-center max-w-4xl mx-auto">
                  <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-violet-200">
                    Soluciones de Software y Servicios de IA
                  </h1>
                  <p className="text-lg md:text-xl text-violet-200 mb-12">
                    Transformo tus ideas en soluciones tecnológicas de alto impacto: desarrollo web personalizado, software a medida, arquitecturas en la nube escalables e inteligencia artificial avanzada, todo diseñado para impulsar tu negocio hacia el éxito digital del mañana.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => navigate('/contact')}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold hover:from-purple-600 hover:to-violet-600 transition-all"
                    >
                      Solicita tu Consulta Gratuita
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Agents Platform Section */}
            <DeepMCPAgentSection />

            <DeepMCPAgentCLI />

            {/* MAaaS Platform Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-20 bg-black/20 relative overflow-hidden"
            >
              {/* Particle Background */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent"></div>
                <div className="absolute inset-0 opacity-30">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-500 rounded-full"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: [null, Math.random() * -500],
                        opacity: [0.7, 0],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <motion.div
                    className="md:w-1/2 text-left"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      MAaaS: Plataforma Multi-Agente como Servicio
                    </motion.h2>
                    <motion.p
                      className="text-lg text-blue-100 mb-8 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Una plataforma escalable Multi-Agente como Servicio construida sobre la arquitectura serverless de Cloudflare. Incluye características como comunicación en tiempo real a través de WebSocket, programación avanzada de tareas e integración perfecta con los principales modelos de IA, incluyendo OpenAI y Google Gemini. La plataforma ofrece un robusto frontend en TypeScript y React con sesiones de chat seguras y persistentes, y manejo eficiente de mensajes mediante Cloudflare Durable Objects.
                    </motion.p>
                    <motion.div
                      className="flex gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://my-chat-agent.developerjeremylive.workers.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Explorar Plataforma</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 rounded-full bg-white bg-opacity-10 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Solicitar Demo</span>
                        <div className="absolute inset-0 bg-white bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="md:w-1/2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative w-full max-w-lg mx-auto">
                      <motion.div
                        className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-75 blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.7, 0.5],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center justify-center mb-6">
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center relative overflow-hidden"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600"
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                          <div className="flex items-start gap-3 text-blue-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Comunicación en tiempo real</span> con WebSocket</span>
                          </div>
                          <div className="flex items-start gap-3 text-blue-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Programación avanzada</span> de tareas</span>
                          </div>
                          <div className="flex items-start gap-3 text-blue-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Integración perfecta</span> con modelos de IA</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* EcommetAIntegration Platform Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-20 bg-black/20 relative overflow-hidden"
            >
              {/* Fondo de partículas */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-900/20 to-transparent"></div>
                <div className="absolute inset-0 opacity-30">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        scale: Math.random() * 0.5 + 0.5,
                      }}
                      animate={{
                        y: [null, Math.random() * -500],
                        opacity: [0.7, 0],
                      }}
                      transition={{
                        duration: Math.random() * 2 + 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                  <motion.div
                    className="md:w-1/2 text-left"
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-400"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Plataforma de IA para Análisis Predictivo
                    </motion.h2>
                    <motion.div
                      className="text-lg text-violet-200 mb-8 leading-relaxed space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p>Aplicación API REST desarrollada con Flask que integra tecnologías avanzadas de IA para ofrecer análisis predictivos y reconocimiento de patrones.</p>
                      
                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-2">Características principales:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Reconocimiento de voz mediante Speech Recognition API</li>
                        <li>Análisis de emociones con Azure Face API</li>
                        <li>Modelos predictivos con precisión superior al 80%</li>
                        <li>Interfaz intuitiva con procesamiento en tiempo real</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-2">Modelos implementados:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Asociación de productos en tienda</li>
                        <li>Clasificación de calidad de vino</li>
                        <li>Clasificación de imágenes de ojos por género</li>
                        <li>Predicción de precios de automóviles</li>
                        <li>Análisis de series de tiempo para criptomonedas</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-2">Tecnologías clave:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-yellow-200">Aprendizaje Supervisado</h4>
                          <p className="text-sm">Regresión lineal, ARIMA, Árboles de decisión, Bosques aleatorios, KNN, SVM, Redes Neuronales</p>
                        </div>
                        <div className="bg-gray-900/50 p-4 rounded-lg">
                          <h4 className="font-medium text-yellow-200">Aprendizaje No Supervisado</h4>
                          <p className="text-sm">Algoritmo Apriori para análisis de asociación</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://gitlab.com/jeremylive/ProyectoIA_Jarvis/-/blob/main/Documentacion.pdf?ref_type=heads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Explorar Documentación</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 rounded-full bg-white bg-opacity-10 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Solicitar Demo</span>
                        <div className="absolute inset-0 bg-white bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="md:w-1/2"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative w-full max-w-lg mx-auto">
                      <motion.div
                        className="absolute -inset-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl opacity-75 blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.5, 0.7, 0.5],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center justify-center mb-6">
                          <motion.div
                            className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
                          <div className="flex items-start gap-3 text-yellow-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Reconocimiento de voz avanzado</span> - Interacción natural mediante comandos de voz con más del 90% de precisión</span>
                          </div>
                          <div className="flex items-start gap-3 text-yellow-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Análisis de emociones en tiempo real</span> - Detección precisa de emociones mediante reconocimiento facial</span>
                          </div>
                          <div className="flex items-start gap-3 text-yellow-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Modelos predictivos especializados</span> - Precisión superior al 80% en predicciones de precios y clasificaciones</span>
                          </div>
                          <div className="flex items-start gap-3 text-yellow-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">API REST personalizable</span> - Fácil integración con sistemas existentes mediante endpoints flexibles</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* AI Products & Departments Section */}
            <section className="py-20 bg-gradient-to-b from-black/40 to-violet-900/20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    Plataforma Integral de IA Empresarial
                  </h2>
                  <p className="text-violet-200 text-xl max-w-4xl mx-auto leading-relaxed">
                    Soluciones de inteligencia artificial de vanguardia impulsadas por nuestra arquitectura multi-agente y modelos de aprendizaje profundo.
                  </p>
                </div>
                <div className="max-w-6xl mx-auto">
                  <div className="bg-gradient-to-br from-purple-900/40 to-violet-800/40 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div 
                        className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer hover:bg-white/10"
                        onClick={() => handleProductClick(
                          'DeepMCP Agent',
                          'Estamos trabajando en la implementación de esta funcionalidad. ¡Próximamente estará disponible!'
                        )}
                      >
                        <div className="text-4xl mb-4">🤖</div>
                        <h3 className="text-xl font-semibold text-white mb-3">DeepMCP Agent</h3>
                        <p className="text-violet-200 text-sm">Agente autónomo de propósito general con capacidades avanzadas de razonamiento y ejecución de tareas complejas.</p>
                      </div>
                      <div 
                        className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer hover:bg-white/10"
                        onClick={() => handleProductClick(
                          'MCP Vision',
                          'Estamos trabajando en la implementación de esta funcionalidad. ¡Próximamente estará disponible!'
                        )}
                      >
                        <div className="text-4xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-3">MCP Vision</h3>
                        <p className="text-violet-200 text-sm">Sistema de visión por computadora para análisis avanzado de imágenes y vídeo en tiempo real.</p>
                      </div>
                      <div 
                        className="p-6 bg-white/5 rounded-xl border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer hover:bg-white/10"
                        onClick={() => handleProductClick(
                          'DataFlow Engine',
                          'Estamos trabajando en la implementación de esta funcionalidad. ¡Próximamente estará disponible!'
                        )}
                      >
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold text-white mb-3">DataFlow Engine</h3>
                        <p className="text-violet-200 text-sm">Plataforma de procesamiento de datos a gran escala con capacidades de análisis predictivo.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Popup */}
            {showPopup && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowPopup(false)}>
                <div className="bg-gradient-to-br from-purple-900/90 to-violet-900/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-purple-500/30 shadow-2xl" onClick={e => e.stopPropagation()}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">{popupTitle}</h3>
                    <button 
                      onClick={() => setShowPopup(false)}
                      className="text-violet-300 hover:text-white transition-colors"
                      aria-label="Cerrar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-violet-100 mb-6">{popupContent}</p>
                  <div className="flex justify-end">
                    <button 
                      onClick={() => setShowPopup(false)}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Features Grid */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Departamento de IA Avanzada */}
                  <div 
  className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 border border-white/5 hover:border-purple-500/30" 
  onClick={(e) => handleProductClick('Investigación en IA', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)}
>
                    <div className="text-4xl mb-6">🧠</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Investigación en IA
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Innovación en modelos de aprendizaje automático y procesamiento del lenguaje natural:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Desarrollo de modelos de lenguaje avanzados</li>
                      <li>Investigación en aprendizaje por refuerzo</li>
                      <li>Arquitecturas neuronales personalizadas</li>
                      <li>Optimización de modelos para producción</li>
                      <li>Ética y seguridad en IA</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Tecnologías:</strong> PyTorch, TensorFlow, JAX, Transformers, RLlib
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Logro:</strong> Modelos con +95% de precisión en tareas específicas
                    </div>
                  </div>

                  {/* Departamento de Ingeniería de IA */}
                  <div 
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 border border-white/5 hover:border-purple-500/30"
                    onClick={(e) => handleProductClick('Ingeniería de IA', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)}
                  >
                    <div className="text-4xl mb-6">⚙️</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Ingeniería de IA
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Implementación y despliegue de soluciones de IA a escala empresarial:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Arquitecturas escalables para inferencia de IA</li>
                      <li>Pipelines de ML automatizados</li>
                      <li>Optimización de modelos para edge computing</li>
                      <li>Monitoreo y mantenimiento de modelos en producción</li>
                      <li>Seguridad y privacidad de datos</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Tecnologías:</strong> Kubernetes, TensorFlow Serving, ONNX, FastAPI, Prometheus
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Impacto:</strong> 10x reducción en latencia de inferencia
                    </div>
                  </div>

                  {/* Departamento de IA Aplicada */}
                  <div 
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105 border border-white/5 hover:border-purple-500/30"
                    onClick={(e) => handleProductClick('IA Aplicada', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)}
                  >
                    <div className="text-4xl mb-6">🔍</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      IA Aplicada
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Soluciones prácticas de IA para desafíos empresariales específicos:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Procesamiento de lenguaje natural (NLP)</li>
                      <li>Visión por computadora</li>
                      <li>Sistemas de recomendación</li>
                      <li>Análisis predictivo</li>
                      <li>Automatización de procesos con IA</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Casos de Uso:</strong> Chatbots, Análisis de Sentimiento, Detección de Anomalías
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Resultado:</strong> 70% mejora en eficiencia operativa
                    </div>
                  </div>

                  {/* Desarrollo Móvil */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/mobile-app-development')}>
                    <div className="text-4xl mb-6">📱</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Desarrollo de Apps Móviles
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Apps nativas y multiplataforma de alto impacto:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Desarrollo iOS y Android nativo</li>
                      <li>Soluciones multiplataforma</li>
                      <li>Integración con backends escalables</li>
                      <li>Experiencia de usuario premium</li>
                      <li>Analytics y engagement</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Frameworks:</strong> React Native, Flutter, Swift, Kotlin
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Logro:</strong> +1M descargas en apps empresariales
                    </div>
                  </div>

                  {/* Desarrollo SaaS */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/saas-development')}>
                    <div className="text-4xl mb-6">🚀</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Desarrollo de Soluciones SaaS
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Plataformas SaaS innovadoras y escalables:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Arquitectura multi-tenant</li>
                      <li>Sistemas de facturación y suscripción</li>
                      <li>Analíticas avanzadas</li>
                      <li>Seguridad empresarial</li>
                      <li>APIs y integraciones</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Stack:</strong> Node.js, React, MongoDB, Redis, Docker
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Métrica:</strong> 200% crecimiento MRR anual
                    </div>
                  </div>

                  {/* Servicios de IA */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/ai-services')}>
                    <div className="text-4xl mb-6">🤖</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Soluciones de IA Avanzada
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Inteligencia artificial que transforma tu negocio:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Modelos de ML personalizados</li>
                      <li>Procesamiento de lenguaje natural</li>
                      <li>Visión por computadora</li>
                      <li>Automatización inteligente</li>
                      <li>Análisis predictivo</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Tecnologías:</strong> TensorFlow, PyTorch, OpenAI, Hugging Face
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>ROI:</strong> 500% mejora en eficiencia operativa
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Solutions Section */}
            <UseCasesSection />

            {/* Footer */}
            <AnimatedFooter />
          </div>
        } />

        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/tienda" element={<TiendaPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/models" element={<ModelsPage />} />
        <Route path="/models/:modelId" element={<ModelDetailPage />} />
        <Route path="/ai-tools" element={<AiToolsPage />} />

        {/* Dashboard Routes - Now public but features require auth */}
        <Route path="/interactive-demo" element={<InteractiveDemoPage />} />
        <Route path="/starter-dashboard" element={<StarterDashboard />} />
        <Route path="/pro-dashboard" element={<ProDashboard />} />
        <Route path="/enterprise-dashboard" element={<EnterpriseDashboard />} />

        {/* Protected User Account Routes */}
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
        <Route path="/subscription" element={<ProtectedRoute><SubscriptionPage /></ProtectedRoute>} />
        <Route path="/plan-management" element={<ProtectedRoute><PlanManagementPage /></ProtectedRoute>} />
        <Route path="/subscription/success" element={<ProtectedRoute><SubscriptionSuccessPage /></ProtectedRoute>} />

        {/* Dashboard Redirect */}
        <Route path="/dashboard" element={<DashboardRoute />} />
      </Routes>

      {/* Popups */}
      <ExploreModelsPopup
        isOpen={isExploreModelsOpen}
        onClose={() => setIsExploreModelsOpen(false)}
      />
      <LearnMorePopup
        isOpen={isLearnMoreOpen}
        onClose={() => setIsLearnMoreOpen(false)}
      />
      <SubscriptionPopup
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppProvider>
          <AuthProvider>
            <ApiProvider>
              <AppContent />
            </ApiProvider>
          </AuthProvider>
        </AppProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;