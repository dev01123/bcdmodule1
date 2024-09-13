// stilling_basin.js

function loadStillingBasin() {
    const content = `
        <div class="container">
            <h1 class="title">Design of Stilling Basin</h1>
            <div class="content">
                <table id="stilling-basin-table" class="table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Case 1 <button class="remove-column-btn" onclick="removeColumn(1)">Remove</button></th>
                            <!-- New cases will be added here -->
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Q</th>
                            <td><input type="number" step="any" placeholder="Enter Q" onchange="calculateStillingBasin(this)"></td>
                        </tr>
                        <tr>
                            <th>B</th>
                            <td><input type="number" step="any" placeholder="Enter B" onchange="calculateStillingBasin(this)"></td>
                        </tr>
                        <tr>
                            <th>q</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>1.2q</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>US TEL</th>
                            <td><input type="number" step="any" placeholder="Enter US Energy Level" onchange="calculateStillingBasin(this)"></td>
                        </tr>
                        <tr>
                            <th>DS TEL</th>
                            <td><input type="number" step="any" placeholder="Enter DS Energy Level" onchange="calculateStillingBasin(this)"></td>
                        </tr>
                        <tr>
                            <th>HL</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>yc</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>HL/yc</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>y1/yc</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>y1</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>y2/yc</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>y2</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>Cistern Level</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                        <tr>
                            <th>Cistern Length</th>
                            <td><input type="number" step="any" readonly></td>
                        </tr>
                    </tbody>
                </table>
                <button class="add-column-btn" onclick="addColumn()">Add Case</button>
                <button class="print-btn" onclick="printTable()">Print Table</button>
            </div>
        </div>
    `;

    document.getElementById('main').innerHTML = content;
}

function addColumn() {
    const table = document.getElementById('stilling-basin-table');
    const headerRow = table.querySelector('thead tr');
    const newColumnIndex = headerRow.cells.length;

    // Create new header cell with "Remove" button
    const newCaseHeader = document.createElement('th');
    newCaseHeader.innerHTML = `Case ${newColumnIndex} <button class="remove-column-btn" onclick="removeColumn(${newColumnIndex})">Remove</button>`;
    headerRow.appendChild(newCaseHeader);

    // Add new cells to each row in the table
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        const newCell = document.createElement('td');
        if (row.querySelector('input[readonly]')) {
            newCell.innerHTML = `<input type="number" step="any" readonly>`;
        } else {
            newCell.innerHTML = `<input type="number" step="any" placeholder="Enter value" onchange="calculateStillingBasin(this)">`;
        }
        row.appendChild(newCell);
    });
}

function removeColumn(index) {
    const table = document.getElementById('stilling-basin-table');
    const headerRow = table.querySelector('thead tr');

    // Remove the specified column from the header and each row
    headerRow.deleteCell(index);

    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
        row.deleteCell(index);
    });
}

function calculateStillingBasin(inputElement) {
    const column = inputElement.closest('td').cellIndex;
    const table = document.getElementById('stilling-basin-table');

    // Fetch input values
    const Q = parseFloat(table.rows[1].cells[column].querySelector('input').value) || 0;
    const B = parseFloat(table.rows[2].cells[column].querySelector('input').value) || 0;
    const USWaterLevel = parseFloat(table.rows[5].cells[column].querySelector('input').value) || 0;
    const DSWaterLevel = parseFloat(table.rows[6].cells[column].querySelector('input').value) || 0;

    if (Q > 0 && B > 0) {
        const q = Q / B;
        const q12 = 1.2 * q;
        const HL = USWaterLevel - DSWaterLevel;
        const yc = Math.pow((q12 * q12) / 9.81, 1 / 3);
        const HLyc = HL / yc;

        // Calculating y1, y2 and z iteratively
        let z = 0.01;
        let calculatedHLyc = 0;

        while (z <= 10) {
            const expr1 = Math.pow(z, 6) - 20 * Math.pow(z, 3) - 8;
            const expr2 = Math.pow(Math.pow(z, 4) + 8 * z, 1.5);
            calculatedHLyc = (expr1 + expr2) / (16 * Math.pow(z, 2));

            if (Math.abs(calculatedHLyc - HLyc) < 0.01) {
                break;
            }
            z += 0.01;
        }

        const x = (Math.sqrt(Math.pow(z, 3) + 8) / (2 * Math.sqrt(z))) - z / 2;
        const y2 = z * yc;
        const y1 = x * yc;
        const y1yc = y1 / yc;
        const y2yc = y2 / yc;
        const cisternLevel = DSWaterLevel - y2;
        const cisternLength = 5 * (y2 - y1);

        // Assign calculated values to respective cells
        table.rows[3].cells[column].querySelector('input').value = q.toFixed(2);
        table.rows[4].cells[column].querySelector('input').value = q12.toFixed(2);
        table.rows[7].cells[column].querySelector('input').value = HL.toFixed(2);
        table.rows[8].cells[column].querySelector('input').value = yc.toFixed(2);
        table.rows[9].cells[column].querySelector('input').value = HLyc.toFixed(2);
        table.rows[10].cells[column].querySelector('input').value = y1yc.toFixed(2);
        table.rows[11].cells[column].querySelector('input').value = y1.toFixed(2);
        table.rows[12].cells[column].querySelector('input').value = y2yc.toFixed(2);
        table.rows[13].cells[column].querySelector('input').value = y2.toFixed(2);
        table.rows[14].cells[column].querySelector('input').value = cisternLevel.toFixed(2);
        table.rows[15].cells[column].querySelector('input').value = cisternLength.toFixed(2);
    }
}

function printTable() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const tableContent = document.getElementById('stilling-basin-table').outerHTML;

    printWindow.document.write('<html><head><title>Print Table</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write('<h1>Stilling Basin Design Table</h1>');
    printWindow.document.write(tableContent);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}