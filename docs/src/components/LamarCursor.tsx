import { useEffect, useRef } from "react";

export function LamarCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (ref.current) {
        ref.current.style.left = e.clientX + "px";
        ref.current.style.top = e.clientY + "px";
      }
      trailsRef.current.forEach((t, i) => {
        setTimeout(() => {
          if (!t) return;
          t.style.left = e.clientX + "px";
          t.style.top = e.clientY + "px";
          t.style.opacity = String(0.4 - i * 0.08);
        }, i * 40);
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => { if (el) trailsRef.current[i] = el; }}
          className="lamar-cursor"
          style={{ width: 20 - i * 3, height: 14 - i * 2, opacity: 0 }}
        />
      ))}
      <div ref={ref} className="lamar-cursor" />
    </>
  );
}
