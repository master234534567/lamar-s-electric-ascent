import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function useCinematicEngine() {
  useEffect(() => {
    // Enable smooth scrolling with GSAP
    ScrollTrigger.normalizeScroll(true);

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return {
    gsap,
    ScrollTrigger,
    pinSection: (trigger: any, duration: number = 1) => {
      ScrollTrigger.create({
        trigger,
        pin: true,
        start: "top top",
        end: `+=${duration * 100}%`,
        markers: false,
      });
    },
  };
}
