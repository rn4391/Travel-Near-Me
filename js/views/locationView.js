define(['backbone', 'nearMeDataModel', 'text!locationFooterTemplate', 'helperFunctions', 'baseView'], 
		function(Backbone, nearMeDataModel, locationFooterTemplate, helper, BaseView) {
	
	var privateViewObj = {
		init : function() {

			//extend views from BaseView with over-ridden functions
			//and NOT from Backbone.View
			var LocationView = BaseView.extend({
				el : "#appFooter",

				model : nearMeDataModel.getModel(),

				//try to get the user location
				initialize : function() {
					var userLocation = nearMeDataModel.getUserLocation();
					//if lat long is not available then update the lat long
					if(!userLocation[0] || !userLocation[1]) {
						helper.getOrUpdateUserLocation();	
					}	
					
					this.render();
					this.model.on("change:location", this.locationUpdated, this);
				},

				render : function() {
					this.$el.html(_.template($(locationFooterTemplate).html(), {location : this.model.attributes.location}));
				},

				locationUpdated: function() {
					this.render();	
				} 
			});

			return new LocationView();
		}
	};

	//the object exposed outside
	var viewObj = {
		render : function() {
			var view = privateViewObj.init();
			//view.render();

			return view;
		}
	};

	return viewObj;

});