import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";

const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];

/**
 * Vertical dot indicator pinned to the right edge. Tracks the section
 * currently dominant in the viewport and lets the user jump to any section.
 *
 * Two failure modes this guards against:
 *   1. Sections render under a separate <Suspense> boundary and arrive
 *      *after* this component mounts. A MutationObserver re-observes
 *      sections as they appear so the active state stays accurate.
 *   2. Lenis is driving scroll, so native scrollIntoView({ smooth }) is
 *      ignored or fights the inertia. We route clicks through
 *      lenis.scrollTo() when Lenis is active.
 */
const ScrollProgressIndicator = () => {
    const [active, setActive] = useState<string>("home");

    useEffect(() => {
        const observed = new Set<Element>();
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActive(visible.target.id);
            },
            { threshold: [0.25, 0.5, 0.75] },
        );

        const observePending = () => {
            SECTIONS.forEach((s) => {
                const el = document.getElementById(s.id);
                if (el && !observed.has(el)) {
                    observer.observe(el);
                    observed.add(el);
                }
            });
        };

        observePending();

        // Lazy sections may mount after us — keep watching the DOM tree.
        const mo = new MutationObserver(observePending);
        mo.observe(document.body, { childList: true, subtree: true });

        // Once every section is observed we can stop watching the DOM.
        const stopWhenReady = window.setInterval(() => {
            if (observed.size >= SECTIONS.length) {
                mo.disconnect();
                window.clearInterval(stopWhenReady);
            }
        }, 500);

        return () => {
            observer.disconnect();
            mo.disconnect();
            window.clearInterval(stopWhenReady);
        };
    }, []);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const lenis = getLenis();
        if (lenis) {
            lenis.scrollTo(el, { offset: 0, duration: 1.4, lock: true });
        } else {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            aria-label="Section navigation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1 lg:flex"
        >
            {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => handleClick(s.id)}
                        aria-label={`Jump to ${s.label}`}
                        aria-current={isActive ? "true" : undefined}
                        data-cursor
                        type="button"
                        className="group relative flex items-center gap-3 px-3 py-2"
                    >
                        <span
                            className={`overflow-hidden whitespace-nowrap text-[10px] font-medium tracking-[0.22em] transition-all duration-500 ${
                                isActive
                                    ? "max-w-[100px] pr-1 text-foreground opacity-100"
                                    : "max-w-0 text-muted-foreground opacity-0 group-hover:max-w-[100px] group-hover:opacity-70"
                            }`}
                        >
                            {s.label.toUpperCase()}
                        </span>
                        <motion.span
                            animate={{
                                scale: isActive ? 1 : 0.55,
                                opacity: isActive ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className={`block h-2 w-2 rounded-full ${
                                isActive ? "bg-foreground" : "bg-muted-foreground group-hover:bg-foreground/70"
                            }`}
                        />
                    </button>
                );
            })}
        </motion.nav>
    );
};

export default ScrollProgressIndicator;
