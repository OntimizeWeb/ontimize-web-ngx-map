# Plan: Migración Angular 15 → 18 — ontimize-web-ngx-map

## TL;DR
Migración incremental del addon `ontimize-web-ngx-map` (Angular 15 → 18) siguiendo la misma estrategia de ramas que el framework principal. La dependencia `ontimize-web-ngx` se actualiza en paralelo con cada fase. El peer `@angular/flex-layout` se sustituye por CSS nativo en la fase 18. Las dependencias de Leaflet son el riesgo principal de compatibilidad — son librerías con versiones antiguas que pueden necesitar actualización.

## Datos clave del codebase (reales)
- **1 NgModule**: OMapModule
- **0 standalone components** en la versión base (15.x.x)
- **13 componentes**: OMapComponent, OMapBaseLayerComponent, OMapCrsComponent, OMapDrawControlsComponent, OMapLayerComponent, OMapLayerContainerComponent, OMapLayerGroupComponent, OMapWorkspaceComponent, OMapWorkspaceLayerComponent, OMarkerComponent, ONavigatorComponent, ONavigatorItemComponent, OToggleIconButtonComponent
- **6 templates HTML** con directivas flex-layout
- **1 spec file**
- **1 archivo SCSS de theming**: `ontimize-web-ngx-map-theme.scss` (copiado a dist/ en el build)
- **Sin usages de `Injector.get()`**
- **Sin guards propios**
- Dependencias externas clave (todas con versiones antiguas y fijas):
  - `leaflet@1.6.0`, `leaflet-contextmenu@1.4.0`, `leaflet-draw@0.4.14`
  - `leaflet-providers@1.9.1`, `leaflet.heat@0.2.0`, `leaflet.markercluster@1.5.0`
  - `proj4@2.6.1`, `proj4leaflet@1.0.2`
- Build script ejecuta `scss-bundle` + copia imágenes de Leaflet y theme SCSS → verificar tras cada fase
- `ontimize-web-ngx` en versión fija `15.0.0` (no `^15.x`) — actualizar a `^15.9.0` en Fase 1

## Estrategia de Ramas

```
15.x.x (intocable)
  └── 18.x.x (punto de partida, copia de 15.x.x)
       ├── migration/16.x.x (Angular 16)
       │    └── migration/17.x.x (Angular 17)
       │         └── migration/18.x.x (Angular 18 final)
       └── (merge final a 18.x.x cuando esté listo)
```

---

## FASE 1: Angular 15 → 16 — Rama `migration/16.x.x`

### Acciones a realizar
- Actualizar todas las dependencias Angular a `^16.2.0`
- `ng-packagr` → `^16.2.0`, `typescript` → `~5.0.4`, `zone.js` → `~0.13.0`
- Actualizar `tsconfig.json`: `module` → `es2022`
- Añadir `moment` → `^2.29.4` (requerido por `@angular/material-moment-adapter`)
- Añadir `@ngbracket/ngx-layout@^16.0.0` (sustitución transitional de `@angular/flex-layout`)
- Mantener `@angular/flex-layout@^15.0.0-beta.42` como peer transitorio
- `ontimize-web-ngx` → `^15.9.0` (actualmente fijo en `15.0.0` — actualizar a rango `^`)
- Actualizar `projects/ontimize-web-ngx-map/package.json`: peer deps a `^16.2.0`
- **Leaflet**: Evaluar actualización de versiones — `leaflet@1.6.0` tiene +4 años; considerar `leaflet@^1.9.0`
  - `leaflet` → `^1.9.0` si compatible
  - `leaflet.markercluster` → `^1.5.3`
  - Los demás (`leaflet-draw`, `leaflet-contextmenu`, `leaflet.heat`, `proj4leaflet`) — verificar compatibilidad

### Notas de compatibilidad
- `ontimize-web-ngx` no tiene versión 16 publicada en npm → usar `^15.9.0`
- Las dependencias de Leaflet son pure-JS, no Angular — técnicamente compatibles con cualquier versión Angular
- `scss-bundle@3.1.1` — verificar compatibilidad con TypeScript ~5.0

### Riesgo: Leaflet
- Las versiones fijas de Leaflet (1.6.0, 0.4.14, etc.) son antiguas. Si hay fallos de compilación o TypeScript, actualizar a últimas versiones estables
- `@types/leaflet`, `@types/leaflet-draw` etc. — pueden necesitar actualización junto a las librerías

### No aplica en esta fase
- **Control flow migration**: pospuesto a Fase 2
- **Standalone**: pospuesto a Fase 3

### Verificación
- `npm run build` — compila sin errores (incluye scss-bundle, copia de imágenes Leaflet y theme)
- Verificar que `dist/images/` contiene las imágenes de Leaflet
- Verificar que `ontimize-web-ngx-map-theme.scss` se copia a `dist/`

---

## FASE 2: Angular 16 → 17 — Rama `migration/17.x.x`

### Acciones a realizar
- Actualizar todas las dependencias Angular a `^17.3.0`
- `ng-packagr` → `^17.3.0`, `typescript` → `~5.2.2`, `zone.js` → `~0.14.0`
- `@angular-eslint/*` → `^17.0.0`
- `@ngbracket/ngx-layout` → `^17.0.1`
- `ontimize-web-ngx` → mantenido en `^15.9.0`
- Actualizar `projects/ontimize-web-ngx-map/package.json`: peer deps a `^17.3.0`

### Control flow migration
- **Herramienta**: `ng generate @angular/core:control-flow`
- **Alcance**: 6 templates HTML con `*ngIf`/`*ngFor`
- Revisar diff — los templates mezclan flex-layout con control flow

