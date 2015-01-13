(function (Ω) {

    "use strict";

    var TitleScreen = Ω.Screen.extend({

        font: new Ω.Font("res/mamefont.png", 16, 16, "abcdefghijklmnopqrstuvwxyz0123456789~.,:!?'\"&<>"),
        cheese: new Ω.Image("res/Cheese-Sprite.png"),

        init: function () {
        },

        tick: function () {

            if (Ω.input.pressed("space")) {
                window.game.setScreen(new MainScreen());
            }
        },

        render: function (gfx) {
            var title = "mouse seeking cheese",
                inst = "press [space] to begin";

            this.clear(gfx, "#ff6600");

            this.font.render(gfx, title, 10, 125);
            this.font.render(gfx, inst, 10, 125 + this.font.h);

            this.cheese.render(gfx, 10, 125 + (this.font.h * 3));

        }
    });

    window.TitleScreen = TitleScreen;

}(window.Ω));
