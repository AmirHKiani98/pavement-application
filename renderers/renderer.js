const { ipcRenderer } = require('electron');
// Send request from renderer to main.
const closeApp = document.getElementById('exit');
closeApp.addEventListener('click', () => {
    ipcRenderer.send('close-app');
});

const propertiesButton = document.getElementById("properties_button");

propertiesButton.addEventListener("click", () => {
    ipcRenderer.send("open-properties-window");
});

ipcRenderer.on("update-attributes", (event, args) => {
    asphaltThickness = parseFloat(args.thickness);
    asphlatLength = parseFloat(args.length);
    asphaltWidth = parseFloat(args.width);
    temparature = parseFloat(args.temparature);
    thermal_coefficient = parseFloat(args.thermal_coefficient);
    k_modules = parseFloat(args.k_modules);
    console.log(asphaltThickness, asphaltWidth, asphlatLength)
    var properties = {
        asphlatLength: asphlatLength,
        asphaltWidth: asphaltWidth,
        asphaltThickness: 0.1,
        mainThickness: asphaltThickness,
        temparature: temparature,
        thermal_coefficient: thermal_coefficient,
        k_modules: k_modules

    };
    window.makeAsphalt(properties);
})