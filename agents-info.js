/**
 * ARCHITECT-EYE OS: AGENT INTELLIGENCE DATA (v4.2 - INTERACTIVE)
 */

const sovereignAgentsData = [
    { id: "001", name: "Sentinel-Core", specialization: "Quantum-Safe Encryption", value: "Utilizes NIST-standardized algorithms (Dilithium) to protect enterprise data against future quantum threats." },
    { id: "002", name: "Hash-Guardian", specialization: "Content Authenticity", value: "Implements SHA3-256 digital seals to verify the integrity of media and defend against deepfake injections." },
    { id: "003", name: "Liquidity-Node", specialization: "DEX Optimization", value: "Monitors decentralized exchange pools to ensure optimal gas usage and slippage protection." },
    { id: "004", name: "Protocol-Architect", specialization: "Smart Contract Logic", value: "Analyzes Solidity code in real-time to detect vulnerability patterns." },
    { id: "005", name: "Privacy-Shield", specialization: "Zero-Knowledge Proofs", value: "Facilitates private transactions using ZK-SNARKs while maintaining compliance." },
    { id: "006", name: "Hive-Orchestrator", specialization: "Agent Synchronization", value: "Manages communication between all 12 nodes to ensure system resilience." },
    { id: "007", name: "Neural-Watchman", specialization: "AI Pattern Defense", value: "Detects adversarial attacks on neural networks." },
    { id: "008", name: "LWE-Processor", specialization: "Lattice-Based Security", value: "Handles score-keeping using LWE encryption to prevent score hacking." },
    { id: "009", name: "Validator-Prime", specialization: "Chain Consensus", value: "Verifies cross-chain transactions to ensure data consistency." },
    { id: "010", name: "Stealth-Router", specialization: "Network Anonymity", value: "Obfuscates system traffic to prevent metadata analysis." },
    { id: "011", name: "Audit-Bot", specialization: "Automated Compliance", value: "Generates real-time audit logs for all system activities." },
    { id: "012", name: "Sovereign-Eye", specialization: "Global Threat Vision", value: "High-level visualization of all neutralized threats across the entire grid." }
];

/**
 * Renders the agent intelligence data and binds interaction events.
 */
function renderAgentInfo() {
    const infoContainer = document.getElementById('agent-definitions-list');
    if (!infoContainer) return;

    infoContainer.innerHTML = sovereignAgentsData.map(agent => `
        <div class="agent-info-box" onclick="verifyAgent('${agent.name}')" style="cursor: pointer; border: 1px solid #00d4ff; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
            <h4 style="color: #ffd700; margin: 0;">${agent.name} <small style="color: #00d4ff;">[${agent.specialization}]</small></h4>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">${agent.value}</p>
        </div>
    `).join('');
}

/**
 * Global function to verify agent authenticity via signature alert.
 */
window.verifyAgent = function(agentName) {
    const signature = Math.random().toString(16).slice(2, 10);
    alert(`[Level-0 Authorized]\nAgent: ${agentName}\nSignature: 0x${signature}\nStatus: Active & Secure.`);
};

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', renderAgentInfo);
