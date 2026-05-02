import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import useLenis from "@/hooks/useLenis";

const About = lazy(() => import("@/components/portfolio/About"));
const Skills = lazy(() => import("@/components/portfolio/Skills"));
const Projects = lazy(() => import("@/components/portfolio/Projects"));
const Experience = lazy(() => import("@/components/portfolio/Experience"));
const Contact = lazy(() => import("@/components/portfolio/Contact"));
const CubesBackground = lazy(() => import("@/components/portfolio/CubesBackground"));

const Divider = () => (
    <div className="mx-auto max-w-5xl px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
    </div>
);

const Index = () => {
    useLenis();
    const [showDeferred, setShowDeferred] = useState(false);
    const [showCubes, setShowCubes] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const largeScreen = window.matchMedia("(min-width: 1024px)").matches;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const saveData = connection?.saveData ?? false;

        const enableCubes = !prefersReducedMotion && largeScreen && !saveData;

        const schedule = () => {
            setShowDeferred(true);
            if (enableCubes) {
                setShowCubes(true);
            }
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
            {/* Fixed 3D cubes background */}
            {showCubes && (
                <Suspense fallback={null}>
                    <CubesBackground />
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
