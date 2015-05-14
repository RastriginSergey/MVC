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
		viewAdmin.init();
	},

	getCurrent: function() {
		return model.current;
	},

	setCurrent: function(obj) {
		model.current = obj;
		viewCurrent.render();
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

					viewAdmin.$inputsBlock.hide();
					viewCurrent.render();
				}
			})(i));
		}
	}
};

var viewCurrent = {
	init: function() {
		this.$name = $('.current__name');
		this.$image = $('.current__image');
		this.$likes = $('.current__likes');

		$(document).on('click', '.current__image, .fa', function() {
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

var viewAdmin = {
	init: function() {
		/* Buttons */
		this.$adminBtn = $('.admin-form__admin-btn');
		this.$saveBtn = $('.admin-form__save-btn');
		this.$cancelBtn = $('.admin-form__cancel-btn');

		/* Inputs */
		this.$nameInput = $('.admin-form__name');
		this.$imgInput = $('.admin-form__img');
		this.$likesInput = $('.admin-form__likes');

		/* Input wrapper */
		this.$inputsBlock = $('.inputs-wrapper');

		/* Init Buttons events listeners */
		this.eventListeners();

	},
	eventListeners: function() {
		this.$adminBtn.on('click', function(e) {
			e.preventDefault();

			var currentCat = controller.getCurrent();
			this.$inputsBlock.show();

			this.$nameInput.val(currentCat.name);
			this.$imgInput.val(currentCat.img);
			this.$likesInput.val(currentCat.likes);

		}.bind(this));


		this.$saveBtn.on('click', function(e) {
			e.preventDefault();

			var updateCurrent = {
				name: this.$nameInput.val(),
				img: this.$imgInput.val(),
				likes: this.$likesInput.val()
			};

			controller.setCurrent(updateCurrent);

		}.bind(this));

		this.$cancelBtn.on('click', function(e) {
			e.preventDefault();
			this.$nameInput.val('');
			this.$imgInput.val('');
			this.$likesInput.val('');

			this.$inputsBlock.hide();
		}.bind(this));
	}
};


controller.init();
