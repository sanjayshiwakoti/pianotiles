;
(function () {

    var game = new Phaser.Game(828, 600);

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
                    fill: '#FF0000'
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
            game.load.image('tile', 'assets/tile.png');
            game.load.image('base', 'assets/tiles.png');
            game.load.image('bg', 'assets/gamebg.jpg');
        },
        createFirstTile:function(){
            this.tile1 = game.add.sprite(0, 0, 'tile');
            game.physics.arcade.enable(this.tile1);
            this.tile1.body.gravity.y = this.getRandom(100, 400);
            TILE1GRAVITY=TILE1GRAVITY+(TILE1GRAVITY*GRAVITYRATIO);
        },
        createSecondTile:function(){
            this.tile2 = game.add.sprite(100, 0, 'tile');
            game.physics.arcade.enable(this.tile2);
            this.tile2.body.gravity.y = this.getRandom(100, 400);
            TILE2GRAVITY=TILE2GRAVITY+(TILE2GRAVITY*GRAVITYRATIO);
        },
        createThirdTile:function(){
            this.tile3 = game.add.sprite(200, 0, 'tile');
            game.physics.arcade.enable(this.tile3);
            this.tile3.body.gravity.y = this.getRandom(100, 400);
            TILE3GRAVITY=TILE3GRAVITY+(TILE3GRAVITY*GRAVITYRATIO);
        },
       
        destroyFirstTile:function(a, b){
        
        },
        destroySecondTile:function(){
             
        },
        destroyThirdTile:function(){
            //  game.physics.arcade.collide(this.tile1, this.base3Tile, this.createThirdTile, null, this);
            //  if(this.tile3.inWorld){
            //      this.score++;
            //     this.scoreText.text = 'Score:' +this.score;
            //     this.tile3.destroy();
            //     this.createThirdTile();
            // }else{
            //    this.deathHandler();
           // }
        },
        
        getRandom: function(max, min){
          return Math.floor(Math.random() * (max -min + 1)) + min;
        }, 

        create: function () {
           
            this.bg = game.add.tileSprite(0, 0, 900, 612, 'bg');
            
            this.base1Tile = game.add.sprite(0, 599, 'base');
            this.base2Tile = game.add.sprite(100, 599, 'base');
            this.base3Tile = game.add.sprite(200, 599, 'base');
            
            this.createFirstTile();
            this.createSecondTile();
            this.createThirdTile();
            
            game.physics.arcade.enable(this.base1Tile);
            game.physics.arcade.enable(this.base2Tile);
            game.physics.arcade.enable(this.base3Tile);


            this.scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + this.score, {
                fill: '#FF0000'
            });
        },
        update: function () { 
        keyOne = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
        keyOne.onDown.add(this.gunfired,this);
        keyTwo = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
        keyTwo.onDown.add(this.secondCollapse,this);
        keyThree = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
        keyThree.onDown.add(this.thirdCollapse,this);
         if (!this.tile1.inWorld && !this.tile2.inWorld && !this.tile3.inWorld) {
                this.deathHandler();
            }
          },
          thirdCollapse: function(key) {
            var three = game.physics.arcade.overlap(this.tile3, this.base3Tile);
            if (!three){
               this.deathHandler();
            }
            else{
              this.score++;
              this.scoreText.text = 'Score:' +this.score;              
              this.tile3.destroy();
              this.createThirdTile();
            }
          },
          secondCollapse: function(key) {
            var two = game.physics.arcade.overlap(this.tile2, this.base2Tile);
            if (!two){
               this.deathHandler();
            }
            else{
              this.score++;
              this.scoreText.text = 'Score:' +this.score;
              this.tile2.destroy();
              this.createSecondTile();
            }
          },
          gunfired: function(key) {
            var one = game.physics.arcade.overlap(this.tile1, this.base1Tile);
            if (!one ){
               this.deathHandler();
            }
            else{
              this.score++;
              this.scoreText.text = 'Score:' +this.score;
              this.tile1.destroy();
              this.createFirstTile();
          }  
        },
      
        deathHandler: function () {
            game.state.start('homestate');
        }
    };
    game.state.add("playstate", playState);
    game.state.add("homestate", homeState);
    game.state.start('homestate');

})();
