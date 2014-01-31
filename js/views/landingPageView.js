define(['backbone', 'text!landingPageTemplate', 'helperFunctions', 'baseView'], function(Backbone, landingPageTemplate, helper, BaseView) {
	
	var privateViewObj = {
		view : null,
		init : function() {
			var that = this;
			
			//extend views from BaseView with over-ridden functions
			//and NOT from Backbone.View
			var LandingPageView = BaseView.extend({
				el : "#appContainer",

				initialize : function() {
					
				},

				render : function() {
					this.$el.html(_.template($(landingPageTemplate).html()));
				},

				events : {
					"click #start-search" : "startSearch"
				},

				startSearch : function() {
					require(['backboneRouter'], function(router){
						router.navigate("main/search", true);
					});
				}
			});

			this.view = new LandingPageView();
		},
		removeView : function() {
			this.view.remove();
		}
	};

	//the object exposed outside
	var viewObj = {
		render : function() {
			privateViewObj.init();
			var view = privateViewObj.view;
			view.render();

			return view;
		}
	};

	return viewObj;

});