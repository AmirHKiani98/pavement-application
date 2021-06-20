import * as THREE from '../assets/three.module.js';
import Stats from '../assets/stats.module.js';
const plan = document.getElementById("left_side")
import { OrbitControls } from '../assets/OrbitControls.js';
import { TWEEN } from "../assets/tween.module.min.js"
var scene = new THREE.Scene()
scene.background = new THREE.Color(0x44287f5)
var camera = new THREE.PerspectiveCamera(75, plan.offsetWidth / plan.offsetHeight, 0.1, 1000)
var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(plan.offsetWidth, plan.offsetHeight);
var asphaltTemp;
export { getWidth, getDepth, getLength, makeAsphalt, getProperties, getLoadProperties }
// camera.aspect = plan.offsetWidth / plan.offsetHeight;
// camera.updateProjectionMatrix();
// renderer.setSize(plan.offsetWidth, plan.offsetHeight)

var control = new OrbitControls(camera, renderer.domElement);
// control.enableRotate = false;
const baseCameraLook = control.position0;

plan.appendChild(renderer.domElement);
var firstCameraPosition = camera.position;
firstCameraPosition = { x: 10, y: 20, z: 30 }
camera.position.z = firstCameraPosition.z
camera.position.y = firstCameraPosition.y
camera.lookAt(baseCameraLook)

// Properties
const loadProperties = {
    load_amount: 10000,
    diameter: 6
}




window.mainProperties = {
    asphlatLength: 300,
    asphaltThickness: 0.1,
    asphaltWidth: 144,
    mainThickness: 10,
    temparature: 20,
    thermal_coefficient: 5,
    k_modules: 100

};

const lights = [];
var allShapes = [];
var allVectors = [];
var transverseRebars = [];
var triangles = [];


const intensity = 0.4;

lights[0] = new THREE.PointLight(0xffffff, intensity, 0);
lights[1] = new THREE.PointLight(0xffffff, intensity + 0.1, 0);
lights[2] = new THREE.PointLight(0xffffff, intensity, 0);

lights[0].position.set(0, 10, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

function preview() {
    // Make Asphalt
    makeAsphalt(window.mainProperties);
    // console.log(light);

    // Tween
    // var tween = new TWEEN.Tween(camera.position).to({ x: 20, y: 20, z: 20 }, 20000)

    // function tweenUpdateFunction(tweenOutput) {
    //     camera.lookAt(control.position0)
    // }
    // tween.onUpdate(tweenUpdateFunction)
    // tween.start()
}


// Add Light to the scene

const whiteColor = 0xFFFFFF;
const light = new THREE.AmbientLight(whiteColor, intensity);
light.position.set(-1, 2, 4);




// steps
preview();

function update() {

}

function render() {
    renderer.render(scene, camera);
}

function GameLoop() {
    requestAnimationFrame(GameLoop);
    update();
    render();
    TWEEN.update()
}
window.addEventListener("resize", onWindowResize)

function onWindowResize() {
    camera.aspect = plan.offsetWidth / plan.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(plan.offsetWidth, plan.offsetHeight)
}
window.addEventListener("mousemove", onMouseMove)

function onMouseMove(event) {

    // vec.set(
    //     (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1,
    //     0.5);
    // console.log(vec)
}
// Making full Cube
function makingFullCube(width, height, depth, color, emissive, flatShading) {
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshPhongMaterial({ color: color, emissive: emissive, side: THREE.DoubleSide, flatShading: flatShading });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}
// Making Empty Cube
function makingEmptyCube(width, height, depth, wireframe = false) {
    var geometry = new THREE.BoxGeometry(width, height, depth);
    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0xffffff }));
    scene.add(line);
    allShapes.push(line);
    return geometry;
}



