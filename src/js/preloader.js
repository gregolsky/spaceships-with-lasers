(function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function () {
      this.asset = this.add.sprite(320, 240, 'preloader');
      this.asset.anchor.setTo(0.5, 0.5);

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);
      this.load.spritesheet('ship', 'assets/ship.png', 23, 27, 5);
      this.load.image('nebula', 'assets/nebula.jpg');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');
      
      for (var i = 1; i <= 5; i++) {
       	this.load.image('rock' + i, 'assets/rock' + i + '.png');
      }

      this.load.physics('physics', 'assets/physics.json');
    },

    create: function () {
      this.asset.cropEnabled = false;
    },

    update: function () {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function () {
      this.ready = true;
    }
  };

  window['spaceships-with-lasers'] = window['spaceships-with-lasers'] || {};
  window['spaceships-with-lasers'].Preloader = Preloader;

}());
