import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ThrowPowerScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const footballRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !footballRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    // Football spiral toward camera
    tl.fromTo(
      footballRef.current,
      {
        x: -500,
        y: 200,
        z: -500,
        rotationX: 0,
        rotationY: 0,
        rotationZ: 45,
        scale: 0.2,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        z: 200,
        rotationX: 360,
        rotationY: 1080,
        rotationZ: 360,
        scale: 1.2,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
      }
    );

    // Glow effect on laces
    gsap.to(".football-lace", {
      boxShadow:
        "0 0 30px var(--ravens-gold), inset 0 0 20px var(--ravens-gold)",
      duration: 0.5,
      stagger: 0.1,
    });

    // Text reveal
    if (textRef.current) {
      const words = textRef.current.querySelectorAll("span");
      tl.fromTo(
        words,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "back.out" },
        0.3
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-black px-6 py-24"
      style={{
        perspective: "1000px",
        background:
          "radial-gradient(circle at center, oklch(0.25 0.18 300 / 0.4), black 70%)",
      }}
    >
      {/* Movement trails */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background:
                i % 2 === 0 ? "var(--ravens-gold)" : "var(--ravens-purple-glow)",
              left: `calc(50% - ${50 - i * 10}px)`,
              top: `calc(50% + ${100 + i * 30}px)`,
              opacity: 0.6 - i * 0.07,
              blur: `${i * 2}px`,
              animation: `trailFade 1s ease-out forwards`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div
          style={{
            perspective: "1200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
            marginBottom: "60px",
          }}
        >
          {/* Football */}
          <div
            ref={footballRef}
            style={{
              width: "120px",
              height: "70px",
              background: "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #8B4513 100%)",
              borderRadius: "50%",
              position: "relative",
              boxShadow:
                "0 0 60px rgba(212, 175, 55, 0.8), inset -10px -10px 30px rgba(0,0,0,0.3)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Laces */}
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="football-lace absolute w-1 h-12"
                style={{
                  background: "linear-gradient(90deg, #F4E4C1 0%, #FFF 50%, #F4E4C1 100%)",
                  left: `calc(50% - 2px + ${(i - 1) * 20}px)`,
                  top: "50%",
                  transform: "translateY(-50%)",
                  borderRadius: "2px",
                  boxShadow: "0 0 15px var(--ravens-gold)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Text revealed */}
        <div
          ref={textRef}
          className="text-center"
          style={{
            fontFamily: "Impact, 'Arial Black', sans-serif",
          }}
        >
          <div
            className="uppercase tracking-[0.3em] text-sm text-white/60 mb-4"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.3s both",
            }}
          >
            Enter The Stadium
          </div>
          <h2
            className="font-black uppercase text-6xl md:text-8xl leading-tight text-white mb-4"
            style={{
              textShadow: "0 0 40px var(--ravens-purple-glow)",
            }}
          >
            <span>ARM</span>
            <br />
            <span style={{ color: "var(--ravens-gold)" }}>TALENT</span>
            <br />
            <span className="text-3xl">Undeniable</span>
          </h2>
          <p
            className="text-white/60 uppercase tracking-widest text-xs mt-6"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.6s both",
            }}
          >
            Precision met with raw power
          </p>
        </div>
      </div>

      <style>{`
        @keyframes trailFade {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
