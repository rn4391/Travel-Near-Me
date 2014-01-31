define(['backbone', 'underscore'], function(Backbone) {
	
	var privateEventObj = {
		pipeline : {},
		init : function() {
			_.extend(this.pipeline, Backbone.Events);
		}
	};

	var eventObj = {
		getEventPipeline : function() {
			if($.isEmptyObject(privateEventObj.pipeline)) {
				privateEventObj.init();
			}

			return privateEventObj.pipeline;
		}
	};

	return eventObj;
});