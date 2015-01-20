(function (Ω) {

    "use strict";

    var Player = Ω.Entity.extend({
        w: 22,
        h: 25,
        speed: 2,

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

            console.log("THE LAST KEY!", Ω.input.lastKey);

            switch (Ω.input.lastKey) {
                case 37:
                    c.translate(c.width/2, c.height/2);
                    c.rotate(-90 * Math.PI/180);
                    this.mouse.render(gfx, -this.y - this.mouse.w, this.x);
                    c.rotate(+90 * Math.PI/180);
                    c.translate(-c.width/2, -c.height/2);
                    break;
                case 39:
                    c.translate(c.width/2, c.height/2);
                    c.rotate(90 * Math.PI/180);
                    this.mouse.render(gfx, this.y, -this.x - this.mouse.w);
                    c.rotate(-90 * Math.PI/180);
                    c.translate(-c.width/2, -c.height/2);
                    break;
                case 40:
                    c.translate(c.width/2, c.height/2);
                    c.rotate(180 * Math.PI/180);
                    console.log(this.x, this.y, this.mouse.h);
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