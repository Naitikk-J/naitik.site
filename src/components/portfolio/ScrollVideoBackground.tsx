import { useEffect, useRef, useState } from "react";
import { getLenis } from "@/hooks/useLenis";

/**
 * Full-page fixed video background whose currentTime is driven by scroll
 * position. Works best when the underlying file is H.264 with every frame
 * as a keyframe (-g 1 -keyint_min 1). See public/videos/README.md.
 *
 * Scroll source priority:
 *   1. Lenis instance (already eases the scroll value) — preferred.
 *   2. Native window.scrollY — used on mobile / reduced-motion where
 *      Lenis is intentionally disabled.
 *
 * We deliberately do NOT apply our own easing on top of Lenis: doing so
 * stacks two ease curves and makes the video visibly lag the viewport.
 *
 * Theme handling: the source video is expected to be pure grayscale
 * (dark ink on cream paper). Dark mode applies CSS `filter: invert(1)`
 * so a single source serves both themes.
 */

const VIDEO_4K_SRC = "/videos/doodle-bg.mp4";
const VIDEO_1080_SRC = "/videos/doodle-bg-1080.mp4";
const POSTER_SRC = "/videos/doodle-bg-poster.jpg";

const SEEK_EPSILON = 0.008;

const ScrollVideoBackground = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ready, setReady] = useState(false);
    const [failed, setFailed] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [use4k, setUse4k] = useState(false);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const largeScreen = window.matchMedia("(min-width: 1024px)").matches;
        const connection = (navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string };
        }).connection;
        const saveData = connection?.saveData ?? false;
        const slowNet = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g" || connection?.effectiveType === "3g";
        const lowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

        const canRun = !prefersReducedMotion && !saveData;
        setEnabled(canRun);
        setUse4k(canRun && largeScreen && !coarsePointer && !lowEnd && !slowNet);
    }, []);

    useEffect(() => {
        if (!enabled) return;
        const video = videoRef.current;
        if (!video) return;

        let cancelled = false;
        const onLoaded = () => {
            if (cancelled) return;
            video.pause();
            try {
                video.currentTime = 0;
            } catch {
                // some browsers throw if not yet seekable; the rAF loop will retry
            }
            setReady(true);
        };
        const onError = () => {
            if (cancelled) return;
            setFailed(true);
        };

        video.addEventListener("loadedmetadata", onLoaded);
        video.addEventListener("error", onError);
        return () => {
            cancelled = true;
            video.removeEventListener("loadedmetadata", onLoaded);
            video.removeEventListener("error", onError);
        };
    }, [enabled]);

    useEffect(() => {
        if (!enabled || !ready) return;
        const video = videoRef.current;
        if (!video) return;

        const duration = Number.isFinite(video.duration) ? video.duration : 0;
        if (duration <= 0) return;

        let rafId = 0;

        const readProgress = (): number => {
            const lenis = getLenis();
            if (lenis && typeof lenis.progress === "number" && lenis.limit > 0) {
                return lenis.progress;
            }
            const docEl = document.documentElement;
            const max = Math.max(1, docEl.scrollHeight - window.innerHeight);
            return window.scrollY / max;
        };

        const tick = () => {
            const progress = Math.min(1, Math.max(0, readProgress()));
            const target = progress * duration;

            if (video.readyState >= 2 && Math.abs(video.currentTime - target) > SEEK_EPSILON) {
                try {
                    video.currentTime = target;
                } catch {
                    // ignore; will retry next frame
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
    }, [enabled, ready]);

    const showVideo = enabled && !failed;

    return (
        <div className="video-bg pointer-events-none fixed inset-0 z-0 overflow-hidden bg-background">
            <img
                src={POSTER_SRC}
                alt=""
                aria-hidden="true"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 dark:invert ${
                    showVideo && ready ? "opacity-0" : "opacity-100"
                }`}
                onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
            />
            {showVideo && (
                <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full object-cover dark:invert"
                    src={use4k ? VIDEO_4K_SRC : VIDEO_1080_SRC}
                    poster={POSTER_SRC}
                    preload="auto"
                    muted
                    playsInline
                    disablePictureInPicture
                    disableRemotePlayback
                    aria-hidden="true"
                />
            )}
            <div className="absolute inset-0 bg-background/30 dark:bg-background/40" />
        </div>
    );
};

export default ScrollVideoBackground;
