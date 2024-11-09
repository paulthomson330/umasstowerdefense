var image = document.getElementById("duck1");
var images = ["duck1.png", "duck2.png", "duck3.png", "duck4.png"];
var i = 0;
var positionY = 0;
var upCounter = 0;

// Add CSS transition for smooth transform animation
image.style.transition = "transform 0.5s ease";
//IT RUNS 5 times.
    setInterval(function() {
    if (upCounter >= 5) {
        clearInterval(interval); // Stop the interval when upCounter reaches 5
    }
    // Update the image source
    positionY -= 100; // Move up by 10px each time
    image.style.transform = `translateY(${positionY}px)`;
    upCounter+=1;
    // Increment the index and loop back to the start when reaching the end
}, 1000); // Set interval time to 1 second

setInterval(function() {
    // Update the image source
    image.src = images[i];

    // Increment the index and loop back to the start when reaching the end
    i = (i + 1) % images.length;
}, 1000); // Set interval time to 1 second
