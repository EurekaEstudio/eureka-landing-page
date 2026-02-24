import { useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import NumberFlow from "@number-flow/react"
import confetti from "canvas-confetti"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"

import { trackCTAClick } from "@/lib/tracking"

interface PricingPlan {
  name: string
  subtitle: string
  targetAudience: string
  price: number
  features: readonly string[]
  excluded: readonly string[]
  hook: string
  buttonText: string
  chatIntent: string
  isPopular: boolean
}

interface PricingProps {
  plans: readonly PricingPlan[]
  title: string
  subtitle: string
}

function formatCLP(value: number): string {
  return value.toLocaleString("es-CL")
}

export function Pricing({ plans, title, subtitle }: PricingProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const buttonRefs = useRef<Map<number, HTMLButtonElement>>(new Map())

  const handlePlanClick = (plan: PricingPlan, index: number) => {
    if (plan.isPopular) {
      const button = buttonRefs.current.get(index)
      if (button) {
        const rect = button.getBoundingClientRect()
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2
        confetti({
          particleCount: 50,
          spread: 60,
          origin: {
            x: x / window.innerWidth,
            y: y / window.innerHeight,
          },
          colors: ["#22C6EA", "#0EA5E9", "#38BDF8", "#7DD3FC", "#FFFFFF"],
          disableForReducedMotion: true,
        })
      }
    }
    trackCTAClick(`pricing_${plan.name.toLowerCase().replace(/\s+/g, "_")}`)
    // Redigir al formulario de contacto
    const formElement = document.getElementById('formulario')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full">
      <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
        <h2 className="text-section-title text-white mb-5">{title}</h2>
        <p className="text-section-subtitle text-white/50">{subtitle}</p>
      </div>

      <div
        className={cn(
          "grid gap-6 lg:gap-8 mx-auto max-w-6xl",
          plans.length === 3
            ? "grid-cols-1 md:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2"
        )}
      >
        <AnimatePresence mode="wait">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={cn(
                "relative rounded-2xl flex flex-col",
                plan.isPopular
                  ? "glass-strong glow-cyan border border-primary/20"
                  : "glass border border-white/[0.06]"
              )}
            >
              {plan.isPopular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                    Recomendado
                  </span>
                </div>
              )}

              <div className="p-8 md:p-10 flex flex-col flex-1">
                {/* Plan Name & Audience */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {plan.subtitle}
                  </p>
                  <p className="text-xs text-white/40 mt-2">
                    {plan.targetAudience}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-white/40 mr-0.5">$</span>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={plan.price}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          duration: 0.25,
                          ease: "easeOut",
                        }}
                      >
                        {isDesktop ? (
                          <NumberFlow
                            value={plan.price}
                            format={{
                              useGrouping: true,
                              minimumFractionDigits: 0,
                            }}
                            locales="es-CL"
                            className="text-4xl font-bold text-white tabular-nums"
                          />
                        ) : (
                          <span className="text-4xl font-bold text-white">
                            {formatCLP(plan.price)}
                          </span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                    <span className="text-xs text-white/40 ml-1">CLP</span>
                  </div>
                </div>

                {/* Hook */}
                <p className="text-sm text-gradient-cyan font-semibold italic mb-6 pb-6 border-b border-white/[0.06]">
                  &ldquo;{plan.hook}&rdquo;
                </p>

                {/* Features */}
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/70">{feature}</span>
                    </li>
                  ))}
                  {plan.excluded.map((feature, i) => (
                    <li key={`ex-${i}`} className="flex items-start gap-3">
                      <X className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/25 line-through">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  ref={(el) => {
                    if (el) buttonRefs.current.set(index, el)
                  }}
                  onClick={() => handlePlanClick(plan, index)}
                  className={cn(
                    "w-full py-4 rounded-full font-semibold text-base transition-all duration-500",
                    plan.isPopular
                      ? "bg-primary text-primary-foreground hover:glow-cyan-strong hover:scale-[1.02]"
                      : "border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/60"
                  )}
                >
                  {plan.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
