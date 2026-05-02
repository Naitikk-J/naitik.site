import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Code, Brain } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Code, value: "8+", label: "Full-Stack Apps Built", accent: "skill-blue" },
  { icon: Brain, value: "AI", label: "Systems & Analytics", accent: "skill-purple" },
  { icon: GraduationCap, value: "B.Tech", label: "IT (AI & Robotics)", accent: "skill-green" },
];

const About = () => {
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
      id="about"
      className="relative w-full px-6 py-24 md:py-32 lg:py-40"
    >
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[40vmin] w-[40vmin] rounded-full bg-skill-blue/[0.02] blur-[100px] animate-float-orb-reverse" />

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
            — ABOUT
          </motion.span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Engineering systems that{" "}
            <span className="shimmer-text">scale and last</span>.
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-5 md:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="md:col-span-3"
          >
            {[
              <>
                I'm a <span className="text-foreground font-medium">B.Tech IT (AI & Robotics)</span> student
                at MITS Gwalior with deep focus on full-stack, blockchain, and real-time systems.
              </>,
              <>
                I've built high-performance applications spanning{" "}
                <span className="text-foreground">3D web platforms</span>,{" "}
                <span className="text-foreground">decentralized safety systems</span>, and{" "}
                <span className="text-foreground">real-time collaborative tools</span> — winning
                national-level hackathons along the way.
              </>,
              <>
                My foundation sits on JavaScript, React, and backend engineering — but the goal is
                always the same: <span className="text-foreground">scalable, efficient, impactful products</span>.
              </>,
            ].map((content, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.12 }}
                className={`${i > 0 ? "mt-5" : ""} text-base font-light leading-[1.85] text-muted-foreground sm:text-lg`}
              >
                {content}
              </motion.p>
            ))}
          </motion.div>

          {/* Highlight cards */}
          <div className="flex flex-row gap-4 md:col-span-2 md:flex-col md:gap-5">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.label}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.1 }}
                  whileHover={{ scale: 1.03, y: -3 }}
                  className="glass-card flex-1 rounded-2xl p-5"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={18} className={`mb-3 text-${h.accent}`} strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-2xl font-semibold text-foreground">{h.value}</p>
                  <p className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground">{h.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
