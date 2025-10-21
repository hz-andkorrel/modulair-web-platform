import { PluginDef } from './types';


//dummy data
export const PLUGINS: PluginDef[] = [
  {
    id: 'mews',
    name: 'Mews Widgets',
    widgets: [
      { id: 'reserveringen', title: 'reserveringen', description: 'Toon reserveringen' },
      { id: 'gearriveerd', title: 'Gearriveerde gasten', description: 'Toon gearriveerde gasten' },
    ],
  },
  {
    id: 'robots',
    name: 'robots',
    widgets: [
      { id: 'robotlijst', title: 'Robotlijst' },
      { id: 'robotflows', title: 'robotflows' },
    ],
  },
];
