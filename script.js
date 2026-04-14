/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.3 - STABLE)
 * -------------------------------------------------------------------------
 * Updates: Integrated View Controller, stabilized asset loading, and 
 * reinforced logic for cross-view synchronization.
 */

const hiveContainer = document.getElementById('hive-visualization');
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

// Asset mapping: 12 agents, mapped to /space/
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * 1. View Controller
 * Manages UI layer visibility to prevent layout collapse.
 */
window.navigateTo = function(viewId) {
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
    }
};

/**
 * 2. Hive Mind Initializer
 */
function initHiveMind() {
    const grid = document.getElementById('hive-visualization');
    if (!grid) return;
    grid.innerHTML = ''; 
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `
            <img src="space/${agentAssets[i]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${i}</strong>
            <br><span>ACTIVE</span>
            <br><small>ID:---</small>
        `;
        grid.appendChild(node);
    }
}

/**
 * 3. Autonomous Agent Processor
 */
function activateAgent(index) {
    const nodes = document.querySelectorAll('.agent-node');
    const node = nodes[index];
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
 * 4. Synchronization Engine
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
    // Ensure 3D background exists
    if (typeof init3DEnvironment === 'function') init3DEnvironment();
    
    initHiveMind();
    if (typeof startLiveThreatCounter === 'function') startLiveThreatCounter();
    syncSystemStatus();
    
    setTimeout(() => {
        for (let i = 0; i < 12; i++) {
            activateAgent(i);
        }
    }, 500);
    
    setInterval(syncSystemStatus, 3000);
});
