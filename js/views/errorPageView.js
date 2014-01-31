define(['backbone', 'helperFunctions'], function(Backbone, helper) {
	
	var privateViewObj = {
		init : function() {
			var ErrorPageView = Backbone.View.extend({
				el : "#appContainer",

				initialize : function() {
					
				},

				render : function() {
					console.log("error page rendered");
				},

				events : {
					"click #start-search" : "startSearch"
				},

				startSearch : function() {
					console.log(startSearch);
				}
			});

			return new ErrorPageView();
		}
	};

	//the object exposed outside
	//page not being used right now
	var viewObj = {
		render : function() {
			var view = privateViewObj.init();
			view.render();

			return view;
		}
	};

	return viewObj;

});