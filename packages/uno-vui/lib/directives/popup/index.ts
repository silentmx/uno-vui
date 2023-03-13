import { render, type AppContext, type DirectiveBinding, type FunctionDirective } from "vue";
import { useOverlay } from "../../composables/use-overlay";
import PopupComponent from './index.vue';

const POPUP_KEY = new String("popup");
const { overlayTarget } = useOverlay(POPUP_KEY);

function showPopup(el: HTMLElement, context: AppContext) {
  const container = document.createElement("div");
  const vnode = h(PopupComponent, {
    el: el,
    onDestroy: () => {
      render(null, container);
    }
  }, {
    default: () => "tooltip"
  });

  vnode.appContext = context;
  render(vnode, container);
  if (container.firstElementChild) {
    overlayTarget.value.appendChild(container.firstElementChild);
  }
}

const directive: FunctionDirective = (el: HTMLElement, binding: DirectiveBinding) => {

}