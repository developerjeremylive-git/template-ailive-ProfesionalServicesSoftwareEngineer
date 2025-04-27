import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { useApp } from './context/AppContext'
import { useLanguage } from './context/LanguageContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ApiProvider } from './context/ApiContext'
import Header from './components/Header'
import AnimatedFooter from './components/AnimatedFooter'
import TestimonialsSection from './components/TestimonialsSection'
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
import React from 'react'
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
  const { isGraphEnabled } = useApp()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isExploreModelsOpen, setIsExploreModelsOpen] = useState(false)
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false)
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false)

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
                    Transformamos tus ideas en soluciones tecnológicas innovadoras: Desarrollo web, software a medida, cloud computing y servicios de IA para impulsar tu negocio al siguiente nivel
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

            {/* Creator Profile Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-20 bg-black/20 relative overflow-hidden"
            >
              {/* Olas animadas */}
              <div className="absolute inset-0 z-0">
                <motion.svg
                  viewBox="0 0 1440 320"
                  className="absolute bottom-0 w-full"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    fill="rgba(139, 92, 246, 0.1)"
                    animate={{
                      d: [
                        "M0,192L48,192C96,192,192,192,288,192C384,192,480,192,576,192C672,192,768,192,864,192C960,192,1056,192,1152,192C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,160L48,170C96,180,192,200,288,210C384,220,480,220,576,210C672,200,768,180,864,170C960,160,1056,160,1152,170C1248,180,1344,200,1392,210L1440,220L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,192L48,192C96,192,192,192,288,192C384,192,480,192,576,192C672,192,768,192,864,192C960,192,1056,192,1152,192C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 15, ease: [0.43, 0.13, 0.23, 0.96] }}
                  />
                  <motion.path
                    d="M0,256L48,261.3C96,267,192,277,288,261.3C384,245,480,203,576,197.3C672,192,768,224,864,213.3C960,203,1056,149,1152,133.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    fill="rgba(236, 72, 153, 0.1)"
                    animate={{
                      d: [
                        "M0,256L48,256C96,256,192,256,288,256C384,256,480,256,576,256C672,256,768,256,864,256C960,256,1056,256,1152,256C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,220L48,230C96,240,192,260,288,270C384,280,480,280,576,270C672,260,768,240,864,230C960,220,1056,220,1152,230C1248,240,1344,260,1392,270L1440,280L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,256L48,256C96,256,192,256,288,256C384,256,480,256,576,256C672,256,768,256,864,256C960,256,1056,256,1152,256C1248,256,1344,256,1392,256L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 12, ease: [0.43, 0.13, 0.23, 0.96] }}
                  />
                  <motion.path
                    d="M0,288L48,282.7C96,277,192,267,288,245.3C384,224,480,192,576,181.3C672,171,768,181,864,192C960,203,1056,213,1152,208C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    fill="rgba(168, 85, 247, 0.1)"
                    animate={{
                      d: [
                        "M0,288L48,288C96,288,192,288,288,288C384,288,480,288,576,288C672,288,768,288,864,288C960,288,1056,288,1152,288C1248,288,1344,288,1392,288L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,250L48,260C96,270,192,290,288,300C384,310,480,310,576,300C672,290,768,270,864,260C960,250,1056,250,1152,260C1248,270,1344,290,1392,300L1440,310L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,288L48,288C96,288,192,288,288,288C384,288,480,288,576,288C672,288,768,288,864,288C960,288,1056,288,1152,288C1248,288,1344,288,1392,288L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 18, ease: [0.43, 0.13, 0.23, 0.96] }}
                  />
                  <motion.path
                    d="M0,224L48,229.3C96,235,192,245,288,240C384,235,480,213,576,202.7C672,192,768,192,864,197.3C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    fill="rgba(216, 180, 254, 0.1)"
                    animate={{
                      d: [
                        "M0,224L48,224C96,224,192,224,288,224C384,224,480,224,576,224C672,224,768,224,864,224C960,224,1056,224,1152,224C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,180L48,190C96,200,192,220,288,230C384,240,480,240,576,230C672,220,768,200,864,190C960,180,1056,180,1152,190C1248,200,1344,220,1392,230L1440,240L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
                        "M0,224L48,224C96,224,192,224,288,224C384,224,480,224,576,224C672,224,768,224,864,224C960,224,1056,224,1152,224C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                  />
                </motion.svg>
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
                    <div className="relative w-64 mx-auto">
                      <ProfileImage size="lg" />
                      <motion.div
                        className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 group-hover:from-pink-400 group-hover:to-purple-400 transition-all duration-300">
                          Jeremy Live
                        </h2>
                      </motion.div>
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
                      Desarrollador Innovador & Visionario Digital
                    </motion.h2>
                    <motion.p
                      className="text-lg text-violet-200 mb-8 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Soy un apasionado desarrollador full-stack especializado en crear experiencias digitales extraordinarias. Mi enfoque combina creatividad técnica con innovación práctica, utilizando tecnologías de vanguardia como React, TypeScript y arquitecturas cloud modernas. Me destaco por transformar ideas complejas en soluciones elegantes y accesibles, siempre buscando elevar la interacción entre usuarios y tecnología a nuevos niveles de excelencia.
                    </motion.p>
                    <motion.div
                      className="flex gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://jeremylive.netlify.app/contact"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Contáctame</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.a>
                      <motion.a
                        href="https://jeremylive.netlify.app/tienda"
                        className="relative px-6 py-3 rounded-full bg-white bg-opacity-10 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Ver Portfolio</span>
                        <div className="absolute inset-0 bg-white bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
                <div className="absolute inset-0 opacity-30">
                  {[...Array(50)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-purple-500 rounded-full"
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
                      className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      EcommetAIntegration: Plataforma de IA para E-commerce
                    </motion.h2>
                    <motion.p
                      className="text-lg text-violet-200 mb-8 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Revoluciona tu negocio online con nuestra plataforma de IA especializada en e-commerce. Desde análisis predictivo hasta atención al cliente automatizada, EcommetAIntegration proporciona las herramientas necesarias para impulsar tus ventas y mejorar la experiencia de tus clientes.
                    </motion.p>
                    <motion.div
                      className="flex gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://www.ecommetaintegration.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Explorar Plataforma</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                            className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center"
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
                          <div className="flex items-center gap-3 text-violet-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Análisis predictivo avanzado</span>
                          </div>
                          <div className="flex items-center gap-3 text-violet-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Chatbots inteligentes 24/7</span>
                          </div>
                          <div className="flex items-center gap-3 text-violet-200">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Integración personalizada</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* AI Agents Platform Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="py-20 bg-black/20 relative overflow-hidden"
            >
              {/* Fondo de neuronas */}
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
                          <div className="flex items-center gap-3 text-violet-200">
                            <motion.div
                              className="w-5 h-5 flex items-center justify-center"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </motion.div>
                            <span>Procesamiento de Lenguaje Natural Avanzado</span>
                          </div>
                          <div className="flex items-center gap-3 text-violet-200">
                            <motion.div
                              className="w-5 h-5 flex items-center justify-center"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                              </svg>
                            </motion.div>
                            <span>Aprendizaje Continuo y Adaptativo</span>
                          </div>
                          <div className="flex items-center gap-3 text-violet-200">
                            <motion.div
                              className="w-5 h-5 flex items-center justify-center"
                              whileHover={{ scale: 1.2, rotate: 180 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                              </svg>
                            </motion.div>
                            <span>Toma de Decisiones Autónoma</span>
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
                      Agentes de IA: El Futuro de la Automatización Inteligente
                    </motion.h2>
                    <motion.p
                      className="text-lg text-violet-200 mb-8 leading-relaxed"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      Descubre el poder de nuestros agentes de IA, diseñados para revolucionar la forma en que interactúas con la tecnología. Desde la comprensión avanzada del lenguaje natural hasta la toma de decisiones autónoma, nuestros agentes aprenden y evolucionan continuamente para proporcionar soluciones cada vez más inteligentes y eficientes.
                    </motion.p>
                    <motion.div
                      className="flex gap-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 1, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href="https://www.etheroi.com"
                        className="relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Explorar Capacidades</span>
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: 0 }}
                          transition={{ type: "spring", stiffness: 100 }}
                        />
                      </motion.a>
                      <motion.a
                        href="/contact"
                        className="relative px-6 py-3 rounded-full bg-white bg-opacity-10 text-white font-semibold overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="relative z-10">Programar Demostración</span>
                        <motion.div
                          className="absolute inset-0 bg-white bg-opacity-20"
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

            {/* Dashboard Preview Section - Hidden on mobile */}
            <section className="hidden md:block py-20 bg-black/20">
              <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Servicios Profesionales de Software Engineering
                  </h2>
                  <p className="text-violet-200 text-lg max-w-2xl mx-auto">
                    Desde desarrollo web hasta inteligencia artificial, ofrecemos soluciones tecnológicas completas para transformar tu visión en realidad.
                  </p>
                </div>
                <div className="max-w-5xl mx-auto">
                  <div className="bg-gradient-to-br from-purple-900/50 to-violet-800/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-700/30">
                    <DashboardPreview type="web" />
                  </div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            <section className="py-20">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Desarrollo Web */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/web-development')}>
                    <div className="text-4xl mb-6">💻</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Desarrollo Web Profesional
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Creamos experiencias web excepcionales que impulsan el crecimiento de tu negocio:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Aplicaciones web empresariales de alto rendimiento</li>
                      <li>Optimización avanzada de velocidad y SEO</li>
                      <li>Diseño UX/UI centrado en conversión</li>
                      <li>Integración con sistemas empresariales</li>
                      <li>Arquitectura escalable y segura</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Stack Tecnológico:</strong> React, Next.js, Vue.js, Node.js, GraphQL
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Caso de Éxito:</strong> +300% en conversiones para e-commerce B2B
                    </div>
                  </div>

                  {/* Software a Medida */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/custom-software')}>
                    <div className="text-4xl mb-6">🔧</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Software Empresarial a Medida
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Soluciones personalizadas que transforman desafíos en ventajas competitivas:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Automatización de procesos críticos</li>
                      <li>Sistemas ERP y CRM personalizados</li>
                      <li>Integración con APIs y servicios externos</li>
                      <li>Migración y modernización de sistemas</li>
                      <li>Análisis de datos y Business Intelligence</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Tecnologías:</strong> Java, Python, .NET, Node.js, Microservicios
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Impacto:</strong> 60% reducción en costos operativos
                    </div>
                  </div>

                  {/* Servicios Cloud */}
                  <div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transform transition-all hover:scale-105" onClick={() => navigate('/cloud-development')}>
                    <div className="text-4xl mb-6">☁️</div>
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      Desarrollo Cloud & DevOps
                    </h3>
                    <p className="text-violet-200 mb-4">
                      Infraestructura cloud moderna y escalable para tu negocio:
                    </p>
                    <ul className="text-violet-200 mb-6 list-disc list-inside space-y-2">
                      <li>Arquitectura cloud-native</li>
                      <li>Implementación de CI/CD</li>
                      <li>Containerización y orquestación</li>
                      <li>Monitoreo y optimización</li>
                      <li>Seguridad cloud avanzada</li>
                    </ul>
                    <div className="text-sm text-violet-300 p-4 bg-purple-900/30 rounded-lg mb-4">
                      <strong>Plataformas:</strong> AWS, Azure, GCP, Kubernetes
                    </div>
                    <div className="text-sm text-green-300 p-4 bg-green-900/30 rounded-lg">
                      <strong>Resultado:</strong> 99.99% uptime y 40% reducción en costos
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

            {/* Testimonials Section */}
            <TestimonialsSection />

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