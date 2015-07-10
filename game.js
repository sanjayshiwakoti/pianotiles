;
(function () {
 var game = new Phaser.Game(400, 600,Phaser.AUTO,'piano-tile');
    var scoreValue = 0;
    var scoreText;
    var GRAVITYRATIO = 0.05;
    var TILEGRAVITY;
    
    var instructionState = {
        preload: function () {
            
        },
        create: function () {
            var button1 = game.add.text(game.world.centerX, game.world.centerY+30, 'Back', {
                fill: '#fff',fontSize:'35px'
            });
            var instruction='Instructions\nBreak the tiles while in the green zone.\nThere are four grid where tiles will drop.\n\nControls\nPress key 1 for first grid.\nPress key 2 for second grid.\nPress key 3 for third grid.\nPress key 4 for fourth grid.';
            instructionText = game.add.text(0, 60, instruction, {
                fill: '#FF0000',fontSize:'18px'
            });
            

            button1.anchor.setTo(0.5, 0.5);
            button1.inputEnabled = true;
            button1.events.onInputDown.add(function () {
                game.state.start('homestate');
            }, this);
        },
        update: function () {
        }
    };
    
    var homeState = {
        preload: function () {
            TILEGRAVITY = 100;
        },
        create: function () {
            var button1 = game.add.text(game.world.centerX, game.world.centerY, 'Play', {
                fill: '#fff',fontSize:'35px'
            });
            
             var instructionButton = game.add.text(game.world.centerX, game.world.centerY+35, 'Instructions', {
                fill: '#fff',fontSize:'35px'
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
            
             instructionButton.anchor.setTo(0.5, 0.5);
            instructionButton.inputEnabled = true;
            instructionButton.events.onInputDown.add(function () {
                game.state.start('instructionstate');
            }, this);
            
             var gameName = game.add.text(game.world.centerX, 100, 'Piano Tiles', {
                fill: '#fff',fontSize:'35px'
            });
            gameName.anchor.setTo(0.5, 0.5);
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
     this.basetile=null;
    var playState = {
        preload: function () {
            game.load.image('tile', 'assets/tile.png');
            game.load.image('bg', 'assets/gamebg.jpg');
             game.load.image('basetile', 'assets/basetile.png');
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
            this.basetile = game.add.tileSprite(0,500,600, 500, 'basetile');
            scoreText = game.add.text(game.world.centerX, game.world.top, 'Score: ' + scoreValue, {
                fill: '#FF0000'
            });

            game.physics.startSystem(Phaser.Physics.ARCADE);
            
            keyOne = this.input.keyboard.addKey(Phaser.Keyboard.ONE);
            keyOne.onDown.add(this.destroyTile, this);
            keyTwo = this.input.keyboard.addKey(Phaser.Keyboard.TWO);
            keyTwo.onDown.add(this.destroyTile, this);
            keyThree = this.input.keyboard.addKey(Phaser.Keyboard.THREE);
            keyThree.onDown.add(this.destroyTile, this);
             keyFour = this.input.keyboard.addKey(Phaser.Keyboard.FOUR);
            keyFour.onDown.add(this.destroyTile, this);

            this.createRandom();
            
            
            
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
            
          
             if (this.tile1&&key.keyCode==49&&this.tile1.y>=350) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile1.destroy();
                this.tile1='';
                this.createRandom();  
            }else if (this.tile2&&key.keyCode==50&&this.tile2.y>=350) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile2.destroy();
                this.tile2='';
                this.createRandom(); 
            }else if (this.tile3&&key.keyCode==51&&this.tile3.y>=350) {
                scoreValue++;
                scoreText.text = 'Score:' + scoreValue;
                this.tile3.destroy();
                this.tile3='';
                this.createRandom(); 
            }else if (this.tile4&&key.keyCode==52&&this.tile4.y>=350) {
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
    game.state.add("instructionstate", instructionState);
    game.state.start('homestate');

})();
