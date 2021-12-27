import { Transform } from './Transform.js';

export class GameObject {
    constructor() {
        this._children = [];
        this._parent = null;
        this._transform = new Transform();
        this._enabled = true;
    }

    set PositionX(x) {
        this._transform.position.x = x;
    }

    set PositionY(y) {
        this._transform.position.y = y;
    }

    set Position(posVec) {
        this._transform.position = posVec;
    }

    get Position() {
        return this._transform.position;
    }

    get Enabled() {
        return this._enabled;
    }

    set Enabled(value) {
        this._enabled = value;
    }

    addChild(child) {
        this._children.push(child);
    }

    update(deltaTime) {
        if (this._enabled)
        {
            this.updateImp(deltaTime);
            for (let i = 0; i < this._children.length; i++) {
                this._children[i].update(deltaTime);
            }
        }
    }

    updateImp(deltaTime) {
    }

    draw() {
        if (this._enabled) {
            this._transform.push();
            this.drawImp();
            for (let i = this._children.length - 1; i >= 0; i--) {
                this._children[i].draw();
            }
            this._transform.pop();
        }
    }

    drawImp() {
    }
}