/* model */

var model = {
	current: null,
	cats: [
		{
			name: 'Tayson',
			likes: 0,
			img: 'images/cat_picture1.jpg'
		},
		{
			name: 'Mike',
			likes: 0,
			img: 'images/cat_picture2.jpg'
		},
		{
			name: 'Kuzya',
			likes: 0,
			img: 'images/cat_picture3.jpg'
		},
		{
			name: 'Jeffry',
			likes: 0,
			img: 'images/cat_picture4.jpg'
		},
		{
			name: 'Snowy',
			likes: 0,
			img: 'images/cat_picture5.jpg'
		}
	]
};

/* controller */

var controller = {
	init: function() {
		model.current = model.cats[0];

		viewList.init();
		viewCurrent.init();
	},

	getCurrent: function() {
		return model.current;
	},

	setCurrent: function(obj) {
		model.current = obj;
	},

	getAll: function() {
		return model.cats;
	},

	increaseLikes: function() {
		++model.current.likes;
		viewCurrent.render();
	}
};

/* view */

var viewList = {
	init: function() {
		this.$list = $('.list');
		this.render();
	},
	render: function() {
		var $elem = '';
		var cats = controller.getAll();

		for (var i = 0; i < cats.length; i++) {

			$elem  = $('<li class="list__item">' + cats[i].name + '</li>');
			this.$list.append($elem);

			$elem.on('click', (function(index) {
				return function() {
					controller.setCurrent(cats[index]);
					viewCurrent.render();
				}
			})(i));
		}
	}
};

var viewCurrent = {
	init: function() {
		this.$name = $('.current__name');
		this.$image = $('.current__image').find('img');
		this.$likes = $('.current__likes');

		this.$image.on('click', function() {
			controller.increaseLikes();
		});
		this.render();
	},

	render: function() {
		this.currentObject = controller.getCurrent();
		this.$name.text(this.currentObject.name);
		this.$image.attr('src', this.currentObject.img);
		this.$likes.text(this.currentObject.likes);
	}
};


controller.init();
