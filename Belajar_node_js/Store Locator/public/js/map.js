mapboxgl.accessToken = "pk.eyJ1IjoiYWxjaXF1YWlyZXYiLCJhIjoiY2tzOTV2MmExMGFkaTJ4cDRkMWhwYjRuOSJ9.2iBRm4kot_ebGRI37D1zFA  ";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 9,
  center: [-71.157895, 42.707741],
});

// const jsonData;
// axios.get("http://localhost:3000/store-locator").then((res) => jsonData=res);

// Fetch stores from API
async function getStore(){
  const stores;
  axios.get("http://localhost:3000/store-locator").then((data) => {
    stores=data.data.map(store=>{
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            store.location.coordinates[0],
            store.location.coordinates[1]
          ]
        },
        properties: {
          storeId: store.storeId,
          icon: 'shop'
        }
      };
    })
    loadMap(stores)
  });
}

function loadMap(stores) {
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}

getStore()

