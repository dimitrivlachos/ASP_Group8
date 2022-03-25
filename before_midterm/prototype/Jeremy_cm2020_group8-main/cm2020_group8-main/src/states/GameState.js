import { Game } from '../game/Game.js';
import { Button } from '../ui/Button.js';
import { Navigator } from './Navigator.js';

class GameState {
    constructor(name) {
        this.name = name;
        this._buttons = [];
    }

    addButton(button) {
        this._buttons.push(button);
    }

    draw() {
    }

    processInput(mouseJustPressed) {
        if (mouseJustPressed) {
            for(var i = 0; i < this._buttons.length; ++i) {
                this._buttons[i].processClick();
            }
        }
    }

    onExit() {
        console.log("Leaving state " + this.name);
    }

    onEnter() {
        console.log("Entering state " + this.name);
    }
}

export class FrontEndState extends GameState {
    constructor(name) {
        super(name);
        this._playButton = new Button("Play", 200, 550, 100, 40, color(200, 200, 200), color(0, 0, 0));
        this._playButton.onButtonClicked = this.onPlayButtonClicked;

        this.addButton(this._playButton);
    }

    onPlayButtonClicked() {
        Navigator.switchState("InGame");
    }

    draw() {
        background(255, 0, 0);
        this._playButton.draw();
    }
}

export class InGameState extends GameState {
    constructor(name) {
        super(name);
        this._exitButton = new Button("Exit", 200, 550, 100, 40, color(200, 200, 200), color(0, 0, 0));
        this._exitButton.onButtonClicked = this.onExitButtonClicked;

        this._game = new Game();

        this.addButton(this._exitButton);
    }

    processInput(mouseJustPressed) {
        super.processInput(mouseJustPressed);
        if (mouseJustPressed) {
            this._game.processInput();
        }
    }

    onExitButtonClicked() {
        Navigator.switchState("FrontEnd");
    }

    draw() {
        background(0, 255, 0);

        this._game.draw();

        this._exitButton.draw();
    }
}