const { ipcRenderer } = require('electron');

const confirmProperties = document.getElementById("confirm");
confirmProperties.addEventListener("click", () => {
    data = getProperties();
    console.log(data);
    ipcRenderer.send("ok-load-properties", data);
});

function getProperties() {

    const load_amount = document.getElementById("load_amount").value;
    const diameter = document.getElementById("diameter").value;

    data = {
        load_amount: load_amount,
        diameter: diameter,

    };
    return data;
}