export class Button {
    constructor(text, x, y, w, h, fillColor, lineColor) {
        this._text = text;
        this._x = x;
        this._y = y;
        this._w = w;
        this._h = h;
        this._lineColor = lineColor;
        this._fillColor = fillColor;
    }

    set onButtonClicked(callback) {
        this._onClickCallback = callback;
    }

    draw() {
        push();
            translate(this._x, this._y);
            rectMode(CENTER);
            
            fill(this._fillColor);
            stroke(this._lineColor);
            strokeWeight(2);

            rect(0, 0, this._w, this._h);

            textSize(16);
            textAlign(CENTER, CENTER);
            text(this._text, 0, 0);
        pop();
    }

    get isClicked() {
        let left = this._x - this._w * 0.5;
        let right = this._x + this._w * 0.5;
        let top = this._y - this._h * 0.5;
        let bottom = this._y + this._h * 0.5;
        return mouseX >= left && mouseX <= right &&
                mouseY >= top && mouseY <= bottom;
    }

    processClick() {
        if (this.isClicked && this._onClickCallback != null) {
            this._onClickCallback();
        }
    }
}