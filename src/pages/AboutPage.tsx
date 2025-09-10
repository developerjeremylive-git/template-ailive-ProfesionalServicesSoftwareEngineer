import { motion } from 'framer-motion'
import Header from '../components/Header'
import AnimatedFooter from '../components/AnimatedFooter'
import { FiUsers, FiTarget, FiHeart, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import React from 'react'

const aiServices = [
	{
		name: 'Plataformas MAaaS',
		icon: <FiGlobe className="w-8 h-8" />,
		description: 'Diseño e implementación de plataformas Multi-Agent as a Service (MAaaS) que orquestan modelos de lenguaje avanzados como Gemini y GPT para automatizar flujos de trabajo complejos.',
		link: '/ai-services'
	},
	{
		name: 'IA Generativa',
		icon: <FiTarget className="w-8 h-8" />,
		description: 'Soluciones personalizadas de IA generativa para contenido, código y automatización de procesos, impulsadas por los últimos avances en modelos de lenguaje.',
		link: '/ai-services'
	},
	{
		name: 'Procesamiento de Lenguaje',
		icon: <FiUsers className="w-8 h-8" />,
		description: 'Sistemas avanzados de NLP para análisis de sentimientos, resumen de texto, traducción y generación de contenido multilingüe.',
		link: '/ai-services'
	},
	{
		name: 'Automatización con IA',
		icon: <FiHeart className="w-8 h-8" />,
		description: 'Automatización de procesos empresariales mediante agentes de IA que aprenden y se adaptan a las necesidades específicas de su negocio.',
		link: '/automation-solutions'
	},
]

const expertise = [
	{
		icon: <FiTarget className="w-8 h-8" />,
		title: 'Arquitecturas Multi-Agente',
		description: 'Diseño e implementación de sistemas multi-agente escalables que combinan múltiples modelos de IA para resolver problemas complejos',
	},
	{
		icon: <FiUsers className="w-8 h-8" />,
		title: 'Orquestación de LLMs',
		description: 'Experto en la integración y orquestación de modelos de lenguaje avanzados como GPT-4, Gemini y modelos de código abierto',
	},
	{
		icon: <FiHeart className="w-8 h-8" />,
		title: 'Cloud AI & MLOps',
		description: 'Implementación de pipelines de ML en la nube, despliegue de modelos y monitoreo de rendimiento con herramientas de MLOps',
	},
]

const achievements = [
	{
		year: '2024',
		title: 'Principal Solutions Architect - Olin CR',
		description: 'Desarrollo de plataforma logística React/TypeScript con Firebase, implementando autenticación avanzada y optimización de rutas. Mejora significativa en eficiencia operativa y experiencia de usuario.',
		link: '/achievements'
	},
	{
		year: '2024',
		title: 'Lead Software Architect - Lievant',
		description: 'Diseño e implementación de servicios RESTful y microservicios para el sector salud, utilizando .NET 8/C#, ASP.NET Core y JavaScript. Desarrollo de sistema de cotización con mejoras significativas en eficiencia.',
		link: '/achievements'
	},
	{
		year: '2023',
		title: 'Mid Backend Software Engineer - People Connection Technology',
		description: 'Integración de sistemas de pago y análisis predictivo usando Node.js, TypeScript y APIs de Google. Optimización de rendimiento y experiencia de usuario con Tailwind CSS.',
		link: '/achievements'
	},
	{
		year: '2022',
		title: 'Junior Data Engineer - Grupo8231',
		description: 'Optimización de flujos de trabajo y diseño de pipelines ETL avanzados usando SSIS y C#. Mejora significativa en el rendimiento de bases de datos y gestión de transacciones.',
		link: '/achievements'
	},
	{
		year: '2021',
		title: 'Junior Backend Software Engineer - SDC Media',
		description: 'Desarrollo de aplicaciones multimedia con soporte multilenguaje usando TypeScript, Node.js y PHP. Integración de reproducción de video y optimización de flujos de trabajo.',
		link: '/achievements'
	},
	{
		year: '2018',
		title: 'Junior Backend Software Engineer - Camaleonstudio',
		description: 'Desarrollo de aplicaciones web con Laravel/PHP y Java/Spring Framework. Implementación de características responsivas y gestión de bases de datos SQL Server.',
		link: '/achievements'
	},
]

export default function AboutPage() {
	const { t } = useLanguage()

	return (
		<div className="min-h-screen bg-theme-gradient">
			<Header variant="default" />
			<div className="pt-24 pb-32">
				<div className="container mx-auto px-4">
					{/* Hero Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center max-w-4xl mx-auto mb-24"
					>
						<h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-violet-200 leading-tight pb-4">
							ML/IA & Software Engineer
						</h1>
						<p className="text-xl text-violet-200 leading-relaxed">
							Con más de 8 años de experiencia en IA/ML e ingeniería de software, especializado en arquitecturas escalables en la nube. Diseño e implemento plataformas Multi-Agent as a Service (MAaaS) que orquestan modelos de lenguaje avanzados, incluyendo Gemini y GPT.
						</p>
					</motion.div>

					{/* Vision & Mission Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-8"
					>
						<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8">
							<h2 className="text-2xl font-semibold text-white mb-4">
								Mi Enfoque
							</h2>
							<p className="text-violet-200">Diseño e implemento soluciones de IA generativa, sistemas de procesamiento de lenguaje natural y visión por computadora, todo respaldado por una infraestructura en la nube optimizada para alto rendimiento y escalabilidad.</p>
						</div>
						<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8">
							<h2 className="text-2xl font-semibold text-white mb-4">
								Mi Experiencia
							</h2>
							<p className="text-violet-200">Experto en orquestación de modelos de lenguaje, arquitecturas multi-agente y despliegue de soluciones de IA en la nube. Especializado en la creación de sistemas que combinan múltiples modelos de IA para resolver problemas complejos de manera eficiente.</p>
						</div>
					</motion.div>

					{/* Expertise Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
						className="mb-24"
					>
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							Áreas de Experticia
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
							{expertise.map((exp, index) => (
								<motion.div
									key={exp.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + index * 0.1 }}
									className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 text-center"
								>
									<div className="text-purple-400 mb-4 flex justify-center">
										{exp.icon}
									</div>
									<h3 className="text-xl font-semibold text-white mb-4">
										{exp.title}
									</h3>
									<p className="text-violet-200">{exp.description}</p>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Services Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 }}
						className="mb-24"
					>
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							Soluciones de IA y Automatización
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{aiServices.map((service, index) => (
								<motion.div
									key={service.name}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 + index * 0.1 }}
									className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-6"
								>
									<div className="text-purple-400 mb-6 flex justify-center">
										{service.icon}
									</div>
									<h3 className="text-xl font-semibold text-white mb-4">
										{service.name}
									</h3>
									<p className="text-violet-200 mb-4">{service.description}</p>
									<a
										href={service.link}
										target="_blank"
										rel="noopener noreferrer"
										className="text-purple-400 hover:text-purple-300 transition-colors"
									>
										→ Ver más
									</a>
								</motion.div>
							))}
						</div>
					</motion.div>

					{/* Achievements Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.6 }}
					>
						<h2 className="text-3xl font-bold text-white text-center mb-12">
							Experiencias Profesionales
						</h2>
						<div className="max-w-4xl mx-auto">
							{achievements.map((achievement, index) => (
								<motion.div
									key={achievement.year}
									initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.6 + index * 0.1 }}
									className="relative pl-8 pb-12 border-l-2 border-purple-500 last:pb-0"
								>
									<div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full -translate-x-[9px]" />
									<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6">
										<div className="text-purple-400 text-lg font-semibold mb-2">
											{achievement.year}
										</div>
										<h3 className="text-xl font-semibold text-white mb-2">
											<a
												href={achievement.link}
												target="_blank"
												rel="noopener noreferrer"
												className="text-purple-400 hover:text-purple-300 transition-colors"
											>
												{achievement.title}
											</a>
										</h3>
										<p className="text-violet-200">{achievement.description}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
			<AnimatedFooter />
		</div>
	)
}