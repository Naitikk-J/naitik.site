import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trophy, Award, Rocket, GraduationCap, Users, Zap } from "lucide-react";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

const ease = [0.22, 1, 0.36, 1] as const;

const experience = [
  {
    icon: Users,
    role: "Technical Co-Head",
    org: "AI Club, MITS Gwalior",
    period: "2024 — Present",
    accent: "skill-blue",
  },
  {
    icon: Zap,
    role: "Technical Member",
    org: "GeeksforGeeks Student Chapter, MITS",
    period: "2024 — Present",
    accent: "skill-green",
  },
];

const achievements = [
  { icon: Trophy, text: "Winner — Code Coalescence Hackathon", accent: "skill-yellow" },
  { icon: Award, text: "Finalist — HackSagon 2026, IIIT Gwalior (TrackMate)", accent: "skill-orange" },
  { icon: Award, text: "Finalist — HackSagon 2025, IIIT Gwalior (CRX)", accent: "skill-orange" },
  { icon: Rocket, text: "Built & deployed 8+ full-stack applications", accent: "skill-blue" },
  { icon: Zap, text: "6+ hackathons shipped across MERN, GenAI, blockchain & 3D web", accent: "skill-purple" },
];

const education = {
  icon: GraduationCap,
  institution: "MITS Gwalior",
  degree: "B.Tech in Information Technology (AI & Robotics)",
  period: "2024 — 2028",
};

const TiltCard = ({
  children,
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  const tiltRef = useMagneticTilt<HTMLDivElement>({ maxTilt: 6, maxOffset: 6 });
  return (
    <div
      ref={tiltRef}
      data-cursor
      className={`tilt-card group rounded-xl border border-border/60 bg-card/30 transition-colors duration-300 hover:border-border hover:bg-card/60 ${className ?? ""}`}
      {...rest}
    >
      <div className="tilt-card-inner">{children}</div>
    </div>
  );
};

const Experience = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingX = useTransform(scrollYProgress, [0, 0.3], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative w-full px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — EXPERIENCE & ACHIEVEMENTS
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Building, leading, <span className="gradient-text">shipping</span>.
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-10">
          {/* Leadership */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease }}
            style={{ transformPerspective: 1200 }}
          >
            <h3 className="mb-6 text-[11px] font-medium tracking-[0.25em] text-muted-foreground">
              LEADERSHIP
            </h3>
            <div className="space-y-5">
              {experience.map((e, i) => {
                const Icon = e.icon;
                return (
                  <motion.div
                    key={e.role}
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                  >
                    <TiltCard className="p-5">
                      <div className="flex items-start gap-4">
                        <div className={`mt-0.5 rounded-lg bg-${e.accent}/10 p-2`}>
                          <Icon size={16} className={`text-${e.accent}`} strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{e.role}</p>
                          <p className="mt-0.5 text-[12px] text-muted-foreground">{e.org}</p>
                          <p className="mt-1 text-[10px] tracking-[0.15em] text-muted-foreground/60">
                            {e.period}
                          </p>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            style={{ transformPerspective: 1200 }}
          >
            <h3 className="mb-6 text-[11px] font-medium tracking-[0.25em] text-muted-foreground">
              ACHIEVEMENTS
            </h3>
            <div className="space-y-4">
              {achievements.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={a.text}
                    initial={{ opacity: 0, x: 20, scale: 0.97 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  >
                    <TiltCard className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon size={16} className={`mt-0.5 flex-shrink-0 text-${a.accent}`} strokeWidth={1.5} />
                        <p className="text-[13px] font-light leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors">
                          {a.text}
                        </p>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            style={{ transformPerspective: 1200 }}
          >
            <h3 className="mb-6 text-[11px] font-medium tracking-[0.25em] text-muted-foreground">
              EDUCATION
            </h3>
            <TiltCard className="p-6">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 rounded-lg bg-skill-blue/10 p-2.5">
                  <GraduationCap size={20} className="text-skill-blue" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-base font-semibold text-foreground">{education.institution}</p>
                  <p className="mt-1 text-[13px] font-light text-muted-foreground">
                    {education.degree}
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.15em] text-muted-foreground/60">
                    {education.period}
                  </p>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
