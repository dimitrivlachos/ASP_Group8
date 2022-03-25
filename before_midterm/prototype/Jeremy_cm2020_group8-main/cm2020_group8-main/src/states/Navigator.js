export class Navigator {
    static instance = null;

    constructor() {
        this._states = [];
        this._currentState = null;
        Navigator.instance = this;
    }

    static get currentState() {
        return Navigator.instance._currentState;
    }

    static addState(state) {
        Navigator.instance._states.push(state);
    }

    static switchState(stateName) {
        var nav = Navigator.instance;
        if (nav._currentState != null && nav._currentState.name == stateName)
            return;

        for (var i = 0; i < nav._states.length; ++i) {
            if (nav._states[i].name == stateName) {
                if (nav._currentState != null) {
                    nav._currentState.onExit();
                }
                nav._currentState = nav._states[i];
                nav._currentState.onEnter();
                return;
            }
        }
    }
}