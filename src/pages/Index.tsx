import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import useLenis from "@/hooks/useLenis";

const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const ScrollVideoBackground = lazy(() => import("@/components/portfolio/ScrollVideoBackground"));
const CustomCursor = lazy(() => import("@/components/portfolio/CustomCursor"));
const ScrollProgressIndicator = lazy(() => import("@/components/portfolio/ScrollProgressIndicator"));

const Divider = () => (
    <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </div>
);

const Index = () => {
    useLenis();
    const [showDeferred, setShowDeferred] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const schedule = () => {
            setShowDeferred(true);
            setShowBackground(true);
        };

        const win = window as Window & {
            requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
            cancelIdleCallback?: (handle: number) => void;
        };

        let idleId: number | null = null;
        if (win.requestIdleCallback) {
            idleId = win.requestIdleCallback(schedule, { timeout: 1500 });
        } else {
            idleId = window.setTimeout(schedule, 1200);
        }

        return () => {
            if (idleId === null) return;
            if (win.cancelIdleCallback) {
                win.cancelIdleCallback(idleId);
            } else {
                clearTimeout(idleId);
            }
        };
    }, []);

    return (
        <>
            {/* Fixed scroll-scrubbed video background */}
            {showBackground && (
                <Suspense fallback={null}>
                    <ScrollVideoBackground />
                </Suspense>
            )}

            {/* Universal scroll choreography */}
            {showDeferred && (
                <Suspense fallback={null}>
                    <CustomCursor />
                    <ScrollProgressIndicator />
                </Suspense>
            )}

            {/* Content layer */}
            <main className="relative z-10 min-h-screen w-full overflow-x-hidden text-foreground">
                <Navbar />
                <Hero />
                {showDeferred && (
                    <Suspense fallback={null}>
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
                            <p className="text-[11px] tracking-[0.28em] text-foreground/70">
                                © 2026 NAITIK JAIN — BUILT WITH PRECISION
                            </p>
                        </footer>
                    </Suspense>
                )}
            </main>
        </>
    );
};

export default Index;
