"use strict";

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

var Gem = function (row, column, height = 50, width = 78) {
    this.x = row;
    this.y = column;
    this.h = height;
    this.w = width;

    const gemSprites = ['images/Gem Blue.png', 'images/Gem Green.png', 'images/Gem Orange.png'];
    this.sprite = gemSprites[Helper.RandomNumberRange(0, 2)];
};

Gem.prototype = Object.create(Entity.prototype);

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
        this.x = gameSettings.enemy.start.offset(Helper.RandomNumberRange(1, 4));
        this.y = gameSettings.board.rows[Helper.RandomNumberRange(0, 2)];
        this.speed = Helper.RandomNumberRange(125, 400);
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

Player.prototype.loseLife = function () {
    if (this.lives > 0) {
        this.lives--;
        toastr["error"]("YOu touched an enemy.", "OUACH!");
    }
};

Player.prototype.update = function () {
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