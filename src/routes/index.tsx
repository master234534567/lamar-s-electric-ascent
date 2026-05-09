import { createFileRoute } from "@tanstack/react-router";
import { LamarSite } from "@/components/LamarSite";

export const Route = createFileRoute("/")({
  component: LamarSite,
  head: () => ({
    meta: [
      { title: "LAMAR JACKSON — The Franchise" },
      { name: "description", content: "A cinematic, scroll-driven tribute to Lamar Jackson. Speed. Arm talent. MVP. The Franchise." },
    ],
  }),
});

function Streaks({ count = 6 }: { count?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="streak" style={{ top: `${(i * 17) % 100}%`, animationDelay: `${i * 0.25}s`, animationDuration: `${1.2 + (i % 3) * 0.4}s` }} />
      ))}
    </div>
  );
}

function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            width: 2 + (i % 4),
            height: 2 + (i % 4),
            background: i % 3 === 0 ? "var(--ravens-gold)" : "var(--ravens-purple-glow)",
            boxShadow: "0 0 10px currentColor",
          }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 3 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const ySil = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [bolt, setBolt] = useState(false);
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 30 && !bolt) setBolt(true); };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [bolt]);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center top, oklch(0.25 0.18 300 / 0.7), transparent 60%), radial-gradient(ellipse at center, oklch(0.05 0.02 300), black)" }} />
        <div className="absolute inset-x-0 top-0 h-1/2" style={{ background: "conic-gradient(from 90deg at 50% 100%, transparent 0deg, oklch(0.62 0.28 300 / 0.4) 30deg, transparent 60deg, transparent 300deg, oklch(0.85 0.18 95 / 0.3) 330deg, transparent 360deg)", filter: "blur(20px)" }} />
      </motion.div>

      <Particles />
      {/* fog */}
      <div className="absolute bottom-0 inset-x-0 h-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse at bottom, oklch(0.42 0.18 300 / 0.6), transparent 70%)", filter: "blur(40px)" }} />

      {/* lightning flash */}
      {bolt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 30% 40%, oklch(0.85 0.3 300 / 0.8), transparent 50%)" }}
        />
      )}

      <motion.div style={{ y: ySil }} className="relative z-10 flex min-h-screen items-center justify-center">
        <div className="relative">
          <motion.img
            src={lamarSmoke}
            alt="Lamar Jackson silhouette in smoke"
            className="max-h-[80vh] w-auto"
            style={{ filter: "drop-shadow(0 0 80px var(--ravens-purple-glow)) contrast(1.2) saturate(1.3)" }}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
          />
          {/* football */}
          <motion.div
            className="absolute -top-10 -right-10 w-20 h-12 rounded-[50%]"
            style={{ background: "radial-gradient(ellipse at 30% 30%, oklch(0.55 0.18 60), oklch(0.25 0.12 40))", boxShadow: "0 0 40px var(--ravens-gold)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      <div className="absolute inset-x-0 bottom-20 z-20 text-center">
        <motion.h1
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-black tracking-tighter text-white"
          style={{ fontFamily: "Impact, 'Arial Black', sans-serif", fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.85, textShadow: "0 0 40px var(--ravens-purple-glow)" }}
        >
          ERA OF <span style={{ color: "var(--ravens-gold)" }}>EIGHT</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-4 text-sm uppercase tracking-[0.5em] text-white/60">
          Scroll · Witness Greatness
        </motion.p>
      </div>
    </section>
  );
}

