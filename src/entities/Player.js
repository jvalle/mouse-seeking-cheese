(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 22,
        h: 25,
        speed: 2,

        mouse: new Ω.Image('res/mouse.svg', 2, 0.5),

        tick: function (map) {

            console.log('mouse width', this.mouse.w);

            var x = 0,
                y = 0;

            // check those collisions for the map
            if (this.x >= map.w - this.w) {
                x -= this.speed;
            } else if (this.x <= 0) {
                x += this.speed;
            } else {
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
            }

            this.move(x, y, map);
        },

        render: function (gfx) {
            // var c = gfx.ctx;

            // c.fillStyle = "#333";
            // c.fillRect(this.x, this.y, this.w, this.h);

            this.mouse.render(gfx, this.x, this.y);
        }

    });

    window.Player = Player;

}(window.Ω));