import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.22, 1, 0.36, 1] as const;

type Project = {
  name: string;
  subtitle: string;
  year?: string;
  badge?: string;
  description: string;
  tech: string[];
  features: string[];
  live?: string;
  accent: string;
};

const projects: Project[] = [
  {
    name: "Aarunya.in",
    subtitle: "3D Interactive Fest Website",
    year: "2025",
    description:
      "MITS Gwalior's annual fest, built with Three.js and React — immersive 3D scenes, particle effects, and animated event showcases, deployed on a custom domain.",
    tech: ["React", "Three.js", "WebGL", "Tailwind", "Vercel"],
    features: [
      "Optimized WebGL pipeline — smooth 60 FPS across devices",
      "Interactive 3D scenes & particle systems",
      "Animated event showcases & smooth scroll storytelling",
    ],
    live: "https://aarunya.in/",
    accent: "skill-blue",
  },
  {
    name: "TrackMate",
    subtitle: "Decentralized Civic Safety Platform",
    badge: "HackSagon 2026 Finalist",
    description:
      "SIH Travel & Tourism platform with a 4-role architecture — Tourist, Resident, Business, Authority — pairing a React + Socket.IO command dashboard with a Flutter app for every role.",
    tech: ["React", "Node.js", "Socket.io", "Flutter", "Solidity", "Gemini"],
    features: [
      "Sub-50ms real-time geofencing across roles",
      "Offline-first Ghost Queue SOS via Service Workers",
      "AI Risk Pulse (Gemini Analytics) — predicts danger hotspots 60+ min ahead",
      "Solidity smart contracts for tamper-proof E-FIR logging",
    ],
    accent: "skill-green",
  },
  {
    name: "MITS Smart ID Card",
    subtitle: "Campus & Hostel Management Suite",
    year: "2025",
    description:
      "Full-stack hostel platform covering gate access, attendance, library, elections and admin reporting — secured by AES-256 encrypted QR identity cards.",
    tech: ["React 19", "Node.js", "Express", "Redis", "Socket.io", "Flutter", "Docker"],
    features: [
      "Flutter / React Native mobile scanner with real-time Socket.io live feed",
      "RBAC across SUPER_ADMIN → Security Guard tiers, JWT + Redis token blacklisting",
      "GPS geofence attendance, AWS S3 asset pipeline",
      "Docker + CI/CD pipeline for zero-downtime deploys",
    ],
    live: "https://smart-id-frontend-seven.vercel.app/login",
    accent: "skill-purple",
  },
  {
    name: "CRX",
    subtitle: "Carbon Credit Exchange",
    badge: "HackSagon 2025 Finalist · IIIT Gwalior",
    description:
      "Decentralized carbon credit trading platform on Ethereum — transparent, auditable, and secured by smart contracts with MetaMask wallet integration.",
    tech: ["Solidity", "Hardhat", "Web3.js", "React", "MetaMask"],
    features: [
      "Ethereum smart contracts deployed via Hardhat",
      "MetaMask wallet integration for trader auth",
      "Transparent on-chain trade ledger",
    ],
    accent: "skill-yellow",
  },
  {
    name: "ReconnectHub",
    subtitle: "Alumni Networking Platform",
    badge: "Winner · Code Coalescence",
    description:
      "MERN-based alumni network with JWT auth, role-based access, and a real-time notification system — won the national-level Code Coalescence hackathon.",
    tech: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    features: [
      "JWT authentication with role-based access control",
      "Real-time notifications via Socket.io",
      "Alumni directory with search + filters",
    ],
    accent: "skill-orange",
  },
  {
    name: "AJDraw",
    subtitle: "Real-Time Collaborative Drawing",
    description:
      "WebSocket-based collaborative canvas with live multi-user sync — event-driven Node.js backend handling concurrent drawing sessions.",
    tech: ["React", "Node.js", "Socket.io"],
    features: [
      "Multi-user real-time canvas sync",
      "Event-driven backend architecture",
      "Lightweight client — runs on low-end devices",
    ],
    accent: "skill-blue",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    if (!section || !pin || !track) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
    if (prefersReducedMotion || !isLargeScreen) return;

    const ctx = gsap.context(() => {
      const computeDistance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -computeDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${computeDistance() + window.innerHeight * 0.4}`,
          pin: pin,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progress) {
        gsap.fromTo(
          progress,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${computeDistance() + window.innerHeight * 0.4}`,
              scrub: true,
            },
          },
        );
      }

      // Recompute after fonts/images settle.
      const recompute = () => ScrollTrigger.refresh();
      window.addEventListener("load", recompute);
      return () => {
        window.removeEventListener("load", recompute);
        tween.kill();
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full"
    >
      {/* Pinned stage (large screens only) */}
      <div ref={pinRef} className="relative hidden h-screen w-full overflow-hidden lg:block">
        <div className="pointer-events-none absolute inset-0 flex items-start justify-start px-6 pt-24 md:px-12 md:pt-28">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="mb-3 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground"
            >
              — PROJECTS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease }}
              className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl"
            >
              Systems built for <span className="gradient-text">real-world impact</span>.
            </motion.h2>

            {/* Horizontal scroll progress */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-40 origin-left bg-border/40 md:w-56">
                <div
                  ref={progressRef}
                  className="h-full w-full origin-left bg-gradient-to-r from-skill-blue via-skill-purple to-skill-green"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
              <span className="text-[9px] tracking-[0.3em] text-muted-foreground/60">
                SCROLL TO TRAVERSE
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="absolute inset-0 flex items-center">
          <div
            ref={trackRef}
            className="h-scroll-track items-stretch gap-8 px-[10vw]"
          >
            {projects.map((p, i) => (
              <article
                key={p.name}
                data-cursor
                className="h-scroll-panel project-card group relative flex w-[78vw] max-w-[640px] flex-col justify-between rounded-3xl border border-border/60 bg-card/40 p-8 backdrop-blur-md md:p-10"
              >
                {/* Index pill */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full bg-${p.accent}`} />
                    <span className="text-[10px] font-medium tracking-[0.22em] text-muted-foreground">
                      {p.subtitle.toUpperCase()}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-3xl font-semibold text-foreground sm:text-4xl">
                      {p.name}
                    </h3>
                    {p.year && (
                      <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground/60">
                        {p.year}
                      </span>
                    )}
                  </div>
                  {p.badge && (
                    <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full border border-${p.accent}/30 bg-${p.accent}/10 px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-${p.accent}`}>
                      <span className={`h-1.5 w-1.5 rounded-full bg-${p.accent}`} />
                      {p.badge.toUpperCase()}
                    </span>
                  )}
                  <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
                    {p.description}
                  </p>

                  <ul className="mt-6 space-y-2">
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

                <div className="mt-8 flex items-end justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-border/40 bg-secondary/60 px-2.5 py-1 text-[10px] font-medium tracking-wider text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.live ? (
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor
                      className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink size={14} />
                      LIVE
                    </a>
                  ) : (
                    <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground/50">
                      <Sparkles size={12} />
                      IN DEVELOPMENT
                    </span>
                  )}
                </div>
              </article>
            ))}

            {/* End-cap card */}
            <article className="h-scroll-panel flex w-[40vw] max-w-[420px] flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/20 p-10 text-center backdrop-blur-md">
              <p className="text-[10px] tracking-[0.3em] text-muted-foreground">— END OF REEL</p>
              <h3 className="mt-4 text-balance text-2xl font-semibold text-foreground">
                More shipping soon.
              </h3>
              <p className="mt-3 text-sm font-light text-muted-foreground">
                Continue scrolling for experience & contact.
              </p>
            </article>
          </div>
        </div>
      </div>

      {/* Mobile / tablet / reduced-motion fallback — vertical list */}
      <div className="px-6 py-24 md:py-28 lg:hidden">
        <div className="mx-auto max-w-5xl">
          <span className="mb-4 block text-[10px] font-medium tracking-[0.3em] text-muted-foreground">
            — PROJECTS
          </span>
          <h2 className="mb-12 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Systems built for <span className="gradient-text">real-world impact</span>.
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <motion.article
                key={p.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease }}
                className="project-card flex flex-col rounded-2xl border border-border/60 bg-card/30 p-6 backdrop-blur-sm"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full bg-${p.accent}`} />
                    <span className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground">
                      {p.subtitle.toUpperCase()}
                    </span>
                  </div>
                  {p.year && (
                    <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50">
                      {p.year}
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground">{p.name}</h3>
                {p.badge && (
                  <span className={`mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-${p.accent}/30 bg-${p.accent}/10 px-2.5 py-0.5 text-[9px] font-medium tracking-[0.15em] text-${p.accent}`}>
                    <span className={`h-1 w-1 rounded-full bg-${p.accent}`} />
                    {p.badge.toUpperCase()}
                  </span>
                )}
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
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <ExternalLink size={13} />
                    LIVE
                  </a>
                )}
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
