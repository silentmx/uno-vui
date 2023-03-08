import { h, render, type DirectiveBinding, type FunctionDirective } from "vue";
import { useOverlay } from "../../composables/use-overlay";
import Popup from './index.vue';

const POPUP_KEY = new String("popup");
const { overlayTarget } = useOverlay(POPUP_KEY);

showPopup.cache = new WeakMap<Element, Element>();
function showPopup(el: HTMLElement, trigger: "hover" | "click" | "context-menu" | "focus" = "hover") {
  if (!showPopup.cache.has(el)) {
    const container = document.createElement("div");
    const vnode = h(Popup, {
      el: el,
      trigger: trigger,
      onDestroy: () => {
        showPopup.cache.delete(el);
        render(null, container);
      }
    }, {
      default: () => "tooltip"
    });
    vnode.appContext = (directive as any)._context;
    render(vnode, container);
    if (container.firstElementChild) {
      overlayTarget.value.appendChild(container.firstElementChild);
    }
    showPopup.cache.set(el, container)
  }

}

const directive: FunctionDirective = (el: HTMLElement, binding: DirectiveBinding) => {
  switch (binding.arg) {
    case "click": {
      break;
    }
    case "focus": {
      break;
    }
    case "context-menu":
    case "contextmenu": {
      break;
    }
    default: {
      el.onmouseenter = () => {
        showPopup(el, "hover");
      }
      break;
    }
  }
}

export default directive;