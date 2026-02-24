const CLIENT_LOGOS = [
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/8.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/9.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/7.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/6.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/5.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2025/10/4.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/FPS-cliente.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/IP-cliente.png",
  "https://eurekaestudiocreativo.com/wp-content/uploads/2026/01/Ruky-cliente.png",
]

export function LogoCloud() {
  // Duplicate for seamless infinite scroll
  const logos = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section className="w-full max-w-[1400px] mx-auto py-16 md:py-20 px-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="text-[clamp(1.875rem,4vw,3.4rem)] font-bold text-white leading-[1.1] mb-4">
          Marcas con las que{" "}
          <span className="text-primary">colaboramos</span>
        </h2>
        <p className="text-lg text-white/40">
          Algunos de los negocios que siguen creciendo junto a nosotros
        </p>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden py-2.5 pb-12">
        <div className="logo-cloud-track flex items-center gap-20 w-fit hover:[animation-play-state:paused]">
          {logos.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 h-[100px] flex items-center justify-center md:h-[100px] md:w-auto w-[80vw]"
            >
              <img
                src={src}
                alt="Cliente"
                loading="lazy"
                decoding="async"
                width="250"
                height="100"
                className="h-full w-auto max-w-[250px] min-w-[120px] object-contain brightness-110 md:min-w-[120px] md:max-w-[250px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
