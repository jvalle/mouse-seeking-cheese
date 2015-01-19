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
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
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

            console.log(this.map);

            this.player = new Player(75, Ω.env.h - 28);

            console.log(this.player);
        },

        tick: function () {
            this.counter++;

            if (!(this.counter % 25)) {
                this.updateMap();
                this.player.move(0, 16, this.map);
            }

            this.player.tick(this.map);
        },

        render: function (gfx) {
            this.clear(gfx, "hsl(5, 40%, 40%)");

            this.map.render(gfx);
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


            if (this.s % 2) {
                row = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            } else {
                for (var i = 0; i < 10; i++) {
                    if (i < wallct) {
                        row.push(1);
                    } else {
                        row.push(0);
                    }
                }
            }


            this.map.cells.unshift(this.shuffle(row));
            this.s++;
        },

        shuffle: function (o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
