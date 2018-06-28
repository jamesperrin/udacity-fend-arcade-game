"use strict";

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "1000",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var allGems = [];
var player;

const gameSettings = {
    board: {
        top: 0,
        right: 502,
        left: -100,
        bottom: 410,
        rows: [60, 145, 230]
    },
    player: {
        start: {
            position: {
                x: 200,
                y: 410
            }
        }
    },
    enemy: {
        start: {
            offset: offset => -100 * offset
        }
    }
};

const scoreboard = document.querySelector('.player-score span');
const livesSpan = document.querySelector('.player-lives span');
const modal = document.querySelector('.final-score-modal');
const finalScoreSpan = document.querySelector('.final-score-modal .final-score span');
const canvas = document.querySelector('.canvas');
const playAgainBtn = document.querySelector('.final-score-modal section button');
const introBtn = document.querySelector('.intro-container button');
const startScreen = document.querySelector('#start-screen');


/**
 * @description Function to handle creating Game enemy characters.
 */
function createEnenmies() {
    const enemyCount = 2;

    if (allEnemies.length < enemyCount) {
        for (let i = 0; i < enemyCount; i++) {
            pushEnemy();
        }
    } else if (allEnemies.length >= enemyCount && player.score > 100) {
        pushEnemy();
    }

    // Private helper function to add a new enemy - DRY/SOLID
    function pushEnemy() {
        allEnemies.push(new Enemy(gameSettings.enemy.start.offset(Helper.RandomNumberRange(1, 4)), gameSettings.board.rows[Helper.RandomNumberRange(0, 2)], Helper.RandomNumberRange(125, 400)));
    }
}


/**
 * @description Function to handle creating Game Gem characters.
 */
function createGems() {
    // X: 10, 110, 210, 310, 410 
    const validX = [10, 110, 210, 310, 410];
    // Y: 89, 174, 259
    const validY = [89, 174, 259];

    if (allGems.length === 0 && player.score >= 100 && player.score % 300 === 0) {
        allGems.push(new Gem(validX[Helper.RandomNumberRange(0, 4)], validY[(Helper.RandomNumberRange(0, 2))]));
    }
}


/**
 * @description Function to handle Game Over event
 * @see
 * https://www.w3schools.com/jsref/met_html_focus.asp
 */
function gameOver() {
    toastr.clear();
    console.info('Player has no move lives.');
    finalScoreSpan.textContent = player.score.toLocaleString();
    canvas.classList.add('hidden');
    modal.classList.remove('hidden');
    playAgainBtn.focus();
}


/**
 * @description Function to handle resetting game logic.
 */
function gameReset() {
    canvas.classList.remove('hidden');
    modal.classList.add('hidden');
    player.score = 0;
    player.lives = 3;
    scoreboard.textContent = player.score;
    livesSpan.textContent = player.lives;
    finalScoreSpan.textContent = player.score;

    allEnemies = [];
    allGems = [];
    createEnenmies();
};


/**
 * @description Function to check if Player reached the water.
 */
function checkWhenPlayerScores() {
    if (player.y < gameSettings.board.top) {
        console.info('Player reached water!');
        player.score += 100;
        scoreboard.textContent = player.score.toLocaleString();
        toastr["success"]("100+", "Players scores!");
        setTimeout(() => player.setPosition(), 100);
        createGems();
        createEnenmies();
    }
};


/**
 * @description Function to check if Player lost, touching an enemy.
 */
function playerLostGame() {
    player.setPosition();
    player.loseLife();
    livesSpan.textContent = player.lives;
}


/**
 * @description Function to handle initializing game logic.
 * @see
 * http://keycode.info/
 */
function gameStart() {
    createEnenmies();

    player = new Player();

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // This listens for key presses and sends the keys to your
    // Player.handleInput() method. You don't need to modify this.
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    document.addEventListener('keyup', function (e) {
        var allowedKeys = {
            37: 'left',
            65: 'left',
            38: 'up',
            87: 'up',
            39: 'right',
            68: 'right',
            40: 'down',
            83: 'down'
        };

        player.handleInput(allowedKeys[e.keyCode]);
        checkWhenPlayerScores();
    });

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // Handles Game Over "Play Again?" button click event
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    playAgainBtn.addEventListener('click', gameReset);
}


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Handles Introduction "Start Game" button click event
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
introBtn.addEventListener('click', function (e) {

    startScreen.classList.add('hidden');
    document.querySelector('.main-container').classList.remove('hidden');
});

//~~~~~~~~~~~~~~~~~~~~~~~~
// Start game
//~~~~~~~~~~~~~~~~~~~~~~~~
gameStart();