Newton.Scene = Newton.Class.extend({
    initialize: function () {
        this.frameTimeLimit = 100;
    },

    gameLoop: function (callback) {
        this.lastGameLoopFrame = new Date().getTime();
        this.callback = callback;
        // Short circuit the loop check in case multiple scenes
        // are staged immediately
        this.loop = true;

        // Keep track of the frame we are on (so that animations can be synced
        // to the next frame)
        this._loopFrame = 0;

        window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));

    },


    gameLoopCallbackWrapper: function () {
        var now = new Date().getTime();
        this._loopFrame++;
        this.loop = window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
        var dt = now - this.lastGameLoopFrame;
        /* Prevent fast-forwarding by limiting the length of a single frame. */
         if(dt > this.frameTimeLimit) { dt = this.frameTimeLimit; }
        this.callback.apply(this, [dt / 1000]);
        this.lastGameLoopFrame = now;
    },


    pauseGame: function () {
        if (this.loop) {
            window.cancelRequestAnimFrame(this.loop);
        }
        this.loop = null;
    },

    unpauseGame: function () {
        if (!this.loop) {
            this.lastGameLoopFrame = new Date().getTime();
            this.loop = window.requestAnimationFrame(this.gameLoopCallbackWrapper.bind(this));
        }
    }

});

Newton.scene = function (parametrs) {
    return new Newton.Scene(parametrs);
};