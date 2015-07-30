var Engine = Engine || {};
var DungeonExplorer = DungeonExplorer || {};

DungeonExplorer.PlayerMovement = function (game_state, prefab, parameters) {
    "use strict";
    Engine.Script.call(this, game_state, prefab, parameters);
    
    this.walking_speed = parameters.walking_speed;
    this.stopped_frame = this.prefab.frame;
    
    this.cursors = this.game_state.game.input.keyboard.createCursorKeys();

    this.direction = {x: 0, y: 1};
};

DungeonExplorer.PlayerMovement.prototype = Object.create(Engine.Script.prototype);
DungeonExplorer.PlayerMovement.prototype.constructor = DungeonExplorer.PlayerMovement;

DungeonExplorer.PlayerMovement.prototype.update = function () {
    "use strict";
    
    this.accelerationX = 0;
    if (this.cursors.left.isDown) {
        this.accelerationX = -250;

        if (this.prefab.body.velocity.y < 5 && this.prefab.body.velocity.y > -5) {
            this.direction.x = -1;
            this.direction.y = 0;
        }
    } else if (this.cursors.right.isDown) {
        this.accelerationX = 250;

        if (this.prefab.body.velocity.y < 5 && this.prefab.body.velocity.y > -5) {
            this.direction.x = 1;
            this.direction.y = 0;
        }
    }
    if ((this.prefab.body.velocity.x > 0 && this.cursors.left.isDown) ||
        (this.prefab.body.velocity.x < 0 && this.cursors.right.isDown) ||
        (!this.cursors.right.isDown && !this.cursors.left.isDown)) {
        if (this.prefab.body.velocity.x < 0) {
            this.accelerationX += 550;
        }
        if (this.prefab.body.velocity.x > 0) {
            this.accelerationX -= 550;
        }
        if (this.prefab.body.velocity.x < 100 && this.prefab.body.velocity.x > -100) {
            this.accelerationX = 0;
            this.prefab.body.velocity.x = 0;
        }
    }
    
    this.accelerationY = 0;
    if (this.cursors.up.isDown) {
        this.accelerationY = -250;

        if (this.prefab.body.velocity.x < 5 && this.prefab.body.velocity.x > -5) {
            this.direction.y = -1;
            this.direction.x = 0;
        }
    } else if (this.cursors.down.isDown) {
        this.accelerationY = 250;

        if (this.prefab.body.velocity.x < 5 && this.prefab.body.velocity.x > -5) {
            this.direction.y = 1;
            this.direction.x = 0;
        }
    }
    if ((this.prefab.body.velocity.y > 0 && this.cursors.up.isDown) ||
        (this.prefab.body.velocity.y < 0 && this.cursors.down.isDown) ||
        (!this.cursors.up.isDown && !this.cursors.down.isDown)) {
        if (this.prefab.body.velocity.y < 0) {
            this.accelerationY += 550;
        }
        if (this.prefab.body.velocity.y> 0) {
            this.accelerationY -= 550;
        }
        if (this.prefab.body.velocity.y < 100 && this.prefab.body.velocity.y > -100) {
            this.accelerationY = 0;
            this.prefab.body.velocity.y = 0;
        }
    }

    this.prefab.body.acceleration = new Phaser.Point(this.accelerationX, this.accelerationY);
    switch (this.prefab.body.facing) {
    case Phaser.UP:
    {
        this.prefab.animations.play("walking_up");
        this.stopped_frame = 37;
        break;
    }
    case Phaser.DOWN:
    {
        this.prefab.animations.play("walking_down");
        this.stopped_frame = 1;
        break;
    }
    case Phaser.LEFT:
    {
        this.prefab.animations.play("walking_left");
        this.stopped_frame = 13;
        break;
    }
    case Phaser.RIGHT:
    {
        this.prefab.animations.play("walking_right");
        this.stopped_frame = 25;
        break;
    }
    }
    
    if (this.prefab.body.velocity.x === 0 && this.prefab.body.velocity.y === 0) {
        this.prefab.animations.stop();
        this.prefab.frame = this.stopped_frame;
    }
};
