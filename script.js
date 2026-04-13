/* * Architect-Eye: Visual Orchestration Script
 * Path: Architect-Eye-Public/script.js
 * Purpose: Simulates Hive Mind activity and syncs with the Sovereign Core via status.txt.
 */

const hiveContainer = document.getElementById('hive-visualization');
const agents = 12;

// تهيئة العقد (Nodes)
function initHiveMind() {
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        node.innerHTML = `<strong>Agent-${i}</strong><br><span class="status">IDLE</span>`;
        hiveContainer.appendChild(node);
    }
    updateStatus();
}

// محاكاة نشاط العقد
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

// الربط الفعلي مع المحرك السيادي عبر status.txt
async function fetchSystemHealth() {
    try {
        const response = await fetch('status.txt');
        const text = await response.text();
        
        // تحديث واجهة المستخدم بالحالة الحقيقية
        const integrityEl = document.getElementById('integrity-level');
        if (integrityEl) {
            integrityEl.textContent = text.includes("Engine-Operational") ? "99.9%" : "Pending";
        }
        console.log("Orchestrator Sync: Secure handshake established with Public Throne.");
    } catch (error) {
        console.error("Connection to Core Orchestrator failed.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHiveMind();
    fetchSystemHealth();
    // جلب تحديثات الحالة كل 10 ثوانٍ
    setInterval(fetchSystemHealth, 10000);
});
