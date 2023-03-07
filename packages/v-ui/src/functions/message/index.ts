import { h, render } from 'vue';
import { useOverlay } from '../../composables/use-overlay';
import MessageVue from './index.vue';

const { overlayTarget } = useOverlay("message");

const message = {
  success: () => {
    console.log("success message");
    const container = document.createElement("div");
    const vnode = h(MessageVue);
    vnode.appContext = (message as any)._context;
    render(vnode, container);
    overlayTarget.value.appendChild(container.firstElementChild as Element);
  }
};

export default message;