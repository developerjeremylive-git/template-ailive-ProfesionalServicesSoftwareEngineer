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
import React, { useState, useEffect, useRef } from 'react'
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
import { motion, AnimatePresence } from 'framer-motion'

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
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleProductClick = (title: string, description: string, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setPopupTitle(title)
    setPopupContent(description)
    setShowPopup(true)
  }

  // Auto-advance carousel with smooth scrolling and hover handling
  useEffect(() => {
    if (isPaused) return;
    
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
        const nextIndex = (activeIndex + 1) % 6; // 6 is the number of cards
        setActiveIndex(nextIndex);
        scrollToCard(nextIndex);
      }
    }, 5000); // Change card every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex, isPaused]);

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

            {/* Features Carousel */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-violet-300">
                  Nuestros Servicios
                </h2>
                
                <div className="relative w-full mt-12 overflow-hidden">
                  <div className="relative">
                    <div 
                      ref={scrollContainerRef}
                      className="flex space-x-6 pb-8 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <AnimatePresence mode="wait">
                        {[
                          {
                            id: 1,
                            icon: '🧠',
                            title: 'Investigación en IA',
                            description: 'Innovación en modelos de aprendizaje automático y procesamiento del lenguaje natural:',
                            features: [
                              'Desarrollo de modelos de lenguaje avanzados',
                              'Investigación en aprendizaje por refuerzo',
                              'Arquitecturas neuronales personalizadas',
                              'Optimización de modelos para producción',
                              'Ética y seguridad en IA'
                            ],
                            tech: 'PyTorch, TensorFlow, JAX, Transformers, RLlib',
                            achievement: 'Modelos con +95% de precisión en tareas específicas',
                            onClick: (e: React.MouseEvent) => handleProductClick('Investigación en IA', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)
                          },
                          {
                            id: 2,
                            icon: '⚙️',
                            title: 'Ingeniería de IA',
                            description: 'Implementación y despliegue de soluciones de IA a escala empresarial:',
                            features: [
                              'Arquitecturas escalables para inferencia de IA',
                              'Pipelines de ML automatizados',
                              'Optimización de modelos para edge computing',
                              'Monitoreo y mantenimiento de modelos en producción',
                              'Seguridad y privacidad de datos'
                            ],
                            tech: 'Kubernetes, TensorFlow Serving, ONNX, FastAPI, Prometheus',
                            achievement: '10x reducción en latencia de inferencia',
                            onClick: (e: React.MouseEvent) => handleProductClick('Ingeniería de IA', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)
                          },
                          {
                            id: 3,
                            icon: '🔍',
                            title: 'IA Aplicada',
                            description: 'Soluciones prácticas de IA para desafíos empresariales específicos:',
                            features: [
                              'Procesamiento de lenguaje natural (NLP)',
                              'Visión por computadora',
                              'Sistemas de recomendación',
                              'Análisis predictivo',
                              'Automatización de procesos con IA'
                            ],
                            tech: 'Chatbots, Análisis de Sentimiento, Detección de Anomalías',
                            achievement: '70% mejora en eficiencia operativa',
                            onClick: (e: React.MouseEvent) => handleProductClick('IA Aplicada', 'Estamos trabajando en esta sección. ¡Próximamente estará disponible!', e)
                          },
                          {
                            id: 4,
                            icon: '📱',
                            title: 'Desarrollo de Apps Móviles',
                            description: 'Apps nativas y multiplataforma de alto impacto:',
                            features: [
                              'Desarrollo iOS y Android nativo',
                              'Soluciones multiplataforma',
                              'Integración con backends escalables',
                              'Experiencia de usuario premium',
                              'Analytics y engagement'
                            ],
                            tech: 'React Native, Flutter, Swift, Kotlin',
                            achievement: '+1M descargas en apps empresariales',
                            onClick: () => navigate('/mobile-app-development')
                          },
                          {
                            id: 5,
                            icon: '🚀',
                            title: 'Desarrollo de Soluciones SaaS',
                            description: 'Plataformas SaaS innovadoras y escalables:',
                            features: [
                              'Arquitectura multi-tenant',
                              'Sistemas de facturación y suscripción',
                              'Analíticas avanzadas',
                              'Seguridad empresarial',
                              'APIs y integraciones'
                            ],
                            tech: 'Node.js, React, MongoDB, Redis, Docker',
                            achievement: '200% crecimiento MRR anual',
                            onClick: () => navigate('/saas-development')
                          },
                          {
                            id: 6,
                            icon: '🤖',
                            title: 'Soluciones de IA Avanzada',
                            description: 'Inteligencia artificial que transforma tu negocio:',
                            features: [
                              'Modelos de ML personalizados',
                              'Procesamiento de lenguaje natural',
                              'Visión por computadora',
                              'Automatización inteligente',
                              'Análisis predictivo'
                            ],
                            tech: 'TensorFlow, PyTorch, OpenAI, Hugging Face',
                            achievement: '500% mejora en eficiencia operativa',
                            onClick: () => navigate('/ai-services')
                          }
                        ].map((feature, index) => (
                          <motion.div
                            key={feature.id}
                            className={`flex-shrink-0 w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 px-2 transition-all duration-300 ${
                              activeIndex === index 
                                ? 'z-10 scale-105' 
                                : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
                            }`}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ 
                              opacity: activeIndex === index ? 1 : 0.6,
                              scale: activeIndex === index ? 1.05 : 0.95,
                              x: 0
                            }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            onMouseEnter={() => {
                              setActiveIndex(index);
                              const container = scrollContainerRef.current;
                              if (container) {
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
                            }}
                            onClick={(e) => {
                              feature.onClick(e);
                            }}
                          >
                            <div 
                              className={`h-full bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all duration-300 border ${
                                activeIndex === index 
                                  ? 'border-pink-500/50 shadow-lg shadow-pink-500/20' 
                                  : 'border-white/5 hover:border-pink-500/30 hover:shadow-lg hover:shadow-pink-500/10'
                              }`}
                            >
                              <div className="text-4xl mb-6">{feature.icon}</div>
                              <h3 className="text-2xl font-semibold text-white mb-4">
                                {feature.title}
                              </h3>
                              <p className="text-violet-200 mb-4">
                                {feature.description}
                              </p>
                              <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                                {feature.features.map((item, i) => (
                                  <li key={i} className="text-violet-300">{item}</li>
                                ))}
                              </ul>
                              <div className="text-sm text-violet-300 p-4 bg-gradient-to-r from-purple-900/40 to-violet-900/40 rounded-lg mb-4 border border-white/5">
                                <strong className="text-pink-300">
                                  {feature.id <= 3 ? 'Tecnologías:' : feature.id === 4 ? 'Frameworks:' : 'Stack:'}
                                </strong> {feature.tech}
                              </div>
                              <div className="text-sm text-green-300 p-4 bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg border border-white/5">
                                <strong className="text-green-200">
                                  {feature.id <= 2 ? (feature.id === 1 ? 'Logro:' : 'Impacto:') : feature.id === 3 ? 'Resultado:' : feature.id === 4 ? 'Logro:' : feature.id === 5 ? 'Métrica:' : 'ROI:'}
                                </strong> {feature.achievement}
                              </div>
                            </div>
                          </motion.div>
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
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <motion.button
                          key={index}
                          className={`w-3 h-3 rounded-full focus:outline-none ${
                            activeIndex === index ? 'bg-pink-400' : 'bg-purple-500/30'
                          }`}
                          onClick={() => setActiveIndex(index)}
                          whileHover={{ scale: 1.5 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          aria-label={`Ir a la tarjeta ${index + 1}`}
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