document.getElementById('logo').addEventListener('click', function() {
    // Define the default content to be inserted into the main section
    const defaultContent = `
    <div class="container" style="position: relative; width: 100vw; height: 100vh; overflow: hidden; text-align: center; color: white;">
        <!-- Image of Prakasam Barrage -->
        <img src="/assets/prakasam_barrage.jpg" 
             alt="Prakasam Barrage, Vijayawada" 
             style="width: 100%; height: 100%; object-fit: cover;">

        <!-- Overlay text -->
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
            <p style="font-size: 4vw; font-weight: bold; background-color: rgba(0, 0, 0, 0.5); padding: 1vw;">
                Welcome to Barrage and Canal Design Module!
            </p>
        </div>
    </div>`;

    // Insert the default content into the main section
    document.getElementById('main').innerHTML = defaultContent;
});
