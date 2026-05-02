import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-background/60 border-b border-border/60"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <a
          href="#home"
          className="text-sm font-bold tracking-[0.2em] text-foreground transition-opacity hover:opacity-70"
        >
          DHRUVIN
        </a>
        <ul className="hidden items-center gap-8 md:flex lg:gap-12">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="group relative text-[11px] font-medium tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground md:hidden"
        >
          MENU
        </a>
      </nav>
    </motion.header>
  );
};

export default Navbar;