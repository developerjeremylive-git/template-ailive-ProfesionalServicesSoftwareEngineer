import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { FiCheck, FiMail } from 'react-icons/fi'
import AuthButton from './AuthButton'
import newsletterService from '../api/newsletter-service'

export default function AnimatedFooter() {
  const { t } = useLanguage()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState('')
  
  // Determine if we're on a dashboard page
  const isDashboard = ['/starter-dashboard', '/pro-dashboard', '/enterprise-dashboard'].includes(location.pathname)

  return (
    <>
      <footer className={`${isDashboard ? 'bg-[var(--theme-background-secondary)] border-t border-[var(--theme-border)]' : 'bg-black bg-opacity-30 backdrop-blur-sm'}`}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                {/* <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 p-[2px]">
                  <div className="w-full h-full rounded-full bg-[var(--theme-background)] flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-6 h-6"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        className="fill-purple-400"
                      />
                      <path
                        d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
                        className="fill-pink-600"
                      />
                    </svg>
                  </div>
                </div> */}
                <span className="text-2xl font-bold text-[var(--theme-text-primary)]">Jeremy Live</span>
              </Link>
              <p className="text-[var(--theme-text-secondary)]">Ingeniero Senior de ML/IA y Software con 8+ años de experiencia, especializado en arquitecturas escalables en la nube. Diseño e implemento plataformas Multi-Agent as a Service (MAaaS) que orquestan modelos de lenguaje avanzados, incluyendo Gemini y GPT. Mi experiencia abarca desde el desarrollo de APIs robustas hasta la implementación de arquitecturas multi-agente con LangChain y Cloudflare. Ofrezco soluciones de IA generativa, sistemas de procesamiento de lenguaje natural y visión por computadora, todo respaldado por una infraestructura en la nube optimizada para alto rendimiento y escalabilidad.</p>
              <div className="pt-2">
                <AuthButton variant="footer" />
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-4">
                Servicios
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/web-development"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Desarrollo Web
                  </Link>
                </li>
                <li>
                  <Link
                    to="/custom-software"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Software a Medida
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cloud-development"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Cloud Development
                  </Link>
                </li>
                <li>
                  <Link
                    to="/database-development"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Base de Datos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mobile-app-development"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Apps Móviles
                  </Link>
                </li>
                <li>
                  <Link
                    to="/saas-development"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    SaaS
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/technical-support"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Soporte Técnico
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/ai-services"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Servicios IA
                  </Link>
                </li>
                <li>
                  <Link
                    to="/automation-solutions"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    Automatización
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-4">
                {t('footer_subscribe')}
              </h3>
              <p className="text-[var(--theme-text-secondary)]">{t('subscribe_desc')}</p>
              <div className="relative">
                <div className="flex flex-col space-y-3">
                  <div className="relative w-full">
                    <FiMail className="absolute left-3 top-3 text-purple-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('enter_email') as string}
                      className="text-white w-full pl-10 pr-4 py-2 bg-purple-500/5 border border-purple-500/20 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    />
                  </div>
                  <motion.button
                    onClick={async () => {
                      if (!email) return;
                      setIsLoading(true);
                      setError('');
                      
                      try {
                        const { error } = await newsletterService.subscribe(email);
                        if (error) {
                          setError(typeof error === 'string' ? error : 'Error al suscribirse al newsletter');
                        } else {
                          setShowSuccess(true);
                          setEmail('');
                          setTimeout(() => setShowSuccess(false), 3000);
                        }
                      } catch (err) {
                        setError('Subscription failed');
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    disabled={isLoading}
                    className={`w-full px-6 py-2 rounded-xl font-medium text-white shadow-lg shadow-purple-500/30
                      ${isLoading ? 'bg-purple-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 transform hover:scale-[1.02] transition-all duration-300'}
                    `}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('processing')}
                      </span>
                    ) : t('subscribe_button')}
                  </motion.button>
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400">{error}</p>
                )}
              </div>
              
              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-md font-medium text-[var(--theme-text-primary)] mb-3">¡Conéctate Conmigo!</h4>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://linkedin.com/in/jeremy-live/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-purple-500 hover:text-white transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://wa.me/5213312345678" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-green-500 hover:text-white transition-all duration-300"
                    aria-label="WhatsApp"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.795-1.484-1.77-1.66-2.07-.173-.298-.018-.46.13-.606.136-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.492.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.55 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.471h.006c6.553 0 11.886-5.336 11.893-11.896a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://youtube.com/@developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-red-500 hover:text-white transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://twitch.tv/developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-purple-500 hover:text-white transition-all duration-300"
                    aria-label="Twitch"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://tiktok.com/@developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-black hover:text-white transition-all duration-300"
                    aria-label="TikTok"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-.99.06-1.99.07-2.99.01-2.6-.01-5.19.01-7.78.01-.31.04-.62.08-.93.08-.7.32-1.39.6-2.03Z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://kick.com/developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-green-500 hover:text-white transition-all duration-300"
                    aria-label="Kick"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.5 3.5h17v17h-17zm12.7 10.2c0-3.5-4.5-2.4-6.2-5.3-1.1-1.9-1.1-4.1 0-2.2 1.3-1.6 1.1-3.2 1.1-3.2.7 3.9 5.1 5.3 5.1 10.7z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://facebook.com/developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-blue-600 hover:text-white transition-all duration-300"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.797v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://instagram.com/developerjeremylive" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://reddit.com/user/developerjeremylive/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-[var(--theme-background-secondary)] flex items-center justify-center text-[var(--theme-text-primary)] hover:bg-orange-500 hover:text-white transition-all duration-300"
                    aria-label="Reddit"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.5-1.58-5.58-1.64l.86-4.04 2.34.54c.12.03.24-.07.3-.2.05-.13.01-.28-.1-.36l-3.2-2.4c-.1-.08-.24-.09-.36-.04-.12.04-.2.16-.2.28l-.5 2.4c-2.2.1-4.2.7-5.9 1.7-.6-.8-1.58-1.3-2.6-1.3-1.66 0-3 1.34-3 3 0 .9.4 1.7 1 2.2v.3c-.04.2-.06.4-.06.6 0 2.5 2.9 4.5 6.5 4.5s6.5-2 6.5-4.5c0-.2-.02-.4-.04-.6.7-.5 1.1-1.3 1.1-2.2zm-10.5 2.3c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5zm7 0c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5.7-1.5 1.5-1.5 1.5.7 1.5 1.5z"/>
                    </svg>
                  </a>
                </div>
                
                {/* Developer Profiles */}
                <div className="mt-6">
                  <h4 className="text-md font-medium text-[var(--theme-text-primary)] mb-3">Perfiles de Código Abierto</h4>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://huggingface.co/developerjeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-yellow-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="Hugging Face"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M0 1.5A1.5 1.5 0 0 1 1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21zm7.2 16.4h2.4v-6.8H7.2v6.8zm-1.2-7.7c0-.7.6-1.3 1.3-1.3s1.3.6 1.3 1.3c0 .7-.6 1.3-1.3 1.3s-1.3-.6-1.3-1.3zm10.8 7.7h2.4v-3.9c0-1.5-.5-2.5-1.9-2.5-1 0-1.6.7-1.9 1.4-.1.3-.1.7-.1 1v4h2.4v-4.3c0-.2 0-.5.1-.7.2-.5.6-1 1.3-1 .7 0 1.1.5 1.1 1.3v3.7h2.4v-4.2c0-1.9-1.1-2.9-2.7-2.9-1.2 0-1.8.7-2.1 1.2h-.1v-1h-2.3c0 .6 0 6.8.1 6.8z"/>
                      </svg>
                      Hugging Face
                    </a>
                    <a 
                      href="https://github.com/developerjeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-gray-800 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="GitHub"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                      </svg>
                      GitHub
                    </a>
                    <a 
                      href="https://kaggle.com/developerjeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="Kaggle"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.03 2.6c-1.1 0-2.1.5-2.8 1.2-.7.7-1.2 1.7-1.2 2.8v11.4c0 1.1.5 2.1 1.2 2.8.7.7 1.7 1.2 2.8 1.2h9.4c1.1 0 2.1-.5 2.8-1.2.7-.7 1.2-1.7 1.2-2.8V6.6c0-1.1-.5-2.1-1.2-2.8-.7-.7-1.7-1.2-2.8-1.2H7.03zm0 1.5h9.4c.8 0 1.5.4 2 1 .5.5 1 1.2 1 2v11.4c0 .8-.4 1.5-1 2-.5.5-1.2 1-2 1H7.03c-.8 0-1.5-.4-2-1-.5-.5-1-1.2-1-2V7.1c0-.8.4-1.5 1-2 .5-.6 1.2-1 2-1zm-1.2 6.5v5.5h1.5v-2.5h1.1l1.2 1.8 1.2-1.8h1.1v1.8h1.5v-1.8h1.1l1.2 1.8 1.2-1.8h1.1v2.5h1.5v-5.5h-2.3l-1.2 1.8-1.2-1.8h-2.3l-1.2 1.8-1.2-1.8H5.83zm2.8 1.5h1.5v1.5H8.63v-1.5zm4.2 0h1.5v1.5h-1.5v-1.5z"/>
                      </svg>
                      Kaggle
                    </a>
                    <a 
                      href="https://gitlab.com/jeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-orange-500 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="GitLab"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51a.42.42 0 0 1 .11-.18.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.27l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"/>
                      </svg>
                      GitLab
                    </a>
                  </div>
                </div>

                {/* Portfolio & More */}
                <div className="mt-4">
                  <h4 className="text-md font-medium text-[var(--theme-text-primary)] mb-3">Portafolio y Más</h4>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="https://behance.net/jeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-blue-700 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="Behance"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 7h-7v-2h7v2zm1.77 9.76c-.25.49-1.1 1.24-2.91 1.24-1.77 0-3.16-.9-3.16-2.58 0-1.51 1.15-2.6 3.19-2.6 1.12 0 1.92.38 2.45 1.03l1.06-1.03c-.8-.9-1.91-1.44-3.51-1.44-2.62 0-4.69 1.53-4.69 4.1 0 2.4 1.9 4.1 4.9 4.1 2.77 0 4.86-1.49 4.86-4.05 0-.3-.03-.56-.1-.8h-2.1zM14 7H7v2h7V7zm0 4H7v2h7v-2z"/>
                      </svg>
                      Behance
                    </a>
                    <a 
                      href="https://beacons.ai/jeremylive" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-full bg-[var(--theme-background-secondary)] text-sm text-[var(--theme-text-primary)] hover:bg-purple-600 hover:text-white transition-all duration-300 flex items-center gap-2"
                      aria-label="Beacons"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                      </svg>
                      Beacons
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--theme-text-primary)] mb-4">
                {t('form_company')}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    {t('about')}
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="/pricing"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    {t('pricing')}
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/contact"
                    className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                  >
                    {t('contact')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="mt-12 pt-8 border-t border-[var(--theme-border)]">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-[var(--theme-text-secondary)]">
                &copy; 2024 Jeremy Live. {t('all_rights_reserved')}
              </div>
              <div className="flex gap-6">
                <Link
                  to="/privacy"
                  className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  {t('privacy')}
                </Link>
                <Link
                  to="/terms"
                  className="text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] transition-colors"
                >
                  {t('terms')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Success Popup */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="bg-green-500 p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: [0, 1.2, 1],
                  rotate: [0, 360],
                  transition: {
                    duration: 0.8,
                    ease: "easeOut",
                    times: [0, 0.6, 1]
                  }
                }}
                className="p-4 bg-white bg-opacity-20 rounded-full"
              >
                <FiCheck className="w-16 h-16 text-white" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}