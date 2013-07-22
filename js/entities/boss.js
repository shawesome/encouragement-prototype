var BossEntity = me.ObjectEntity.extend({

	/* constructor */
	init: function(x, y, setting) {
		// call the parent constructor
		this.parent(x, y, setting);
		this.renderable.addAnimation ("idle", [0]);
		this.renderable.setCurrentAnimation ("idle");
		this.orientation = '';
		this.setVelocity(3, 3);
		this.lastAttackTime = null;
        this.attackTimer = 1000; 
	},

	/* update the player pos */
    update: function() {
        this.parent(this);
        this.handleAttack();       
                
        return false;
    },    

    handleAttack: function() {
        var currentTime = me.timer.getTime();
        var canAttack = true;
        if (this.lastAttackTime != null) {
            var timeSinceLastAttack = currentTime - this.lastAttackTime;
            canAttack = timeSinceLastAttack > this.attackTimer; 
        } else {
            this.lastAttackTime = currentTime;
        }

        if (canAttack) {
            var x1 = this.pos.x;
            var y1 = this.pos.y;
            var x2 = jsApp.player.pos.x;
            var y2 = jsApp.player.pos.y;
            
            var xVect = (x2 - x1);
            var yVect = (y2 - y1);        

            var angle = -Math.atan2(xVect, yVect);

            var fireball = new EnemyFireballEntity(this.pos.x, this.pos.y, (angle + Math.PI/2));
                me.game.add(fireball, this.z); 
                me.game.sort();  
                
                // Log this time so we know for the next time the above logic is run
                this.lastAttackTime = currentTime;
        }
    }
})