import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function NetflixIntro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); onDone(); }, 3800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 noise opacity-30" />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: [0, 1, 1, 1] }}
            transition={{ duration: 2.4, times: [0, 0.4, 0.85, 1] }}
            className="absolute left-0 right-0 top-1/2 h-[2px] bg-[var(--ravens-gold)]"
            style={{ boxShadow: "0 0 30px var(--ravens-gold)" }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0, 0.7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-1/4 top-20 h-24 w-2 rounded-full bg-white/80 shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0, 0.8, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: 0.4, ease: "easeInOut" }}
            className="absolute right-1/4 top-24 h-24 w-2 rounded-full bg-white/80 shadow-[0_0_30px_rgba(255,255,255,0.6)]"
          />
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.5em", scale: 0.7 }}
            animate={{ opacity: [0, 0, 1, 1, 1], letterSpacing: ["0.5em","0.5em","0.2em","0.2em","0.2em"], scale: [0.7,0.7,1,1,1.05] }}
            transition={{ duration: 3.5, times: [0, 0.35, 0.55, 0.85, 1] }}
            className="relative font-black text-center select-none glow-text"
            style={{
              fontFamily: "Impact, 'Arial Black', sans-serif",
              fontSize: "clamp(3rem, 12vw, 11rem)",
              color: "var(--ravens-gold)",
              lineHeight: 0.9,
            }}
          >
            LAMAR<br/>JACKSON
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: ["0%", "0%", "60%", "0%"] }}
            transition={{ duration: 3.5, times: [0, 0.5, 0.7, 1] }}
            className="absolute bottom-1/3 h-[3px] bg-[var(--ravens-gold)]"
            style={{ boxShadow: "0 0 40px var(--ravens-gold)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
