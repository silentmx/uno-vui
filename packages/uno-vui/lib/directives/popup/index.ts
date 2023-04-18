import type { Placement } from '@floating-ui/vue';
import { defaultDocument, type Fn, type MaybeRef } from "@vueuse/core";
import { h, render, type Component, type ComponentInternalInstance, type DirectiveBinding, type FunctionDirective, type VNode } from "vue";
import { useOverlay } from "../../composables/use-overlay";
import type { SFCInstallWithContext } from '../../composables/with-install';
import PopupComponent from './index.vue';

const POPUP_KEY = Symbol("popup");
const { overlayTarget } = useOverlay(POPUP_KEY);

type Trigger = "hover" | "click" | "contextmenu" | "focus";

interface UseUnoPopupOptions {
  element: string | VNode | Component,
  trigger?: Trigger,
  placement?: Placement,
  arrow?: boolean,
}

function isTrigger(value: any): value is Trigger {
  return value === "hover" || value === "click" || value === "contextmenu" || value === "focus";
}

export function popupFn(el: MaybeRef<EventTarget | null | undefined>, options: UseUnoPopupOptions): void {
  const {
    element,
    trigger = "hover",
    placement = "bottom",
    arrow = true,
  } = options;

  if (!defaultDocument) {
    return;
  }

  let vm: ComponentInternalInstance | null = null;
  const createPopup = () => {
    if (!vm) {
      const container = document.createElement("div");
      const vnode = h(PopupComponent, {
        el: el,
        placement: placement,
        trigger: trigger,
        arrow: arrow,
        onDestroy: () => {
          render(null, container);
          vm = null;
        }
      }, {
        default: () => typeof element == "string" ? element : h(element)
      });
      vnode.appContext = (popupFn as SFCInstallWithContext<any>)._context;
      render(vnode, container);
      vm = vnode.component;
      if (container.firstElementChild) {
        overlayTarget.value?.appendChild(container.firstElementChild);
      }
    }
  }

  if (popupFn.cache.has(el)) {
    const cleanup = popupFn.cache.get(el);
    if (cleanup) {
      cleanup()
    }
  }
  const cleanup = useEventListener(el, trigger == "hover" ? "mouseenter" : trigger, (evt) => {
    if (trigger == "contextmenu") {
      evt.preventDefault();
    }
    createPopup();
  }, { passive: trigger != "contextmenu" });
  popupFn.cache.set(el, cleanup);
}
popupFn.cache = new WeakMap<any, Fn>();

type BindingValue = Omit<UseUnoPopupOptions, "trigger">;
export const PopupDirective: FunctionDirective<EventTarget, BindingValue> = (el: EventTarget, binding: DirectiveBinding<BindingValue>) => {
  popupFn(el, {
    element: binding.value.element,
    trigger: isTrigger(binding.arg) ? binding.arg : "hover",
    placement: binding.value.placement || "bottom",
    arrow: binding.value.arrow != undefined ? binding.value.arrow : true,
  })
}

