// Some stats
lives = 20

// Shop and tower selection
var moneydisplay = document.getElementById('overlay-text');
var moneycount = 0;

moneydisplay.innerHTML = `Money: $${moneycount}`;

class Tile {
  constructor(tileDiv, tileId) {
    this.element = tileDiv;  // The DOM element representing the tile
    this.tileId = tileId;    // The ID from the map data
    this.placedTower = null; // Will hold a reference to the tower placed on this tile

    this.setClass();  // Assign class based on tile ID
  }

  // Set the class of the tile based on its ID
  setClass() {
    if (this.tileId === 1) {
      this.element.classList.add('tile-1');
    } else if (this.tileId === 2){
      this.element.classList.add('tile-2');
    }else if (this.tileId === 3){
      this.element.classList.add('tile-3');
    }else if (this.tileId === 4){
      this.element.classList.add('tile-4');
    }else if (this.tileId === 5){
      this.element.classList.add('tile-5');
    }
  }

  // Method to check if a tower can be placed on this tile
  canPlaceTower() {
    return this.tileId === 2;  // Example: Only allow towers on tile-2
  }

  // Method to place a tower on this tile
  placeTower(tower) {
    if (this.canPlaceTower()) {
      this.placedTower = tower; // The tower is placed on this tile
      this.element.appendChild(tower.element); // Append the tower element to the tile's DOM
      const bullet = new Bullet(tower);

      function animate() {
        bullet.shoot();  // Update bullet position
        for (let enemy of enemies) {
          if (bullet.checkCollision(enemy)) {
            enemy.delete();
            bullet.target = enemies[0];
          }
        } 
        bullet.hone();       
        requestAnimationFrame(animate);  // Request the next frame of animation
      }

      animate();
    } else {
      console.log("Cannot place tower on this tile.");
    }
  }
}

class TowerType{
  constructor(type, png){
    this.type = type;
    this.png = png;
  }

  displayInfo() {
    console.log(`Tower ID: ${this.type}, Image: ${this.png}`);
  }

}

var selectedTower = 1

var tower1 = document.getElementById('tower1')
var tower2 = document.getElementById('tower2')
let towerType = new TowerType(1, 'block.png');

tower1.addEventListener("click", function() {
  // Ensure both towers are reset
  tower1.classList.remove("answerBtnsOff", "answerBtnsOn");
  tower2.classList.remove("answerBtnsOff", "answerBtnsOn");
  
  // Apply the correct classes
  tower1.classList.add("answerBtnsOn");
  tower2.classList.add("answerBtnsOff");
  
  selectedTower = 1;
  towerType = new TowerType(selectedTower, 'block.png');
  console.log(selectedTower);
  towerType.displayInfo();
});

tower2.addEventListener("click", function() {
  // Ensure both towers are reset
  tower1.classList.remove("answerBtnsOff", "answerBtnsOn");
  tower2.classList.remove("answerBtnsOff", "answerBtnsOn");
  
  // Apply the correct classes
  tower2.classList.add("answerBtnsOn");
  tower1.classList.add("answerBtnsOff");
  
  selectedTower = 2;
  towerType = new TowerType(selectedTower, 'block2.png');
  console.log(selectedTower);
  towerType.displayInfo();
});

tower1.addEventListener("mouseover", function() {
  var tower1label = document.getElementById("tower1label");
  tower1label.style.display = "";
});
tower1.addEventListener("mouseout", function() {
  var tower1label = document.getElementById("tower1label");
  tower1label.style.display = "none";
});

tower2.addEventListener("mouseover", function() {
  var tower2label = document.getElementById("tower2label");
  tower2label.style.display = "";
});
tower2.addEventListener("mouseout", function() {
  var tower2label = document.getElementById("tower2label");
  tower2label.style.display = "none";
});

