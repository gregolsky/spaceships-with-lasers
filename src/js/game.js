(function() {
  'use strict';

  function Game() {
    this.player = null;
    this.cursors = null;
  }

  Game.prototype = {

    create: function () {

      var game = this.game;

      if (this.game.context) {
        this.game.renderer.setSmoothingEnabled(game.context, false);
      } else {
        this.game.renderer.options.antialias = false;
      }

      this.game.antialias = false;
      this.game.stage.smoothed = false;

      game.world.setBounds(0, 0, 4000, 4000);
      game.physics.startSystem(Phaser.Physics.P2JS);

      this.cursors = game.input.keyboard.createCursorKeys();

      var bgSprite = game.add.tileSprite(0, 0, game.world.bounds.width, game.world.bounds.height, 'nebula');
      bgSprite.scale.x = bgSprite.scale.y = 2;

      this.player = new Player(this);
      this.player.create();

      this.asteroids = generateAsteroids(this, 20);
      this.asteroids.forEach(function (a) {
        a.create();
      });

      var playerCollisionGroup = game.physics.p2.createCollisionGroup();
      var asteroidsCollisionGroup = game.physics.p2.createCollisionGroup();

      this.asteroids.forEach(function (item) {
        item.sprite.body.setCollisionGroup(asteroidsCollisionGroup);
        item.sprite.body.collides([playerCollisionGroup, asteroidsCollisionGroup]);
      });

      this.player.sprite.body.setCollisionGroup(playerCollisionGroup);
      this.player.sprite.body.collides(asteroidsCollisionGroup);

    },

    update: function () {
      this.player.update();

      this.asteroids.forEach(function (a) {
        a.update();
      });

      this.game.debug.cameraInfo(this.game.camera, 32, 32);
      this.game.debug.spriteCoords(this.player.sprite, 32, 200);

    }

  };

  window['spaceships-with-lasers'] = window['spaceships-with-lasers'] || {};
  window['spaceships-with-lasers'].Game = Game;

}());
