import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User, Phone, Mail, Building2, Send, CheckCircle2, Loader2 } from "lucide-react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

const PLANS = [
    {
        key: "base",
        name: "Smart Landing Base",
        tagline: "Web que convierte sola",
        price: "$249.990",
        emoji: "🚀",
    },
    {
        key: "agente",
        name: "Pack Agente IA",
        tagline: "Landing + IA 24/7",
        price: "$499.990",
        popular: true,
        emoji: "🤖",
    },
    {
        key: "growth",
        name: "Ecosistema Growth",
        tagline: "Landing + IA + Tráfico",
        price: "$999.990",
        emoji: "📈",
    },
    {
        key: "orientacion",
        name: "No sé aún",
        tagline: "Quiero orientación gratuita",
        price: "Auditoría gratis",
        emoji: "💬",
    },
]

const INDUSTRIES = [
    "Clínica / Salud",
    "Consultorio / Profesional independiente",
    "Inmobiliaria / Construcción",
    "Academia / Educación",
    "Servicio B2B",
    "E-commerce / Producto",
    "Otro",
]

type FormState = "idle" | "submitting" | "success" | "error"

export function ContactForm() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [industry, setIndustry] = useState("")
    const [formState, setFormState] = useState<FormState>("idle")
    const { executeRecaptcha } = useGoogleReCaptcha()

    const isValid = name.trim() && phone.trim() && email.trim() && selectedPlan

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (!isValid) return

        setFormState("submitting")

        try {
            // Intentar obtener token de reCAPTCHA; si no está listo usar fallback
            // (pasa cuando la VITE_RECAPTCHA_SITE_KEY no está configurada en el servidor)
            let recaptchaToken = "not_configured"
            if (executeRecaptcha) {
                try {
                    recaptchaToken = await executeRecaptcha("contact_form")
                } catch {
                    console.warn("[ContactForm] reCAPTCHA falló, continuando sin token")
                }
            }

            // Payload listo para Google Apps Script
            const payload = {
                nombre: name.trim(),
                whatsapp: phone.trim(),
                email: email.trim(),
                plan: selectedPlan,
                rubro: industry || "No especificado",
                fuente: "landing_formulario",
                recaptcha_token: recaptchaToken,
                timestamp: new Date().toISOString(),
            }

            const endpoint = (import.meta as unknown as { env: Record<string, string> }).env.VITE_FORM_ENDPOINT
                || "https://script.google.com/macros/s/AKfycbyT_tcFbme3wJ5006f3Iwv_WCay4grmHXjpDUeSe5qFP73wtj0hrEtvUw8YGFfJs8RQ4A/exec"

            // URLSearchParams = application/x-www-form-urlencoded
            // Es el único Content-Type "simple" que funciona con no-cors + Google Apps Script
            // El script lo lee como e.parameter.nombre, e.parameter.email, etc.
            const params = new URLSearchParams()
            Object.entries(payload).forEach(([key, value]) => params.append(key, String(value)))

            await fetch(endpoint, {
                method: "POST",
                mode: "no-cors",
                body: params,
            })
            setFormState("success")
        } catch (err) {
            console.error("[ContactForm] Error al enviar:", err)
            setFormState("error")
        }
    }

    return (
        <SectionWrapper id="contacto">
            {/* Divider */}
            <div className="divider-gradient mb-16 md:mb-24" />

            {/* Header */}
            <div className="max-w-2xl mx-auto text-center mb-14 md:mb-16">
                <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                    Hablemos
                </span>
                <h2 className="text-section-title text-white mb-5 leading-[1.1]">
                    Cuéntanos qué necesitas.<br />
                    <span className="text-gradient-cyan">Te respondemos en minutos.</span>
                </h2>
                <p className="text-lg text-white/50 font-light leading-relaxed max-w-xl mx-auto">
                    Sin llamadas inesperadas. Solo dejá tus datos y el plan que te interesó — el equipo de Eureka te escribe directo por WhatsApp.
                </p>
            </div>

            <AnimatePresence mode="wait">
                {formState === "success" ? (
                    /* ── SUCCESS STATE ── */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-strong rounded-3xl p-12 md:p-16 border-primary/20 glow-cyan text-center max-w-2xl mx-auto"
                    >
                        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-8">
                            <CheckCircle2 className="w-10 h-10 text-primary" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                            ¡Recibido! 🎉
                        </h3>
                        <p className="text-white/60 text-base leading-relaxed max-w-md mx-auto">
                            El equipo de Eureka ya tiene tu consulta. Te escribirán por WhatsApp
                            a la brevedad con toda la info sobre el{" "}
                            <span className="text-primary font-semibold">
                                {PLANS.find((p) => p.key === selectedPlan)?.name}
                            </span>
                            .
                        </p>
                    </motion.div>
                ) : (
                    /* ── FORM STATE ── */
                    <motion.form
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        onSubmit={handleSubmit}
                        className="max-w-4xl mx-auto"
                    >
                        {/* ── PLAN SELECTOR ── */}
                        <fieldset className="mb-10">
                            <legend className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5 flex items-center gap-2">
                                <span className="w-5 h-px bg-white/20" />
                                01 · ¿Qué plan te interesó?
                            </legend>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                {PLANS.map((plan) => {
                                    const isSelected = selectedPlan === plan.key
                                    return (
                                        <button
                                            key={plan.key}
                                            type="button"
                                            id={`plan-${plan.key}`}
                                            onClick={() => setSelectedPlan(plan.key)}
                                            className={`relative text-left rounded-2xl p-5 border transition-all duration-300 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isSelected
                                                ? "bg-primary/10 border-primary/50 glow-cyan"
                                                : "glass border-white/8 hover:border-white/20 hover:bg-white/5"
                                                }`}
                                        >
                                            {plan.popular && (
                                                <span className="absolute -top-3 left-4 text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-0.5">
                                                    Popular
                                                </span>
                                            )}
                                            <span className="text-2xl mb-3 block">{plan.emoji}</span>
                                            <p className={`text-sm font-semibold leading-snug mb-1 transition-colors duration-200 ${isSelected ? "text-primary" : "text-white group-hover:text-white"}`}>
                                                {plan.name}
                                            </p>
                                            <p className="text-xs text-white/40 leading-snug mb-3">{plan.tagline}</p>
                                            <p className={`text-xs font-bold ${isSelected ? "text-primary" : "text-white/30"}`}>
                                                {plan.price}
                                            </p>

                                            {/* Selected indicator */}
                                            {isSelected && (
                                                <motion.div
                                                    layoutId="plan-indicator"
                                                    className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary"
                                                />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </fieldset>

                        {/* ── FIELDS ── */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                    <span className="w-5 h-px bg-white/20" />
                                    02 · Nombre
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                                    <input
                                        id="contact-name"
                                        type="text"
                                        autoComplete="given-name"
                                        placeholder="Tu nombre"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="w-full glass rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* WhatsApp */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                    <span className="w-5 h-px bg-white/20" />
                                    03 · WhatsApp
                                </label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                                    <input
                                        id="contact-phone"
                                        type="tel"
                                        autoComplete="tel"
                                        placeholder="+56 9 XXXX XXXX"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                        className="w-full glass rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 bg-transparent"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2 md:col-span-2">
                                <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                    <span className="w-5 h-px bg-white/20" />
                                    04 · Correo electrónico
                                    <span className="text-white/20 normal-case tracking-normal font-light">— recibirás confirmación aquí</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                                    <input
                                        id="contact-email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="tu@correo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full glass rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder:text-white/25 border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 bg-transparent"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Industry (optional) */}
                        <div className="flex flex-col gap-2 mb-10">
                            <label htmlFor="contact-industry" className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 flex items-center gap-2">
                                <span className="w-5 h-px bg-white/20" />
                                05 · ¿A qué te dedicas? <span className="text-white/20 normal-case tracking-normal font-light">(opcional)</span>
                            </label>
                            <div className="relative">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                                <select
                                    id="contact-industry"
                                    value={industry}
                                    onChange={(e) => setIndustry(e.target.value)}
                                    className="w-full glass rounded-xl pl-11 pr-10 py-3.5 text-sm border-white/10 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all duration-200 bg-[#080808] text-white appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-[#080808] text-white/40">Selecciona tu rubro</option>
                                    {INDUSTRIES.map((ind) => (
                                        <option key={ind} value={ind} className="bg-[#080808] text-white">{ind}</option>
                                    ))}
                                </select>
                                {/* Custom chevron */}
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="flex flex-col items-center justify-center gap-6 mt-12 mb-8">
                            <button
                                id="contact-submit"
                                type="submit"
                                disabled={!isValid || formState === "submitting"}
                                className={`group flex items-center gap-3 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-widest transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${isValid
                                    ? "bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_30px_oklch(0.75_0.14_205/40%)] hover:-translate-y-0.5 cursor-pointer"
                                    : "bg-white/5 text-white/20 cursor-not-allowed border border-white/10"
                                    }`}
                            >
                                {formState === "submitting" ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                                )}
                                {formState === "submitting" ? "Enviando..." : "Quiero que me contacten"}
                            </button>

                            <p className="text-xs text-white/25 leading-relaxed max-w-xs text-center">
                                Sin spam. Solo el equipo de{" "}
                                <span className="text-white/40">{COPY.finalCta.footer.website}</span> te escribirá por WhatsApp.
                            </p>
                        </div>

                        {formState === "error" && (
                            <motion.p
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 text-xs text-red-400"
                            >
                                Hubo un error al enviar. Intenta de nuevo o escríbenos directo al{" "}
                                <a href={`https://wa.me/${COPY.finalCta.footer.whatsapp.replace(/[\s+]/g, "")}`} className="underline text-red-300" target="_blank" rel="noopener noreferrer">
                                    WhatsApp
                                </a>
                                .
                            </motion.p>
                        )}
                    </motion.form>
                )}
            </AnimatePresence>
        </SectionWrapper>
    )
}
