export type MatrixDepthProfile = {
  scrollRate: number;
  opacity: number;
  fontSize: string;
  blur: string;
};

const depthProfiles: readonly MatrixDepthProfile[] = [
  { scrollRate: 0.025, opacity: 0.56, fontSize: "0.58rem", blur: "0.45px" },
  { scrollRate: 0, opacity: 0.8, fontSize: "0.69rem", blur: "0px" },
  { scrollRate: -0.07, opacity: 1, fontSize: "0.81rem", blur: "0px" },
];

function normalizedIndex(index: number): number {
  return Number.isFinite(index) ? Math.abs(Math.trunc(index)) : 0;
}

export function getMatrixDepthProfile(depthIndex: number): MatrixDepthProfile {
  return depthProfiles[normalizedIndex(depthIndex) % depthProfiles.length];
}

export function getMatrixDriftDuration(columnIndex: number): number {
  const safeColumnIndex = normalizedIndex(columnIndex);
  return 28 + (safeColumnIndex % 7) * 2.25;
}

export function getMatrixScrollOffset(scrollY: number, depthIndex: number): string {
  if (!Number.isFinite(scrollY) || scrollY <= 0) return "0px";

  const rate = getMatrixDepthProfile(depthIndex).scrollRate;
  return `${Math.round(scrollY * rate)}px`;
}

export function applyMatrixScrollOffset(
  streams: readonly Pick<HTMLElement, "style">[],
  scrollY: number,
): void {
  streams.forEach((stream, index) => {
    stream.style.setProperty("--matrix-scroll-offset", getMatrixScrollOffset(scrollY, index));
  });
}
