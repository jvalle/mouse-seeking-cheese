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
            var c = gfx.ctx;
            c.font = "48px serif";

            this.clear(gfx, "#ff6600");

            this.font.render(gfx, "mouse", 10, 50);
            this.font.render(gfx, "seeking", 10, 50 + this.font.h);
            this.font.render(gfx, "cheese", 10, 50 + 2 * this.font.h);
            this.cheese.render(gfx, (Ω.env.w / 2) - (this.cheese.w / 2), 100 + (this.font.h * 3));
            this.font.render(gfx, "press space", 70, 400);
            this.font.render(gfx, "to begin", 90, 400 + 2 * this.font.h);
        }
    });

    window.TitleScreen = TitleScreen;

}(window.Ω));
