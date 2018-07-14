/*if (lives === 0) {
    enemy.x = -200;
    enemy.y = -200;
}*/
// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x = x;
        this.y = y;
        this.speed = speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.speed * dt;
        //reset bug when moved off screen
        if (this.x > 505) {
            this.x = -200;
            //randomize speed
            this.speed = 100 + Math.floor(Math.random() * 217);
        }
        //check for collisions
        //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        const playerBox = {x: player.x, y: player.y, width: 50, height: 50}
        const enemiesBox = {x: this.x, y: this.y, width: 70, height: 50}
        if (playerBox.x < enemiesBox.x + enemiesBox.width &&
            playerBox.x + playerBox.width > enemiesBox.x &&
            playerBox.y < enemiesBox.y + enemiesBox.width &&
            playerBox.height + playerBox.y > enemiesBox.y) {
            //collision detected, reset
            player.x = 200;
            player.y = 380;
            //score = 0;
            //scoreCounter.innerHTML = score;
            player.lives = player.lives - 1;
            let livesCounter = document.querySelector('.livesTotal');
            livesCounter.innerHTML = player.lives.toString();
        }
    };
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//create Gem class
class Gem {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/gem-orange.png';
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {
        const playerBox = {x: player.x, y: player.y, width: 50, height: 50}
        const gemBox = {x: this.x, y: this.y, width: 70, height: 50}
        if (playerBox.x < gemBox.x + gemBox.width &&
            playerBox.x + playerBox.width > gemBox.x &&
            playerBox.y < gemBox.y + gemBox.width &&
            playerBox.height + playerBox.y > gemBox.y) {
            //collision detected, hide gem off screen
            gem.x = -500;
            gem.y = -500;
            player.score += 500;
            let scoreCounter = document.querySelector('.scoreTotal');
            scoreCounter.innerHTML = player.score;
            setTimeout(function() {
                gem.reset();
            }, 5000);
        }    
    }
    reset() {
        this.x = (101 * Math.floor(Math.random() * 5) + 0);
        this.y = (50 + (85 * Math.floor(Math.random() * 3) + 0));
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.sprite = 'images/char-princess-girl.png';
        this.score = 0;
        this.lives = 5;
    }
    
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    handleInput(keypress) {
        if(keypress == 'left' && this.x > 0) {
            this.x -= 100;
        };
        if(keypress == 'right' && this.x < 380) {
            this.x += 100;
        };
        if(keypress == 'up' && this.y > 0) {
            this.y -=81;
        };
        if(keypress =='down' && this.y < 380) {
            this.y +=81;
        };
    }
    update() {
        if(this.y < 0) {
            this.x = 200;
            this.y = 380;
            this.score += 100;
            let scoreCounter = document.querySelector('.scoreTotal');
            scoreCounter.innerHTML = this.score;
        } 
           
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//location creation
var enemyLocation = [50,130,210];
const player = new Player(200,380);
var enemy;
//var gem;
//var gemLocation = [50,130,210];
//for each loop for enemies
enemyLocation.forEach(function(position) {
    enemy = new Enemy(-200, position, 100 + Math.floor(Math.random() * 77));
    allEnemies.push(enemy);
})
//instatiate gem after 3 times across board
//y positions: 50, 130, 210
//x positions: 0, 101, 202, 303, 404
var gem = new Gem (101 * Math.floor(Math.random() * 5) + 0, 50 +
(85 * Math.floor(Math.random() * 3) + 0));



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
