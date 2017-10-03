$(document).ready(function () {
  tableau.extensions.initializeAsync().then(function () {
    let dataSourceFetchPromises = [];

    // Maps dataSource id to dataSource so we can keep track of unique dataSources.
    let dashboardDataSources = {};

    // To get dataSource info, first get the dashboard.
    const dashboard = tableau.extensions.dashboardContent.dashboard;

    // Loop through each worksheet and get its datasources, save promise for later.
    dashboard.worksheets.forEach(function (worksheet) {
      dataSourceFetchPromises.push(worksheet.getDataSourcesAsync());;
    });

    Promise.all(dataSourceFetchPromises).then(function (fetchResults) {
      fetchResults.forEach(function (dataSourcesForWorksheet) {
        dataSourcesForWorksheet.forEach(function (dataSource) {
          if (!dashboardDataSources[dataSource.id]) {
            dashboardDataSources[dataSource.id] = dataSource;
          }
        });
      });

      buildDataSourcesTable(dashboardDataSources);
    });
  }, function (err) {
    // Something went wrong in initialization
    console.log('Error while Initializing: ' + err.toString());
  });
});

function refreshDataSource(dataSource) {
  dataSource.refreshAsync().then(function () {
    console.log(dataSource.name + ': Refreshed Successfully');
  });
}

function showModal(dataSource) {
  var modal = $('#infoModal');

  $('#nameDetail').html(dataSource.name);
  $('#idDetail')[0].innerHTML = dataSource.id;
  $('#typeDetail')[0].innerHTML = (dataSource.isExtract) ? 'Extract' : 'Live';

  var fieldNamesStr = '';
  dataSource.fields.forEach(function (field) {
    fieldNamesStr += field.name + ', ';
  });

  // Slice of the last ", " for formatting.
  $('#fieldsDetail')[0].innerHTML = fieldNamesStr.slice(0, -2);

  modal.modal('show');
}

function buildDataSourcesTable(dataSources) {
  // Clear the table first.
  $('#dataSourcesTable > tbody tr').remove();
  const dataSourcesTable = document.getElementById('dataSourcesTable').getElementsByTagName('tbody')[0];

  // Add an entry to the dataSources table for each dataSource.
  for (dataSourceId in dataSources) {
    const dataSource = dataSources[dataSourceId];
    
    let newRow = dataSourcesTable.insertRow(dataSourcesTable.rows.length);
    let nameCell = newRow.insertCell(0);
    let refreshCell = newRow.insertCell(1);
    let infoCell = newRow.insertCell(2);

    let refreshButton = document.createElement('button');
    refreshButton.innerHTML = 'Refresh Now';
    refreshButton.type = 'button';
    refreshButton.className = 'btn btn-primary';

    let refreshFunction = function() { refreshDataSource(dataSource); };
    refreshButton.addEventListener('click', refreshFunction);

    let infoSpan = document.createElement('span');
    infoSpan.className = 'glyphicon glyphicon-info-sign';

    let showModalFunction = function() { showModal(dataSource); };
    infoSpan.addEventListener('click', showModalFunction);

    nameCell.innerHTML = dataSource.name;
    refreshCell.appendChild(refreshButton);
    infoCell.appendChild(infoSpan);
  };
}