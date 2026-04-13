/* * Architect-Eye: Visual Orchestration Script (Enhanced Interaction)
 * Path: Architect-Eye-Public/script.js
 * Purpose: Interactive Hive Mind management and real-time Core sync.
 */

const hiveContainer = document.getElementById('hive-visualization');
const agents = 12;

// تهيئة العقد (Nodes) مع دعم التفاعل
function initHiveMind() {
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        node.innerHTML = `<strong>Agent-${i}</strong><br><span class="status">IDLE</span>`;
        
        // تفعيل التفاعل عند الضغط (Event Listener)
        node.addEventListener('click', () => handleNodeClick(i));
        
        hiveContainer.appendChild(node);
    }
    updateStatus();
}

// دالة التفاعل عند الضغط
function handleNodeClick(agentId) {
    const node = document.getElementById(`agent-${agentId}`);
    console.log(`Manual Override: Accessing Agent-${agentId}`);
    
    // تأثير بصري للضغط
    node.style.transform = 'scale(0.95)';
    node.style.borderColor = 'var(--accent-purple)';
    
    setTimeout(() => {
        node.style.transform = 'scale(1)';
        node.style.borderColor = 'var(--accent-blue)';
        alert(`Agent-${agentId} Status: Secure & Synchronized.`);
    }, 200);
}

// محاكاة نشاط العقد التلقائي
function updateStatus() {
    setInterval(() => {
        const randomAgent = Math.floor(Math.random() * agents);
        const node = document.getElementById(`agent-${randomAgent}`);
        if (!node) return;
        const status = node.querySelector('.status');
        
        status.textContent = 'SYNCING...';
        node.style.borderColor = 'var(--accent-purple)';
        
        setTimeout(() => {
            status.textContent = 'ACTIVE';
            node.style.borderColor = 'var(--accent-blue)';
        }, 500);
    }, 1000);
}

// الربط الفعلي مع المحرك السيادي
async function fetchSystemHealth() {
    try {
        const response = await fetch('status.txt');
        const text = await response.text();
        
        const integrityEl = document.getElementById('integrity-level');
        if (integrityEl) {
            integrityEl.textContent = text.includes("Engine-Operational") ? "99.9%" : "Pending";
        }
    } catch (error) {
        console.error("Connection to Core Orchestrator failed.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHiveMind();
    fetchSystemHealth();
    setInterval(fetchSystemHealth, 10000);
});
