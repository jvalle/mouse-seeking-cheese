(function (Ω) {

	"use strict";

	var Cat = Ω.Entity.extend({
		w: 320,
		h: 75,
		catCounter: 0,

		bend: new Ω.Image('res/bend.png'),

		tick: function (map) {
			var x = 0,
				y = 0;

			if (!this.catCounter) {
				// play cat sound
			}

			this.move(x, y, map);

			this.catCounter++;
			this.y--;
		},

		render: function (gfx) {
			this.bend.render(gfx, this.x, this.y);
		},

	});

	window.Cat = Cat;
}(window.Ω));