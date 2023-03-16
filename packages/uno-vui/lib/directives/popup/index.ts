import type { Placement } from '@floating-ui/vue';
import { defaultDocument, type MaybeComputedRef } from "@vueuse/core";
import { h, render, type Component, type ComponentInternalInstance, type DirectiveBinding, type FunctionDirective, type VNode } from "vue";
import { useOverlay } from "../../composables/use-overlay";
import type { SFCInstallWithContext } from '../../composables/with-install';
import PopupComponent from './index.vue';

const POPUP_KEY = Symbol("popup");
const { overlayTarget } = useOverlay(POPUP_KEY);

export interface UseUnoPopupOptions {
  element: string | VNode | Component,
  trigger?: "hover" | "click" | "context-menu" | "focus",
  placement?: Placement,
}

export function unoPopup(el: MaybeComputedRef<EventTarget | null | undefined>, options: UseUnoPopupOptions): void {
  const {
    element = "",
    trigger = "hover",
    placement = "bottom"
  } = options;

  if (!defaultDocument) {
    return;
  }

  let vm: ComponentInternalInstance | null = null;

  const toggle = (isShow: boolean,) => {
    if (!isShow && vm) {
      vm.emit("destroy");
    } else {
      if (!vm) {
        const container = document.createElement("div");
        const vnode = h(PopupComponent, {
          el: el,
          placement: placement,
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
  }

  if (trigger == "hover") {
    useEventListener(el, "mouseenter", () => toggle(true), { passive: true });
    useEventListener(el, "mouseleave", () => toggle(false), { passive: true });
  }
}

const directive: FunctionDirective = (el: HTMLElement, binding: DirectiveBinding) => {

}