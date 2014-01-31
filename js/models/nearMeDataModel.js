define(['backbone', 'backboneEvents'], function(Backbone, backboneEvents) {
	
	var privateModelObj = {
		model : null,
		init : function() {
			var Model = Backbone.Model.extend({
				initialize : function() {
					this.set({
						location : {
							status : "Getting Your Location.",
							statusCode : "progress",
							latitude : null,
							longitude : null,
							address : ""
						},
						searchParameters : {
							location : null,
							radius : 2000,
							types : ""
						},
						places : [],
						placesStatus : "progress",
						category : "",
						viewType : "list",
						mapData : {
							map: null,
							mapMarkers : [],
							mapBounds : null
						}
					});

					this.on("change:location change:category", function() {
						if(privateModelObj.model.attributes.location.statusCode == "success" && (privateModelObj.model.attributes.category != "" || privateModelObj.model.attributes.category != [])) {
							require(['helperFunctions'], function(helper) {
								helper.launchPlacesSearch(privateModelObj.model.get("category"), $("#mapContainer"), privateModelObj.model.get("searchParameters"));
							});
						}
					});
				},

				//update the user Location and the location for search parameters.
				updateUserLocation : function(inputStatus, inputCode, inputLat, inputLng, inputAddr) {
					inputStatus = inputStatus || this.attributes.location.status,
					inputCode = inputCode || this.attributes.location.statusCode,
					inputLat = inputLat || this.attributes.location.latitude,
					inputLng = inputLng || this.attributes.location.longitude,
					inputAddr = inputAddr || this.attributes.location.address;

					this.set({
						location: {
							status : inputStatus,
							statusCode: inputCode,
							latitude : inputLat,
							longitude : inputLng,
							address : inputAddr
						}
					});

					var newParameters = privateModelObj.model.get("searchParameters");
					newParameters["location"] = new google.maps.LatLng(inputLat, inputLng);

					this.set({
						"searchParameters" : newParameters
					});
				}
			});

			this.model = new Model();
		}
	}

	var modelObj = {
		getModel : function() {
			if(!privateModelObj.model) {
				privateModelObj.init();	
			}

			return privateModelObj.model;
		},
		updateUserLocation : function(status, statusCode, lat, lng, address) {
			if(!privateModelObj.model) {
				privateModelObj.init();
			}
			privateModelObj.model.updateUserLocation(status, statusCode, lat, lng, address);
		},
		getUserLocation : function() {
			return [privateModelObj.model.attributes.location.latitude, privateModelObj.model.attributes.location.longitude];
		},
		isSameAsStoredLocation : function(latitude, longitude) {
			if(this.getUserLocation()[0] == latitude && this.getUserLocation()[1] == longitude) {
				return true;
			} else {
				return false;
			}
		},
		errorInLocation : function() {
			if(privateModelObj.model.attributes.location.statusCode == "error") {
				return true;
			}
			return false;
		},
		setSearchType : function(searchType) {
			if(!privateModelObj.model) {
				privateModelObj.init();	
			}

			if(privateModelObj.model.get("category") != searchType) {
				privateModelObj.model.set({"category" : searchType});

				var newParameters = privateModelObj.model.get("searchParameters");
				newParameters["types"] = searchType.split("|");
				privateModelObj.model.set({searchParameters : newParameters});
			}
		},
		getSearchResponse : function() {
			return privateModelObj.model.get("places");
		},
		setSearchResposne : function(resultArr) { 
			if(!privateModelObj.model) {
				privateModelObj.init();	
			}

			privateModelObj.model.set({"places" : resultArr});
			privateModelObj.model.set({"placesStatus" : "success"});

		},
		getSearchParameteres : function() {
			privateModelObj.model.get("searchParameters");
		},
		setViewType : function(viewType) {
			if(!privateModelObj.model) {
				privateModelObj.init();	
			}

			privateModelObj.model.set({"viewType" : viewType});
		},
		getMap : function() {
			return privateModelObj.model.attributes.mapData.map;
		},
		setMap : function(map) {
			if(!privateModelObj.model) {
				privateModelObj.init();	
			}

			var mapData = privateModelObj.model.get("mapData");
			mapData["map"] = map;
			privateModelObj.model.set({"mapData" : mapData});
		},
		destroyMap : function() {
			var mapData = {
							map: null,
							mapMarkers : [],
							mapBounds : null
						};
			privateModelObj.model.set({"mapData" : mapData});
		}

	};

	return modelObj;

});