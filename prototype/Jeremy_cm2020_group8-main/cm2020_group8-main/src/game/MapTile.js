import { GameObject } from "./GameObject.js";

export class MapTileTypes {
    static Buildable = new MapTileTypes("buildable");
    static Path = new MapTileTypes("path");
    static Target = new MapTileTypes("target");

    constructor(name) {
        this.name = name;
    }
}

export class MapTile extends GameObject {
    constructor(tileType, color, size) {
        super();
        this._tileType = tileType;
        this._color = color;
        this._size = size;
    }

    get IsBuildable() {
        return this._tileType == MapTileTypes.Buildable;
    }

    get IsPath() {
        return this._tileType == MapTileTypes.Path;
    }

    get IsTarget() {
        return this._tileType == MapTileTypes.Target;
    }

    get TileType() {
        return this._tileType;
    }

    get Size() {
        return this._size;
    }

    drawImp() {
        push();

        fill(this._color);
        stroke(0);
        strokeWeight(0.5);

        rect(0, 0, this._size, this._size);

        pop();
    }
}