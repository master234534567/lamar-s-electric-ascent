import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { LamarCursor } from "@/components/LamarCursor";
import { NetflixIntro } from "@/components/NetflixIntro";
import { HeroIntroScene } from "@/components/HeroIntroScene";
import { CategoryFilter } from "@/components/CategoryFilter";
import { HighlightCards } from "@/components/HighlightCards";
import { SpeedMeterCinematic } from "@/components/SpeedMeterCinematic";
import { ThrowPowerScene } from "@/components/ThrowPowerScene";
import { OutroScene } from "@/components/OutroScene";
import { JokeEasterEgg } from "@/components/JokeEasterEgg";
import { useLenisScroll } from "@/hooks/use-lenis-scroll";
import { GoatModeEasterEgg } from "@/components/GoatModeEasterEgg";

gsap.registerPlugin(ScrollTrigger);

export function LamarSite() {
  const [introDone, setIntroDone] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [autoScroll, setAutoScroll] = useState(true);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const lenis = useLenisScroll();

  useEffect(() => {
    if (!autoScroll) return;

    let frameId: number | null = null;
    let lastTime = performance.now();

    const step = (time: number) => {
      const delta = Math.min(time - lastTime, 40);
      lastTime = time;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY < maxScroll - 2) {
        const distance = Math.min(delta * 0.06, maxScroll - window.scrollY);
        const nextScroll = Math.min(maxScroll, window.scrollY + distance);

        if (lenis) {
          lenis.scrollTo(nextScroll, { duration: 0.18, easing: (t: number) => t });
        } else {
          window.scrollBy({ top: distance, left: 0, behavior: "auto" });
        }

        frameId = requestAnimationFrame(step);
      } else {
        frameId = null;
      }
    };

    const cancelAutoScroll = () => setAutoScroll(false);
    window.addEventListener("wheel", cancelAutoScroll, { passive: true });
    window.addEventListener("touchstart", cancelAutoScroll, { passive: true });
    window.addEventListener("keydown", cancelAutoScroll, { passive: true });

    frameId = requestAnimationFrame(step);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      window.removeEventListener("wheel", cancelAutoScroll);
      window.removeEventListener("touchstart", cancelAutoScroll);
      window.removeEventListener("keydown", cancelAutoScroll);
    };
  }, [autoScroll, lenis]);

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      {/* Netflix-style intro */}
      <NetflixIntro onDone={() => setIntroDone(true)} />

      {/* Custom cursor */}
      <LamarCursor />

      <button
        type="button"
        onClick={() => setAutoScroll((current) => !current)}
        className="fixed right-6 bottom-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-purple-400/30 bg-black/85 text-[10px] font-bold uppercase tracking-[0.12em] text-white shadow-[0_0_30px_rgba(148,74,255,0.45)] transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400"
        style={{
          boxShadow: "0 0 35px rgba(148,74,255,0.35), inset 0 0 14px rgba(124,58,237,0.2)",
        }}
      >
        <span className="whitespace-pre-line text-center leading-none">
          {autoScroll ? "Auto Scroll" : "Manual Scroll"}
        </span>
      </button>

      {/* Main content - fade in after intro */}
      {introDone && (
        <>
          {/* HERO INTRO SCENE - Stadium lights, silhouette, purple glow, text reveal */}
          <div ref={silhouetteRef}>
            <HeroIntroScene onComplete={() => {}} />
          </div>

          {/* CATEGORY FILTER BUTTONS - Ripple animations */}
          <section
            className="relative bg-black px-6 py-16"
            style={{
              background:
                "radial-gradient(circle at center, oklch(0.15 0.12 300 / 0.3), black 70%)",
            }}
          >
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-center font-black uppercase mb-12 text-4xl md:text-5xl"
                style={{
                  textShadow: "0 0 30px var(--ravens-purple-glow)",
                  fontFamily: "Impact, sans-serif",
                }}
              >
                Filter Highlights
              </h2>
              <CategoryFilter
                activeCategory={activeCategory as any}
                onFilter={(cat) => setActiveCategory(cat)}
              />
            </div>
          </section>

          {/* HIGHLIGHT CARDS with animations */}
          <HighlightCards activeCategory={activeCategory} />

          {/* SPEEDOMETER SECTION - Scroll-driven gauge, flame burst */}
          <SpeedMeterCinematic />

          {/* THROW POWER SECTION - Football spiral, motion blur, laces glow */}
          <ThrowPowerScene />

          {/* OUTRO SCENE - Fade to black, glowing text, drifting embers */}
          <OutroScene />

          {/* JOKE EASTER EGG - Warning message */}
          <JokeEasterEgg />

          {/* GOAT MODE EASTER EGG - Hover silhouette for hidden effect */}
          <GoatModeEasterEgg silhouetteElement={silhouetteRef.current} active={!autoScroll} />
        </>
      )}
    </div>
  );
}
