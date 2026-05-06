# Migración Angular 15 → 18 — ontimize-web-ngx-map

> Última actualización: 5 mayo 2026 (Fase 3 completa — standalone pendiente)

## Estado global

| Rama | Angular | Commits | Estado |
|------|---------|---------|--------|
| `migration/16.x.x` | 16.2 | `6a23638` | ✅ Completado |
| `migration/17.x.x` | 17.3 | `c9f62c5` | ✅ Completado |
| `migration/18.x.x` | 18.2 | `5649eba`…`f24ebd1` | ✅ Completado — standalone pendiente |

---

## FASE 1: Angular 15 → 16 — rama `migration/16.x.x`

### Commits
- `6a23638` — bump deps to Angular 16, alias `@angular/flex-layout` → `@ngbracket/ngx-layout`

### Cambios
- Todas las dependencias Angular a `^16.2.0`, ng-packagr `^16.2.0`, TypeScript `~5.0.4`
- `@ngbracket/ngx-layout@^16.0.0` añadido como sustituto transitional de `@angular/flex-layout`
- `projects/ontimize-web-ngx-map/package.json`: peer deps a `^16.0.0-next.0`

---

## FASE 2: Angular 16 → 17 — rama `migration/17.x.x`

### Commits
- `c9f62c5` — bump deps to Angular 17.3.0

### Cambios
- Angular `^17.3.0`, ng-packagr `^17.3.0`, TypeScript `~5.2.2`, zone.js `~0.14.0`
- `@angular-eslint/*` → `^17.0.0`, `@ngbracket/ngx-layout` → `^17.0.1`
- `projects/ontimize-web-ngx-map/package.json`: peer deps a `^17.0.0-next.0`

---

## FASE 3: Angular 17 → 18 — rama `migration/18.x.x`

### Commits
- `5649eba` — Angular 17→18: bump deps, drop flex-layout, migrate templates
- `2aef6f2` — fix(deps): add luxon, moment and @types as devDependencies for ng-packagr partial compilation
- `bc235c2` — fix(deps): bump karma-jasmine-html-reporter to ~2.1.0 for jasmine-core 5.x compat
- `39d359e` — fix(build): replace copyfiles with Node script to copy leaflet images (Windows compat)
- `f24ebd1` — docs(plan): add compilationMode partial requirement to Fase 3

### Cambios

#### 3.1 Dependencias
- Angular `^18.2.0`, ng-packagr `^18.2.0`, TypeScript `~5.5.4`, zone.js `~0.15.0`
- `@angular/flex-layout` y `@ngbracket/ngx-layout` **eliminados**
- `ontimize-web-ngx`: apunta a tgz local del framework
- `projects/ontimize-web-ngx-map/package.json`: peer dep `ontimize-web-ngx ^18.0.0-next.0`

#### 3.2 Control flow migration
11 templates migrados de `*ngIf`/`*ngFor` a `@if`/`@for`:
- `o-map-layer-group.component.html`
- `o-map-layer.component.html`
- `o-map-workspace-layer.component.html`
- `o-map-workspace.component.html`
- `o-map.component.html`
- `o-navigator-item.component.html`
- `o-navigator.component.html`
- `o-toggle-icon-button.component.html`

#### 3.3 Flex-layout → CSS nativo
Eliminado `FlexLayoutModule` del módulo. Templates migrados con clases `o-flex-*` de `ontimize-web-ngx`.

#### 3.4 Fix Windows copy-files
Script `copyfiles` reemplazado por script Node.js para compatibilidad con Windows al copiar imágenes de Leaflet.

---

## Pendiente

### Standalone migration
Los **13 componentes** de la librería **no son standalone**. Están declarados en `OntimizeMapModule` con el patrón clásico NgModule. La migración a standalone es la siguiente fase:

| Componente | Fichero |
|-----------|---------|
| `OMapComponent` | `map/o-map.component.ts` |
| `OMapBaseLayerComponent` | `map-base-layer/o-map-base-layer.component.ts` |
| `OMapCrsComponent` | `map-crs/o-map-crs.component.ts` |
| `OMapDrawControlsComponent` | `map-draw-controls/o-map-draw-controls.component.ts` |
| `OMapLayerComponent` | `map-layer/o-map-layer.component.ts` |
| `OMapLayerContainerComponent` | `map-layer-container/o-map-layer-container.component.ts` |
| `OMapLayerGroupComponent` | `map-layer-group/o-map-layer-group.component.ts` |
| `OMapWorkspaceComponent` | `map-workspace/o-map-workspace.component.ts` |
| `OMapWorkspaceLayerComponent` | `map-workspace-layer/o-map-workspace-layer.component.ts` |
| `OMarkerComponent` | `marker/o-marker.component.ts` |
| `ONavigatorItemComponent` | `navigator/o-navigator-item.component.ts` |
| `ONavigatorComponent` | `navigator/o-navigator.component.ts` |
| `OToggleIconButtonComponent` | `toggle-icon-button/o-toggle-icon-button.component.ts` |

`OntimizeMapModule` debe mantenerse para backwards compatibility exportando los componentes standalone.

---

## Workflow de validación

```bash
cd c:/work/ontimize-web-ngx/18.x.x/ontimize-web-ngx-map

# Build de la librería
npx ng-packagr -p projects/ontimize-web-ngx-map/ng-package.json

# Empaquetar
cd dist/ontimize-web-ngx-map && npm pack
```
