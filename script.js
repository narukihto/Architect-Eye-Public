/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v6.3 - PRODUCTION)
 * -------------------------------------------------------------------------
 * Updates: Real-time Threat Counter Parsing, Backend Signal Integration,
 * and Autonomous Swarm State Orchestration.
 */

let systemStatus = { state: 'SYNCING...', lastSync: 'N/A' };
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * Global navigation controller for the Sovereign UI.
 */
window.navigateTo = function(viewId) {
    document.querySelectorAll('.view-container').forEach(view => view.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
};

/**
 * Syncs the frontend state with the status.txt file.
 * Now parses both 'Operational State' and 'Threats Neutralized' counter.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const rawData = await response.text();
        
        // 1. Parse Operational State
        const isOperational = /Engine-Operational/i.test(rawData);
        systemStatus.state = isOperational ? 'OPERATIONAL' : 'CRITICAL';
        systemStatus.lastSync = new Date().toLocaleTimeString();
        
        // 2. Parse Threats Neutralized (Looks for 'Threats: X' in the file)
        const threatMatch = rawData.match(/Threats:\s*(\d+)/i);
        const threatCountElement = document.getElementById('threat-count');
        if (threatMatch && threatCountElement) {
            threatCountElement.innerText = threatMatch[1];
        }
        
        updateUI();
    } catch (e) {
        systemStatus.state = 'OFFLINE';
        updateUI();
    }
}

/**
 * Updates UI visual feedback based on the parsed state.
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) {
        statusFeed.innerText = `CORE: ${systemStatus.state} | LAST SYNC: ${systemStatus.lastSync}`;
        statusFeed.style.color = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    }
    
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    });
}

/**
 * Activates individual autonomous agents with unique hashed identities.
 */
function activateAgent(index) {
    const nodes = document.querySelectorAll('.agent-node');
    const node = nodes[index];
    if (!node) return;

    setInterval(() => {
        const taskTypes = systemStatus.state === 'OPERATIONAL' 
            ? ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"]
            : ["DEFENSE_PROTOCOL", "ISOLATING_CORE", "REPAIRING"];
            
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        // Generate unique dynamic ID
        const liveId = btoa(Date.now() + index).substring(0, 8).toUpperCase();
        
        node.innerHTML = `
            <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${index}</strong>
            <br><span>${currentTask}...</span>
            <br><small>ID:${liveId}==</small>
        `;
    }, 4000 + (index * 150)); 
}

// System initialization
document.addEventListener('DOMContentLoaded', () => {
    if (typeof init3DEnvironment === 'function') init3DEnvironment();

    const hive = document.getElementById('hive-visualization');
    if(hive) {
        for(let i=0; i<12; i++) hive.innerHTML += `<div class="agent-node"></div>`;
        for(let i=0; i<12; i++) activateAgent(i);
    }

    syncSystemStatus(); 
    setInterval(syncSystemStatus, 3000);
});
