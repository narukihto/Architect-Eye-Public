/**
 * ARCHITECT-EYE OS: AGENT INTELLIGENCE DATA
 * -------------------------------------------------------------------------
 * Content: Strategic definitions of the 12-Agent Swarm
 * Purpose: Enterprise Utility & Technical Specifications
 * -------------------------------------------------------------------------
 */

const sovereignAgentsData = [
    {
        id: "001",
        name: "Sentinel-Core",
        specialization: "Quantum-Safe Encryption",
        value: "Utilizes NIST-standardized algorithms (Dilithium) to protect enterprise data against future quantum threats."
    },
    {
        id: "002",
        name: "Hash-Guardian",
        specialization: "Content Authenticity",
        value: "Implements SHA3-256 digital seals to verify the integrity of media and defend against deepfake injections."
    },
    {
        id: "003",
        name: "Liquidity-Node",
        specialization: "DEX Optimization",
        value: "Monitors decentralized exchange pools to ensure optimal gas usage and slippage protection for institutional funds."
    },
    {
        id: "004",
        name: "Protocol-Architect",
        specialization: "Smart Contract Logic",
        value: "Analyzes Solidity code in real-time to detect vulnerability patterns like funds-freeze or reentrancy."
    },
    {
        id: "005",
        name: "Privacy-Shield",
        specialization: "Zero-Knowledge Proofs",
        value: "Facilitates private transactions using ZK-SNARKs while maintaining regulatory compliance for organizations."
    },
    {
        id: "006",
        name: "Hive-Orchestrator",
        specialization: "Agent Synchronization",
        value: "Manages the communication between all 12 nodes to ensure no single point of failure in the system."
    },
    {
        id: "007",
        name: "Neural-Watchman",
        specialization: "AI Pattern Defense",
        value: "Detects adversarial attacks on neural networks to prevent model manipulation by hostile actors."
    },
    {
        id: "008",
        name: "LWE-Processor",
        specialization: "Lattice-Based Security",
        value: "Handles score-keeping and database records using Learning With Errors (LWE) encryption to prevent score hacking."
    },
    {
        id: "009",
        name: "Validator-Prime",
        specialization: "Chain Consensus",
        value: "Verifies cross-chain transactions to ensure data consistency between the system and external blockchains."
    },
    {
        id: "010",
        name: "Stealth-Router",
        specialization: "Network Anonymity",
        value: "Obfuscates system traffic to prevent metadata analysis by third-party surveillance entities."
    },
    {
        id: "011",
        name: "Audit-Bot",
        specialization: "Automated Compliance",
        value: "Generates real-time audit logs for all system activities to meet high-level corporate transparency standards."
    },
    {
        id: "012",
        name: "Sovereign-Eye",
        specialization: "Global Threat Vision",
        value: "A high-level overview agent that visualizes all neutralized threats across the entire grid."
    }
];

/**
 * Function to render agent info in the Information View
 */
function renderAgentInfo() {
    const infoContainer = document.getElementById('agent-definitions-list');
    if (!infoContainer) return;

    infoContainer.innerHTML = sovereignAgentsData.map(agent => `
        <div class="agent-info-box" style="margin-bottom: 20px; padding: 15px; border-bottom: 1px solid rgba(255,215,0,0.2);">
            <h4 style="color: #ffd700; margin: 0;">${agent.name} <small style="color: #00d4ff;">[${agent.specialization}]</small></h4>
            <p style="font-size: 0.85rem; opacity: 0.8; line-height: 1.4; margin-top: 8px;">${agent.value}</p>
        </div>
    `).join('');
}

// Ensure data loads when the Architect visits the Info View
document.addEventListener('DOMContentLoaded', renderAgentInfo);
