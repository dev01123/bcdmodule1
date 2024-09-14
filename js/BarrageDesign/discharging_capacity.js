function loadDischargingCapacity() {
    // Clear the main content area
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';

    // Create form container
    const form = document.createElement('div');
    form.classList.add('form-container');

    // HTML content with CSS classes matching your stylesheet
    form.innerHTML = `
        <h2 class="section-title">Discharge Computation</h2>

        <div class="form-group">
            <label for="upstreamLevel">Upstream Water Level:</label>
            <input type="number" id="upstreamLevel" step="any" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="downstreamLevel">Downstream Water Level:</label>
            <input type="number" id="downstreamLevel" step="any" class="form-control" required>
        </div>

        <div class="form-group">
            <label for="upstreamFloorLevel">Upstream Floor/Bed Level:</label>
            <input type="number" id="upstreamFloorLevel" step="any" class="form-control" required>
        </div>

        <h3 class="section-subtitle">Barrage Bays</h3>
        <table id="barrageBaysTable" class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Bay Type</th>
                    <th>Number of Bays</th>
                    <th>Clear Width of Each Bay</th>
                    <th>Crest Level</th>
                    <th>Gate Opening</th>
                    <th>Total Width</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" class="form-control" placeholder="Bay Type" required></td>
                    <td><input type="number" class="form-control" placeholder="Number of Bays" min="1" required oninput="updateRowTotalWidth(this)"></td>
                    <td><input type="number" class="form-control" placeholder="Clear Width of Each Bay" step="any" required oninput="updateRowTotalWidth(this)"></td>
                    <td><input type="number" class="form-control" placeholder="Crest Level" step="any" required></td>
                    <td><input type="number" class="form-control" placeholder="Gate Opening" step="any" required></td>
                    <td><input type="number" class="form-control" placeholder="Total Width" step="any" readonly></td>
                    <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">Total Width:</td>
                    <td id="barrageBaysTotalWidth">0.00</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <button type="button" class="btn btn-primary mt-2" onclick="addBarrageBayRow()">Add Barrage Bay</button>

        <h3 class="section-subtitle mt-4">Piers/Other Bays</h3>
        <table id="piersTable" class="table table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>Pier Type</th>
                    <th>Number</th>
                    <th>Width</th>
                    <th>Total Width</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><input type="text" class="form-control" placeholder="Pier Type" required></td>
                    <td><input type="number" class="form-control" placeholder="Number" min="1" required oninput="updatePierRowTotalWidth(this)"></td>
                    <td><input type="number" class="form-control" placeholder="Width" step="any" required oninput="updatePierRowTotalWidth(this)"></td>
                    <td><input type="number" class="form-control" placeholder="Total Width" step="any" readonly></td>
                    <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total Width:</td>
                    <td id="piersTotalWidth">0.00</td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
        <button type="button" class="btn btn-primary mt-2" onclick="addPierRow()">Add Pier/Other Bay</button>

        <div class="mt-3">
            <button type="button" class="btn btn-success" onclick="calculateDischarge()">Calculate Discharge</button>
        </div>

        <div id="dischargeResults" class="mt-4" style="display: none;">
            <h3 class="section-subtitle">Discharge Results</h3>
            <table id="dischargeResultsTable" class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Bay Type</th>
                        <th>Discharge (m³/s)</th>
                        <th>Type of Flow</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Discharge results will be appended here -->
                </tbody>
            </table>

            <h4 class="section-subtitle">Total Discharge and Final Velocity</h4>
            <table class="table table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th>Total Discharge (m³/s)</th>
                        <th>Final Velocity (va) (m/s)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td id="totalDischargeResult">0.00</td>
                        <td id="finalVaResult">0.00</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `;

    // Append form to main content
    mainContent.appendChild(form);
}