function DualThreat() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const stats = [
    { k: "PASS YDS", v: "16,689" },
    { k: "RUSH YDS", v: "6,173" },
    { k: "TOTAL TDs", v: "256" },
    { k: "WINS", v: "70+" },
  ];
  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden py-32" style={{ background: "var(--gradient-hype)" }}>
      <motion.div animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="absolute inset-0" style={{ background: "radial-gradient(circle at 20% 50%, var(--ravens-purple-glow), transparent 50%)" }} />
      <Streaks count={4} />
      <div className="relative grid lg:grid-cols-2 gap-12 px-8 max-w-7xl mx-auto items-center">
        <motion.div style={{ x }} className="relative">
          <img src={lamarRun} alt="Lamar running" className="w-full rounded-2xl" style={{ boxShadow: "var(--shadow-glow)", border: "2px solid var(--ravens-gold)" }} />
          <div className="absolute inset-0 rounded-2xl" style={{ background: "linear-gradient(45deg, transparent 60%, oklch(0.85 0.18 95 / 0.2))" }} />
        </motion.div>
        <div>
          <motion.h2 initial={{ x: 100, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} className="font-black uppercase mb-12" style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.9, color: "white", textShadow: "0 0 30px var(--ravens-purple-glow)" }}>
            DUAL<br/><span style={{ color: "var(--ravens-gold)" }}>THREAT</span>
          </motion.h2>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.k} initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15, type: "spring", stiffness: 80 }} className="border-l-4 pl-4" style={{ borderColor: "var(--ravens-gold)" }}>
                <div className="text-xs uppercase tracking-widest text-white/60">{s.k}</div>
                <div className="font-black text-4xl md:text-5xl text-white" style={{ fontFamily: "Impact, sans-serif" }}>{s.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MVPSeason() {
  const items = [
    { n: "3,678", l: "PASS YDS" },
    { n: "1,206", l: "RUSH YDS" },
    { n: "36", l: "PASS TDs" },
    { n: "100%", l: "MVP" },
  ];
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-32 bg-black">
      {/* spotlight beams */}
      {[0,1,2,3].map(i => (
        <motion.div key={i} className="absolute top-0 w-[200px] h-full" style={{ left: `${10 + i*22}%`, background: `linear-gradient(${i%2?15:-15}deg, transparent, oklch(0.85 0.18 95 / 0.15), transparent)`, filter: "blur(20px)" }} animate={{ opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 2 + i*0.4, repeat: Infinity }} />
      ))}
      {/* confetti */}
      {Array.from({length: 30}).map((_,i) => (
        <motion.div key={i} className="absolute w-2 h-3" style={{ left: `${(i*31)%100}%`, top: -20, background: i%2 ? "var(--ravens-gold)" : "var(--ravens-purple-glow)" }} animate={{ y: ["0vh","110vh"], rotate: [0, 720] }} transition={{ duration: 6 + (i%4), repeat: Infinity, delay: i*0.3, ease: "linear" }} />
      ))}
      <div className="relative z-10 text-center px-8">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-sm uppercase tracking-[0.5em] mb-4" style={{ color: "var(--ravens-gold)" }}>2019 · 2023</motion.div>
        <motion.h2 initial={{ scale: 0.5, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ type: "spring" }} className="font-black uppercase mb-16 glow-text" style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(4rem, 14vw, 12rem)", lineHeight: 0.85, color: "var(--ravens-gold)" }}>MVP</motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((it, i) => (
            <motion.div key={it.l} initial={{ scale: 0, rotate: -10 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ delay: i*0.15, type: "spring", stiffness: 200 }} whileHover={{ scale: 1.1 }}>
              <div className="font-black text-5xl md:text-6xl text-white" style={{ fontFamily: "Impact, sans-serif", textShadow: "0 0 30px var(--ravens-purple-glow)" }}>{it.n}</div>
              <div className="text-xs uppercase tracking-widest text-white/60 mt-2">{it.l}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SpeedBreaker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "100%"]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, 8, 0]);
  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black flex items-center">
      <Streaks count={10} />
      <motion.img src={lamarRun} alt="Lamar sprinting" style={{ x, filter: useTransform(blur, b => `blur(${b}px) drop-shadow(0 0 40px var(--ravens-gold))`) }} className="absolute top-1/2 -translate-y-1/2 h-[60vh] z-10" />
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <motion.h2 initial={{ opacity: 0, scale: 1.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="font-black uppercase text-center" style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(3rem, 12vw, 11rem)", lineHeight: 0.85, color: "white", WebkitTextStroke: "2px var(--ravens-gold)", WebkitTextFillColor: "transparent" }}>
          FASTEST<br/>ON THE<br/>FIELD
        </motion.h2>
      </div>
    </section>
  );
}

