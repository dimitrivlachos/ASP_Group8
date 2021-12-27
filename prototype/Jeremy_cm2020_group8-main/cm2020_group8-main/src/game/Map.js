import { GameObject } from "./GameObject.js";
import { MapTile } from "./MapTile.js";
import { TileSelection } from "./TileSelection.js";
import { Vector2 } from "./Transform.js";

export class Map extends GameObject {
    constructor() {
        super();
        this._columns = 6;
        this._rows = 6;
        this._tileSize = 80;
        this._tiles = [];
        this._selectedTileObject = new TileSelection(this._tileSize);
        this._tileGameObject = new GameObject();

        this._selectedTileIndex = 0;

        this.addChild(this._selectedTileObject);
        this.addChild(this._tileGameObject);
    }

    set onSelectedTileChanged(callback) {
        this._onSelectedTileChanged = callback;
    }

    get SelectedTile() {
        if (this._selectedTileIndex >= 0) {
            return this._tiles[this._selectedTileIndex];
        }
        return null;
    }

    processInput(x, y) {
        let mapWidth = this._columns * this._tileSize;
        let mapHeight = this._rows * this._tileSize;
        if (x >= 0 && x <= mapWidth && y >= 0 && y <= mapHeight)
        {
            let column = Math.floor(x / this._tileSize);
            let row = Math.floor(y / this._tileSize);
            this._selectedTileIndex = row * this._columns + column;
            this._selectedTileObject.Position = new Vector2(column * this._tileSize, row * this._tileSize);

            if (this._onSelectedTileChanged != null) {
                this._onSelectedTileChanged(this.SelectedTile);
            }
        }
    }

    updateImp(deltaTime) {

    }

    LoadTestMap() {
        
        let greenColor = color(80, 255, 80);
        let brownColor = color(255, 255, 128);
        let greyColor = color(128);
        this._tiles = [
            new MapTile(true, greenColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize),
            new MapTile(true, greenColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize),
            new MapTile(true, greenColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize),
            new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize),
            new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(false, brownColor, this._tileSize), new MapTile(true, greenColor, this._tileSize),
            new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(true, greenColor, this._tileSize), new MapTile(false, greyColor, this._tileSize), new MapTile(true, greenColor, this._tileSize)
        ];

        for(var r = 0; r < this._rows; r++) {
            for(var c = 0; c < this._columns; c++) {
                let index = r * 6 + c;
                let tile = this._tiles[index];
                tile.Position = new Vector2(c * this._tileSize, r * this._tileSize);
                this._tileGameObject.addChild(tile);
            }
        }
    }
}