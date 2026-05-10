import { useState, useRef } from "react";
import gsap from "gsap";

type Category = "ALL" | "SPEED" | "ARM_TALENT" | "AWARDS" | "RECORDS" | "PLAYOFFS";

interface CategoryFilterProps {
  onFilter?: (category: Category) => void;
  activeCategory?: Category;
}

const categories: { label: string; value: Category }[] = [
  { label: "ALL", value: "ALL" },
  { label: "SPEED", value: "SPEED" },
  { label: "ARM TALENT", value: "ARM_TALENT" },
  { label: "AWARDS", value: "AWARDS" },
  { label: "RECORDS", value: "RECORDS" },
  { label: "PLAYOFFS", value: "PLAYOFFS" },
];

export function CategoryFilter({ onFilter, activeCategory = "ALL" }: CategoryFilterProps) {
  const [active, setActive] = useState<Category>(activeCategory);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleClick = (category: Category, index: number) => {
    setActive(category);
    onFilter?.(category);

    // Ripple animation
    const button = buttonsRef.current[index];
    if (button) {
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.pointerEvents = "none";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(212, 175, 55, 0.6)";
      ripple.style.transform = "scale(0)";

      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = 0;
      const y = 0;

      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";

      button.appendChild(ripple);

      gsap.to(ripple, {
        scale: 2,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12 px-4">
      {categories.map((cat, i) => (
        <button
          key={cat.value}
          ref={(el) => {
            buttonsRef.current[i] = el;
          }}
          onClick={() => handleClick(cat.value, i)}
          className="relative overflow-hidden px-6 py-3 rounded-full font-bold uppercase text-sm tracking-wider transition-all duration-300"
          style={{
            background: active === cat.value
              ? "linear-gradient(135deg, var(--ravens-purple) 0%, var(--ravens-gold) 100%)"
              : "transparent",
            color: active === cat.value ? "white" : "var(--ravens-gold)",
            border: `2px solid ${active === cat.value ? "var(--ravens-gold)" : "var(--ravens-purple)"}`,
            boxShadow: active === cat.value
              ? "0 0 20px var(--ravens-gold), inset 0 0 20px var(--ravens-gold)"
              : "none",
            transform: active === cat.value ? "translateY(-2px)" : "translateY(0)",
          }}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
