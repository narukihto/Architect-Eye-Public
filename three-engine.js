/**
 * ARCHITECT-EYE: KINETIC LIFECYCLE ENGINE (v3.0)
 * -------------------------------------------------------------------------
 * NEW: Multi-phase movement protocol:
 * 1. CONVERGE: Agents cluster to the center.
 * 2. DISPERSE: Agents expand to full sovereign space.
 * 3. ORBIT: Agents rotate in a synchronized swarm formation.
 */

function init3DEnvironment() {
    const canvas = document.getElementById('core-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const aspect = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 2000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const agentCount = 150;
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5); // Increased size
    const operationalMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.6 });
    const criticalMaterial = new THREE.MeshBasicMaterial({ color: 0xff0033, wireframe: true, transparent: true, opacity: 0.8 });
    
    const xSpread = 35 * aspect;
    const ySpread = 35;
    const zDepth = 60;

    const cubeSwarm = [];
    for (let i = 0; i < agentCount; i++) {
        const cube = new THREE.Mesh(geometry, operationalMaterial.clone());
        cube.userData.id = i; // Unique ID for orbit synchronization
        cube.userData.phase = 'DISPERSE';
        cube.userData.phaseTimer = 0;
        
        cube.position.set(
            (Math.random() - 0.5) * xSpread, 
            (Math.random() - 0.5) * ySpread, 
            (Math.random() - 1) * zDepth    
        );
        
        cube.userData.velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.06,
            (Math.random() - 0.5) * 0.06,
            (Math.random() - 0.5) * 0.06
        );
        
        scene.add(cube);
        cubeSwarm.push(cube);
    }

    camera.position.z = 25;

    function animate() {
        requestAnimationFrame(animate);
        const isCritical = (typeof systemStatus !== 'undefined' && systemStatus.state === 'CRITICAL');
        const time = Date.now() * 0.001;

        cubeSwarm.forEach(cube => {
            cube.userData.phaseTimer++;

            // Phase Switching Logic (Every 500 frames)
            if (cube.userData.phaseTimer > 500) {
                const phases = ['CONVERGE', 'DISPERSE', 'ORBIT'];
                cube.userData.phase = phases[Math.floor(Math.random() * phases.length)];
                cube.userData.phaseTimer = 0;
            }

            // Phase Execution
            switch (cube.userData.phase) {
                case 'CONVERGE':
                    cube.position.lerp(new THREE.Vector3(0, 0, 0), 0.02);
                    break;
                case 'DISPERSE':
                    cube.position.add(cube.userData.velocity);
                    if (Math.abs(cube.position.x) > xSpread / 1.8) cube.userData.velocity.x *= -1;
                    if (Math.abs(cube.position.y) > ySpread / 1.8) cube.userData.velocity.y *= -1;
                    break;
                case 'ORBIT':
                    const radius = 8;
                    cube.position.x = Math.cos(time + cube.userData.id * 0.1) * radius;
                    cube.position.y = Math.sin(time + cube.userData.id * 0.1) * radius;
                    cube.position.z = Math.sin(time * 0.5) * radius;
                    break;
            }

            // Rotation
            const rotationMultiplier = isCritical ? 8 : 2;
            cube.rotation.x += 0.02 * rotationMultiplier;
            cube.rotation.y += 0.02 * rotationMultiplier;

            // Material Sync
            const targetMaterial = isCritical ? criticalMaterial : operationalMaterial;
            if (cube.material.color.getHex() !== targetMaterial.color.getHex()) {
                cube.material.color.setHex(targetMaterial.color.getHex());
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}