// Making Cylinder
function makingCylinder(radius, height, color, wireframe) {
    // Make Geometry
    var geometry = new THREE.CylinderGeometry(radius, radius, height, 64);
    // var cubeMaterials = [
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Right
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Left
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Top
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Bottom
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Front
    //     new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load("../three/examples/textures/cube/Park3Med/ny.jpg"), side: THREE.DoubleSide }), // Back
    // ];
    // Material
    var material = new THREE.MeshBasicMaterial({ color: color, wireframe: wireframe });
    // var material = new THREE.MeshFaceMaterial(cubeMaterials)
    const cube = new THREE.Mesh(geometry, material);
    cube.rotateX(Math.PI / 2)
    scene.add(cube)
    return (cube)
}
window.addEventListener("click", onMouseClick)
var i = 1

function onMouseClick() {

}




function makeAsphalt(properties, ignoreChangeCamera = false) {
    window.mainProperties = properties;
    updateUlList();
    clearCanvas();
    if (!ignoreChangeCamera) {
        changeCameraPosition(firstCameraPosition)
    }
    var asphalt = makingFullCube(properties.asphlatLength, properties.asphaltThickness, properties.asphaltWidth, 0x807E78, 0x5c5e58, true);
    asphaltTemp = asphalt
    var asphaltLength = asphalt.geometry.parameters.width;
    makeMiddleLine(asphaltLength);
    var asphlatWidth = asphalt.geometry.parameters.height;
    var asphaltDepth = asphalt.geometry.parameters.depth;

    var baseCourse = makeBaseCourse(asphlatWidth, asphaltLength, asphaltDepth);
    var baseCourseWidth = baseCourse.geometry.parameters.height;
    var subBaseCourse = makeSubBase(asphlatWidth, asphaltLength, asphaltDepth, baseCourseWidth)
    allShapes.push(asphalt)
    allShapes.push(baseCourse)
    allShapes.push(subBaseCourse)
}
window.makeAsphalt = makeAsphalt;

function makeMiddleLine(asphaltLength) {
    const gap = Math.min(0.05 * asphaltLength, 0.5)
    const middleLength = Math.max(0.1 * asphaltLength, 3)
    const numberOfMiddles = (asphaltLength) / (middleLength + gap)
    console.log(getDepth());
    for (let i = 0; i < numberOfMiddles; i++) {
        var checkPoint = (((middleLength - asphaltLength) / 2) + (gap + middleLength) * i) + middleLength / 2;
        if (checkPoint > asphaltLength / 2) {
            var remain = checkPoint - asphaltLength / 2;
            var newLength = middleLength - remain;
            var middle = makingFullCube(newLength, 0.11, getWidth() * 0.05, 0xFFFFFF, 0xFFFFFF, true);
            middle.position.x = (asphaltLength - newLength) / 2;
            allShapes.push(middle)
            continue;
        }
        var middle = makingFullCube(middleLength, 0.11, getWidth() * 0.05, 0xFFFFFF, 0xFFFFFF, true);
        allShapes.push(middle)
        middle.position.x = ((middleLength - asphaltLength) / 2) + (gap + middleLength) * i;
    }
}

function makeBaseCourse(asphlatWidth, asphaltLength, asphaltDepth) {
    var baseCourseWidth = asphlatWidth * 4;
    var baseCourse = makingFullCube(asphaltLength, baseCourseWidth, asphaltDepth, 0x949494, 0x949494, true);
    baseCourse.position.y = -1 * (asphlatWidth + baseCourseWidth / 2);
    return baseCourse;
}

function makeSubBase(asphlatWidth, asphaltLength, asphaltDepth, baseCourseWidth) {
    var subBaseCourseWidth = asphlatWidth * 4;
    var subBaseCourse = makingFullCube(asphaltLength, subBaseCourseWidth, asphaltDepth, 0x3d3121, 0x3d3121, true);
    subBaseCourse.position.y = -1 * (asphlatWidth + baseCourseWidth + subBaseCourseWidth / 2);
    return subBaseCourse
}

