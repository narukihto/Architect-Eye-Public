/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.8 - FULL AUTONOMY)
 * -------------------------------------------------------------------------
 * Updates: Autonomous threat counter (starts at 0), decoupled state sync.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0; // Starts from absolute zero

/**
 * 1. Global Navigation Controller
 * Handles smooth transition between system views.
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
 * 2. Autonomous Threat Counter
 * Incrementally increases the threat count locally to simulate live neutralization.
 */
function startLiveThreatCounter() {
    setInterval(() => {
        threatCount += Math.floor(Math.random() * 3);
        const counterElement = document.getElementById('threat-count');
        if (counterElement) {
            counterElement.innerText = threatCount;
        }
    }, 1500);
}

/**
 * 3. Deep Backend Synchronization
 * Synchronizes core operational status from the public repository status file.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        systemStatus.state = data.includes('CRITICAL') ? 'CRITICAL' : 'OPERATIONAL';
        updateUI();
    } catch (e) { 
        console.warn("Backend Sync Standby..."); 
    }
}

/**
 * 4. UI Orchestrator
 * Updates DOM elements based on verified system state.
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) statusFeed.innerText = `CORE: ${systemStatus.state} | PROTECTED`;
    
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
    });
}

/**
 * 5. 3D Environment Rendering (Three.js)
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
 * 6. Hive Mind Initialization
 */
function initHiveMind() {
    if (!hiveContainer) return;
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span>ACTIVE</span><br><small>ID:${Math.random().toString(36).substring(7).toUpperCase()}==</small>`;
        node.onclick = () => {
            alert(`[Protocol-Validated]\nAgent-${i} Signature: 0x${Math.random().toString(16).slice(2, 10)}\nStatus: ${systemStatus.state}`);
        };
        hiveContainer.appendChild(node);
    }
}

// System Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    startLiveThreatCounter(); // Starts from 0 autonomously
    syncSystemStatus();
    setInterval(syncSystemStatus, 3000); // Sync core state every 3 seconds
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
