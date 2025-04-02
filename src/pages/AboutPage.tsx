import { motion } from 'framer-motion'
import Header from '../components/Header'
import AnimatedFooter from '../components/AnimatedFooter'
import { FiUsers, FiTarget, FiHeart, FiGlobe } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import React from 'react'

const engineeringServices = [
	{
		name: 'Desarrollo Web Profesional',
		icon: <FiGlobe className="w-8 h-8" />,
		description: 'Desarrollo de sitios web profesionales, e-commerce y aplicaciones web modernas utilizando las últimas tecnologías y mejores prácticas.',
		// metrics: '500+ proyectos exitosos',
	},
	{
		name: 'Software & Cloud',
		icon: <FiTarget className="w-8 h-8" />,
		description: 'Desarrollo de software a medida, soluciones cloud y bases de datos escalables para optimizar sus procesos empresariales.',
		// metrics: '200+ soluciones implementadas',
	},
	{
		name: 'Móvil & SaaS',
		icon: <FiUsers className="w-8 h-8" />,
		description: 'Desarrollo de aplicaciones móviles nativas y soluciones SaaS innovadoras para transformar su negocio.',
		// metrics: '300+ apps entregadas',
	},
	{
		name: 'Servicios de IA',
		icon: <FiHeart className="w-8 h-8" />,
		description: 'Implementación de soluciones avanzadas de Inteligencia Artificial y aprendizaje automático para potenciar su negocio.',
		// metrics: '150+ proyectos de IA',
	},
]

const expertise = [
	{
		icon: <FiTarget className="w-8 h-8" />,
		title: 'Arquitectura de Sistemas',
		description: 'Especializado en diseño de arquitecturas escalables, microservicios y sistemas distribuidos con enfoque en rendimiento y seguridad',
	},
	{
		icon: <FiUsers className="w-8 h-8" />,
		title: 'Desarrollo Backend',
		description: 'Experto en Node.js, TypeScript y .NET, con amplia experiencia en sistemas de pago y APIs de alto rendimiento',
	},
	{
		icon: <FiHeart className="w-8 h-8" />,
		title: 'Cloud & DevOps',
		description: 'Implementación de soluciones cloud-native, CI/CD pipelines y prácticas DevOps para entrega continua y escalabilidad',
	},
]

const achievements = [
	{
		year: '2024',
		title: 'Principal Solutions Architect - Olin CR',
		description: 'Desarrollo de plataforma logística React/TypeScript con Firebase, implementando autenticación avanzada y optimización de rutas. Mejora significativa en eficiencia operativa y experiencia de usuario.',
	},
	{
		year: '2024',
		title: 'Lead Software Architect - Lievant',
		description: 'Diseño e implementación de servicios RESTful y microservicios para el sector salud, utilizando .NET 8/C#, ASP.NET Core y JavaScript. Desarrollo de sistema de cotización con mejoras significativas en eficiencia.',
	},
	{
		year: '2023',
		title: 'Mid Backend Software Engineer - People Connection Technology',
		description: 'Integración de sistemas de pago y análisis predictivo usando Node.js, TypeScript y APIs de Google. Optimización de rendimiento y experiencia de usuario con Tailwind CSS.',
	},
	{
		year: '2022',
		title: 'Junior Data Engineer - Grupo8231',
		description: 'Optimización de flujos de trabajo y diseño de pipelines ETL avanzados usando SSIS y C#. Mejora significativa en el rendimiento de bases de datos y gestión de transacciones.',
	},
	{
		year: '2021',
		title: 'Junior Backend Software Engineer - SDC Media',
		description: 'Desarrollo de aplicaciones multimedia con soporte multilenguaje usando TypeScript, Node.js y PHP. Integración de reproducción de video y optimización de flujos de trabajo.',
	},
	{
		year: '2018',
		title: 'Junior Backend Software Engineer - Camaleonstudio',
		description: 'Desarrollo de aplicaciones web con Laravel/PHP y Java/Spring Framework. Implementación de características responsivas y gestión de bases de datos SQL Server.',
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
						<h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-violet-200">
							Senior Backend Developer & Solutions Architect
						</h1>
						<p className="text-xl text-violet-200 leading-relaxed">
							Con más de 8 años de experiencia en desarrollo de software, especializado en sistemas de pago, plataformas de datos en tiempo real y arquitecturas API-driven. Transformo ideas complejas en soluciones escalables y de alto rendimiento.
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
							<p className="text-violet-200">Desarrollo soluciones backend robustas y escalables, con especial énfasis en sistemas de pago seguros, APIs de alto rendimiento y arquitecturas cloud-native. Mi objetivo es crear infraestructuras tecnológicas que impulsen el crecimiento empresarial.</p>
						</div>
						<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8">
							<h2 className="text-2xl font-semibold text-white mb-4">
								Mi Experiencia
							</h2>
							<p className="text-violet-200">Experto en Node.js, TypeScript, y .NET, con amplia experiencia en implementación de sistemas de pago, microservicios y bases de datos distribuidas. Especializado en optimización de rendimiento y diseño de arquitecturas escalables en la nube.</p>
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
							Servicios de Ingeniería de Software
						</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
							{engineeringServices.map((service, index) => (
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
									{/* <p className="text-purple-400 font-medium">{service.metrics}</p> */}
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
											{achievement.title}
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