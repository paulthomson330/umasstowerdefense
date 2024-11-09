// Set up canvas and context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load the tile map JSON data
// fetch('maptemplate.json')
//   .then((response) => response.json())
//   .then((mapData) => {
//     const tileWidth = mapData.tilewidth;
//     const tileHeight = mapData.tileheight;

//     // Load the tileset image
//     const tilesetImage = new Image();
//     tilesetImage.src = "tilegreenbrown.png";

//     // Once the tileset image loads, render the map
//     tilesetImage.onload = () => {
//       mapData.layers.forEach((layer) => {
//         if (layer.type === "tilelayer") {
//           layer.data.forEach((tile, index) => {
//             if (tile !== 0) { // 0 typically represents an empty tile
//               const column = index % layer.width;
//               const row = Math.floor(index / layer.width);

//               const tilesetColumns = tilesetImage.width / tileWidth;
//               const tileX = ((tile - 1) % tilesetColumns) * tileWidth;
//               const tileY = Math.floor((tile - 1) / tilesetColumns) * tileHeight;

//               ctx.drawImage(
//                 tilesetImage,
//                 tileX, tileY, tileWidth, tileHeight,
//                 column * tileWidth, row * tileHeight, tileWidth, tileHeight
//               );
//             }
//           });
//         }
//       });
//     };
//   })
//   .catch((error) => {
//     console.error("Error loading tilemap:", error);
//   });

//   const TILE_WIDTH = 52;
//   const TILE_HEIGHT = 52;

fetch('maptemplate.json')
  .then(response => {
    // Check if the response is successful (status 200)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // Parse the JSON data from the response
    return response.json();
  })
  .then(mapData => {
    console.log(mapData);
    const layer = mapData.layers[0];
    const tileWidth = mapData.tilewidth;
    const tileHeight = mapData.tileheight;
    const width = layer.width;
    const height = layer.height;
    const data = layer.data;

    const mapContainer = document.getElementById('map-grid-container');

    // Create tiles dynamically based on the data array
    data.forEach((tileId, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');

        var tile_id = 0;
        
        // Example: Assign specific classes based on tileId
        if (tileId === 1) {
            tileDiv.classList.add('tile-1');
        } else if (tileId === 2) {
            tileDiv.classList.add('tile-2');
            tileDiv.id = 'tile-${tile_id}';
            
            tile_id += 1;
        }

        // Append each tile to the container
        mapContainer.appendChild(tileDiv);
    });
  })