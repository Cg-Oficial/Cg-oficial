import { useState } from "react";
import { UserRound } from "lucide-react";

type ConfiguredImageProps = {
  src?: string | null;
  alt: string;
  fallbackLabel: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  fetchPriority?: "high" | "low" | "auto";
};

export default function ConfiguredImage({
  src,
  alt,
  fallbackLabel,
  className,
  width = 800,
  height = 800,
  loading = "lazy",
  fetchPriority = "auto",
}: ConfiguredImageProps) {
  const [unavailable, setUnavailable] = useState(!src);

  if (unavailable || !src) {
    return (
      <div className={`configured-image-fallback${className ? ` ${className}` : ""}`} role="img" aria-label={fallbackLabel}>
        <UserRound aria-hidden="true" strokeWidth={1.2} />
        <span>CG</span>
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      onError={() => setUnavailable(true)}
    />
  );
}
