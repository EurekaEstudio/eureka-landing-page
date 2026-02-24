import { COPY, BRAND } from "@/lib/constants"
import { trackCTAClick } from "@/lib/tracking"

import { FloatingGeometrics } from "@/components/ui/svg-decorations"

export function CaseStudies() {
    const { badge, title, subtitle, cases, closingText, cta } = COPY.caseStudies

    return (
        <section
            id="casos-exito"
            className="relative py-24 md:py-32 overflow-hidden"
        >
            <FloatingGeometrics />
            <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-14 lg:px-20">
                {/* Header */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
                        {badge}
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
                        {title}
                    </h2>
                    <p className="text-lg md:text-xl text-white/50 font-light max-w-3xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                </div>

                {/* Case Study Feature Blocks */}
                <div className="flex flex-col gap-16 md:gap-24 mb-20 md:mb-32">
                    {cases.map((caseStudy) => (
                        <div
                            key={caseStudy.id}
                            className="relative glass rounded-[2.5rem] p-8 md:p-12 lg:p-16 overflow-hidden group border border-white/5 hover:border-primary/20 transition-all duration-700 hover:shadow-[0_0_80px_rgba(34,198,234,0.05)]"
                        >
                            {/* Abstract glowing background */}
                            <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-bl from-primary/[0.04] to-transparent pointer-events-none group-hover:from-primary/[0.08] transition-all duration-700" />

                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10">
                                {/* Left Side: Context & Narrative */}
                                <div className="w-full lg:w-5/12 flex flex-col justify-between">
                                    <div>
                                        <p className="text-base font-medium text-white/70 mb-3">
                                            {caseStudy.client} <span className="text-white/30 mx-1">&middot;</span> <span className="text-white/40">{caseStudy.location}</span>
                                        </p>
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 mb-8">
                                            <span className="text-xs font-bold text-primary uppercase tracking-widest">
                                                {caseStudy.badge}
                                            </span>
                                        </div>

                                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                                            {caseStudy.solutionTitle}
                                        </h3>

                                        <div className="mb-10">
                                            <h4 className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-4">
                                                El Desafío
                                            </h4>
                                            <p className="text-base text-white/60 leading-relaxed font-light">
                                                {caseStudy.challenge}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-l-2 border-primary/40 pl-6 py-2">
                                        <p className="text-base md:text-lg text-white/90 italic font-light leading-relaxed">
                                            &ldquo;{caseStudy.lesson}&rdquo;
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side: Vertical Metric Cards Stack */}
                                <div className="w-full lg:w-7/12 flex flex-col gap-4 md:gap-5">
                                    {caseStudy.results.map((result, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-black/30 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-center flex-wrap gap-4 sm:gap-6 md:gap-8 border border-white/5 hover:border-primary/30 hover:bg-white/[0.02] transition-colors duration-500"
                                        >
                                            {"highlight" in result && result.highlight && (
                                                <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-cyan tracking-tighter shrink-0">
                                                    {result.highlight}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h5 className="text-lg sm:text-xl font-bold text-white mb-2">
                                                    {result.metric}
                                                </h5>
                                                <p className="text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                                                    {result.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing CTA with CEO */}
                <div className="text-center max-w-2xl mx-auto">
                    {/* CEO photo */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-5">
                            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden">
                                <img
                                    src={BRAND.ceo.photo}
                                    alt={BRAND.ceo.name}
                                    className="w-full h-full object-cover opacity-80"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl -z-10" />
                        </div>
                        <p className="text-sm font-medium text-white/80">{BRAND.ceo.name}</p>
                        <p className="text-xs text-primary/70 uppercase tracking-wider">{BRAND.ceo.role}</p>
                    </div>

                    <p className="text-xl md:text-2xl font-light text-white/70 mb-8 leading-relaxed">
                        {closingText}
                    </p>
                    <button
                        onClick={() => {
                            trackCTAClick("case_studies")
                            const formElement = document.getElementById('formulario')
                            if (formElement) {
                                formElement.scrollIntoView({ behavior: 'smooth' })
                            }
                        }}
                        className="inline-flex items-center gap-2.5 px-8 py-4 bg-primary text-primary-foreground font-semibold text-base rounded-xl hover:scale-105 hover:glow-cyan-strong transition-all duration-300 group"
                        aria-label="Ver cómo podemos ayudarte - Ir al formulario"
                    >
                        {cta}
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                            <path
                                d="M5 12h14m-7-7l7 7-7 7"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}
