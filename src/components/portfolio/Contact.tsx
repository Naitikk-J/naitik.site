import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, ArrowUpRight, Phone } from "lucide-react";
import { useMagneticTilt } from "@/hooks/useMagneticTilt";

const ease = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "Naitikjainjbp@gmail.com",
    href: "mailto:Naitikjainjbp@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 74709 36868",
    href: "tel:+917470936868",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Naitikk-J",
    href: "https://github.com/Naitikk-J",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Naitik Jain",
    href: "https://linkedin.com/in/naitik-jain-9290b8324",
  },
];

const SCRAMBLE_CHARS = "!<>-_\\/[]{}—=+*^?#________";

/**
 * Cycles random characters per letter until it converges on the target text.
 * Triggered when the element first scrolls into view.
 */
const ScrambleText = ({ text, className = "" }: { text: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [output, setOutput] = useState(text);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOutput(text);
      return;
    }

    let frame = 0;
    const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];
    const oldText = output;
    const length = Math.max(oldText.length, text.length);
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40) + 10;
      queue.push({ from, to, start, end });
    }

    let rafId: number;
    const update = () => {
      let result = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const q = queue[i];
        if (frame >= q.end) {
          complete++;
          result += q.to;
        } else if (frame >= q.start) {
          if (!q.char || Math.random() < 0.28) {
            q.char = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          }
          result += q.char;
        } else {
          result += q.from;
        }
      }
      setOutput(result);
      if (complete < queue.length) {
        frame++;
        rafId = requestAnimationFrame(update);
      }
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, text]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {output}
    </span>
  );
};

const ContactCard = ({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) => {
  const tiltRef = useMagneticTilt<HTMLAnchorElement>({ maxTilt: 5, maxOffset: 5 });
  return (
    <a
      ref={tiltRef}
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      data-cursor
      className="tilt-card group flex items-center gap-4 rounded-xl border border-border/60 bg-card/30 px-6 py-4 backdrop-blur-sm transition-colors duration-300 hover:border-border hover:bg-card/60"
    >
      <Icon
        size={18}
        className="text-muted-foreground transition-colors group-hover:text-foreground"
        strokeWidth={1.5}
      />
      <div className="text-left">
        <p className="text-[10px] tracking-[0.15em] text-muted-foreground/60">
          {label.toUpperCase()}
        </p>
        <p className="text-sm text-foreground">{value}</p>
      </div>
      <ArrowUpRight
        size={14}
        className="ml-auto text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
};

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [80, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25, 0.9, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mb-12 md:mb-16"
        >
          <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — LET'S CONNECT
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <ScrambleText text="Got a challenge?" className="scramble-char" />{" "}
            <span className="gradient-text">
              <ScrambleText text="Let's build." />
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mx-auto mb-12 max-w-lg text-base font-light leading-relaxed text-muted-foreground"
        >
          I'm actively building high-performance systems in AI, real-time applications,
          and blockchain. Open to internships, collaborations, and challenging engineering problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactLinks.map((c) => (
            <ContactCard key={c.label} {...c} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mt-12"
        >
          <a
            href="mailto:Naitikjainjbp@gmail.com"
            data-cursor
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-xs font-medium tracking-[0.18em] text-background transition-all duration-300 hover:bg-foreground/90 hover:shadow-[0_0_50px_hsl(0_0%_100%/0.2)]"
          >
            SAY HELLO
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
