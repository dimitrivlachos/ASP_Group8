import { Navigator } from './src/states/Navigator.js';
import { FrontEndState, InGameState } from './src/states/GameState.js';

var navigator;
var mouseWasPressed = false;

window.setup = () => {
    createCanvas(900, 600);
    background(0);
    navigator = new Navigator();
    Navigator.addState(new FrontEndState("FrontEnd"));
    Navigator.addState(new InGameState("InGame"));
    Navigator.switchState("FrontEnd");
}

window.draw = () => {
    let mouseJustPressed = !mouseWasPressed && mouseIsPressed;
    Navigator.currentState.processInput(mouseJustPressed);
    Navigator.currentState.draw();
    mouseWasPressed = mouseIsPressed;
}
