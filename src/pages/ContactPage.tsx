import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import AnimatedFooter from '../components/AnimatedFooter'
import ProfileImage from '../components/ProfileImage'

export default function ContactPage() {
	const { t } = useLanguage()
	const { insertContactSubmission } = useAuth()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
	const [errorMessage, setErrorMessage] = useState('')
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		company: '',
		phone: '',
		modelInterest: '',
		budget: '',
		timeframe: '',
		message: '',
		serviceInterest: [] as string[],
	})

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)
		setSubmitStatus('idle')
		setErrorMessage('')

		try {
			const { error } = await insertContactSubmission({
				name: formData.name,
				email: formData.email,
				company: formData.company,
				phone: formData.phone,
				service_interest: formData.serviceInterest,
				message: formData.message,
				budget: formData.budget,
				timeframe: formData.timeframe,
			})

			if (error) {
				throw error
			}

			setSubmitStatus('success')
			// Reset form
			setFormData({
				name: '',
				email: '',
				company: '',
				phone: '',
				modelInterest: '',
				budget: '',
				timeframe: '',
				message: '',
				serviceInterest: []
			})
		} catch (error) {
			setSubmitStatus('error')
			setErrorMessage('Hubo un error al enviar el formulario. Por favor intenta nuevamente.')
			console.error('Error submitting contact form:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, checked } = e.target
		setFormData((prev) => ({
			...prev,
			serviceInterest: checked
				? [...prev.serviceInterest, value]
				: prev.serviceInterest.filter((service) => service !== value),
		}))
	}

	return (
		<div className="min-h-screen bg-theme-gradient">
			<Header variant="default" />
			<div className="pt-24">
				<div className="container mx-auto px-4">
					{/* Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center max-w-3xl mx-auto mb-16"
					>
						<h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
							{t('contact_title')}
						</h1>
						<p className="text-lg text-violet-200">
							{t('contact_subtitle')}
						</p>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="max-w-2xl mx-auto"
					>
						<form
							onSubmit={handleSubmit}
							className="bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl p-8 transition-all duration-300 hover:bg-opacity-10"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div>
									<label
										htmlFor="name"
										className="block text-violet-200 mb-2"
									>
										{t('contact_name')}
									</label>
									<input
										type="text"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-700 text-white placeholder-violet-300 focus:outline-none focus:border-purple-500"
										placeholder={t('contact_placeholder_name')}
										required
									/>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-violet-200 mb-2"
									>
										{t('contact_email')}
									</label>
									<input
										type="email"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-700 text-white placeholder-violet-300 focus:outline-none focus:border-purple-500"
										placeholder={t('contact_placeholder_email')}
										required
									/>
								</div>
								<div>
									<label
										htmlFor="company"
										className="block text-violet-200 mb-2"
									>
										{t('contact_company')}
									</label>
									<input
										type="text"
										id="company"
										name="company"
										value={formData.company}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-700 text-white placeholder-violet-300 focus:outline-none focus:border-purple-500"
										placeholder={t('contact_placeholder_company')}
										required
									/>
								</div>
								<div>
									<label
										htmlFor="phone"
										className="block text-violet-200 mb-2"
									>
										{t('contact_phone')}
									</label>
									<input
										type="tel"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-10 border border-purple-700 text-white placeholder-violet-300 focus:outline-none focus:border-purple-500"
										placeholder={t('contact_placeholder_phone')}
									/>
								</div>
							</div>

							<div className="mb-16">
								<div className="text-center mb-12">
									<h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-300 to-violet-200 bg-clip-text text-transparent mb-3">
										Mis Servicios Profesionales
									</h2>
									<p className="text-violet-300 max-w-2xl mx-auto text-lg">
										Selecciona los servicios que te interesan para recibir una cotización personalizada
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
									{/* Desarrollo Web */}
									<motion.div
										className="relative px-0 py-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
										whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.1)' }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="absolute top-4 right-4">
											<div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
												<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
												</svg>
											</div>
										</div>

										<div className="mb-6 px-2 min-h-[120px] flex flex-col justify-center">
											<h3 className="text-xl font-semibold text-white mb-2">Desarrollo Web</h3>
											<p className="text-violet-300 text-sm h-10 flex items-center justify-center text-center">Soluciones web a medida para tu negocio</p>
										</div>

										<div className="grid grid-cols-1 gap-3 w-full">
											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="web-development"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Desarrollo Web Profesional</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Sitios web personalizados, optimizados y adaptables a todos los dispositivos</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="ecommerce"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Comercio Electrónico</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Tiendas online seguras con múltiples opciones de pago y gestión de inventario.Integracion de Agente IA Shopify MCP</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="wordpress"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">WordPress</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Sistemas de gestión de contenidos flexibles y fáciles de usar</p>
												</div>
											</label>
										</div>
									</motion.div>

									{/* Software y Nube */}
									<motion.div
										className="relative px-0 py-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
										whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.1)' }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="absolute top-4 right-4">
											<div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
												<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
												</svg>
											</div>
										</div>

										<div className="mb-6 px-2 min-h-[120px] flex flex-col justify-center">
											<h3 className="text-xl font-semibold text-white mb-2">Software y Nube</h3>
											<p className="text-violet-300 text-sm h-10 flex items-center justify-center text-center">Soluciones en la nube y aplicaciones empresariales</p>
										</div>

										<div className="grid grid-cols-1 gap-3 w-full">
											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="custom-software"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Software a Medida</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Soluciones de software personalizadas diseñadas específicamente para las necesidades únicas de tu negocio</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="cloud-solutions"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Soluciones en la Nube</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Soluciones de infraestructura en la nube escalables y seguras para tu negocio</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="api-integration"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Integración de APIs</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Integración perfecta entre diferentes plataformas y sistemas empresariales</p>
												</div>
											</label>
										</div>
									</motion.div>

									{/* Servicios Avanzados */}
									<motion.div
										className="relative px-0 py-8 rounded-2xl bg-gradient-to-br from-purple-900/30 to-violet-900/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group overflow-hidden"
										whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.1)' }}
										whileTap={{ scale: 0.98 }}
									>
										<div className="absolute top-4 right-4">
											<div className="p-2 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
												<svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
													<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
												</svg>
											</div>
										</div>

										<div className="mb-6 px-2 min-h-[120px] flex flex-col justify-center">
											<h3 className="text-xl font-semibold text-white mb-2">Servicios Avanzados</h3>
											<p className="text-violet-300 text-sm h-10 flex items-center justify-center text-center">Soluciones tecnológicas de vanguardia</p>
										</div>

										<div className="grid grid-cols-1 gap-3 w-full">
											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="mobile-development"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Desarrollo Móvil</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Desarrollo de aplicaciones móviles nativas para iOS y Android, con interfaces intuitivas. Incluye integración de IA.</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="saas-development"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Desarrollo SaaS</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Plataformas de software como servicio escalables, con actualizaciones continuas y soporte técnico especializado.</p>
												</div>
											</label>

											<label className="grid grid-cols-1 h-full p-3 rounded-xl hover:bg-white/5 transition-all duration-200 cursor-pointer group/item w-full min-h-[120px]">
												<div className="flex items-center justify-start w-full mb-2">
													<input
														type="checkbox"
														name="serviceInterest"
														value="ai-services"
														onChange={handleServiceChange}
														className="h-6 w-6 rounded border-violet-400/50 bg-violet-900/50 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 transition-transform hover:scale-110"
													/>
												</div>
												<div className="w-full">
													<div className="font-medium text-violet-100 group-hover/item:text-white transition-colors w-full text-left">Servicios de IA</div>
													<p className="text-sm text-violet-400 mt-1 w-full text-left whitespace-normal break-words">Implementación de soluciones avanzadas de inteligencia artificial y aprendizaje automático</p>
												</div>
											</label>
										</div>
									</motion.div>
								</div>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
								<div>
									<div className="mb-2">
										<label htmlFor="budget" className="block text-violet-200 font-medium text-lg mb-1">
											Presupuesto Estimado
										</label>
										<p className="text-sm text-violet-400">Selecciona el rango de inversión para tu proyecto</p>
									</div>
									<div className="relative">
										<select
											id="budget"
											name="budget"
											value={formData.budget}
											onChange={handleChange}
											className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
										>
											<option value="" className="bg-purple-900">Seleccionar Presupuesto</option>
											<option value="0-1000" className="bg-purple-900">$0 - $1,000</option>
											<option value="1000-5000" className="bg-purple-900">$1,000 - $5,000</option>
											<option value="5000-10000" className="bg-purple-900">$5,000 - $10,000</option>
											<option value="10000+" className="bg-purple-900">$10,000+</option>
										</select>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
											<svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</div>
									</div>
								</div>
								<div>
									<div className="mb-2">
										<label htmlFor="timeframe" className="block text-violet-200 font-medium text-lg mb-1">
											Plazo del Proyecto
										</label>
										<p className="text-sm text-violet-400">Indica el tiempo estimado para completar el proyecto</p>
									</div>
									<div className="relative">
										<select
											id="timeframe"
											name="timeframe"
											value={formData.timeframe}
											onChange={handleChange}
											className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-purple-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all appearance-none"
										>
											<option value="" className="bg-purple-900">Seleccionar Plazo</option>
											<option value="immediate" className="bg-purple-900">Inmediato</option>
											<option value="1-3months" className="bg-purple-900">1-3 meses</option>
											<option value="3-6months" className="bg-purple-900">3-6 meses</option>
											<option value="6months+" className="bg-purple-900">Más de 6 meses</option>
										</select>
										<div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
											<svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</div>
									</div>
								</div>
							</div>

							<div className="mb-8">
								<label
									htmlFor="message"
									className="block text-violet-200 mb-4 font-medium text-lg"
								>
									{t('contact_message')}
								</label>
								<div className="relative">
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										className="w-full h-40 px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-purple-700 text-white placeholder-violet-300 focus:outline-none focus:border-purple-500 transition-colors resize-none"
										placeholder={t('contact_placeholder_message')}
										required
									/>
									<div className="absolute bottom-3 right-3 text-violet-400 text-sm">
										{formData.message.length}/500
									</div>
								</div>
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type="submit"
								disabled={isSubmitting}
								className={`w-full py-3 px-6 rounded-full bg-purple-500 text-white font-medium transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-purple-600'}`}
							>
								{isSubmitting ? 'Enviando...' : t('contact_submit')}
							</motion.button>

							{submitStatus === 'success' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="mt-4 p-4 bg-green-500 bg-opacity-20 border border-green-500 border-opacity-20 rounded-lg text-green-400 text-center"
								>
									¡Gracias por contactarnos! Te responderemos pronto.
								</motion.div>
							)}

							{submitStatus === 'error' && (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									className="mt-4 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-20 rounded-lg text-red-400 text-center"
								>
									{errorMessage || 'Hubo un error al enviar el formulario. Por favor intenta nuevamente.'}
								</motion.div>
							)}
						</form>

						{/* Additional Contact Info */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4 }}
							className="mt-12 space-y-8"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
								<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6">
									<h3 className="text-white font-semibold mb-2">{t('contact_phone_label')}</h3>
									<p className="text-violet-200">+506 8395 3467</p>
								</div>
								<div className="bg-white bg-opacity-5 backdrop-blur-sm rounded-xl p-6">
									<h3 className="text-white font-semibold mb-2">{t('contact_hours_label')}</h3>
									<p className="text-violet-200">{t('contact_hours_value')}</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div >
				{/* Creator Profile Section */}
				<motion.section
					initial={{ opacity: 0, y: 50 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: "easeOut" }}
					viewport={{ once: true }}
					className="py-20 bg-black/20 relative overflow-hidden mt-11"
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
									Ingeniero en Computación del TEC de Costa Rica
								</motion.h2>
								<motion.p
									className="text-lg text-violet-200 mb-8 leading-relaxed"
									initial={{ y: 20, opacity: 0 }}
									whileInView={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.8, duration: 0.4 }}
									viewport={{ once: true }}
								>
									Ingeniero de ML/IA y Software con 8+ años de experiencia, especializado en arquitecturas escalables en la nube. Diseño e implemento plataformas Multi-Agent as a Service (MAaaS) que orquestan modelos de lenguaje avanzados, incluyendo Gemini y GPT. Mi experiencia abarca desde el desarrollo de APIs robustas hasta la implementación de arquitecturas multi-agente con LangChain y Cloudflare. Ofrezco soluciones de IA generativa, sistemas de procesamiento de lenguaje natural y visión por computadora, todo respaldado por una infraestructura en la nube optimizada para alto rendimiento y escalabilidad.
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
			</div >
			<AnimatedFooter />
		</div >
	)
}