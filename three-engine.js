/**
 * ARCHITECT-EYE: THREE.JS KINETIC SWARM ENGINE (v2.0)
 * -------------------------------------------------------------------------
 * Updates: Increased Agent Count, Backend-Driven Color States,
 * Procedural Kinetic Movement, and Enhanced Real-Time Responsiveness.
 */

function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    if (!canvas) {
        console.error("Three.js: Core Canvas [core-canvas] not found.");
        return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Dynamic Geometry: Increased agent (cube) count to 150 for swarm effect
    const agentCount = 150;
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3); // Smaller agents for higher density
    
    // Initializing materials based on sovereign operational engine state
    const operationalMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.6 });
    const criticalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0033, wireframe: true, transparent: true, opacity: 0.8 });
    
    const cubeSwarm = [];
    for (let i = 0; i < agentCount; i++) {
        // Deploying agent mesh based on Initial State (Assuming OPERATIONAL)
        const cube = new THREE.Mesh(geometry, operationalMaterial.clone());
        
        // Dispersing agents across a larger sovereign territory (X, Y, Z axes)
        cube.position.set(
            (Math.random() - 0.5) * 20, // Spread across width
            (Math.random() - 0.5) * 15, // Spread across height
            (Math.random() - 1) * 20   // Spread into depth
        );
        
        // Initializing procedural movement variables
        cube.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05,
            (Math.random() - 0.5) * 0.05
        );
        
        scene.add(cube);
        cubeSwarm.push(cube);
    }

    camera.position.z = 10; // Backing up camera to view the larger swarm

    /**
     * Swarm Animation Heartbeat (Proximity Alerts & Critical States)
     */
    function animate() {
        requestAnimationFrame(animate);
        
        // Extracting backend state for kinetic feedback logic (Assumes script.js link)
        const isCritical = (typeof systemStatus !== 'undefined' && systemStatus.state === 'CRITICAL');
        
        cubeSwarm.forEach(cube => {
            // 1. Procedural Movement: Agents follow velocity vectors
            cube.position.add(cube.userData.velocity);

            // 2. Kinetic Feedback: Agents rotate faster in CRITICAL state
            const rotationMultiplier = isCritical ? 5 : 1;
            cube.rotation.x += 0.01 * rotationMultiplier;
            cube.rotation.y += 0.01 * rotationMultiplier;

            // 3. Operational State Updates (Backend-driven color changes)
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

            // 4. Boundary Enforcement (Bounce logic within sovereign space)
            if (Math.abs(cube.position.x) > 10) cube.userData.velocity.x *= -1;
            if (Math.abs(cube.position.y) > 7.5) cube.userData.velocity.y *= -1;
            if (cube.position.z > 0 || cube.position.z < -20) cube.userData.velocity.z *= -1;
        });
        
        renderer.render(scene, camera);
    }
    
    // Initialize animation heartbeat
    animate();
}
