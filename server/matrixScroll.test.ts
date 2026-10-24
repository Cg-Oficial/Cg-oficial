import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import BinaryRain from "../client/src/components/BinaryRain";
import {
  applyMatrixScrollOffset,
  getMatrixScrollOffset,
} from "../client/src/lib/matrixScroll";

describe("scroll parallax for binary streams", () => {
  it("makes far streams slower and near streams slightly faster than the page scroll", () => {
    const offsets = [0, 1, 2].map((depth) => getMatrixScrollOffset(1000, depth));
    const pixels = offsets.map((offset) => Number.parseFloat(offset));

    expect(pixels).toEqual([25, 0, -70]);
    expect(getMatrixScrollOffset(0, 2)).toBe("0px");
    expect(getMatrixScrollOffset(Number.NaN, 2)).toBe("0px");
  });

  it("renders a slightly faster drift with clearer far, middle, and near layers", () => {
    const markup = renderToStaticMarkup(createElement(BinaryRain));

    expect(markup).toContain("--matrix-duration:28s");
    expect(markup).toContain("--matrix-duration:30.25s");
    expect(markup).toContain("--matrix-duration:41.5s");
    expect(markup).toContain("--matrix-depth-size:0.58rem");
    expect(markup).toContain("--matrix-depth-size:0.69rem");
    expect(markup).toContain("--matrix-depth-size:0.81rem");
    expect(markup).toContain("--matrix-depth-blur:0.45px");
  });

  it("writes the correct parallax offset to every column", () => {
    const styles = [new Map<string, string>(), new Map<string, string>(), new Map<string, string>()];
    const streams = styles.map((properties) => ({
      style: {
        setProperty: (name: string, value: string) => properties.set(name, value),
      },
    })) as unknown as Pick<HTMLElement, "style">[];

    applyMatrixScrollOffset(streams, 1000);

    expect(styles.map((properties) => properties.get("--matrix-scroll-offset"))).toEqual([
      "25px",
      "0px",
      "-70px",
    ]);
  });
});
