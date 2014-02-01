define(['backbone', 'nearMeDataModel', 'helperFunctions', 'text!resultsListTemplate', 'text!viewTypeTemplate', 'baseView', 'backboneEvents'], 
		function(Backbone, nearMeDataModel, helper, resultsListTemplate, viewTypeTemplate, BaseView, backboneEvents) {
	
	var privateViewObj = {
		init : function(viewType, category) {
			//extend views from BaseView with over-ridden functions
			//and NOT from Backbone.View
			var ResultsListView = BaseView.extend({
				el : "#appContainer",

				model : nearMeDataModel.getModel(),

				initialize : function() {
					//this.$el.html("<div id='mapContainer'></div><div id='resultsContainer'></div>");

					nearMeDataModel.setViewType(this.constructor.arguments[0].viewType);
					nearMeDataModel.setSearchType(this.constructor.arguments[0].category);

					//attaching these events after setting the above values, 
					//because we do not want to trigger the events for initialization
					this.model.on("change:places change:location", this.renderResults, this);
					this.model.on("change:viewType", this.viewTypeChanged, this);

					this.renderResults();
				},

				events : {
					"click #view-type-container" : "changeView"
				},

				changeView : function(e) {
					var viewType = $(e.target).closest("#changeView").attr("data-viewType");
					this.model.set("viewType", viewType);
				},

				renderResults : function() {
					this.$el.html(_.template($(resultsListTemplate).html(), {
																				places: this.model.get("places"),
																				placesStatus : this.model.get("placesStatus"),
																				locationStatus : this.model.attributes.location.statusCode
																				}
					));
					this.$el.prepend(_.template($(viewTypeTemplate).html(), { viewType : this.model.get('viewType') }));
				
					nearMeDataModel.destroyMap();					
				},

				viewTypeChanged : function() {
					var url = "results/"+ this.model.get("viewType") +"/" + this.model.get("category");

					if(this.model.get("category") != "") {
						require(['backboneRouter'], function(router){
							router.navigate(url, true, true);
						});
					}	
					
				}
			});

			return new ResultsListView({viewType : viewType, category : category});
		}
	};

	//the object exposed outside
	var viewObj = {
		render : function(viewType, category) {
			var view = privateViewObj.init(viewType, category);
			//view.render();

			return view;
		}
	};

	return viewObj;

});