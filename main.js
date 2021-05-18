const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        },
        // Make require workds in renderers
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        // To make it fullscreen
        fullscreen: true,
        frame: false,
    })
    win.on("minimize", () => app.quit());
    win.loadFile('pages/index.html')
}
// How to make request from rendere to main
ipcMain.on("close-app", () => app.quit())

app.whenReady().then(() => {
    createWindow()

    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) {
    //         createWindow()
    //     }
    // })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})