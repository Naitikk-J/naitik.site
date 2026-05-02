import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scroll globally.
 * Syncs with Framer Motion's useScroll via window scroll events.
 */
export const useLenis = () => {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const saveData = connection?.saveData ?? false;
        const lowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

        if (prefersReducedMotion || saveData || lowEnd || coarsePointer) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 1.5,
        });

        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);
};

export default useLenis;