// Make transparentAsphalt
function transparentAsphalt() {
    clearCanvas();
    changeCameraPosition({ x: -1 * firstCameraPosition.x, y: firstCameraPosition.y, z: firstCameraPosition.z })
    var transparentAsphalt = makingEmptyCube(window.mainProperties.asphlatLength, window.mainProperties.asphaltThickness * 20, window.mainProperties.asphaltWidth)
    allShapes.push(transparentAsphalt);
    asphaltTemp = transparentAsphalt;
    addingRebers(6, 0.1, 5);
    const triangle = makingTriangle(-21, 22, 11);
    const line = makingForceVector(-25, 20);
    allShapes.push(triangle);
    allShapes.push(line);
    makeRebarForce(transverseRebars, triangle);
    // console.log(getPointsFromFloat32(triangle.geometry.attributes.position.array));
}

function addingRebers(distance, degree, bottomDistance) {
    var asphaltLength = asphaltTemp.parameters.width;
    var fisrtPosition = -1 * asphaltLength + bottomDistance;
    // var cylinder = makingCylinder(0.1, properties.asphaltWidth, 20, true);
    var i = 0
    while (distance * i + bottomDistance < 1 * asphaltLength) { // equlas to (-1 * asphaltLength + distance < asphaltLength/2)
        var cylinder = makingCylinder(degree, window.mainProperties.asphaltWidth, 2, true);
        cylinder.position.x = -1 * (asphaltLength / 2) + distance * i + bottomDistance;
        allShapes.push(cylinder);
        transverseRebars.push(cylinder);
        i += 1;
    }
    allShapes.push(cylinder);
}
// Adding force vector
function makingForceVector(xPosition, forceAmount) {
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    if (asphaltTemp.geometry !== undefined) {
        var asphaltWidth = asphaltTemp.geometry.parameters.height;
    } else {
        var asphaltWidth = asphaltTemp.parameters.height;
    }
    const vec1 = new THREE.Vector3(xPosition, forceAmount, 0);
    const vec2 = new THREE.Vector3(xPosition, 0, 0);
    const points = [];
    points.push(vec1);
    points.push(vec2);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    // allVectors.push(line);
    // allShapes.push(line);
    scene.add(line);
    return line;
}

// Making Triangle
function makingTriangle(xPosition0, maxForce, xPosition1) {
    const material = new THREE.LineBasicMaterial({
        color: 0xffffff
    });
    if (asphaltTemp.geometry !== undefined) {
        var asphaltLength = asphaltTemp.geometry.parameters.width;
    } else {
        var asphaltLength = asphaltTemp.parameters.width;
    }
    const points = [];
    const vec1 = new THREE.Vector3(xPosition0, 0, 0);
    const vec2 = new THREE.Vector3(xPosition0, -maxForce * 2, 0);
    const vec3 = new THREE.Vector3(xPosition1, 0, 0);
    const vec4 = new THREE.Vector3(xPosition0, 0, 0);
    points.push(vec1);
    points.push(vec2);
    points.push(vec3);
    points.push(vec4);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const triangle = new THREE.Line(geometry, material);
    // allShapes.push(triangle);
    // triangles.push(triangle);
    scene.add(triangle);
    return triangle;
}

function getPointsFromFloat32(float32) {
    const allPoints = [];
    var i = 0;
    var tempArray = [];
    float32.forEach(element => {
        i++;
        if (i % 3 == 0) {
            tempArray.push(element);
            allPoints.push(tempArray);
            tempArray = [];
        } else {
            tempArray.push(element);
        }
    });
    return allPoints;
}

