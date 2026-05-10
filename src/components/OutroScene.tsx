import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function OutroScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const embersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Fade to black
      gsap.fromTo(
        containerRef.current,
        {
          backgroundColor: "#000",
          opacity: 0,
        },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "center center",
            scrub: 1,
            markers: false,
          },
        }
      );

      // Text reveal animation
      const words = textRef.current?.querySelectorAll(".outro-word");
      if (words) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 50,
            letterSpacing: "0.5em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.1em",
            duration: 1,
            stagger: 0.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top center+=100px",
              markers: false,
            },
          }
        );
      }

      // Glow pulse on text
      gsap.to(textRef.current, {
        textShadow: "0 0 60px var(--ravens-purple-glow), 0 0 120px var(--ravens-gold)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Drifting embers animation
      if (embersRef.current) {
        const embers = embersRef.current.querySelectorAll(".ember");
        embers.forEach((ember, i) => {
          gsap.to(ember, {
            y: "-100vh",
            x: Math.random() * 100 - 50,
            opacity: 0,
            duration: 8 + Math.random() * 4,
            repeat: -1,
            ease: "none",
            delay: i * 0.5,
          });
        });
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Drifting purple embers */}
      <div ref={embersRef} className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="ember absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? "var(--ravens-gold)" : "var(--ravens-purple-glow)",
              left: `${Math.random() * 100}%`,
              top: "100%",
              boxShadow: `0 0 ${10 + Math.random() * 10}px currentColor`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      {/* Main text */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{
          fontFamily: "Impact, 'Arial Black', sans-serif",
        }}
      >
        <h1
          className="font-black uppercase text-5xl md:text-7xl leading-tight mb-8 text-white"
          style={{
            textShadow: "0 0 20px var(--ravens-purple-glow)",
            lineHeight: 1.2,
          }}
        >
          <div className="outro-word mb-4">
            You don't watch
          </div>
          <div
            className="outro-word mb-4"
            style={{
              fontSize: "clamp(3rem, 10vw, 8rem)",
              color: "var(--ravens-gold)",
              textShadow:
                "0 0 40px var(--ravens-gold), 0 0 80px var(--ravens-purple-glow)",
            }}
          >
            L A M A R
          </div>
          <div className="outro-word">You</div>
        </h1>

        <div
          className="text-3xl font-black uppercase tracking-[0.2em] text-white mt-12"
          style={{
            textShadow: "0 0 30px var(--ravens-purple-glow)",
          }}
        >
          <div className="outro-word mb-2">W I T N E S S</div>
          <div
            className="outro-word"
            style={{
              color: "var(--ravens-gold)",
              fontSize: "3.5rem",
            }}
          >
            H I M
          </div>
        </div>

        {/* Bottom message */}
        <div
          className="mt-20 text-xs uppercase tracking-[0.4em] text-white/50"
          style={{
            animation: "fadeInUp 1s ease-out 2.5s both",
          }}
        >
          The Legacy Continues...
        </div>
      </div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
          zIndex: 1,
        }}
      />

      <style>{`
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
