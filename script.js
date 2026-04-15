/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v6.1 - INTEGRATED)
 * -------------------------------------------------------------------------
 * Updates: Direct Backend-Sync via status.txt, Real-Time Hive-Mind 
 * Orchestration, and Autonomous Agent State Management.
 */

let systemStatus = { state: 'SYNCING...', lastSync: 'N/A' };
const agentAssets = ["nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg", "nx.jpg", "ny.jpg", "nz.jpg", "px.jpg", "py.jpg", "pz.jpg"];

// ربط مباشر مع محرك الـ Backend
async function syncSystemStatus() {
    try {
        // قراءة الحالة من الملف المحدث بواسطة الـ GitHub Action
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const rawData = await response.text();
        
        // استخلاص الحالة البرمجية
        const isOperational = /Engine-Operational/i.test(rawData);
        systemStatus.state = isOperational ? 'OPERATIONAL' : 'CRITICAL';
        systemStatus.lastSync = new Date().toLocaleTimeString();
        
        updateUI();
    } catch (e) {
        systemStatus.state = 'OFFLINE';
        updateUI();
    }
}

function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) {
        statusFeed.innerText = `CORE: ${systemStatus.state} | LAST SYNC: ${systemStatus.lastSync}`;
        statusFeed.style.color = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    }
    
    // تحديث نبض العقد بناءً على حالة النظام
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'OPERATIONAL' ? '#00d4ff' : '#ff0033';
    });
}

function activateAgent(index) {
    const nodes = document.querySelectorAll('.agent-node');
    const node = nodes[index];
    if (!node) return;

    setInterval(() => {
        // إذا كان النظام OPERATIONAL، الوكلاء يعملون بمهام حقيقية
        // إذا كان CRITICAL، الوكلاء يتحولون إلى حالة دفاعية
        const taskTypes = systemStatus.state === 'OPERATIONAL' 
            ? ["ENCRYPTING", "SYNCING", "VERIFYING", "SCANNING", "COMPUTING"]
            : ["DEFENSE_PROTOCOL", "ISOLATING_CORE", "REPAIRING"];
            
        const currentTask = taskTypes[Math.floor(Math.random() * taskTypes.length)];
        const liveId = btoa(systemStatus.lastSync + index).substring(0, 8).toUpperCase();
        
        node.innerHTML = `
            <img src="space/${agentAssets[index]}" style="width:40px; height:40px; border-radius:50%; margin-bottom:5px;">
            <br><strong>AGENT-${index}</strong>
            <br><span>${currentTask}...</span>
            <br><small>ID:${liveId}==</small>
        `;
    }, 4000); 
}

// تشغيل النظام
document.addEventListener('DOMContentLoaded', () => {
    initHiveMind(); // تهيئة الشبكة
    syncSystemStatus(); // المزامنة الأولى
    
    for (let i = 0; i < 12; i++) {
        activateAgent(i);
    }
    
    // المزامنة الدورية مع السيرفر (كل 3 ثواني)
    setInterval(syncSystemStatus, 3000);
});english cmment
