/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.4 - SYNCHRONIZED)
 * -------------------------------------------------------------------------
 * Updates: Global Navigation, Dynamic Backend Sync, UI State Orchestration.
 */

const hiveContainer = document.getElementById('hive-visualization'); // Updated container ID
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL', threats: 0 };

/**
 * 1. Global Navigation Controller
 * Handles view switching between Gateway, Dashboard, and Info views.
 */
window.navigateTo = function(viewId) {
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'flex';
    }
};

/**
 * 2. Deep Backend Sync
 * Fetches status from root/status.txt to update system state.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        const parts = data.split('|');
        systemStatus.state = parts[0].includes('CRITICAL') ? 'CRITICAL' : 'OPERATIONAL';
        systemStatus.threats = parts[1] ? parts[1].split(':')[1].trim() : 0;
        
        updateUI();
    } catch (e) { console.warn("Backend Sync Pending..."); }
}

/**
 * 3. State-Driven UI Orchestrator
 * Updates DOM elements based on the current system status.
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    const threatCount = document.getElementById('threat-count');
    
    if (statusFeed) statusFeed.innerText = `CORE: ${systemStatus.state} | PROTECTED`;
    if (threatCount) threatCount.innerText = systemStatus.threats;
    
    // Update node styles dynamically
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
    });
}

/**
 * 4. 3D Environment (Three.js)
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
    
    for(let i = 0; i < 12; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random()*10-5, Math.random()*10-5, Math.random()*-10);
        scene.add(cube);
        cubeSwarm.push(cube);
    }
    animateSwarm();
}

function animateSwarm() {
    requestAnimationFrame(animateSwarm);
    cubeSwarm.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        const scale = systemStatus.state === 'CRITICAL' ? 1.5 : 1;
        cube.scale.set(scale, scale, scale);
    });
    renderer.render(scene, camera);
}

/**
 * 5. Hive Mind Initialization
 */
function initHiveMind() {
    if (!hiveContainer) return;
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span>ACTIVE</span>`;
        node.onclick = () => {
            alert(`[Level-0 Authorized]\nAgent-${i} Signature: 0x${Math.random().toString(16).slice(2, 10)}\nStatus: ${systemStatus.state}`);
        };
        hiveContainer.appendChild(node);
    }
}

// Initialization Logic
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    syncSystemStatus();
    setInterval(syncSystemStatus, 3000);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
