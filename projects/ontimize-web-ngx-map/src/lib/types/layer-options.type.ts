export type OMapLayerOptions = {
  layerOptions?: OLayerOptions;
  layerStyles?: OLayerStyles;
  iconOptions?: OIconOptions;
  popupOptions?: OPopupOptions;
  tooltipOptions?: OTooltipOptions;
  customOptions?: any;
};

export type OLayerOptions = {
  interactive?: boolean;

  // ImageOverlay
  opacityM?: number;
  alt?: string;
  crossOrigin?: boolean | string;
  errorOverlayUrl?: string;
  zIndex?: number;
  className?: string;

  // Marker
  icon?: any;
  keyboard?: boolean;
  title?: string;
  // alt?: string;
  zIndexOffset?: number;
  opacity?: number;
  riseOnHover?: boolean;
  riseOffset?: number;
  pane?: string;
};

export type OLayerStyles = {
  stroke?: boolean;
  color?: string;
  weight?: number;
  opacity?: number;
  lineCap?: string;
  lineJoin?: string;
  dashArray?: string;
  dashOffset?: string;
  fill?: boolean;
  fillColor?: string;
  fillOpacity?: number;
  fillRule?: string;
  className?: string;

  // Circle
  radius?: number;
  // Polyline
  smoothFactor?: number;
  noClip?: boolean;
};

export type OIconOptions = {
  iconFromProperties?: string; // ontimize-web-ngx-map attribute

  iconUrl?: string;
  iconRetinaUrl?: string;
  iconSize?: [number, number];
  iconAnchor?: [number, number];
  popupAnchor?: [number, number];
  tooltipAnchor?: [number, number];
  shadowUrl?: string;
  shadowRetinaUrl?: string;
  shadowSize?: [number, number];
  shadowAnchor?: [number, number];
  className?: string;
};

export type OPopupOptions = {
  maxWidth?: number;
  minWidth?: number;
  maxHeight?: number;
  autoPan?: boolean;
  keepInView?: boolean;
  closeButton?: boolean;
  autoClose?: boolean;
  closeOnEscapeKey?: boolean;
  closeOnClick?: boolean;
  className?: string;
};

export type OTooltipOptions = {
  direction?: string;
  permanent?: boolean;
  sticky?: boolean;
  interactive?: boolean;
  opacity?: number;
};