function ArmTalent() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.2, 6]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 1080]);
  const opacity = useTransform(scrollYProgress, [0.5, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative min-h-[150vh] overflow-hidden bg-black">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <img src={lamarPoint} alt="crowd" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ filter: "blur(8px) saturate(1.4)" }} />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div style={{ scale, rotate, opacity }} className="absolute z-10 w-32 h-20 rounded-[50%]" >
          <div className="w-full h-full rounded-[50%]" style={{ background: "radial-gradient(ellipse at 30% 30%, oklch(0.55 0.18 60), oklch(0.18 0.1 30))", boxShadow: "0 0 60px var(--ravens-gold), inset 0 0 30px black" }} />
        </motion.div>
        <motion.h2 initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative z-20 font-black uppercase text-center" style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.85, color: "white", textShadow: "0 0 40px var(--ravens-purple-glow)" }}>
            ARM<br/><span style={{ color: "var(--ravens-gold)" }}>TALENT</span>
        </motion.h2>
      </div>
    </section>
  );
}

function Franchise() {
  return (
    <section className="relative min-h-screen overflow-hidden py-32" style={{ background: "linear-gradient(180deg, black, oklch(0.18 0.12 300), black)" }}>
      <div className="absolute inset-0 noise opacity-50" />
      <Streaks count={3} />
      <div className="relative max-w-6xl mx-auto px-8 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, scale: 1.1 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative scanlines overflow-hidden rounded-2xl">
          <img src={lamarTunnel} alt="Lamar tunnel entrance" className="w-full" style={{ filter: "saturate(1.4) contrast(1.2)" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, transparent 50%, oklch(0.42 0.18 300 / 0.4))" }} />
        </motion.div>
        <div>
          <motion.div initial={{ width: 0 }} whileInView={{ width: 60 }} viewport={{ once: true }} className="h-1 mb-6" style={{ background: "var(--ravens-gold)" }} />
          <motion.h2 initial={{ y: 60, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} className="font-black uppercase mb-6" style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(3rem, 9vw, 7rem)", lineHeight: 0.85, color: "white" }}>
            THE<br/><span style={{ color: "var(--ravens-gold)", textShadow: "0 0 40px var(--ravens-gold)" }}>FRANCHISE</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="text-white/70 text-lg max-w-md leading-relaxed">
            One city. One number. One legacy in motion. Baltimore beats with every snap, every scramble, every spiral. The tunnel opens — and the era continues.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Outro() {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-black px-8 py-32 overflow-hidden">
      <Particles />
      <motion.h2
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 80 }}
        className="relative z-10 text-center font-black uppercase glow-text"
        style={{ fontFamily: "Impact, sans-serif", fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9, color: "var(--ravens-gold)" }}
      >
        LAMAR JACKSON<br/>IS THE BESSST
      </motion.h2>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1 }} className="absolute bottom-10 right-10 text-white/50 uppercase tracking-[0.4em] text-sm">
        — Ben
      </motion.div>
    </section>
  );
}

function Index() {
  const [introDone, setIntroDone] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const m = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 20);
      my.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", m);
    return () => window.removeEventListener("mousemove", m);
  }, [mx, my]);

  return (
    <div className="relative bg-black text-white">
      <NetflixIntro onDone={() => setIntroDone(true)} />
      <LamarCursor />
      {introDone && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Hero />
          <DualThreat />
          <MVPSeason />
          <SpeedBreaker />
          <ArmTalent />
          <Franchise />
          <Outro />
        </motion.div>
      )}
    </div>
  );
}
