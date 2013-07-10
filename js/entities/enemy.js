var EnemyEntity = me.ObjectEntity.extend({

	/* constructor */
	init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.renderable.addAnimation ("idle", [0]);
        this.renderable.setCurrentAnimation("idle");
        
    },

    /* update the player pos */
    update: function() {
        this.parent(this);
        console.log("Derp");
        return true;
    }
    
});