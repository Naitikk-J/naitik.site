import { useEffect, useRef } from "react";

/**
 * Custom cursor blob that follows the pointer with a small lerp lag and
 * inflates over interactive elements (a, button, [data-cursor]).
 *
 * Disabled on coarse-pointer devices and when prefers-reduced-motion is set.
 * Native cursor is hidden via a body class so unstyled regions don't show
 * two cursors at once.
 */

const CURSOR_SIZE = 14;
const HOVER_SCALE = 3.2;
const LERP = 0.18;
const HOVER_SELECTOR = "a, button, [data-cursor], [role='button']";

const CustomCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        if (prefersReducedMotion || coarsePointer) return;

        document.body.classList.add("has-custom-cursor");

        const cursor = cursorRef.current;
        const ring = ringRef.current;
        if (!cursor || !ring) return;

        let targetX = window.innerWidth / 2;
        let targetY = window.innerHeight / 2;
        let dotX = targetX;
        let dotY = targetY;
        let ringX = targetX;
        let ringY = targetY;
        let scale = 1;
        let targetScale = 1;
        let rafId = 0;

        const onMove = (e: PointerEvent) => {
            targetX = e.clientX;
            targetY = e.clientY;
        };

        const handleEnter = () => { targetScale = HOVER_SCALE; };
        const handleLeave = () => { targetScale = 1; };

        const bindHover = () => {
            document.querySelectorAll(HOVER_SELECTOR).forEach((el) => {
                el.addEventListener("pointerenter", handleEnter);
                el.addEventListener("pointerleave", handleLeave);
            });
        };
        const unbindHover = () => {
            document.querySelectorAll(HOVER_SELECTOR).forEach((el) => {
                el.removeEventListener("pointerenter", handleEnter);
                el.removeEventListener("pointerleave", handleLeave);
            });
        };

        const observer = new MutationObserver(() => {
            unbindHover();
            bindHover();
        });
        observer.observe(document.body, { childList: true, subtree: true });
        bindHover();

        const tick = () => {
            dotX += (targetX - dotX) * 0.55;
            dotY += (targetY - dotY) * 0.55;
            ringX += (targetX - ringX) * LERP;
            ringY += (targetY - ringY) * LERP;
            scale += (targetScale - scale) * 0.18;

            cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
            ring.style.opacity = scale > 1.5 ? "0.4" : "1";

            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("pointermove", onMove);
        const onLeaveWindow = () => {
            cursor.style.opacity = "0";
            ring.style.opacity = "0";
        };
        const onEnterWindow = () => {
            cursor.style.opacity = "1";
            ring.style.opacity = "1";
        };
        document.addEventListener("pointerleave", onLeaveWindow);
        document.addEventListener("pointerenter", onEnterWindow);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerleave", onLeaveWindow);
            document.removeEventListener("pointerenter", onEnterWindow);
            observer.disconnect();
            unbindHover();
            document.body.classList.remove("has-custom-cursor");
        };
    }, []);

    return (
        <>
            <div
                ref={ringRef}
                aria-hidden="true"
                className="custom-cursor-ring pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-foreground/40 mix-blend-difference"
                style={{ width: CURSOR_SIZE * 2.4, height: CURSOR_SIZE * 2.4, willChange: "transform, opacity" }}
            />
            <div
                ref={cursorRef}
                aria-hidden="true"
                className="custom-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-foreground mix-blend-difference"
                style={{ width: CURSOR_SIZE / 2.5, height: CURSOR_SIZE / 2.5, willChange: "transform" }}
            />
        </>
    );
};

export default CustomCursor;
