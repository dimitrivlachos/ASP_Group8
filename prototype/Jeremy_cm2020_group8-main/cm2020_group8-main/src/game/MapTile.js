import { GameObject } from "./GameObject.js";

export class MapTile extends GameObject {
    constructor(buildable, color, size) {
        super();
        this._buildable = buildable;
        this._color = color;
        this._size = size;
    }

    get IsBuildable() {
        return this._buildable;
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