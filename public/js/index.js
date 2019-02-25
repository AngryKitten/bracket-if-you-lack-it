let safeMode;

(function() {
  safeMode = localStorage.getItem('safeMode');
  safeMode = safeMode === null ? 'false' : safeMode;
  setSafeModeDisplay();
})();

document.getElementById('safe-mode-trigger').addEventListener('click', () => {
  safeMode = safeMode === 'false' ? 'true' : 'false';
  localStorage.setItem('safeMode', safeMode);
  setSafeModeDisplay();
});

function setSafeModeDisplay() {
  if (safeMode === 'false') {
    document.getElementById('safe-mode-trigger').innerHTML = 'Enable Run Safe Mode';
  } else {
    document.getElementById('safe-mode-trigger').innerHTML = 'Disable Run Safe Mode';
  }
}
