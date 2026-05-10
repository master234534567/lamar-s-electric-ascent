import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenisScroll() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    try {
      const lenisInstance = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
        gestureDirection: "vertical",
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2.2,
        wheelMultiplier: 2.5,
      });

      const raf = (time: number) => {
        try {
          lenisInstance.raf(time);
          ScrollTrigger.update();
        } catch (e) {
          console.warn("Lenis RAF error:", e);
        }
      };

      gsap.ticker.add(raf);
      setLenis(lenisInstance);

      return () => {
        try {
          gsap.ticker.remove(raf);
          lenisInstance.destroy();
        } catch (e) {
          console.warn("Lenis cleanup error:", e);
        }
      };
    } catch (error) {
      console.warn("Lenis initialization failed:", error);
    }
  }, []);

  return lenis;
}
