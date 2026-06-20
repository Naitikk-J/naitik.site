import { useEffect, useRef } from "react";

interface Options {
    /** Max tilt in degrees on either axis. */
    maxTilt?: number;
    /** Max translation in pixels toward the cursor. */
    maxOffset?: number;
    /** Lerp factor 0..1; higher = snappier. */
    lerp?: number;
    /** Z-translation when active (depth pop). */
    perspective?: number;
}

/**
 * Attaches a magnetic 3D tilt + slight cursor-follow to the returned ref.
 * Tracks pointermove globally but only activates while the element is hovered.
 * Disabled on coarse-pointer devices and when prefers-reduced-motion is set.
 */
export const useMagneticTilt = <T extends HTMLElement = HTMLDivElement>(
    opts: Options = {},
) => {
    const { maxTilt = 8, maxOffset = 8, lerp = 0.18, perspective = 800 } = opts;
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        if (prefersReducedMotion || coarsePointer) return;

        let active = false;
        let rafId = 0;
        const target = { rx: 0, ry: 0, tx: 0, ty: 0 };
        const current = { rx: 0, ry: 0, tx: 0, ty: 0 };

        const onMove = (e: PointerEvent) => {
            if (!active) return;
            const rect = el.getBoundingClientRect();
            const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
            const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
            target.ry = dx * maxTilt;
            target.rx = -dy * maxTilt;
            target.tx = dx * maxOffset;
            target.ty = dy * maxOffset;
        };

        const onEnter = () => {
            active = true;
        };
        const onLeave = () => {
            active = false;
            target.rx = 0;
            target.ry = 0;
            target.tx = 0;
            target.ty = 0;
        };

        const tick = () => {
            current.rx += (target.rx - current.rx) * lerp;
            current.ry += (target.ry - current.ry) * lerp;
            current.tx += (target.tx - current.tx) * lerp;
            current.ty += (target.ty - current.ty) * lerp;

            el.style.transform = `perspective(${perspective}px) translate3d(${current.tx}px, ${current.ty}px, 0) rotateX(${current.rx}deg) rotateY(${current.ry}deg)`;
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        el.addEventListener("pointerenter", onEnter);
        el.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointermove", onMove);

        return () => {
            cancelAnimationFrame(rafId);
            el.removeEventListener("pointerenter", onEnter);
            el.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("pointermove", onMove);
            el.style.transform = "";
        };
    }, [maxTilt, maxOffset, lerp, perspective]);

    return ref;
};
