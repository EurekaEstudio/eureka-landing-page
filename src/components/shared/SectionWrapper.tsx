import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"
import { trackSectionView } from "@/lib/tracking"

gsap.registerPlugin(ScrollTrigger)

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
  noPadding?: boolean
}

export function SectionWrapper({ id, children, className, noPadding }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const el = sectionRef.current

    // On mobile, skip all GSAP animations — they cause scroll to feel stuck
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches
    if (isMobile) {
      // Just track section views without animation
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        once: true,
        onEnter: () => trackSectionView(id),
      })
      return
    }

    // Fade-in animation (desktop only)
    gsap.fromTo(
      el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
      },
    )

    // Track section view
    ScrollTrigger.create({
      trigger: el,
      start: "top 60%",
      once: true,
      onEnter: () => trackSectionView(id),
    })

    return () => {
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === el)
        .forEach((t) => t.kill())
    }
  }, [id])

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn(
        "relative w-full",
        !noPadding && "py-16 md:py-20 lg:py-28 px-6 sm:px-8 md:px-14 lg:px-20",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
