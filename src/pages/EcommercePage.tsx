import React from 'react';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiTrendingUp, FiGlobe, FiBox, FiSmartphone, FiLayers, FiBarChart2, FiShield } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import AnimatedFooter from '../components/AnimatedFooter';
import { useNavigate } from 'react-router-dom'

export default function EcommercePage() {
    const { t } = useLanguage();
    const navigate = useNavigate()
    const features = [
        {
            icon: <FiShoppingCart className="w-8 h-8 text-purple-500" />,
            title: 'Tienda Online Profesional',
            description: 'Te ayudo a crear una tienda en línea impactante con acceso a más de 70 temas premium personalizables. Te ofrezco diseño responsive y una experiencia de compra optimizada para cualquier dispositivo que elijas.'
        },
        {
            icon: <FiTrendingUp className="w-8 h-8 text-purple-500" />,
            title: 'Marketing y SEO Avanzado',
            description: 'Te ayudo a impulsar tus ventas con herramientas de marketing integradas, SEO optimizado y campañas automatizadas. Juntos podemos alcanzar a tu audiencia en todos los canales digitales relevantes para tu negocio.'
        },
        {
            icon: <FiGlobe className="w-8 h-8 text-purple-500" />,
            title: 'Ventas Internacionales',
            description: 'Te ayudo a expandir tu negocio globalmente con soporte para múltiples monedas, idiomas y métodos de pago internacionales. Me encargo de la gestión de impuestos y envíos de manera automatizada para que tú solo te preocupes por vender.'
        },
        {
            icon: <FiBox className="w-8 h-8 text-purple-500" />,
            title: 'Gestión de Inventario',
            description: 'Te ofrezco control total de tu inventario en tiempo real. Configuro la sincronización automática entre todos tus canales de venta, alertas de stock personalizadas y generación de reportes detallados para que siempre tengas el control.'
        },
        {
            icon: <FiSmartphone className="w-8 h-8 text-purple-500" />,
            title: 'App Móvil Shopify',
            description: 'Te ayudo a configurar la app móvil de Shopify para que puedas administrar tu negocio desde cualquier lugar. Podrás procesar pedidos, actualizar productos y monitorear ventas en tiempo real, todo desde la palma de tu mano.'
        },
        {
            icon: <FiLayers className="w-8 h-8 text-purple-500" />,
            title: 'Dropshipping Integrado',
            description: 'Te ayudo a iniciar tu negocio sin necesidad de inventario inicial. Configuro la integración directa con los mejores proveedores globales y automatizo el envío de pedidos para que tu negocio funcione sin complicaciones.'
        },
        {
            icon: <FiBarChart2 className="w-8 h-8 text-purple-500" />,
            title: 'Análisis Avanzado',
            description: 'Te ayudo a tomar decisiones informadas con análisis detallados de ventas, comportamiento de clientes y tendencias de mercado. Configuro reportes personalizables en tiempo real que te permitirán entender mejor tu negocio.'
        },
        {
            icon: <FiShield className="w-8 h-8 text-purple-500" />,
            title: 'Seguridad y Soporte 24/7',
            description: 'Te ofrezco certificación SSL gratuita, cumplimiento PCI y protección contra fraudes. Además, te brindo mi soporte técnico especializado para resolver cualquier duda o inconveniente que puedas tener en tu tienda online.'
        }
    ];

    return (
        <div className="min-h-screen bg-theme-gradient">
            <Header />

            {/* Hero Section */}
            <section className="pt-32 pb-12 px-4">
                <div className="container mx-auto text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Potencio tu Negocio con <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                            Shopify E-commerce
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-xl text-violet-200 mb-8 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
Transformo tu idea en una tienda online exitosa. Te ofrezco una plataforma todo-en-uno con las herramientas más avanzadas para vender en línea, gestionar productos y hacer crecer tu negocio de manera efectiva.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <a
                            onClick={() => navigate('/contact')}
                            className="inline-block px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300"
                        >
                            Comienza Gratis
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="px-4 mb-20">
                <div className="container mx-auto">
                    {/* <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                        Todo lo que Necesitas para Vender Online
                    </h2> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="p-6 rounded-2xl bg-white bg-opacity-5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <div className="mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                                <p className="text-violet-200">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
                <div className="container mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        ¿Listo para Iniciar tu Negocio Online?
                    </h2>
                    <p className="text-xl text-violet-200 mb-8 max-w-2xl mx-auto">
                        Únete a los emprendedores que ya confían en mis servicios para hacer crecer sus negocios con Shopify. Estoy aquí para ayudarte en cada paso del camino hacia el éxito de tu tienda online.
                    </p>
                    <a
                        onClick={() => navigate('/contact')}
                        className="inline-block px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-pink-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                        Contacta con un Experto
                    </a>
                </div>
            </section>

            <AnimatedFooter />
        </div>
    );
}