import { Map } from './Map.js';

export class Game {
    constructor() {
        this._map = new Map();
        this._map.LoadTestMap();
        this._map.onSelectedTileChanged = this.onMapSelectedTileChanged;
    }

    onMapSelectedTileChanged(selectedTile) {
        // use this callback to trigger UI data about the selected tile.
        console.log("Selected Tile is buildable ", selectedTile.IsBuildable);
    }

    processInput() {
        this._map.processInput(mouseX, mouseY); // later, the mouse x and y will need to compensate for scrolling to be map relative.
    }

    draw() {
        this._map.update(deltaTime);
        this._map.draw();
    }
}