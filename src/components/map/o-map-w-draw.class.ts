import { OMapWWorkspace } from './o-map-w-workspace.class';

export class OMapWDraw extends OMapWWorkspace {
	public drawControl: boolean = false;

	protected configureDrawControl(map: L.Map): void {
		var editableLayers = new L.FeatureGroup();
		map.addLayer(editableLayers);

		var options: L.Control.IDrawConstructorOptions = {
			position: 'topright',
			draw: {
				polygon: {
					allowIntersection: false // Restricts shapes to simple polygons
				}
			},
			edit: {
				featureGroup: editableLayers, //REQUIRED!!
				remove: true
			}
		};

		var drawControl = new L.Control.Draw(options);
		map.addControl(drawControl);

		map.on('draw:created', function (e) {
			//TODO editableLayers.addLayer(e.layer);
		});
	}
}
