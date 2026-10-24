import { useEffect, useRef, type CSSProperties } from "react";
import { siteConfig } from "@/config/siteConfig";
import {
  applyMatrixScrollOffset,
  getMatrixDepthProfile,
  getMatrixDriftDuration,
} from "@/lib/matrixScroll";
const edgeWidth = Math.ceil(siteConfig.matrix.columns * 0.18);

const columns = Array.from(
  { length: siteConfig.matrix.columns },
  (_, columnIndex) => {
    const digits = Array.from(
      { length: siteConfig.matrix.rowsPerColumn },
      (_, rowIndex) => {
        if ((rowIndex * 5 + columnIndex * 3) % 17 === 0) return "\u00a0";
        return (rowIndex * 7 +
          columnIndex * 11 +
          (rowIndex % 5) * columnIndex) %
          2 ===
          0
          ? "0"
          : "1";
      }
    ).join("\n");

    const isEdge =
      columnIndex < edgeWidth ||
      columnIndex >= siteConfig.matrix.columns - edgeWidth;
    const isAccent = columnIndex % 5 === 0;
    const depthIndex = columnIndex % 3;
    const depthLayer = ["far", "mid", "near"][depthIndex];
    const depthProfile = getMatrixDepthProfile(depthIndex);
    const opacity = isEdge ? (isAccent ? 0.58 : 0.34) : isAccent ? 0.44 : 0.23;
    const style = {
      "--matrix-left": `${((columnIndex + 0.5) / siteConfig.matrix.columns) * 100}%`,
      "--matrix-delay": `${-(columnIndex % 9) * 2.1}s`,
      "--matrix-duration": `${getMatrixDriftDuration(columnIndex)}s`,
      "--matrix-opacity": opacity * depthProfile.opacity,
      "--matrix-scroll-offset": "0px",
      "--matrix-depth-size": depthProfile.fontSize,
      "--matrix-depth-blur": depthProfile.blur,
    } as CSSProperties;

    return {
      depthLayer,
      digits,
      isAccent,
      isEdge,
      style,
      id: `matrix-${columnIndex}`,
    };
  }
);

export default function BinaryRain() {
  const rainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rain = rainRef.current;
    if (!rain) return;

    const streams = Array.from(
      rain.querySelectorAll<HTMLElement>(".matrix-stream")
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId: number | undefined;

    const updateScrollPosition = () => {
      if (reducedMotion.matches) {
        if (frameId !== undefined) window.cancelAnimationFrame(frameId);
        frameId = undefined;
        applyMatrixScrollOffset(streams, 0);
        return;
      }

      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        frameId = undefined;
        applyMatrixScrollOffset(streams, window.scrollY);
      });
    };

    updateScrollPosition();
    window.addEventListener("scroll", updateScrollPosition, { passive: true });
    reducedMotion.addEventListener("change", updateScrollPosition);

    return () => {
      window.removeEventListener("scroll", updateScrollPosition);
      reducedMotion.removeEventListener("change", updateScrollPosition);
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="matrix-rain" aria-hidden="true" ref={rainRef}>
      {columns.map(({ id, digits, depthLayer, isAccent, isEdge, style }) => (
        <span
          className={`matrix-stream matrix-stream--${depthLayer}${isEdge ? " matrix-stream--edge" : ""}${isAccent ? " matrix-stream--accent" : ""}`}
          key={id}
          style={style}
        >
          {digits}
        </span>
      ))}
    </div>
  );
}
