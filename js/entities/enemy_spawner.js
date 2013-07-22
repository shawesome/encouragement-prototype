var EnemySpawnerEntity = me.ObjectEntity.extend({

	/* constructor */
	init: function(x, y, settings) {
        this.spawnRate = settings.spawn_rate;
        this.spawnType = settings.spawn_type;
        this.spawnTimer = 0;
        this.type = me.game.NONFATAL_ENTITY;
        
        // call the parent constructor
        this.parent(x, y, settings);

    },

    /* update the player pos */
    update: function() {
        this.parent(this);
        if (++this.spawnTimer == this.spawnRate) {
            this.spawn();
            this.spawnTimer = 0;
        }
    },

    spawn: function() {
        console.log("spawn");
        var settings = {
            height: 32,
            image: this.spawnType,
            isPolygon: false,
            name: this.spawnType,
            spriteheight: 32,
            spritewidth: 32,
            width: 32,
            x: this.pos.x,
            y: this.pos.y ,
            z: 3 // @XXX I DON'T KNOW WHERE THIS COMES FROM BUT WE SHOULD KEEP AN EYE ON IT ~mshaw
        }
        var enemy = new EnemyEntity(this.pos.x, this.pos.y, settings);
        me.game.add(enemy, settings.z); 
        me.game.sort();  
    }
    
});
