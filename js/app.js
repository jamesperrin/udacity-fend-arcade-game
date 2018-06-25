"use strict";

const scoreboard = document.querySelector('.player-score span');
const livesSpan = document.querySelector('.player-lives span');

var Entity = function () {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
};

Entity.prototype.update = function (dt) {};

// Draw the Entity on the screen, required method for game
Entity.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (row, column, speed, height = 50, width = 78) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = row;
    this.y = column;
    this.h = height;
    this.w = width;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Populate Enemy.prototype from Entity.prototype
Enemy.prototype = Object.create(Entity.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Using Math.floor to ensure whole numbers are computed.
    this.x += Math.floor(dt * this.speed); // Horizontal 0 to 502, Gameboard -98 to 501

    if (this.x > gameSettings.board.right) {
        this.x = gameSettings.board.left;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = gameSettings.player.start.position.x;
    this.y = gameSettings.player.start.position.y;
    this.h = 50;
    this.w = 50;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
    this.lives = 3;
};

// Populate Enemy.prototype from Entity.prototype
Player.prototype = Object.create(Entity.prototype);

Player.prototype.setPosition = function () {
    // Initial postion x: 200 y: 410
    this.x = gameSettings.player.start.position.x;
    this.y = gameSettings.player.start.position.y;
};

Player.prototype.won = function () {
    this.setPosition();
    console.info('Player reached water!');
    this.scoring();
};

Player.prototype.scoring = function () {
    this.score += 10;
    scoreboard.textContent = this.score;
};

Player.prototype.loseLife = function () {
    if (this.lives > 0) {
        this.lives--;
    }
    livesSpan.textContent = this.lives;
};

Player.prototype.lose = function () {
    this.setPosition();
    this.loseLife();
};

Player.prototype.update = function () {
    if (this.y < gameSettings.board.top) {
        player.won()
    }
};

Player.prototype.handleInput = function (allowedKeys) {
    const boundary = {
        top: 0,
        bottom: 410,
        left: 0,
        right: 400
    };

    const increment = {
        UpDown: 85,
        LeftRight: 100
    };

    if (allowedKeys === 'left') {
        if (this.x > boundary.left && this.x <= boundary.right) {
            this.x -= increment.LeftRight;
        }
    } else if (allowedKeys === 'up') {
        if (this.y > boundary.top && this.y <= boundary.bottom) {
            this.y -= increment.UpDown;
        }
    } else if (allowedKeys === 'right') {
        if (this.x >= boundary.left && this.x < boundary.right) {
            this.x += increment.LeftRight;
        }
    } else if (allowedKeys === 'down') {
        if (this.y > boundary.top && this.y < boundary.bottom) {
            this.y += increment.UpDown;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Verticle 60, 150, 225
const allEnemies = [];
const player = new Player();

function createEnenmies() {
    // BUG Y: 230, 145, 60
    // PLAYER Y: 410, 325, 240, 155, 70
    // Horizontal On Gameboard -98 to 501. Off Gameboard -99 to 502.

    // Row 1 Enemies
    allEnemies.push(new Enemy(gameSettings.enemy.start.offset(1), gameSettings.board.rows[randomNumberRange(0, 2)], 125));
    allEnemies.push(new Enemy(gameSettings.enemy.start.offset(2), gameSettings.board.rows[randomNumberRange(0, 2)], 125));

    // Row 2 Enemies
    // allEnemies.push(new Enemy(gameSettings.enemy.start.offset(2), gameSettings.board.rows[1], 125));
    // allEnemies.push(new Enemy(gameSettings.enemy.start.offset(6), gameSettings.board.rows[1], 125));

    // Row 3 Enemies
    // allEnemies.push(new Enemy(gameSettings.enemy.start.offset(4), gameSettings.board.rows[2], 225));
}

createEnenmies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});