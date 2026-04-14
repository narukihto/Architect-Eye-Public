/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.0 - HIVE ACTIVATION)
 * -------------------------------------------------------------------------
 * Updates: Fully integrated with CSS (v5.0) task states via class toggling.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

/**
 * 1. Autonomous Agent Processor
 * Now toggles '.processing' class to trigger CSS (v5.0) kinetic feedback.
 */
function activateAgent(index) {
    const node = document.querySelector(`.agent-node:nth-child(${index + 1})`);
    if (!node) return;

    // Task simulation loop
    setInterval(() => {
        const taskTypes = ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"];
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const newId = Math.random().toString(36).substring(7).toUpperCase();
        
        // Trigger CSS (v5.0) Processing State
        node.classList.add('processing');
        node.innerHTML = `<strong>AGENT-${index}</strong><br><span>${currentTask}...</span><br><small>ID:${newId}==</small>`;
        
        // Return to idle state after task completion
        setTimeout(() => {
            node.classList.remove('processing');
            node.innerHTML = `<strong>AGENT-${index}</strong><br><span>ACTIVE</span><br><small>ID:${newId}==</small>`;
        }, 1200);
        
    }, Math.random() * 4000 + 2000); 
}

/**
 * 2. Autonomous Threat Counter
 */
function startLiveThreatCounter() {
    setInterval(() => {
        threatCount += Math.floor(Math.random() * 3);
        const counterElement = document.getElementById('threat-count');
        if (counterElement) counterElement.innerText = threatCount;
    }, 1500);
}

/**
 * 3. Synchronization & UI Orchestrator
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        systemStatus.state = data.includes('CRITICAL') ? 'CRITICAL' : 'OPERATIONAL';
        updateUI();
    } catch (e) { console.warn("Backend Sync Standby..."); }
}

function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) statusFeed.innerText = `CORE: ${systemStatus.state} | PROTECTED`;
    
    // Reset border colors on global state change
    document.querySelectorAll('.agent-node').forEach(node => {
        if (!node.classList.contains('processing')) {
            node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
        }
    });
}

// Initialization Logic
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    startLiveThreatCounter();
    syncSystemStatus();
    
    // Launch autonomous processing cycles for the 12-Agent Grid
    for (let i = 0; i < 12; i++) {
        activateAgent(i);
    }
    
    setInterval(syncSystemStatus, 3000);
});
