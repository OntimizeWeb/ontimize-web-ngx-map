import {
  MenuRootItem
} from 'ontimize-web-ng2';

export const MENU_CONFIG: MenuRootItem[] = [
  { id: 'home', name: 'INTRODUCTION', icon: 'home', route: '/main/home' },
  { id: 'basic', name: 'BASIC', icon: 'map', route: '/main/basic' },

  {
    id: 'layers',
    name: 'LAYERS',
    icon: 'remove_red_eye',
    opened: true,
    items: [
      { id: 'marker', name: 'MARKER', icon: 'place', route: '/main/marker' },
      { id: 'geojson', name: 'GEOJSON', icon: 'my_location', route: '/main/geojson' },
      { id: 'wms', name: 'WMS', icon: 'language', route: '/main/wms' }]
  }
];



