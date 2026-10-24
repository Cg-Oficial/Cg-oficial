import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { useLocation } from "wouter";
import { describe, expect, it } from "vitest";
import { createStaticRouteElement } from "../client/src/lib/prerenderRouter";

function RouteProbe() {
  const [path] = useLocation();
  return createElement("p", null, path);
}

describe("static Wouter route", () => {
  it("renders the homepage path without reading a browser location", () => {
    const html = renderToString(createStaticRouteElement(RouteProbe));
    expect(html).toBe("<p>/</p>");
  });
});
