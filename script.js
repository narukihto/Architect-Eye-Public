/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.5 - THREAT STABLE)
 * -------------------------------------------------------------------------
 * Updates: Finalized Threat Engine, integrated autonomous anomaly detection,
 * stabilized UI synchronization, and optimized process memory handling.
 */

const hiveContainer = document.getElementById('hive-visualization');
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

// Asset mapping: 12 agents, mapped to available images in /space/
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * 1. View Controller
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
 * 2. Threat Counter Engine
 */
function incrementThreats() {
    threatCount++;
    const counterElement = document.getElementById('threat-count');
    if (counterElement) {
        counterElement.innerText = threatCount;
    }
}

/**
 * 3. Hive Mind Initializer
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
 * 4. Autonomous Agent Processor
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
            // Threat Detection Logic (15% Probability)
            const isAnomaly = Math.random() < 0.15;
            if (isAnomaly && (currentTask === "SCANNING" || currentTask === "VERIFYING")) {
                incrementThreats();
                node.style.borderColor = "#ff0033"; // Alert styling
            }

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
 * 5. Synchronization Engine
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
    if (typeof init3DEnvironment === 'function') init3DEnvironment();
    
    initHiveMind();
    syncSystemStatus();
    
    setTimeout(() => {
        for (let i = 0; i < 12; i++) {
            activateAgent(i);
        }
    }, 500);
    
    setInterval(syncSystemStatus, 3000);
});
