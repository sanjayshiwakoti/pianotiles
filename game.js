;
(function () {
 var game = new Phaser.Game(400, 600,Phaser.AUTO,'piano-tile');
    /*
    var lineA=new Phaser.Line(0,100,600,100);
    var lineB=new Phaser.Line(0,200,600,200);
    var lineC=new Phaser.Line(0,300,600,300);
    
     var lineD=new Phaser.Line(0,400,600,300);
      var lineE=new Phaser.Line(0,0,600,0);
      */
    var scoreValue = 0;
    var scoreText;
    var GRAVITYRATIO = 0.05;
    var TILEGRAVITY;
    
    var homeState = {
        preload: function () {
            TILEGRAVITY = 100;
        },
        create: function () {
            var button1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {
                fill: '#fff'
            });
            scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + scoreValue, {
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


    var gameOverState = {
        preload: function () {

        },
        create: function () {
            var button1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {
                fill: '#fff'
            });
            button1.anchor.setTo(0.5, 0.5);
            button1.inputEnabled = true;
            button1.events.onInputDown.add(function () {
                game.state.start('playstate');
            }, this);

            var submitBtn = game.add.text(game.world.centerX, game.world.centerY + 50, 'Submit', {
                fill: '#fff'
            });

            scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + scoreValue, {
                fill: '#FF0000'
            });
            submitBtn.anchor.setTo(0.5, 0.5);
            submitBtn.inputEnabled = true;
            submitBtn.events.onInputDown.add(function () {
                if(submitScore()){
                  game.state.start('homestate');
              }
            }, this);

        },
        update: function () {
        }
    };
    /**
     * Total number of tiles initialize
     */
    this.tile1 = null;
    this.tile2 = null;
    this.tile3 = null;
     this.tile4 = null;
    var playState = {
        preload: function () {
            game.load.image('tile', 'assets/tile.png');
            game.load.image('bg', 'assets/gamebg.jpg');
            scoreValue=0;
            scoreText.text=scoreValue;
        },
        createRandom:function(){
            var rnd=game.rnd.integerInRange(1, 4);
        
            if(rnd==1){
                this.createFirstTile();
            }else if(rnd==2){
                this.createSecondTile();
            }else if(rnd==3){
                this.createThirdTile();
            }else if(rnd==4){
                this.createFourthTile();
            }
        },
        createFirstTile: function () {
            this.tile1 = game.add.sprite(0, 0, 'tile');
            game.physics.arcade.enable(this.tile1);
            this.tile1.body.gravity.y = TILEGRAVITY;
            TILEGRAVITY = TILEGRAVITY + (TILEGRAVITY * GRAVITYRATIO);
        },
        createSecondTile: function () {
            this.tile2 = game.add.sprite(100, 0, 'tile');
            game.physics.arcade.enable(this.tile2);
            this.tile2.body.gravity.y = TILEGRAVITY;
            TILEGRAVITY = TILEGRAVITY + (TILEGRAVITY * GRAVITYRATIO);
        },
        createThirdTile: function () {
            this.tile3 = game.add.sprite(200, 0, 'tile');
            game.physics.arcade.enable(this.tile3);
            this.tile3.body.gravity.y = TILEGRAVITY;
            TILEGRAVITY = TILEGRAVITY + (TILEGRAVITY * GRAVITYRATIO);
        },
        createFourthTile: function () {
            this.tile4 = game.add.sprite(300, 0, 'tile');
            game.physics.arcade.enable(this.tile4);
            this.tile4.body.gravity.y = TILEGRAVITY;
            TILEGRAVITY = TILEGRAVITY + (TILEGRAVITY * GRAVITYRATIO);
        },
        create: function () {

            this.bg = game.add.tileSprite(0, 0, 900, 612, 'bg');

            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            keyOne = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
            keyOne.onDown.add(this.destroyTile, this);
            keyTwo = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
            keyTwo.onDown.add(this.destroyTile, this);
            keyThree = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
            keyThree.onDown.add(this.destroyTile, this);
             keyFour = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
            keyFour.onDown.add(this.destroyTile, this);

            this.createFirstTile();
            
            scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + scoreValue, {
                fill: '#FF0000'
            });
        },
        update: function () {
            if (this.tile1) {
                if (!this.tile1.inWorld) {
                    this.tile1='';
                    this.deathHandler();
                }
            }
            if (this.tile2) {
                if (!this.tile2.inWorld) {
                    this.tile2='';
                    this.deathHandler();
                }
            }
            if (this.tile3) {
                if (!this.tile3.inWorld) {
                    this.tile3='';
                    this.deathHandler();
                }
            }
            if (this.tile4) {
                if (!this.tile4.inWorld) {
                    this.tile4='';
                    this.deathHandler();
                }
            }

        },
        destroyTile: function (key) {
          
             if (this.tile1&&key.keyCode==49) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile1.destroy();
                this.tile1='';
                this.createRandom();  
            }else if (this.tile2&&key.keyCode==50) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile2.destroy();
                this.tile2='';
                this.createRandom(); 
            }else if (this.tile3&&key.keyCode==51) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile3.destroy();
                this.tile3='';
                this.createRandom(); 
            }else if (this.tile4&&key.keyCode==52) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile4.destroy();
                this.tile4='';
                this.createRandom(); 
            }else{
                this.deathHandler();
            }
            
            
        },
        deathHandler: function () {
            this.tile1='';
            this.tile2='';
            this.tile3='';
             this.tile4='';
            TILEGRAVITY=100;
            $('#score').val(scoreValue);
            game.state.start('gameover');
        }
    };
    game.state.add("playstate", playState);
    game.state.add("homestate", homeState);
    game.state.add("gameover", gameOverState);
    game.state.start('homestate');

})();
