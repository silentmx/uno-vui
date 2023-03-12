import type { App, AppContext, Component, Directive, Plugin } from 'vue';

type SFCWithInstall<T> = T & Plugin;
type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
}

export function withInstall<T extends Component>(component: T, name: string) {
  (component as SFCWithInstall<T>).install = (app: App) => {
    app.component(name, component);
  }

  return component as SFCWithInstall<T>;
}

export function withInstallFunction<T extends Function>(fn: T, name: string) {
  (fn as SFCWithInstall<T>).install = (app: App) => {
    (fn as SFCInstallWithContext<T>)._context = app._context;
    app.config.globalProperties[name] = fn;
  }

  return fn as SFCWithInstall<T>;
}

export function withInstallDirective<T extends Directive>(directive: T, name: string) {
  (directive as SFCWithInstall<T>).install = (app: App) => {
    (directive as SFCInstallWithContext<T>)._context = app._context;
    app.directive(name, directive);
  }

  return directive as SFCWithInstall<T>;
}