// Mock Data for PatternX
export const dashboardStats = {
    totalTransactions: {
        value: "₹1.2M",
        change: "+12.5%",
        trend: "up"
    },
    suspiciousCount: {
        value: "42",
        change: "+5",
        trend: "up"
    },
    fraudRisk: {
        value: "High",
        score: 84,
        trend: "stable"
    },
    activeInvestigations: {
        value: "8",
        change: "-2",
        trend: "down"
    }
};

export const recentAlerts = [
    { id: "AL-1092", account: "A101", amount: "₹49,000", risk: 92, type: "Circular Transaction", status: "Open" },
    { id: "AL-1093", account: "B205", amount: "₹48,500", risk: 85, type: "Layering Detected", status: "Investigating" },
    { id: "AL-1094", account: "C309", amount: "₹49,200", risk: 78, type: "Structuring Pattern", status: "Closed" },
    { id: "AL-1095", account: "D411", amount: "₹1,200", risk: 45, type: "Unusual Profile", status: "Investigating" }
];

export const graphData = {
    nodes: [
        { id: 1, label: 'A101', title: 'ID: A101\nBalance: ₹1.2M\nRisk: 92%', color: '#EF4444', size: 25 },
        { id: 2, label: 'B205', title: 'ID: B205\nLast Tx: 2m ago\nRisk: 65%', color: '#3B82F6' },
        { id: 3, label: 'C309', title: 'ID: C309\nLast Tx: 1m ago\nRisk: 78%', color: '#3B82F6' },
        { id: 4, label: 'D411', title: 'ID: D411\nAnomalous Activity\nRisk: 88%', color: '#EF4444', size: 25 },
        { id: 5, label: 'E502', title: 'ID: E502\nVerified User\nRisk: 12%', color: '#22C55E' },
        { id: 6, label: 'F610', title: 'ID: F610\nVerified User\nRisk: 5%', color: '#22C55E' }
    ],
    edges: [
        { from: 1, to: 2, label: '₹49k', color: '#EF4444', arrows: 'to' },
        { from: 2, to: 3, label: '₹48.5k', color: '#EF4444', arrows: 'to' },
        { from: 3, to: 4, label: '₹49.2k', color: '#EF4444', arrows: 'to' },
        { from: 4, to: 1, label: '₹45k', color: '#EF4444', arrows: 'to', dashes: true },
        { from: 1, to: 5, label: '₹1.2k', color: '#3B82F6', arrows: 'to' },
        { from: 5, to: 6, label: '₹0.8k', color: '#3B82F6', arrows: 'to' }
    ]
};
