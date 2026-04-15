/**
 * ARCHITECT-EYE: THREE.JS KINETIC SWARM ENGINE (v2.1)
 * -------------------------------------------------------------------------
 * Updates: Decentralized Agent Spreading (Edge-to-Edge Deployment),
 * Enhanced Global Boundary Logic, and Dynamic Kinematics.
 */

function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    if (!canvas) {
        console.error("Three.js: Core Canvas [core-canvas] not found.");
        return;
    }

    const scene = new THREE.Scene();
    
    // 1. ARCHITECTURAL SPREADING CALCULATION (Dynamic FOV & Aspect)
    const aspect = window.innerWidth / window.innerHeight;
    const fov = 75; // Optimal field of view for immersion
    const camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 2000);
    
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Dynamic Geometry: Swarm of 150 kinetic agents
    const agentCount = 150;
    const geometry = new THREE.BoxGeometry(0.35, 0.35, 0.35); 
    
    // Materials based on sovereign operational engine state
    const operationalMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.6 });
    const criticalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0033, wireframe: true, transparent: true, opacity: 0.8 });
    
    // 2. SOVEREIGN DEPLOYMENT: Calculating global boundaries based on camera distance
    const xSpread = 35 * aspect; // Scales spread on X axis with screen width
    const ySpread = 35;          // Scales spread on Y axis with screen height
    const zDepth = 60;           // Spreading from 0 to -60 depth

    const cubeSwarm = [];
    for (let i = 0; i < agentCount; i++) {
        // Deploy agent mesh
        const cube = new THREE.Mesh(geometry, operationalMaterial.clone());
        
        // --- CORE CHANGE: Full Site Dispersion (Edge-to-Edge) ---
        // Deploying agents across the entire expanded sovereign territory
        cube.position.set(
            (Math.random() - 0.5) * xSpread, 
            (Math.random() - 0.5) * ySpread, 
            (Math.random() - 1) * zDepth    
        );
        
        // Procedural movement initialization
        cube.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.06, 
            (Math.random() - 0.5) * 0.06,
            (Math.random() - 0.5) * 0.06
        );
        
        scene.add(cube);
        cubeSwarm.push(cube);
    }

    camera.position.z = 25; // Backing up camera further to view the whole expanded system

    /**
     * Swarm Animation Heartbeat (Expanded Boundary Enforcement)
     */
    function animate() {
        requestAnimationFrame(animate);
        
        // Extracting backend state for kinetic feedback logic
        const isCritical = (typeof systemStatus !== 'undefined' && systemStatus.state === 'CRITICAL');
        
        cubeSwarm.forEach(cube => {
            // 1. Procedural Movement
            cube.position.add(cube.userData.velocity);

            // 2. Kinetic Feedback: Faster rotation in CRITICAL state
            const rotationMultiplier = isCritical ? 5 : 1;
            cube.rotation.x += 0.01 * rotationMultiplier;
            cube.rotation.y += 0.01 * rotationMultiplier;

            // 3. Operational State Color Sync
            if (isCritical) {
                if (cube.material.color.getHex() !== criticalMaterial.color.getHex()) {
                    cube.material.color.setHex(criticalMaterial.color.getHex());
                    cube.material.opacity = 0.8;
                }
            } else {
                if (cube.material.color.getHex() !== operationalMaterial.color.getHex()) {
                    cube.material.color.setHex(operationalMaterial.color.getHex());
                    cube.material.opacity = 0.6;
                }
            }

            // --- CORE CHANGE: Expanded Global Boundary Checks ---
            // Agents bounce logic revised for the larger deployment volume
            if (Math.abs(cube.position.x) > xSpread / 1.8) cube.userData.velocity.x *= -1;
            if (Math.abs(cube.position.y) > ySpread / 1.8) cube.userData.velocity.y *= -1;
            if (cube.position.z > 5 || cube.position.z < -zDepth) cube.userData.velocity.z *= -1;
        });
        
        renderer.render(scene, camera);
    }
    
    // Responsive Sovereign Scaling: Adjust on resize
    window.addEventListener('resize', () => {
        const newAspect = window.innerWidth / window.innerHeight;
        camera.aspect = newAspect;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Initialize animation heartbeat
    animate();
}
