import { createElement, type ComponentType } from "react";
import {
  Router,
  type BaseLocationHook,
  type BaseSearchHook,
} from "wouter";

const staticRootPath = import.meta.env.BASE_URL;
const staticLocationHook: BaseLocationHook = () => [staticRootPath, () => undefined];
const staticSearchHook: BaseSearchHook = () => "";

/** Envolve a rota pública com uma localização imutável e segura para SSR. */
export function createStaticRouteElement(App: ComponentType) {
  return createElement(Router, {
    hook: staticLocationHook,
    searchHook: staticSearchHook,
    ssrPath: staticRootPath,
    children: createElement(App),
  });
}
