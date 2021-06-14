const { ipcRenderer } = require('electron');
// Send request from renderer to main.
const closeApp = document.getElementById('exit');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('close-app')
});