/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v3.0)
 * -------------------------------------------------------------------------
 * Architecture: Hybrid 3D-Canvas Environment + Reactive DOM Swarm
 * Primary Focus: System Sovereignty, Enterprise Intelligence, & 3D Immersion
 * -------------------------------------------------------------------------
 * AUTHOR: ISSAC ANDREW (THE ARCHITECT)
 * DATE: 2026-04-14
 */

/* ==========================================================================
   Global Constants & State Management
   ========================================================================== */
const hiveContainer = document.getElementById('hive-visualization');
let threatCount = 0;
let scene, camera, renderer, coreSphere;
let currentSystemState = 'OPERATIONAL';

/* ==========================================================================
   Navigation Logic: View Controller
   ========================================================================== */
/**
 * Switches between system views (Main, Dashboard, Info)
 * @param {string} viewId - The ID of the target view container
 */
function navigateTo(viewId) {
    // Hide all view containers
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });

    // Activate selected view
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }

    // PULSE PROTOCOL: Disable Blue Pulse on Info View to maintain text readability
    if (viewId === 'info-view') {
        document.body.classList.remove('cyber-pulse-bg');
    } else {
        document.body.classList.add('cyber-pulse-bg');
    }
}

/* ==========================================================================
   3D Visualization Layer: The Sovereign Environment
   ========================================================================== */
/**
 * Initializes Three.js Scene, CubeMap Background, and Golden Core
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();

    // Field of View and Clipping
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ 
        canvas: canvas, 
        alpha: true, 
        antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // --- INTEGRATION: Sovereign Space CubeMap ---
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('space/'); // Path to the 6 images (px, nx, py, ny, pz, nz)

    // Mapping the 6 faces of the universe
    const textureCube = loader.load([
        'px.jpg', 'nx.jpg',  // Right, Left
        'py.jpg', 'ny.jpg',  // Top, Bottom
        'pz.jpg', 'nz.jpg'   // Front, Back
    ]);
    scene.background = textureCube;

    // --- SYSTEM CORE: The Golden Sphere ---
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshPhongMaterial({
        color: 0xffd700,      // System Gold
        emissive: 0xaa8800,
        transparent: true,
        opacity: 0.6,
        wireframe: false      // Solid core with glow
    });
    coreSphere = new THREE.Mesh(geometry, material);
    scene.add(coreSphere);

    // --- LIGHTING PROTOCOLS ---
    const light = new THREE.PointLight(0xffffff, 1.5);
    light.position.set(5, 5, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040, 2));

    animateCore();
}

/**
 * Main Animation Loop for the 3D Layer
 */
function animateCore() {
    requestAnimationFrame(animateCore);
    
    // Constant rotation of the core
    coreSphere.rotation.y += 0.005;
    
    // Pulsating effect reacts to system threat level (Critical = High intensity)
    const pulseIntensity = currentSystemState === 'CRITICAL' ? 0.3 : 0.05;
    const pulse = Math.sin(Date.now() * 0.003) * pulseIntensity;
    coreSphere.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    
    renderer.render(scene, camera);
}

/* ==========================================================================
   Agent Hive Logic: Orchestration Protocols
   ========================================================================== */
/**
 * Initializes the 12-Agent Swarm Visualization
 */
function initHiveMind() {
    hiveContainer.innerHTML = '';
    const totalAgents = 12;
    
    for (let i = 0; i < totalAgents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        node.innerHTML = `
            <strong>AGENT-${i}</strong><br>
            <span class="status">ACTIVE</span><br>
            <small style="font-size:0.6rem; opacity:0.7">ID:${btoa(i).substring(0,6)}</small>
        `;
        
        node.addEventListener('click', () => authorizeNode(i));
        hiveContainer.appendChild(node);
    }
    
    // Initialize Simulation Loops
    setInterval(simulateSystemThreats, 2000);
    setInterval(fetchSystemHealth, 3000);
}

/**
 * Simulated Node Authorization Signature
 * @param {number} agentId 
 */
function authorizeNode(agentId) {
    const signature = `0x${Math.random().toString(16).substring(2, 10)}`;
    alert(`[Level-0 Authorized]\nAgent-${agentId} Signature: ${signature}\nStatus: Secure & Synchronized.`);
}

/**
 * Simulates random system stress and threat neutralization
 */
function simulateSystemThreats() {
    const randomAgent = Math.floor(Math.random() * 12);
    const node = document.getElementById(`agent-${randomAgent}`);
    if (!node) return;

    if (Math.random() > 0.85) {
        currentSystemState = 'CRITICAL';
        node.classList.add('critical');
        threatCount++;
        
        const counterElement = document.getElementById('threat-count');
        if (counterElement) counterElement.textContent = threatCount;
        
        // Auto-neutralization timeout
        setTimeout(() => {
            currentSystemState = 'OPERATIONAL';
            node.classList.remove('critical');
        }, 1200);
    }
}

/**
 * Fetches core engine health from local status file
 */
async function fetchSystemHealth() {
    try {
        const response = await fetch('./status.txt');
        const text = await response.text();
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) {
            statusFeed.textContent = text.includes("Engine-Operational") 
                ? "CORE: OPERATIONAL | PROTECTED" 
                : "CORE: SYNCING PROTOCOLS...";
        }
    } catch (e) {
        // Silent fail if status.txt is unavailable
    }
}

/* ==========================================================================
   Initialization Protocol
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    fetchSystemHealth();
});

// Handle Window Resize to maintain 3D Aspect Ratio
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
