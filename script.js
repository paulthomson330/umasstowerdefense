// Set up canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load the tile map JSON data
fetch('mapTest.json')
  .then((response) => response.json())
  .then((mapData) => {
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;

    // Load the tileset image
    const tilesetImage = new Image();
    tilesetImage.src = "scuffed.png";

    // Once the tileset image loads, render the map
    tilesetImage.onload = () => {
      mapData.layers.forEach((layer) => {
        if (layer.type === "tilelayer") {
          layer.data.forEach((tile, index) => {
            if (tile !== 0) { // 0 typically represents an empty tile
              const column = index % layer.width;
              const row = Math.floor(index / layer.width);

              const tilesetColumns = tilesetImage.width / tileWidth;
              const tileX = ((tile - 1) % tilesetColumns) * tileWidth;
              const tileY = Math.floor((tile - 1) / tilesetColumns) * tileHeight;

              ctx.drawImage(
                tilesetImage,
                tileX, tileY, tileWidth, tileHeight,
                column * tileWidth, row * tileHeight, tileWidth, tileHeight
              );
            }
          });
        }
      });
    };
  })
  .catch((error) => {
    console.error("Error loading tilemap:", error);
  });
