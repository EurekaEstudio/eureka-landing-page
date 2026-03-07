import { useEffect, useState } from "react"
import { BRAND } from "@/lib/constants"
import { trackCTAClick } from "@/lib/tracking"

const NAV_LINKS = [
  { label: "Qué Hacemos", href: "#infraestructura" },
  { label: "Portafolio", href: "#galeria" },
  { label: "Casos de Éxito", href: "#casos-exito" },
  { label: "Precios", href: "#precios" },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "translate-y-0 opacity-100 bg-black/80 backdrop-blur-xl border-b border-white/5"
        : "-translate-y-full opacity-0"
        }`}
      style={{ pointerEvents: scrolled ? "auto" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          className="flex items-center"
          aria-label="Ir al inicio"
        >
          <img
            src={BRAND.logo}
            alt={BRAND.name}
            /* Mobile: h-10 (40px) — más grande que antes (h-8=32px).
               Desktop: h-8 (32px) — igual que antes */
            className="h-10 md:h-8 w-auto"
            width="480"
            height="480"
            decoding="async"
          />
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/50 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA — Desktop: solo visible en md+.
            Mobile: siempre visible (reemplaza al menú hamburguesa) */}
        <button
          onClick={() => {
            trackCTAClick("nav_cta")
            window.location.href = "#contacto"
          }}
          className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          aria-label="Ir al formulario de contacto"
        >
          Asesoría gratuita
        </button>
      </div>
    </nav>
  )
}
