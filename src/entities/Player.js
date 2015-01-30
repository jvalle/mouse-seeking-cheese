(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 22,
        h: 25,
        speed: 2.5,

        mouse: new Ω.Image('res/mouse.svg', 2, 0.5),

        tick: function (map) {
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
            var c = gfx.ctx;

            // normalize the forward-ness
            if (Ω.input.isDown("up") && !(Ω.input.isDown("left") || Ω.input.isDown("right")))
                Ω.input.lastKey = 38;

            // and i guess the backwards-ness, to be thorough
            if (Ω.input.isDown("down") && !(Ω.input.isDown("left") || Ω.input.isDown("right")))
                Ω.input.lastKey = 40;

            switch (Ω.input.lastKey) {
                case 37: // going left
                    c.translate(c.width/2, c.height/2);
                    c.rotate(-90 * Math.PI/180);
                    this.mouse.render(gfx, -this.y - this.mouse.w, this.x);
                    c.rotate(+90 * Math.PI/180);
                    c.translate(-c.width/2, -c.height/2);
                    break;
                case 39: // going right
                    c.translate(c.width/2, c.height/2);
                    c.rotate(90 * Math.PI/180);
                    this.mouse.render(gfx, this.y, -this.x - this.mouse.w);
                    c.rotate(-90 * Math.PI/180);
                    c.translate(-c.width/2, -c.height/2);
                    break;
                case 40: // going backwards...       why are you going backwards?
                    c.translate(c.width/2, c.height/2);
                    c.rotate(180 * Math.PI/180);
                    this.mouse.render(gfx, -this.x - this.mouse.w, -this.y - this.mouse.h);
                    c.rotate(-180 * Math.PI/180);
                    c.translate(-c.width/2, -c.height/2);
                    break;
                default:
                    this.mouse.render(gfx, this.x, this.y);
            }

        }

    });

    window.Player = Player;

}(window.Ω));