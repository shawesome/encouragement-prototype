var PlayerEntity = me.ObjectEntity.extend({

    /* constructor */
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        // walking animatin
        this.renderable.addAnimation ("idle-down", [0]);
        this.renderable.addAnimation ("idle-up", [6]);
        this.renderable.addAnimation ("idle-right", [12]);
        this.renderable.addAnimation ("idle-left", [12]);
        this.renderable.addAnimation ("walk-down", [0,1,2,3]);
        this.renderable.addAnimation ("walk-up", [6,7,8,9]);
        this.renderable.addAnimation ("walk-right", [12,13,14,15]);
        this.renderable.addAnimation ("walk-left", [12,13,14,15]);
        this.renderable.addAnimation ("attack-down", [4]);
        this.renderable.addAnimation ("attack-up", [10]);
        this.renderable.addAnimation ("attack-right", [16]);
        this.renderable.addAnimation ("attack-left", [16]);
        
        // set the default horizontal & vertical speed (accel vector)
        this.setVelocity(3, 3);

        this.orientationStack = [];
        this.orientation = '';
        this.lastKnownOrientation = 'down';
        this.lastAttackTime = null;
        this.attackTimer = 250;
    },

    /* update the player pos */
    update: function() {
        this.getOrientation();

        this.orientation = '';
        if (this.orientationStack.length) {
            // Pop the last element off the stack
            this.orientation = this.orientationStack.slice(-1)[0]
            this.lastKnownOrientation = this.orientation;
        }

        var moved = this.handleMovement();
        var attacked = this.handleAttack();

        var took_action = moved || attacked;
        if (!took_action) {
            this.renderable.setCurrentAnimation("idle-" + this.lastKnownOrientation);
        }
        this.parent(this);

        return true;
    },

    handleAttack: function() {
        if (me.input.isKeyPressed('space')) {
            // Update attack animation
            this.renderable.setCurrentAnimation("attack-" + this.lastKnownOrientation);

            // Perform attack animation
            var currentTime = me.timer.getTime();
            var canAttack = true;
            if (this.lastAttackTime != null) {
                var timeSinceLastAttack = currentTime - this.lastAttackTime;
                canAttack = timeSinceLastAttack > this.attackTimer; 
            } else {
                this.lastAttackTime = currentTime;
            }

            if (canAttack) {
                var angle = 0;
                if (this.lastKnownOrientation == 'down') {
                    angle = Math.PI / 2;
                } else if (this.lastKnownOrientation == 'left') {
                    angle = Math.PI;
                } else if (this.lastKnownOrientation == 'up') {
                    angle = 6 * Math.PI / 4;
                }
                var fireball = new PlayerFireballEntity(this.pos.x, this.pos.y, angle);
                me.game.add(fireball, this.z); 
                me.game.sort();  
                
                // Log this time so we know for the next time the above logic is run
                this.lastAttackTime = currentTime;
            }


            return true;
        }
    },

    getOrientation: function() {
        this.getOrientationAux('left');
        this.getOrientationAux('right');
        this.getOrientationAux('up');
        this.getOrientationAux('down');
    },

    getOrientationAux: function(dir) {
        if (me.input.isKeyPressed(dir)) {
            if (this.orientationStack.indexOf(dir) == -1) 
                this.orientationStack.push(dir);
        } else {
            if (this.orientationStack.indexOf(dir) != -1) {
                this.orientationStack.remove(dir);
            }
        }
    },

    handleMovement: function() {
        if (me.input.isKeyPressed(this.orientation)) {
            this.renderable.setCurrentAnimation("walk-" + this.orientation);
        }

        this.vel.x = 0;
        this.vel.y = 0;

        if (this.orientation == 'left') {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.flipX(true);
        } else if (this.orientation == 'right') {
            this.vel.x += this.accel.x * me.timer.tick;
            this.flipX(false);
        } else if (this.orientation == 'up') {
            this.vel.y -= this.accel.x * me.timer.tick;
        } else if (this.orientation == 'down') {
            this.vel.y += this.accel.x * me.timer.tick;
        }

        // check & update player movement
        this.updateMovement();
        

        // Do we need to update animation?
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update objet animation
            return true;
        }

        return false;
    }
});
