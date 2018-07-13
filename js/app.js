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
            this.speed = 100 + Math.floor(Math.random() * 97);
        };
    };
    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
}


//Player.prototype.update = function() {
    //}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

//y location creation
var enemyLocation = [50,130,210];
const player = new Player(200,380);
var enemy;

enemyLocation.forEach(function(position) {
    enemy = new Enemy(-200, position, 100 + Math.floor(Math.random() * 77));
    allEnemies.push(enemy);
})

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
