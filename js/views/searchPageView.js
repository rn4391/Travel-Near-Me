define(['backbone', 'text!searchPageTemplate', 'helperFunctions', 'nearMeDataModel', 'baseView'], 
	function(Backbone, searchPageTemplate, helper, nearMeDataModel, BaseView) {
	
	var privateViewObj = {
		init : function() {

			//extend views from BaseView with over-ridden functions
			//and NOT from Backbone.View
			var SearchPageView = BaseView.extend({
				el : "#appContainer",

				model : nearMeDataModel.getModel(),

				initialize : function() {
					nearMeDataModel.destroyMap();
					this.model.on("change:location", this.render, this);
				},

				render : function() {
					this.$el.html(_.template($(searchPageTemplate).html(), {location : this.model.attributes.location}));
				},

				events : {
					"click #search-option-list li" : "launchSearch"
				},

				launchSearch : function(e) {
					var types = $(e.target).closest("li").attr("data-params"), that = this;
					var viewType = this.model.get("viewType") || "list";

					require(['backboneRouter'], function(router){
						router.navigate("results/" + viewType  + "/" + types, true, null);
					});
				}
			});

			return new SearchPageView();
		}
	};

	//the object exposed outside
	var viewObj = {
		render : function() {
			var view = privateViewObj.init();
			view.render();

			return view;
		}
	};

	return viewObj;

});