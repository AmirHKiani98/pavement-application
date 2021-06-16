import { getWidth, getLength, getDepth, getProperties } from "./test_threed.js";
export { maxEdgeCurling, maxInteriorCurling }

function maxInteriorCurling() {
    var length = getLength();
    var width = getWidth();
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    var temp_diff = getProperties().temparature;
    var temp_coeff = getProperties().thermal_coefficient * (10 ** (-6));
    updateResult(curling_stress_center(length, width, k_modules, depth, temp_diff, temp_coeff), "psi");
}

function maxEdgeCurling() {
    var length = getLength();
    var width = getWidth();
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    var temp_diff = getProperties().temparature;
    var temp_coeff = getProperties().thermal_coefficient * (10 ** (-6));
    updateResult(curling_stress_edge(length, k_modules, depth, temp_diff, temp_coeff), "psi");
}


function updateResult(result, unit) {
    var resultShow = document.getElementById("show_result");
    resultShow.innerHTML = Math.round(result * 100) / 100 + " " + unit;
}
maxEdgeCurling();