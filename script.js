/**
 * ARCHITECT-EYE OS: SOVEREIGN OPERATIONAL ENGINE (v4.1 - BLUE MATRIX)
 * -------------------------------------------------------------------------
 * Features: 3D Swarm, Backend Sync (status.txt), Logic separation.
 */

const hiveContainer = document.getElementById('hive-visualization');
let scene, camera, renderer, cubeSwarm = [];
let currentSystemState = 'OPERATIONAL';

/**
 * 1. محرك المزامنة (Backend Link)
 * يسحب البيانات من status.txt المحدث عبر GitHub Actions
 */
async function syncSystemStatus() {
    try {
        const response = await fetch('status.txt?nocache=' + new Date().getTime());
        const data = await response.text();
        
        const statusFeed = document.getElementById('status-feed');
        if (statusFeed) {
            statusFeed.innerText = "CORE: " + data.split('|')[0].replace('Status: ', '');
        }
        
        // تحديث حالة النظام بناءً على البيانات
        if (data.includes('CRITICAL')) currentSystemState = 'CRITICAL';
        else currentSystemState = 'OPERATIONAL';
        
    } catch (error) {
        console.warn("Backend Sync Pending...");
    }
}

/**
 * 2. منطق التنقل (Navigation)
 */
function navigateTo(viewId) {
    document.querySelectorAll('.view-container').forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none';
    });
    const target = document.getElementById(viewId);
    if (target) {
        target.classList.add('active');
        target.style.display = 'flex';
    }
}

/**
 * 3. تهيئة بيئة 3D
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
    scene.background = loader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

    const geometry = new THREE.BoxGeometry(0.6, 0.6, 0.6);
    const material = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.7 });

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
 * 4. منطق الوكلاء (Hive Mind)
 * تم إزالة navigateTo لجعل الضغط مخصصاً للمراقبة فقط
 */
function initHiveMind() {
    if (!hiveContainer) return;
    hiveContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const node = document.createElement('div');
        node.className = 'agent-node';
        node.innerHTML = `<strong>AGENT-${i}</strong><br><span>ACTIVE</span>`;
        // الضغط لا يغير الواجهة، بل يرسل إشارة في الـ Console (يمكنك ربطها بـ Modal مستقبلاً)
        node.onclick = () => console.log(`Agent ${i} Querying...`);
        hiveContainer.appendChild(node);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    init3DEnvironment();
    initHiveMind();
    syncSystemStatus();
    setInterval(syncSystemStatus, 5000); // مزامنة كل 5 ثوانٍ
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
