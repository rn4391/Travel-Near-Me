define(['backbone', 'nearMeDataModel', 'resultListView', 'resultMapView'], function(Backbone, nearMeDataModel, resultListView, resultMapView) {
	
	//entry point for results view which decides which view has to be rendered.
	var viewObj = {
		render : function(params) {
			var paramArr = params.split("/"),
				viewType = paramArr[0],
				category = paramArr[1];

			if(viewType != 'map') {
				return resultListView.render(viewType, category);
			} else {
				return resultMapView.render(viewType, category);
			}
		}
	};

	return viewObj;
});