import { defaultDocument } from "@vueuse/core";

const ROOT_TARGET_KEY = Symbol("uno-vui-overlay-root");


export function useOverlay(target: Symbol) {
  const overlayTarget = computed(() => {
    if (!defaultDocument) {
      console.error(`Unable to locate target: ${target.description}, window is undefined`);
      return undefined;
    }

    const rootOverlayEl = useOverlay.cache.get(ROOT_TARGET_KEY) || (() => {
      const rootEl = defaultDocument.querySelector(".unovui-overlay-container");
      if (rootEl) {
        useOverlay.cache.set(ROOT_TARGET_KEY, rootEl);
        return rootEl;
      }

      const root = defaultDocument.createElement("div");
      root.id = "unovui-overlay-container";
      root.classList.add(...["unovui-overlay-container"]);
      defaultDocument.body.appendChild(root);
      useOverlay.cache.set(ROOT_TARGET_KEY, root);
      return root;
    })();

    return useOverlay.cache.get(target) || (() => {
      const targetEl = defaultDocument.querySelector(`.unovui-overlay-${target.description}`);
      if (targetEl) {
        useOverlay.cache.set(target, targetEl);
        return targetEl;
      }

      const overlayEl = defaultDocument.createElement("div");
      overlayEl.id = `unovui-overlay-${target.description}`;
      overlayEl.classList.add(...[`unovui-overlay-${target.description}`]);
      rootOverlayEl.appendChild(overlayEl);
      useOverlay.cache.set(target, overlayEl);
      return overlayEl;
    })();
  });

  return { overlayTarget };
}

useOverlay.cache = new WeakMap<Symbol, Element>();