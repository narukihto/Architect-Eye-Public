/**
 * ARCHITECT-EYE: THREE.JS CORE ENGINE
 * هذا الملف هو المسؤول عن رسم المكعبات في الخلفية.
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true }); // alpha: true ضروري للشفافية
    renderer.setSize(window.innerWidth, window.innerHeight);

    // إضافة مكعبات (Agent Swarm)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
    
    const cubeSwarm = [];
    for (let i = 0; i < 20; i++) {
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * -10);
        scene.add(cube);
        cubeSwarm.push(cube);
    }

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        cubeSwarm.forEach(cube => {
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        });
        renderer.render(scene, camera);
    }
    animate();
}
