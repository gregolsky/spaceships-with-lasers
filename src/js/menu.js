(function() {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
    this.startKey = null;
  }

  Menu.prototype = {

    create: function () {
      var x = this.game.width / 2
        , y = this.game.height / 2 - 50;


      this.timer = 0;
        
      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Spaceships. With lasers.' );
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      this.startTxt = this.add.bitmapText(x, y + 50, 'minecraftia', 'INSERT COIN');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.onDown, this);

      this.startKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        
        var interval = 500;
        this.timer += this.game.time.elapsed; //this is in ms, not seconds.
        if (this.timer >= interval)
        {
            this.timer -= interval;
            this.startTxt.visible = !this.startTxt.visible;
        }

        if (this.startKey.isDown) {
          this.onDown();
        }
    },

    onDown: function () {
      this.game.state.start('game');
    }
  };

  window['spaceships-with-lasers'] = window['spaceships-with-lasers'] || {};
  window['spaceships-with-lasers'].Menu = Menu;

}());
