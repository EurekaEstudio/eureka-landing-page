"use client"

import { useRef, useEffect, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"
import { Mesh, ShaderMaterial, Vector2 } from "three"
import gsap from "gsap"
import { BRAND, COPY } from "@/lib/constants"
import { trackCTAClick } from "@/lib/tracking"
import { openChatWithIntent } from "@/hooks/use-chat-widget"
import { GooeyText } from "./gooey-text-morphing"

// Detect touch/mobile devices only once at module level for performance
const isMobileDevice = typeof window !== 'undefined'
  && window.matchMedia("(hover: none) and (pointer: coarse)").matches

/* ============================================
   3D SCENE COMPONENTS
   ============================================ */

const LiquidBackground = () => {
  const meshRef = useRef<Mesh>(null)
  const { viewport } = useThree()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new Vector2(0, 0) },
    }),
    [],
  )

  useFrame((state) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as ShaderMaterial
      mat.uniforms.uTime.value = state.clock.getElapsedTime()
      mat.uniforms.uMouse.value.lerp(state.mouse, 0.05)
    }
  })

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;
          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.12;
            vec2 m = uMouse * 0.08;
            float wave = smoothstep(0.0, 1.0,
              (sin(uv.x * 6.0 + t + m.x * 10.0) +
               sin(uv.y * 5.0 - t + m.y * 10.0)) * 0.5 + 0.5
            );
            // Eureka palette: deep black with subtle cyan tint
            vec3 dark = vec3(0.005, 0.008, 0.012);
            vec3 mid = vec3(0.02, 0.06, 0.08);
            gl_FragColor = vec4(mix(dark, mid, wave), 1.0);
          }
        `}
      />
    </mesh>
  )
}

const Monolith = () => {
  const meshRef = useRef<Mesh>(null)
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2
    }
  })
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial
          color="#061820"
          emissive="#22C6EA"
          emissiveIntensity={0.08}
          speed={3}
          distort={0.35}
          roughness={0.05}
          metalness={1.0}
        />
      </mesh>
    </Float>
  )
}

/* ============================================
   HERO COMPONENT
   ============================================ */

export function ExperienceHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const revealRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isMobileDevice) {
        // Mobile: GPU-composited animation only — no filter blur (causes repaint)
        gsap.fromTo(
          revealRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        )
      } else {
        // Desktop: premium blur reveal
        gsap.fromTo(
          revealRef.current,
          { filter: "blur(30px)", opacity: 0, scale: 1.02 },
          { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" },
        )
      }

      gsap.from(".hero-card", {
        x: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.8,
        clearProps: "all",
      })

      gsap.from(".hero-badge", {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      })

      // Only add magnetic mouse effect on desktop
      if (!isMobileDevice) {
        const handleMouseMove = (e: MouseEvent) => {
          if (!ctaRef.current) return
          const rect = ctaRef.current.getBoundingClientRect()
          const cx = rect.left + rect.width / 2
          const cy = rect.top + rect.height / 2
          const dist = Math.hypot(e.clientX - cx, e.clientY - cy)
          if (dist < 150) {
            gsap.to(ctaRef.current, {
              x: (e.clientX - cx) * 0.35,
              y: (e.clientY - cy) * 0.35,
              duration: 0.6,
            })
          } else {
            gsap.to(ctaRef.current, {
              x: 0,
              y: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.3)",
            })
          }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
      }
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen w-full bg-[#020202] flex flex-col selection:bg-primary selection:text-primary-foreground overflow-hidden"
    >
      {/* 3D Canvas Background — Desktop only. Mobile gets a CSS gradient to prevent overheating */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
        {isMobileDevice ? (
          // Pure CSS background for mobile — identical look, zero GPU load
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'radial-gradient(ellipse 80% 60% at 60% 40%, #061820 0%, #020202 70%)',
            }}
          />
        ) : (
          <Canvas
            camera={{ position: [0, 0, 60], fov: 35 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <ambientLight intensity={0.4} />
            <spotLight position={[50, 50, 50]} intensity={3} />
            <LiquidBackground />
            <Monolith />
          </Canvas>
        )}
      </div>

      {/* 2D Overlay */}
      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col md:flex-row p-6 sm:p-8 md:p-14 lg:p-20 min-h-screen items-center md:items-stretch gap-8 lg:gap-10"
      >
        {/* Left: Main Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between pb-8 md:pb-6 w-full">
          {/* Logo Badge */}
          <div className="hero-badge flex items-center gap-3">
            <img
              src={BRAND.logo}
              alt={BRAND.name}
              className="h-16 md:h-20 lg:h-24 w-auto"
              width="480"
              height="480"
              decoding="async"
            />
          </div>

          {/* Headline */}
          <div className="max-w-3xl md:max-w-4xl lg:max-w-4xl xl:max-w-3xl pr-0 md:pr-8 mt-16 md:mt-20">
            <h1 className="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-white">
              Diseñamos tu próxima página web.
            </h1>
            <div className="flex flex-wrap items-baseline gap-x-[0.45em] mt-1">
              <span className="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold leading-[1.2] tracking-tight text-white whitespace-nowrap">Una que</span>
              <GooeyText
                texts={["vende sola", "trabaja 24/7", "cierra clientes", "agenda citas"]}
                morphTime={1.5}
                cooldownTime={1.2}
                textClassName="text-[clamp(1.35rem,3.8vw,3.25rem)] font-bold text-primary whitespace-nowrap leading-[1.2]"
              />
            </div>
            <p className="mt-8 md:mt-10 text-sm md:text-base text-white/50 max-w-lg leading-relaxed font-light">
              {COPY.hero.subtitle}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 mt-12 md:mt-14">
            <button
              ref={ctaRef}
              onClick={() => {
                trackCTAClick("hero")
                openChatWithIntent(COPY.hero.ctaIntent)
              }}
              className="w-fit flex items-center gap-5 group"
              aria-label="Solicitar auditoría de fugas gratuita - Chatear con Eureka"
            >
              <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:glow-cyan transition-all duration-500 overflow-hidden">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="group-hover:stroke-primary-foreground stroke-primary transition-colors duration-500"
                >
                  <path
                    d="M7 17L17 7M17 7H8M17 7V16"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-sm font-semibold text-white uppercase tracking-widest">
                {COPY.hero.cta}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Pilar Cards - Hidden on tablets and standard desktops to avoid collision with H1 */}
        <div className="hidden 2xl:flex w-80 flex-shrink-0 flex-col gap-4 justify-center z-20">
          {COPY.pillaresOverview.pilares.map((pilar) => (
            <div
              key={pilar.num}
              className="hero-card glass rounded-2xl p-6 sm:p-7 hover:glass-strong transition-all duration-500"
            >
              <span className="text-[10px] text-white/25 uppercase tracking-[0.2em] font-medium block mb-3">
                {pilar.num} // {pilar.name}
              </span>
              <p className="text-sm text-white/60 leading-snug">
                {pilar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ExperienceHero
