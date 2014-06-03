
  var Player = function (state) {
      this.state = state;
      this.sprite = null;
      this.isTurning = false;
  };
  
  Player.prototype.create = function () {
      
      var game = this.state.game;
      
      var sprite = this.state.add.sprite(game.width / 2, game.height / 2, 'ship', 2);
      
      sprite.animations.add('go', [2], 60, false);
      sprite.animations.add('turn_left', [ 1, 0 ], 60, false);
      sprite.animations.add('left', [ 0 ], 60, false);
      sprite.animations.add('turn_right', [ 3, 4 ], 60, false);
      sprite.animations.add('right', [ 4 ], 60, false);
      
      sprite.angle = -90;
      
      game.physics.enable(sprite, Phaser.Physics.P2JS, true);
      sprite.checkWorldBounds = true;
      sprite.body.collideWorldBounds = false;
      sprite.body.setZeroDamping();
      
      game.camera.deadzone = new Phaser.Rectangle(0, 0, game.width, game.height);
      game.camera.focusOn(sprite);
      game.camera.follow(sprite);
      
      sprite.body.clearShapes();
      sprite.body.loadPolygon('physics', 'ship');

      this.sprite = sprite;
  };
    
  var turn_animation = function (player, sprite, side) {
      if (!player.isTurning) {
       	player.isTurning = true;
        sprite.animations.play('turn_' + side);
        return;
      }
      
      sprite.animations.play(side);
  };

  Player.prototype.update = function () {
    var cursors = this.state.cursors;
    var sprite = this.sprite;
    var game = this.state.game;
    var ROTATION_VALUE = 50;
      
    if (cursors.left.isDown) {
        sprite.body.rotateLeft(ROTATION_VALUE);
        turn_animation(this, sprite, 'left');
    }
    else if (cursors.right.isDown) {
        sprite.body.rotateRight(ROTATION_VALUE);
        turn_animation(this, sprite, 'right');
    }
    else {
        sprite.body.rotateRight(0);
        this.isTurning = false;
        sprite.animations.play('go');
    }

    if (cursors.up.isDown) {
        sprite.body.thrust(500);
    }
      
    if (cursors.down.isDown) {
        sprite.body.reverse(250);
    }
      
    screenWrap(sprite, game.world.bounds);
  };
