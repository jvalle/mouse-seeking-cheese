(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 10,
        h: 10,
        speed: 2,

        tick: function (map) {

            var x = 0,
                y = 0;

            if (Ω.input.isDown("left")) {
                x -= this.speed;
            }
            if (Ω.input.isDown("right")) {
                x += this.speed;
            }
            if (Ω.input.isDown("up")) {
                y -= this.speed;
            }
            if (Ω.input.isDown("down")) {
                y += this.speed;
            }

            this.move(x, y, map);
        },

        render: function (gfx) {

            var c = gfx.ctx;
            c.fillStyle = "#333";
            c.fillRect(this.x, this.y, this.w, this.h);
        }

    });

    window.Player = Player;

}(window.Ω));