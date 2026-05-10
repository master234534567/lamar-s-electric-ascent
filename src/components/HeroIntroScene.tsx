import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroIntroScene({ onComplete }: { onComplete?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const silhouetteRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rimLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !silhouetteRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete?.();
        // Pin the hero section
        ScrollTrigger.create({
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "bottom top",
          markers: false,
        });
      },
    });

    // Stadium lights flicker on
    tl.add("lights", 0);
    const lights = containerRef.current.querySelectorAll(".stadium-light");
    lights.forEach((light, i) => {
      tl.fromTo(
        light,
        { opacity: 0 },
        { opacity: [0, 0.8, 0.5, 1], duration: 0.6, ease: "power2.inOut" },
        `lights+=${i * 0.15}`
      );
    });

    // Silhouette fade in through smoke
    tl.fromTo(
      silhouetteRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(20px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
      "lights+=0.3"
    );

    // Purple neon rim light animation
    if (rimLightRef.current) {
      tl.fromTo(
        rimLightRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 0.8, scale: 1, duration: 1, ease: "power2.out" },
        "lights+=0.5"
      );

      // Infinite glow pulse
      gsap.to(rimLightRef.current, {
        opacity: [0.6, 1, 0.6],
        duration: 2,
        repeat: -1,
        ease: "sine.inOut",
      });
    }

    // Text reveal
    if (textRef.current) {
      const words = textRef.current.querySelectorAll("span");
      tl.fromTo(
        words,
        { opacity: 0, y: 20, letterSpacing: "0.5em" },
        { opacity: 1, y: 0, letterSpacing: "0.1em", duration: 0.8, stagger: 0.2 },
        "lights+=1"
      );
    }

    // Scroll-triggered zoom in effect
    gsap.to(silhouetteRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        markers: false,
      },
      scale: 1.1,
      opacity: 0.5,
      ease: "none",
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-black"
      style={{
        background:
          "radial-gradient(ellipse at center top, oklch(0.25 0.18 300 / 0.7), transparent 60%), radial-gradient(ellipse at center, oklch(0.05 0.02 300), black)",
      }}
    >
      {/* Stadium lights */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="stadium-light absolute pointer-events-none"
          style={{
            width: "100px",
            height: "100px",
            background: `conic-gradient(from 90deg at 50% 100%, transparent 0deg, oklch(0.62 0.28 300 / 0.6) 30deg, transparent 60deg, transparent 300deg, oklch(0.85 0.18 95 / 0.5) 330deg, transparent 360deg)`,
            filter: "blur(30px)",
            left: `${(i * 30) % 100}%`,
            top: `${-20 + (i % 3) * 10}%`,
            opacity: 0,
          }}
        />
      ))}

      {/* Smoke and fog particles */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: `${100 + (i % 5) * 50}px`,
              height: `${80 + (i % 4) * 40}px`,
              background: `radial-gradient(ellipse at center, oklch(0.42 0.18 300 / 0.2), transparent 70%)`,
              filter: "blur(40px)",
              left: `${(i * 23) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `drift ${6 + (i % 3) * 2}s linear infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          />
        ))}
      </div>

      {/* Drifting embers */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              background: i % 2 === 0 ? "var(--ravens-gold)" : "var(--ravens-purple-glow)",
              boxShadow: `0 0 ${5 + (i % 5)}px currentColor`,
              left: `${(i * 31) % 100}%`,
              top: `${(i * 47) % 100}%`,
              animation: `driftEmber ${8 + (i % 4) * 2}s ease-in infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Main silhouette */}
      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="relative">
          {/* Rim light */}
          <div
            ref={rimLightRef}
            className="absolute -top-10 -right-14 w-32 h-32 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse at 30% 30%, oklch(0.55 0.18 300 / 0.8), oklch(0.25 0.12 300 / 0.2))",
              boxShadow:
                "0 0 80px var(--ravens-purple-glow), inset 0 0 80px var(--ravens-purple-glow)",
              filter: "blur(20px)",
            }}
          />

          {/* Silhouette */}
          <div
            ref={silhouetteRef}
            className="relative"
            style={{
              filter:
                "drop-shadow(0 0 100px var(--ravens-purple-glow)) contrast(1.3) saturate(1.5)",
            }}
          >
            {/* Replace with your actual Lamar image - update src path */}
            {/* To integrate: Save your Lamar ASCENSION image as: src/assets/lamar-ascension.png */}
            {/* Then uncomment the img tag and comment out the placeholder div */}
            
            {/* <img
              src={import.meta.url + '/../assets/lamar-ascension.png'}
              alt="Lamar Jackson - Ascension"
              className="w-auto max-h-[500px]"
            /> */}
            
            {/* Placeholder - Replace with actual image */}
            <div
              className="flex items-center justify-center"
              style={{
                width: "300px",
                height: "500px",
                background: "linear-gradient(135deg, var(--ravens-purple) 0%, var(--ravens-gold) 100%)",
                borderRadius: "20px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "white",
                  textAlign: "center",
                  textShadow: "0 0 20px black",
                }}
              >
                LAMAR<br />ASCENSION
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text reveal */}
      <div className="absolute inset-x-0 bottom-20 z-20 text-center">
        <div
          ref={textRef}
          className="font-black tracking-tighter text-white"
          style={{
            fontFamily: "Impact, 'Arial Black', sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 7rem)",
            lineHeight: 0.85,
            textShadow: "0 0 40px var(--ravens-purple-glow)",
          }}
        >
          <span className="inline-block">LAMAR</span>
          <br />
          <span className="inline-block" style={{ color: "var(--ravens-gold)" }}>
            JACKSON
          </span>
          <br />
          <span className="inline-block text-2xl">— UNDENIABLE —</span>
        </div>
      </div>

      <style>{`
        @keyframes drift {
          0%, 100% { transform: translateX(0) translateY(0); opacity: 0; }
          10% { opacity: 0.3; }
          50% { opacity: 0.5; transform: translateX(50px) translateY(-80px); }
          90% { opacity: 0.3; }
        }
        
        @keyframes driftEmber {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
