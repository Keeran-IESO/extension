'use strict';

// Wrap everything in an anonymous function to avoid poluting the global namespace
(function () {
  $(document).ready(function () {
    tableau.extensions.initializeAsync().then(function () {
      // First, check for any saved settings and populate our UI based on them.
      buildSettingsTable(tableau.extensions.settings.getAll());
    }, function (err) {
      // Something went wrong in initialization
      console.log('Error while Initializing: ' + err.toString());
    });

    $('#save').click(saveSetting);
  });

  function eraseSetting (key, row) {
    // This change won't be persisted until settings.saveAsync has been called.
    tableau.extensions.settings.erase(key);

    // Remove the setting from the UI immediately.
    row.remove();

    // Save in the background, saveAsync results don't need to be handled immediately.
    tableau.extensions.settings.saveAsync().then();
  }

  function buildSettingsTable (settings) {
    // Clear the table first.
    $('#settingsTable > tbody tr').remove();
    const settingsTable = $('#settingsTable > tbody:first');

    // Add an entry to the settings table for each settings.
    for (const settingKey in settings) {
      let newRow = settingsTable.insertRow(settingsTable.rows.length);
      let keyCell = newRow.insertCell(0);
      let valueCell = newRow.insertCell(1);
      let eraseCell = newRow.insertCell(2);

      let eraseSpan = document.createElement('span');
      eraseSpan.className = 'glyphicon glyphicon-trash';
      eraseSpan.addEventListener('click', function () { eraseSetting(settingKey, newRow); });

      keyCell.innerHTML = settingKey;
      valueCell.innerHTML = settings[settingKey];
      eraseCell.appendChild(eraseSpan);
    }
  }

  function saveSetting () {
    var settingKey = $('#keyInput').val();
    var settingValue = $('#valueInput').val();

    tableau.extensions.settings.set(settingKey, settingValue);

    // Save the newest settings via the settings API.
    tableau.extensions.settings.saveAsync().then((currentSettings) => {
      // This promise resolves to a list of the current settings.
      // Rebuild the UI with that new list of settings.
      buildSettingsTable(currentSettings);

      // Clears the settings of content.
      $('#settingForm').get(0).reset();
    });
  }
})();
