(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        sheet: new Ω.SpriteSheet('res/tiles.png', 32, 32),

        init: function () {
            this.counter = 0;
            this.s = 0;

            this.map = new Ω.Map(this.sheet, [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]);

            this.camera = new Ω.Camera(0, 0, Ω.env.w, Ω.env.h);
            this.player = new Player(75, Ω.env.h - 28);

            this.camera.y = this.player.y - (Ω.env.h - 130);
        },

        tick: function () {
            this.counter++;

            if (!(this.counter % 34)) {
                this.updateMap();
                this.player.move(0, 32, this.map);
            }

            this.camera.y -= 1;

            this.player.tick(this.map);
        },

        render: function (gfx) {
            this.clear(gfx, "hsl(5, 40%, 40%)");

            this.map.render(gfx, this.camera);
            this.player.render(gfx);
        },

        updateMap: function () {
            this.map.cells.pop();
            this.addRow(this.counter);
        },

        addRow: function (difficulty) {

            // TODO:  this needs to be re-thought -- it isn't exactly 'good code'

            var row = [],
                wallct = (difficulty.toString().length + Math.round(Math.random() * 3)) + 2;

            if (this.s++ % 2) {
                row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else {
                for (var i = 0; i < 10; i++) {
                    if (i < wallct) {
                        row.push(1);
                    } else {
                        row.push(0);
                    }
                }

                row = this.shuffle(row);
            }

            this.camera.moveBy(0, 32);
            this.map.cells.unshift(row);
        },

        shuffle: function (o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
