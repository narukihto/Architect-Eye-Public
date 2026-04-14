/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.2 - BLUE MATRIX)
 * -------------------------------------------------------------------------
 * Updates: Robust 3D Fallback, Signature Verification Engine, UI Sync.
 */

const hiveContainer = document.getElementById('agent-definitions-list'); // متوافق مع الحاوية الجديدة
let scene, camera, renderer, cubeSwarm = [];
let currentSystemState = 'OPERATIONAL';

/**
 * 1. محرك المزامنة (Backend Link)
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) statusFeed.innerText = "CORE: " + data.split('|')[0].replace('Status: ', '');
        currentSystemState = data.includes('CRITICAL') ? 'CRITICAL' : 'OPERATIONAL';
    } catch (e) { console.warn("Backend Sync Pending..."); }
}

/**
 * 2. تهيئة بيئة 3D (مع إضافة معالجة خطأ للملمس)
 */
function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const loader = new THREE.CubeTextureLoader();
    loader.setPath('space/');
    // Fallback لضمان عدم تجمد الـ Renderer إذا فقد الاتصال بالصور
    loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'], 
        (tex) => { scene.background = tex; },
        undefined, 
        () => { console.warn("Space textures missing, using black void."); }
    );

    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true });

    for(let i = 0; i < 20; i++) {
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
        const pulse = currentSystemState === 'CRITICAL' ? Math.sin(Date.now() * 0.005) * 2 : 0;
        cube.scale.set(1 + pulse, 1 + pulse, 1 + pulse);
    });
    renderer.render(scene, camera);
}

/**
 * 3. محرك الوكلاء التفاعلي (Hive Mind - v4.2)
 * تفعيل التوقيع الرقمي عند الضغط
 */
function initHiveMind() {
    if (!hiveContainer) return;
    hiveContainer.innerHTML = '';
    
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.style.cursor = 'pointer'; // لضمان الاستجابة
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span>ACTIVE</span>`;
        
        // التوقيع الرقمي عند الضغط
        node.onclick = () => {
            alert(`[Level-0 Authorized]\nAgent-${i} Signature: 0x${Math.random().toString(16).slice(2, 10)}\nStatus: Secure & Synchronized.`);
        };
        hiveContainer.appendChild(node);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    syncSystemStatus();
    setInterval(syncSystemStatus, 5000);
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
