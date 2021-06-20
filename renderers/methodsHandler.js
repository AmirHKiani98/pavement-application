import { getWidth, getLength, getDepth, getProperties, getLoadProperties } from "./test_threed.js";
export { maxEdgeCurling, maxInteriorCurling, westergardCornerStress }

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

function westergardCornerStress() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties.diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(westergaard_corner_loading_stress())
}

function updateResult(result, unit) {
    var resultShow = document.getElementById("show_result");
    resultShow.innerHTML = Math.round(result * 100) / 100 + " " + unit;
}