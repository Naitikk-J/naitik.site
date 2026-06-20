import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];

/**
 * Vertical dot indicator pinned to the right edge. Active dot reflects the
 * section currently dominant in the viewport (via IntersectionObserver).
 * Click a dot to scrollTo that section.
 */
const ScrollProgressIndicator = () => {
    const [active, setActive] = useState<string>("home");

    useEffect(() => {
        const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(
            (el): el is HTMLElement => el !== null,
        );
        if (elements.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
                if (visible?.target.id) setActive(visible.target.id);
            },
            { threshold: [0.25, 0.5, 0.75] },
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <motion.nav
            aria-label="Section navigation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
        >
            {SECTIONS.map((s) => {
                const isActive = active === s.id;
                return (
                    <button
                        key={s.id}
                        onClick={() => handleClick(s.id)}
                        aria-label={`Jump to ${s.label}`}
                        data-cursor
                        className="group relative flex items-center gap-3"
                    >
                        <span
                            className={`overflow-hidden text-[10px] font-medium tracking-[0.22em] transition-all duration-500 ${
                                isActive
                                    ? "max-w-[100px] pr-1 text-foreground opacity-100"
                                    : "max-w-0 text-muted-foreground opacity-0 group-hover:max-w-[100px] group-hover:opacity-70"
                            }`}
                        >
                            {s.label.toUpperCase()}
                        </span>
                        <motion.span
                            animate={{
                                scale: isActive ? 1 : 0.6,
                                opacity: isActive ? 1 : 0.35,
                            }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            className={`block h-1.5 w-1.5 rounded-full ${
                                isActive ? "bg-foreground" : "bg-muted-foreground"
                            }`}
                        />
                    </button>
                );
            })}
        </motion.nav>
    );
};

export default ScrollProgressIndicator;
