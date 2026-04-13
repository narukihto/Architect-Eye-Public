/* * Architect-Eye: Sovereign Orchestration Script (Version 3.0 - Integrated)
 * Status: Operational | Grid-Mode: Locked (5xColumns)
 */

const hiveContainer = document.getElementById('hive-visualization');
const agents = 12; // إجمالي الوكلاء (5 في الصف الأول، 5 في الصف الثاني، 2 في الصف الثالث)
let threatCount = 0;

function initHiveMind() {
    // التأكد من تفريغ الحاوية قبل البدء
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < agents; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node status-active'; // إضافة تأثير النبض تلقائياً لكل عقدة نشطة
        node.id = `agent-${i}`;
        
        node.innerHTML = `<strong>Agent-${i}</strong><br>
                         <span class="status">ACTIVE</span><br>
                         <small style="font-size:0.6rem; opacity:0.7">ID:${btoa(i).substring(0,6)}</small>`;
        
        node.addEventListener('click', () => handleNodeClick(i));
        hiveContainer.appendChild(node);
    }
    updateStatus();
    setInterval(fetchSystemHealth, 5000); // تحديث حالة الـ Core كل 5 ثوانٍ
}

function handleNodeClick(agentId) {
    const node = document.getElementById(`agent-${agentId}`);
    const signature = `0x${Math.random().toString(16).substring(2, 10)}`;
    
    // تأثير بصري مؤقت للتحقق (يستخدم كلاس لضمان التناسق)
    node.style.borderColor = 'var(--accent-purple)';
    
    setTimeout(() => {
        node.style.borderColor = 'var(--glass-border)'; // العودة للحد الزجاجي الأصلي
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
            node.classList.add('critical'); // إضافة كلاس حالة الخطر (الأحمر)
            
            threatCount++;
            const counterEl = document.getElementById('threat-count');
            if (counterEl) counterEl.textContent = threatCount;
            
            setTimeout(() => {
                status.textContent = 'ACTIVE';
                node.classList.remove('critical'); // العودة للحالة الزرقاء
            }, 1000);
        }
    }, 2000);
}

// دالة جلب حالة الـ Core من الملف status.txt
async function fetchSystemHealth() {
    try {
        const response = await fetch('./status.txt');
        const text = await response.text();
        
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) {
            statusFeed.textContent = text.includes("Engine-Operational") ? "CORE: OPERATIONAL | PROTECTED" : "CORE: SYNCING...";
        }
    } catch (error) {
        // لا نظهر شيئاً في الكونسول إذا فشل، فقط نحدث الواجهة
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initHiveMind();
    fetchSystemHealth(); // جلب حالة الـ Core فوراً عند التحميل
});