class Tower {
  constructor(png, tile) {
      
      // this.type = type;
      this.tile = tile; // The Tile object
      this.png = png; // The image for the tower
      this.element = this.createTowerElement(); // Create the DOM element for the tower

      this.x = this.tile.element.offsetLeft;
      this.y = this.tile.element.offsetTop;
  }

  createTowerElement() {
      const tower = document.createElement('div');
      tower.classList.add('tower');
      tower.style.backgroundImage = `url(${this.png})`;  // Set the background image
      tower.style.backgroundSize = 'cover';  // Ensure the image covers the div
      tower.style.position = 'absolute';  // Position the tower absolutely relative to the tile
      tower.style.left = '1px';   // Set the X position relative to the tile
      tower.style.top = '1px';    // Set the Y position relative to the tile
      return tower;  // Return the DOM element
  }
}

// Bullet class definition
class Bullet {
    constructor(tower) {
      this.target = enemies[0];
      this.spx = 0;
      this.spy = 0;
      this.homeX = tower.x;        // Initial X position (where the bullet starts)
      this.homeY = tower.y;        // Initial Y position (where the bullet starts)
      this.currentX = tower.x;     // Current X position
      this.currentY = tower.y;     // Current Y position
      this.element = this.createBulletElement();  // Create the DOM element
    }
  
    createBulletElement() {
      const bullet = document.createElement('div');
      bullet.classList.add('bullet');
      bullet.style.backgroundImage = 'url(crumb.png)';
      bullet.style.backgroundSize = 'cover';
      bullet.style.position = 'absolute';
      bullet.style.left = `${this.currentX}px`;
      bullet.style.top = `${this.currentY}px`;
      document.body.appendChild(bullet);
      this.hone();
      return bullet;
    }
    hone() {
      console.log(this.target.currentX);
      console.log(this.homeX);
      
      let x = this.target.currentX - this.homeX;
      let y = this.target.currentY - this.homeY;
      
      const directionVelocity = this.target.velocity;
      
      // Adjust x or y based on the direction
      if (directionVelocity === "y+") {
          y += 10;
      } else if (directionVelocity === "x+") {
          x += 10;
      } else if (directionVelocity === "y-") {
          y -= 10;
      } else if (directionVelocity === "x-") {
          x -= 10;
      }
      
      // Calculate the Euclidean distance (magnitude) between the points
      let sqrt = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)); // or you can use x**2 + y**2 and then Math.sqrt
      
      // Normalize the velocity components
      this.spx = (x / sqrt)*120;
      this.spy = (y / sqrt)*120;
  }
  
  checkCollision(enemy) {
        const bulletLeft = this.currentX;
        const bulletTop = this.currentY;
        const bulletRight = this.currentX + this.element.offsetWidth;
        const bulletBottom = this.currentY + this.element.offsetHeight;

        const enemyLeft = enemy.currentX;
        const enemyTop = enemy.currentY;
        const enemyRight = enemy.currentX + enemy.element.offsetWidth;
        const enemyBottom = enemy.currentY + enemy.element.offsetHeight;

        // Check if the bullet and enemy's bounding boxes intersect
        return !(bulletRight < enemyLeft || bulletLeft > enemyRight || bulletBottom < enemyTop || bulletTop > enemyBottom);
    }

    shoot(){
        this.currentX += this.spx;  // Update the current X position by the speed
        this.currentY += this.spy;
        
        // Update the bullet's DOM element position
        this.element.style.left = `${this.currentX}px`;
        this.element.style.top = `${this.currentY}px`;

        // Reset bullet if it goes off screen (you can adjust the left position reset based on the game area size)
        if (this.currentX > window.innerWidth || this.currentY > window.innerHeight || this.currentX < 0 || this.currentY < 0) {
            this.currentX = this.homeX;
            this.currentY = this.homeY;
            this.hone();
        }
    }
}

