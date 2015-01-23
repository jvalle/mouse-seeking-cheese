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

            console.log(c);

            this.clear(gfx, "#ff6600");

            this.font.render(gfx, "mouse", 10, 50);
            this.font.render(gfx, "seeking", 10, 50 + this.font.h);
            this.font.render(gfx, "cheese", 10, 50 + 2 * this.font.h);
            this.cheese.render(gfx, (Ω.env.w / 2) - (this.cheese.w / 2), 125 + (this.font.h * 3));
            c.fillText("press [space] to begin", 0, 0);
        }
    });

    window.TitleScreen = TitleScreen;

}(window.Ω));
