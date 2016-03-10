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

		isMobile: false,  // モバイル判定
		mobileWidth: 320  // モバイル端末の判定幅

	};


/* fn
------------------------------------------------------------*/

	App.fn = {

		/**
		 * モバイル判定
		 */
		uaMobile: function() {
			App.global.isMobile = $(window).outerWidth() <= App.global.mobileWidth ? true : false;
			return this;
		}

	};


/* utils
------------------------------------------------------------*/

	App.utils = {

		/**
		 * カルーセル
		 */
		carousel: function() {
			var $el = {};
			var $list = {};
			var $btnPrev = {};
			var $btnNext = {};
			var slideCount = 1;
			var slideSpeed = 500;
			var isCount = 1;
			var maxCount = 1;
			var slideWidth = 0;
			var autoSlide = false;
			var isAnimate = false;
			var init = function(args) {
				slideCount = args.slideCount || slideCount;
				slideSpeed = args.slideSpeed || slideSpeed;
				autoSlide = args.autoSlide || autoSlide;
				setEl(args.el);
				render();
				setEvents();
				return this;
			};
			var setEl = function(el) {
				$el = $(el);
				$list = $el.find('.js-carouselImageList');
				$btnPrev = $el.find('.js-carouselPrevBtn');
				$btnNext = $el.find('.js-carouselNextBtn');
				return this;
			};
			var render = function() {
				var $item = $list.find('li');
				maxCount = $item.length;
				slideWidth = $item.first().width();
				$el.height($item.first().height());
				$list.width(slideWidth*maxCount).css({
					position: 'absolute',
					top: 0,
					left: 0
				});
				viewControlBtn();
				return this;
			};
			var setEvents = function() {
				$btnPrev.off('click').on('click', function() {
					if(!isAnimate) {
						isCount = (isCount-slideCount <= 1) ? 1 : isCount-slideCount;
						onSlideAnimate();
						isAnimate = false;
					}
					return false;
				});
				$btnNext.off('click').on('click', function() {
					if(!isAnimate) {
						isCount = (isCount+slideCount > maxCount) ? maxCount : isCount+slideCount;
						onSlideAnimate();
						isAnimate = false;
					}
					return false;
				});
				return this;
			};
			var onSlideAnimate = function() {
				isAnimate = true;
				$list.animate({
					left: -(slideWidth*(isCount-1))
				}, slideSpeed, function() {
					viewControlBtn();
				});
				return this;
			};
			var viewControlBtn = function() {
				isCount === 1 ? $btnPrev.hide() : $btnPrev.show();
				isCount === maxCount ? $btnNext.hide() : $btnNext.show();
				return this;
			};
			return { init: init };
		},
/* インスタンス化
var topMainVisual = new utils.carousel();
topMainVisual.init({
    el: '.js-carousel',
    slideCount: 1,
    slideSpeed: 500,
    autoSlide: false
});
*/

		/**
		 * アコーディオン
		 */
		accordion: function() {
			var c = {};
			var $el = {};
			var $btn = {};
			var $main = {};
			var isOpen = false;
			var isAnimate = false;
			var init = function(args) {
				c = {
					el: args.el,
					active: args.btnActiveClass
				};
				isOpen = args.defaultOpen || isOpen;
				setEl();
				render();
				setEvents();
				return this;
			};
			var setEl = function() {
				$el = $(c.el);
				$btn = $el.find('.js-accordBtn');
				$main = $el.find('.js-accordMain');
				return this;
			};
			var render = function() {
				if(isOpen) {
					$btn.addClass(c.active);
				} else {
					$main.hide();
				}
				return this;
			};
			var setEvents = function() {
				$btn.off('click').on('click', function() {
					if(!isAnimate) {
						onToggleAnimate();
						isAnimate = false;
					}
					return false;
				});
				return this;
			};
			var onToggleAnimate = function() {
				isAnimate = true;

				return this;
			};
			return { init: init };
		}
/* インスタンス化
var accordion = new utils.accordion();
accordion.init({
    el: '.js-accordion',
    btnActiveClass: 'opened',
    defaultOpen: false
});
*/

	};


/* views
------------------------------------------------------------*/

	App.views = {

		WindowView: (function() {
			var $el = $(window);
			var init = function() {
				App.global.isMobile = App.fn.uaMobile();
				render();
				setEvents();
				return this;
			};
			var render = function() {

				return this;
			};
			var setEvents = function() {
				$el.resize(function() {
					App.global.isMobile = App.fn.uaMobile();
				});
				return this;
			};
			init();
		})(),

		/**
		 * ベース
		 */
		BaseView: (function() {
			var constructor = function() {
				this.$el = {};
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
				return this;
			};
			proto.render = function() {
				return this;
			};
			proto.setEvents = function() {
				return this;
			};
			return constructor;
		})()

	};

})(APP, window, document);
