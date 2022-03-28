import { GameObject } from "./GameObject.js";

export class Enemy extends GameObject {
    #_targetWaypoint;
    #_speed;
    #_health;

    #_onWaypointReachedCallback = null;
    #_onHealthChangedCallback = null;
    #_onDieCallback = null;;

    constructor(targetWaypoint, speed, health) {
        super();
        this.#_targetWaypoint = targetWaypoint;
        this.#_speed = speed;
        this.#_health = health;
    }

    set onWaypointReached(callback) {
        this.#_onWaypointReachedCallback = callback;
    }

    set onHealthChanged(callback) {
        this.#_onHealthChangedCallback = callback;
    }

    set onDie(callback) {
        this.#_onDieCallback = callback;
    }

    get Health() {
        return this.#_health;
    }

    set TargetWaypoint(value) {
        this.#_targetWaypoint = value;
    }

    applyDamage(amount) {
        this.#_health -= amount;
        if (this.#_health <= 0) {
            this.#_health = 0;
            if (this.#_onDieCallback != null) {
                this.#_onDieCallback();
            }
        }

        if (this.#_onHealthChangedCallback != null) {
            this.#_onHealthChangedCallback(this.#_health);
        }
    }

    updateImp(deltaTime) {
        let curPos = this.Position;
        let waypointPos = this.#_targetWaypoint.Position;
        let targetVector = waypointPos.sub(curPos);
        let targetDistance = targetVector.mag();
        let moveDistance = this.#_speed * (deltaTime / 1000.0);

        if (moveDistance >= targetDistance) {
            this.Position = this.#_targetWaypoint.Position;
            if (this.#_onWaypointReachedCallback != null) {
                this.#_onWaypointReachedCallback();
            }
        } else {
            targetVector.normalize();
            targetVector.mult(moveDistance);
            this.Position = curPos.add(targetVector);
        }

    }

    drawImp() {
        push();
        fill(255, 0, 0);
        noStroke();
        circle(0, 0, 30);
        pop();
    }
}