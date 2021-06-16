const { ipcRenderer } = require('electron');

const confirmProperties = document.getElementById("confirm");
confirmProperties.addEventListener("click", () => {
    data = getProperties();
    console.log(data);
    ipcRenderer.send("ok-properties", data);
});

function getProperties() {

    const length = document.getElementById("length").value;
    const width = document.getElementById("width").value;
    const thickness = document.getElementById("thickness").value;

    const temparature = document.getElementById("temparature").value;
    const k_modules = document.getElementById("k_modules").value;
    const thermal_coefficient = document.getElementById("thermal_coefficient").value;
    data = {
        length: length,
        width: width,
        thickness: thickness,
        temparature: temparature,
        k_modules: k_modules,
        thermal_coefficient: thermal_coefficient
    };
    return data;
}