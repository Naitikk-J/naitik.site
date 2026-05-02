import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const projects = [
  {
    name: "Aarunya.in",
    subtitle: "3D Interactive Fest Website",
    description:
      "Immersive 3D website for MITS Gwalior's annual fest using Three.js and React — real-time animations with optimized WebGL rendering hitting smooth 60 FPS.",
    tech: ["React", "Three.js", "WebGL", "Tailwind"],
    features: [
      "Interactive 3D scenes & particle effects",
      "Optimized rendering pipeline — 60 FPS",
      "Deployed on Vercel with custom domain",
    ],
    github: "#",
    live: "https://aarunya.in/",
    accent: "skill-blue",
  },
  {
    name: "TrackMate",
    subtitle: "Decentralized Civic Safety Platform",
    description:
      "Real-time civic safety system with geofencing, SOS alerts, and AI-based risk prediction — built for safer travel environments with blockchain-backed integrity.",
    tech: ["React", "Node.js", "Socket.io", "Flutter", "Solidity"],
    features: [
      "Sub-50ms real-time geofencing",
      "Offline-first SOS queue via Service Workers",
      "AI risk prediction — Gemini Analytics",
      "Blockchain tamper-proof E-FIR logging",
    ],
    github: "#",
    live: "#",
    accent: "skill-green",
  },
  {
    name: "MITS Smart ID Card",
    subtitle: "Campus Management System",
    description:
      "Full-stack campus management with secure QR-based identity, real-time tracking, and role-based access control — processing thousands of scans daily.",
    tech: ["React", "Node.js", "Redis", "AWS S3", "Socket.io"],
    features: [
      "AES-256 encrypted QR identity",
      "Role-based access control (RBAC)",
      "Real-time admin dashboard",
      "GPS-based attendance system",
    ],
    github: "#",
    live: "https://smart-id-frontend-seven.vercel.app/login",
    accent: "skill-purple",
  },
  {
    name: "CRX",
    subtitle: "Carbon Credit Exchange",
    description:
      "Decentralized carbon credit trading platform on Ethereum — transparent, auditable, and secured by smart contracts.",
    tech: ["Solidity", "Hardhat", "Web3.js", "React"],
    features: [
      "Blockchain-based transparent trading",
      "Smart contract execution",
      "Secure wallet integration",
    ],
    github: "#",
    accent: "skill-yellow",
  },
  {
    name: "ReconnectHub",
    subtitle: "Alumni Networking Platform",
    description:
      "MERN-based alumni networking platform with JWT authentication, role-based access, and real-time notification system.",
    tech: ["MongoDB", "Express", "React", "Node.js"],
    features: [
      "JWT authentication flow",
      "Role-based access control",
      "Real-time notifications",
    ],
    github: "#",
    accent: "skill-orange",
  },
  {
    name: "AJDraw",
    subtitle: "Real-Time Drawing App",
    description:
      "Collaborative canvas application with live multi-user synchronization — event-driven architecture handling concurrent drawing sessions.",
    tech: ["React", "Node.js", "Socket.io"],
    features: [
      "Real-time collaboration",
      "Event-driven backend",
      "Multi-user synchronization",
    ],
    github: "#",
    accent: "skill-blue",
  },
];

const Projects = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const headingX = useTransform(scrollYProgress, [0, 0.2], [-60, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0.4]);

  return (
    <section
      ref={ref}
      id="projects"
      className="relative w-full px-6 py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          style={{ x: headingX, opacity: headingOpacity }}
          className="mb-16 md:mb-20"
        >
          <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — PROJECTS
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Systems built for{" "}
            <span className="gradient-text">real-world impact</span>.
          </h2>
        </motion.div>

        {/* Featured projects — first 3, larger cards */}
        <div className="grid gap-6 md:gap-8">
          {projects.slice(0, 3).map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              className="project-card group rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm sm:p-8 md:p-10"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full bg-${p.accent}`} />
                    <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
                      {p.subtitle.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                    {p.description}
                  </p>

                  {/* Features */}
                  <ul className="mt-5 space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-[13px] text-muted-foreground"
                      >
                        <ArrowUpRight
                          size={14}
                          className={`mt-0.5 flex-shrink-0 text-${p.accent}`}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col items-start gap-4 md:items-end">
                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 md:justify-end">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/40 bg-secondary/60 px-2.5 py-1 text-[10px] font-medium tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    {/* <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github size={14} />
                      CODE
                    </a> */}
                    {p.live && (
                      <a
                        href={p.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLink size={14} />
                        LIVE
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Other projects — compact row */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(3).map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="project-card group rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full bg-${p.accent}`} />
                <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
                  {p.subtitle.toUpperCase()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground">{p.name}</h3>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-muted-foreground">
                {p.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/30 bg-secondary/40 px-2 py-0.5 text-[9px] font-medium tracking-wider text-muted-foreground/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-3">
                {/* <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Github size={13} />
                  CODE
                </a> */}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={13} />
                    LIVE
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
