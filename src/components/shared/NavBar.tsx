import { useState, useEffect } from "react"
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
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
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
          <img src={BRAND.logo} alt={BRAND.name} className="h-8 w-auto" />
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

        {/* CTA */}
        <button
          onClick={() => {
            trackCTAClick("nav_cta")
            scrollTo("#contacto")
          }}
          className="hidden md:inline-flex text-sm font-semibold bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          Cotizar
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-white p-2"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          } bg-black/95 backdrop-blur-xl border-t border-white/5`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-white/60 hover:text-white transition-colors py-3 text-left"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => {
              trackCTAClick("nav_cta_mobile")
              scrollTo("#contacto")
            }}
            className="text-sm font-semibold bg-primary text-primary-foreground px-5 py-3 rounded-lg w-full mt-2"
          >
            Cotizar
          </button>
        </div>
      </div>
    </nav>
  )
}
