import { useState, useEffect } from "react";
import Cubes from "./Cubes";

/**
 * Theme-aware Cubes background that fills the viewport.
 * Adapts colors to light/dark mode.
 */
const CubesBackground = () => {
    const [isDark, setIsDark] = useState(
        document.documentElement.classList.contains("dark")
    );
    const [effects, setEffects] = useState({
        gridSize: 12,
        autoAnimate: true,
        enableInteractions: true,
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"));
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"],
        });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
        const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
        const saveData = connection?.saveData ?? false;
        const lowEnd = navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

        const autoAnimate = !(prefersReducedMotion || saveData || lowEnd);
        const enableInteractions = autoAnimate && !coarsePointer;
        const gridSize = coarsePointer ? 8 : 12;

        setEffects({ gridSize, autoAnimate, enableInteractions });
    }, []);

    return (
        <div className="cubes-bg">
            <Cubes
                gridSize={effects.gridSize}
                maxAngle={50}
                radius={4}
                borderStyle={isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.12)"}
                faceColor={isDark ? "#050505" : "#F5F1E8"}
                rippleColor={isDark ? "rgba(96,165,250,0.15)" : "rgba(82,39,255,0.08)"}
                rippleSpeed={1.2}
                autoAnimate={effects.autoAnimate}
                rippleOnClick={effects.enableInteractions}
                enableInteractions={effects.enableInteractions}
                cellGap={0}
                duration={{ enter: 0.4, leave: 0.8 }}
            />
        </div>
    );
};

export default CubesBackground;
