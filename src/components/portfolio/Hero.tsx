import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: title rises, fades, scales as you scroll
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const subY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.4, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
    >
      {/* Subtle ambient glow */}
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute inset-0 hero-glow"
      />
      <motion.div
        style={{ scale: glowScale, opacity: glowOpacity }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground/[0.04] blur-3xl"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center"
      >
        <motion.span
          style={{ y: badgeY }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border/80 bg-secondary/40 px-4 py-1.5 text-[10px] font-medium tracking-[0.22em] text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-skill-green shadow-[0_0_12px_hsl(var(--skill-green))]" />
          AVAILABLE FOR WORK — 2026
        </motion.span>

        <motion.h1
          style={{ y: titleY }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="text-balance text-7xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl md:text-9xl"
        >
          Dhruvin<span className="text-muted-foreground/60">.</span>
        </motion.h1>

        <motion.p
          style={{ y: subY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="mt-8 max-w-xl text-balance text-base font-light leading-relaxed text-muted-foreground sm:text-lg"
        >
          Building AI-powered systems &amp; scalable products with a relentless
          focus on craft, performance, and detail.
        </motion.p>

        <motion.div
          style={{ y: ctaY }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.75 }}
          className="mt-12 flex flex-col items-center gap-5 sm:flex-row sm:gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-medium tracking-[0.18em] text-background transition-all duration-300 hover:bg-foreground/90 hover:shadow-[0_0_40px_hsl(0_0%_100%/0.25)]"
          >
            VIEW WORK
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="group relative text-xs font-medium tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            GET IN TOUCH
            <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        style={{ opacity: glowOpacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-muted-foreground/70"
      >
        SCROLL
      </motion.div>
    </section>
  );
};

export default Hero;