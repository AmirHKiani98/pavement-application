const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
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

    return win;
}
// How to make request from rendere to main
ipcMain.on("close-app", () => app.quit())
var propertiesWindow = null;
ipcMain.on("open-properties-window", () => {
    propertiesWindow = openChildWindow("pages/properties_page.html", win);
});
app.whenReady().then(() => {
    win = createWindow()

    // app.on('activate', () => {
    //     if (BrowserWindow.getAllWindows().length === 0) {
    //         createWindow()
    //     }
    // })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

ipcMain.on("ok-properties", (event, data) => {
    win.webContents.send("update-attributes", data);
    propertiesWindow.close();
})

function openChildWindow(pageAddress, parent) {
    childWindow = new BrowserWindow({
        width: 800,
        height: 600,
        parent: parent,
        modal: true,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    childWindow.setResizable(false);
    childWindow.loadFile(pageAddress);
    return childWindow;
}