import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import lamarLeft from "@/assets/lamar-left.png";
import lamarRight from "@/assets/lamar-right.png";

gsap.registerPlugin(ScrollTrigger);

export function SpeedMeterCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const [leftImageError, setLeftImageError] = useState(false);
  const [rightImageError, setRightImageError] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftImageRef.current,
        { x: -220, opacity: 0, rotate: -12, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          rotate: -2,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: leftImageRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: false,
            markers: false,
          },
        }
      );

      gsap.fromTo(
        rightImageRef.current,
        { x: 220, opacity: 0, rotate: 12, scale: 0.96 },
        {
          x: 0,
          opacity: 1,
          rotate: 2,
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: rightImageRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: false,
            markers: false,
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100vh] overflow-hidden flex items-center justify-center bg-black px-6 py-24"
      style={{
        background:
          "radial-gradient(circle at top, rgba(98,43,255,0.16), transparent 45%), #000",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(168,85,247,0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(124,58,237,0.22), transparent 25%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative max-w-7xl w-full z-10">
        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div
            ref={leftImageRef}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(148,74,255,0.2)]"
            style={{
              minHeight: 420,
              background: leftImageError
                ? "linear-gradient(180deg, rgba(29, 15, 72, 0.85), rgba(12, 4, 24, 0.95))"
                : `linear-gradient(rgba(9,4,14,0.25), rgba(45,8,76,0.35)), url(${lamarLeft}) center/cover no-repeat`,
            }}
          >
            {!leftImageError && (
              <img
                src={lamarLeft}
                alt="Lamar cinematic left"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setLeftImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2b0662]/30 via-[#3d0b78]/20 to-[#09040e]/40" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-2 ring-purple-400/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white/80 mb-2">LAMAR</div>
                <div className="text-sm uppercase tracking-[0.35em] text-white/70">
                  {leftImageError ? "Image unavailable" : "Left Image"}
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-6 text-center text-sm uppercase tracking-[0.35em] text-white/70">
              {leftImageError ? "Fallback background active" : "Lamar Left Placeholder"}
            </div>
          </div>

          <div
            ref={rightImageRef}
            className="relative overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(148,74,255,0.2)]"
            style={{
              minHeight: 420,
              background: rightImageError
                ? "linear-gradient(180deg, rgba(29, 15, 72, 0.85), rgba(12, 4, 24, 0.95))"
                : `linear-gradient(rgba(9,4,14,0.25), rgba(45,8,76,0.35)), url(${lamarRight}) center/cover no-repeat`,
            }}
          >
            {!rightImageError && (
              <img
                src={lamarRight}
                alt="Lamar cinematic right"
                className="absolute inset-0 h-full w-full object-cover"
                onError={() => setRightImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2b0662]/30 via-[#3d0b78]/20 to-[#09040e]/40" />
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-2 ring-purple-400/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-white/80 mb-2">LAMAR</div>
                <div className="text-sm uppercase tracking-[0.35em] text-white/70">
                  {rightImageError ? "Image unavailable" : "Right Image"}
                </div>
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-6 text-center text-sm uppercase tracking-[0.35em] text-white/70">
              {rightImageError ? "Fallback background active" : "Lamar Right Placeholder"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
