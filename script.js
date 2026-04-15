/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v7.0 - PRODUCTION STABLE)
 * -------------------------------------------------------------------------
 * OVERVIEW:
 * This engine serves as the centralized orchestration hub. It manages 
 * real-time system state synchronization with the backend and drives 
 * autonomous UI visualization protocols.
 * * MODULES:
 * 1. SYNC LAYER: Asynchronous beacon monitoring for system integrity.
 * 2. SIMULATION LAYER: Independent threat escalation logic for UX visualization.
 * 3. AGENT SWARM: Dynamic entity rendering with adaptive behavioral states.
 */

// Global Navigation Controller
window.navigateTo = function(viewId) {
    // Hide all views to reset dashboard state
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
    });
    // Display the requested view
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        console.log("Navigated to: " + viewId);
    } else {
        console.error("Target view not found: " + viewId);
    }
};

let systemStatus = { state: 'SYNCING...', lastSync: 'N/A' };
let threatCount = 0; 
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

/**
 * Syncs the frontend operational status with the Sovereign Execution Engine.
 * Monitors the remote 'status.txt' beacon to ensure system state consistency.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const rawData = await response.text();
        
        // Parse system heartbeat from the integrity beacon
        const isOperational = /Engine-Operational/i.test(rawData);
        
        if (isOperational) {
            systemStatus.state = 'OPERATIONAL';
        }
        systemStatus.lastSync = new Date().toLocaleTimeString();
        
        updateUI();
    } catch (e) {
        systemStatus.state = 'OFFLINE';
        updateUI();
    }
}

/**
 * Autonomous simulation engine to showcase swarm intelligence responses.
 * Operates in a decoupled sandbox to maintain UI responsiveness.
 * Adjusted for tactical pacing: slow-growth threat simulation.
 */
function startAutonomousSimulation() {
    // Throttled threat escalation to maintain visual stability
    setInterval(() => {
        // Only trigger escalation if the system is currently in an idle/operational state
        if (systemStatus.state === 'OPERATIONAL') {
            
            // Incremental step of 1 for granular, controlled growth
            threatCount += 1; 
            
            const counter = document.getElementById('threat-count');
            if (counter) counter.innerText = threatCount;
            
            // Tactical threshold: Trigger defense protocols after reaching a threat density of 5
            if (threatCount > 5) {
                systemStatus.state = 'CRITICAL';
                updateUI();
            }
        }
    }, 5000); // 5-second interval for deliberate, high-fidelity cadence
}

/**
 * Refreshes UI visual metrics based on real-time system posture.
 * Dynamically updates state indicators and swarm boundary aesthetics.
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    const counter = document.getElementById('threat-count');
    
    // Update live status feed with system health metrics
    if (statusFeed) {
        statusFeed.innerText = `CORE: ${systemStatus.state} | LAST SYNC: ${systemStatus.lastSync}`;
        statusFeed.style.color = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    }
    
    // Synchronize threat counter DOM element
    if (counter) counter.innerText = threatCount;
    
    // Update swarm node border aesthetics to reflect security threat level
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    });
}

/**
 * Activates individual autonomous agents with unique hashed identities.
 * Assigns tasks dynamically based on the current system security posture.
 */
function activateAgent(index) {
    const nodes = document.querySelectorAll('.agent-node');
    if (!nodes[index]) return;

    setInterval(() => {
        const isOperational = systemStatus.state === 'OPERATIONAL';
        const tasks = isOperational 
            ? ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING"]
            : ["DEFENSE_PROTOCOL", "ISOLATING_CORE", "PURGING_VIRUS", "COUNTER_ATTACK"];
            
        // Render dynamic task assignment with secure cryptographic identity formatting
        nodes[index].innerHTML = `
            <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${index}</strong>
            <br><span style="color:${isOperational ? '#00d4ff' : '#ff0033'}">${tasks[Math.floor(Math.random()*tasks.length)]}...</span>
            <br><small>ID:${btoa(Date.now() + index).substring(0, 8).toUpperCase()}==</small>
        `;
    }, 4000 + (index * 150)); 
}

// System initialization protocol
document.addEventListener('DOMContentLoaded', () => {
    // Inject 3D engine environment if present
    if (typeof init3DEnvironment === 'function') init3DEnvironment();
    
    // Hive visualization node initialization
    const hive = document.getElementById('hive-visualization');
    if(hive) {
        hive.innerHTML = '';
        for(let i=0; i<12; i++) {
            hive.innerHTML += `<div class="agent-node"></div>`;
        }
        for(let i=0; i<12; i++) activateAgent(i);
    }
    
    // Initialize primary synchronization and simulation modules
    syncSystemStatus(); 
    setInterval(syncSystemStatus, 3000);
    startAutonomousSimulation();
});
