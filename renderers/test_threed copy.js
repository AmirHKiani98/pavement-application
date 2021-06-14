import * as THREE from '../three/build/three.module.js';
import Stats from '../three/examples/jsm/libs/stats.module.js';
const plan = document.getElementById("left_side")
import { OrbitControls } from '../three/examples/jsm/controls/OrbitControls.js';
import { TWEEN } from "../three/examples/jsm/libs/tween.module.min.js"
console.log(TWEEN)
var scene = new THREE.Scene()
scene.background = new THREE.Color(0x44287f5)
var camera = new THREE.PerspectiveCamera(75, plan.offsetWidth / plan.offsetHeight, 0.1, 1000)

var renderer = new THREE.WebGL1Renderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(plan.offsetWidth, plan.offsetHeight);

// camera.aspect = plan.offsetWidth / plan.offsetHeight;
// camera.updateProjectionMatrix();
// renderer.setSize(plan.offsetWidth, plan.offsetHeight)

var control = new OrbitControls(camera, renderer.domElement)

plan.appendChild(renderer.domElement);
camera.position.z = 30;
camera.position.y = 20;
camera.lookAt(control.position0)
console.log(control)

function preview() {

}
const lights = [];
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
var allCubes = [];
// Make Asphalt
makeAsphalt()

// Add Light to the scene

const whiteColor = 0xFFFFFF;
const light = new THREE.AmbientLight(whiteColor, intensity);
light.position.set(-1, 2, 4);

// console.log(light)

// Tween
var tween = new TWEEN.Tween(camera.position).to({ x: 20, y: 20, z: 20 }, 200)

function tweenUpdateFunction(tweenOutput) {
    camera.lookAt(control.position0)
}
tween.onUpdate(tweenUpdateFunction)
tween.start()

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
    console.log(plan.offsetWidth)
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
// Making Cube
function makingCube(width, height, depth, color, emissive, flatShading) {
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var material = new THREE.MeshPhongMaterial({ color: color, emissive: emissive, side: THREE.DoubleSide, flatShading: flatShading });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    return cube;
}


// Making Cylinder
function makingCylinder(radiusTop, radiusBottm, heigt, color, wireframe) {
    // Make Geometry
    var geometry = new THREE.BoxGeometry();
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
    // cube.rotateX(Math.PI / 2)
    scene.add(cube)
    return (cube)
}
window.addEventListener("click", onMouseClick)
var i = 1

function onMouseClick() {

}

function makeAsphalt() {
    var asphalt = makingCube(50, 0.1, 12, 0x807E78, 0x5c5e58, true);
    var asphaltLength = asphalt.geometry.parameters.width;
    makeMiddleLine(asphaltLength);
    var asphlatWidth = asphalt.geometry.parameters.height;
    var asphaltDepth = asphalt.geometry.parameters.depth;

    var baseCourse = makeBaseCourse(asphlatWidth, asphaltLength, asphaltDepth);
    allCubes.baseCourse = baseCourse
    var baseCourseWidth = baseCourse.geometry.parameters.height;
    var subBaseCourse = makeSubBase(asphlatWidth, asphaltLength, asphaltDepth, baseCourseWidth)




}

function makeMiddleLine(asphaltLength) {
    const gap = Math.min(0.05 * asphaltLength, 0.5)
    const middleLength = Math.min(0.1 * asphaltLength, 3)
    const numberOfMiddles = (asphaltLength) / (middleLength + gap)
    for (let i = 0; i < numberOfMiddles; i++) {
        var checkPoint = (((middleLength - asphaltLength) / 2) + (gap + middleLength) * i) + middleLength / 2;
        if (checkPoint > asphaltLength / 2) {
            var remain = checkPoint - asphaltLength / 2;
            var newLength = middleLength - remain;
            var middle = makingCube(newLength, 0.11, 0.5, 0xFFFFFF, 0xFFFFFF, true);
            middle.position.x = (asphaltLength - newLength) / 2;
            continue;
        }
        var middle = makingCube(middleLength, 0.11, 0.5, 0xFFFFFF, 0xFFFFFF, true);
        middle.position.x = ((middleLength - asphaltLength) / 2) + (gap + middleLength) * i;
    }
}

function makeBaseCourse(asphlatWidth, asphaltLength, asphaltDepth) {
    var baseCourseWidth = asphlatWidth * 4;
    var baseCourse = makingCube(asphaltLength, baseCourseWidth, asphaltDepth, 0x949494, 0x949494, true);
    baseCourse.position.y = -1 * (asphlatWidth + baseCourseWidth / 2);
    return baseCourse
}

function makeSubBase(asphlatWidth, asphaltLength, asphaltDepth, baseCourseWidth) {
    var subBaseCourseWidth = asphlatWidth * 4;
    var subBaseCourse = makingCube(asphaltLength, subBaseCourseWidth, asphaltDepth, 0x3d3121, 0x3d3121, true);
    subBaseCourse.position.y = -1 * (asphlatWidth + baseCourseWidth + subBaseCourseWidth / 2);
    return subBaseCourse
}
GameLoop();