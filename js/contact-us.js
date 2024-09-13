function loadContent(contentType) {
    let content = '';

    switch (contentType) {
        case 'about-us':
            content = `
                <div class="container">
                    <h1 class="title">About Us</h1>
                    <div class="content">
                        <p>
                        <h3>CENTRAL WATER COMMISSION</h3>

                        Central Water Commission is a premier Technical Organization of India in the field of Water Resources and is presently functioning as an attached office of the Department of Water Resources, River Development and Ganga Rejuvenation, Ministry of Jal Shakti, Government of India.   

                        Central Water Commission CWC is headed by a Chairman, with the status of Ex-Officio Secretary to the Government of India. The work of the Commission is divided among 3 wings namely, Designs and Research (D&R) Wing, River Management (RM) Wing and Water Planning and Projects (WP&P) Wing.   

                        A separate Human Resources Management Unit deals with Human Resources Management, Administration, Financial Management, Training and Development matters of the CWC. National Water Academy located at Pune is responsible for training of Central and State in-service engineers and it functions directly under the guidance of Chairman.   
                        </p>
                        <p>Founded: 1945</p>

                        <p>Headquarters: Sewa Bhawan, R.K. Puram, New Delhi</p>
                    </div>
                </div>
            `;
            break;
        case 'contact-us':
            content = `
                <div class="container">
                    <h1 class="title">Contact Us/Feedback</h1>
                    <div class="content">
                        <h3>ADDRESS</h3>
                        <p>BARRAGE AND CANAL DESIGN DIRECTORATE</p>
                        <p>8TH FLOOR (S), SEWA BHAWAN</p>
                        <p>CENTRAL WATER COMMISSION</p>
                        <p>NEW DELHI-110066</p>

                        <h3>E-MAIL</h3>
                        <p>bcdnw-cwc@nic.in</p>
                        <p>bcdnws-cwc@nic.in</p>
                        <p>bcdene-cwc@nic.in</p>
  
                    </div>
                </div>
            `;
            break;
        case 'web-team':
            content = `
                <div class="container">
                    <h1 class="title">Contact Us/Feedback</h1>
                    <div class="content">
                        <h3>VISION AND GUIDANCE</h3>
                        <p>MR KUSHVINDER VOHRA</p>
                        <p>CHAIRMAN</p>
                        <p>CENTRAL WATER COMMISSION</p>
                        <p>& EX-OFFICIO SECRETARY TO GOI</p>

                        <h3>WEB-APP DEVELOPED BY</h3>
                        <p>VARID GUPTA, DY. DIRECTOR</p>
                        <p>VIVEK KUMAR SONI, DY. DIRECTOR</p>
                        <p>DEVENDRA PATEL, DY. DIRECTOR</p>
                        <p>ANSHUL GOYAL, DY. DIRECTOR</p>
                        <p>PRASHANT PATEL, ASST. DIRECTOR</p>
                        <!-- More content about "Contact Us/Feedback" -->
                    </div>
                </div>
                </div>
            `;
            break;
        default:
            content = '<div class="container"><h1 class="title">Welcome</h1><p class="subtitle">Please select a menu item.</p></div>';
            break;
    }

    document.getElementById('main').innerHTML = content;
}
