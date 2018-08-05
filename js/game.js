var Furry = require("./furry.js");
var Coin = require("./coin.js");

function Game() {
    var board = document.querySelectorAll('#board div');
    var furry = new Furry();
    var coin = new Coin();
    var score = 0;
    var self = this;
    var idSetInterval = setInterval(function () {
        self.moveFurry();
    }, 250);
    var scoreText = document.querySelector('#score strong');

    this.index = function (x, y) {
        return x + (y *10);
    };

    this.showFurry = function () {
        board[ this.index( furry.x, furry.y ) ].classList.add('furry');
    };

    this.hideVisibleFurry = function () {
        document.querySelector('.furry').classList.remove('furry');
    };

    this.showCoin = function () {
        board[ this.index( coin.x, coin.y )].classList.add('coin');
    };

    this.checkCoinCollision = function () {
        if (furry.x === coin.x && furry.y === coin.y) {
            board[ this.index( coin.x, coin.y )].classList.remove('coin');
            score += 1;
            scoreText.innerText = score;
            coin = new Coin();
            self.showCoin();
        };
    };

    this.moveFurry = function () {
        self.hideVisibleFurry();
        if ( furry.direction === 'right') {
            furry.x = furry.x + 1;
        } else if ( furry.direction === 'left') {
            furry.x = furry.x - 1;
        } else if ( furry.direction === 'up') {
            furry.y = furry.y - 1;
        } else if ( furry.direction === 'down') {
            furry.y = furry.y + 1;
        };
        self.gameOver();
        self.showFurry();
        self.checkCoinCollision();
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                furry.direction = 'left';
                break;
            case 38:
                furry.direction = 'up';
                break;
            case 39:
                furry.direction = 'right';
                break;
            case 40:
                furry.direction = 'down';
                break;
        };
    };

    this.startGame = function () {
        return idSetInterval;
    };

    this.gameOver = function () {
        if (furry.x > 9 || furry.x < 0 || furry.y > 9 || furry.y < 0) {
            clearInterval(idSetInterval);
            alert('Game over! You scored ' + score + ' points.');
            self.hideVisibleFurry();
        };
    };
};
module.exports = Game;