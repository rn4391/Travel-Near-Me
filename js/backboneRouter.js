define(['backbone', 'backboneViews', 'helperFunctions'], function(Backbone, backboneViews, helper) {
	
	var routerObj = {
		currentViews : [],
		init: function() {
			var that = this;
			var Router = Backbone.Router.extend({
				routes: {
					'results/*params' : 'result',
					'main/:pageType' : 'main',
					'*params' : 'defaultRoute'
				},

				initialize : function() {
					this.historyStates = 0;
					Backbone.history.on("route", function() {
						this.historyStates++;
					}, this);
				}
			});

			this.router = new Router();

			//route for the main result page where the listin or map view is being displayed
			this.router.on("route:result", function(params){
				that.removeCurrentViews();
				that.addToCurrentViews(backboneViews.resultPage.render(params));
			});

			//route for other pages, the page type determines what view is to be rendered
			this.router.on("route:main", function(pageType){
				that.removeCurrentViews();
				var currentViews = [];
				switch(pageType.toLowerCase()) {
					case "landing":
						currentViews = backboneViews.landingPage.render();
						break;
					case "error":
						currentViews = backboneViews.errorPage.render();	
						break;
					case "search":
						currentViews = backboneViews.searchPage.render();
						break;
					default:
						currentViews = backboneViews.landingPage.render();
				};

				that.addToCurrentViews(currentViews);
			});


			//any other route - defaults to the main landing page.
			this.router.on("route:defaultRoute", function(params){
				that.removeCurrentViews();
				that.addToCurrentViews(backboneViews.landingPage.render());
			});

			//start routes
			Backbone.history.start();
		},
		//the router navigate function which is exposed to other views
		//views cannot directly call the router navigate
		navigate : function(url, triggerOpt, replaceOpt) {
			//remove the views completely
			this.removeCurrentViews();

			triggerOpt = Boolean(triggerOpt),
			replaceOpt = Boolean(replaceOpt);

			this.router.navigate(url, {trigger : triggerOpt, replace: replaceOpt});
		},
		removeCurrentViews : function() {
			//loop through all the active views and call theire remove function
			if(this.currentViews) {
				this.currentViews.forEach(function(view){
					console.log("removed");
					view.remove();	
				})
				
				this.currentViews = [];
			}
		},
		//keep track of active views for removal later
		addToCurrentViews : function(viewArr) {
			var that = this;
			viewArr.forEach(function(view) {
				that.currentViews.push(view);
			});
		},
		//special handling for go back based on counting the number of pages the user has seen on this website.
		goBack : function() {
			if(this.router.historyStates > 1) {
				this.router.historyStates--;
				window.history.back();
			} else {
				this.router.navigate("main/landing", {trigger: true, replace: false});
			}
		}
	};

	return routerObj;

});