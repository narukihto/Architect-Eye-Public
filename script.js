/* * Architect-Eye: Sovereign Orchestration Script (Version 2.0)
 * Path: Architect-Eye-Public/script.js
 * Status: Operational | Level-0 Authority: Enabled
 */

const hiveContainer = document.getElementById('hive-visualization');
const agents = 12;
let threatCount = 0; // العداد السيادي للتهديدات المصودة

// تهيئة العقد (Nodes)
function initHiveMind() {
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.id = `agent-${i}`;
        // إضافة معرف مشفر للعقدة
        node.innerHTML = `<strong>Agent-${i}</strong><br>
                         <span class="status">IDLE</span><br>
                         <small style="font-size:0.5rem; color:#444">ID:${btoa(i).substring(0,6)}</small>`;
        
        node.addEventListener('click', () => handleNodeClick(i));
        hiveContainer.appendChild(node);
    }
    updateStatus();
}

// دالة التفاعل (Override) مع التوقيع الرقمي
function handleNodeClick(agentId) {
    const node = document.getElementById(`agent-${agentId}`);
    const signature = `0x${Math.random().toString(16).substring(2, 10)}`;
    
    node.style.transform = 'scale(0.95)';
    node.style.borderColor = 'var(--accent-purple)';
    
    setTimeout(() => {
        node.style.transform = 'scale(1)';
        node.style.borderColor = 'var(--accent-blue)';
        alert(`[Level-0 Authorized]\nAgent-${agentId} Signature: ${signature}\nStatus: Secure & Synchronized.`);
    }, 200);
}

// محاكاة نشاط العقد التلقائي مع الـ Self-Healing
function updateStatus() {
    setInterval(() => {
        const randomAgent = Math.floor(Math.random() * agents);
        const node = document.getElementById(`agent-${randomAgent}`);
        if (!node) return;
        
        const status = node.querySelector('.status');
        
        // محاكاة تهديد (خلل مفاجئ)
        if (Math.random() > 0.9) {
            status.textContent = 'CRITICAL';
            node.style.borderColor = 'red';
            
            // تحديث العداد السيادي
            threatCount++;
            const counterEl = document.getElementById('threat-count');
            if (counterEl) counterEl.textContent = threatCount;
            
            console.warn(`Anomaly detected at Agent-${randomAgent}. Self-Healing engaged.`);
            
            // دورة الإصلاح الذاتي
            setTimeout(() => {
                status.textContent = 'ACTIVE';
                node.style.borderColor = 'var(--accent-blue)';
            }, 1500);
        } else {
            status.textContent = 'ACTIVE';
        }
    }, 1500);
}

// الربط الفعلي مع المحرك السيادي
async function fetchSystemHealth() {
    try {
        const response = await fetch('./status.txt');
        const text = await response.text();
        
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) {
            statusFeed.textContent = text.includes("Engine-Operational") ? "CORE: OPERATIONAL | PROTECTED" : "CORE: SYNCING...";
        }
    } catch (error) {
        console.error("Connection to Core failed.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHiveMind();
    fetchSystemHealth();
    setInterval(fetchSystemHealth, 5000);
});
