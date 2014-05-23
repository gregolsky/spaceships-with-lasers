(function() {
  'use strict';
    
  function Game() {
    this.player = null;
    this.cursors = null;
  }

  Game.prototype = {

    create: function () {
      
      var game = this.game;
        
      game.world.setBounds(0, 0, 4000, 4000);
      game.physics.startSystem(Phaser.Physics.P2JS);
        
      this.cursors = game.input.keyboard.createCursorKeys();
        
      var bgSprite = game.add.tileSprite(0, 0, game.world.bounds.width, game.world.bounds.height, 'nebula');
      bgSprite.scale.x = bgSprite.scale.y = 2;
      
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
