/**
 * ARCHITECT-EYE: KINETIC LIFECYCLE ENGINE (v3.0)
 * -------------------------------------------------------------------------
 * NEW: Multi-phase movement protocol:
 * 1. CONVERGE: Agents cluster to the center.
 * 2. DISPERSE: Agents expand to full sovereign space.
 * 3. ORBIT: Agents rotate in a synchronized swarm formation.
 */

// ... (keep the initialization part as before)

    // Add state tracking to each cube
    cubeSwarm.forEach(cube => {
        cube.userData.phase = 'DISPERSE'; // Starting phase
        cube.userData.phaseTimer = 0;
    });

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
                    // Move towards center (0,0,0)
                    cube.position.lerp(new THREE.Vector3(0, 0, 0), 0.01);
                    break;

                case 'DISPERSE':
                    // Standard movement logic
                    cube.position.add(cube.userData.velocity);
                    // Boundary enforcement
                    if (Math.abs(cube.position.x) > xSpread / 1.8) cube.userData.velocity.x *= -1;
                    if (Math.abs(cube.position.y) > ySpread / 1.8) cube.userData.velocity.y *= -1;
                    break;

                case 'ORBIT':
                    // Synchronized Orbit around center
                    const radius = 5;
                    cube.position.x = Math.cos(time + cube.userData.id) * radius;
                    cube.position.y = Math.sin(time + cube.userData.id) * radius;
                    cube.position.z = Math.sin(time * 0.5) * radius;
                    break;
            }

            // Rotation
            const rotationMultiplier = isCritical ? 5 : 1;
            cube.rotation.x += 0.01 * rotationMultiplier;
            cube.rotation.y += 0.01 * rotationMultiplier;

            // ... (keep the rest of the material color sync logic)
        });
        renderer.render(scene, camera);
    }
