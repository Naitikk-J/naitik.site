import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const socials = [
  { icon: Github, href: "https://github.com/Naitikk-J", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/naitik-jain-9290b8324", label: "LinkedIn" },
  { icon: Mail, href: "mailto:Naitikjainjbp@gmail.com", label: "Email" },
];

// Individual letter animation for the name
const nameLetters = "Naitik Jain".split("");

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -240]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.3, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.8]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const orbRotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient floating orbs */}
      <motion.div
        style={{ rotate: orbRotate }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-[15%] top-[20%] h-[30vmin] w-[30vmin] rounded-full bg-skill-blue/[0.03] blur-[80px] animate-float-orb" />
        <div className="absolute right-[20%] top-[30%] h-[25vmin] w-[25vmin] rounded-full bg-skill-purple/[0.04] blur-[60px] animate-float-orb-reverse" />
        <div className="absolute bottom-[25%] left-[40%] h-[20vmin] w-[20vmin] rounded-full bg-skill-green/[0.025] blur-[50px] animate-float-orb" />
      </motion.div>

      {/* Central glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 hero-glow"
      />
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.025] blur-3xl"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        {/* Status badge */}
        <motion.span
          style={{ y: badgeY }}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease, delay: 0 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border/60 bg-secondary/30 px-5 py-2 text-[10px] font-medium tracking-[0.22em] text-muted-foreground backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-skill-green opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-skill-green shadow-[0_0_12px_hsl(var(--skill-green))]" />
          </span>
          OPEN TO OPPORTUNITIES — 2026
        </motion.span>

        {/* Name — letter-by-letter reveal */}
        <motion.h1
          style={{ y: titleY }}
          className="text-balance text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-7xl md:text-8xl lg:text-9xl"
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.5,
                ease,
                delay: 0.05 + i * 0.02,
              }}
              className="inline-block"
              style={{ display: letter === " " ? "inline" : "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease, delay: 0.3 }}
            className="text-skill-blue/60"
          >
            .
          </motion.span>
        </motion.h1>

        {/* Title */}
        <motion.p
          style={{ y: subY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.2 }}
          className="mt-6 text-sm font-medium tracking-[0.15em] text-skill-blue/80 sm:text-base"
        >
          FULL STACK ENGINEER — AI · BLOCKCHAIN · REAL-TIME SYSTEMS
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.25 }}
          className="mt-6 max-w-xl text-balance text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          I build scalable full-stack systems, real-time applications, and decentralized
          platforms with a focus on performance and real-world impact.
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: 0.3 }}
          className="mt-4 flex items-center gap-1.5 text-xs tracking-[0.15em] text-muted-foreground/60"
        >
          <MapPin size={12} />
          JABALPUR, INDIA
        </motion.div>

        {/* CTA + Social */}
        <motion.div
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.35 }}
          className="mt-12 flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, boxShadow: "0 0 50px hsl(0 0% 100% / 0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-xs font-medium tracking-[0.18em] text-background"
            >
              VIEW PROJECTS
              <motion.span
                className="inline-block"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, borderColor: "hsl(0 0% 40%)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative inline-flex items-center gap-2 rounded-full border border-border/80 px-7 py-3.5 text-xs font-medium tracking-[0.18em] text-muted-foreground hover:text-foreground"
            >
              LET'S CONNECT
            </motion.a>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            {socials.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ y: -4, scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-muted-foreground/50 transition-colors duration-300 hover:text-foreground"
                >
                  <Icon size={18} strokeWidth={1.5} />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        style={{ opacity: glowOpacity }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-7 w-4 items-start justify-center rounded-full border border-muted-foreground/25 pt-1.5"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5], height: [4, 8, 4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-0.5 rounded-full bg-muted-foreground/50"
          />
        </motion.div>
        <span className="text-[9px] tracking-[0.3em] text-muted-foreground/40">SCROLL</span>
      </motion.div>
    </section>
  );
};

export default Hero;