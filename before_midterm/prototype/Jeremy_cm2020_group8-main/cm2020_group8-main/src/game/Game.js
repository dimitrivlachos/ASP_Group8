import { Enemy } from './Enemy.js';
import { EnemyManager } from './EnemyManager.js';
import { Map } from './Map.js';

export class Game {

    constructor() {
        this._map = new Map();
        this._map.LoadTestMap();
        this._map.onSelectedTileChanged = this.onMapSelectedTileChanged;
        this._waypoints = this._map.GenerateWaypoints();

        this._enemyManager = new EnemyManager();
        this._enemyWaypointIndex = 1;
        this._enemy = new Enemy(this._waypoints[this._enemyWaypointIndex], 20, 100);
        this._enemy.Position = this._waypoints[0].Position;

        this._enemy.onWaypointReached = this.enemyReachedWaypoint.bind(this);

        this._enemyManager.addChild(this._enemy);
    }

    onMapSelectedTileChanged(selectedTile) {
        // use this callback to trigger UI data about the selected tile.
        console.log("Selected Tile is buildable ", selectedTile.IsBuildable);
    }

    enemyReachedWaypoint() {
        this._enemyWaypointIndex++;
        if (this._enemyWaypointIndex < this._waypoints.length) {
            this._enemy.TargetWaypoint = this._waypoints[this._enemyWaypointIndex];
        }
    }

    processInput() {
        this._map.processInput(mouseX, mouseY); // later, the mouse x and y will need to compensate for scrolling to be map relative.
    }

    draw() {
        this._map.update(deltaTime);
        this._map.draw();

        this._enemyManager.update(deltaTime);
        this._enemyManager.draw();
    }
}