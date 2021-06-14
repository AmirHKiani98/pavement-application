import * as THREE from '../three/build/three.module.js';

init()

function init() {
    // Get Background

    const plan = document.getElementById("left_side");
    // Get size

    var sizes = {
        width: plan.clientWidth,
        "heigth": plan.clientHeight
    }


    // Setup the scene
    const scene = new THREE.Scene();

    // Add cube to scene
    const geometry = new THREE.BoxGeometry(3, 1, 3)
    const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(0, 0, 0)
    scene.add(mesh)

    // Set Up lines
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionLight.position.set(10, 20, 0)
    scene.add(directionLight)

    // Camera
    const width = 10
    const heigth = width * (sizes.width / sizes.heigth)

    const camera = new THREE.OrthographicCamera(
        width / 2,
        width / 2,
        heigth / 2,
        heigth / 2,
        1,
        100
    );
    camera.position.set(4, 4, 4)
    camera.lookAt(0, 0, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(sizes.width, sizes.heigth)
    renderer.render(scene, camera)

    // Add to plan
    plan.appendChild(renderer.domElement)
}