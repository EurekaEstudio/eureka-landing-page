import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Bot, Clock, MailCheck, Database, CalendarCheck, UserCheck } from "lucide-react"
import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY } from "@/lib/constants"

gsap.registerPlugin(ScrollTrigger)

const featureIcons = [Bot, Clock, MailCheck, Database, CalendarCheck, UserCheck]

export function PilarInteligencia() {
  const bentoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!bentoRef.current) return

    // Skip animations on mobile to prevent scroll issues
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches
    if (isMobile) return

    const cells = bentoRef.current.querySelectorAll(".bento-cell")
    gsap.fromTo(
      cells,
      { y: 30, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bentoRef.current,
          start: "top 80%",
          once: true,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === bentoRef.current)
        .forEach((t) => t.kill())
    }
  }, [])

  return (
    <SectionWrapper id="inteligencia">
      {/* Header */}
      <div className="max-w-3xl mb-16 md:mb-20">
        <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 rounded-full px-5 py-2 mb-6">
          {COPY.pilar2.badge}
        </span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
          {COPY.pilar2.title}
        </h2>
        <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-lg">
          {COPY.pilar2.subtitle}
        </p>
      </div>

      {/* Bento Box Grid */}
      <div
        ref={bentoRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 auto-rows-auto mb-16 md:mb-20"
      >
        {/* Cell 1: Large Visual Chat Block (col-span-2, row-span-2) */}
        <div className="bento-cell col-span-1 md:col-span-2 lg:row-span-2 glass rounded-3xl p-6 lg:p-8 border-white/5 relative overflow-hidden group flex flex-col justify-between hover:border-primary/20 transition-colors duration-500">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />

          <div className="relative z-10 mb-8">
            <h3 className="text-xl font-semibold text-white mb-2">Simulación de Calificación</h3>
            <p className="text-sm text-white/40">Preguntas que tu IA hace automáticamente para filtrar prospectos.</p>
          </div>

          <div className="relative z-10 flex flex-col gap-3">
            {COPY.pilar2.filterQuestions.slice(0, 3).map((question, i) => (
              <div
                key={i}
                className="chat-bubble bg-black/40 border border-white/5 rounded-2xl p-4 max-w-[90%] md:max-w-[80%]"
                style={{ alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end', borderBottomLeftRadius: i % 2 === 0 ? '4px' : '16px', borderBottomRightRadius: i % 2 !== 0 ? '4px' : '16px' }}
              >
                <p className="text-sm text-white/80 leading-relaxed font-light">{question}</p>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-4 ml-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary/70 font-medium tracking-wide">
                Derivación a humano ejecutada
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cells mapped dynamically into the Bento */}
        {COPY.pilar2.automationFeatures.map((feature, i) => {
          const Icon = featureIcons[i]
          // Determine spanning based on index for asymmetrical look
          const isWide = i === 2 || i === 5 // 3rd and 6th items span 2 columns

          return (
            <div
              key={i}
              className={`bento-cell glass rounded-3xl p-6 lg:p-8 border-white/5 group hover:glass-strong transition-all duration-500 flex ${isWide ? 'flex-col sm:flex-row items-start sm:items-center gap-6 col-span-1 md:col-span-2' : 'flex-col col-span-1'}`}
            >
              <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-500 ${isWide ? '' : 'mb-6'}`}>
                <Icon className="w-5 h-5 text-white/50 group-hover:text-primary transition-colors duration-500" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Case Study Block (No changes, just fits nicely below the bento) */}
      <div className="bento-cell glass-strong rounded-3xl p-10 md:p-14 relative overflow-hidden border-primary/20 glow-cyan">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.03] to-transparent pointer-events-none" />
        <div className="relative z-10">
          <span className="text-xs text-primary uppercase tracking-widest font-medium block mb-6">
            Caso real • {COPY.pilar2.caseStudy.client}
          </span>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white/90 leading-tight font-light italic mb-6">
                &ldquo;{COPY.pilar2.caseStudy.quote}&rdquo;
              </blockquote>
              <p className="text-sm md:text-base text-white/40 leading-relaxed max-w-2xl font-light">
                {COPY.pilar2.caseStudy.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
