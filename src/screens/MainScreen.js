(function (Ω) {

    "use strict";

    var MainScreen = Ω.Screen.extend({

        sheet: new Ω.SpriteSheet('res/tiles.png', 32, 32),
        font: new Ω.Font("res/mamefont.png", 16, 16, "abcdefghijklmnopqrstuvwxyz0123456789~.,:!?'\"&<>"),
        scrollY: 1,
        rowFreq: 31,
        dead: new Ω.Sound('res/dead.mp3'),

        init: function () {
            this.counter = 0;
            this.s = 0;

            this.map = new Ω.Map(this.sheet, [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 1, 1, 1, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 0, 0, 0, 0, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 1, 0, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ]);

            this.camera = new Ω.Camera(0, 0, Ω.env.w, Ω.env.h);
            this.player = new Player(75, Ω.env.h - 38);
            this.cat = new Cat(0, Ω.env.h);
            this.state = new Ω.utils.State('PREGAME');

            this.camera.y = 0;
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

                    this.tickParty();

                    break;
                case 'COPS':
                    if (this.state.first()) {
                        this.shake = new Ω.Shake(30);
                    }
                    if (this.state.count > 100) {
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
                    this.font.render(gfx, "use", 10, 256);
                    this.font.render(gfx, "arrow", 45, 256 + this.font.h);
                    this.font.render(gfx, "keys", 55, 322);
                    this.font.render(gfx, "to", 70, 322 + this.font.h);
                    this.font.render(gfx, "move", 85, 385);
                    break;
                case 'PARTY':
                    this.map.render(gfx, this.camera);
                    this.player.render(gfx);
                    if (this.state.count > 500) {
                        this.cat.render(gfx);
                    }
                    break;
                case 'COPS':
                    this.font.render(gfx, "YOU DIED", 10, 50);
                case 'BUSTED':
                    // end game stuff
            }
        },

        tickParty: function () {
            if (!(this.counter % 120)) {
                this.updateSpeed();
            }

            if (!(this.counter % this.rowFreq)) {
                this.updateMap();
                this.player.move(0, 32, this.map);
            }

            if (this.state.count > 500) {
                this.cat.tick(this.map);
            }

            if (this.player.y >= this.cat.y) {
                this.dead.play();
                this.state.set('COPS');
            }
            console.log('the state counter: ' + this.state.count);

            this.camera.y -= this.scrollY.toFixed(2);

            this.player.tick(this.map);
        },

        updateSpeed: function () {
            this.scrollY += 0.02;
            this.rowFreq = Math.round(31 / this.scrollY);
            console.log('scroll speed: ' + this.scrollY.toFixed(2) + ', rowFreq: ' + this.rowFreq);
        },

        updateMap: function () {
            this.map.cells.pop();
            this.addRow(this.counter);
            this.camera.moveBy(0, 32);
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

            this.map.cells.unshift(row);
        },
        shuffle: function (o) {
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
    });

    window.MainScreen = MainScreen;

}(window.Ω));
