class grid {

}
class tile {

}

class enemy {
    
}

class Tower {
    constructor(x, y, png, tile) {
      this.xx = tile.x;        // Initial X position (where the tower starts)
      this.yy = tile.y;        // Initial Y position (where the tower starts)
      this.png = png;
      this.tile = tile;
      this.element = this.createTowerElement();  // Create the DOM element
    }

    checkPlacement(){
        if (this.tile.class = "tile-2"){
            console.log("yes")
        }else{
            console.log("no")
        }
    }
  
    createTowerElement() {
        const tower = document.createElement('div');
        tower.classList.add('tower');
        tower.style.backgroundImage = `url(${this.png})`;  // Set the background image
        tower.style.backgroundSize = 'cover';  // Ensure the image covers the div
        tower.style.position = 'absolute';  // Position the tower absolutely
        tower.style.left = `${this.xx}px`;   // Set the X position using this.X
        tower.style.top = `${this.yy}px`;    // Set the Y position using this.Y
        document.body.appendChild(tower);  // Append the tower to the body
        return tower;  // Return the DOM element
      }
}

class Bullet {
    constructor(x, y) {
      this.homeX = x;        // Initial X position (where the bullet starts)
      this.homeY = y;        // Initial Y position (where the bullet starts)
      this.currentX = x;     // Current X position
      this.currentY = y;     // Current Y position
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

    shoot(spx, spy){
        const speedx = spx;
        const speedy = spy;
        this.currentX += speedx;  // Update the current X position by the speed
        this.currentY += speedy;
        
        // Update the bullet's DOM element position
        this.element.style.left = `${this.currentX}px`;
        this.element.style.top = `${this.currentY}px`;

        // Reset bullet if it goes off screen (you can adjust the left position reset based on the game area size)
        if (this.currentX > window.innerWidth | this.currentY > window.innerHeight) {
            this.currentX = this.homeX;
            this.currentY = this.homeY;
        }
    }
}

const tower1 = new Tower(100, 200, 'block.png', document.getElementById("tile-1"));
const bullet = new Bullet(tower1.xx, tower1.yy);

function animate() {
    bullet.shoot(5, 7);
    requestAnimationFrame(animate);
  }
  
animate();