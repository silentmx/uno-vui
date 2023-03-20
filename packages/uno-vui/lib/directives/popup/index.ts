import type { Placement } from '@floating-ui/vue';
import { defaultDocument, type MaybeComputedRef } from "@vueuse/core";
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
  return value === "hover" || value === "click" || value === "contextment" || value === "focus";
}

function isPlacement(value: any): value is Placement {
  return value === "top" || value === "top-start" || value === "top-end" ||
    value === "right" || value === "right-start" || value === "right-end" ||
    value === "left" || value === "left-start" || value === "left-end" ||
    value === "bottom" || value === "bottom-start" || value === "bottom-end";
}

export function popupFn(el: MaybeComputedRef<EventTarget | null | undefined>, options: UseUnoPopupOptions): void {
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
      vnode.appContext = (unoPopup as SFCInstallWithContext<VoidFunction>)._context;
      render(vnode, container);
      vm = vnode.component;
      if (container.firstElementChild) {
        overlayTarget.value?.appendChild(container.firstElementChild);
      }
    }
  }

  useEventListener(el, trigger == "hover" ? "mouseenter" : trigger, (evt) => {
    if (trigger == "contextmenu") {
      evt.preventDefault();
    }
    createPopup();
  }, { passive: trigger != "contextmenu" });
}

export const PopupDirective: FunctionDirective = (el: HTMLElement, binding: DirectiveBinding) => {
  popupFn(el, {
    element: binding.value,
    trigger: isTrigger(binding.arg) ? binding.arg : "hover",
    placement: Object.keys(binding.modifiers).reduce<Placement>((acc, cur) => {
      if (isPlacement(cur)) {
        acc = cur;
      }
      return acc;
    }, "bottom"),
    arrow: binding.modifiers["arrow"] || false,
  })
}

