export class Vector2 {
    constructor(x, y) {
        if (x == null)
            this.x = 0;
        else
            this.x = x;
        
        if (y == null)
            this.y = 0;
        else 
            this.y = y;
    }
}

export class Transform {
    constructor() {
        this.position = new Vector2(0, 0);
        this.rotation = 0;
        this.scale = new Vector2(1, 1);
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