import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HighlightCard {
  id: string;
  title: string;
  stat: string;
  description: string;
  category: "SPEED" | "ARM_TALENT" | "AWARDS" | "RECORDS" | "PLAYOFFS";
  color: string;
}

const highlights: HighlightCard[] = [
  {
    id: "1",
    title: "MVP Season",
    stat: "3,678",
    description: "Pass yards in 2019 MVP season",
    category: "AWARDS",
    color: "from-gold to-purple",
  },
  {
    id: "2",
    title: "Rushing King",
    stat: "6,173",
    description: "Career rushing yards",
    category: "RECORDS",
    color: "from-purple to-gold",
  },
  {
    id: "3",
    title: "Speed Demon",
    stat: "21.01",
    description: "MPH top recorded speed",
    category: "SPEED",
    color: "from-gold to-red",
  },
  {
    id: "4",
    title: "Play-Caller",
    stat: "70+",
    description: "Career wins as starter",
    category: "RECORDS",
    color: "from-purple to-pink",
  },
  {
    id: "5",
    title: "Dual Threat",
    stat: "256",
    description: "Total career TDs",
    category: "ARM_TALENT",
    color: "from-red to-gold",
  },
  {
    id: "6",
    title: "Playoff Warrior",
    stat: "4",
    description: "Playoff appearances",
    category: "PLAYOFFS",
    color: "from-pink to-purple",
  },
];

interface HighlightCardsProps {
  activeCategory?: string;
}

export function HighlightCards({ activeCategory = "ALL" }: HighlightCardsProps) {
  const containRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardsRef.current.filter((c) => c !== null);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      // Stagger animation on load
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 100,
          rotate: -5,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: containRef.current,
            start: "top center+=100px",
            markers: false,
          },
        }
      );

      // Hover animations
      cards.forEach((card) => {
        const handleMouseEnter = () => {
          gsap.to(card, {
            y: -20,
            boxShadow: "0 30px 60px rgba(212, 175, 55, 0.5)",
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(card, {
            borderColor: "var(--ravens-gold)",
            filter: "drop-shadow(0 0 30px var(--ravens-gold))",
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            y: 0,
            boxShadow: "0 10px 30px rgba(98, 43, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out",
          });

          gsap.to(card, {
            borderColor: "var(--ravens-purple)",
            filter: "drop-shadow(0 0 10px var(--ravens-purple-glow))",
            duration: 0.3,
          });
        };

        const handleClick = () => {
          gsap.timeline().to(card, {
            x: [-2, 2, -2, 2, 0],
            duration: 0.1,
            ease: "sine.inOut",
          });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("click", handleClick);

        return { card, handleMouseEnter, handleMouseLeave, handleClick };
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const filteredCards = activeCategory === "ALL"
    ? highlights
    : highlights.filter((h) => h.category === activeCategory);

  return (
    <div
      ref={containRef}
      className="relative min-h-screen overflow-hidden py-32 px-6 bg-black"
      style={{
        background:
          "radial-gradient(circle at center, oklch(0.15 0.12 300 / 0.4), black 70%)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <div
          className="text-center mb-24"
          style={{
            animation: "fadeInDown 0.8s ease-out both",
          }}
        >
          <h2
            className="font-black uppercase text-5xl md:text-7xl leading-tight text-white mb-4"
            style={{
              textShadow: "0 0 40px var(--ravens-purple-glow)",
              fontFamily: "Impact, sans-serif",
            }}
          >
            Highlights
          </h2>
          <p className="text-white/60 uppercase tracking-widest text-xs">
            Scroll through the moments that defined the legacy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="group relative overflow-hidden rounded-2xl p-8 border-2 cursor-pointer transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(98,43,255,0.1) 0%, rgba(212,175,55,0.05) 100%)`,
                borderColor: "var(--ravens-purple)",
                boxShadow: "0 10px 30px rgba(98, 43, 255, 0.3)",
                minHeight: "350px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Background gradient animation */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(98,43,255,0.1) 100%)`,
                  zIndex: -1,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                <div
                  className="text-xs uppercase tracking-[0.3em] text-white/40 mb-4"
                  style={{
                    color: `var(--ravens-${card.color.split("-")[0]})`,
                  }}
                >
                  {card.category.replace(/_/g, " ")}
                </div>
                <h3
                  className="font-black text-2xl md:text-3xl text-white mb-2"
                  style={{
                    fontFamily: "Impact, sans-serif",
                    textShadow: "0 0 20px var(--ravens-purple-glow)",
                  }}
                >
                  {card.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {/* Stat highlight */}
              <div
                className="relative z-10 text-5xl font-black text-white"
                style={{
                  textShadow: "0 0 30px var(--ravens-gold)",
                  fontFamily: "Impact, sans-serif",
                }}
              >
                {card.stat}
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, var(--ravens-gold), var(--ravens-purple))`,
                  zIndex: -1,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
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
