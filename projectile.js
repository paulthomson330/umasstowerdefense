// Some stats
lives = 20





// Shop and tower selection
var moneydisplay = document.getElementById('overlay-text');
var moneycount = 0;

moneydisplay.innerHTML = `Money: $${moneycount}`;

var selectedTower = 1

var tower1 = document.getElementById('tower1')
var tower2 = document.getElementById('tower2')

tower1.addEventListener("click", function() {
  // Ensure both towers are reset
  tower1.classList.remove("answerBtnsOff", "answerBtnsOn");
  tower2.classList.remove("answerBtnsOff", "answerBtnsOn");
  
  // Apply the correct classes
  tower1.classList.add("answerBtnsOn");
  tower2.classList.add("answerBtnsOff");
  
  selectedTower = 1;
  console.log(selectedTower);
});

tower2.addEventListener("click", function() {
  // Ensure both towers are reset
  tower1.classList.remove("answerBtnsOff", "answerBtnsOn");
  tower2.classList.remove("answerBtnsOff", "answerBtnsOn");
  
  // Apply the correct classes
  tower2.classList.add("answerBtnsOn");
  tower1.classList.add("answerBtnsOff");
  
  selectedTower = 2;
  console.log(selectedTower);
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
    } else if (this.tileId === 2) {
      this.element.classList.add('tile-2');
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
      const bullet = new Bullet(tower,(Math.random()*20)+1,(Math.random()*20)+1);

      function animate() {
        bullet.shoot();  // Update bullet position
        requestAnimationFrame(animate);  // Request the next frame of animation
      }

      animate();
    } else {
      console.log("Cannot place tower on this tile.");
    }
  }
}


class Tower {
  constructor(png, tile) {
      
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
    constructor(tower, spx, spy) {
      this.spx = spx;
      this.spy = spy;
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
      return bullet;
    }

    shoot(){
        const speedx = this.spx;
        const speedy = this.spy;
        this.currentX += speedx;  // Update the current X position by the speed
        this.currentY += speedy;
        
        // Update the bullet's DOM element position
        this.element.style.left = `${this.currentX}px`;
        this.element.style.top = `${this.currentY}px`;

        // Reset bullet if it goes off screen (you can adjust the left position reset based on the game area size)
        if (this.currentX > window.innerWidth || this.currentY > window.innerHeight || this.currentX < 0 || this.currentY < 0) {
            this.currentX = this.homeX;
            this.currentY = this.homeY;
        }
    }
}

