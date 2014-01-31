define(['landingPageView','resultPageView', 'errorPageView', 'searchPageView', 'headerView', 'locationView', 'backbone'], 
	function(landingPageView, resultPageView, errorPageView, searchPageView, headerView, locationView, Backbone) {
	
	//the interface for the router to render the views
	//views render function must return an array of all views that are rendered
	//to keep a track of current views
	var viewsObj = {
		landingPage : {
			render : function() {
				var view1 = landingPageView.render(),
					view2 = locationView.render();

				return [view1, view2];
			}
		},
		resultPage : {
			render : function(params) {
				var view1 = resultPageView.render(params),
					view2 = headerView.render(),
					view3 = locationView.render();

				return [view1, view2, view3];
			}
		},
		errorPage : {
			render : function() {
				var view1 = errorPageView.render(),
					view2 = headerView.render(),
					view3 = locationView.render();

				return [view1, view2, view3];
			}
		},
		searchPage : {
			render : function() {
				var view1 = searchPageView.render(),
					view2 = headerView.render(),
					view3 = locationView.render();

				return [view1, view2, view3];
			}
		}
	};

	return viewsObj;

});