
var Asteroid = function (spriteId, position, speed, rotation, angle, state) {
  this.spriteId = spriteId;
  this.speed = speed;
  this.rotation = rotation;
  this.position = position;
  this.angle = angle;
	this.state = state;    
  this.pushed = false;
};

Asteroid.prototype.create = function () {
    
      var game = this.state.game;
      var sprite = this.state.add.sprite(this.position.x, this.position.y, 'rock' + this.spriteId, 2);

      sprite.scale.x = sprite.scale.y = 3;
      
      game.physics.enable(sprite, Phaser.Physics.P2JS);
      sprite.checkWorldBounds = true;
      sprite.body.angle = this.angle;
      sprite.body.collideWorldBounds = false;
      sprite.body.setZeroDamping();
      sprite.body.mass = this.spriteId * 5;

      this.sprite = sprite;
};

Asteroid.prototype.update = function () {

  if (!this.pushed) {
    this.pushed = true;
    this.sprite.body.moveForward(this.speed);
  }

  this.sprite.body.angle += this.rotation;

  screenWrap(this.sprite, this.state.game.world.bounds);
    
};

var randInt = function (min, max) {
  return Math.floor((Math.random() * max) + min);
};

var generateAsteroids = function (state, count) {

  var game = state.game;

  var generate = function () {
    return {
      spriteId: randInt(1, 5),
      rotation: randInt(-5, 5),
      speed: randInt(100, 300),
      angle: randInt(0, 360),
      position: { 
        x: randInt(0, game.world.bounds.width), 
        y: randInt(0, game.world.bounds.height)
      }
    };
  };

  var result = [];
  
  for (var i = 0; i < count; i++) {
      var a = generate(); 
      result.push(new Asteroid(a.spriteId, a.position, a.speed, a.rotation, a.angle, state));
  }

  return result;
};
