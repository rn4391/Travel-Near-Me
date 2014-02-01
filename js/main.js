require.config({
	paths : {

		'backbone' : 'libs/backbone-min',
		'jquery' : 'libs/jquery.min',
		'text' : 'libs/text',
		'underscore' : 'libs/underscore-min',

		'backboneRouter' : 'backboneRouter',

		'backboneEvents' : 'backboneEvents',

		//views
		'backboneViews' : 'backboneViews',
		//base view with overridden functions. all views must inherit from this
		'baseView' : 'baseView',
		'landingPageView' : 'views/landingPageView',
		'resultPageView' : 'views/resultPageView',
		'resultListView' : 'views/resultListView',
		'resultMapView' : 'views/resultMapView',
		'errorPageView' : 'views/errorPageView',
		'searchPageView' : 'views/searchPageView',
		'locationView' : 'views/locationView',
		'headerView' : 'views/headerView',

		//templates
		'landingPageTemplate' : '../templates/landingPageTemplate.html',
		'searchPageTemplate' : '../templates/searchPageTemplate.html',
		'resultsMapTemplate' : '../templates/resultsMapTemplate.html',
		'resultsListTemplate' : '../templates/resultsListTemplate.html',
		'locationFooterTemplate' : '../templates/locationFooterTemplate.html',
		'headerTemplate' : '../templates/headerTemplate.html',
		'viewTypeTemplate' : '../templates/viewTypeTemplate.html',
		'infoBubbleTemplate' : '../templates/infoBubbleTemplate.html',

		'helperFundtions' : 'helperFunctions',

		'nearMeDataModel' : 'models/nearMeDataModel',

	},
	shim : {
		'backbone' : {
			deps : ['jquery', 'underscore'],
			exports : 'Backbone'
		},
		'underscore' : {
			exports : '_'
		}
	}
});

require(['backboneRouter', 'backbone'], function(backboneRouter){
	backboneRouter.init();
});