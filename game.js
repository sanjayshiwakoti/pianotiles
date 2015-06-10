;
(function () {

    var game = new Phaser.Game(828, 500);

    this.score = 0;
    var GRAVITYRATIO=0.05;
    var TILE1GRAVITY;
    var TILE2GRAVITY;
    var TILE3GRAVITY;
    

    var homeState = {
        preload: function () {
                 TILE1GRAVITY=100;
                 TILE2GRAVITY=200;
                 TILE3GRAVITY=300;
        },
        create: function () {
            var button1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {
                fill: '#fff'
            });
            
                var scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + this.score, {
                    fill: '#fff'
                });
                 scoreText.inputEnabled = true;
                
            
            
            button1.anchor.setTo(0.5, 0.5);
            button1.inputEnabled = true;

            button1.events.onInputDown.add(function () {
                game.state.start('playstate');
            }, this);
           
        },
        update: function () {
        }
    };
    /**
     * Total number of tiles initialize
     */
    this.tile1=null;
    this.tile2=null;
    this.tile3=null;
    
    this.base1Tile=null;
    this.base2Tile=null;
    this.base3Tile=null;

    var playState = {
        score: 0,
        preload: function () {
            game.load.image('tile', 'assets/tiles.png');
            game.load.image('bg', 'assets/gamebg.jpg');
        },
        createFirstTile:function(){
            this.tile1 = game.add.sprite(0, 0, 'tile');
            game.physics.arcade.enable(this.tile1);
            this.tile1.body.gravity.y = TILE1GRAVITY;
            TILE1GRAVITY=TILE1GRAVITY+(TILE1GRAVITY*GRAVITYRATIO);
        },
        createSecondTile:function(){
            this.tile2 = game.add.sprite(276, 0, 'tile');
            game.physics.arcade.enable(this.tile2);
            this.tile2.body.gravity.y = TILE2GRAVITY;
            TILE2GRAVITY=TILE2GRAVITY+(TILE2GRAVITY*GRAVITYRATIO);
        },
        createThirdTile:function(){
            this.tile3 = game.add.sprite(552, 0, 'tile');
            game.physics.arcade.enable(this.tile3);
            this.tile3.body.gravity.y = TILE3GRAVITY;
            TILE3GRAVITY=TILE3GRAVITY+(TILE3GRAVITY*GRAVITYRATIO);
        },
        destroyFirstTile:function(){
           game.physics.arcade.collide(this.tile1, this.base1Tile, this.createFirstTile, null, this);
           if(this.tile1.inWorld){
               this.tile1.destroy();
                this.score++;
                this.scoreText.text = 'Score:' +this.score;
               this.createFirstTile();
           }else{
               this.deathHandler();
           }
        },
        destroySecondTile:function(){
             game.physics.arcade.collide(this.tile1, this.base2Tile, this.createSecondTile, null, this);
             if(this.tile1.inWorld){
                 this.score++;
                this.scoreText.text = 'Score:' +this.score;
                this.tile2.destroy();
                this.createSecondTile();
                
            }else{
               this.deathHandler();
           }
        },
        destroyThirdTile:function(){
             game.physics.arcade.collide(this.tile1, this.base3Tile, this.createThirdTile, null, this);
             if(this.tile3.inWorld){
                 this.score++;
                this.scoreText.text = 'Score:' +this.score;
                this.tile3.destroy();
                this.createThirdTile();
            }else{
               this.deathHandler();
           }
        },
        create: function () {
            this.bg = game.add.tileSprite(0, 0, 900, 512, 'bg');
            
            this.base1Tile = game.add.sprite(0, 350, 'tile');
            this.base2Tile = game.add.sprite(276, 350, 'tile');
            this.base3Tile = game.add.sprite(552, 350, 'tile');
            
             this.createFirstTile();
             this.createSecondTile();
             this.createThirdTile();
             /**
              * Input handler part
              */
            var keyOne = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
            keyOne.onDown.add(this.destroyFirstTile, this);
            
            var keyTwo = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            keyTwo.onDown.add(this.destroySecondTile, this);
            
            var keyThree = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
            keyThree.onDown.add(this.destroyThirdTile, this);

            this.scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + this.score, {
                fill: '#fff'
            });
        },
        update: function () {
            game.physics.arcade.collide(this.tile1,  this.deathHandler, null, this);
            if (!this.tile1.inWorld) {
                this.deathHandler();
            }
            game.physics.arcade.collide(this.tile2,  this.deathHandler, null, this);
            if (!this.tile2.inWorld) {
                this.deathHandler();
            }
            game.physics.arcade.collide(this.tile3,  this.deathHandler, null, this);
            if (!this.tile3.inWorld) {
                this.deathHandler();
            }

        },
        jump: function () {
          
        },
        deathHandler: function () {
            game.state.start('homestate');
        }
    };
    game.state.add("playstate", playState);
    game.state.add("homestate", homeState);
    game.state.start('homestate');

})();
