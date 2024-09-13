document.addEventListener('DOMContentLoaded', function() {
    const mainContent = document.getElementById('main');

    function loadBarrageDesign() {
        mainContent.innerHTML = `
            <div class="container">
                <h2>Afflux Computation</h2>
                <form id="barrage-design-form">
                    <div class="form-group">
                        <label for="Q100">Q100:</label>
                        <input type="number" id="Q100" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="Q500">Q500:</label>
                        <input type="number" id="Q500" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="HFL100">HFL100:</label>
                        <input type="number" id="HFL100" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="HFL500">HFL500:</label>
                        <input type="number" id="HFL500" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="f">f:</label>
                        <input type="number" id="f" class="form-control" required>
                    </div>

                    <h3 class="mt-4">Add Barrage Bays</h3>
                    <table id="barrage-bays-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Bay Type</th>
                                <th>Number of Bays</th>
                                <th>Clear Width of Each Bay (m)</th>
                                <th>Crest Level</th>
                                <th>Total Width (m)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" class="form-control"></td>
                                <td><input type="number" class="form-control bay-number" onchange="updateTotalWidths()"></td>
                                <td><input type="number" class="form-control bay-width" step="0.01" onchange="updateTotalWidths()"></td>
                                <td><input type="number" class="form-control"></td>
                                <td class="total-width">0</td>
                                <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="4">Total Width (m)</th>
                                <th id="total-width">0</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    <button type="button" class="btn btn-success" onclick="addBarrageBay()">Add Bay</button>

                    <h3 class="mt-4">Add Barrage Piers/Double Piers/Divide Walls/Other Bays</h3>
                    <table id="barrage-piers-table" class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Pier Type</th>
                                <th>Number</th>
                                <th>Width (m)</th>
                                <th>Total Width (m)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><input type="text" class="form-control"></td>
                                <td><input type="number" class="form-control pier-number" onchange="updatePierTotalWidths()"></td>
                                <td><input type="number" class="form-control pier-width" step="0.01" onchange="updatePierTotalWidths()"></td>
                                <td class="pier-total-width">0</td>
                                <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="3">Total Width (m)</th>
                                <th id="pier-total-width">0</th>
                                <th></th>
                            </tr>
                        </tfoot>
                    </table>
                    <button type="button" class="btn btn-success" onclick="addBarragePier()">Add Pier</button>
                    <button type="button" class="btn btn-primary mt-4" onclick="executeDesign()" style="display: block;">Execute Design</button>
                    <div id="output" class="mt-3"></div>
                </form>
            </div>
        `;
    }

    function updateTotalWidths() {
        const rows = document.querySelectorAll('#barrage-bays-table tbody tr');
        let totalWidth = 0;

        rows.forEach(row => {
            const number = row.querySelector('.bay-number').value;
            const width = row.querySelector('.bay-width').value;
            const rowTotalWidth = number * width || 0;
            row.querySelector('.total-width').textContent = rowTotalWidth.toFixed(2);
            totalWidth += rowTotalWidth;
        });

        document.getElementById('total-width').textContent = totalWidth.toFixed(2);
    }

    function updatePierTotalWidths() {
        const rows = document.querySelectorAll('#barrage-piers-table tbody tr');
        let totalWidth = 0;

        rows.forEach(row => {
            const number = row.querySelector('.pier-number').value;
            const width = row.querySelector('.pier-width').value;
            const rowTotalWidth = number * width || 0;
            row.querySelector('.pier-total-width').textContent = rowTotalWidth.toFixed(2);
            totalWidth += rowTotalWidth;
        });

        document.getElementById('pier-total-width').textContent = totalWidth.toFixed(2);
    }

    function addBarrageBay() {
        const tableBody = document.querySelector('#barrage-bays-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="form-control"></td>
            <td><input type="number" class="form-control bay-number" onchange="updateTotalWidths()"></td>
            <td><input type="number" class="form-control bay-width" step="0.01" onchange="updateTotalWidths()"></td>
            <td><input type="number" class="form-control"></td>
            <td class="total-width">0</td>
            <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
        `;
        tableBody.appendChild(newRow);
        updateTotalWidths();
    }

    function addBarragePier() {
        const tableBody = document.querySelector('#barrage-piers-table tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="form-control"></td>
            <td><input type="number" class="form-control pier-number" onchange="updatePierTotalWidths()"></td>
            <td><input type="number" class="form-control pier-width" step="0.01" onchange="updatePierTotalWidths()"></td>
            <td class="pier-total-width">0</td>
            <td><button type="button" class="btn btn-danger" onclick="removeRow(this)">Remove</button></td>
        `;
        tableBody.appendChild(newRow);
        updatePierTotalWidths();
    }

    function removeRow(button) {
        button.closest('tr').remove();
        updateTotalWidths();
        updatePierTotalWidths();
    }

    function executeDesign() {
        const Q100 = parseFloat(document.getElementById('Q100').value);
        const Q500 = parseFloat(document.getElementById('Q500').value);
        const HFL100 = parseFloat(document.getElementById('HFL100').value);
        const HFL500 = parseFloat(document.getElementById('HFL500').value);
        const f = parseFloat(document.getElementById('f').value);
        
        // Check for empty input fields
        if (!Q100 || !Q500 || !HFL100 || !HFL500 || !f) {
        alert('Please fill in all the required input fields.');
        return;
        }

        let affluxValues = { Q100: 0.01, Q500: 0.01, Q100_10p: 0.01 };
        let affluxSatisfied = { Q100: false, Q500: false, Q100_10p: false };
        let finalOutputTables = { Q100: '', Q500: '', Q100_10p: '' };
    
        const tables = ['Q100', 'Q500', 'Q100_10p'];
    
        while (!affluxSatisfied.Q100 || !affluxSatisfied.Q500 || !affluxSatisfied.Q100_10p) {
            tables.forEach(type => {
                if (!affluxSatisfied[type]) {
                    const currentQ = type === 'Q100' || type === 'Q100_10p' ? Q100 : Q500;
                    const currentHFL = type === 'Q100' || type === 'Q100_10p' ? HFL100 : HFL500;
                    
                    let totalDischarge = 0;
                    let totalWaterway = parseFloat(document.getElementById('total-width').textContent) + parseFloat(document.getElementById('pier-total-width').textContent);
                    let q = currentQ / totalWaterway;
                    let LaceyWaterway = 4.83 * Math.sqrt(currentQ);
                    let LoosenessFactor = totalWaterway / LaceyWaterway;
                    let R = LoosenessFactor < 1 
                        ? (1.35 * Math.pow(q, 2/3)) / Math.pow(f, 1/3) 
                        : 0.475 * Math.pow(currentQ / f, 1/3);
                    let va = q / R;
                    let ha = Math.pow(va, 2) / (2 * 9.81);
    
                    let outputTable = `
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Bay Type</th>
                                    <th>Crest Level</th>
                                    <th>HFL + Afflux</th>
                                    <th>HFL</th>
                                    <th>DR</th>
                                    <th>Cd</th>
                                    <th>Discharge</th>
                                </tr>
                            </thead>
                            <tbody>
                    `;
    
                    document.querySelectorAll('#barrage-bays-table tbody tr').forEach(row => {
                        const bayType = row.querySelector('td:nth-child(1) input').value;
                        let number = parseFloat(row.querySelector('td:nth-child(2) input').value);
                        const width = parseFloat(row.querySelector('td:nth-child(3) input').value);
                        const crestLevel = parseFloat(row.querySelector('td:nth-child(4) input').value);
                        const HFL_afflux = currentHFL + affluxValues[type];
    
                        // Adjust the number of bays for the '10% Inoperative Condition'
                        if (type === 'Q100_10p') {
                            number = Math.floor(number * 0.9);
                        }
    
                        const DR = (currentHFL - crestLevel) / (currentHFL + affluxValues[type] - crestLevel);
                        const Cd = -258.27 * Math.pow(DR, 6) + 959.58 * Math.pow(DR, 5) - 1459.3 * Math.pow(DR, 4) + 1158.9 * Math.pow(DR, 3) - 506.24 * Math.pow(DR, 2) + 115.27 * DR - 8.9388;
                        const discharge = Cd * (width * number) * (Math.pow(HFL_afflux + ha - crestLevel, 1.5) - Math.pow(ha, 1.5));
    
                        totalDischarge += discharge;
    
                        outputTable += `
                            <tr>
                                <td>${bayType}</td>
                                <td>${crestLevel.toFixed(2)}</td>
                                <td>${HFL_afflux.toFixed(2)}</td>
                                <td>${currentHFL.toFixed(2)}</td>
                                <td>${DR.toFixed(2)}</td>
                                <td>${Cd.toFixed(4)}</td>
                                <td>${discharge.toFixed(2)}</td>
                            </tr>
                        `;
                    });
    
                    outputTable += `
                        </tbody>
                        <tfoot>
                            <tr>
                                <th colspan="6">Total Discharge</th>
                                <th>${totalDischarge.toFixed(2)}</th>
                            </tr>
                        </tfoot>
                        </table>
                    `;
    
                    if (totalDischarge >= currentQ) {
                        affluxSatisfied[type] = true;
                        finalOutputTables[type] = outputTable + `<p>Afflux satisfied at: ${affluxValues[type].toFixed(2)} m</p>`;
                    }
    
                    affluxValues[type] += 0.01;  // Increment afflux for next iteration
                }
            });
        }
    
        document.getElementById('output').innerHTML = `
            <h3>Output for Q100 and HFL100</h3>
            ${finalOutputTables.Q100}
            <h3>Output for Q500 and HFL500</h3>
            ${finalOutputTables.Q500}
            <h3>Output for Q100 and HFL100 (10% Inoperative Condition)</h3>
            ${finalOutputTables.Q100_10p}
        `;
    }
    
    

    // Export functions to be accessible globally
    window.executeDesign = executeDesign;
    window.loadBarrageDesign = loadBarrageDesign;
    window.addBarrageBay = addBarrageBay;
    window.addBarragePier = addBarragePier;
    window.removeRow = removeRow;
    window.updateTotalWidths = updateTotalWidths;
    window.updatePierTotalWidths = updatePierTotalWidths;

});
