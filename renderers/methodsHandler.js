import { getWidth, getLength, getDepth, getProperties, getLoadProperties } from "./test_threed.js";

export function maxInteriorCurling() {
    var length = getLength();
    var width = getWidth();
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    var temp_diff = getProperties().temparature;
    var temp_coeff = getProperties().thermal_coefficient * (10 ** (-6));
    updateResult(curling_stress_center(length, width, k_modules, depth, temp_diff, temp_coeff), "psi");
}

export function maxEdgeCurling() {
    var length = getLength();
    var width = getWidth();
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    var temp_diff = getProperties().temparature;
    var temp_coeff = getProperties().thermal_coefficient * (10 ** (-6));
    updateResult(curling_stress_edge(length, k_modules, depth, temp_diff, temp_coeff), "psi");
}

export function westergardCornerStress() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(westergaard_corner_loading_stress(load, diameter, k_modules, depth), "psi")
}

export function ioannidesCornerStress() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(loanides_corner_loading_stress(load, diameter, k_modules, depth), "psi");
}

export function westergardCornerDeflection() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(westergaard_corner_loading_deflection(load, diameter, k_modules, depth), "in", 4);
}

export function ioannidesCornerDeflection() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(loanides_corner_loading_deflection(load, diameter, k_modules, depth), "in", 4);
}

export function westergardInteriorStress() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(interior_loading_stress(load, diameter, k_modules, depth), "psi");
}

export function westergardInteriorDeflection() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(interior_loading_deflection(load, diameter, k_modules, depth), "in", 4);
}

export function westergardEdgeStressCircle() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(edge_loading_stress_circle(load, diameter, k_modules, depth), "psi");
}

export function westergardEdgeDeflectionCircle() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(edge_loading_deflection_circle(load, diameter, k_modules, depth), "in", 4);
}

export function westergardEdgeStressSemiCircle() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(edge_loading_stress_semicircle(load, diameter, k_modules, depth), "psi");
}

export function westergardEdgeDeflectionSemiCircle() {
    var load = getLoadProperties().load_amount;
    var diameter = getLoadProperties().diameter;
    var depth = getProperties().mainThickness;
    var k_modules = getProperties().k_modules;
    updateResult(edge_loading_deflection_semicircle(load, diameter, k_modules, depth), "in", 4);
}

function updateResult(result, unit, decimal = 2) {
    var resultShow = document.getElementById("show_result");
    var decimal = 10 ** decimal;
    resultShow.innerHTML = Math.round(result * decimal) / decimal + " " + unit;
}