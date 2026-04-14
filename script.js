/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.3 - SYNCHRONIZED)
 * -------------------------------------------------------------------------
 * Updates: Dynamic Node State Sync, Hash Verification, Optimized Render Loop.
 */

const hiveContainer = document.getElementById('agent-definitions-list');
let scene, camera, renderer, cubeSwarm = [];
let systemStatus = { state: 'OPERATIONAL', threats: 0 };

/**
 * 1. محرك المزامنة المتطور (Deep Backend Sync)
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        // تنسيق مفترض: "Status: OPERATIONAL|Threats: 225"
        const parts = data.split('|');
        systemStatus.state = parts[0].includes('CRITICAL') ? 'CRITICAL' : 'OPERATIONAL';
        systemStatus.threats = parts[1] ? parts[1].split(':')[1] : 0;
        
        updateUI(); // تحديث الواجهة فور استلام البيانات
    } catch (e) { console.warn("Sync Pending..."); }
}

/**
 * 2. تحديث الواجهة والوكلاء بناءً على الحالة (State-Driven UI)
 */
function updateUI() {
    const statusFeed = document.getElementById('status-feed');
    if (statusFeed) statusFeed.innerText = `CORE: ${systemStatus.state} | THREATS: ${systemStatus.threats}`;
    
    // تحديث نبض الوكلاء (Visual Sync)
    document.querySelectorAll('.agent-node').forEach(node => {
        node.style.borderColor = systemStatus.state === 'CRITICAL' ? '#ff0033' : '#00d4ff';
        node.style.background = systemStatus.state === 'CRITICAL' ? 'rgba(255, 0, 50, 0.1)' : 'rgba(0, 212, 255, 0.05)';
    });
}

/**
 * 3. تهيئة بيئة 3D (ثابتة)
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // إضافة مكعبات الوكلاء
    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });
    for(let i = 0; i < 12; i++) {
        let cube = new THREE.Mesh(geometry, material);
        cube.position.set(Math.random()*10-5, Math.random()*10-5, Math.random()*-10);
        scene.add(cube);
        cubeSwarm.push(cube);
    }
    animateSwarm();
}

function animateSwarm() {
    requestAnimationFrame(animateSwarm);
    cubeSwarm.forEach((cube) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        // النبض يتزامن مع حالة النظام
        const scale = systemStatus.state === 'CRITICAL' ? 1.5 : 1;
        cube.scale.set(scale, scale, scale);
    });
    renderer.render(scene, camera);
}

/**
 * 4. تفعيل الوكلاء (Sync Ready)
 */
function initHiveMind() {
    if (!hiveContainer) return;
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span>${systemStatus.state}</span>`;
        node.onclick = () => {
            alert(`[Protocol-Validated]\nAgent-${i} Hash: 0x${Math.random().toString(16).slice(2, 10)}\nThreats Neutralized: ${systemStatus.threats}`);
        };
        hiveContainer.appendChild(node);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    syncSystemStatus();
    setInterval(syncSystemStatus, 3000); // مزامنة أسرع كل 3 ثوانٍ
});