function addBarrageBayRow() {
    const table = document.getElementById('barrageBaysTable').querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="text" class="form-control" placeholder="Bay Type" required></td>
        <td><input type="number" class="form-control" placeholder="Number of Bays" min="1" required oninput="updateRowTotalWidth(this)"></td>
        <td><input type="number" class="form-control" placeholder="Clear Width of Each Bay" step="any" required oninput="updateRowTotalWidth(this)"></td>
        <td><input type="number" class="form-control" placeholder="Crest Level" step="any" required></td>
        <td><input type="number" class="form-control" placeholder="Gate Opening" step="any" required></td>
        <td><input type="number" class="form-control" placeholder="Total Width" step="any" readonly></td>
        <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
    `;

    table.appendChild(row);
    updateTotalWidth(); // Update the total width at the end of the table
}

function addPierRow() {
    const table = document.getElementById('piersTable').querySelector('tbody');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="text" class="form-control" placeholder="Pier Type" required></td>
        <td><input type="number" class="form-control" placeholder="Number" min="1" required oninput="updatePierRowTotalWidth(this)"></td>
        <td><input type="number" class="form-control" placeholder="Width" step="any" required oninput="updatePierRowTotalWidth(this)"></td>
        <td><input type="number" class="form-control" placeholder="Total Width" step="any" readonly></td>
        <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
    `;

    table.appendChild(row);
    updatePierTotalWidth(); // Update the total width at the end of the table
}

function updateRowTotalWidth(input) {
    const row = input.parentElement.parentElement;
    const number = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const width = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const totalWidth = number * width;
    row.cells[5].querySelector('input').value = totalWidth.toFixed(2);
    updateTotalWidth(); // Update the total width at the end of the table
}

function updatePierRowTotalWidth(input) {
    const row = input.parentElement.parentElement;
    const number = parseFloat(row.cells[1].querySelector('input').value) || 0;
    const width = parseFloat(row.cells[2].querySelector('input').value) || 0;
    const totalWidth = number * width;
    row.cells[3].querySelector('input').value = totalWidth.toFixed(2);
    updatePierTotalWidth(); // Update the total width at the end of the table
}

function updateTotalWidth() {
    const table = document.getElementById('barrageBaysTable').querySelector('tbody');
    const rows = table.querySelectorAll('tr');
    let totalWidthSum = 0;

    rows.forEach(row => {
        const totalWidth = parseFloat(row.cells[5].querySelector('input').value) || 0;
        totalWidthSum += totalWidth;
    });

    // Update the total width in the footer row
    document.getElementById('barrageBaysTotalWidth').textContent = totalWidthSum.toFixed(2);
}

function updatePierTotalWidth() {
    const table = document.getElementById('piersTable').querySelector('tbody');
    const rows = table.querySelectorAll('tr');
    let totalWidthSum = 0;

    rows.forEach(row => {
        const totalWidth = parseFloat(row.cells[3].querySelector('input').value) || 0;
        totalWidthSum += totalWidth;
    });

    // Update the total width in the footer row
    document.getElementById('piersTotalWidth').textContent = totalWidthSum.toFixed(2);
}

function removeRow(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    updateTotalWidth(); // Update total widths after removing a row
    updatePierTotalWidth(); // Update total widths after removing a row
}

