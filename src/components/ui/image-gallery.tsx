import { cn } from "@/lib/utils"
import { COPY } from "@/lib/constants"

export default function ImageGallery() {
    const { images } = COPY.visualShowcase

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
            {/* Desktop View: Interactive expanding accordion */}
            <div className="hidden md:flex items-center gap-3 h-[450px] w-full">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className={cn(
                            "relative flex-1 hover:flex-[3] transition-[flex] duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                            "rounded-2xl overflow-hidden h-full min-w-0",
                            "border border-white/5 shadow-2xl skew-x-0 transform-gpu",
                            "cursor-crosshair group"
                        )}
                    >
                        <img
                            className="h-full w-full object-cover object-center"
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            /* Real dimensions: 862×1080 — displayed at dynamic flex width × 450px */
                            width="862"
                            height="1080"
                            /* Hint browser: collapsed ~150px, expanded ~450px on large screens */
                            sizes="(max-width: 1280px) 25vw, 450px"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                ))}
            </div>

            {/* Mobile View: Fixed 2-column grid — images are 399×499px slots (aspect-[4/5]) */}
            <div className="md:hidden grid grid-cols-2 gap-3 w-full">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10"
                    >
                        <img
                            className="h-full w-full object-cover object-center"
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            decoding="async"
                            /* Real dimensions: 862×1080 */
                            width="862"
                            height="1080"
                            /* On mobile: each cell is ~(50vw - gap) ≈ 180px on a 375px screen */
                            sizes="(max-width: 768px) calc(50vw - 16px), 430px"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
