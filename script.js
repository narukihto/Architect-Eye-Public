/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.2 - ASSET INTEGRATION)
 * -------------------------------------------------------------------------
 * Updates: Finalized dynamic asset mapping from /space/, consolidated UI 
 * orchestration, and stabilized repository sync logic.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

// Asset mapping: 12 agents, mapped to available images in /space/
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * 1. Hive Mind Initializer
 * Dynamically constructs the agent grid and maps space assets.
 */
function initHiveMind() {
    const grid = document.getElementById('hive-visualization');
    if (!grid) return;
    grid.innerHTML = ''; 
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `
            <img src="space/${agentAssets[i]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px; border: 1px solid #00d4ff;">
            <br><strong>AGENT-${i}</strong>
            <br><span>ACTIVE</span>
            <br><small>ID:---</small>
        `;
        grid.appendChild(node);
    }
}

/**
 * 2. Autonomous Agent Processor
 * Orchestrates individual agent cycles with kinetic CSS feedback.
 */
function activateAgent(index) {
    const node = document.querySelector(`.agent-node:nth-child(${index + 1})`);
    if (!node) return;

    setInterval(() => {
        const taskTypes = ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"];
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const newId = Math.random().toString(36).substring(7).toUpperCase();
        
        node.classList.add('processing');
        node.innerHTML = `
            <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${index}</strong>
            <br><span>${currentTask}...</span>
            <br><small>ID:${newId}==</small>
        `;
        
        setTimeout(() => {
            node.classList.remove('processing');
            node.innerHTML = `
                <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
                <br><strong>AGENT-${index}</strong>
                <br><span>ACTIVE</span>
                <br><small>ID:${newId}==</small>
            `;
        }, 1200);
        
    }, Math.random() * 4000 + 2000); 
}

/**
 * 3. Synchronization & UI Orchestrator
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        systemStatus.state = data.includes('Engine-Operational') ? 'OPERATIONAL' : 'CRITICAL';
        updateUI();
    } catch (e) { console.warn("Backend Sync Standby..."); }
}

function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) statusFeed.innerText = `CORE: ${systemStatus.state} | PROTECTED`;
    
    document.querySelectorAll('.agent-node').forEach(node => {
        if (!node.classList.contains('processing')) {
            node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
        }
    });
}

// Initialization Logic
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment(); // Assumes existing 3D context
    initHiveMind();
    startLiveThreatCounter();
    syncSystemStatus();
    
    for (let i = 0; i < 12; i++) {
        activateAgent(i);
    }
    
    setInterval(syncSystemStatus, 3000);
});
