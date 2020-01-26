///
/// gitmoon - A demo projects for segfault-trainings Git workshop
///
/// Licensed under Creative Commons Attribution Share Alike 4.0 International
/// See https://github.com/segfault-trainings/gitworkshop/blob/master/LICENSE
///
"use strict";

// context for all "global" three.js objects
let ctx = {
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000),
    renderer: new THREE.WebGLRenderer({ antialias: true }),
    textureLoader: new THREE.TextureLoader(),
    moons: [],
};

// create moons
new Moon("green");

// Function to setup the scene for our awesome moons :)
setup();
function setup() {
    // setup the scene, camera and renderer
    ctx.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( ctx.renderer.domElement );
    new THREE.OrbitControls( ctx.camera, ctx.renderer.domElement );
    ctx.camera.position.z = 10;

    // set space background
    var spaceGeometry = new THREE.SphereGeometry(500, 50, 50);
    var spaceMaterial = new THREE.MeshPhongMaterial({
      map: ctx.textureLoader.load(spaceImage),
      side: THREE.DoubleSide,
      shininess: 0
    });
    var space = new THREE.Mesh(spaceGeometry, spaceMaterial);
    ctx.scene.add(space);

    // create an ambient lighting
    let ambientLight = new THREE.AmbientLight(0x888888)
    ctx.scene.add(ambientLight);

    // create a directional lighting
    let directionalLight = new THREE.DirectionalLight(0xFDFCF0, 1)
    directionalLight.position.set(20, 10, 20)
    ctx.scene.add(directionalLight);

    // create a renderer for our scene
    let render = function() {
        ctx.moons.forEach(function(moon, i) {
            // rotate the moon on the X- and Y-Axis
            moon.rotation.x += 0.005;
            moon.rotation.y += 0.005;

            // position the moon according to its index in the moon-registry
            moon.position.x = -5 * i;
            moon.position.z = -5 * i;
        });

	ctx.renderer.render(ctx.scene, ctx.camera);
        requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
};

// Function to create a new moon on the scene
function Moon(color) {
    // create the moon gemoetry
    let geometry = new THREE.SphereGeometry(2, 50, 50);
    // load moon textures
    let moonTexture = ctx.textureLoader.load(moonImage);
    let moonDisplacementMap = ctx.textureLoader.load(moondisplacementImage);
    // create the moon material
    let material = new THREE.MeshPhongMaterial({
        color: color,
        map: moonTexture,
        displacementMap: moonDisplacementMap,
        displacementScale: 0.06,
        bumpMap: moonDisplacementMap,
        bumpScale: 0.04,
        specular: 0x333333,
        shininess: 25,
    });

    let moon = new THREE.Mesh(geometry, material);
    ctx.moons.push(moon);
    ctx.scene.add(moon);
    return moon;
};

window.addEventListener("resize", onWindowResize, false);

function onWindowResize() {
    ctx.camera.aspect = window.innerWidth / window.innerHeight;
    ctx.camera.updateProjectionMatrix();
    ctx.renderer.setSize(window.innerWidth, window.innerHeight);
}
