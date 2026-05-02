import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Code2, Sparkles, Layers, Cpu, Boxes } from "lucide-react";

const skills = [
  {
    name: "Engineering",
    icon: Code2,
    bg: "bg-skill-green",
    glow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--skill-green)/0.55)]",
  },
  {
    name: "Design",
    icon: Sparkles,
    bg: "bg-skill-yellow",
    glow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--skill-yellow)/0.55)]",
  },
  {
    name: "AI Systems",
    icon: Cpu,
    bg: "bg-skill-blue",
    glow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--skill-blue)/0.55)]",
  },
  {
    name: "Product",
    icon: Layers,
    bg: "bg-skill-orange",
    glow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--skill-orange)/0.55)]",
  },
  {
    name: "Infrastructure",
    icon: Boxes,
    bg: "bg-skill-purple",
    glow: "hover:shadow-[0_20px_60px_-15px_hsl(var(--skill-purple)/0.55)]",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Heading slides in from left, fades as it leaves
  const headingX = useTransform(scrollYProgress, [0, 0.4], [-80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3, 0.85, 1], [0, 1, 1, 0.4]);

  // Whole card row drifts horizontally as you scroll through
  const rowX = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative w-full overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-16 flex flex-col items-center text-center md:mb-24"
        >
          <span className="mb-4 text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — SKILLS
          </span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            A toolkit refined<br className="hidden sm:block" /> over years of craft.
          </h2>
        </motion.div>

        <motion.div
          style={{ x: rowX }}
          className="flex flex-wrap items-center justify-center gap-5 md:flex-nowrap md:gap-7"
        >
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <SkillCard key={s.name} index={i} progress={scrollYProgress}>
                <div
                  className={`relative flex h-36 w-36 items-center justify-center rounded-3xl ${s.bg} shadow-xl transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-[1.04] group-hover:rotate-[-2deg] ${s.glow} sm:h-40 sm:w-40 md:h-44 md:w-44`}
                >
                  <Icon
                    className="h-14 w-14 text-background sm:h-16 sm:w-16"
                    strokeWidth={2.25}
                  />
                </div>
                <p className="mt-4 text-center text-[11px] font-medium tracking-[0.2em] text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
                  {s.name.toUpperCase()}
                </p>
              </SkillCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

const SkillCard = ({
  index,
  progress,
  children,
}: {
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  children: React.ReactNode;
}) => {
  // Stagger entry by index — each card rises and fades in slightly later
  const start = 0.1 + index * 0.06;
  const end = start + 0.35;
  const y = useTransform(progress, [start, end], [120, 0]);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -8 : 8, 0]);

  return (
    <motion.div style={{ y, opacity, rotate }} className="group relative">
      {children}
    </motion.div>
  );
};

export default Skills;