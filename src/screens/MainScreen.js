(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        sheet: new Ω.SpriteSheet('res/tiles.png', 32, 32),
        font: new Ω.Font("res/mamefont.png", 16, 16, "abcdefghijklmnopqrstuvwxyz0123456789~.,:!?'\"&<>"),
        scrollY: 1,
        rowFreq: 32,

        init: function () {
            this.counter = 0;
            this.s = 0;

            console.log(this.sheet);

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
            this.state = new Ω.utils.State('PREGAME');

            this.camera.y = this.player.y - (Ω.env.h - 130);
        },

        tick: function () {
            this.counter++;
            this.state.tick();

            switch (this.state.get()) {
                case 'PREGAME':
                    if (this.state.count > 30 &&
                        Ω.input.isDown("left") ||
                        Ω.input.isDown("right") ||
                        Ω.input.isDown("up") ||
                        Ω.input.isDown("down") ) {
                        this.state.set('PARTY');
                    }
                    break;
                case 'PARTY':
                    // maybe break this out into its own tick.party function
                    if (!(this.counter % 120)) {
                        this.updateSpeed();
                    }

                    if (!(this.counter % this.rowFreq)) {
                        this.updateMap();
                        this.player.move(0, 32, this.map);
                    }

                    this.camera.y -= this.scrollY;

                    this.player.tick(this.map);
                    break;
                case 'COPS':
                    if (this.state.first()) {
                        this.shake = new Ω.Shake(30);
                    }
                    if (this.state.count > 20) {
                        this.state.set('BUSTED');
                    }
                    break;
                case 'BUSTED':
                    // save / display score
                    // restart game
            }


        },

        render: function (gfx) {
            this.clear(gfx, "#666666");

            switch (this.state.get()) {
                case 'PREGAME':
                    this.map.render(gfx, this.camera);
                    this.player.render(gfx);
                    this.font.render(gfx, "use", 10, 50);
                    this.font.render(gfx, "arrow", 10, this.font.h);
                    this.font.render(gfx, "keys", 10, 2 * this.font.h);
                    this.font.render(gfx, "to", 10, 3 * this.font.h);
                    this.font.render(gfx, "move", 10, 4 * this.font.h);
                    break;
                case 'PARTY':
                    this.map.render(gfx, this.camera);
                    this.player.render(gfx);
                    break;
                case 'COPS':
                    this.font.render(gfx, "YOU DIED", 10, 50);
                case 'BUSTED':
                    // end game stuff
            }

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
        },

        updateSpeed: function () {
            this.scrollY += 0.02
            this.updateFrequency();
        },

        updateFrequency: function () {
            this.rowFreq = Math.floor(this.sheet.h / this.scrollY);
        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
