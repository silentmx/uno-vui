import type { MaybeRef } from "@vueuse/core";
const ROOT_TARGET_KEY = new String("root");

export function useOverlay(target: MaybeRef<String>) {
  const overlayTarget = computed(() => {
    const _target = unref(target);

    if (typeof window === "undefined") {
      console.error(`Unable to locate target: ${_target}, winodw is undefined`);
    }

    const rootOverlayEl = useOverlay.cache.get(ROOT_TARGET_KEY) || (() => {
      const root = document.createElement("div");
      root.id = "vui-overlay-container";
      root.classList.add(...["vui-overlay-container"]);
      document.body.appendChild(root);
      useOverlay.cache.set(ROOT_TARGET_KEY, root);
      return root;
    })();

    return useOverlay.cache.get(_target) || (() => {
      const overlayEl = document.createElement("div");
      overlayEl.id = `vui-overlay-${_target}`;
      overlayEl.classList.add(...[`vui-overlay-${_target}`]);
      rootOverlayEl.appendChild(overlayEl);
      useOverlay.cache.set(_target, overlayEl);
      return overlayEl;
    })();
  })

  return { overlayTarget }
}

useOverlay.cache = new WeakMap<String, Element>();