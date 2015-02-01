(function (Ω) {

    "use strict";

    var MouseMaze = Ω.Game.extend({

        canvas: "#game",

        init: function (w, h) {

            this._super(w, h);

            this.fps = false;

            Ω.input.bind({
                "space": "space",
                "left": "left",
                "right": "right",
                "up": "up",
                "down": "down",
            });

        },

        load: function () {
            this.setScreen(new TitleScreen());
        }

    });

    window.MouseMaze = MouseMaze;

}(Ω));
