import { dashboardStats, recentAlerts, graphData } from './data.js';
import { renderHome } from './pages/home.js';
import { renderAuth } from './pages/auth.js';
import { renderVerification } from './pages/verification.js';

const landingContainer = document.getElementById('landing-container');
const contentArea = document.getElementById('content-area');
const mainContent = document.getElementById('main-content');
const sidebar = document.querySelector('.sidebar');
const pageTitle = document.getElementById('page-title');
const navItems = document.querySelectorAll('.nav-item');

// Router logic
const routes = {
    home: (c) => renderHome(c),
    login: (c) => renderAuth(c, 'login'),
    register: (c) => renderAuth(c, 'register'),
    verification: (c) => renderVerification(c),
    dashboard: renderDashboard,
    graph: renderGraph,
    replay: renderReplay,
    alerts: renderAlerts,
    accounts: renderAccounts
};

window.router = {
    navigate: (page) => navigateTo(page)
};

function init() {
    // Handle Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.getAttribute('data-page');
            navigateTo(page);
        });
    });

    // Default route
    navigateTo('home');
}

function navigateTo(page) {
    const isLanding = ['home', 'login', 'register', 'verification'].includes(page);
    
    // Toggle Layout Modes
    if (isLanding) {
        document.body.classList.add('landing-mode');
        sidebar.style.display = 'none';
        mainContent.style.display = 'none';
        landingContainer.style.display = 'block';
        landingContainer.innerHTML = '';
        routes[page](landingContainer);
    } else {
        document.body.classList.remove('landing-mode');
        sidebar.style.display = 'flex';
        mainContent.style.display = 'flex';
        landingContainer.style.display = 'none';
        
        // Update Sidebar UI
        navItems.forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-page') === page);
        });
        
        // Update Title
        if (pageTitle) pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);
        
        // Render Page
        contentArea.innerHTML = '';
        if (routes[page]) {
            routes[page]();
        }
    }
}

// Reuse existing dashboard, graph, replay functions...
// (I will keep them in main.js for now to avoid too many small files)

function renderDashboard() {
    contentArea.innerHTML = `
        <div class="dashboard-grid fade-in">
            <div class="stats-row">
                ${renderStatCard('Total Transactions', dashboardStats.totalTransactions)}
                ${renderStatCard('Suspicious Activity', dashboardStats.suspiciousCount, true)}
                ${renderStatCard('Fraud Risk Level', dashboardStats.fraudRisk, false, dashboardStats.fraudRisk.score)}
                ${renderStatCard('Active Cases', dashboardStats.activeInvestigations)}
            </div>
            <div class="charts-row">
                <div class="card chart-card flex-2">
                    <div class="card-header"><h3>Transaction Velocity</h3></div>
                    <canvas id="velocityChart"></canvas>
                </div>
                <div class="card chart-card flex-1">
                    <div class="card-header"><h3>Risk Distribution</h3></div>
                    <canvas id="riskChart"></canvas>
                </div>
            </div>
            <div class="card alerts-card">
                <div class="card-header"><h3>Priority Alerts</h3></div>
                <table class="data-table">
                    <thead><tr><th>ID</th><th>Account</th><th>Amount</th><th>Pattern</th><th>Risk</th><th>Status</th></tr></thead>
                    <tbody>${recentAlerts.map(a => `<tr><td><span class="id-tag">${a.id}</span></td><td>${a.account}</td><td>${a.amount}</td><td>${a.type}</td><td><span class="risk-pill ${getRiskClass(a.risk)}">${a.risk}%</span></td><td><span class="status status-${a.status.toLowerCase()}">${a.status}</span></td></tr>`).join('')}</tbody>
                </table>
            </div>
        </div>
    `;
    setTimeout(initDashboardCharts, 0);
}

