function loadCanalSectionDesign() {
    // Clear the main content area
    const mainContent = document.querySelector('main');
    mainContent.innerHTML = '';

    // Create the chart section
    const chartSection = document.createElement('div');
    chartSection.classList.add('container');
    chartSection.style.marginTop = '20px';

    // Create the chart container
    const chartContainer = document.createElement('div');
    chartContainer.id = 'chart-container';
    chartContainer.style.width = '100%';
    chartContainer.style.height = '400px';

    // Append the chart container to the chart section
    chartSection.appendChild(chartContainer);

    // Append chart section to main content
    mainContent.appendChild(chartSection);

    // Initialize Highcharts with default settings including zoom and hover
    const chart = Highcharts.chart('chart-container', {
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'RD vs NSL'
        },
        xAxis: {
            title: {
                text: 'RD (m)'
            },
            gridLineWidth: 1
        },
        yAxis: {
            title: {
                text: 'NSL'
            },
            gridLineWidth: 1,
            visible: true
        },
        tooltip: {
            shared: true,
            headerFormat: '<b>{point.x}</b><br>',
            pointFormat: '{series.name}: {point.y}<br>'
        },
        legend: {
            enabled: false // Hide legend
        },
        series: [] // Initialize with no data
    });

    // Create the CSV upload section
    const csvSection = document.createElement('div');
    csvSection.classList.add('container');
    csvSection.style.marginTop = '20px';

    // File input for uploading CSV
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.csv';
    fileInput.classList.add('form-control', 'mb-2');

    // Plot button to process CSV data
    const plotButton = document.createElement('button');
    plotButton.textContent = 'Plot CSV Data';
    plotButton.classList.add('btn', 'btn-success', 'mb-3');
    plotButton.onclick = () => {
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                const csvData = e.target.result;
                processCSVData(csvData);
            };
            reader.readAsText(file);
        } else {
            alert('Please select a CSV file.');
        }
    };

    // Append file input and plot button to the CSV section
    csvSection.appendChild(fileInput);
    csvSection.appendChild(plotButton);

    // Append CSV section to main content
    mainContent.appendChild(csvSection);

    // Add FSL at Canal Head input
    const fslAtCanalHeadInput = document.createElement('input');
    fslAtCanalHeadInput.type = 'number';
    fslAtCanalHeadInput.classList.add('form-control', 'mb-2');
    fslAtCanalHeadInput.placeholder = 'FSL at Canal Head';
    fslAtCanalHeadInput.id = 'fslAtCanalHeadInput';

    // Append FSL at Canal Head input to the CSV section
    csvSection.appendChild(fslAtCanalHeadInput);

    // Create the input table section
    const tableSection = document.createElement('div');
    tableSection.classList.add('container');
    tableSection.style.marginTop = '20px';

    // Table title
    const tableTitle = document.createElement('h5');
    tableTitle.textContent = 'Add Canal Branch';
    tableSection.appendChild(tableTitle);

    // Create the input table
    const inputTable = document.createElement('table');
    inputTable.classList.add('table', 'table-bordered');

    // Add an ID and name to the table
    inputTable.id = 'table1';           // Set the ID of the table
    inputTable.name = 'branch';     // Set the name of the table

    // Create the table header
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['RD (m)', 'Bank', 'Q (cumec)', 'FSL at Branch', 'CR', 'Head Loss', 'Actions'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    tableHeader.appendChild(headerRow);
    inputTable.appendChild(tableHeader);

    // Create the table body
    const tableBody = document.createElement('tbody');
    inputTable.appendChild(tableBody);

    // Function to add a new row to the table
    function addTableRow(rd = '', bank = '', q = '', fsl = '', cr = false, hL='') {
        const row = document.createElement('tr');

        // RD input
        const rdInput = document.createElement('input');
        rdInput.type = 'number';
        rdInput.value = rd;
        rdInput.classList.add('form-control');
        rdInput.style.width = '80px';

        // Bank dropdown with color-coded options
        const bankSelect = document.createElement('select');
        bankSelect.classList.add('form-control');
        bankSelect.style.width = '100px';
        ['Left', 'Right'].forEach(optionText => {
            const option = document.createElement('option');
            option.value = optionText.toLowerCase();
            option.textContent = optionText;
            option.style.color = optionText === 'Left' ? 'blue' : 'red'; // Color coding
            bankSelect.appendChild(option);
        });
        bankSelect.value = bank;

        // Q input
        const qInput = document.createElement('input');
        qInput.type = 'number';
        qInput.value = q;
        qInput.classList.add('form-control');
        qInput.style.width = '80px';

        // FSL input
        const fslInput = document.createElement('input');
        fslInput.type = 'number';
        fslInput.value = fsl;
        fslInput.classList.add('form-control');
        fslInput.style.width = '80px';

        // CR checkbox
        const crInput = document.createElement('input');
        crInput.type = 'checkbox';
        crInput.checked = cr;
        crInput.classList.add('form-check-input');

        // FSL input
        const hLInput = document.createElement('input');
        hLInput.type = 'number';
        hLInput.value = hL;
        hLInput.classList.add('form-control');
        hLInput.style.width = '80px';

        // Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'mx-1');
        removeButton.onclick = () => {
            row.remove();
            updateTableSeries(); // Update chart when a row is removed
        };

        // Action cell containing the remove button
        const actionsCell = document.createElement('td');
        actionsCell.appendChild(removeButton);

        // Cells for each input
        const rdCell = document.createElement('td');
        rdCell.appendChild(rdInput);

        const bankCell = document.createElement('td');
        bankCell.appendChild(bankSelect);

        const qCell = document.createElement('td');
        qCell.appendChild(qInput);

        const fslCell = document.createElement('td');
        fslCell.appendChild(fslInput);

        const crCell = document.createElement('td');
        crCell.appendChild(crInput);

        const hLCell = document.createElement('td');
        hLCell.appendChild(hLInput);


        // Append cells to row
        row.appendChild(rdCell);
        row.appendChild(bankCell);
        row.appendChild(qCell);
        row.appendChild(fslCell);
        row.appendChild(crCell);
        row.appendChild(hLCell)
        row.appendChild(actionsCell);

        // Append row to table body
        tableBody.appendChild(row);
    }

    // Add an initial blank row
    addTableRow();

    // Append input table to table section
    tableSection.appendChild(inputTable);

    // Add row button below the table
    const addRowButton = document.createElement('button');
    addRowButton.textContent = 'Add Row';
    addRowButton.classList.add('btn', 'btn-primary', 'mt-2');
    addRowButton.onclick = () => {
        addTableRow(); // Adds a new row
        updateTableSeries(); // Update chart with new row data
    };

    // Append add row button to the table section
    tableSection.appendChild(addRowButton);

    // Append table section to main content
    mainContent.appendChild(tableSection);


    // Store references to plot lines from the second table
    let secondTablePlotLines = [];

    // Function to update the chart with new data from the table
    function updateTableSeries() {
        // Clear existing plot lines from the x-axis
        chart.xAxis[0].update({
            plotLines: [] // Reset plot lines
        });
    
        // Define the current y-axis max and min limits to plot the line vertically
        const yAxisMax = chart.yAxis[0].getExtremes().max;
        const yAxisMin = chart.yAxis[0].getExtremes().min;
    
        // Iterate over each row in the table body
        tableBody.querySelectorAll('tr').forEach(row => {
            const rdValue = parseFloat(row.cells[0].querySelector('input').value);
            const bank = row.cells[1].querySelector('select').value;
    
            // Check if RD value is a valid number
            if (!isNaN(rdValue)) {
                // Determine line color based on bank
                const lineColor = bank === 'left' ? 'rgba(0, 0, 255, 0.5)' : 'rgba(255, 0, 0, 0.5)'; // Blue for Left, Red for Right with transparency
    
                // Add a new plot line for the x-axis
                chart.xAxis[0].addPlotLine({
                    color: lineColor, // Line color based on bank
                    width: 2, // Line width
                    value: rdValue, // Position of the line on the x-axis
                    dashStyle: 'Solid', // Line style
                    label: {
                        text: bank === 'left' ? 'Left Branch' : 'Right Branch', // Label for the line
                        align: 'left',
                        style: {
                            color: lineColor,
                            fontSize: '10px'
                        }
                    }
                });
            }
        });
        
        // Re-add plot lines from the second table
        secondTablePlotLines.forEach(plotLine => {
        chart.xAxis[0].addPlotLine(plotLine);
        });

        // Redraw the chart to apply plot line changes
        chart.redraw();
    }
    
   // Create the second input table section
   const secondTableSection = document.createElement('div');
   secondTableSection.classList.add('container');
   secondTableSection.style.marginTop = '20px';
 
   // Table title
   const secondTableTitle = document.createElement('h5');
   secondTableTitle.textContent = 'Add Drains and CD Structures';
   secondTableSection.appendChild(secondTableTitle);
 
   // Create the second input table
   const secondInputTable = document.createElement('table');
   secondInputTable.classList.add('table', 'table-bordered');

    // Add an ID and name to the table
    secondInputTable.id = 'table2';           // Set the ID of the table
    secondInputTable.name = 'drain';     // Set the name of the table

  // Create the table header
  const secondTableHeader = document.createElement('thead');
  const secondHeaderRow = document.createElement('tr');
  const secondHeaders = ['RD (m)', 'Q (cumec)', 'HFL', 'Bed Level', 'Proposed Structure', 'Head Loss', 'Actions'];
  secondHeaders.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    secondHeaderRow.appendChild(th);
  });
  secondTableHeader.appendChild(secondHeaderRow);
  secondInputTable.appendChild(secondTableHeader);

  // Create the table body
  const secondTableBody = document.createElement('tbody');
  secondInputTable.appendChild(secondTableBody);

  // Function to add a new row to the second table
  function addSecondTableRow(rd = '', q = '', hfl = '', bedLevel = '', structure = 'Aquaduct', headLoss = '') {
    const row = document.createElement('tr');

    // RD input
    const rdInput = document.createElement('input');
    rdInput.type = 'number';
    rdInput.value = rd;
    rdInput.classList.add('form-control');
    rdInput.style.width = '80px';

    // Q input
    const qInput = document.createElement('input');
    qInput.type = 'number';
    qInput.value = q;
    qInput.classList.add('form-control');
    qInput.style.width = '80px';

    // HFL input
    const hflInput = document.createElement('input');
    hflInput.type = 'number';
    hflInput.value = hfl;
    hflInput.classList.add('form-control');
    hflInput.style.width = '80px';

    // Bed Level input
    const bedLevelInput = document.createElement('input');
    bedLevelInput.type = 'number';
    bedLevelInput.value = bedLevel;
    bedLevelInput.classList.add('form-control');
    bedLevelInput.style.width = '80px';

    // Proposed Structure dropdown
    const structureSelect = document.createElement('select');
    structureSelect.classList.add('form-control');
    structureSelect.style.width = '150px';
    const structureOptions = ['Aquaduct', 'Canal Syphon', 'Superpassage', 'River Syphon', 'Level Crossing', 'Other'];
    structureOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;   

      structureSelect.appendChild(optionElement);
    });
    structureSelect.value = structure;

    // Head Loss input
    const headLossInput = document.createElement('input');
    headLossInput.type = 'number';
    headLossInput.value = headLoss;
    headLossInput.classList.add('form-control');
    headLossInput.style.width = '80px';

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('btn',   
 'btn-danger', 'btn-sm', 'mx-1');
    removeButton.onclick = () => {
      row.remove();
      updateSecondTablePlotLines(); // Update plot lines when a row is removed
    };

    // Action cell containing the remove button
    const actionsCell = document.createElement('td');
    actionsCell.appendChild(removeButton);

    // Cells for each input and dropdown
    const rdCell = document.createElement('td');
    rdCell.appendChild(rdInput);

    const qCell = document.createElement('td');
    qCell.appendChild(qInput);

    const hflCell = document.createElement('td');
    hflCell.appendChild(hflInput);

    const bedLevelCell = document.createElement('td');
    bedLevelCell.appendChild(bedLevelInput);

    const structureCell = document.createElement('td');
    structureCell.appendChild(structureSelect);

    const headLossCell = document.createElement('td');
    headLossCell.appendChild(headLossInput);

    // Append cells to row
    row.appendChild(rdCell);
    row.appendChild(qCell);
    row.appendChild(hflCell);
    row.appendChild(bedLevelCell);
    row.appendChild(structureCell);
    row.appendChild(headLossCell);
    row.appendChild(actionsCell);

    // Append row to table body
    secondTableBody.appendChild(row);
  }

  // Add an initial blank row
  addSecondTableRow();

  // Append input table to table section
  secondTableSection.appendChild(secondInputTable);

  // Add row button below the table
  const addSecondRowButton = document.createElement('button');
  addSecondRowButton.textContent = 'Add Row';
  addSecondRowButton.classList.add('btn', 'btn-primary', 'mt-2');
  addSecondRowButton.onclick = () => {
    addSecondTableRow();
    updateSecondTablePlotLines(); // Update plot lines when a new row is added
  };

  // Append add row button to the table section
  secondTableSection.appendChild(addSecondRowButton);

  // Append table section to main content
  mainContent.appendChild(secondTableSection);

  // Function to update plot lines based on changes in the second table
  function updateSecondTablePlotLines() {
    // Iterate over each row in the second table body
    secondTableBody.querySelectorAll('tr').forEach(row => {
      const rdValue = parseFloat(row.cells[0].querySelector('input').value);

      // Check if RD value is a valid number
      if (!isNaN(rdValue)) {
        // Add a new plot line for the x-axis
        chart.xAxis[0].addPlotLine({
          color: 'blue',
          width: 3,
          value: rdValue,
          dashStyle: 'Dash',
          label: {
            text: 'Drain/CD Structure',
            align: 'left',
            style: {
              color: 'blue',
              fontSize: '10px'
            }
          }
        });
      }
    });
    
    // Store references to newly created plot lines
    secondTablePlotLines = chart.xAxis[0].plotLines;

    // Redraw the chart to apply plot line changes
    chart.redraw();
  }

      // Create the third input table section
  const thirdTableSection = document.createElement('div');
  thirdTableSection.classList.add('container');
  thirdTableSection.style.marginTop = '20px';

  // Table title
  const thirdTableTitle = document.createElement('h5');
  thirdTableTitle.textContent = 'Add Bridges';
  thirdTableSection.appendChild(thirdTableTitle);

  // Create the third input table
  const thirdInputTable = document.createElement('table');
  thirdInputTable.classList.add('table', 'table-bordered');

  // Add an ID and name to the table
  thirdInputTable.id = 'table3';           // Set the ID of the table
  thirdInputTable.name = 'bridge';     // Set the name of the table
  

  // Create the table header
  const thirdTableHeader = document.createElement('thead');
  const thirdHeaderRow = document.createElement('tr');
  const thirdHeaders = ['RD (m)', 'Bridge Type', 'Head Loss', 'Actions'];
  thirdHeaders.forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    thirdHeaderRow.appendChild(th);
  });
  thirdTableHeader.appendChild(thirdHeaderRow);
  thirdInputTable.appendChild(thirdTableHeader);

  // Create the table body
  const thirdTableBody = document.createElement('tbody');
  thirdInputTable.appendChild(thirdTableBody);

  // Function to add a new row to the third table
  function addThirdTableRow(rd = '', bridgeType = 'Road Bridge', headLoss = '') {
    const row = document.createElement('tr');

    // RD input
    const rdInput = document.createElement('input');
    rdInput.type = 'number';
    rdInput.value = rd;
    rdInput.classList.add('form-control');
    rdInput.style.width = '80px';

    // Bridge Type dropdown
    const bridgeTypeSelect = document.createElement('select');
    bridgeTypeSelect.classList.add('form-control');
    bridgeTypeSelect.style.width = '150px';
    const bridgeTypeOptions = ['Road Bridge', 'Railway Bridge', 'Other'];
    bridgeTypeOptions.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;   

      bridgeTypeSelect.appendChild(optionElement);
    });
    bridgeTypeSelect.value = bridgeType;

    // Head Loss input
    const headLossInput = document.createElement('input');
    headLossInput.type = 'number';
    headLossInput.value = headLoss;
    headLossInput.classList.add('form-control');
    headLossInput.style.width = '80px';

    // Remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('btn',   
 'btn-danger', 'btn-sm', 'mx-1');
    removeButton.onclick = () => {
      row.remove();
      updateThirdTablePlotLines(); // Update plot lines when a row is removed
    };

    // Action cell containing the remove button
    const actionsCell = document.createElement('td');
    actionsCell.appendChild(removeButton);

    // Cells for each input and dropdown
    const rdCell = document.createElement('td');
    rdCell.appendChild(rdInput);

    const bridgeTypeCell = document.createElement('td');
    bridgeTypeCell.appendChild(bridgeTypeSelect);

    const headLossCell = document.createElement('td');
    headLossCell.appendChild(headLossInput);

    // Append cells to row
    row.appendChild(rdCell);
    row.appendChild(bridgeTypeCell);
    row.appendChild(headLossCell);
    row.appendChild(actionsCell);

    // Append row to table body
    thirdTableBody.appendChild(row);
  }

  // Add an initial blank row
  addThirdTableRow();

  // Append input table to table section
  thirdTableSection.appendChild(thirdInputTable);

  // Add row button below the table
  const addThirdRowButton = document.createElement('button');
  addThirdRowButton.textContent = 'Add Row';
  addThirdRowButton.classList.add('btn', 'btn-primary', 'mt-2');
  addThirdRowButton.onclick = () => {
    addThirdTableRow();
    updateThirdTablePlotLines(); // Update plot lines when a new row is added
  };

  // Append add row button to the table section
  thirdTableSection.appendChild(addThirdRowButton);

  // Append table section to main content
  mainContent.appendChild(thirdTableSection);

  // Function to update plot lines based on changes in the third table
  function updateThirdTablePlotLines() {
    // Iterate over each row in the third table body
    thirdTableBody.querySelectorAll('tr').forEach(row => {
      const rdValue = parseFloat(row.cells[0].querySelector('input').value);

      // Check if RD value is a valid number
      if (!isNaN(rdValue)) {
        // Add a new plot line for the x-axis
        chart.xAxis[0].addPlotLine({
          color: 'black',
          width: 2,
          value: rdValue,
          dashStyle: 'Dot',
          label: {
            text: 'Bridge',
            align: 'left',
            style: {
              color: 'black',
              fontSize: '10px'
            }
          }
        });
      }
    });

    // Redraw the chart to apply plot line changes
    chart.redraw();
  }

    // Create the fourth input table section
    const fourthTableSection = document.createElement('div');
    fourthTableSection.classList.add('container');
    fourthTableSection.style.marginTop = '20px';
  
    // Table title
    const fourthTableTitle = document.createElement('h5');
    fourthTableTitle.textContent = 'Add Canal Reach and Canal Sections';
    fourthTableSection.appendChild(fourthTableTitle);
  
    // Create the fourth input table
    const fourthInputTable = document.createElement('table');
    fourthInputTable.classList.add('table', 'table-bordered');

    // Add an ID and name to the table
    fourthInputTable.id = 'table5';           // Set the ID of the table
    fourthInputTable.name = 'reach';     // Set the name of the table

    // Create the table header
    const fourthTableHeader = document.createElement('thead');
    const fourthHeaderRow = document.createElement('tr');
    const fourthHeaders = ['RD (Start)', 'RD (End)', 'Q (cumec)', 'Avg Terrain Slope (%)', 'Provided Slope (%)', 'FSD', 'Freeboard', 'Actions'];
    fourthHeaders.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      fourthHeaderRow.appendChild(th);
    });
    fourthTableHeader.appendChild(fourthHeaderRow);
    fourthInputTable.appendChild(fourthTableHeader);
  
    // Create the table body
    const fourthTableBody = document.createElement('tbody');
    fourthInputTable.appendChild(fourthTableBody);
  
    // Function to add a new row to the fourth table
    function addFourthTableRow(rdStart = '', rdEnd = '', q = '', avgTerrainSlope = '', providedSlope = '', FSD = '', Freeboard = '') {
      const row = document.createElement('tr');
  
      // RD (Start) input
      const rdStartInput = document.createElement('input');
      rdStartInput.type = 'number';
      rdStartInput.value = rdStart;
      rdStartInput.classList.add('form-control');
      rdStartInput.style.width = '80px';
  
      // RD (End) input
      const rdEndInput = document.createElement('input');
      rdEndInput.type = 'number';
      rdEndInput.value = rdEnd;
      rdEndInput.classList.add('form-control');
      rdEndInput.style.width = '80px';
  
      // Q (cumec) input
      const qInput = document.createElement('input');
      qInput.type = 'number';
      qInput.value = q;
      qInput.classList.add('form-control');
      qInput.style.width = '80px';
  
      // Avg Terrain Slope (%) input
      const avgTerrainSlopeInput = document.createElement('input');
      avgTerrainSlopeInput.type = 'number';
      avgTerrainSlopeInput.value = avgTerrainSlope;
      avgTerrainSlopeInput.classList.add('form-control');
      avgTerrainSlopeInput.style.width = '80px';
  
      // Provided Slope (%) input
      const providedSlopeInput = document.createElement('input');
      providedSlopeInput.type = 'number';
      providedSlopeInput.value = providedSlope;
      providedSlopeInput.classList.add('form-control');
      providedSlopeInput.style.width = '80px';

      // FSD Input
      const FSDInput = document.createElement('input');
      FSDInput.type = 'number';
      FSDInput.value = FSD;
      FSDInput.classList.add('form-control');
      FSDInput.style.width = '80px';
  
      // Freeboard Input
      const FreeboardInput = document.createElement('input');
      FreeboardInput.type = 'number';
      FreeboardInput.value = Freeboard;
      FreeboardInput.classList.add('form-control');
      FreeboardInput.style.width = '80px';


 
      // Remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('btn',   
   'btn-danger', 'btn-sm', 'mx-1');
      removeButton.onclick = () => {
        row.remove();
        generateCombinedTable();
        addSeriesToChart(chart, combinedData);
      };
  
      // Action cell containing the remove button
      const actionsCell = document.createElement('td');
      actionsCell.appendChild(removeButton);
  
      // Cells for each input and dropdown
      const rdStartCell = document.createElement('td');
      rdStartCell.appendChild(rdStartInput);
  
      const rdEndCell = document.createElement('td');
      rdEndCell.appendChild(rdEndInput);
  
      const qCell = document.createElement('td');
      qCell.appendChild(qInput);
  
      const avgTerrainSlopeCell = document.createElement('td');
      avgTerrainSlopeCell.appendChild(avgTerrainSlopeInput);
  
      const providedSlopeCell = document.createElement('td');
      providedSlopeCell.appendChild(providedSlopeInput);
  
      const FSDCell = document.createElement('td');
      FSDCell.appendChild(FSDInput);
  
      const FreeboardCell = document.createElement('td');
      FreeboardCell.appendChild(FreeboardInput);
  

      // Append cells to row
      row.appendChild(rdStartCell);
      row.appendChild(rdEndCell);
      row.appendChild(qCell);
      row.appendChild(avgTerrainSlopeCell);
      row.appendChild(providedSlopeCell);
      row.appendChild(FSDCell);
      row.appendChild(FreeboardCell);
      row.appendChild(actionsCell);
  
      // Append row to table body
      fourthTableBody.appendChild(row);
    }
  
    // Add an initial blank row
    addFourthTableRow();
  
    // Append input table to table section
    fourthTableSection.appendChild(fourthInputTable);
  
    // Add row button below the table
    const addFourthRowButton = document.createElement('button');
    addFourthRowButton.textContent = 'Add Row';
    addFourthRowButton.classList.add('btn', 'btn-primary', 'mt-2');
    addFourthRowButton.onclick = () => {
      addFourthTableRow();
      generateCombinedTable();
      addSeriesToChart(chart, combinedData);
    };
  
    // Append add row button to the table section
    fourthTableSection.appendChild(addFourthRowButton);
  
    // Append table section to main content
    mainContent.appendChild(fourthTableSection);

      // Create the fifth input table section
    const fifthTableSection = document.createElement('div');
    fifthTableSection.classList.add('container');
    fifthTableSection.style.marginTop = '20px';

    // Table title
    const fifthTableTitle = document.createElement('h5');
    fifthTableTitle.textContent = 'Add Canal Falls';
    fifthTableSection.appendChild(fifthTableTitle);

    // Create the fifth input table
    const fifthInputTable = document.createElement('table');
    fifthInputTable.classList.add('table', 'table-bordered');

    // Add an ID and name to the table
    fifthInputTable.id = 'table4';           // Set the ID of the table
    fifthInputTable.name = 'fall';     // Set the name of the table

    // Create the table header
    const fifthTableHeader = document.createElement('thead');
    const fifthHeaderRow = document.createElement('tr');
    const fifthHeaders = ['RD (m)', 'Fall (m)', 'Head Loss', 'Actions'];
    fifthHeaders.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      fifthHeaderRow.appendChild(th);
    });
    fifthTableHeader.appendChild(fifthHeaderRow);
    fifthInputTable.appendChild(fifthTableHeader);

    // Create the table body
    const fifthTableBody = document.createElement('tbody');
    fifthInputTable.appendChild(fifthTableBody);

    // Function to add a new row to the fifth table
    function addFifthTableRow(rd = '', fall = '', headLoss = '') {
      const row = document.createElement('tr');

      // RD input
      const rdInput = document.createElement('input');
      rdInput.type = 'number';
      rdInput.value = rd;
      rdInput.classList.add('form-control');
      rdInput.style.width = '80px';

      // Fall (m) input
      const fallInput = document.createElement('input');
      fallInput.type = 'number';
      fallInput.value = fall;
      fallInput.classList.add('form-control');
      fallInput.style.width = '80px';

      // Head Loss (m) input
      const headLossInput = document.createElement('input');
      headLossInput.type = 'number';
      headLossInput.value = headLoss;
      headLossInput.classList.add('form-control');
      headLossInput.style.width = '80px';

      // Remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('btn',   
  'btn-danger', 'btn-sm', 'mx-1');
      removeButton.onclick = () => {
        row.remove();
        updateFifthTablePlotLines()
      };

      // Action cell containing the remove button
      const actionsCell = document.createElement('td');
      actionsCell.appendChild(removeButton);

      // Cells for each input
      const rdCell = document.createElement('td');
      rdCell.appendChild(rdInput);

      const fallCell = document.createElement('td');
      fallCell.appendChild(fallInput);

      const headLossCell = document.createElement('td');
      headLossCell.appendChild(headLossInput);

      // Append cells to row
      row.appendChild(rdCell);
      row.appendChild(fallCell);
      row.appendChild(headLossCell);
      row.appendChild(actionsCell);

      // Append row to table body
      fifthTableBody.appendChild(row);
    }

    // Add an initial blank row
    addFifthTableRow();

    // Append input table to table section
    fifthTableSection.appendChild(fifthInputTable);

    // Add row button below the table
    const addFifthRowButton = document.createElement('button');
    addFifthRowButton.textContent = 'Add Row';
    addFifthRowButton.classList.add('btn', 'btn-primary', 'mt-2');
    addFifthRowButton.onclick = () => {
      addFifthTableRow();
      updateFifthTablePlotLines()
    };

    // Append add row button to the table section
    fifthTableSection.appendChild(addFifthRowButton);

  // Function to update plot lines based on changes in the fifth table
  function updateFifthTablePlotLines() {
    // Iterate over each row in the third table body
    fifthTableBody.querySelectorAll('tr').forEach(row => {
      const rdValue = parseFloat(row.cells[0].querySelector('input').value);

      // Check if RD value is a valid number
      if (!isNaN(rdValue)) {
        // Add a new plot line for the x-axis
        chart.xAxis[0].addPlotLine({
          color: 'orange',
          width: 2,
          value: rdValue,
          dashStyle: 'Dot',
          label: {
            text: 'Canal Fall',
            align: 'left',
            style: {
              color: 'black',
              fontSize: '10px'
            }
          }
        });
      }
    });

    // Redraw the chart to apply plot line changes
    chart.redraw();
  }

    // Append table section to main content
    mainContent.insertBefore(fifthTableSection, fourthTableSection); // Insert before the fourth table

    // Function to process CSV data and plot
    function processCSVData(data) {
        const lines = data.split('\n').map(line => line.split(','));
        if (lines.length > 1) {
            const xValues = lines.map(line => parseFloat(line[0])).filter(v => !isNaN(v));
            const yValues = lines.map(line => parseFloat(line[1])).filter(v => !isNaN(v));

            if (xValues.length === yValues.length && xValues.length > 0) {
                // Add a new series with CSV data
                chart.addSeries({
                    name: 'CSV Data',
                    data: xValues.map((x, i) => [x, yValues[i]]),
                    type: 'line',
                    color: 'brown',
                    marker: {
                        symbol: 'circle',
                        radius: 4
                    },
                    fromCSV: true // Mark series as from CSV
                });
            } else {
                alert('CSV format error: Ensure it has two numerical columns.');
            }
        } else {
            alert('CSV file is empty or improperly formatted.');
        }
    }

    //function to generate head loss statement table
    // Step 1: Declare combinedData globally
