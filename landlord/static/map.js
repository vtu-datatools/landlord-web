var map = L.map('map').setView([49.25, -123.13], 13);

var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: '<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

async function fetch_markers() {
    // Fetch geoJSON containing markers in view 
    const markers_url = `/api/landlord/?in_bbox=${map.getBounds().toBBoxString()}`
    const response = await fetch(markers_url)
    const geojson = await response.json()
    return geojson
}

async function render_markers() {
    // Render markers in marker clusters
    const markersJson = await fetch_markers();
    var markers = L.markerClusterGroup();
    var markersLayer = L.geoJson(markersJson, {
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.businessoperator);
        }
    });
    markers.addLayer(markersLayer);
    map.addLayer(markers);
};

map.on("moveend", render_markers);