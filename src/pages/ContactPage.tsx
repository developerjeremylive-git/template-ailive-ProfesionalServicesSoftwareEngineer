import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
	FiMail, 
	FiPhone, 
	FiClock, 
	FiCheckCircle, 
	FiAlertCircle, 
	FiUser, 
	FiBriefcase, 
	FiMessageSquare,
	FiGlobe,
	FiSend,
	FiLayers
} from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import Header from '../components/Header'
import AnimatedFooter from '../components/AnimatedFooter'

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
			setErrorMessage(t('contact_error_message') as string)
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
		<div className="min-h-screen bg-[#0A0118] selection:bg-purple-500/30">
			<Header variant="default" />
			
			{/* Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px] animate-pulse"></div>
				<div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
			</div>

			<div className="pt-32 pb-20 relative z-10">
				<div className="container mx-auto px-4">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="max-w-4xl mx-auto text-center mb-24"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8"
						>
							<span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
							{t('contact_ready_to_start')}
						</motion.div>
						<h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
							{t('contact_title')}
						</h1>
						<p className="text-xl md:text-2xl text-violet-200/60 leading-relaxed max-w-3xl mx-auto font-light">
							{t('contact_subtitle')}
						</p>
					</motion.div>

					<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
						{/* Left Column: Contact Info & Value Prop */}
						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="lg:col-span-5 space-y-16"
						>
							<div className="space-y-10">
								<h2 className="text-4xl font-bold text-white tracking-tight">
									{t('contact_info_title')}
								</h2>
								
								<div className="grid gap-6">
									{[
										{ icon: FiMail, label: t('contact_email_label'), value: 'developerjeremylive@gmail.com', href: 'mailto:developerjeremylive@gmail.com', color: 'from-blue-500/20 to-cyan-500/20' },
										{ icon: FiPhone, label: t('contact_phone_label'), value: '+506 8888-8888', href: 'tel:+50688888888', color: 'from-purple-500/20 to-pink-500/20' },
										{ icon: FiClock, label: t('contact_hours_label'), value: t('contact_hours_value'), color: 'from-orange-500/20 to-yellow-500/20' }
									].map((item, idx) => (
										<motion.div 
											key={idx}
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ delay: idx * 0.1 }}
											viewport={{ once: true }}
											whileHover={{ scale: 1.02, x: 10 }}
											className="group flex items-start gap-6 p-8 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-2xl transition-all hover:bg-white/[0.08] hover:border-purple-500/30"
										>
											<div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform`}>
												<item.icon className="text-2xl text-white" />
											</div>
											<div>
												<p className="text-sm font-semibold text-purple-400/80 uppercase tracking-widest mb-1">{item.label}</p>
												{item.href ? (
													<a href={item.href} className="text-xl font-medium text-white hover:text-purple-400 transition-colors">
														{item.value}
													</a>
												) : (
													<p className="text-xl font-medium text-white">{item.value}</p>
												)}
											</div>
										</motion.div>
									))}
								</div>
							</div>

							<motion.div 
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								className="p-10 rounded-[40px] bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-3xl relative overflow-hidden group"
							>
								<div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
									<FiBriefcase size={200} className="text-purple-400" />
								</div>
								<h3 className="text-3xl font-bold text-white mb-8 tracking-tight">{t('contact_why_work_with_me')}</h3>
								<ul className="space-y-6">
									{[
										t('contact_benefit_1'),
										t('contact_benefit_2'),
										t('contact_benefit_3')
									].map((benefit, i) => (
										<motion.li 
											key={i} 
											initial={{ opacity: 0, x: -20 }}
											whileInView={{ opacity: 1, x: 0 }}
											transition={{ delay: 0.5 + (i * 0.1) }}
											viewport={{ once: true }}
											className="flex items-center gap-4 text-lg text-violet-100/80"
										>
											<div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/40">
												<FiCheckCircle className="text-purple-400 text-sm" />
											</div>
											<span>{benefit}</span>
										</motion.li>
									))}
								</ul>
							</motion.div>
						</motion.div>

						{/* Right Column: The Form */}
						<motion.div
							initial={{ opacity: 0, x: 50 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={{ once: true }}
							className="lg:col-span-7"
						>
							<div className="relative">
								<div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-[48px] blur-2xl opacity-50"></div>
								
								<form
									onSubmit={handleSubmit}
									className="relative bg-[#0a021a]/80 border border-white/10 rounded-[40px] p-10 md:p-14 shadow-2xl backdrop-blur-xl space-y-10"
								>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
										{/* Name */}
										<div className="space-y-3">
											<label htmlFor="name" className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
												<FiUser className="text-purple-500" /> {t('contact_name')}
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formData.name}
												onChange={handleChange}
												className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all text-lg"
												placeholder={t('contact_placeholder_name')}
												required
											/>
										</div>

										{/* Email */}
										<div className="space-y-3">
											<label htmlFor="email" className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
												<FiMail className="text-purple-500" /> {t('contact_email')}
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formData.email}
												onChange={handleChange}
												className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all text-lg"
												placeholder={t('contact_placeholder_email')}
												required
											/>
										</div>

										{/* Company */}
										<div className="space-y-3">
											<label htmlFor="company" className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
												<FiBriefcase className="text-purple-500" /> {t('contact_company')}
											</label>
											<input
												type="text"
												id="company"
												name="company"
												value={formData.company}
												onChange={handleChange}
												className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all text-lg"
												placeholder={t('contact_placeholder_company')}
											/>
										</div>

										{/* Phone */}
										<div className="space-y-3">
											<label htmlFor="phone" className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
												<FiPhone className="text-purple-500" /> {t('contact_phone')}
											</label>
											<input
												type="tel"
												id="phone"
												name="phone"
												value={formData.phone}
												onChange={handleChange}
												className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all text-lg"
												placeholder={t('contact_placeholder_phone')}
											/>
										</div>
									</div>

									{/* Services Selection */}
									<div className="space-y-6">
										<label className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
											<FiLayers className="text-purple-500" /> {t('contact_services_interest')}
										</label>
										<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
											{[
												{ id: 'web-development', label: t('service_web') },
												{ id: 'ai-solutions', label: t('service_ai') },
												{ id: 'cloud-infra', label: t('service_cloud') },
												{ id: 'consulting', label: t('service_consulting') }
											].map((service) => (
												<label 
													key={service.id}
													className={`flex items-center gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
														formData.serviceInterest.includes(service.id)
															? 'bg-purple-500 border-purple-400 text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
															: 'bg-white/[0.03] border-white/10 text-violet-200/50 hover:bg-white/[0.08] hover:border-purple-500/30'
													}`}
												>
													<input
														type="checkbox"
														value={service.id}
														checked={formData.serviceInterest.includes(service.id)}
														onChange={handleServiceChange}
														className="hidden"
													/>
													<div className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-all ${
														formData.serviceInterest.includes(service.id)
															? 'bg-white border-white scale-110'
															: 'border-white/20'
													}`}>
														{formData.serviceInterest.includes(service.id) && <FiCheckCircle className="text-purple-600 text-sm" />}
													</div>
													<span className="text-base font-medium tracking-tight">{service.label}</span>
												</label>
											))}
										</div>
									</div>

									{/* Message */}
									<div className="space-y-3">
										<label htmlFor="message" className="text-sm font-bold text-purple-400 uppercase tracking-widest flex items-center gap-2">
											<FiMessageSquare className="text-purple-500" /> {t('contact_message')}
										</label>
										<textarea
											id="message"
											name="message"
											value={formData.message}
											onChange={handleChange}
											rows={6}
											className="w-full px-6 py-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500/40 transition-all resize-none text-lg"
											placeholder={t('contact_placeholder_message')}
											required
										></textarea>
									</div>

									{/* Submit Button */}
									<div className="pt-6">
										<button
											type="submit"
											disabled={isSubmitting}
											className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black text-xl uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(147,51,234,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 group overflow-hidden relative"
										>
											<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
											{isSubmitting ? (
												<div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
											) : (
												<>
													{t('contact_submit')}
													<FiSend className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
												</>
											)}
										</button>
									</div>

									{/* Status Messages */}
									<AnimatePresence>
										{submitStatus === 'success' && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0 }}
												className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-3"
											>
												<FiCheckCircle /> {t('contact_success_message')}
											</motion.div>
										)}
										{submitStatus === 'error' && (
											<motion.div
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0 }}
												className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3"
											>
												<FiAlertCircle /> {errorMessage}
											</motion.div>
										)}
									</AnimatePresence>
								</form>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
			<AnimatedFooter />
		</div>
	)
}