let combinedData = []; // Declare globally so it can be accessed anywhere

function generateCombinedTable() {
  // Step 2: Reinitialize combinedData inside the function to avoid reusing old data
  combinedData = []; // Ensure it's reset each time the function runs

  // Configuration object specifying Head Loss column index for each table
  const tableConfig = {
    table1: 6, // Head Loss is in the 6th column of table1
    table2: 6, // Head Loss is in the 6th column of table2
    table3: 3, // Head Loss is in the 3rd column of table3
    table4: 3, // Head Loss is in the 3rd column of table4
  };

  // Initialize the first row of the combined table
  const fslAtCanalHeadInput = document.getElementById("fslAtCanalHeadInput");
  const fslAtCanalHead = fslAtCanalHeadInput ? parseFloat(fslAtCanalHeadInput.value) : NaN;

  // Fetch Provided Slope and FSD for RD = 0 from table5
  let initialSlope = NaN;
  let initialFSD = NaN;
  const table5 = document.getElementById("table5");

  if (table5) {
    const table5Rows = table5.querySelectorAll("tbody tr");

    table5Rows.forEach((row) => {
      const rdStartInput = row.querySelector("td:nth-child(1) input");
      const rdEndInput = row.querySelector("td:nth-child(2) input");
      const slopeInput = row.querySelector("td:nth-child(3) input");
      const fsdInput = row.querySelector("td:nth-child(4) input");

      const rdStart = rdStartInput ? parseFloat(rdStartInput.value) : NaN;
      const rdEnd = rdEndInput ? parseFloat(rdEndInput.value) : NaN;

      // Check if RD = 0 falls within the start and end range of table5
      if (rdStart <= 0 && rdEnd > 0) {
        initialSlope = slopeInput ? parseFloat(slopeInput.value) : NaN;
        initialFSD = fsdInput ? parseFloat(fsdInput.value) : NaN;
      }

      // Add RDend rows to combinedData
      if (!isNaN(rdEnd)) {
        combinedData.push({
          RD: rdEnd,
          TableName: "Previous Branch End",
          HeadLoss: 0,
          ProvidedSlope: slopeInput ? parseFloat(slopeInput.value) : NaN,
          FSL: fslAtCanalHead, // FSL remains as it is; adjust if needed
          FSD: fsdInput ? parseFloat(fsdInput.value) : NaN,
          CanalBedLevel: fslAtCanalHead - (fsdInput ? parseFloat(fsdInput.value) : NaN),
        });
      }
    });
  }

  combinedData.push({
    RD: 0,
    TableName: "FSL at Head",
    HeadLoss: 0,
    ProvidedSlope: initialSlope,
    FSL: fslAtCanalHead,
    FSD: initialFSD,
    CanalBedLevel: fslAtCanalHead - initialFSD,
  });

  // Iterate over each table configuration
  for (const [tableId, headLossIndex] of Object.entries(tableConfig)) {
    const table = document.getElementById(tableId);

    if (table) {
      const rows = table.querySelectorAll("tbody tr");

      rows.forEach((row) => {
        const rdInput = row.querySelector("td:nth-child(1) input");
        const rdValue = rdInput ? parseFloat(rdInput.value) : NaN;

        const headLossInput = row.querySelector(`td:nth-child(${headLossIndex}) input`);
        const headLossValue = headLossInput ? parseFloat(headLossInput.value) : NaN;

        const fslInput = row.querySelector("td:nth-child(3) input");
        const fslValue = fslInput ? parseFloat(fslInput.value) : NaN;

        const bedLevelInput = row.querySelector("td:nth-child(4) input");
        const bedLevelValue = bedLevelInput ? parseFloat(bedLevelInput.value) : NaN;

        const tableName = table.name || tableId;

        // Check if the table name is 'drain', 'bridge', or 'fall' for duplicate entry
        if (["drain", "bridge", "fall"].includes(tableName.toLowerCase())) {
          // Insert the duplicate row just before the original row
          combinedData.push({
            RD: rdValue,
            TableName: `Duplicate ${tableName}`,
            HeadLoss: 0,
            FSL: fslValue,
            CanalBedLevel: bedLevelValue,
            ProvidedSlope: initialSlope, // fetched from table5
            FSD: initialFSD, // fetched from table5
          });
        }

        // Push the original row after inserting the duplicate
        combinedData.push({
          RD: rdValue,
          TableName: tableName,
          HeadLoss: headLossValue,
          FSL: fslValue,
          CanalBedLevel: bedLevelValue,
          ProvidedSlope: initialSlope, // placeholder, will be updated
          FSD: initialFSD, // placeholder, will be updated
        });
      });
    } else {
      console.warn(`Table with ID '${tableId}' not found.`);
    }
  }

  // Update Provided Slope and FSD from table5
  // Update Provided Slope and FSD from table5
if (table5) {
  const table5Rows = table5.querySelectorAll('tbody tr');

  combinedData.forEach((dataRow) => {
    table5Rows.forEach((row) => {
      const rdStartInput = row.querySelector('td:nth-child(1) input');
      const rdEndInput = row.querySelector('td:nth-child(2) input');
      const slopeInput = row.querySelector('td:nth-child(5) input');
      const fsdInput = row.querySelector('td:nth-child(6) input');

      const rdStart = rdStartInput ? parseFloat(rdStartInput.value) : NaN;
      const rdEnd = rdEndInput ? parseFloat(rdEndInput.value) : NaN;

      // New condition for "Previous Branch End"
      if (dataRow.TableName === 'Previous Branch End' && dataRow.RD > rdStart && dataRow.RD <= rdEnd) {
        dataRow.ProvidedSlope = slopeInput ? parseFloat(slopeInput.value) : NaN;
        dataRow.FSD = fsdInput ? parseFloat(fsdInput.value) : NaN;
      }
      // Original condition for other rows
      else if (dataRow.TableName !== "Previous Branch End" && dataRow.RD >= rdStart && dataRow.RD < rdEnd) {
        dataRow.ProvidedSlope = slopeInput ? parseFloat(slopeInput.value) : NaN;
        dataRow.FSD = fsdInput ? parseFloat(fsdInput.value) : NaN;
      }
    });
  });
  } else {
  console.warn('Table with ID "table5" not found.');
}


  // Sort combined data by RD in ascending order
  combinedData.sort((a, b) => a.RD - b.RD);

  // Update FSL and Canal Bed Level for subsequent rows
  for (let i = 1; i < combinedData.length; i++) {
    const prevRow = combinedData[i - 1];
    const currentRow = combinedData[i];
    prevRow.CanalBedLevel = prevRow.FSL - prevRow.FSD;
    currentRow.FSL = prevRow.FSL - currentRow.HeadLoss - currentRow.ProvidedSlope * (currentRow.RD - prevRow.RD);
    currentRow.CanalBedLevel = currentRow.FSL - currentRow.FSD;
  }

  // Print the header of the combined table
  console.log("RD | Table Name         | Head Loss | Provided Slope | FSL | FSD | Canal Bed Level");
  console.log("----------------------------------------------------------------------------------------");

  // Print each row of the combined table
  combinedData.forEach((row) => {
    console.log(
      `${row.RD} | ${row.TableName} | ${row.HeadLoss} | ${row.ProvidedSlope} | ${row.FSL} | ${row.FSD} | ${row.CanalBedLevel}`
    );
  });
}


