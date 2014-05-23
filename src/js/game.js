(function() {
  'use strict';

  var Player = function (state) {
      this.state = state;
      this.sprite = null;
  };
  
  Player.prototype.create = function () {
      
      this.sprite = this.state.add.sprite(0, 0, 'ship');
      this.sprite.angle = -90;
      this.sprite.scale.x = 1.5;
      this.sprite.scale.y = 1.5;
      this.sprite.anchor.set(0.5, 0.5);
      
      this.state.game.physics.enable(this.sprite, Phaser.Physics.P2JS);
      
      this.state.game.camera.deadzone = new Phaser.Rectangle(-1000, -1000, this.state.game.width, this.state.game.height);
      this.state.game.camera.focusOnXY(0, 0);
      this.state.game.camera.follow(this.sprite);
  };
    
  Player.prototype.update = function () {
    var cursors = this.state.cursors;
      
    if (cursors.left.isDown)
    {
        this.sprite.body.angle -= 4;
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.angle += 4;
    }

    if (cursors.up.isDown)
    {
        //  The speed we'll travel at
        this.sprite.body.thrust(500);
    }
  };
    
  function Game() {
    this.player = null;
    this.cursors = null;
  }

  Game.prototype = {

    create: function () {
      
      this.game.world.setBounds(-1000, -1000, 2000, 2000);
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.cursors = this.game.input.keyboard.createCursorKeys();
        
      this.game.add.tileSprite(-1000, -1000, 2000, 2000, 'nebula');
      
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
