// Starting coloumn positions for Enemies
const startPositions = [-50, -100, -200, -300, -400, -500, -600, -700, -800, -900, -1000];

// Starting row positions for Enemies
const rowPositions = [55, 135, 215];
// 55, 135, 215
// 295, 375

/**
 * Generates a random number between a min and max range
 * @param {number} min Minimum number
 * @param {number} max Maxium number
 * @see 
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 * https://kadimi.com/negative-random/
 */
function randomNumberRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Enemies our player must avoid
var Enemy = function (row, column, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = row;
    this.y = column;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += Math.floor((this.y + this.speed) * dt); // Horizontal 0 to 502, Gameboard -98 to 501

    if (this.x > 550) {
        this.x = startPositions[randomNumberRange(0, 10)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // Initial postion x: 200 y: 375
    this.reset();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.reset = function () {
    // Initial postion x: 200 y: 375
    this.x = 200;
    this.y = 375;
};

Player.prototype.update = function () {
    
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (allowedKeys) {
    if (allowedKeys === 'left') {
        if (this.x > 0 && this.x <= 400) {
            this.x -= 100;
        }
    } else if (allowedKeys === 'up') {
        if (this.y > -25 && this.y <= 375) {
            this.y -= 80;
        }

        if (this.y <= -25) {
            setTimeout(function () {
                player.reset();
            }, 100);
        }
    } else if (allowedKeys === 'right') {
        if (this.x >= 0 && this.x < 400) {
            this.x += 100;
        }
    } else if (allowedKeys === 'down') {
        if (this.y > -25 && this.y < 375) {
            this.y += 80;
        }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Verticle 60, 150, 225
var allEnemies = [];

// Row 1 Enemies
allEnemies[0] = new Enemy(-100, 55, 75);
//allEnemies[1] = new Enemy(-300, 55, 75);
allEnemies[2] = new Enemy(-900, 55, 200);

// Row 2 Enemies
allEnemies[3] = new Enemy(-200, 135, 0);
allEnemies[4] = new Enemy(-500, 135, 50);
//allEnemies[5] = new Enemy(-700, 135, 0);

// Row 3 Enemies
allEnemies[6] = new Enemy(-300, 215, -75);
allEnemies[7] = new Enemy(-400, 215, -75);
allEnemies[8] = new Enemy(-800, 215, 0);

// 55, 135, 215
// 295, 375
var player = new Player();

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