function makeRebarForce(trasverseRebar, triangle) {
    // console.log(trasverseRebar);
    var getFloat = getPointsFromFloat32(triangle.geometry.attributes.position.array);
    // console.log(getFloat);
    var firstXPoint = getFloat[0][0];
    var secondXPoint = getFloat[2][0];
    var zPoint = getFloat[1][1];
    if (firstXPoint > secondXPoint) {
        var bigger = firstXPoint;
        var smaller = secondXPoint;
    } else {
        var bigger = secondXPoint;
        var smaller = firstXPoint;
    }
    trasverseRebar.forEach(element => {
        let xCalc = element.position.x;
        if (xCalc < bigger && xCalc > smaller) {
            let y = getRebarForce(firstXPoint, secondXPoint, zPoint, xCalc);
            makeVerticalVector(xCalc, y);
        }
    });
}

function makeVerticalVector(x, y) {
    var material = new THREE.LineBasicMaterial({ color: 0xFF0000 });
    var vec1 = new THREE.Vector3(x, 0, 0);
    var vec2 = new THREE.Vector3(x, y, 0);
    const points = [];
    points.push(vec1);
    points.push(vec2);

    var geometry = new THREE.BufferGeometry().setFromPoints(points);
    var line = new THREE.Line(geometry, material);
    scene.add(line);
    allShapes.push(line);
    return line;
}

function getRebarForce(xFirst, xSecond, z, xCalc) {
    // console.log("z", z);
    // console.log("xFirst", xFirst);
    // console.log("xSecond", xSecond);
    // console.log("xCalc", xCalc);
    // if (xFirst > xSecond) {
    //     var bigger = xFirst;
    //     var smaller = xSecond;
    // } else {
    //     var bigger = xSecond;
    //     var smaller = xFirst;
    // }
    return z * (xSecond - xCalc) / (xSecond - xFirst);
}

// Change Camera Postion
function changeCameraPosition(final) {
    var tween = new TWEEN.Tween(camera.position).to(final, 200).start();
    tween.onUpdate(function() {
        camera.lookAt(baseCameraLook);
    })
}

function clearCanvas() {
    resetCameraSettings();
    for (let i = 0; i < allShapes.length; i++) {
        let element = allShapes[i]
        scene.remove(element)
    }
    transverseRebars = [];
    allShapes = [];
}


function upSideView() {
    clearCanvas();
    makeAsphalt(window.mainProperties, true);
    var theCaclulatedRadian = 0.694738276;
    if (asphaltTemp.geometry !== undefined) {
        var asphaltLength = asphaltTemp.geometry.parameters.width;
    } else {
        var asphaltLength = asphaltTemp.parameters.width;
    }
    var calcY = ((1.6 * asphaltLength) / 2) / Math.tan(theCaclulatedRadian);
    changeCameraPosition({ x: 0, y: calcY, z: 0 });
    control.enableRotate = false;
    control.enableZoom = true;
    addLengthText();
    addWidthText();
}
// camera.ena

function resetCameraSettings() {
    control.enableRotate = true;
    control.enableZoom = true;
}
// Listeners
document.getElementById("transparent_mode").addEventListener("click", transparentAsphalt)
document.getElementById("normal_mode").addEventListener("click", preview)
document.getElementById("check_stresses").addEventListener("click", upSideView)


// TextGeometry

function addLengthText() {
    const fontLoader = new THREE.FontLoader();
    var font = new THREE.Font();
    var length = asphaltTemp.geometry.parameters.width;
    fontLoader.load("../fonts/gentilis_bold.typeface.json", function(response) {
        font = response;
        var textGeometry = new THREE.TextGeometry("" + getLength(), {

            font: font,

            size: 3,
            height: 0.1,
            curveSegments: 1,

            bevelThickness: 0,
            bevelSize: 0.1,
            bevelEnabled: true

        });
        textGeometry.rotateX(-Math.PI / 2);
        var width = asphaltTemp.geometry.parameters.depth;
        textGeometry.center().translate(0, 0, -0.5 * getWidth() - 3);
        var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff });

        var mesh = new THREE.Mesh(textGeometry, textMaterial);

        scene.add(mesh);
        allShapes.push(mesh);
    })
}

