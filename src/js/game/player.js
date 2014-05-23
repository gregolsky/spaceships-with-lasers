
  var Player = function (state) {
      this.state = state;
      this.sprite = null;
  };
  
  Player.prototype.create = function () {
      
      var game = this.state.game;
      
      this.sprite = this.state.add.sprite(game.width / 2, game.height / 2, 'ship');
      this.sprite.angle = -90;
      this.sprite.scale.x = 1.5;
      this.sprite.scale.y = 1.5;
      
      game.physics.enable(this.sprite, Phaser.Physics.P2JS);
      this.sprite.body.setZeroDamping();
      
      game.camera.deadzone = new Phaser.Rectangle(0, 0, game.width, game.height);
      game.camera.focusOn(this.sprite);
      game.camera.follow(this.sprite);
  };
    
  Player.prototype.update = function () {
    var cursors = this.state.cursors;
    
    var ROTATION_VALUE = 50;
      
    if (cursors.left.isDown)
    {
        this.sprite.body.rotateLeft(ROTATION_VALUE);
    }
    else if (cursors.right.isDown)
    {
        this.sprite.body.rotateRight(ROTATION_VALUE);
    }
    else {
        this.sprite.body.rotateRight(0);
    }

    if (cursors.up.isDown)
    {
        this.sprite.body.thrust(500);
    }
  };