// Google BSD license http://code.google.com/google_bsd_license.html
// Copyright 2011 Google Inc. johnjbarton@google.com

/*globals document window */

var optionsKey =  'DevtoolsExtended.options';

function saveOptions() {
  var options = restoreOptions() || {};
  options.extensionInfos = [];
  
  var extensionInfosRows = document.querySelectorAll('.extensionInfos-row');
  for (var i = 0; i < extensionInfosRows.length; i++) {
      if (extensionInfosRows[i].classList.contains('extensionInfo-template')) {
        continue;
      }
      var name = extensionInfosRows[i].querySelector('.extensionInfo-name').value;
      var startPage =  extensionInfosRows[i].querySelector('.extensionInfo-startPage').value;
      options.extensionInfos.push(
        {
          name: name,
          startPage: startPage
        }
      );
  }
  
  var debugConnection = document.getElementById('debugConnection');
  options.debugConnection = debugConnection.checked;

  var debugMessages = document.getElementById('debugMessages');
  options.debugMessages = debugMessages.checked;

  var debugWarnings = document.getElementById('debugWarnings');
  options.debugWarnings = debugWarnings.checked;
  
  var debugAdapters = document.getElementById('debugAdapters');
  options.debugAdapters = debugAdapters.checked;

  var stringified = JSON.stringify(options);
  window.localStorage.setItem(optionsKey, stringified);
  
  var warnReload = document.getElementById('warnReload');
  warnReload.classList.remove('hidden');  
}

function restoreOptions(defaultOptions) {
  var stringified = window.localStorage.getItem(optionsKey);
  var options;
  if (stringified) {
    try {
      options = JSON.parse(stringified);
      return options;
    } catch (exc) {
      // ignore corrupt data
    }  
  }
  if (defaultOptions) {
    var stringified = JSON.stringify(defaultOptions);
    window.localStorage.setItem(optionsKey, stringified);
    return defaultOptions;
  }
}