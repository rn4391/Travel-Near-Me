define(['jquery', 'nearMeDataModel', 'text!infoBubbleTemplate'], function($, nearMeDataModel, infoBubbleTemplate){
	
	//does tasks beyond the scope of views and updates the model/view with the results
	var helperFunctions = {
		//this gets checked on every page the lat-long/ajax request is updated ony if it different frm the one stored.
		getOrUpdateUserLocation : function() {
			if(window.navigator.geolocation) {
				//update the model that the location is being tracked
				helperFunctions.updateUserLocation("Getting Your Location.", "progress");
				window.navigator.geolocation.getCurrentPosition(helperFunctions.locationSuccessFunction, helperFunctions.locationErrorFunction);
			}
		},
		updateUserLocation : function(str, statusCode, lat, lng, address) {
			nearMeDataModel.updateUserLocation(str, statusCode, lat, lng, address);
		},
		locationSuccessFunction : function(position) {
			if(!nearMeDataModel.isSameAsStoredLocation(position.coords.latitude, position.coords.longitude)) {
				helperFunctions.updateUserLocation("Location Found. Getting Current Address.", "progress", position.coords.latitude, position.coords.longitude);
				helperFunctions.lookupAddress(position.coords.latitude, position.coords.longitude);	
			} else {
				helperFunctions.updateUserLocation("Approximate Address Found.", "success");
			}
		},
		locationErrorFunction : function(error) {
			switch(error.code) 
		    {
		    case error.PERMISSION_DENIED:
		      helperFunctions.updateUserLocation("Geolocation Access Denied.", "error", null, null);
		      break;
		    case error.POSITION_UNAVAILABLE:
		      helperFunctions.updateUserLocation("Location Not Available.", "error", null, null);
		      break;
		    case error.TIMEOUT:
		      helperFunctions.updateUserLocation("Location Request Taking Too Long. Try Refreshing The Page.", "error", null, null);
		      break;
		    case error.UNKNOWN_ERROR:
		      helperFunctions.updateUserLocation("Unknown Error Ocurred. Try Refreshing The Page.", "error", null, null);
		      break;
		    }
		},
		//reverse lookup for address from lat-long
		lookupAddress : function(lat, lng) {
			$.ajax({
				url : "https://maps.googleapis.com/maps/api/geocode/json",
				dataType : "json",
				data : {
					latlng : lat + "," + lng,
					sensor : true
				},
				success : function(response) {
					if(response && response.results && response.results[0].formatted_address) {
						helperFunctions.updateUserLocation("Approximate Address Found.", "success", lat, lng, response.results[0].formatted_address);
					}
				},
				error : function(xhr, textStatus, error) {
					console.log(xhr);
				}
			});
		},
		//search for places near by
		launchPlacesSearch : function(inputTypes, el, parameters) {
			var map = new google.maps.Map(document.getElementById(el[0].id), {
			      center: parameters.location,
			      zoom: 15
			});

			var service = new google.maps.places.PlacesService(document.getElementById(el[0].id));
			service.nearbySearch(parameters, this.callback);

		},
		callback : function(results, status) {
			nearMeDataModel.setSearchResposne(results);
		},
		//map related functions
		drawMap : function(el) {
			if(nearMeDataModel.getSearchResponse().length > 0) {
				if(!nearMeDataModel.getMap()) {
					var loc = nearMeDataModel.getUserLocation();
					var mapOptions = {
			          center: new google.maps.LatLng(loc[0], loc[1]),
			          zoom: 8
			        };
			        var map = new google.maps.Map(document.getElementById(el[0].id),
			            mapOptions);
			        nearMeDataModel.setMap(map);
			    }	
				this.dropMarkers();
			}	
		},
		dropMarkers : function() {
			var map = nearMeDataModel.getMap(),
				mapBounds = new google.maps.LatLngBounds();

			var places = nearMeDataModel.getSearchResponse();
			for(var i in places) {
				var place = places[i],
					location = place.geometry.location;

					mapBounds.extend(location);

				var marker = new google.maps.Marker({
									position: location,
									map: map
							});

				var contentString = _.template($(infoBubbleTemplate).html(), {name : place.name});

				var infoWindow = new google.maps.InfoWindow({
									content: contentString
								});

				this.addMarkerEvent(marker, infoWindow, map);
			}

			//drop user location marker 
			var userLocation = nearMeDataModel.getUserLocation(),
				userLocationLatLng = new google.maps.LatLng(userLocation[0], userLocation[1]);

			var marker = new google.maps.Marker({
									position: userLocationLatLng,
									map: map,
									icon : 'images/userLocationMarkerIcon.png'
							});

			var contentString = _.template($(infoBubbleTemplate).html(), {name : "Your Location"});

			var infoWindow = new google.maps.InfoWindow({
								content: contentString
							});

			infoWindow.open(map, marker);
			this.addMarkerEvent(marker, infoWindow, map);

			map.fitBounds(mapBounds);
		},
		addMarkerEvent : function(marker, bubble, map) {
			google.maps.event.addListener(marker, 'click', function() {
				bubble.open(map,marker);
			});
		}
	};

	return helperFunctions;

});