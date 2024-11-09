// Set up canvas and context

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

    let tile_id = 0;

    // Create tiles dynamically based on the data array
    data.forEach((tileId, index) => {
        const tileDiv = document.createElement('div');
        tileDiv.classList.add('tile');
        
        // Example: Assign specific classes based on tileId
        if (tileId === 1) {
            tileDiv.classList.add('tile-1');
        } else if (tileId === 2) {
            tileDiv.classList.add('tile-2');
            tileDiv.id = `tile-${tile_id}`;
            tileDiv.addEventListener('click', (function (tileId) {
              return function () {
                console.log(`Tile ${tileId} clicked!`);
              }
            })(tile_id));

            tile_id += 1;
        }

        // Append each tile to the container
        mapContainer.appendChild(tileDiv);
    });
  })