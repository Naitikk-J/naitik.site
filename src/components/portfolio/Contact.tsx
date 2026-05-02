import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "Naitikjainjbp@gmail.com",
    href: "mailto:Naitikjainjbp@gmail.com",
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

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingX = useTransform(scrollYProgress, [0, 0.4], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.25, 0.9, 1], [0, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      id="contact"
      className="relative w-full px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-12 md:mb-16"
        >
          <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — LET'S CONNECT
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Got a challenge?{" "}
            <span className="gradient-text">Let's build</span>.
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

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className="mx-auto flex flex-col gap-4 sm:flex-row sm:justify-center"
        >
          {contactLinks.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 rounded-xl border border-border/60 bg-card/30 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/60 hover:-translate-y-1"
              >
                <Icon
                  size={18}
                  className="text-muted-foreground transition-colors group-hover:text-foreground"
                  strokeWidth={1.5}
                />
                <div className="text-left">
                  <p className="text-[10px] tracking-[0.15em] text-muted-foreground/60">
                    {c.label.toUpperCase()}
                  </p>
                  <p className="text-sm text-foreground">{c.value}</p>
                </div>
                <ArrowUpRight
                  size={14}
                  className="ml-auto text-muted-foreground/40 transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            );
          })}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mt-12"
        >
          <a
            href="mailto:Naitikjainjbp@gmail.com"
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
