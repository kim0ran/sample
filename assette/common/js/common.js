/*--------------------------------------------------------------------
 common.js
----------------------------------------------------------------------*/

(function(window, undefined) {

	var App = {
		global: {},
		fn: {},
		utils: {},
		views: {}
	};
	window.APP = App;

})(window);

(function(App, window, decument, undefined) {


/* global
------------------------------------------------------------*/

	App.global = {

	};


/* fn
------------------------------------------------------------*/

	App.fn = {

	};


/* utils
------------------------------------------------------------*/

	App.utils = {

	};


/* views
------------------------------------------------------------*/

	App.views = {

		/**
		 * ページ
		 */
		PageView: (function() {
			var constructor = function() {
				this.$el = {};
				this.$anchor = {};
				this.$imgBtn = {};
				this.scrollSpeed = 500;
				this.isScroll = false;
				return this;
			};
			var proto = constructor.prototype;
			proto.init = function(el) {
				this.setEl(el);
				this.render();
				this.setEvents();
				return this;
			};
			proto.setEl = function(el) {
				this.$el = $(el);
				this.$anchor = this.$el.find('a[href^="#"]');
				this.$imgBtn = this.$el.find('a img');
				return this;
			};
			proto.render = function() {

				/* グローバルナビ */
				var globalNavView = new App.views.GlobalNavView();
				globalNavView.init({
					el: '.globalNav',
					navCurrent: '.current',
					slideSpeed: 300
				});

				return this;
			};
			proto.setEvents = function() {
				var that = this;
				this.$anchor.off('click').on('click', function() {
					if(!that.isScroll) {
						that.smoothScroll($(this).attr('href'));
						that.isScroll = false;
					}
					return false;
				});
				this.$imgBtn.hover(function() {
					that.imageRollover(this);
				}, function() {
					that.imageRollover(this);
				});
				return this;
			};
			proto.smoothScroll = function(href) {
				this.isScroll = true;
				var $target = $(href === '#' || href === '' ? 'html' : href);
				var position = $target.offset().top;
				$('html, body').animate({
					scrollTop: position
				}, this.scrollSpeed, 'swing');
				return this;
			};
			proto.imageRollover = function(that) {
				var $that = $(that);
				var imgSrc = $that.attr('src');
				var imgPath = imgSrc.split('/');
				var imgFile = imgPath[imgPath.length -1];
				$that.attr('src', (imgFile.indexOf('_on') == -1) ? imgSrc.replace(/(\.)(gif|jpg|png)/i, '_on$1$2') : imgSrc.replace(/(\_on)(.)(gif|jpg|png)/i, '$2$3'));
				return this;
			};
			return constructor;
		})(),

		/**
		 * グローバルナビ
		 */
		GlobalNavView: (function() {
			var constructor = function() {
				this.c = {};
				this.$el = {};
				this.$btn = {};
				this.$list = {};
				this.slideSpeed = 500;
				this.isAnimate = false;
				return this;
			};
			var proto = constructor.prototype;
			proto.init = function(args) {
				this.c = {
					el: args.el,
					current: args.navCurrent
				};
				this.slideSpeed = args.slideSpeed || this.slideSpeed;
				this.setEl();
				this.render();
				this.setEvents();
				return this;
			};
			proto.setEl = function() {
				this.$el = $(this.c.el);
				this.$btn = this.$el.find('.js-gNavBtn');
				this.$list = this.$el.find('.js-gNavList');
				return this;
			};
			proto.render = function() {
				return this;
			};
			proto.setEvents = function() {
				var that = this;
				this.$btn.off('click').on('click', function() {
					if(!this.isAnimate) {
						that.animateSlideNav();
						that.isAnimate = false;
					}
				});
				return this;
			};
			proto.animateSlideNav = function() {
				this.isAnimate = true;
				this.$list.slideToggle(this.slideSpeed);
				return this;
			};
			return constructor;
		})()

	};

})(APP, window, document);
