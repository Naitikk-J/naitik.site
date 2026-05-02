import { motion } from "framer-motion";
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
  return (
    <section id="skills" className="relative w-full px-6 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16 flex flex-col items-center text-center md:mb-24"
        >
          <span className="mb-4 text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — SKILLS
          </span>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            A toolkit refined<br className="hidden sm:block" /> over years of craft.
          </h2>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-5 md:gap-7">
          {skills.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="group relative"
              >
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;