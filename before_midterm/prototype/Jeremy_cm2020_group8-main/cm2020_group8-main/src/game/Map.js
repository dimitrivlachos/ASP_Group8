import { GameObject } from "./GameObject.js";
import { MapTile, MapTileTypes } from "./MapTile.js";
import { TileSelection } from "./TileSelection.js";
import { Waypoint } from "./Waypoint.js";

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
            this._selectedTileObject.Position = createVector(column * this._tileSize, row * this._tileSize);

            if (this._onSelectedTileChanged != null) {
                this._onSelectedTileChanged(this.SelectedTile);
            }
        }
    }

    updateImp(deltaTime) {

    }

    GetTileIndex(x, y) {
        return y * this._columns + x;
    }

    LoadTestMap() {
        
        let greenColor = color(80, 255, 80);
        let brownColor = color(255, 255, 128);
        let greyColor = color(128);
        this._tiles = [
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize),
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize),
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize),
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize),
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Path, brownColor, this._tileSize),      new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize),
            new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize), new MapTile(MapTileTypes.Target, greyColor, this._tileSize),     new MapTile(MapTileTypes.Buildable, greenColor, this._tileSize)
        ];

        for(var r = 0; r < this._rows; r++) {
            for(var c = 0; c < this._columns; c++) {
                let index = this.GetTileIndex(c, r);
                let tile = this._tiles[index];
                tile.Position = new createVector(c * this._tileSize, r * this._tileSize);
                this._tileGameObject.addChild(tile);
            }
        }
    }

    // this will generate the way points based on the tile layout
    GenerateWaypoints() {
        let waypoints = [];

        // create a fake tile to use that is off of the map, this will be the "spawn point" of the enemy
        // because we are not adding this map tile as a child, it will not draw.
        let startTile = new MapTile(MapTileTypes.Path, color(0), this._tileSize);
        startTile.Position = createVector(this._tileSize, -this._tileSize);
        waypoints.push(new Waypoint(startTile));

        let currentX = 1; // start x, y of the first path tile in the map
        let currentY = 0;
        let currentTile = this._tiles[this.GetTileIndex(currentX, currentY)];
        while (currentTile != null) {
            // add the current tile to the 
            waypoints.push(new Waypoint(currentTile));
            if (!currentTile.IsTarget) {
                currentTile = null;
                let checkTileRight = this._tiles[this.GetTileIndex(currentX + 1, currentY)];
                let checkTileDown = this._tiles[this.GetTileIndex(currentX, currentY + 1)];
                if (checkTileRight.IsPath || checkTileRight.IsTarget) {
                    currentTile = checkTileRight;
                    currentX++;
                } else if (checkTileDown.IsPath || checkTileDown.IsTarget) {
                    currentTile = checkTileDown;
                    currentY++;
                }
            } else {
                currentTile = null;
            }
        }

        return waypoints;
    }
}