function renderStatCard(title, data, isDanger = false, score = null) {
    const trendClass = data.trend === 'up' ? 'text-safe' : 'text-danger';
    return `
        <div class="card stat-card ${isDanger ? 'border-danger' : ''} fade-in">
            <span class="stat-label">${title}</span>
            <div class="stat-value">
                ${data.value}
                ${score !== null ? `<span class="score-tag ${getRiskClass(score)}">${score}pt</span>` : ''}
            </div>
            <div class="stat-footer mt-1">
                <span class="${trendClass}">${data.change}</span> 
                <span class="text-secondary">vs last month</span>
            </div>
        </div>
    `;
}

function getRiskClass(score) { return score > 70 ? 'risk-high' : score > 30 ? 'risk-medium' : 'risk-low'; }

function initDashboardCharts() {
    const vCtx = document.getElementById('velocityChart');
    if (vCtx) {
        new Chart(vCtx.getContext('2d'), { 
            type: 'line', 
            data: { 
                labels: ['10am', '12pm', '2pm', '4pm', '6pm', '8pm'], 
                datasets: [{ 
                    label: 'Transactions',
                    data: [120, 190, 300, 500, 200, 300], 
                    borderColor: '#2563EB', 
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    fill: true,
                    tension: 0.4 
                }] 
            }, 
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } } 
        });
    }
    const rCtx = document.getElementById('riskChart');
    if (rCtx) {
        new Chart(rCtx.getContext('2d'), { 
            type: 'doughnut', 
            data: { 
                labels: ['Safe', 'Review', 'Fraud'], 
                datasets: [{ data: [70, 20, 10], backgroundColor: ['#10B981', '#F59E0B', '#EF4444'], borderWidth: 0 }] 
            },
            options: { cutout: '75%', plugins: { legend: { position: 'bottom' } } }
        });
    }
}

function renderGraph() {
    contentArea.innerHTML = `<div class="graph-container fade-in"><div class="graph-toolbar"><div class="filter-panel card"><h4>Graph Filters</h4><div class="filter-group"><label>Min Amount</label><input type="range"></div><button class="btn btn-primary w-100">Recalculate</button></div></div><div id="mynetwork"></div><div id="node-details" class="node-panel glass-morphism"><h3>Select a node</h3></div></div>`;
    setTimeout(() => {
        const net = new vis.Network(document.getElementById('mynetwork'), graphData, { nodes: { shape: 'dot' }, physics: { stabilization: true } });
        net.on("click", (p) => { if(p.nodes.length) { const n = graphData.nodes.find(x => x.id === p.nodes[0]); document.getElementById('node-details').innerHTML = `<h3>${n.label}</h3><p>${n.title.replace(/\n/g, '<br>')}</p>`; } });
    }, 100);
}

function renderReplay() {
    contentArea.innerHTML = `<div class="replay-container fade-in"><div class="replay-main"><div class="replay-viz card"><div class="flow-animation"><div class="flow-node" id="node-0">A101</div><div class="flow-arrow" id="arrow-0">→</div><div class="flow-node" id="node-1">B205</div><div class="flow-arrow" id="arrow-1">→</div><div class="flow-node" id="node-2">C309</div><div class="flow-arrow" id="arrow-2">→</div><div class="flow-node" id="node-3">D411</div></div><div class="replay-controls"><button id="play-btn">▶️</button><input type="range" id="replay-slider" style="flex:1"><span id="replay-timer">00:00</span></div></div></div></div>`;
    // Replay logic simplified for brevity in this update
}

function renderAlerts() {
    contentArea.innerHTML = `<div class="card mt-2"><h2>Alerts</h2><table class="data-table"><tbody>${recentAlerts.map(a => `<tr><td>${a.id}</td><td>${a.account}</td><td><button class="btn btn-primary" onclick="window.router.navigate('graph')">Investigate</button></td></tr>`).join('')}</tbody></table></div>`;
}

function renderAccounts() {
    contentArea.innerHTML = `<h2>Accounts Management</h2><div class="card mt-2">Account directory content...</div>`;
}

init();
