function loadSectionCalculator() {
    const content = `
        <div class="container">
            <h1 class="title">Canal Section Designer</h1>
            <div class="content">
                <form id="canal-section-form">
                    <div class="form-group">
                        <label for="Q">Q (Discharge):</label>
                        <input type="number" id="Q" name="Q" step="0.01" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="Sf">1/Sf (Slope):</label>
                        <input type="number" id="Sf" name="Sf" step="0.01" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="m">m (Side Slope):</label>
                        <input type="number" id="m" name="m" step="0.1" value="1.5" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="liningType">Lining Type:</label>
                        <select id="liningType" name="liningType" class="form-control" required>
                            <option value="lined">Lined</option>
                            <option value="unlined">Unlined</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="shape">Shape:</label>
                        <select id="shape" name="shape" class="form-control" required>
                            <option value="rectangular">Rectangular</option>
                            <option value="cup">Cup Shaped</option>
                            <option value="trapezoidal">Trapezoidal with Rounded Edges</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="n">Manning's N:</label>
                        <input type="number" id="n" name="n" step="0.01" value="0.03" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="freeboard">Freeboard:</label>
                        <input type="number" id="freeboard" name="freeboard" step="0.01" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="bOverY">B/y Ratio (For Unlined Only):</label>
                        <input type="number" id="bOverY" name="bOverY" step="0.01" value="2" class="form-control">
                    </div>
                    <button type="button" class="btn btn-primary mt-3" onclick="calculateSection()">Execute Design</button>
                </form>
                <div id="output" class="mt-3"></div>
                <div id="section-plot" style="width: 100%; height: 400px;"></div>
            </div>
        </div>
    `;

    document.getElementById('main').innerHTML = content;

    // Show/hide shape options based on lining type
    document.getElementById('liningType').addEventListener('change', adjustShapeOptions);
    adjustShapeOptions(); // Initial adjustment
}

// Adjust shape options based on the selected lining type
function adjustShapeOptions() {
    const liningType = document.getElementById('liningType').value;
    const shapeSelect = document.getElementById('shape');

    // Clear existing options
    shapeSelect.innerHTML = '';

    if (liningType === 'lined') {
        shapeSelect.innerHTML += `
            <option value="rectangular">Rectangular</option>
            <option value="cup">Cup Shaped</option>
            <option value="trapezoidal">Trapezoidal with Rounded Edges</option>
        `;
    } else if (liningType === 'unlined') {
        shapeSelect.innerHTML += `
            <option value="rectangular_trapezoidal">Rectangular/Trapezoidal</option>
        `;
    }
}

// Execute the design calculations
function calculateSection() {
    const Q = parseFloat(document.getElementById('Q').value);
    const Sf = 1 / parseFloat(document.getElementById('Sf').value);
    const m = parseFloat(document.getElementById('m').value);
    const liningType = document.getElementById('liningType').value;
    const n = parseFloat(document.getElementById('n').value);
    const bOverY = parseFloat(document.getElementById('bOverY').value);

    let y = 0.01;
    let B = bOverY * y; // Initial width calculation for unlined section
    let A, P, R, v, vc;
    let conditionMet = false;

    // Iteratively calculate y until condition is satisfied
    while (!conditionMet) {
        A = y * (B + m * y); // Area
        P = 2 * y * Math.sqrt(1 + m ** 2) + B; // Wetted Perimeter
        R = A / P; // Hydraulic Radius
        v = (1 / n) * R ** (2 / 3) * Sf ** 0.5; // Velocity
        vc = 0.55 * y ** 0.64; // Critical Velocity

        // Check if discharge condition is satisfied
        if (A * v >= Q) {
            conditionMet = true;
            break;
        }
        y += 0.01; // Increment y
        B = bOverY * y; // Update B as y changes
    }

    // Display the results
    const output = `
        <h2>Results</h2>
        <p>Calculated Depth (y): ${y.toFixed(2)} m</p>
        <p>Velocity (v): ${v.toFixed(2)} m/s</p>
        <p>Critical Velocity (vc): ${vc.toFixed(2)} m/s</p>
    `;
    document.getElementById('output').innerHTML = output;

    // Plot the trapezoidal section using Highcharts
    plotSectionHighcharts(B, y, m);
}

// Plot the trapezoidal section using Highcharts
function plotSectionHighcharts(B, y, m) {
    // Generate the coordinates of the canal section
    const points = [
        [-B / 2, 0],                   // Left bottom point
        [-B / 2 - m * y, -y],          // Left top point
        [B / 2 + m * y, -y],           // Right top point
        [B / 2, 0]                     // Right bottom point
    ];

    // Plot using Highcharts
    Highcharts.chart('section-plot', {
        chart: {
            type: 'area',
        },
        title: {
            text: 'Canal Cross-Section'
        },
        xAxis: {
            title: {
                text: 'Width (m)'
            },
            crosshair: true,
            gridLineWidth: 1,
            min: -B / 2 - m * y - 1,
            max: B / 2 + m * y + 1
        },
        yAxis: {
            title: {
                text: 'Depth (m)'
            },
            crosshair: true,
            gridLineWidth: 1,
            reversed: true // Depth increases downwards
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Width: {point.x:.2f} m, Depth: {point.y:.2f} m'
        },
        series: [{
            name: 'Canal Section',
            data: points,
            color: 'rgba(0, 123, 255, 0.5)',
            fillOpacity: 0.3
        }],
        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        }
    });
}