### No aplica en este addon
- **Migración `inject()`**: sin usages propios de `Injector.get()`
- **Guards funcionales**: sin guards propios
- **Standalone gradual**: 13 componentes — conveniente migrar todos en Fase 3 con OMapModule como wrapper

### Verificación
- `npm run build` — compila sin errores
- `npm test` — spec pasa

---

## FASE 3: Angular 17 → 18 — Rama `migration/18.x.x`

### 3.1 Actualizar dependencias core
- Actualizar todas las dependencias Angular a `^18.2.0`
- `ng-packagr` → `^18.2.0`, `typescript` → `~5.5.4`
- Añadir `luxon ^3.4.0` + `@types/luxon` (peer de `ngx-material-timepicker` transitivo del framework)
- Eliminar `@angular/flex-layout` y `@ngbracket/ngx-layout`
- `ontimize-web-ngx` → `file:../ontimize-web-ngx/dist/ontimize-web-ngx-18.0.0-SNAPSHOT-0.tgz`
- Actualizar `projects/ontimize-web-ngx-map/package.json`: peer deps a `^18.2.0`, `ontimize-web-ngx ^18.0.0`
- **`projects/ontimize-web-ngx-map/tsconfig.lib.json`**: añadir `"compilationMode": "partial"` en `angularCompilerOptions`
  > ⚠️ `tsconfig.lib.prod.json` ya lo tiene, pero `tsconfig.lib.json` (usado por `npm run build` sin `-c production`) no. Sin esto el dist se compila en modo full y produce errores `NG0203` en el consumidor.

### 3.2 Eliminar flex-layout → CSS nativo
- **Alcance**: 6 templates con directivas `fxLayout`/`fxFlex`/`fxLayoutAlign`/`fxLayoutGap`
- Usar las clases utilitarias `o-flex-*` definidas en `ontimize-web-ngx` (flex-layout.scss)
- **Templates afectados**:
  - `o-map.component.html`
  - `o-map-layer.component.html`
  - `o-map-layer-group.component.html`
  - `o-map-workspace-layer.component.html`
  - `o-navigator-item.component.html`
  - `o-navigator.component.html`

### 3.3 Standalone migration
**Inventario de componentes a migrar:**
| Componente | Archivo |
|---|---|
| `OMapComponent` | `components/map/o-map.component.ts` |
| `OMapBaseLayerComponent` | `components/map-base-layer/` |
| `OMapCrsComponent` | `components/map-crs/` |
| `OMapDrawControlsComponent` | `components/map-draw-controls/` |
| `OMapLayerComponent` | `components/map-layer/` |
| `OMapLayerContainerComponent` | `components/map-layer-container/` |
| `OMapLayerGroupComponent` | `components/map-layer-group/` |
| `OMapWorkspaceComponent` | `components/map-workspace/` |
| `OMapWorkspaceLayerComponent` | `components/map-workspace-layer/` |
| `OMarkerComponent` | `components/marker/` |
| `ONavigatorComponent` | `components/navigator/` |
| `ONavigatorItemComponent` | `components/navigator/` |
| `OToggleIconButtonComponent` | `components/toggle-icon-button/` |

**Módulo wrapper a mantener por backward compatibility:**
- `OMapModule` → re-exportar todos los standalone components

**Pasos:**
1. Añadir `standalone: true` a cada componente
2. Mover sus `imports` de NgModule al array `imports` del decorador `@Component`
   - Identificar qué componentes usan sub-componentes propios del addon (ej. OMapLayerComponent dentro de OMapComponent)
   - OMapComponent seguramente necesita importar todos los sub-componentes
3. Mantener `OMapModule` wrapper re-exportando los standalone components
4. Verificar build con scss-bundle, copia de imágenes Leaflet y theme SCSS

### 3.4 SCSS theming
- `ontimize-web-ngx-map-theme.scss` usa la API M2 de Angular Material — compatible con Angular Material 18 sin cambios
- Se actualizará cuando el framework migre a M3

### 3.5. Migra la aplicación a la rama `migration/18.x.x` y verificación final
- Migrar la aplicacion que esta en la rama `quickstart-15.x.x-develop` y añadir la aplicacion a projects en la rama `migration/18.x.x` para verificar que funciona correctamente con Angular 18 y asi tener un monorepo con las 2 ramas de desarrollo en paralelo (framework y addon)

### No aplica en este addon
- **Typed Forms**: sin uso de `UntypedFormGroup`/`UntypedFormControl` propios
- **Guards funcionales**: sin guards propios
- **inject() migration**: sin usages de `Injector.get()` propios

---

## Verificación por fase

1. `npm run build` — debe compilar sin errores (scss-bundle + copia imágenes Leaflet + theme SCSS)
2. Verificar que `dist/images/` contiene todas las imágenes de Leaflet y Leaflet-draw
3. Verificar que `ontimize-web-ngx-map-theme.scss` se copia a `dist/`
4. `npm test` — spec pasa

---

## Decisiones

- **flex-layout**: Añadir `@ngbracket/ngx-layout` transitional en Fases 1-2; eliminar en Fase 3 y migrar a clases `o-flex-*` del framework
- **ontimize-web-ngx**: Actualizar de versión fija `15.0.0` a `^15.9.0` en Fase 1; apuntar al tgz local `^18.0.0` en Fase 3
- **Leaflet**: Evaluar actualización a versiones más recientes en Fase 1 — las versiones actuales tienen 4+ años. Si hay incompatibilidades TypeScript, actualizar; si no, mantener (son pure-JS)
- **inject()**: No aplica — sin usages propios
- **Standalone**: Migrar los 13 componentes en Fase 3 con `OMapModule` como único wrapper
- **SCSS theming**: `ontimize-web-ngx-map-theme.scss` compatible con M2 sin cambios; postergado a cuando el framework migre a M3
- **Control flow**: Migrar en Fase 2 con el schematic automático
