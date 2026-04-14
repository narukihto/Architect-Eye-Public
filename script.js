/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.0 - BLUE MATRIX)
 * -------------------------------------------------------------------------
 * Architecture: Optimized 3D Cube Swarm + Sovereign CubeMap Environment
 * Status: Blue Matrix Operational
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let currentSystemState = 'OPERATIONAL';

/**
 * Initializes the 3D Sovereign Environment
 * 1. Loads the 6 space images (CubeMap)
 * 2. Initializes the Blue Matrix (Cube Swarm)
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- INTEGRATION: Sovereign Space CubeMap ---
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('space/'); // Ensure files are in this folder

    scene.background = loader.load([
        'px.jpg', 'nx.jpg', 
        'py.jpg', 'ny.jpg', 
        'pz.jpg', 'nz.jpg'
    ]);

    // --- BLUE MATRIX: Cube Swarm Protocol ---
    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0x00d4ff, 
        wireframe: true,
        transparent: true,
        opacity: 0.7 
    });

    for(let i = 0; i < 20; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random()*10-5, Math.random()*10-5, Math.random()*-10);
        scene.add(cube);
        cubeSwarm.push(cube);
    }

    animateSwarm();
}

/**
 * Main Animation Loop: The Blue Matrix Rotation
 */
function animateSwarm() {
    requestAnimationFrame(animateSwarm);
    
    // Animate individual cubes in the matrix
    cubeSwarm.forEach((cube, index) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        
        // Pulse effect based on system state
        const pulse = currentSystemState === 'CRITICAL' ? Math.sin(Date.now() * 0.01) * 0.5 : 0;
        cube.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    });
    
    renderer.render(scene, camera);
}

// --- Agent Hive Logic ---
function initHiveMind() {
    hiveContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span class="status">ACTIVE</span>`;
        node.addEventListener('click', () => {
            alert(`[Authorized] Agent-${i} System Secure.`);
        });
        hiveContainer.appendChild(node);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