// Function to add series to an existing chart
function addSeriesToChart(chart, combinedData) {
  // Extract data for the new series
  const rdValues = combinedData.map(row => row.RD);
  const fslValues = combinedData.map(row => row.FSL);
  const canalBedLevelValues = combinedData.map(row => row.CanalBedLevel);

  // Create new series data
  const seriesData1 = rdValues.map((rd, i) => [rd, fslValues[i]]);
  const seriesData2 = rdValues.map((rd, i) => [rd, canalBedLevelValues[i]]);

  // Remove existing series related to combinedData
  const seriesNamesToRemove = ['RD vs FSL', 'RD vs Canal Bed Level'];
  seriesNamesToRemove.forEach(name => {
    const series = chart.series.find(s => s.name === name);
    if (series) {
      series.remove(false); // Remove the series without redrawing immediately
    }
  });

  // Add Series 1 - RD vs FSL
  chart.addSeries({
      name: 'RD vs FSL',
      data: seriesData1,
      type: 'line',
      color: 'blue',
      marker: {
          symbol: 'circle',
          radius: 4
      },
  }, false); // Pass false to avoid immediate redraw

  // Add Series 2 - RD vs Canal Bed Level
  chart.addSeries({
      name: 'RD vs Canal Bed Level',
      data: seriesData2,
      type: 'line',
      color: 'brown',
      marker: {
          symbol: 'circle',
          radius: 4
      },
  }, false); // Pass false to avoid immediate redraw

  // Redraw the chart to apply all changes
  chart.redraw();
}



}
