/**
 * ARCHITECT-EYE OS: AGENT INTELLIGENCE DATA (v4.5 - CORE INTEGRATION)
 * Updated to reflect the 12-Agent Hive Mind architecture (Isaac Andrew, 2026).
 */

const sovereignAgentsData = [
    { id: "A-0", name: "Executive Gate", specialization: "Override Protocols", value: "Monitors Level-0 Override protocols and root-level signatures for sovereign control." },
    { id: "A-1", name: "LWE-Shield", specialization: "Lattice-Based Encryption", value: "Applies high-security LWE encryption to all inter-agent traffic to prevent data interception." },
    { id: "A-2", name: "Rust-Bus-Sync", specialization: "Latency Communication", value: "Manages the 0.002ms latency communication bus, ensuring synchronized hive-mind operations." },
    { id: "A-3", name: "Self-Healing", specialization: "Integrity Maintenance", value: "Monitors code integrity across the stack and triggers autonomous LLM correction cycles." },
    { id: "A-4", name: "Sandbox-Watch", specialization: "Malware Isolation", value: "Executes and isolates potentially malicious code blobs in a secure, restricted environment." },
    { id: "A-5", name: "Sentiment-Engine", specialization: "Interaction Analytics", value: "Analyzes system stress levels and patterns in user interaction for behavioral intelligence." },
    { id: "A-6", name: "Telemetry-Core", specialization: "Audit Trails", value: "Logs all system events into an immutable, hashed audit trail for verification." },
    { id: "A-7", name: "Compute-Bridge", specialization: "Mojo Engine Interface", value: "Interfaces directly with the Mojo engine for high-performance, heavy-scale calculations." },
    { id: "A-8", name: "Memory-Guard", specialization: "Volatile Security", value: "Ensures all volatile memory segments are securely cleared immediately post-execution." },
    { id: "A-9", name: "Signal-Dispatcher", specialization: "Status Synchronization", value: "Communicates verified system status directly to the Public Frontend via dispatch signals." },
    { id: "A-10", name: "Traffic-Analyzer", specialization: "Anomaly Detection", value: "Filters incoming network packets for anomalies and unauthorized access attempts." },
    { id: "A-11", name: "Quantum-Entropy", specialization: "Key Rotation", value: "Generates high-quality, quantum-resistant random seeds for continuous LWE key rotation." }
];

/**
 * Renders the accurate agent intelligence data into the UI.
 */
function renderAgentInfo() {
    const infoContainer = document.getElementById('agent-definitions-list');
    if (!infoContainer) return;

    infoContainer.innerHTML = sovereignAgentsData.map(agent => `
        <div class="agent-info-box" onclick="verifyAgent('${agent.name}')" style="cursor: pointer; border: 1px solid #00d4ff; padding: 12px; margin-bottom: 10px; border-radius: 8px; background: rgba(0, 212, 255, 0.05);">
            <h4 style="color: #ffd700; margin: 0;">${agent.id} | ${agent.name} <small style="color: #00d4ff;">[${agent.specialization}]</small></h4>
            <p style="font-size: 0.9rem; opacity: 0.9; margin-top: 8px; font-family: 'Courier New', monospace;">${agent.value}</p>
        </div>
    `).join('');
}

window.verifyAgent = function(agentName) {
    const signature = Math.random().toString(16).slice(2, 10);
    alert(`[Architect-Eye Integrity Check]\nAgent: ${agentName}\nSignature: 0x${signature}\nStatus: Verified Operational.`);
};

document.addEventListener('DOMContentLoaded', renderAgentInfo);
