import { SectionWrapper } from "@/components/shared/SectionWrapper"
import { COPY, BRAND } from "@/lib/constants"
import { MapPin, Phone, Mail, Globe } from "lucide-react"

export function FinalCTA() {
  const c = COPY.finalCta

  return (
    <SectionWrapper id="agendar" className="overflow-hidden">
      {/* ═══════ FOOTER ═══════ */}
      <footer className="relative z-10 border-t border-white/5 pt-12 pb-8">
        <div className="max-w-6xl mx-auto">
          {/* Top: Logo + Tagline + Nav + Contact */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">
            {/* Brand */}
            <div className="max-w-sm">
              <a href={BRAND.website} target="_blank" rel="noopener noreferrer">
                <img
                  src={BRAND.logo}
                  alt={BRAND.name}
                  className="h-20 md:h-24 w-auto mb-4"
                  width="480"
                  height="480"
                  decoding="async"
                />
              </a>
              <p className="text-sm text-white/40 leading-relaxed mb-8">
                {c.footer.tagline}
              </p>
              <button
                onClick={() => {
                  window.location.href = '#contacto'
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:scale-105 hover:glow-cyan-strong transition-all duration-300 group mb-10"
              >
                {c.ctaPrimary}
              </button>
            </div>

            {/* Nav Links */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white/25 uppercase tracking-[0.2em] mb-1">Navegación</span>
              {c.footer.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/50 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white/25 uppercase tracking-[0.2em] mb-1">Servicios</span>
              {c.footer.services.map((service) => (
                <span key={service} className="text-sm text-white/50">
                  {service}
                </span>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold text-white/25 uppercase tracking-[0.2em] mb-1">Contacto</span>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary/60 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/50">{c.footer.address}</span>
              </div>
              <a
                href={`https://wa.me/${c.footer.whatsapp.replace(/[\s+]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary/60 flex-shrink-0" />
                {c.footer.whatsapp}
              </a>
              <a
                href={`mailto:${c.footer.email}`}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary/60 flex-shrink-0" />
                {c.footer.email}
              </a>
              <a
                href={`https://${c.footer.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4 text-primary/60 flex-shrink-0" />
                {c.footer.website}
              </a>
            </div>
          </div>

          {/* Bottom: Legal */}
          <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              &copy; {new Date().getFullYear()} {BRAND.fullName}. {c.footer.legal}
            </p>
            <p className="text-xs text-white/25">{c.footer.location}</p>
          </div>
        </div>
      </footer>
    </SectionWrapper>
  )
}
