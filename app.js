var image = document.getElementById("duck1");
var images = ["duck1.png", "duck2.png", "duck3.png", "duck4.png"];
var i = 0;
var positionY = 0;
var positionX = 0;

var upCounter = 0;
var downCounter = 0;
var leftCounter = 0;
var rightCounter = 0;


var d = 100;
var r = 500;
var u = 500;
var l = 500;
var run = 0;

// Add CSS transition for smooth transform animation
image.style.transition = "transform 0.5s ease";
moveDown1(2000);
function moveDown1(d){
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;
var interval1 = setInterval(function() {
    if (downCounter >= d) {
        clearInterval(interval1); // Stop the interval when upCounter reaches 5
        rightCounter = 0;
        upCounter = 0;
        downCounter = 0;
        leftCounter = 0;
        moveRight1(1500);
    }
    // Update the image source
    positionY += 1; // Move up by 10px each time
    image.style.transform = `translateY(${positionY}px)`;
    downCounter+=1;
    // Increment the index and loop back to the start when reaching the end
}, 10); // Set interval time to 1 second
}

function moveRight1(r) {
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;

    console.log("d");
    var interval2 = setInterval(function() {
        if (rightCounter >= r) {
            clearInterval(interval2); // Stop the interval when rightCounter reaches 1000
            upCounter = 0;
            moveUp1(2000);
        } else {
            positionX += 1; // Move right by 1px each time
            image.style.transform = `translate(${positionX}px, ${positionY}px)`;
            rightCounter += 1;
        }
    }, 10); // Set interval time to 10 ms
}
function moveUp1(u) {
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;
    var interval3 = setInterval(function() {
        if (upCounter >= u) {
            clearInterval(interval3); // Stop the interval when rightCounter reaches 1000
            downCounter = 0;
            rightCounter = 0;
            leftCounter = 0;
            upCounter = 0;
            moveRight2(1500);

        } else {
            positionY -= 1; // Move right by 1px each time
            image.style.transform = `translate(${positionX}px, ${positionY}px)`;
            upCounter += 1;
        }
    }, 10); // Set interval time to 10 ms
}
function moveRight2(r) {
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;

    console.log("d");
    var interval4 = setInterval(function() {
        if (rightCounter >= r) {
            clearInterval(interval4); // Stop the interval when rightCounter reaches 1000
            upCounter = 0;
            moveDown2(1500);
        } else {
            positionX += 1; // Move right by 1px each time
            image.style.transform = `translate(${positionX}px, ${positionY}px)`;
            rightCounter += 1;
        }
    }, 10); // Set interval time to 10 ms
}
function moveDown2(d){
    console.log("AAA");
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;
var interval5 = setInterval(function() {
    console.log(downCounter);
    if (downCounter >= d) {
        clearInterval(interval5); // Stop the interval when upCounter reaches 5
        rightCounter = 0;
        upCounter = 0;
        leftCounter = 0;
        moveLeft1(1500);
    }
    else{
    // Update the image source
    positionY += 1; // Move up by 10px each time
    image.style.transform = `translateY(${positionY}px)`;
    downCounter+=1;
    }
    // Increment the index and loop back to the start when reaching the end
}, 10); // Set interval time to 1 second
}
function moveLeft1(l) {
    rightCounter = 0;
    upCounter = 0;
    downCounter = 0;
    leftCounter = 0;

    console.log("d");
    var interval6 = setInterval(function() {
        if (rightCounter >= r) {
            clearInterval(interval6); // Stop the interval when rightCounter reaches 1000
            leftCounter = 0;
        } else {
            positionX -= 1; // Move right by 1px each time
            image.style.transform = `translate(${positionX}px, ${positionY}px)`;
            leftCounter += 1;
        }
    }, 10); // Set interval time to 10 ms
}
setInterval(function() {
    // Update the image source
    image.src = images[i];

    // Increment the index and loop back to the start when reaching the end
    i = (i + 1) % images.length;
}, 1000); // Set interval time to 1 second

