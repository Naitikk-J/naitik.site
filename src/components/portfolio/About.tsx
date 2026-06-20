import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { GraduationCap, Code, Trophy } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const highlights = [
  { icon: Code, value: "8+", numeric: 8, suffix: "+", label: "Apps Deployed", accent: "skill-blue" },
  { icon: Trophy, value: "6+", numeric: 6, suffix: "+", label: "Hackathons Shipped", accent: "skill-yellow" },
  { icon: GraduationCap, value: "B.Tech", numeric: null, suffix: "", label: "IT — AI & Robotics", accent: "skill-green" },
];

/**
 * Counts a number up to `to` once it scrolls into view, then holds.
 * Falls back to the static value when prefers-reduced-motion is set.
 */
const CountUp = ({ to, suffix = "" }: { to: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useMotionValueEvent(motionValue, "change", (v) => {
    setDisplay(`${Math.round(v as number)}${suffix}`);
  });

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(`${to}${suffix}`);
      return;
    }
    const controls = animate(motionValue, to, { duration: 1.4, ease });
    return () => controls.stop();
  }, [inView, motionValue, suffix, to]);

  return <span ref={ref}>{display}</span>;
};

/**
 * Splits text into words and reveals each on scroll-into-view with a stagger.
 * Accepts ReactNode children so emphasized spans stay intact (rare, but
 * for our copy each emphasized phrase is wrapped in its own word group).
 */
const RevealWords = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.035, delayChildren: delay }}
      className="inline"
    >
      {wordize(children)}
    </motion.span>
  );
};

const wordVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.65, ease } },
};

/**
 * Recursively walks a ReactNode tree and wraps every word in an animated
 * span so we get per-word stagger even through nested <span> emphasis.
 */
function wordize(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((token, i) => {
      if (token.trim() === "") return token;
      return (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {token}
        </motion.span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((n, i) => <span key={i}>{wordize(n)}</span>);
  if (typeof node === "object" && node && "props" in node) {
    const element = node as React.ReactElement<{ children?: ReactNode }>;
    return {
      ...element,
      props: { ...element.props, children: wordize(element.props.children) },
    };
  }
  return node;
}

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
          {/* Bio — word-by-word reveal */}
          <div className="md:col-span-3">
            {[
              <>
                <span className="text-foreground font-medium">Student who ships.</span> B.Tech IT
                (AI & Robotics) at MITS Gwalior — 6+ hackathons, 8+ deployed apps, and a track
                record of building full-stack systems that real users actually use.
              </>,
              <>
                My work spans <span className="text-foreground">MERN</span>,{" "}
                <span className="text-foreground">GenAI</span>,{" "}
                <span className="text-foreground">blockchain</span>, and{" "}
                <span className="text-foreground">3D web</span> — from AES-encrypted APIs and
                WebSocket real-time engines to Solidity smart contracts and Three.js scenes.
                National-level hackathon winner and multi-time finalist.
              </>,
              <>
                Right now I'm levelling up in{" "}
                <span className="text-foreground">DevOps</span>,{" "}
                <span className="text-foreground">system design</span>, and{" "}
                <span className="text-foreground">React Native mobile</span> — building toward
                scalable, production-grade systems.
              </>,
            ].map((content, i) => (
              <p
                key={i}
                className={`${i > 0 ? "mt-5" : ""} text-base font-light leading-[1.85] text-muted-foreground sm:text-lg`}
              >
                <RevealWords delay={i * 0.1}>{content}</RevealWords>
              </p>
            ))}
          </div>

          {/* Highlight cards — column on mobile, row of compact cards on sm, column again in sidebar on md+ */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:col-span-2 md:grid-cols-1 md:gap-5">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.div
                  key={h.label}
                  data-cursor
                  initial={{ opacity: 0, y: 20, scale: 0.95, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.1 }}
                  whileHover={{ scale: 1.04, y: -4, rotateX: 4, rotateY: -4 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="glass-card rounded-2xl p-4 sm:p-5"
                >
                  <motion.div
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon size={18} className={`mb-3 text-${h.accent}`} strokeWidth={1.5} />
                  </motion.div>
                  <p className="text-xl font-semibold text-foreground tabular-nums sm:text-2xl">
                    {h.numeric !== null ? <CountUp to={h.numeric} suffix={h.suffix} /> : h.value}
                  </p>
                  <p className="mt-1 text-[10px] tracking-[0.12em] text-muted-foreground sm:text-[11px]">{h.label}</p>
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
