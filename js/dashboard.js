function loadDashboard() {
    // Define the HTML content
    const content = `
        <div class="container">
            <p>Welcome to Barrage and Canal Design Module!</p>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
            <style>
                #map {
                    height: 600px;
                    width: 100%;
                }
            </style>
            
            <div id="map" style="height: 600px; width: 100%;"></div>
        </div>
    `;

    // Set the innerHTML of the main container
    document.getElementById('main').innerHTML = content;

    // Dynamically load and execute the script
    const script = document.createElement('script');
    script.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
    script.onload = () => {
        // Initialize the map after the script is loaded
        var map = L.map('map').setView([21.146633, 79.088860], 5); // Coordinates for the center of India

        // Add a base layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 15,
        }).addTo(map);

        // Load the GeoJSON data
        fetch('/assets/geoBoundaries-IND-ADM1_simplified.geojson')
        .then(response => response.json())
        .then(data => {
        // Create a GeoJSON layer
        const indiaLayer = L.geoJSON(data, {
            // Customize the style as needed
            style: {
            color: 'grey',
            weight: 1,
            fillOpacity: 0
            }
        });
        

    // Add the layer to the map
    indiaLayer.addTo(map);

    // Adjust the map view to fit the bounds of the GeoJSON data
    map.fitBounds(indiaLayer.getBounds());
});

        // Sample data for barrages in India (latitude, longitude, name)
        var barrages = [
            { "name": "Chagallur Barrage", "lat": 16.9750, "lng": 81.7333 },
            { "name": "Gotta Barrage", "lat": 18.0167, "lng": 83.5167 },
            { "name": "Neradi Barrage", "lat": 18.7500, "lng": 83.4167 },
            { "name": "Prakasam Barrage", "lat": 16.5170, "lng": 80.6200 },
            { "name": "Rallapadu Barrage", "lat": 15.0667, "lng": 79.3333 },
            { "name": "Sir Arthur Cotton Barrage", "lat": 16.9333, "lng": 81.7500 },
            { "name": "Swarnamukhi Barrage", "lat": 14.2500, "lng": 79.9333 },
            { "name": "Tarakarama Thirtha Sagaram Barrage", "lat": 16.2000, "lng": 80.7500 },
            { "name": "Thotapalli Barrage", "lat": 18.8333, "lng": 83.6833 },
            { "name": "Dhanishri Barrage", "lat": 27.5000, "lng": 95.5000 },
            { "name": "Baradikarai Barrage", "lat": 27.2167, "lng": 95.1500 },
            { "name": "Barolia Barrage", "lat": 26.8167, "lng": 95.1500 },
            { "name": "Bhumki Barrage", "lat": 27.2500, "lng": 94.6000 },
            { "name": "Champamati Barrage", "lat": 26.6333, "lng": 90.5333 },
            { "name": "Dekadong Barrage", "lat": 27.0667, "lng": 94.7833 },
            { "name": "Dikhari Barrage", "lat": 26.7500, "lng": 94.6833 },
            { "name": "Horguti Barrage", "lat": 27.1833, "lng": 94.6000 },
            { "name": "Kaldiya Barrage", "lat": 26.7000, "lng": 90.6667 },
            { "name": "Longa Barrage", "lat": 26.6333, "lng": 90.5333 },
            { "name": "Sukla Barrage", "lat": 27.1500, "lng": 94.8667 },
            { "name": "Dhadhar Barrage", "lat": 22.8667, "lng": 73.5333 },
            { "name": "Gandak Barrage", "lat": 26.4500, "lng": 84.4167 },
            { "name": "Kosi Barrage", "lat": 26.5167, "lng": 86.9333 },
            { "name": "Paimar Barrage", "lat": 25.0333, "lng": 85.5000 },
            { "name": "Punpun Barrage", "lat": 25.6000, "lng": 85.1667 },
            { "name": "Sone Barrage", "lat": 25.0833, "lng": 84.6833 },
            { "name": "Ghumariya Barrage", "lat": 22.5000, "lng": 82.2000 },
            { "name": "Hasdeo Barrage", "lat": 22.0333, "lng": 82.5000 },
            { "name": "Karra Nalla Barrage", "lat": 21.6667, "lng": 82.0333 },
            { "name": "Kodar Barrage", "lat": 22.1333, "lng": 82.6667 },
            { "name": "Mongra Barrage", "lat": 21.5167, "lng": 82.6667 },
            { "name": "Rajiv Samoda Barrage", "lat": 21.3333, "lng": 82.9667 },
            { "name": "Sukha Nalla Barrage", "lat": 22.0000, "lng": 82.5000 },
            { "name": "Kakrapar Barrage", "lat": 21.1667, "lng": 73.3167 },
            { "name": "Saraswati Barrage", "lat": 21.1333, "lng": 73.3667 },
            { "name": "Varanai Barrage", "lat": 21.1167, "lng": 73.3500 },
            { "name": "Wasna Barrage", "lat": 22.9667, "lng": 72.5333 },
            { "name": "Dadupur Barrage", "lat": 30.2667, "lng": 77.1000 },
            { "name": "Hamida Barrage", "lat": 30.3667, "lng": 77.2500 },
            { "name": "Hathini Kund Barrage", "lat": 30.4333, "lng": 77.4167 },
            { "name": "Masani Barrage", "lat": 28.1667, "lng": 76.8167 },
            { "name": "Baspa Barrage", "lat": 31.5167, "lng": 78.0000 },
            { "name": "Giri Barrage", "lat": 30.7500, "lng": 77.5000 },
            { "name": "Uhl Barrage", "lat": 31.8333, "lng": 76.7500 },
            { "name": "Chutak Barrage", "lat": 34.6667, "lng": 76.8333 },
            { "name": "Kargil Barrage", "lat": 34.6667, "lng": 76.1333 },
            { "name": "Sewa - III Barrage", "lat": 32.8333, "lng": 75.2833 },
            { "name": "Stakna Barrage", "lat": 34.0667, "lng": 77.5667 },
            { "name": "Ujh Level Crossing Barrage", "lat": 32.6500, "lng": 75.1167 },
            { "name": "Uri Barrage", "lat": 34.0833, "lng": 74.0500 },
            { "name": "Ajoy Barrage", "lat": 23.5500, "lng": 87.3833 },
            { "name": "Amanat Barrage", "lat": 23.6333, "lng": 85.7167 },
            { "name": "Batane Pick-up Barrage", "lat": 23.7500, "lng": 85.5000 },
            { "name": "Galudih Barrage", "lat": 22.6167, "lng": 86.3667 },
            { "name": "Gobai Barrage", "lat": 23.5333, "lng": 85.8500 },
            { "name": "Gumani Barrage", "lat": 24.7167, "lng": 87.5333 },
            { "name": "Kharkai Barrage", "lat": 22.8000, "lng": 86.1667 },
            { "name": "Mohamadganj Barrage", "lat": 24.0167, "lng": 84.3500 },
            { "name": "Tajna Barrage", "lat": 23.6667, "lng": 85.8500 },
            { "name": "Ghattarga Barrage", "lat": 17.3000, "lng": 76.5167 },
            { "name": "Hipparagi Barrage", "lat": 16.4333, "lng": 75.8667 },
            { "name": "Iggalur Barrage", "lat": 16.1167, "lng": 77.2833 },
            { "name": "Joladadagi Gudur Barrage", "lat": 16.3667, "lng": 77.0000 },
            { "name": "Kallur Barrage", "lat": 15.3667, "lng": 76.6000 },
            { "name": "Singatalur / Hammigi Barrage", "lat": 15.0000, "lng": 75.7500 },
            { "name": "Sonna Barrage", "lat": 16.0333, "lng": 76.8667 },
            { "name": "Yadgir Barrage", "lat": 16.7833, "lng": 77.1333 },
            { "name": "Bhoothathankettu / Periyar Barrage", "lat": 10.1667, "lng": 76.5833 },
            { "name": "Maniyar Barrage", "lat": 9.2167, "lng": 76.9167 },
            { "name": "Ottakkal Barrage", "lat": 9.3833, "lng": 77.1000 },
            { "name": "Pazhassi (Kulur Barrage)", "lat": 11.9000, "lng": 75.6167 },
            { "name": "Angoori Barrage", "lat": 25.6000, "lng": 78.0500 },
            { "name": "Behar Barrage", "lat": 25.8333, "lng": 78.9333 },
            { "name": "Betwa Barrage", "lat": 24.8500, "lng": 78.4167 },
            { "name": "Bhutan Barrage", "lat": 23.9500, "lng": 78.4000 },
            { "name": "Kolar Barrage", "lat": 24.6000, "lng": 77.7500 },
            { "name": "Retam Barrage", "lat": 24.1167, "lng": 75.9833 },
            { "name": "Singhpur Barrage", "lat": 23.9500, "lng": 78.8500 },
            { "name": "Siyakundal Barrage", "lat": 25.1333, "lng": 78.7333 },
            { "name": "Tons Barrage", "lat": 24.7500, "lng": 81.6333 },
            { "name": "Amdura High Level Barrage", "lat": 19.2000, "lng": 76.9167 },
            { "name": "Apegaon High Level Barrage", "lat": 19.2000, "lng": 76.8333 },
            { "name": "Babhali High Level Barrage", "lat": 19.3167, "lng": 77.3333 },
            { "name": "Chulband Barrage", "lat": 20.1500, "lng": 79.2000 },
            { "name": "Dhalegaon High Level Barrage", "lat": 19.1167, "lng": 76.5167 },
            { "name": "Digras High Level Barrage", "lat": 19.8500, "lng": 77.1667 },
            { "name": "Dindora Barrage", "lat": 19.9500, "lng": 79.1500 },
            { "name": "Ghungshi Barrage", "lat": 18.7333, "lng": 76.7000 },
            { "name": "Hiradpuri High Level Barrage", "lat": 19.5333, "lng": 77.3000 },
            { "name": "Jogladevi High Level Barrage", "lat": 19.7167, "lng": 77.2167 },
            { "name": "Kharda Barrage", "lat": 18.9000, "lng": 76.6667 },
            { "name": "Kochi Barrage", "lat": 19.1167, "lng": 77.1000 },
            { "name": "Krishna Barrage", "lat": 17.2667, "lng": 80.7333 },
            { "name": "Lonisawangi High Level Barrage", "lat": 19.4167, "lng": 76.4500 },
            { "name": "Mamdapur Barrage", "lat": 19.0500, "lng": 77.3167 },
            { "name": "Mangrul High Level Barrage", "lat": 19.0667, "lng": 77.2167 },
            { "name": "Mudgal High Level Barrage", "lat": 19.8500, "lng": 77.7167 },
            { "name": "Muli Low Level Barrage", "lat": 19.9500, "lng": 77.6667 },
            { "name": "Prakasha Barrage", "lat": 21.5333, "lng": 74.5333 },
            { "name": "Pulgaon Barrage", "lat": 20.7000, "lng": 78.6333 },
            { "name": "Purna - II Barrage", "lat": 20.9000, "lng": 77.6000 },
            { "name": "Rajatakli High Level Barrage", "lat": 20.6500, "lng": 77.3333 },
            { "name": "Roshanpur High Level Barrage", "lat": 20.8667, "lng": 77.2333 },
            { "name": "Sarangkheda Barrage", "lat": 20.8833, "lng": 74.7333 },
            { "name": "Satapewadi Barrage", "lat": 19.5667, "lng": 77.2000 },
            { "name": "Shelgaon Barrage", "lat": 20.0667, "lng": 76.8833 },
            { "name": "Shirasmarg Low Level Barrage", "lat": 18.9167, "lng": 77.2667 },
            { "name": "Sulwade Barrage", "lat": 21.1667, "lng": 74.3333 },
            { "name": "Tarugavan High Level Barrage", "lat": 20.6167, "lng": 77.4000 },
            { "name": "Tembhu Barrage", "lat": 17.3500, "lng": 74.2000 },
            { "name": "Vishnupuri Barrage", "lat": 19.0667, "lng": 77.1833 },
            { "name": "Warkhed Londhe Barrage", "lat": 20.8500, "lng": 75.1000 },
            { "name": "Dolaithabi Barrage", "lat": 24.8333, "lng": 93.9667 },
            { "name": "Imphal Barrage", "lat": 24.8000, "lng": 93.9500 },
            { "name": "Loktak Barrage", "lat": 24.5833, "lng": 93.7833 },
            { "name": "Sekmai Barrage", "lat": 24.8667, "lng": 93.9167 },
            { "name": "Thoubal Barrage", "lat": 24.7000, "lng": 94.0000 },
            { "name": "Rongai Valley Barrage", "lat": 25.9500, "lng": 93.7333 },
            { "name": "Dzuza Barrage", "lat": 25.6000, "lng": 93.7333 },
            { "name": "Anandpur Barrage", "lat": 21.2167, "lng": 86.1000 },
            { "name": "Bagh Barrage Phase - I", "lat": 21.0333, "lng": 86.1000 },
            { "name": "Bidhyapur Barrage", "lat": 20.8333, "lng": 85.7500 },
            { "name": "Birupa Barrage", "lat": 20.8667, "lng": 86.2000 },
            { "name": "Gobardhanpur Barrage", "lat": 21.2833, "lng": 85.9667 },
            { "name": "Gokulapur Barrage", "lat": 21.0167, "lng": 85.8500 },
            { "name": "Jokhdia Barrage", "lat": 20.6167, "lng": 86.0167 },
            { "name": "Mahanadi Barrage", "lat": 20.4667, "lng": 85.8833 },
            { "name": "Mangalpur Barrage", "lat": 20.8500, "lng": 86.0000 },
            { "name": "Munduli Barrage", "lat": 20.5000, "lng": 85.8833 },
            { "name": "Naraj Barrage", "lat": 20.5167, "lng": 85.8333 },
            { "name": "Rengali(Samal) Barrage", "lat": 21.3333, "lng": 85.0333 },
            { "name": "Sapua Pick-up Barrage", "lat": 20.7333, "lng": 85.7000 },
            { "name": "Satiguda Barrage", "lat": 20.1167, "lng": 83.2500 },
            { "name": "Surlikonda Barrage", "lat": 19.9167, "lng": 83.1833 },
            { "name": "Tal Baraj Phase - I", "lat": 21.0167, "lng": 86.0000 },
            { "name": "Tarajenga Barrage", "lat": 21.0333, "lng": 86.0500 },
            { "name": "Tikarpada Barrage", "lat": 20.6000, "lng": 85.3667 },
            { "name": "Alkananda Barrage", "lat": 30.3500, "lng": 79.4667 },
            { "name": "Assan Barrage", "lat": 30.4500, "lng": 77.6167 },
            { "name": "Bhimgoda Barrage", "lat": 29.9667, "lng": 78.1667 },
            { "name": "Koteshwar Barrage", "lat": 30.7500, "lng": 79.0333 },
            { "name": "Patalganga Barrage", "lat": 30.2167, "lng": 78.8667 },
            { "name": "Rajwakti Barrage", "lat": 30.3667, "lng": 79.0333 },
            { "name": "Sonali Barrage", "lat": 30.6167, "lng": 78.9667 },
            { "name": "Birla Barrage", "lat": 29.6333, "lng": 77.4167 },
            { "name": "Kachla Barrage", "lat": 27.9000, "lng": 78.8833 },
            { "name": "Katri Barrage", "lat": 27.5000, "lng": 80.5000 },
            { "name": "Lakhya Barrage", "lat": 27.6333, "lng": 80.8000 },
            { "name": "Narora Barrage", "lat": 28.2000, "lng": 78.4167 },
            { "name": "Pathri Barrage", "lat": 29.8333, "lng": 78.0667 },
            { "name": "Shahzadnagar Barrage", "lat": 28.4167, "lng": 79.0167 },
            { "name": "Sharda Barrage", "lat": 28.1500, "lng": 80.0333 },
            { "name": "Aril Barrage", "lat": 29.6667, "lng": 79.0833 },
            { "name": "Banauli Barrage", "lat": 26.8167, "lng": 81.0667 },
            { "name": "Bankul Barrage", "lat": 26.8167, "lng": 81.1167 },
            { "name": "Belkhari Barrage", "lat": 26.9000, "lng": 81.2333 },
            { "name": "Bhaura Barrage", "lat": 26.8167, "lng": 81.1667 },
            { "name": "Daundiya Barrage", "lat": 26.9667, "lng": 81.3833 },
            { "name": "Itai Barrage", "lat": 26.8167, "lng": 81.2000 },
            { "name": "Khunimadwa Barrage", "lat": 26.8833, "lng": 81.1833 },
            { "name": "Mao Barrage", "lat": 26.7667, "lng": 81.2500 },
            { "name": "Rewa Barrage", "lat": 27.0167, "lng": 81.4167 },
            { "name": "Shaunai Barrage", "lat": 26.8667, "lng": 81.2333 },
            { "name": "Bahu Barrage", "lat": 29.6833, "lng": 77.4167 },
            { "name": "Dhanipur Barrage", "lat": 29.3667, "lng": 77.5000 },
            { "name": "Gaundari Barrage", "lat": 29.2500, "lng": 77.3667 },
            { "name": "Mandauli Barrage", "lat": 29.6333, "lng": 77.5167 },
            { "name": "Sisana Barrage", "lat": 29.4667, "lng": 77.3333 },
            { "name": "Mansurpur Barrage", "lat": 29.3333, "lng": 77.6667 },
            { "name": "Parikshitgarh Barrage", "lat": 29.0000, "lng": 77.8333 },
            { "name": "Rajpur Barrage", "lat": 29.2500, "lng": 77.6667 },
            { "name": "Rampur Barrage", "lat": 29.1000, "lng": 77.7500 },
            { "name": "Bhavani Barrage", "lat": 11.4667, "lng": 77.6833 },
            { "name": "Kangeyampalayam Barrage", "lat": 10.9000, "lng": 77.1000 },
            { "name": "Krishnagiri Barrage", "lat": 12.5167, "lng": 78.2000 },
            { "name": "Parambikulam Barrage", "lat": 10.4500, "lng": 76.6833 },
            { "name": "Pilavakkal Barrage", "lat": 9.5000, "lng": 77.9500 },
            { "name": "Ponnai Barrage", "lat": 13.1333, "lng": 79.0000 },
            { "name": "Samiyandavadi Barrage", "lat": 11.9333, "lng": 78.4500 },
            { "name": "Thalayanai Barrage", "lat": 11.0500, "lng": 77.7500 },
            { "name": "Vattamalaikarai Barrage", "lat": 9.8000, "lng": 77.4833 },
            { "name": "Perur Barrage", "lat": 10.9833, "lng": 76.8833 },
            { "name": "Kodumudiyar Barrage", "lat": 8.1667, "lng": 77.4667 },
            { "name": "Nanguneri Barrage", "lat": 8.3500, "lng": 77.6167 },
            { "name": "Araniyar Barrage", "lat": 13.2000, "lng": 79.8000 },
            { "name": "Nellikuppam Barrage", "lat": 11.7500, "lng": 79.6833 },
            { "name": "Marudaiyar Barrage", "lat": 11.0833, "lng": 79.2333 },
            { "name": "Sathanur Barrage", "lat": 12.3333, "lng": 78.7167 },
            { "name": "Kallanai Barrage", "lat": 10.8833, "lng": 78.7833 },
            { "name": "Grand Anicut Barrage", "lat": 10.8833, "lng": 78.7833 },
            { "name": "Lower Anicut Barrage", "lat": 11.1833, "lng": 79.5333 },
            { "name": "Upper Anicut Barrage", "lat": 10.8667, "lng": 78.8000 },
            { "name": "Idamalayar Barrage", "lat": 10.2167, "lng": 76.7333 },
            { "name": "Ingur Barrage", "lat": 11.4333, "lng": 77.6167 },
            { "name": "Lower Bhavani Barrage", "lat": 11.5667, "lng": 77.6833 },
            { "name": "Lower Nirar Barrage", "lat": 10.2833, "lng": 76.8500 },
            { "name": "Anandi Barrage", "lat": 19.9500, "lng": 78.9833 },
            { "name": "Ghordi Barrage", "lat": 33.0167, "lng": 75.0167 },
            { "name": "Khui Barrage", "lat": 32.8833, "lng": 75.2167 },
            { "name": "Mubarak Mandi Barrage", "lat": 32.7167, "lng": 75.1000 },
            { "name": "Baglihar Barrage", "lat": 33.3167, "lng": 75.7167 },
            { "name": "Hiranagar Barrage", "lat": 32.4667, "lng": 75.2667 },
            { "name": "Bakhli Barrage", "lat": 30.3667, "lng": 77.0167 },
            { "name": "Lakshar Barrage", "lat": 29.7333, "lng": 78.0167 },
            { "name": "Mangalore Barrage", "lat": 29.8667, "lng": 77.8167 },
            { "name": "Muradabad Barrage", "lat": 28.8333, "lng": 78.7500 },
            { "name": "Asan Barrage", "lat": 30.4500, "lng": 77.6167 },
            { "name": "Bajpur Barrage", "lat": 29.1500, "lng": 78.8833 },
            { "name": "Bhandura Barrage", "lat": 30.4167, "lng": 77.8833 },
            { "name": "Laldhang Barrage", "lat": 29.7000, "lng": 78.2333 },
            { "name": "Mohand Barrage", "lat": 30.4167, "lng": 77.8333 },
            { "name": "Mohini Barrage", "lat": 30.5000, "lng": 77.8167 },
            { "name": "Sadhan Barrage", "lat": 29.7000, "lng": 78.2333 },
            { "name": "Shakumbhari Barrage", "lat": 30.1833, "lng": 77.7167 },
            { "name": "Chirala Barrage", "lat": 16.2000, "lng": 80.2667 },
            { "name": "Dharmavaram Barrage", "lat": 16.7667, "lng": 81.5167 },
            { "name": "Donkarai Barrage", "lat": 17.4667, "lng": 81.7833 },
            { "name": "Jangamaheswara Puram Barrage", "lat": 16.1500, "lng": 80.3667 },
            { "name": "Kattaleru Barrage", "lat": 16.7167, "lng": 81.1667 },
            { "name": "Kovvada Barrage", "lat": 17.0500, "lng": 82.4000 },
            { "name": "Machilipatnam Barrage", "lat": 16.2000, "lng": 81.1333 },
            { "name": "Polavaram Barrage", "lat": 17.2667, "lng": 81.7333 },
            { "name": "Pulichintala Barrage", "lat": 16.8333, "lng": 80.3167 },
            { "name": "Surampalem Barrage", "lat": 16.8500, "lng": 81.8500 },
            { "name": "Tatipudi Barrage", "lat": 17.3333, "lng": 82.3833 },
            { "name": "Vagalpudi Barrage", "lat": 16.5167, "lng": 80.5667 },
            { "name": "Nellore Barrage", "lat": 14.4500, "lng": 79.9500 },
            { "name": "Anupgaon Barrage", "lat": 16.6167, "lng": 81.0500 },
            { "name": "Bal Bhakli Barrage", "lat": 30.3667, "lng": 77.0167 },
            { "name": "Dehradun Barrage", "lat": 30.3167, "lng": 78.0333 },
            { "name": "Majra Barrage", "lat": 30.3167, "lng": 78.0333 },
            { "name": "Shri Rampur Barrage", "lat": 27.7000, "lng": 78.6500 }
        ]
        // Loop through the barrages and add them to the map
        const smallIcon = L.icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',  // Default marker icon URL
            iconSize: [16, 25],  // Adjust the size of the marker
            iconAnchor: [8, 25],  // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -25]  // Point from which the popup should open relative to the iconAnchor
        });
        
        barrages.forEach(function(barrage) {
            L.marker([barrage.lat, barrage.lng], { icon: smallIcon })  // Use the custom small icon
                .addTo(map)
                .bindPopup("<b>" + barrage.name + "</b>");
        });
                
    };

    document.head.appendChild(script);
}
