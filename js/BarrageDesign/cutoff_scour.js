function loadCutoffScour() {
    const content = `
        <div class="container">
            <h1 class="title">Design of Cutoff (Scour Consideration)</h1>
            <div class="content">
                <table id="cutoff-scour-table" class="table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Case 1 <button class="remove-column-btn" onclick="removeCutoffScourColumn(1)">Remove</button></th>
                            <!-- New cases will be added here -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr><th>Q</th><td><input type="number" step="any" placeholder="Enter Q" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>B</th><td><input type="number" step="any" placeholder="Enter B" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>q</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>Concentration (%)</th><td><input type="number" step="any" placeholder="Enter Concentration" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>q_conc</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>HFL</th><td><input type="number" step="any" placeholder="Enter HFL" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>Retrogression</th><td><input type="number" step="any" placeholder="Enter Retrogression" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>Retrogressed HFL</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>Bed Level</th><td><input type="number" step="any" placeholder="Enter Bed Level" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>f</th><td><input type="number" step="any" placeholder="Enter f" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>LF</th><td><input type="number" step="any" placeholder="Enter LF" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>R</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>k</th><td><input type="number" step="any" placeholder="Enter k" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>kR</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>Embedment, %</th><td><input type="number" step="any" placeholder="Enter Embedment %" onchange="calculateCutoffScour(this)"></td></tr>
                        <tr><th>Depth of Cut Off</th><td><input type="number" step="any" readonly></td></tr>
                        <tr><th>Level of Cut Off</th><td><input type="number" step="any" readonly></td></tr>
                    </tbody>
                </table>
                <button class="add-column-btn" onclick="addCutoffScourColumn()">Add Case</button>
                <button class="print-btn" onclick="printTable()">Print Table</button>
            </div>
        </div>
    `;
    document.getElementById('main').innerHTML = content;
}

function addCutoffScourColumn() {
    const table = document.getElementById('cutoff-scour-table');
    const headerRow = table.querySelector('thead tr');
    const newColumnIndex = headerRow.cells.length;

    // Create new header cell with "Remove" button
    const newCaseHeader = document.createElement('th');
    newCaseHeader.innerHTML = `Case ${newColumnIndex} <button class="remove-column-btn" onclick="removeCutoffScourColumn(${newColumnIndex})">Remove</button>`;
    headerRow.appendChild(newCaseHeader);

    // Add new cells to each row in the table
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const newCell = document.createElement('td');
        if (row.querySelector('input[readonly]')) {
            newCell.innerHTML = `<input type="number" step="any" readonly>`;
        } else {
            newCell.innerHTML = `<input type="number" step="any" placeholder="Enter value" onchange="calculateCutoffScour(this)">`;
        }
        row.appendChild(newCell);
    });
}

function removeCutoffScourColumn(index) {
    const table = document.getElementById('cutoff-scour-table');
    const headerRow = table.querySelector('thead tr');

    // Remove the specified column from the header and each row
    headerRow.deleteCell(index);

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.deleteCell(index);
    });
}

function calculateCutoffScour(inputElement) {
    const column = inputElement.closest('td').cellIndex;
    const table = document.getElementById('cutoff-scour-table');

    // Fetch input values
    const Q = parseFloat(table.rows[1].cells[column].querySelector('input').value) || 0;
    const B = parseFloat(table.rows[2].cells[column].querySelector('input').value) || 0;
    const concentration = parseFloat(table.rows[4].cells[column].querySelector('input').value) || 0;
    const HFL = parseFloat(table.rows[6].cells[column].querySelector('input').value) || 0;
    const retrogression = parseFloat(table.rows[7].cells[column].querySelector('input').value) || 0;
    const bedLevel = parseFloat(table.rows[9].cells[column].querySelector('input').value) || 0;
    const f = parseFloat(table.rows[10].cells[column].querySelector('input').value) || 0;
    const LF = parseFloat(table.rows[11].cells[column].querySelector('input').value) || 0;
    const k = parseFloat(table.rows[13].cells[column].querySelector('input').value) || 0;
    const embedment = parseFloat(table.rows[15].cells[column].querySelector('input').value) || 0;

    if (Q > 0 && B > 0) {
        const q = Q / B;
        const q_conc = (1 + concentration / 100) * q;
        const retrogressedHFL = HFL - retrogression;
        let R = 0;

        if (f > 0) {
            R = LF <= 1 ? 1.35 * Math.pow((Math.pow(q_conc, 2)) / f, 1 / 3) : 0.475 * Math.pow(Q / f, 1 / 3);
        }

        const kR = k * R;
        const depthOfCutOff = (bedLevel - (HFL - kR)) * (1 + embedment / 100);
        const levelOfCutOff = bedLevel - depthOfCutOff;

        // Update table cells
        table.rows[3].cells[column].querySelector('input[readonly]').value = q.toFixed(2);
        table.rows[5].cells[column].querySelector('input[readonly]').value = q_conc.toFixed(2);
        table.rows[8].cells[column].querySelector('input[readonly]').value = retrogressedHFL.toFixed(2);
        table.rows[12].cells[column].querySelector('input[readonly]').value = R.toFixed(2);
        table.rows[14].cells[column].querySelector('input[readonly]').value = kR.toFixed(2);
        table.rows[16].cells[column].querySelector('input[readonly]').value = depthOfCutOff.toFixed(2);
        table.rows[17].cells[column].querySelector('input[readonly]').value = levelOfCutOff.toFixed(2);
    }
}

function printTable() {
    const tableContent = document.getElementById('cutoff-scour-table').outerHTML;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>Print Table</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid black;
                        padding: 8px;
                        text-align: left;
                    }
                </style>
            </head>
            <body>${tableContent}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
