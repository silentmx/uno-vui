import { h, render, type DirectiveBinding, type FunctionDirective } from "vue";
import { useOverlay } from "../../composables/use-overlay";
import Popup from './index.vue';

const { overlayTarget } = useOverlay("popup");

function showPopup(el: HTMLElement) {
  const container = document.createElement("div");
  const vnode = h(Popup, { el: el }, {
    default: () => "tooltip"
  });
  vnode.appContext = (directive as any)._context;
  render(vnode, container);
  if (container.firstElementChild) {
    overlayTarget.value.appendChild(container.firstElementChild);
  }
}

const directive: FunctionDirective = (el: HTMLElement, binding: DirectiveBinding, vnode: VNode) => {
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
      showPopup(el);
      break;
    }
  }
}

export default directive;