(function (Ω) {

    "use strict";

    var MouseMaze = Ω.Game.extend({

        canvas: "#board",

        init: function (w, h) {

            this._super(w, h);

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