function calculateDischarge() {
    // Get input values
    const upstreamLevel = parseFloat(document.getElementById('upstreamLevel').value);
    const downstreamLevel = parseFloat(document.getElementById('downstreamLevel').value);
    const upstreamFloorLevel = parseFloat(document.getElementById('upstreamFloorLevel').value);

    // Prepare the results container and table
    const resultsContainer = document.getElementById('dischargeResults');
    const resultsTableBody = document.getElementById('dischargeResultsTable').querySelector('tbody');
    resultsTableBody.innerHTML = ''; // Clear previous results

    // Get total widths for calculations
    const totalBayWidth = parseFloat(document.getElementById('barrageBaysTotalWidth').textContent) || 0;
    const totalPierWidth = parseFloat(document.getElementById('piersTotalWidth').textContent) || 0;

    const area = (totalBayWidth + totalPierWidth) * (upstreamLevel - upstreamFloorLevel); // Area for velocity calculation

    let va = 0.01; // Initial assumed velocity
    let tolerance = 0.01; // Tolerance for stopping the iteration
    let difference = 0;
    let iterationCount = 0;

    let finalDischarge = 0; // To hold the final total discharge value

    do {
        iterationCount++;
        let totalDischarge = 0; // Initialize total discharge for all bays

        // Iterate through Barrage Bays table rows to calculate discharge based on current va
        const baysTableRows = document.getElementById('barrageBaysTable').querySelectorAll('tbody tr');
        resultsTableBody.innerHTML = ''; // Clear previous results for each iteration

        baysTableRows.forEach(row => {
            const bayType = row.cells[0].querySelector('input').value;
            const numberOfBays = parseFloat(row.cells[1].querySelector('input').value) || 0;
            const clearWidth = parseFloat(row.cells[2].querySelector('input').value) || 0;
            const crestLevel = parseFloat(row.cells[3].querySelector('input').value) || 0;
            const gateOpening = parseFloat(row.cells[4].querySelector('input').value) || 0;

            // Calculate values needed for different cases
            const L = numberOfBays * clearWidth;
            const gateInvertLevel = crestLevel + gateOpening;
            const H1 = upstreamLevel - crestLevel;
            const H2 = upstreamLevel - gateInvertLevel; 

            let discharge = 0;
            let typeOfFlow = '';

            // Determine which case to apply based on upstream and downstream levels
            if (upstreamLevel > gateInvertLevel && downstreamLevel <= crestLevel) { 
                // Case 1: Controlled Free Flow
                discharge = (2 / 3) * 0.6 * L * Math.sqrt(2 * 9.81) * (Math.pow(H1, 1.5) - Math.pow(H2, 1.5));
                typeOfFlow = 'Controlled Free Flow';
            } else if (upstreamLevel > gateInvertLevel && downstreamLevel >= gateInvertLevel) {
                // Case 2: Controlled Fully Submerged Flow
                discharge = 0.6 * L * gateOpening * Math.sqrt(2 * 9.81 * (upstreamLevel - downstreamLevel));
                typeOfFlow = 'Controlled Fully Submerged Flow';
            } else if (upstreamLevel > gateInvertLevel && downstreamLevel < gateInvertLevel && downstreamLevel > crestLevel) {
                // Case 3: Submerged flow with free and submerged components
                const Cd_ff = 0.6;
                const Cd_sf = 0.6;
                const q1 = (2 / 3) * Cd_ff * L * Math.sqrt(2 * 9.81) * (Math.pow(H1, 1.5) - Math.pow(H2, 1.5));
                const q2 = Cd_sf * L * (downstreamLevel - crestLevel) * Math.sqrt(2 * 9.81 * (upstreamLevel - downstreamLevel));
                discharge = q1 + q2;
                typeOfFlow = 'Controlled Partially Submerged Flow';
            } else if (upstreamLevel <= gateInvertLevel && downstreamLevel <= crestLevel) {
                // Case 4: Critical flow calculation by iteration (assumed va is used here)
                let ha = va * va / (2 * 9.81);
                const C = (2 / 3) * Math.sqrt(2 * 9.81)*0.6;
                discharge = C * L * (Math.pow(H1 + ha, 1.5) - Math.pow(ha, 1.5));
                typeOfFlow = 'Uncontrolled Free Flow';
            } else {
                // Uncontrolled Submerged Flow
                const DR = (downstreamLevel - crestLevel) / H1;
                const C = -258.27 * Math.pow(DR, 6) + 959.58 * Math.pow(DR, 5) - 1459.3 * Math.pow(DR, 4) + 1158.9 * Math.pow(DR, 3) - 506.24 * Math.pow(DR, 2) + 115.27 * DR - 8.9388;

                let ha = va * va / (2 * 9.81);
                discharge = C * L * (Math.pow(H1 + ha, 1.5) - Math.pow(ha, 1.5));
                typeOfFlow = 'Uncontrolled Submerged Flow';
            }

            // Append result to the table
            const resultRow = document.createElement('tr');
            resultRow.innerHTML = `
                <td>${bayType}</td>
                <td>${discharge.toFixed(2)}</td>
                <td>${typeOfFlow}</td>
            `;
            resultsTableBody.appendChild(resultRow);

            totalDischarge += discharge; // Add the discharge for this bay to the total discharge
        });

        // Recalculate va based on total discharge and area
        const new_va = totalDischarge / area;
        difference = Math.abs(new_va - va); // Calculate the difference between the new va and assumed va

        console.log(`Iteration ${iterationCount}: va = ${va.toFixed(4)}, new_va = ${new_va.toFixed(4)}, total discharge = ${totalDischarge.toFixed(2)} m³/s`);

        va = new_va; // Update va for the next iteration
        finalDischarge = totalDischarge; // Store the final total discharge

    } while (difference > tolerance); // Continue iterating until the difference is less than the tolerance

    console.log(`Final velocity (va) after iteration: ${va.toFixed(4)} m/s`);

    // Update the total discharge and final va in the results table
    document.getElementById('totalDischargeResult').textContent = finalDischarge.toFixed(2);
    document.getElementById('finalVaResult').textContent = va.toFixed(4);

    resultsContainer.style.display = 'block'; // Show results
}
