/* * Architect-Eye: Sovereign Orchestration Script (Version 2.0 - Stabilized)
 * Status: Operational | Grid-Mode: Locked
 */

const hiveContainer = document.getElementById('hive-visualization');
const agents = 12;
let threatCount = 0;

function initHiveMind() {
    // التأكد من تفريغ الحاوية قبل البدء
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        
        node.innerHTML = `<strong>Agent-${i}</strong><br>
                         <span class="status">ACTIVE</span><br>
                         <small style="font-size:0.6rem; opacity:0.7">ID:${btoa(i).substring(0,6)}</small>`;
        
        node.addEventListener('click', () => handleNodeClick(i));
        hiveContainer.appendChild(node);
    }
    updateStatus();
}

function handleNodeClick(agentId) {
    const node = document.getElementById(`agent-${agentId}`);
    const signature = `0x${Math.random().toString(16).substring(2, 10)}`;
    
    // تأثير بصري للتحقق
    node.style.transition = '0.3s';
    node.style.borderColor = 'var(--accent-purple)';
    
    setTimeout(() => {
        node.style.borderColor = 'var(--accent-blue)';
        alert(`[Level-0 Authorized]\nAgent-${agentId} Signature: ${signature}\nStatus: Secure & Synchronized.`);
    }, 200);
}

function updateStatus() {
    setInterval(() => {
        const randomAgent = Math.floor(Math.random() * agents);
        const node = document.getElementById(`agent-${randomAgent}`);
        if (!node) return;
        
        const status = node.querySelector('.status');
        
        // محاكاة تحييد التهديدات
        if (Math.random() > 0.85) {
            status.textContent = 'CRITICAL';
            node.style.borderColor = 'red';
            
            threatCount++;
            const counterEl = document.getElementById('threat-count');
            if (counterEl) counterEl.textContent = threatCount;
            
            setTimeout(() => {
                status.textContent = 'ACTIVE';
                node.style.borderColor = 'var(--accent-blue)';
            }, 1000);
        }
    }, 2000);
}

document.addEventListener('DOMContentLoaded', () => {
    initHiveMind();
});
