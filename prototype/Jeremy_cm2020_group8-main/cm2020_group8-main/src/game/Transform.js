export class Transform {
    #_position;
    #_scale;

    constructor() {
        this.#_position = createVector(0, 0);
        this.rotation = 0;
        this.#_scale = createVector(1, 1);
    }

    get position() {
        return createVector(this.#_position.x, this.#_position.y);
    }

    set position(value) {
        this.#_position = value;
    }

    get scale() {
        return createVector(this.#_scale.x, this.#_scale.y);
    }

    set scale(value) {
        this.#_scale = value;
    }

    push() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation);
        scale(this.scale.x, this.scale.y);
    }

    pop() {
        pop();
    }
}