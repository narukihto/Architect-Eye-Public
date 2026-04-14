/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.0 - HIVE ACTIVATION)
 * -------------------------------------------------------------------------
 * Updates: Real-time task simulation per agent, dynamic ID rotation, 
 * and active task cycle visual feedback.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

/**
 * 1. Autonomous Agent Processor (Active Task Cycle)
 * Each agent runs an independent loop simulating specialized workloads.
 */
function activateAgent(index) {
    const node = document.querySelector(`.agent-node:nth-child(${index + 1})`);
    if (!node) return;

    // Task simulation loop
    setInterval(() => {
        const taskTypes = ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"];
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const newId = Math.random().toString(36).substring(7).toUpperCase();
        
        // Visual feedback: Highlight active task
        node.style.borderColor = '#ffd700'; 
        node.innerHTML = `<strong>AGENT-${index}</strong><br><span>${currentTask}...</span><br><small>ID:${newId}==</small>`;
        
        // Return to idle state after task completion
        setTimeout(() => {
            node.style.borderColor = '#00d4ff';
            node.innerHTML = `<strong>AGENT-${index}</strong><br><span>ACTIVE</span><br><small>ID:${newId}==</small>`;
        }, 1200);
        
    }, Math.random() * 4000 + 2000); // Random execution interval
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
 * 3. Synchronization & UI (Logic Maintained)
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
    
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
    });
}

// ... (Three.js and Initialization code remains same) ...

document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    startLiveThreatCounter();
    syncSystemStatus();
    
    // Launch individual processing loops for all 12 agents
    for (let i = 0; i < 12; i++) {
        activateAgent(i);
    }
    
    setInterval(syncSystemStatus, 3000);
});
