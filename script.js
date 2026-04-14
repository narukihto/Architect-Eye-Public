/**
 * Architect-Eye: Sovereign Orchestration Engine (v3.0 - Full Integration)
 * Architecture: Hybrid 3D-Canvas (Three.js) + Reactive DOM Swarm
 * Status: Sovereign Operational State
 */

const hiveContainer = document.getElementById('hive-visualization');
let threatCount = 0;

// --- 3D Visualization Layer: The Golden Core ---
let scene, camera, renderer, coreSphere;
let currentSystemState = 'OPERATIONAL';

function init3DCore() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create the "Golden Core" of the Hive Mind
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffd700,
        emissive: 0xaa8800,
        transparent: true,
        opacity: 0.6
    });
    coreSphere = new THREE.Mesh(geometry, material);
    scene.add(coreSphere);

    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    animateCore();
}

function animateCore() {
    requestAnimationFrame(animateCore);
    
    // Core rotation and pulsating effect based on system threat level
    coreSphere.rotation.y += 0.005;
    const pulse = Math.sin(Date.now() * 0.003) * (currentSystemState === 'CRITICAL' ? 0.3 : 0.05);
    coreSphere.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    
    renderer.render(scene, camera);
}

// --- Agent Hive Logic ---
function initHiveMind() {
    hiveContainer.innerHTML = '';
    const agents = 12;
    
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node status-active';
        node.id = `agent-${i}`;
        node.innerHTML = `<strong>Agent-${i}</strong><br>
                         <span class="status">ACTIVE</span><br>
                         <small style="font-size:0.6rem; opacity:0.7">ID:${btoa(i).substring(0,6)}</small>`;
        
        node.addEventListener('click', () => authorizeNode(i));
        hiveContainer.appendChild(node);
    }
    
    setInterval(simulateSystemThreats, 2000);
    setInterval(fetchSystemHealth, 3000);
}

function authorizeNode(agentId) {
    const node = document.getElementById(`agent-${agentId}`);
    const signature = `0x${Math.random().toString(16).substring(2, 10)}`;
    
    alert(`[Level-0 Authorized]\nAgent-${agentId} Signature: ${signature}\nStatus: Secure & Synchronized.`);
}

function simulateSystemThreats() {
    const randomAgent = Math.floor(Math.random() * 12);
    const node = document.getElementById(`agent-${randomAgent}`);
    if (!node) return;

    if (Math.random() > 0.85) {
        currentSystemState = 'CRITICAL';
        node.classList.add('critical');
        threatCount++;
        document.getElementById('threat-count').textContent = threatCount;
        
        setTimeout(() => {
            currentSystemState = 'OPERATIONAL';
            node.classList.remove('critical');
        }, 1000);
    }
}

async function fetchSystemHealth() {
    try {
        const response = await fetch('./status.txt');
        const text = await response.text();
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) {
            statusFeed.textContent = text.includes("Engine-Operational") ? "CORE: OPERATIONAL | PROTECTED" : "CORE: SYNCING...";
        }
    } catch (e) { /* Silent fail */ }
}

// Initialize System on load
document.addEventListener('DOMContentLoaded', () => {
    init3DCore();
    initHiveMind();
    fetchSystemHealth();
});
