var GameoverScreen = me.ScreenObject.extend({
    onload: function() {
    },
    
    loaded: function () {
    },

    reset: function() {   
    },
    
    onUpdateFrame: function() {
        console.log("GAMEOVER");
    }
});

var jsApp   =
{
    
    /*
     *    Initialize the jsApp
     */
    onload: function() {
        
        if (!me.video.init('jsapp', 800, 480)) {
            alert("Sorry but your browser does not support html 5 canvas. Please try with another one!");
            return;
        }
    
        // set all ressources to be loaded
        me.loader.onload = this.loaded.bind(this);
        
        // set all ressources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);

        me.game.onLevelLoaded = function() {

            // make player a global variable
            jsApp.player = me.game.getEntityByName("player")[0];
        };
    },
    
    
    /*
     * callback when everything is loaded
     */
    loaded: function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, this);
        me.state.set(me.state.GAMEOVER, new GameoverScreen());
        
        me.entityPool.add("player", PlayerEntity);
		me.entityPool.add("player_fireball", FireballEntity);
        me.entityPool.add("enemy", EnemyEntity);
        me.entityPool.add("enemy_spawner", EnemySpawnerEntity);
                
        // enable the keyboard (to navigate in the map)
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,    "up");
        me.input.bindKey(me.input.KEY.DOWN,  "down");
        me.input.bindKey(me.input.KEY.SPACE,  "space");

        // overrides the entity gravity values
        me.sys.gravity = 0;
         
        // start the game
        me.state.change(me.state.PLAY);

        // Picked these arbitrarily - Just didn't want them to be 0 since that's what type defaults to
        me.game.FATAL_ENTITY = 5;
        me.game.NONFATAL_ENTITY = 6;
        
    },

    reset: function() {   
        me.game.reset();
        // load a level
        me.levelDirector.loadLevel("prototype");        
    },

    
    /*
     * rendering loop
     */
    onUpdateFrame: function() {
        // update the frame counter
        me.timer.update();

        // update our sprites
        me.game.update();
    
        // draw the rest of the game
        me.game.draw();
    }, 

    destroy: function() {
        // do nothing
    }

}; // jsApp

//bootstrap :)
window.onReady(function() {
    jsApp.onload();
});
