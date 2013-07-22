var EnemyEntity = me.ObjectEntity.extend({

	/* constructor */
	init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        this.renderable.addAnimation ("idle", [0]);
        this.renderable.setCurrentAnimation("idle");
        this.speed = 2;
        this.type = me.game.FATAL_ENTITY;
        
    },

    /* update the player pos */
    update: function() {
        this.parent(this);
        this.moveTowardsPlayer();
                
        return false;
    },

    moveTowardsPlayer: function() {
        if (jsApp.player.pos != undefined) {
            var x1 = this.pos.x;
            var y1 = this.pos.y;
        	var x2 = jsApp.player.pos.x;
            var y2 = jsApp.player.pos.y;
            
            var xVect = (x2 - x1);
            var yVect = (y2 - y1);
            
            var mag = Math.sqrt(Math.pow(xVect, 2) + Math.pow(yVect, 2));

            var xVectNorm = xVect / mag;
            var yVectNorm = yVect / mag;

            this.vel.x = xVectNorm * this.speed * me.timer.tick;
            this.vel.y = yVectNorm * this.speed * me.timer.tick;
            
        }
        this.updateMovement();
    }
  
});
