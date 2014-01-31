define(['backbone', 'text!headerTemplate', 'baseView'], function(Backbone, headerTemplate, BaseView) {
	
	var privateViewObj = {
		init : function() {

			//extend views from BaseView with over-ridden functions
			//and NOT from Backbone.View
			var HeaderView = BaseView.extend({
				el : "#appHeader",

				events : {
					"click #back-button" : "onBackClick",
					"click #small-logo" : "onLogoClick"
				},

				render : function() {
					this.$el.html($(headerTemplate).html(), {});
				},

				onBackClick : function() {
					require(['backboneRouter'], function(router){
						router.goBack();
					});
				},

				onLogoClick : function() {
					require(['backboneRouter'], function(router){
						router.navigate("main/landing", true, null);
					});
				}
			});

			return new HeaderView();
		}
	};

	var viewObj = {
		render : function() {
			var view = privateViewObj.init();
			view.render();

			return view;
		}
	};

	return viewObj;

});