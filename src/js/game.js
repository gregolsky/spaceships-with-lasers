(function() {
  'use strict';

  var Player = function (state) {
      this.state = state;
      this.sprite = null;
  };
  
  Player.prototype.create = function () {
      var x = this.state.game.width / 2
        , y = this.state.game.height / 2;
      
      this.sprite = this.state.add.sprite(x, y, 'ship');
      this.sprite.angle = -95;
      this.sprite.scale.x = 1.5;
      this.sprite.scale.y = 1.5;
      this.sprite.anchor.set(0.5, 0.5);
      
      this.state.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
      
      this.sprite.body.collideWorldBounds = true;
      
      this.state.game.camera.follow(this.sprite);
  };
    
  Player.prototype.update = function () {
    var cursors = this.state.cursors;
      
    if (cursors.left.isDown)
    {
        this.sprite.body.rotateLeft(70);
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.rotateRight(70);
    }

    if (cursors.up.isDown)
    {
        //  The speed we'll travel at
        this.sprite.body.thrust(500);
    }
    else
    {
        if (this.speed > 0)
        {
            this.speed -= 4;
        }
    }
  };
    
  function Game() {
    this.player = null;
    this.cursors = null;
  }

  Game.prototype = {

    create: function () {
      
      this.game.world.setBounds(0, 0, 800, 600);
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.cursors = this.game.input.keyboard.createCursorKeys();
      
      this.player = new Player(this);
      this.player.create();
    },

    update: function () {
        this.player.update();
        
        this.game.debug.cameraInfo(this.game.camera, 32, 32);
    this.game.debug.spriteCoords(this.player.sprite, 32, 200);
        
    }

  };

  window['spaceships-with-lasers'] = window['spaceships-with-lasers'] || {};
  window['spaceships-with-lasers'].Game = Game;

}());
