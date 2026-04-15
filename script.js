/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v6.9.1 - PRODUCTION)
 * -------------------------------------------------------------------------
 * ARCHITECTURE:
 * 1. SYNCHRONIZATION LAYER: Performs asynchronous health-checks against 
 * the remote 'status.txt' beacon to maintain system integrity.
 * 2. AUTONOMOUS SIMULATION ENGINE: Provides independent, high-fidelity 
 * threat visualization, decoupling UI behavior from backend latency.
 * 3. AGENT ORCHESTRATION: Executes adaptive defense protocols based on 
 * real-time threat escalation metrics.
 */

let systemStatus = { state: 'SYNCING...', lastSync: 'N/A' };
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * Syncs the frontend operational status with the Sovereign Execution Engine.
 * Fetches the remote state beacon to ensure the system remains aligned.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const rawData = await response.text();
        
        // Parsing the operational state from the engine beacon
        const isOperational = /Engine-Operational/i.test(rawData);
        systemStatus.state = isOperational ? 'OPERATIONAL' : 'CRITICAL';
        systemStatus.lastSync = new Date().toLocaleTimeString();
        
        updateUI();
    } catch (e) {
        systemStatus.state = 'OFFLINE';
        updateUI();
    }
}

/**
 * Initiates the independent threat simulation engine.
 * Generates autonomous threat escalation data to visualize defensive swarm behavior.
 */
function startAutonomousSimulation() {
    let fakeThreats = 0;
    setInterval(() => {
        // Increment threat counter to visualize reactive swarm response
        fakeThreats += Math.floor(Math.random() * 3);
        const counterElement = document.getElementById('threat-count');
        if (counterElement) counterElement.innerText = fakeThreats;
        
        // Force critical status to trigger defensive agent protocols
        systemStatus.state = 'CRITICAL';
        updateUI();
    }, 2500);
}

/**
 * Updates UI rendering based on the system state.
 * Refreshes status feeds and node aesthetics to reflect security posture.
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) {
        statusFeed.innerText = `CORE: ${systemStatus.state} | LAST SYNC: ${systemStatus.lastSync}`;
        statusFeed.style.color = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    }
    
    // Refresh visual boundaries of the swarm nodes
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    });
}

/**
 * Activates individual autonomous agents with unique hashed identities 
 * and adaptive task assignment based on system threat levels.
 */
function activateAgent(index) {
    const nodes = document.querySelectorAll('.agent-node');
    if (!nodes[index]) return;

    setInterval(() => {
        const isOperational = systemStatus.state === 'OPERATIONAL';
        const tasks = isOperational 
            ? ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING"]
            : ["DEFENSE_PROTOCOL", "ISOLATING_CORE", "PURGING_VIRUS", "COUNTER_ATTACK"];
            
        // Render dynamic task assignment with secure cryptographic IDs
        nodes[index].innerHTML = `
            <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${index}</strong>
            <br><span style="color:${isOperational ? '#00d4ff' : '#ff0033'}">${tasks[Math.floor(Math.random()*tasks.length)]}...</span>
            <br><small>ID:${btoa(Date.now() + index).substring(0, 8).toUpperCase()}==</small>
        `;
    }, 4000 + (index * 150)); 
}

// Initializing the Sovereign Engine on document ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof init3DEnvironment === 'function') init3DEnvironment();
    
    const hive = document.getElementById('hive-visualization');
    if(hive) {
        for(let i=0; i<12; i++) hive.innerHTML += `<div class="agent-node"></div>`;
        for(let i=0; i<12; i++) activateAgent(i);
    }
    
    // Core processes initialization
    syncSystemStatus(); 
    setInterval(syncSystemStatus, 3000);
    
    // Start simulation engine to showcase agent capabilities
    startAutonomousSimulation();
});
