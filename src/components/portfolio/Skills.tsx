import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

const skillCategories = [
  {
    title: "Languages",
    color: "bg-skill-green",
    borderHover: "hover:border-skill-green/30",
    items: ["C++", "JavaScript (ES6+)", "TypeScript", "Python"],
  },
  {
    title: "Frontend / Mobile",
    color: "bg-skill-blue",
    borderHover: "hover:border-skill-blue/30",
    items: ["React", "React Native", "Three.js / WebGL", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend & APIs",
    color: "bg-skill-orange",
    borderHover: "hover:border-skill-orange/30",
    items: ["Node.js", "Express.js", "Socket.io", "REST APIs", "Redis", "JWT Auth", "System Design"],
  },
  {
    title: "GenAI & AI",
    color: "bg-skill-cyan",
    borderHover: "hover:border-skill-cyan/30",
    items: ["LLM API Integration", "OpenAI", "Gemini", "Prompt Engineering", "AI App Dev"],
  },
  {
    title: "Database & Cloud",
    color: "bg-skill-purple",
    borderHover: "hover:border-skill-purple/30",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase", "AWS S3"],
  },
  {
    title: "DevOps",
    color: "bg-skill-green",
    borderHover: "hover:border-skill-green/30",
    items: ["Docker", "Kubernetes", "GitHub Actions", "Vercel", "Render", "Postman", "Git"],
  },
  {
    title: "Blockchain & Web3",
    color: "bg-skill-yellow",
    borderHover: "hover:border-skill-yellow/30",
    items: ["Ethereum", "Solidity", "Hardhat", "Web3.js", "MetaMask", "Smart Contracts"],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const progressBar = progressRef.current;
    if (!section || !stage) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReducedMotion || !isLargeScreen) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    const ctx = gsap.context(() => {
      gsap.set(cards, { opacity: 0, y: 60, scale: 0.94, rotateX: 12 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: stage,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
          },
          i * 0.6,
        );
      });

      if (progressBar) {
        tl.fromTo(
          progressBar,
          { scaleX: 0 },
          { scaleX: 1, duration: cards.length * 0.6, ease: "none" },
          0,
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      <div ref={stageRef} className="relative flex w-full items-center justify-center lg:min-h-screen">
        <div className="pointer-events-none absolute left-[10%] top-[20%] h-[30vmin] w-[30vmin] rounded-full bg-skill-purple/[0.02] blur-[80px] animate-float-orb" />
        <div className="pointer-events-none absolute right-[5%] bottom-[20%] h-[25vmin] w-[25vmin] rounded-full bg-skill-green/[0.02] blur-[70px] animate-float-orb-reverse" />

        <div className="relative mx-auto w-full max-w-5xl">
          <div className="mb-12 md:mb-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground"
            >
              — SKILLS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              A toolkit refined over <span className="shimmer-text">years of craft</span>.
            </motion.h2>

            {/* Pinned-section progress bar (large screens only) */}
            <div className="mt-6 hidden h-px w-full origin-left bg-border/40 lg:block">
              <div
                ref={progressRef}
                className="h-full w-full origin-left bg-gradient-to-r from-skill-blue via-skill-purple to-skill-green"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((cat, i) => (
              <div
                key={cat.title}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                data-cursor
                className={`glass-card group rounded-2xl p-6 ${cat.borderHover}`}
                style={{ willChange: "transform, opacity" }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${cat.color} transition-transform duration-300 group-hover:scale-[2]`} />
                  <h3 className="text-[11px] font-medium tracking-[0.2em] text-foreground">
                    {cat.title.toUpperCase()}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((skill) => (
                    <span
                      key={skill}
                      className="skill-tag cursor-default rounded-lg border border-border/40 bg-secondary/50 px-3 py-1.5 text-[11px] font-medium text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
