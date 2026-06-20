import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Module-level Lenis singleton so non-React consumers (e.g. the scroll-driven
 * video background, GSAP ScrollTriggers) can read the active scroll value
 * without prop drilling.
 */
let lenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => lenisInstance;

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
        lenisInstance = lenis;

        // Pipe Lenis ticks into ScrollTrigger so pinned/scrubbed sections
        // stay perfectly in sync with the eased scroll position.
        const onLenisScroll = () => ScrollTrigger.update();
        lenis.on("scroll", onLenisScroll);
        gsap.ticker.lagSmoothing(0);

        let rafId: number;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.off("scroll", onLenisScroll);
            lenis.destroy();
            lenisInstance = null;
        };
    }, []);
};

export default useLenis;