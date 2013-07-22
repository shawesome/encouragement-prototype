var FireballEntity = me.ObjectEntity.extend({

    /* constructor */
    init: function(x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
        // walking animatin
        this.renderable.addAnimation ("right", [0]);
        this.renderable.setCurrentAnimation("right");
        this.renderable.angle = settings.angle;

        // set the default horizontal & vertical speed (accel vector)
        var speed = 6;
        this.xVel = Math.round(Math.cos(settings.angle)) * speed;
        this.yVel = Math.round(Math.sin(settings.angle)) * speed;
    },

    update: function() {
        this.vel.x = this.xVel;
        this.vel.y = this.yVel;

        this.parent(this);

        this.updateMovement();
        return true;
    }
});

var PlayerFireballEntity = FireballEntity.extend({
    init: function(x, y, angle) {
        settings = {
            gid: null,
            height: 32,
            width: 32,
            image: "player_fireball",
            isPolygon: false,
            name: "player_fireball",
            spriteheight: 32,
            spritewidth: 32,
            x: x,
            y: y,
            angle: angle
        };
        this.parent(x, y, settings);
        this.type = me.game.NONFATAL_ENTITY;
    }
});