function addWidthText() {
    const fontLoader = new THREE.FontLoader();
    var font = new THREE.Font();
    var width = asphaltTemp.geometry.parameters.depth;
    fontLoader.load("../fonts/gentilis_bold.typeface.json", function(response) {
        font = response;
        var textGeometry = new THREE.TextGeometry("" + width, {

            font: font,

            size: 3,
            height: 0.1,
            curveSegments: 1,

            bevelThickness: 0,
            bevelSize: 0.1,
            bevelEnabled: true

        });
        textGeometry.rotateX(-Math.PI / 2);
        textGeometry.rotateY(-Math.PI / 2);
        var length = asphaltTemp.geometry.parameters.width / 2;
        textGeometry.center().translate(length + 3, 0, 0);
        var textMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, specular: 0xffffff });
        console.log(asphaltTemp)

        var mesh = new THREE.Mesh(textGeometry, textMaterial);

        scene.add(mesh);
        allShapes.push(mesh);
    })
}

function updateLoadProperties(data) {
    loadProperties.load_amount = parseFloat(data.load_amount);
    loadProperties.diameter = parseFloat(data.diameter);
    console.log(loadProperties);
}
window.updateLoadProperties = updateLoadProperties;

function getLoadProperties() {
    return loadProperties;
}

function getLength() {
    if (asphaltTemp.geometry !== undefined) {
        var asphaltWidth = asphaltTemp.geometry.parameters.width;
    } else {
        var asphaltWidth = asphaltTemp.parameters.width;
    }
    return (asphaltWidth);
}

function getDepth() {
    if (asphaltTemp.geometry !== undefined) {
        var asphaltDepth = asphaltTemp.geometry.parameters.height;
    } else {
        var asphaltDepth = asphaltTemp.parameters.height;
    }
    return (asphaltDepth);
}

function getWidth() {
    if (asphaltTemp.geometry !== undefined) {
        var asphaltdepth = asphaltTemp.geometry.parameters.depth;
    } else {
        var asphaltdepth = asphaltTemp.parameters.depth;
    }
    return (asphaltdepth);
}

function getProperties() {
    return (mainProperties);
}

function updateUlList() {
    var ul = document.getElementById("attributes_lists");

    ul.innerHTML = "";
    var length = window.mainProperties.asphlatLength;
    var width = window.mainProperties.asphaltWidth;
    var thickness = window.mainProperties.mainThickness;
    var k_modules = window.mainProperties.k_modules;
    var temparature = window.mainProperties.temparature;
    var thermal_coefficient = window.mainProperties.thermal_coefficient;
    var element = document.createElement("li");
    element.innerHTML = "Length: " + length + " (in)";
    ul.appendChild(element)
    var element = document.createElement("li");
    element.innerHTML = "Width: " + width + " (in)";
    ul.appendChild(element)
    var element = document.createElement("li");
    element.innerHTML = "Thickness: " + thickness + " (in)";
    ul.appendChild(element)
    var element = document.createElement("li");
    element.innerHTML = "Subgrade Modules: " + k_modules + " (pci)";
    ul.appendChild(element)
    var element = document.createElement("li");
    element.innerHTML = "Temperature Difference: " + temparature + " (F)";
    ul.appendChild(element)
    var element = document.createElement("li");
    element.innerHTML = "Thremal Coefficient: " + thermal_coefficient + "<a href='Hi'> (1/F)</a>";
    ul.appendChild(element)
}
GameLoop();
// Test

// const triangleShape = new THREE.Shape()
//     .moveTo(-25, -25)
//     .lineTo(-25, 0)
//     .lineTo(10, 0)
//     .lineTo(-25, -25); // close path
// const geom = new THREE.ShapeGeometry(triangleShape);
// const material = new THREE.MeshLambertMaterial({ color: 0x123456, side: THREE.DoubleSide });
// const triangle = new THREE.Mesh(geom, material);
// scene.add(triangle);

// scene.add(triangle);