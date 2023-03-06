import { h, render } from 'vue';
import { useTeleport } from '../../composables/use-teleport';
import MessageVue from './index.vue';

const { teleportTarget } = useTeleport();

const message = {
  success: () => {
    console.log("success message");
    const container = document.createElement("div");
    const vnode = h(MessageVue);
    vnode.appContext = (message as any)._context;
    render(vnode, container);
    (teleportTarget.value as any).appendChild(container.firstElementChild);
  }
};

export default message;