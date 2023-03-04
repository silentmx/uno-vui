import type { Ref } from 'vue';

export function useTeleport(target?: Ref<string | Element>) {

  const teleportTarget = computed(() => {
    const _target = unref(target);

    if (typeof window === "undefined") {
      return undefined;
    }

    const targetElement = _target === undefined ? document.body :
      typeof _target === "string" ? document.querySelector(_target) : _target;

    if (targetElement == null) {
      console.warn(`Unable to locate target ${_target}`);
      return undefined;
    }

    if (!useTeleport.cache.has(targetElement)) {
      const overlayEl = document.createElement("div");
      overlayEl.id = "vui-overlay-container";
      overlayEl.classList.add(...["vui-overlay-container"]);
      targetElement.appendChild(overlayEl);
      useTeleport.cache.set(targetElement, overlayEl);
    }

    return useTeleport.cache.get(targetElement);
  });

  return { teleportTarget };
}

useTeleport.cache = new WeakMap<Element, Element>();