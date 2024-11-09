// Tile class definition

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
                const tower = new Tower('block.png', tile); // Create a new Tower
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
  