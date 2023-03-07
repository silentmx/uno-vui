import type { MaybeRef } from "@vueuse/core";

export function useOverlay(target: MaybeRef<string>) {
  const overlayTarget = computed(() => {
    const _target = unref(target);

    console.log(_target);
    if (typeof window === "undefined") {
      console.error(`Unable to locate target: ${_target}, winodw is undefined`);
    }

    if (!useOverlay.cache.has("root")) {
      const root = document.createElement("div");
      root.id = "vui-overlay-container";
      root.classList.add(...["vui-overlay-container"]);
      document.body.appendChild(root);
      useOverlay.cache.set("root", root);
    }

    console.log(_target);
    if (!useOverlay.cache.has(_target)) {
      const overlayEl = document.createElement("div");
      overlayEl.id = `vui-overlay-${_target}`;
      overlayEl.classList.add(...[`vui-overlay-${_target}`]);
      useOverlay.cache.get("root")!.appendChild(overlayEl);
      useOverlay.cache.set(_target, overlayEl);
    }

    return useOverlay.cache.get(_target)!;
  })

  return { overlayTarget }
}

useOverlay.cache = new WeakMap<String, Element>();