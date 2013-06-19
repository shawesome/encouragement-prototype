var PlayerEntity = me.ObjectEntity.extend({

    /* constructor */
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        // walking animatin
        this.renderable.addAnimation ("walk-down", [0,1,2,3]);
        this.renderable.addAnimation ("walk-up", [6,7,8,9]);
        this.renderable.addAnimation ("walk-right", [12,13,14,15]);
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);
    },

    /* update the player pos */
    update: function() {
        if (me.input.isKeyPressed('left')) {
            this.renderable.setCurrentAnimation("walk-right");
            // flip the sprite on horizontal axis
            this.flipX(true);
            // update the entity velocity
            this.vel.x -= this.accel.x * me.timer.tick;
        } else if (me.input.isKeyPressed('right')) {
            this.renderable.setCurrentAnimation("walk-right");
            // unflip the sprite
            this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
        } else {
            this.vel.x = 0;
        }
        
        if (me.input.isKeyPressed('up')) {
            this.renderable.setCurrentAnimation("walk-up");
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
        } else if (me.input.isKeyPressed('down')) {
            this.renderable.setCurrentAnimation("walk-down");
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
        } else {
            this.vel.y = 0;
        }

        // check & update player movement
        this.updateMovement();

        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            this.parent(this);
            return true;
        }

        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
});
