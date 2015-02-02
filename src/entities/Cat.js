(function (Ω) {

    "use strict";

    var Cat = Ω.Entity.extend({
        w: 320,
        h: 222,
        catCounter: 0,

        meow: new Ω.Sound('res/cat.wav'),

        bendR: new Ω.Image('res/bend.png'),

        bendL: new Ω.Image('res/bend.png', 1),

        tick: function (map) {
            var x = 0,
                y = 0;

            if (!this.catCounter) {
                this.meow.play();
            }

            if (this.y > Ω.env.h - 200 && this.catCounter % 2) {
                this.y--;
            }

            this.move(x, y, map);

            this.catCounter++;
        },

        render: function (gfx, flip) {
            if (flip) {
                this.bendL.render(gfx, this.x, this.y);
            } else {
                this.bendR.render(gfx, this.x, this.y);
            }
        },

    });

    window.Cat = Cat;
}(window.Ω));