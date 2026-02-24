import { lazy, Suspense, useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COPY, BRAND } from "@/lib/constants"
import { trackScrollDepth } from "@/lib/tracking"
import { NavBar } from "@/components/shared/NavBar"

gsap.registerPlugin(ScrollTrigger)

// Lazy load the heavy 3D hero (~600KB three.js bundle)
const ExperienceHero = lazy(() => import("@/components/ui/experience-hero"))

// Lazy load below-the-fold components to improve FCP & TTI
const PilarInfraestructura = lazy(() => import("@/components/sections/PilarInfraestructura").then(m => ({ default: m.PilarInfraestructura })))
const PilarInteligencia = lazy(() => import("@/components/sections/PilarInteligencia").then(m => ({ default: m.PilarInteligencia })))
const PilarTraccion = lazy(() => import("@/components/sections/PilarTraccion").then(m => ({ default: m.PilarTraccion })))
const PricingSection = lazy(() => import("@/components/sections/PricingSection").then(m => ({ default: m.PricingSection })))
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })))
const LogoCloud = lazy(() => import("@/components/sections/LogoCloud").then(m => ({ default: m.LogoCloud })))
const CaseStudies = lazy(() => import("@/components/sections/CaseStudies").then(m => ({ default: m.CaseStudies })))
const VisualShowcase = lazy(() => import("@/components/sections/VisualShowcase").then(m => ({ default: m.VisualShowcase })))
const ComparisonTable = lazy(() => import("@/components/sections/ComparisonTable").then(m => ({ default: m.ComparisonTable })))
const FinalCTA = lazy(() => import("@/components/sections/FinalCTA").then(m => ({ default: m.FinalCTA })))
const ContactForm = lazy(() => import("@/components/sections/ContactForm").then(m => ({ default: m.ContactForm })))

// Minimal fallback while 3D loads — MUST match actual hero layout EXACTLY to prevent layout shift
function HeroFallback() {
  return (
    <section className="relative min-h-screen w-full bg-[#020202] flex flex-col overflow-hidden">
      <div className="relative z-10 w-full flex flex-col md:flex-row p-6 sm:p-8 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-8 lg:gap-10">
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-8 md:pb-6 w-full">
          {/* Logo Badge */}
          <div className="flex items-center gap-3">
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-16 md:h-20 lg:h-24 w-auto"
            />
          </div>

          {/* Headline - EXACT match to loaded hero */}
          <div className="max-w-3xl md:max-w-4xl lg:max-w-4xl xl:max-w-3xl pr-0 md:pr-8 mt-16 md:mt-20">
            <h1 className="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-white">
              Diseñamos tu próxima página web.
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-[0.45em] mt-1">
              <span className="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-white whitespace-nowrap">Una que</span>
              <span className="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold text-primary whitespace-nowrap leading-[1.2] opacity-0">cierra clientes</span>
            </div>
            <p className="mt-8 md:mt-10 text-sm md:text-base text-white/50 max-w-lg leading-relaxed font-light">
              {COPY.hero.subtitle}
            </p>
          </div>

          {/* CTAs Placeholder */}
          <div className="flex flex-col gap-4 mt-12 md:mt-14 opacity-0">
            <div className="w-fit flex items-center gap-5">
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-primary"><path d="M7 17L17 7M17 7H8M17 7V16" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <span className="text-sm font-semibold text-white uppercase tracking-widest">{COPY.hero.cta}</span>
            </div>
          </div>
        </div>

        {/* Right Space Placeholder */}
        <div className="hidden 2xl:flex w-80 flex-shrink-0 flex-col gap-4 justify-center z-20 opacity-0" />
      </div>
    </section>
  )
}

export default function App() {
  const scrollDepthsTracked = useRef(new Set<number>())

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Scroll depth tracking
    const thresholds = [25, 50, 75, 100]

    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      if (scrollHeight <= 0) return
      const progress = Math.round((window.scrollY / scrollHeight) * 100)

      for (const threshold of thresholds) {
        if (progress >= threshold && !scrollDepthsTracked.current.has(threshold)) {
          scrollDepthsTracked.current.add(threshold)
          trackScrollDepth(threshold)
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      lenis.destroy()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <NavBar />
      <main className="relative w-full overflow-x-hidden">
        {/* HERO — Full viewport with 3D WebGL background */}
        <Suspense fallback={<HeroFallback />}>
          <ExperienceHero />
        </Suspense>

        {/* CONTENT SECTIONS */}
        <div className="relative z-10 bg-background">
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <LogoCloud />
            <PilarInfraestructura />
            <VisualShowcase />
            <PilarInteligencia />
            <PilarTraccion />
            <ContactForm />
            <CaseStudies />
            <ComparisonTable />
            <PricingSection />
            <FAQSection />
            <FinalCTA />
          </Suspense>
        </div>
      </main>
    </div>
  )
}
