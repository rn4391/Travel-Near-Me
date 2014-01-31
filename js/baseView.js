define(['backbone'], function(Backbone){
	
	//base View from which every View should extend
	var viewObj = Backbone.View.extend({
		remove : function() {
			this.undelegateEvents();
			
			if(this.$el) {
				this.$el.empty();	
			}
			
			this.stopListening();

			if(this.model) {
				this.model.off(null, null, this);	
			}
	
			return this;
		}
	});

	return viewObj;
});