import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface GoatModeEasterEggProps {
  silhouetteElement: HTMLElement | null;
  active?: boolean;
}

export function GoatModeEasterEgg({ silhouetteElement, active = true }: GoatModeEasterEggProps) {
  const [isActivated, setIsActivated] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const glowRef = useRef<HTMLDivElement>(null);
  const wingsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!silhouetteElement || !active) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleMouseEnter = () => {
      if (isActivated) return;
      setIsActivated(true);

      // Calculate position
      const rect = silhouetteElement.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width / 2,
      });

      // Glow burst
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          {
            scale: 0,
            opacity: 1,
          },
          {
            scale: 3,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          }
        );
      }

      // Wings animation
      if (wingsRef.current) {
        gsap.fromTo(
          wingsRef.current,
          {
            opacity: 0,
            scale: 0.5,
            rotate: -30,
          },
          {
            opacity: 1,
            scale: 1,
            rotate: 0,
            duration: 0.6,
            ease: "back.out",
          }
        );

        // Wings flap
        gsap.to(wingsRef.current, {
          rotate: [0, -15, 15, 0],
          duration: 2,
          repeat: 2,
          ease: "sine.inOut",
          delay: 0.2,
        });
      }

      // Text reveal
      if (textRef.current) {
        const words = textRef.current.querySelectorAll("span");
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 20,
            letterSpacing: "0.5em",
          },
          {
            opacity: 1,
            y: 0,
            letterSpacing: "0.1em",
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out",
            delay: 0.3,
          }
        );
      }

      // Auto-deactivate after 4 seconds
      timeoutId = setTimeout(() => {
        setIsActivated(false);
      }, 4000);
    };

    silhouetteElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      silhouetteElement.removeEventListener("mouseenter", handleMouseEnter);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [silhouetteElement, active, isActivated]);

  if (!silhouetteElement) return null;

  return (
    <>
      {/* Purple glow burst */}
      <div
        ref={glowRef}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 50,
          background: "radial-gradient(circle, var(--ravens-purple-glow), transparent)",
          boxShadow: "0 0 100px var(--ravens-purple-glow)",
        }}
      />

      {/* Raven wings */}
      <div
        ref={wingsRef}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 49,
          fontSize: "60px",
          opacity: 0,
        }}
      >
        <span style={{ marginRight: "20px", display: "inline-block" }}>🪶</span>
        <span style={{ marginLeft: "20px", display: "inline-block" }}>🪶</span>
      </div>

      {/* GOAT MODE text */}
      <div
        ref={textRef}
        style={{
          position: "fixed",
          top: position.top + 80,
          left: position.left,
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 48,
          textAlign: "center",
          fontFamily: "Impact, Arial Black, sans-serif",
          fontSize: "32px",
          fontWeight: "900",
          textShadow:
            "0 0 20px var(--ravens-purple-glow), 0 0 40px var(--ravens-gold)",
        }}
      >
        <span style={{ color: "var(--ravens-gold)", marginRight: "8px" }}>⚡</span>
        <span style={{ color: "white" }}>GOAT</span>
        <br />
        <span style={{ color: "var(--ravens-purple-glow)", fontSize: "20px" }}>
          <span>MODE</span>
        </span>
        <span style={{ color: "var(--ravens-gold)", marginLeft: "8px" }}>⚡</span>
      </div>
    </>
  );
}
