import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const skillCategories = [
  {
    title: "Languages",
    color: "bg-skill-green",
    borderHover: "hover:border-skill-green/30",
    items: ["C++", "JavaScript (ES6+)", "Python", "TypeScript"],
  },
  {
    title: "Frontend / Mobile",
    color: "bg-skill-blue",
    borderHover: "hover:border-skill-blue/30",
    items: ["React", "React Native", "Three.js", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend & APIs",
    color: "bg-skill-orange",
    borderHover: "hover:border-skill-orange/30",
    items: ["Node.js", "Express.js", "Socket.io", "REST APIs", "Redis", "JWT Auth"],
  },
  {
    title: "Database & Cloud",
    color: "bg-skill-purple",
    borderHover: "hover:border-skill-purple/30",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Supabase", "AWS S3"],
  },
  {
    title: "Blockchain",
    color: "bg-skill-yellow",
    borderHover: "hover:border-skill-yellow/30",
    items: ["Ethereum", "Solidity", "Hardhat", "Web3.js"],
  },
  {
    title: "Tools",
    color: "bg-skill-green",
    borderHover: "hover:border-skill-green/30",
    items: ["Git", "Docker", "Postman", "Vercel", "Render", "GitHub Actions"],
  },
];

const Skills = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingX = useTransform(scrollYProgress, [0, 0.35], [-80, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.3]);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative w-full overflow-hidden px-6 py-24 md:py-32 lg:py-40"
    >
      {/* Background accents */}
      <div className="pointer-events-none absolute left-[10%] top-[20%] h-[30vmin] w-[30vmin] rounded-full bg-skill-purple/[0.02] blur-[80px] animate-float-orb" />
      <div className="pointer-events-none absolute right-[5%] bottom-[20%] h-[25vmin] w-[25vmin] rounded-full bg-skill-green/[0.02] blur-[70px] animate-float-orb-reverse" />

      <div className="mx-auto max-w-5xl">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-16 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground"
          >
            — SKILLS
          </motion.span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            A toolkit refined over{" "}
            <span className="shimmer-text">years of craft</span>.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className={`glass-card group rounded-2xl p-6 ${cat.borderHover}`}
            >
              <div className="mb-5 flex items-center gap-3">
                <motion.div
                  className={`h-2 w-2 rounded-full ${cat.color}`}
                  whileHover={{ scale: 1.8 }}
                  transition={{ type: "spring", stiffness: 500 }}
                />
                <h3 className="text-[11px] font-medium tracking-[0.2em] text-foreground">
                  {cat.title.toUpperCase()}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 + j * 0.03 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="skill-tag cursor-default rounded-lg border border-border/40 bg-secondary/50 px-3 py-1.5 text-[11px] font-medium text-muted-foreground"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;