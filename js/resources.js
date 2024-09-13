function loadResources() {
    const content = `
        <div class="container">
            <h1 class="title">Resources</h1>
            <div class="content">
                <h2 class="section-title">Manuals</h2>
                <ul class="pdf-list">
                    <li><a href="/assets/MANUAL-1.pdf" target="_blank" class="pdf-link">Manual on Barrages and Weirs on Permeable Foundation Vol-I</a></li>
                    <li><a href="/assets/MANUAL-2.pdf" target="_blank" class="pdf-link">Manual on Barrages and Weirs on Permeable Foundation Vol-II</a></li>
                    <!-- Add more links as needed -->
                </ul>
                <h2 class="section-title">BIS Codes</h2>
                <ul class="pdf-list">
                    <li><a href="https://law.resource.org/pub/in/bis/S14/is.6966.1.1989.pdf" target="_blank" class="pdf-link">IS 6966-1 (1989): Hydraulic Design of Barrages and Weirs</li>
                    <li><a href="https://law.resource.org/pub/in/bis/S14/is.11130.1984.pdf" target="_blank" class="pdf-link">IS 11130 (1984): Criteria for Structural Design of Barrages and Weirs</a></li>
                    <!-- Add more links as needed -->
                </ul>
            </div>
        </div>
    `;

    document.getElementById('main').innerHTML = content;
}