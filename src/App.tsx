import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { X, ArrowDown, ArrowUp, RotateCw } from 'lucide-react'
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
import React, { useState, useEffect, useRef, useCallback } from 'react'
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
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { FiMap, FiBookOpen, FiList, FiFileText, FiPieChart, FiLayers, FiMic, FiVideo, FiCpu, FiDatabase, FiZap, FiGlobe, FiShare2, FiGrid, FiInfo } from 'react-icons/fi'

// Protected route component for user account and settings pages
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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

const FloatingScrollButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [rotation, setRotation] = useState(0);
  const controls = useAnimation();
  const buttonVariants = {
    initial: { scale: 1, rotate: 0 },
    spin: { 
      rotate: 360,
      transition: { duration: 0.5 }
    },
    bounce: {
      y: [0, -10, 0],
      transition: { duration: 0.5 }
    }
  };

  const checkScrollPosition = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const isBottom = scrollPosition >= pageHeight - 100; // 100px threshold
    setIsAtBottom(isBottom);
  }, []);

  const scrollToNextSection = useCallback(() => {
    const currentScroll = window.scrollY;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll('section, footer, header, main > div');
    
    // Find the next section to scroll to
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i] as HTMLElement;
      const sectionTop = section.offsetTop;
      
      if (sectionTop > currentScroll + 100) { // 100px offset from top
        window.scrollTo({
          top: sectionTop,
          behavior: 'smooth'
        });
        return;
      }
    }
    
    // If no next section found, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setRotation(prev => prev + 180);
  }, []);

  const handleClick = async () => {
    // Animate button
    await controls.start('spin');
    await controls.start('bounce');
    controls.start('initial');
    
    // Handle scroll
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollToNextSection();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    window.addEventListener('resize', checkScrollPosition);
    checkScrollPosition(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
    };
  }, [checkScrollPosition]);

  return (
    <motion.button
      className="fixed bottom-6 right-6 z-40 p-3 text-white rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-blue-500"
      style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #8b5cf6 100%)',
        boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.4)'
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.6)',
        transition: { duration: 0.2 }
      }}
      whileTap={{ 
        scale: 0.95,
        boxShadow: '0 2px 8px 0 rgba(99, 102, 241, 0.3)'
      }}
      onClick={handleClick}
      initial="initial"
      animate={controls}
      variants={buttonVariants}
      aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to next section'}
    >
      {isAtBottom ? (
        <ArrowUp className="w-6 h-6" />
      ) : (
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 0.3 }}
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      )}
    </motion.button>
  );
};

