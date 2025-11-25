import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { PluginMewsComponent } from './features/plugins/plugin-mews.component';

export function registerCustomElements(injector: Injector): void {
  const MewsElement = createCustomElement(PluginMewsComponent, { injector });
  if (!customElements.get('mews-widget')) {
    customElements.define('mews-widget', MewsElement);
  }
}