var firstylimit = 2550;
var firstxlimit = 2750;
var secondylimit = 350;
var secondxlimit = 4970;
var thirdylimit = 2250;
var thirdxlimit = 3700;
var endlimit = 1800;
// Enemy class with fixed advance method
class Enemy {
  constructor(png, curx, cury) {
    this.png = png;
    this.currentX = curx;  // Initialize position
    this.currentY = cury;
    this.element = this.createEnemyElement();
    this.counter = 1;
    this.speed = 20;
    this.velocity = "y+";
  }

  createEnemyElement() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.backgroundImage = `url(${this.png})`;
    enemy.style.backgroundSize = 'cover';
    enemy.style.position = 'absolute';
    enemy.style.left = `${this.currentX}px`;
    enemy.style.top = `${this.currentY}px`;
    document.body.appendChild(enemy);
    return enemy;
  }
  delete(){
    this.element.remove();
    const index = enemies.indexOf(this);
    if (index > -1) {
      enemies.splice(index, 1); // Remove the enemy from the array
    }
  }

  advance() {
    if (this.counter === 1 && this.currentY < firstylimit) {
      this.currentY += this.speed;
    } else if (this.counter === 2 && this.currentX < firstxlimit) {
      this.velocity = "x+";
      this.currentX += this.speed;
    } else if (this.counter === 3 && this.currentY > secondylimit) {
      this.velocity = "y-";
      this.currentY -= this.speed;
    } else if (this.counter === 4 && this.currentX < secondxlimit) {
      this.velocity = "x+";
      this.currentX += this.speed;
    } else if (this.counter === 5 && this.currentY < thirdylimit) {
      this.velocity = "y+";
      this.currentY += this.speed;
    }else if (this.counter === 6 && this.currentX > thirdxlimit) {
      this.velocity = "x-";
      this.currentX -= this.speed;
    }else if (this.counter === 7 && this.currentY > endlimit) {
      this.velocity = "y-";
      this.currentY -= this.speed;
    }else if (this.counter === 8){
      console.log("lost");
      this.delete()
    }else{
      this.counter ++;
    }
  
    this.element.style.left = `${this.currentX}px`;
    this.element.style.top = `${this.currentY}px`;
  }
  
}

let enemies = [];

// Function to spawn a new enemy and add it to the enemies array
function spawnEnemy() {
  const enemy = new Enemy("crumb.png", 1320, 350);  // Starting position for each enemy
  enemies.push(enemy);
  console.log(enemies);
}

// Function to animate all enemies
function animate2() {
  // Loop over each enemy and advance their position
  enemies.forEach(enemy => enemy.advance());
  requestAnimationFrame(animate2);  // Continue the animation loop
}

// Main game initialization
window.onload = function() {
  // Start by spawning the first enemy
  spawnEnemy();

  // Spawn a new enemy every 2 seconds
  setInterval(spawnEnemy, 2000);  // Adjust time as needed for spawn rate

  // Start the animation loop
  animate2();
};


// Fetch the map data and create tiles
fetch('maptemplate.json')
  .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(mapData => {
    console.log(mapData);
    const layer = mapData.layers[0];
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    const data = layer.data;

    const mapContainer = document.getElementById('map-grid-container');

    let tile_id = 0;
    const tiles = [];  // To store Tile objects

    // Create tiles dynamically based on the data array
    data.forEach((tileId, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        tileDiv.id = `tile-${tile_id}`;

        const tile = new Tile(tileDiv, tileId);  // Create a Tile object

        // Store the Tile object in the tiles array
        tiles.push(tile);

        // Add click event to each tile to place a tower
        tileDiv.addEventListener('click', () => {
            console.log(`Tile ${tileId} clicked!`);
            if (tile.canPlaceTower()) {
                const tower = new Tower(towerType.png, tile); // Create a new Tower
                tile.placeTower(tower); // Place the tower on the clicked tile
            } else {
                console.log('Cannot place tower here!');
            }
        });

        mapContainer.appendChild(tileDiv);
        tile_id += 1;  // Increment the tile ID
    });
  })
  .catch(error => console.error('Error fetching map data:', error));