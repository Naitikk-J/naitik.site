import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import Skills from "@/components/portfolio/Skills";
import useLenis from "@/hooks/useLenis";

const Index = () => {
  useLenis();
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <Skills />
      <footer className="border-t border-border/60 px-6 py-10 text-center text-[10px] tracking-[0.3em] text-muted-foreground">
        © 2026 DHRUVIN — CRAFTED WITH CARE
      </footer>
    </main>
  );
};

export default Index;
