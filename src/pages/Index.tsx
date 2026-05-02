import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Experience from "@/components/portfolio/Experience";
import Contact from "@/components/portfolio/Contact";
import CubesBackground from "@/components/portfolio/CubesBackground";
import useLenis from "@/hooks/useLenis";

const Divider = () => (
  <div className="mx-auto max-w-5xl px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
  </div>
);

const Index = () => {
  useLenis();
  return (
    <>
      {/* Fixed 3D cubes background */}
      <CubesBackground />

      {/* Content layer */}
      <main className="relative z-10 min-h-screen w-full overflow-x-hidden text-foreground">
        <Navbar />
        <Hero />
        <Divider />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Experience />
        <Divider />
        <Contact />
        <footer className="border-t border-border/40 px-6 py-10 text-center backdrop-blur-sm">
          <p className="text-[10px] tracking-[0.3em] text-muted-foreground">
            © 2026 NAITIK JAIN — BUILT WITH PRECISION
          </p>
        </footer>
      </main>
    </>
  );
};

export default Index;
