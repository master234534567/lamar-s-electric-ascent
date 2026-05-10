export function JokeEasterEgg() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black px-6 py-32">
      {/* Subtle gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, oklch(0.1 0.04 300), black)",
        }}
      />

      {/* Joke container */}
      <div
        className="relative z-10 max-w-3xl text-center"
        style={{
          animation: "fadeIn 1s ease-out both",
        }}
      >
        <div
          className="text-xs uppercase tracking-[0.4em] text-white/40 mb-8"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.2s both",
          }}
        >
          ⚠️ Warning
        </div>

        <div
          className="font-black text-2xl md:text-4xl leading-relaxed text-white/80"
          style={{
            fontFamily: "Impact, sans-serif",
            textShadow: "0 0 20px var(--ravens-purple-glow)",
            animation: "fadeInUp 0.8s ease-out 0.4s both",
          }}
        >
          Watching too many Lamar highlights may cause your jaw to drop
          <br />
          <span style={{ color: "var(--ravens-gold)" }}>
            harder than a rookie cornerback trying to tackle him.
          </span>
        </div>

        <p
          className="mt-12 text-white/40 text-sm uppercase tracking-wider"
          style={{
            animation: "fadeInUp 0.8s ease-out 0.6s both",
          }}
        >
          Side effects include: increased confidence, raven pride, inevitable comparisons to other QBs
        </p>

        {/* Visual gag - falling jaw emoji trail */}
        <div
          className="mt-16 text-6xl"
          style={{
            animation: "jawDrop 2s ease-in infinite",
          }}
        >
          😱
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
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

        @keyframes jawDrop {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(20px) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
