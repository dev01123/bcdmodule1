// Function to initialize Google Earth Engine
function initializeEarthEngine() {
    ee.data.authenticateViaOauth('axiomatic-set-434506-m7-cd0d5c4c2ada.json', successCallback, errorCallback);

    function successCallback() {
        ee.initialize(null, null, () => {
            console.log('Google Earth Engine initialized successfully!');
        }, (err) => {
            console.error('Earth Engine initialization failed:', err);
        });
    }

    function errorCallback(error) {
        console.error('Earth Engine authentication failed:', error);
        alert('Error authenticating with Earth Engine. Please check your credentials.');
    }
}

// Function to load the historical imagery content
function loadHistoricalImageryContent() {
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = 'Analyse Historical Imagery of Barrage Site';
    mainContent.appendChild(title);

    const form = document.createElement('form');
    form.id = 'imagery-form';
    form.innerHTML = `
        <label for="site-coordinates">Site Coordinates (Lat, Lng): </label>
        <input type="text" id="site-coordinates" placeholder="e.g., 30.333364, 77.572902" required>
        
        <label for="start-date">Start Date: </label>
        <input type="date" id="start-date" required>
        
        <label for="end-date">End Date: </label>
        <input type="date" id="end-date" required>
        
        <label for="frequency">Frequency (in days): </label>
        <input type="number" id="frequency" min="1" value="30" required>
        
        <button type="button" id="load-imagery-btn">Load Imagery</button>
    `;
    mainContent.appendChild(form);

    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '400px';
    mainContent.appendChild(mapDiv);

    const map = L.map('map').setView([30.333364, 77.572902], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker = L.marker([30.333364, 77.572902]).addTo(map);
    document.getElementById('site-coordinates').addEventListener('change', function () {
        const coords = this.value.split(',').map(Number);
        if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
            map.setView(coords, 12);
            marker.setLatLng(coords);
        }
    });

    document.getElementById('load-imagery-btn').addEventListener('click', loadImagery);
}

// Function to load imagery using Google Earth Engine
function loadImagery() {
    const coordinates = document.getElementById('site-coordinates').value.split(',').map(Number);
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const frequency = parseInt(document.getElementById('frequency').value, 10);

    if (!coordinates || coordinates.length !== 2 || isNaN(coordinates[0]) || isNaN(coordinates[1])) {
        alert('Please enter valid coordinates.');
        return;
    }
    if (!startDate || !endDate) {
        alert('Please select valid start and end dates.');
        return;
    }

    const site = ee.Geometry.Point(coordinates);
    const imageryCollection = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
        .filterBounds(site)
        .filterDate(startDate, endDate)
        .select(['B4', 'B3', 'B2'])
        .sort('system:time_start', true);

    imageryCollection.getInfo((data) => {
        if (data.features.length === 0) {
            alert('No imagery found for the given period.');
            return;
        }
        const firstImage = ee.Image(data.features[0].id);
        const url = firstImage.getThumbURL({
            region: site.bounds().getInfo(),
            format: 'png',
            dimensions: '512x512'
        });

        const imgContainer = document.createElement('div');
        imgContainer.innerHTML = `<img src="${url}" alt="Historical Imagery" style="max-width: 100%;">`;
        document.querySelector('main').appendChild(imgContainer);
    });
}

// Initialize Earth Engine on page load
initializeEarthEngine();