function AppContent() {
  const [isAgentSectionOpen, setIsAgentSectionOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsAgentSectionOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isAgentSectionOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAgentSectionOpen, handleClickOutside]);
  // const { language } = useLanguage()
  // const { user, isAuthenticated } = useAuth()
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [popupTitle, setPopupTitle] = useState('')
  const [popupContent, setPopupContent] = useState('')
  const [popupBody, setPopupBody] = useState<React.ReactNode | null>(null)
  const [isExploreModelsOpen, setIsExploreModelsOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)
  const [isGraphEnabled, setIsGraphEnabled] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const mktvozScrollRef = useRef<HTMLDivElement>(null)
  const [mktvozActiveIndex, setMktvozActiveIndex] = useState(0)
  const [isMktvozPaused, setIsMktvozPaused] = useState(false)
  const mktvozContainerVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { delay: 0.05, staggerChildren: 0.08 } }
  }
  const mktvozItemVariants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0 }
  }
  const mktvozItems = [
    { icon: <FiMap className="w-5 h-5 text-pink-300" />, title: 'Mindmap', desc: 'Mapas mentales jerárquicos' },
    { icon: <FiBookOpen className="w-5 h-5 text-pink-300" />, title: 'Flashcards', desc: 'Tarjetas de estudio' },
    { icon: <FiList className="w-5 h-5 text-pink-300" />, title: 'Quiz', desc: 'Preguntas de opción múltiple' },
    { icon: <FiFileText className="w-5 h-5 text-pink-300" />, title: 'Report', desc: 'Resumen ejecutivo' },
    { icon: <FiPieChart className="w-5 h-5 text-pink-300" />, title: 'Infographic', desc: 'Datos para infografías' },
    { icon: <FiLayers className="w-5 h-5 text-pink-300" />, title: 'Slides', desc: 'Esquemas de presentación' },
    { icon: <FiMic className="w-5 h-5 text-pink-300" />, title: 'Audio (Resumen)', desc: 'Guion/audio resumen de tu documento' },
    { icon: <FiVideo className="w-5 h-5 text-pink-300" />, title: 'Video Overview', desc: 'Video resumen sincronizado' }
  ]

  const scrollMktvozToCard = (index: number) => {
    if (mktvozScrollRef.current) {
      const container = mktvozScrollRef.current
      const card = container.children[index] as HTMLElement
      if (card) {
        const containerWidth = container.offsetWidth
        const cardWidth = card.offsetWidth
        const scrollLeft = card.offsetLeft - (containerWidth / 2) + (cardWidth / 2)
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
      }
    }
  }

  const handleProductClick = (title: string, content: string | React.ReactNode, e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setPopupTitle(title)
    if (typeof content === 'string') {
      setPopupContent(content)
      setPopupBody(null)
    } else {
      setPopupContent('')
      setPopupBody(content)
    }
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

  useEffect(() => {
    if (isMktvozPaused) return
    const interval = setInterval(() => {
      const nextIndex = (mktvozActiveIndex + 1) % mktvozItems.length
      setMktvozActiveIndex(nextIndex)
      scrollMktvozToCard(nextIndex)
    }, 4000)
    return () => clearInterval(interval)
  }, [mktvozActiveIndex, isMktvozPaused])

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
            
            {/* Mission & Vision Section */}
            <motion.section
              className="pt-20 pb-16 relative overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="container mx-auto px-4">
                <motion.div 
                  className="max-w-5xl mx-auto bg-gradient-to-br from-purple-900/40 to-violet-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/30 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <motion.h2 
                    className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  >
                    💻 Ingeniero de Software GenAI | Diseñando Soluciones de IA Escalables para Empresas Globales 💻
                  </motion.h2>
                  
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.15
                        }
                      }
                    }}
                  >
                    <div>
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </span>
                        Perfil Profesional
                      </motion.h3>
                      <motion.p 
                        className="text-violet-200 leading-relaxed mb-4"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
                        }}
                      >
                        Computer Engineering 8yrs | Computer Science | AI-Assisted Coding | Generative Artificial Intelligence Engineer | Machine & Deep Learning Engineer | Deep Neural Networks | Data Scientist | MCP/Agent Skills | C, R, Python
                      </motion.p>
                      
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } }
                        }}
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </span>
                        Educación
                      </motion.h3>
                      <motion.p 
                        className="text-violet-200 leading-relaxed"
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } }
                        }}
                      >
                        • Licenciatura en Ingeniería en Computadores por el TEC de Costa Rica: Fuerte base en Machine Learning, Deep Leaning, Modelos de IA, Predicciones de Modelos de IA Entrenados, AIOps, Big Data, Arquitectura de Software, Análisis de Algoritmos, Estructura de Datos, DBA, Diseño de UI/UX de Sistemas y Desarrollo Cross-Platform como Ingeniería de Software.
                      </motion.p>
                    </div>
                    
                    <div>
                      <motion.h3 
                        className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                        }}
                      >
                        <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                        Logros Recientes
                      </motion.h3>
                      <motion.ul 
                        className="list-disc pl-6 space-y-3 text-violet-200"
                        variants={{
                          hidden: { opacity: 0, x: 20 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.1 } }
                        }}
                      >
                        <li>Desarrollé una plataforma de Multi-Agent-as-a-Service (MAaaS) de vanguardia utilizando la arquitectura serverless de Cloudflare y Durable Objects.</li>
                        <li>Construí servidores MCP personalizados y soluciones Gradio para crear APIs potentes y funciones MCP.</li>
                        <li>Especializado en el entrenamiento y ajuste fino de Agentes LLM, incluyendo modelos multimodales como Gemma 3n con capacidades de visión.</li>
                        <li>Experto en la implementación de soluciones de Machine Learning rentables y la escala de flujos de trabajo de AI de código abierto.</li>
                      </motion.ul>
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold text-white mb-4 flex items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </span>
                    Expertise Principal
                  </motion.h3>
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {[
                      { title: 'Desarrollo Backend', desc: 'Python, Node.js/TypeScript, C#/.NET, Java, lógica server-side escalable.' },
                      { title: 'Ingeniería AI/ML', desc: 'Entrenamiento, ajuste fino e implementación de LLMs, soluciones AI multimodales.' },
                      { title: 'Plataformas Cloud', desc: 'AWS, Azure, Google Cloud, Cloudflare, arquitecturas serverless.' },
                      { title: 'API & Integración', desc: 'APIs RESTful, GraphQL, WebSockets, OAuth 2.0, JWT.' }
                    ].map((item, index) => (
                      <motion.div 
                        key={index}
                        className="bg-purple-900/30 p-4 rounded-xl border border-purple-500/20"
                        variants={{
                          hidden: { opacity: 0, scale: 0.95 },
                          visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
                        }}
                        whileHover={{ scale: 1.02, borderColor: 'rgba(168, 85, 247, 0.5)' }}
                      >
                        <h4 className="font-medium text-white mb-2">{item.title}</h4>
                        <p className="text-sm text-violet-200">{item.desc}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Logros Clave
                  </h3>
                  <ul className="list-disc pl-6 space-y-2 text-violet-200 mb-8">
                    <li>Arquitecturas de Microservicios Escalables: Mejoré el rendimiento de aplicaciones en un 40% bajo carga alta.</li>
                    <li>Sistemas Basados en AI y Datos: Implementé modelos de IA, mejorando la toma de decisiones para empresas globales.</li>
                    <li>Sistemas de Pago y Plataformas en Tiempo Real: Desarrollé pasarelas de pago seguras y plataformas de datos en tiempo real.</li>
                    <li>Migración y Optimización en la Nube: Reduje costos de infraestructura en un 25%, mejorando la escalabilidad.</li>
                  </ul>
                  
                  {/* Contact Button */}
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href="/contact"
                      className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Contáctame</span>
                    </motion.a>
                  </motion.div>
                </motion.div>
              </div>
            </motion.section>
            
            {/* AI Products Section */}
            <section className="py-20 relative overflow-hidden">
              {/* Background gradient with animated particles */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black/40 to-violet-900/20 z-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-500/30 rounded-full"
                    initial={{
                      x: Math.random() * window.innerWidth,
                      y: Math.random() * window.innerHeight,
                      scale: Math.random() * 0.5 + 0.5,
                    }}
                    animate={{
                      y: [null, Math.random() * -300 - 100],
                      opacity: [0.7, 0],
                    }}
                    transition={{
                      duration: Math.random() * 3 + 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>
              
              <div className="container mx-auto px-4 relative z-10">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="inline-block mb-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-pink-300 to-violet-300">
                    Productos de IA
                  </h2>
                  <p className="text-lg md:text-xl text-violet-200 max-w-3xl mx-auto leading-relaxed">
                    Descubre nuestras soluciones de IA impulsadas por la última tecnología, diseñadas para transformar tu experiencia digital
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  {/* PDF AI Translate Button */}
                  <motion.button
                    onClick={() => handleProductClick(
                      'PDF AI Translate',
                      <div className="space-y-6">
                        <p className="text-lg text-violet-100 leading-relaxed">
                          Una aplicación de React Native y Node.js/TypeScript que traduce documentos PDF del inglés al español utilizando inteligencia artificial avanzada.
                        </p>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                            </span>
                            Características
                          </h3>
                          <ul className="list-disc pl-8 space-y-3">
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Sube PDFs de hasta 50MB</li>
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Extracción de texto de cada página usando el modelo multimodal de Gemini</li>
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Traducción automática usando modelos de IA gratuitos de Pollination.ai</li>
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Generación de PDF traducido con formato preservado</li>
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Interfaz moderna y fácil de usar en React Native</li>
                            <li className="text-violet-200 hover:text-blue-400 transition-colors">Seguimiento de progreso en tiempo real</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </span>
                            Tecnologías
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                              <h4 className="font-medium text-white mb-2 text-lg">Backend:</h4>
                              <p className="text-sm text-violet-200">Node.js, TypeScript, Express, Google Generative AI, Pollination.ai, pdf-lib, Poppler</p>
                            </div>
                            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-5 rounded-xl border border-blue-500/20 hover:border-blue-500/40 transition-all">
                              <h4 className="font-medium text-white mb-2 text-lg">Frontend:</h4>
                              <p className="text-sm text-violet-200">React Native, Expo, TypeScript</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-center mt-8">
                          <motion.a
                            href="https://pdfaitranslate.etheroi.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>Visitar PDF AI Translate</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        </div>
                      </div>
                    )}
                    className="group relative px-10 py-8 bg-gradient-to-br from-blue-600 to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-4">📄</div>
                      <h3 className="text-2xl font-bold mb-3">PDF AI Translate</h3>
                      <p className="text-blue-100 mb-4">Traduce documentos PDF con inteligencia artificial avanzada</p>
                      <div className="flex items-center gap-2 text-sm text-blue-200">
                        <span className="px-3 py-1 rounded-full bg-white/10">React Native</span>
                        <span className="px-3 py-1 rounded-full bg-white/10">Gemini AI</span>
                      </div>
                    </div>
                  </motion.button>
                  
                  {/* LiveAITranslate Button */}
                  <motion.button
                    onClick={() => handleProductClick(
                      'LiveAITranslate',
                      <div className="space-y-6">
                        <p className="text-lg text-violet-100 leading-relaxed">
                          LiveAITranslate es un estudio de traducción de código abierto de alto rendimiento, diseñado para ofrecer una experiencia de traducción en tiempo real potenciada por Inteligencia Artificial generativa.
                        </p>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                              </svg>
                            </span>
                            Arquitectura Técnica
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-5 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all">
                              <h4 className="font-medium text-white mb-2 text-lg">Frontend:</h4>
                              <p className="text-sm text-violet-200">React 18+, Vite, Tailwind CSS, Shadcn UI, Framer Motion</p>
                            </div>
                            <div className="bg-gradient-to-br from-pink-900/30 to-purple-900/30 p-5 rounded-xl border border-pink-500/20 hover:border-pink-500/40 transition-all">
                              <h4 className="font-medium text-white mb-2 text-lg">Backend:</h4>
                              <p className="text-sm text-violet-200">Cloudflare Workers AI Edge, Server-Sent Events (SSE)</p>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                            <span className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center">
                              <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </span>
                            Capacidades de IA
                          </h3>
                          <ul className="list-disc pl-8 space-y-3">
                            <li className="text-violet-200 hover:text-pink-400 transition-colors">Traducción Semántica con contextualización profunda</li>
                            <li className="text-violet-200 hover:text-pink-400 transition-colors">Linguistic Insights con explicaciones gramaticales</li>
                            <li className="text-violet-200 hover:text-pink-400 transition-colors">Toolbox Lingüístico con sinónimos y análisis de formalidad</li>
                            <li className="text-violet-200 hover:text-pink-400 transition-colors">Audio & Voice Intelligence con Smart Voice Styles</li>
                            <li className="text-violet-200 hover:text-pink-400 transition-colors">Sistema de Gamificación para aprendizaje de idiomas</li>
                          </ul>
                        </div>
                        
                        <div className="flex justify-center mt-8">
                          <motion.a
                            href="https://liveaitranslate.etheroi.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span>Visitar LiveAITranslate</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </motion.a>
                        </div>
                      </div>
                    )}
                    className="group relative px-10 py-8 bg-gradient-to-br from-pink-600 to-purple-700 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10">
                      <div className="text-5xl mb-4">🌊</div>
                      <h3 className="text-2xl font-bold mb-3">LiveAITranslate</h3>
                      <p className="text-pink-100 mb-4">Traducción en tiempo real con IA generativa</p>
                      <div className="flex items-center gap-2 text-sm text-pink-200">
                        <span className="px-3 py-1 rounded-full bg-white/10">React</span>
                        <span className="px-3 py-1 rounded-full bg-white/10">Cloudflare AI</span>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>
            </section>
            
            <motion.section
              className="pt-40 pb-16 md:pt-24 md:pb-24 relative overflow-hidden"
            >

              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-10">
                    <div className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <FiCpu className="w-7 h-7 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-violet-300">
                      MktVoz: IA Conversacional para Contenidos
                    </h2>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                      Asistente de voz con IA que entiende tu voz, analiza archivos (PDF, audio, video, imágenes) y genera material de estudio al instante. Gratis y sin registro.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10 text-pink-200">RAG-enabled</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10 text-purple-200">Multimodal</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10 text-violet-200">Gemini 2.5 Flash Native</span>
                      <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/10 text-teal-200">Gratis · Sin registro</span>
                    </div>
                    <div className="mt-8 flex items-center justify-center gap-4">
                      <a
                        href="https://mktvoz.etheroi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Visitar MktVoz"
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        Visitar MktVoz
                      </a>
                    </div>
                    </div>

                  <div className="grid grid-cols-1 gap-10">
                    <div
                      className="bg-white/5 rounded-2xl p-6 border border-white/10"
                    >
                      <h3 className="text-2xl font-semibold text-white mb-4">Funciones de generación de contenido</h3>
                      <p className="text-violet-200 mb-4">Basadas en documento del usuario y Gemini 2.5 Flash.</p>
                      <div className="relative w-full">
                        <div className="relative">
                          <div
                            ref={mktvozScrollRef}
                            className="mktvoz-carousel flex space-x-4 pb-4 px-2 overflow-x-auto snap-x snap-mandatory"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                            onMouseEnter={() => setIsMktvozPaused(true)}
                            onMouseLeave={() => setIsMktvozPaused(false)}
                          >
                            {mktvozItems.map((item, idx) => (
                              <div
                                key={idx}
                                className={`flex-shrink-0 w-72 snap-center p-4 rounded-lg bg-purple-900/40 border transition-all ${
                                  mktvozActiveIndex === idx ? 'border-pink-500/50 shadow-lg shadow-pink-500/20' : 'border-purple-500/30 hover:border-pink-500/30'
                                }`}
                                onClick={() => {
                                  setMktvozActiveIndex(idx)
                                  scrollMktvozToCard(idx)
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-9 h-9 rounded-lg bg-purple-600/20 flex items-center justify-center">
                                    {item.icon}
                                  </div>
                                  <div>
                                    <p className="text-white font-medium">{idx + 1}. {item.title}</p>
                                    <p className="text-violet-200 text-sm">{item.desc}</p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>
                          <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>
                    </div>
                        <style>{`.mktvoz-carousel::-webkit-scrollbar{display:none}`}</style>
                        <div className="mt-3 flex justify-center space-x-2">
                          {mktvozItems.map((_, i) => (
                            <button
                              key={i}
                              className={`w-2.5 h-2.5 rounded-full ${mktvozActiveIndex === i ? 'bg-pink-400' : 'bg-purple-500/40'}`}
                              onClick={() => {
                                setMktvozActiveIndex(i)
                                scrollMktvozToCard(i)
                              }}
                              aria-label={`Ir a la tarjeta ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div
                      className="bg-white/5 rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-pink-600/20 flex items-center justify-center">
                          <FiLayers className="w-6 h-6 text-pink-300" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Agente de Voz RAG (Multimodal)</h3>
                      </div>
                      <p className="text-violet-200 mb-4">Sube clases, papers, videos o grabaciones y activa las 8 funciones mágicas para estudiar mejor.</p>
                      <div className="grid grid-cols-4 gap-2">
                        {['PDF', 'Audio', 'Video', 'Imágenes'].map((k, i) => (
                          <div key={i} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center text-sm text-violet-200">{k}</div>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={(e) => handleProductClick('¿Qué es RAG?', 'RAG (Generación Aumentada por Recuperación) combina búsqueda semántica con generación. Primero indexa tu documento en embeddings, recupera los fragmentos más relevantes según tu consulta o voz, los añade al contexto del modelo y genera respuestas precisas y verificables. Beneficios: más contexto, menor alucinación y mejor fidelidad al material fuente. En MktVoz, RAG alimenta funciones como Mindmap, Flashcards, Quiz, Report, Infographic, Slides, Audio y Video Overview para producir resultados basados en tu archivo.', e)}
                          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-pink-500/50 transition-all text-sm flex items-center gap-2"
                          aria-label="Aprender sobre RAG"
                        >
                          <FiInfo className="w-4 h-4" />
                          Aprender sobre RAG
                        </button>
                        <button
                          onClick={(e) => handleProductClick('Agente Gemini', (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                  <div className="flex items-center gap-3 mb-4 text-cyan-300">
                                    <FiZap className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">Capabilities</h3>
                                  </div>
                                  <ul className="space-y-2 text-sm text-violet-100">
                                    <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Audio-to-Audio nativo (sin paso intermedio de texto).</li>
                                    <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Latencia ultra baja (~500ms de respuesta).</li>
                                    <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Detección de emoción y tono en la voz del usuario.</li>
                                    <li className="flex items-start gap-2"><span className="text-cyan-400">•</span> Conversación interrumpible (Full Duplex).</li>
                                  </ul>
                                </div>
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                  <div className="flex items-center gap-3 mb-4 text-purple-300">
                                    <FiCpu className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">Technical Specs</h3>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <div className="text-violet-300 text-xs uppercase">Model Name</div>
                                      <div className="font-mono text-violet-100">gemini-2.5-flash-native</div>
                                    </div>
                                    <div>
                                      <div className="text-violet-300 text-xs uppercase">Context Window</div>
                                      <div className="font-mono text-violet-100">1,000,000 Tokens</div>
                                    </div>
                                    <div>
                                      <div className="text-violet-300 text-xs uppercase">Audio Input</div>
                                      <div className="font-mono text-violet-100">16kHz PCM</div>
                                    </div>
                                    <div>
                                      <div className="text-violet-300 text-xs uppercase">Audio Output</div>
                                      <div className="font-mono text-violet-100">24kHz PCM</div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div className="bg-white/5 p-5 rounded-xl border border-white/10">
                                  <div className="flex items-center gap-3 mb-4 text-emerald-300">
                                    <FiGlobe className="w-6 h-6" />
                                    <h3 className="text-lg font-bold">Best Use Cases</h3>
                                  </div>
                                  <p className="text-sm text-violet-200 mb-4">Optimizado para interacción natural y de alta velocidad:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {['Customer Support','Roleplay Training','Real-time Translation','Interview Practice','Voice Commerce'].map((t) => (
                                      <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-xs text-violet-100 border border-white/10">{t}</span>
                                    ))}
                                  </div>
                                </div>
                                <div className="p-4 bg-yellow-900/30 border border-yellow-700/40 rounded-lg">
                                  <h4 className="text-yellow-400 font-bold mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                                    Limitations
                                  </h4>
                                  <p className="text-xs text-violet-200">En preview. Puede alucinar ocasionalmente. Verifica información crítica. La cuota de generación de audio es limitada por proyecto.</p>
                                </div>
                              </div>
                            </div>
                          ), e)}
                          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-purple-500/50 transition-all text-sm flex items-center gap-2"
                          aria-label="Agente Gemini"
                        >
                          <FiInfo className="w-4 h-4" />
                          Agente Gemini
                        </button>
                        <button
                          onClick={(e) => handleProductClick('Multimodal', (
                            <div className="space-y-4 text-violet-100">
                              <p>Sube PDF, Excel, Docs y otros formatos. Se procesan, se trocean en segmentos, se embeben y se guardan en una base de datos vectorial. Luego el LLM consulta y recupera fragmentos relevantes para responder con contexto.</p>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                  <h4 className="text-white font-semibold mb-2">Ingesta</h4>
                                  <ul className="space-y-2 text-sm">
                                    <li>Extracción: PDF.js, parsers de Office, OCR para imágenes.</li>
                                    <li>Normalización y limpieza de texto.</li>
                                    <li>Chunking por tokens/frases con ventana deslizante.</li>
                                    <li>Embeddings (vectorización) para cada chunk.</li>
                                    <li>Almacenamiento en índice vectorial (FAISS/PGVector/Pinecone).</li>
                                  </ul>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                                  <h4 className="text-white font-semibold mb-2">Consulta</h4>
                                  <ul className="space-y-2 text-sm">
                                    <li>Entrada por voz → STT → texto (cuando aplica).</li>
                                    <li>Vectorización de la consulta y búsqueda top‑k (cosine/inner‑product).</li>
                                    <li>Re‑ranking y filtrado semántico/por metadatos.</li>
                                    <li>Augmentación del contexto al prompt del LLM.</li>
                                    <li>Generación con citas/fragmentos para mayor fidelidad.</li>
                                  </ul>
                                </div>
                              </div>
                              <p className="text-sm">Este pipeline reduce alucinaciones y mejora precisión al mantener el vínculo con el material fuente. Ideal para estudiar, preparar presentaciones y crear resúmenes verificables.</p>
                            </div>
                          ), e)}
                          className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-emerald-500/50 transition-all text-sm flex items-center gap-2"
                          aria-label="Multimodal"
                        >
                          <FiInfo className="w-4 h-4" />
                          Multimodal
                        </button>
                      </div>
                    </div>

                    <div
                      className="bg-white/5 rounded-2xl p-6 border border-white/10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg bg-teal-600/20 flex items-center justify-center">
                          <FiMic className="w-6 h-6 text-teal-300" />
                        </div>
                        <h3 className="text-2xl font-semibold text-white">Agente de Voz Tradicional</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4 text-violet-200">
                        <FiGlobe className="w-5 h-5" />
                        <span>Idiomas: ES · EN · FR · DE · PT</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-violet-200">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3"><FiGrid className="w-5 h-5" /><span>Historial profesional</span></div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3"><FiShare2 className="w-5 h-5" /><span>Compartir conversación por URL</span></div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3"><FiCpu className="w-5 h-5" /><span>Personalidad ajustable</span></div>
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-3"><FiMic className="w-5 h-5" /><span>Voces realistas</span></div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/10"
                  >
                    <h3 className="text-2xl font-semibold text-white mb-4">Evolución de las funciones</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <FiCpu className="w-5 h-5 text-pink-400" />
                        <span className="text-violet-200">Actualizaciones de los modelos de IA de Google Gemini.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiFileText className="w-5 h-5 text-pink-400" />
                        <span className="text-violet-200">Cambios en los prompts enviados a los modelos.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiLayers className="w-5 h-5 text-pink-400" />
                        <span className="text-violet-200">Mejoras en procesamiento de entrada, extracción de PDFs.</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <FiBookOpen className="w-5 h-5 text-pink-400" />
                        <span className="text-violet-200">Actualizaciones de dependencias externas como PDF.js.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section 
              className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-teal-950/50 via-blue-900/40 to-emerald-900/30 border-t border-white/10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {/* Decorative Background Elements */}
              <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-800/15 via-cyan-800/10 to-indigo-800/15"></div>
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-teal-400/20"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      scale: Math.random() * 2 + 0.5,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3 + Math.random() * 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2
                    }}
                  />
                ))}
              </div>

              <div className="container mx-auto px-4 text-center">
                <motion.div 
                  className="mx-auto mb-6 w-14 h-14 rounded-2xl bg-gradient-to-tr from-lime-400 via-emerald-500 to-green-700 flex items-center justify-center shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  <FiZap className="w-7 h-7 text-white" />
                </motion.div>
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold text-white mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <span className="text-white">DeepMCPAgent: Potencia tu IA</span>
                </motion.h2>
                
                <motion.p 
                  className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  DeepMCPAgent es una plataforma de IA avanzada que utiliza el protocolo MCP (Model-Controller-Presenter) para ofrecer interacciones fluidas con modelos de lenguaje. Experimenta el futuro de la IA conversacional con 3,800 tokens gratuitos.
                </motion.p>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col sm:flex-row justify-center gap-6 mt-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="group relative">
                    <motion.button
                      onClick={() => setIsAgentSectionOpen(true)}
                      className="relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-semibold rounded-full overflow-hidden group-hover:shadow-lg group-hover:shadow-teal-500/30 transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        <span>¿Qué es DeepMCPAgent?</span>
                        <motion.svg 
                          className="w-5 h-5"
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          initial={{ x: 0 }}
                          whileHover={{ x: 5 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                    <div className="absolute -bottom-2 left-1/2 w-4/5 h-1 bg-teal-400/30 rounded-full blur-md transform -translate-x-1/2 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  <div className="group relative">
                    <DeepMCPAgentCLI />
                  </div>
                </motion.div>

                <motion.p 
                  className="text-sm text-gray-400 mt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  Haz clic en cualquiera de los botones para comenzar tu viaje con IA
                </motion.p>
              </div>
            </motion.section>

            {/* DeepMCPAgent Section Popup */}
            <AnimatePresence mode="wait">
              {isAgentSectionOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                >
                  <motion.div
                    ref={popupRef}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 20, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden"
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
                        onClick={() => setIsAgentSectionOpen(false)}
                        className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white"
                        aria-label="Cerrar"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 pr-5">
                      <DeepMCPAgentSection />
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

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
                      className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://chat.etheroi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden group text-center w-[240px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Explorar Plataforma</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 w-[240px] text-center flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(192, 132, 252, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Solicitar Demo</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H12a3.988 3.988 0 00-1.564-.317H5.436z" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

            {/* Etheroi Platform Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-20 bg-gradient-to-b from-purple-900/30 to-indigo-900/20 relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5"></div>
                {[...Array(15)].map((_, i) => (
                  <motion.div
                    key={`etheroi-bg-${i}`}
                    className="absolute rounded-full"
                    style={{
                      width: Math.random() * 100 + 50,
                      height: Math.random() * 100 + 50,
                      background: `radial-gradient(circle, rgba(168, 85, 247, ${Math.random() * 0.1 + 0.05}) 0%, rgba(236, 72, 153, 0) 70%)`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: Math.random() * 10 + 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>

              <div className="container mx-auto px-4 relative z-10">
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
                        className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl opacity-75 blur-xl"
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.4, 0.6, 0.4],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      />
                      <div className="relative bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                        <div className="flex items-center justify-center mb-6">
                          <motion.div
                            className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center relative overflow-hidden"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                              animate={{
                                rotate: [0, 360],
                              }}
                              transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            <svg className="w-10 h-10 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          <div className="flex items-start gap-3 text-purple-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Arquitectura Multi-Agente</span> con modelos GPT-4, Claude 3 y Mistral</span>
                          </div>
                          <div className="flex items-start gap-3 text-purple-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Integración nativa</span> con APIs de OpenAI, Anthropic y modelos open-source</span>
                          </div>
                          <div className="flex items-start gap-3 text-purple-100">
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span><span className="font-semibold text-white">Sistema unificado</span> para gestión de tareas, análisis de datos y automatización</span>
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
                      etherOI: Plataforma de IA Empresarial
                    </motion.h2>
                    <motion.div
                      className="text-lg text-purple-100 mb-8 leading-relaxed space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p>He desarrollado etherOI como un ecosistema de IA unificado que aprovecha modelos de lenguaje de última generación, incluyendo arquitecturas Transformer y técnicas avanzadas de fine-tuning. La plataforma integra múltiples productos de IA bajo un mismo techo, permitiendo un flujo de trabajo sin fricciones para resolver cualquier tarea empresarial.</p>
                      
                      <p className="bg-purple-900/30 border-l-4 border-pink-500 pl-4 py-2 italic">
                        "La verdadera revolución de la IA no está en modelos individuales, sino en sistemas que integran múltiples capacidades de IA de manera coherente y productiva."
                      </p>
                      
                      <div>La arquitectura de etherOI se basa en microservicios escalables que implementan:
                        <ul className="list-disc list-inside mt-2 space-y-1">
                          <li>Modelos de lenguaje entrenados con RLHF (Reinforcement Learning from Human Feedback)</li>
                          <li>Redes neuronales profundas para procesamiento de lenguaje natural</li>
                          <li>Sistemas de RAG (Retrieval-Augmented Generation) para precisión en datos</li>
                          <li>Pipelines de MLOps para despliegue continuo de modelos</li>
                        </ul>
                      </div>
                    </motion.div>
                    <motion.div
                      className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10 w-full"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://etheroi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold overflow-hidden group text-center w-[240px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Explorar Plataforma</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="https://chat.etheroi.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 w-[240px] text-center flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(192, 132, 252, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Solicitar Demo</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H12a3.988 3.988 0 00-1.564-.317H5.436z" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                    </motion.div>
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
                      className="text-lg text-violet-200 mb-6 leading-relaxed space-y-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p>Aplicación API REST desarrollada con Flask que integra tecnologías avanzadas de IA para ofrecer análisis predictivos y reconocimiento de patrones.</p>

                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-3">Características principales:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Reconocimiento de voz mediante Speech Recognition API</li>
                        <li>Análisis de emociones con Azure Face API</li>
                        <li>Modelos predictivos con precisión superior al 80%</li>
                        <li>Interfaz intuitiva con procesamiento en tiempo real</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-3">Modelos implementados:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Asociación de productos en tienda</li>
                        <li>Clasificación de calidad de vino</li>
                        <li>Clasificación de imágenes de ojos por género</li>
                        <li>Predicción de precios de automóviles</li>
                        <li>Análisis de series de tiempo para criptomonedas</li>
                      </ul>

                      <h3 className="text-xl font-semibold text-yellow-300 mt-6 mb-3">Tecnologías clave:</h3>
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
                      className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 w-full"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://gitlab.com/jeremylive/ProyectoIA_Jarvis/-/blob/main/Documentacion.pdf?ref_type=heads"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-gray-900 font-semibold overflow-hidden group text-center w-[240px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(234, 179, 8, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Explorar Documentación</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 w-[240px] text-center flex items-center justify-center h-[52px]"
                        whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(14, 165, 233, 0.4)' }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <span>Solicitar Demo</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H12a3.988 3.988 0 00-1.564-.317H5.436z" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            {/* <section className="py-20 bg-gradient-to-b from-black/40 to-violet-900/20">
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
            </section> */}

            {/* Popup */}
            {showPopup && (
              <motion.div 
                className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start md:items-center justify-center z-50 pt-20 md:p-4 overflow-y-auto min-h-screen py-4" 
                onClick={() => setShowPopup(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="bg-gradient-to-br from-purple-900/95 to-violet-900/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 max-w-4xl w-full border border-purple-500/40 shadow-2xl shadow-purple-500/20 relative overflow-hidden"
                  onClick={e => e.stopPropagation()}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-600/20 rounded-full blur-3xl -ml-40 -mb-40"></div>
                  
                  {/* Header */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h3 className="text-3xl font-bold text-white">{popupTitle}</h3>
                    </div>
                    <button
                      onClick={() => setShowPopup(false)}
                      className="group p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300"
                      aria-label="Cerrar"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 overflow-y-auto max-h-[70vh] pr-2">
                    {popupBody ? (
                      <div className="text-violet-100 space-y-8">{popupBody}</div>
                    ) : (
                      <div className="text-violet-100 text-lg leading-relaxed">{popupContent}</div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="flex justify-end mt-8 relative z-10">
                    <motion.button
                      onClick={() => setShowPopup(false)}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Cerrar</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Features Carousel */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-violet-300">
                  Mis Servicios
                </h2>
                
                <div className="relative w-full mt-12 overflow-hidden">
                  <div className="relative">
                    <div 
                      ref={scrollContainerRef}
                      className="flex space-x-6 pb-8 -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      <AnimatePresence>
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

                    {/* Enhanced Progress Bar with Pause/Resume */}
                    <div className="w-full max-w-md h-1.5 bg-gray-800/50 rounded-full overflow-hidden mb-6">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500 rounded-full shadow-[0_0_8px_0px_rgba(192,132,252,0.6)]"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: isPaused ? `${progress}%` : '100%',
                          opacity: isPaused ? 1 : [0.7, 1, 0.7],
                        }}
                        transition={{ 
                          width: {
                            duration: isPaused ? 0 : 5 * (1 - progress / 100),
                            ease: 'linear',
                          },
                          opacity: {
                            duration: 2,
                            repeat: isPaused ? 0 : Infinity,
                            ease: 'easeInOut'
                          }
                        }}
                        style={{
                          backgroundSize: '200% 100%',
                          animation: isPaused ? 'none' : 'shimmer 3s infinite linear',
                        }}
                        onUpdate={(latest) => {
                          // Update progress based on current width
                          if (!isPaused) {
                            const currentProgress = parseFloat(String(latest.width)) || 0;
                            progressRef.current = currentProgress;
                            setProgress(currentProgress);
                          }
                        }}
                      />
                      <style>{`
                        @keyframes shimmer {
                          0% { background-position: 200% 0; }
                          100% { background-position: -200% 0; }
                        }
                      `}</style>
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
      
      {/* Floating Scroll Button */}
      <FloatingScrollButton />
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
