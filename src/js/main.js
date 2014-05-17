window.onload = function () {
  'use strict';

  var game
    , ns = window['spaceships-with-lasers'];

  game = new Phaser.Game(640, 480, Phaser.AUTO, 'spaceships-with-lasers-game');
  game.state.add('boot', ns.Boot);
  game.state.add('preloader', ns.Preloader);
  game.state.add('menu', ns.Menu);
  game.state.add('game', ns.Game);

  game.state.start('boot');
};
