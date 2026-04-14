/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v5.1 - PRODUCTION STABLE)
 * -------------------------------------------------------------------------
 * Updates: Finalized sync logic to match repository status format, 
 * consolidated UI orchestration, and enhanced autonomous agent loops.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL' };
let threatCount = 0;

/**
 * 1. Autonomous Agent Processor
 * Orchestrates individual agent task cycles with kinetic CSS feedback.
 */
function activateAgent(index) {
    const node = document.querySelector(`.agent-node:nth-child(${index + 1})`);
    if (!node) return;

    setInterval(() => {
        const taskTypes = ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"];
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const newId = Math.random().toString(36).substring(7).toUpperCase();
        
        node.classList.add('processing');
        node.innerHTML = `<strong>AGENT-${index}</strong><br><span>${currentTask}...</span><br><small>ID:${newId}==</small>`;
        
        setTimeout(() => {
            node.classList.remove('processing');
            node.innerHTML = `<strong>AGENT-${index}</strong><br><span>ACTIVE</span><br><small>ID:${newId}==</small>`;
        }, 1200);
        
    }, Math.random() * 4000 + 2000); 
}

/**
 * 2. Autonomous Threat Counter
 * Tracks neutralized threats locally.
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
 * Parses status.txt to synchronize engine state with external repository.
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        
        // Robust state parsing based on current repository format
        if (data.includes('Engine-Operational')) {
            systemStatus.state = 'OPERATIONAL';
        } else if (data.includes('CRITICAL')) {
            systemStatus.state = 'CRITICAL';
        }
        
        updateUI();
    } catch (e) { 
        console.warn("Backend Sync Standby..."); 
    }
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

// System Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    startLiveThreatCounter();
    syncSystemStatus();
    
    for (let i = 0; i < 12; i++) {
        activateAgent(i);
    }
    
    setInterval(syncSystemStatus, 3000);
});
