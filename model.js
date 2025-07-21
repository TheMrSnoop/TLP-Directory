//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


export function LoadModel(url, cameraX, cameraZ) {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);

    let object;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const manager = new THREE.LoadingManager();

    manager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const percent = Math.round((itemsLoaded / itemsTotal) * 100);
        const LoadNotice = document.getElementById("LoadNotice");
        const Percentage = document.getElementById("Percentage");
        LoadNotice.style.visibility = "visible";
        if (Percentage) {
            Percentage.innerHTML = `${percent}%`;
        }
        console.log(`${percent}% loaded (${itemsLoaded}/${itemsTotal})`);
    };

    manager.onLoad = function () {
        const LoadNotice = document.getElementById("LoadNotice");
        const Percentage = document.getElementById("Percentage");
        Percentage.innerHTML = "0%";
        LoadNotice.style.visibility = "hidden";
    };

    manager.onError = function (url) {
        console.error(`failed loading: ${url}`);
    };

    const loader = new GLTFLoader(manager);


    function ToRadians(degrees) {
        let radians = degrees * (Math.PI / 180)
        return (radians)
    }

    let Percentage = document.getElementById("Percentage");

    //Loads the 3D model
    loader.load(
        url,
        function (gltf) {
            object = gltf.scene;
            object.position.set(0, 0, 0) // sets the initial transform
            scene.add(object);
        },
        undefined,
        function (error) {
            console.error(error);
        }
    );


    //Instantiate a new renderer and set its size
    const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
    renderer.setSize(window.innerWidth, window.innerHeight);

    //Adds the renderer to the specified div
    document.getElementById("WeaponModel").appendChild(renderer.domElement);

    //Camera transform
    camera.position.z = cameraZ;
    camera.position.x = cameraX;
    camera.rotation.y = ToRadians(90);


    //Adds lights to the scene
    const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
    topLight.position.set(500, 500, 500) //top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 5);
    scene.add(ambientLight);

    //Renders the scene
    function animate() {
        requestAnimationFrame(animate);

        //Allows the object to move on mouse inoput
        if (object) {
            //I've played with the constants here until it looked good 
            object.rotation.y = ToRadians(0) + mouseX / window.innerWidth * 1;
            object.rotation.x = ToRadians(0) + mouseY * 0.5 / window.innerHeight;
        }
        renderer.render(scene, camera);
    }

    //Add a listener to the window, so we can resize the window and the camera
    window.addEventListener("resize", function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    //add mouse position listener
    document.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }

    //Start the 3D rendering
    animate();
}