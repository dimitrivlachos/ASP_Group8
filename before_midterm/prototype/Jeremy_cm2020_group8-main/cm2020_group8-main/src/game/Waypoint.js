export class Waypoint {
    #_mapTile;

    constructor (mapTile) {
        this.#_mapTile = mapTile;
    }

    get MapTile() {
        return this.#_mapTile;
    }

    get Position() {
        let halfTileSize = this.#_mapTile.Size * 0.5;
        let tilePos = this.#_mapTile.Position;
        tilePos.add(createVector(halfTileSize, halfTileSize));
        return tilePos;
    }

    get IsTarget() {
        return this.#_mapTile.IsTarget;
    }
}