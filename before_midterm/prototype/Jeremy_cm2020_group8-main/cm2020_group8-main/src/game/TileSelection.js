import { GameObject } from "./GameObject.js";

export class TileSelection extends GameObject {
    constructor(size) {
        super();
        this._tileSize = size;
    }

    drawImp() {
        push();

        fill(255, 255, 80, 128);
        stroke(255, 255, 0);
        strokeWeight(4);
        rect(0, 0, this._tileSize, this._tileSize);

        pop();
    }
}