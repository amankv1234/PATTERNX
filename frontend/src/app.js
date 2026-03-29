/* ========================================================
   PatternX — App Logic (Routing, KYC, Charts, Graph, GSAP)
   ======================================================== */

// ===== ROUTING =====
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
    // GSAP Reveal for premium transition
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(target, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      // Stagger child elements if they have reveal class
      gsap.from(target.querySelectorAll('.reveal-up'), {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });
    }
  }
  if (pageId === 'dashboard') {
    setTimeout(() => {
      initDashboard();
    }, 150);
  }
  
  if (pageId === 'landing') {
    initLandingAnims();
  }
}

// ===== CUSTOM CURSOR LOGIC =====
if (typeof gsap !== 'undefined') {
  document.addEventListener('mousemove', e => {
    gsap.to('.cursor-dot', { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to('.cursor-outline', { x: e.clientX, y: e.clientY, duration: 0.15 });
  });

  document.addEventListener('mouseover', e => {
    const target = e.target.closest('button, a, .nav-item, .feat-card, .stat-tile');
    if (target) {
      gsap.to('.cursor-outline', { scale: 1.5, backgroundColor: 'rgba(37,99,235,0.08)', borderColor: 'transparent', duration: 0.2 });
    } else {
      gsap.to('.cursor-outline', { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--blue)', duration: 0.2 });
    }
  });
}

function initLandingAnims() {
  if (typeof gsap !== 'undefined') {
    gsap.from(".hero-left > *", { opacity: 0, x: -40, stagger: 0.15, duration: 0.8, ease: "power2.out" });
    gsap.from(".hero-right", { opacity: 0, scale: 0.9, duration: 1, ease: "back.out(1.7)", delay: 0.4 });
    
    // Feature Reveal
    gsap.from(".feat-card", { 
      scrollTrigger: {
        trigger: ".feature-grid",
        start: "top 85%",
      },
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6
    });
  }
}

// ===== SECTION SWITCHING (App Shell) =====
function switchSection(sectionId, el) {
  // Hide all sections first
  document.querySelectorAll('.section').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const section = document.getElementById('section-' + sectionId);
  if (section) {
    section.classList.remove('hidden');
    section.classList.add('active');
    
    // GSAP Reveal for section switch
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(section, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" });
    }
  }
  if (el) el.classList.add('active');
  
  const titles = { 
    dashboard: 'Dashboard', 
    graph: 'Graph Analytics', 
    replay: 'Fraud Replay', 
    alerts: 'Alert Center', 
    accounts: 'Account Management' 
  };
  document.getElementById('section-title').textContent = titles[sectionId] || sectionId;
  
  if (sectionId === 'dashboard') initDashboard();
  if (sectionId === 'graph') setTimeout(renderGraph, 100);
  if (sectionId === 'replay') resetReplayUI();
  if (sectionId === 'alerts') renderAlertsFull();
  if (sectionId === 'accounts') renderAccounts();
}

// ===== MOCK DATA =====
const ALERTS = [
  { id: 'FRD-0042', account: 'A102 → B205', amount: '₹47.3L', type: 'Circular Layering', risk: 94, status: 'active' },
  { id: 'FRD-0041', account: 'C309 Network', amount: '₹28.1L', type: 'Burst Pattern', risk: 87, status: 'pending' },
  { id: 'FRD-0040', account: 'D411 Shell Co.', amount: '₹15.6L', type: 'Smurfing', risk: 72, status: 'pending' },
  { id: 'FRD-0039', account: 'E512 → F601', amount: '₹9.2L', type: 'Velocity Spike', risk: 61, status: 'resolved' },
  { id: 'FRD-0038', account: 'G703 Ghost Acc.', amount: '₹4.8L', type: 'Structuring', risk: 55, status: 'resolved' },
  { id: 'FRD-0037', account: 'H804 Mule App', amount: '₹12.4L', type: 'Layering', risk: 82, status: 'active' },
  { id: 'FRD-0036', account: 'I905 Rapid Tx', amount: '₹6.2L', type: 'Velocity', risk: 45, status: 'resolved' },
];

const ACCOUNTS = [
  { name: 'Anil Kumar', id: 'ACC-A102', balance: '₹2.4L', risk: 92, riskClass: 'high', txns: 1240, flag: 'Flagged' },
  { name: 'Priya Mehta', id: 'ACC-B205', balance: '₹87K', risk: 78, riskClass: 'high', txns: 430, flag: 'Flagged' },
  { name: 'Ravi Sharma', id: 'ACC-C309', balance: '₹14.2L', risk: 35, riskClass: 'medium', txns: 820, flag: 'Review' },
  { name: 'Sunita Devi', id: 'ACC-D411', balance: '₹6.1L', risk: 18, riskClass: 'low', txns: 210, flag: 'Clear' },
  { name: 'Mohammed Ali', id: 'ACC-E512', balance: '₹1.1L', risk: 65, riskClass: 'medium', txns: 540, flag: 'Review' },
  { name: 'Kavitha Rao', id: 'ACC-F601', balance: '₹34.8L', risk: 12, riskClass: 'low', txns: 98, flag: 'Clear' },
  { name: 'Rajesh Gupta', id: 'ACC-G703', balance: '₹5.2L', risk: 88, riskClass: 'high', txns: 1100, flag: 'Flagged' },
  { name: 'Meena Iyer', id: 'ACC-H804', balance: '₹9.8L', risk: 52, riskClass: 'medium', txns: 670, flag: 'Review' },
];

function getRiskColor(score) {
  if (score > 70) return 'high';
  if (score > 40) return 'medium';
  return 'low';
}

// ===== DASHBOARD =====
function initDashboard() {
  renderAlertsTable();
  initCharts();
}

function renderAlertsTable() {
  const tbody = document.getElementById('alerts-table-body');
  if (!tbody) return;
  tbody.innerHTML = ALERTS.map(a => `
    <tr>
      <td><span class="alert-id">${a.id}</span></td>
      <td><strong>${a.account}</strong></td>
      <td><strong>${a.amount}</strong></td>
      <td>${a.type}</td>
      <td><span class="risk-chip ${getRiskColor(a.risk)}">${a.risk}%</span></td>
      <td><span class="status-badge ${a.status}">${a.status}</span></td>
      <td><button class="btn-investigate" onclick="investigateAlert('${a.id}')">Investigate</button></td>
    </tr>
  `).join('');
}

function investigateAlert(id) {
  const alert = ALERTS.find(a => a.id === id);
  if (!alert) return;
  switchSection('graph', null);
  // Optionally highlight node in graph if it exists
  if (networkInstance) {
    const nodeId = id.includes('0042') ? 1 : 2; // Mock logic to select a relevant node
    networkInstance.selectNodes([nodeId]);
    // Trigger node inspector
    const node = networkInstance.body.data.nodes.get(nodeId);
    if (node) {
      const panel = document.getElementById('node-detail');
      if (panel) {
        panel.innerHTML = `
          <h4>Node Inspector — ${node.label.split('\n')[0]}</h4>
          <div style="margin-top:14px;font-size:0.88rem;color:#64748B;line-height:2">
            ${node.title.replace(/\n/g, '<br>')}
          </div>
          <button class="btn-investigate" style="margin-top:16px;width:100%;padding:12px" onclick="switchSection('replay',null)">🎬 View Replay</button>
        `;
      }
    }
  }
}

let chartsInitialized = false;
function initCharts() {
  if (chartsInitialized) return;
  chartsInitialized = true;

  const vCanvas = document.getElementById('velocityChart');
  if (vCanvas) {
    new Chart(vCanvas, {
      type: 'line',
      data: {
        labels: ['8am','10am','12pm','2pm','4pm','6pm','8pm','10pm'],
        datasets: [
          {
            label: 'Normal',
            data: [320, 480, 590, 510, 620, 540, 380, 290],
            borderColor: '#10B981', backgroundColor: 'rgba(16,185,129,0.07)',
            fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#10B981'
          },
          {
            label: 'Suspicious',
            data: [40, 90, 220, 180, 300, 260, 140, 60],
            borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.07)',
            fill: true, tension: 0.4, pointRadius: 4, pointBackgroundColor: '#EF4444'
          }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { grid: { color: '#F1F5FF' }, beginAtZero: true }
        }
      }
    });
  }

  const rCanvas = document.getElementById('riskChart');
  if (rCanvas) {
    new Chart(rCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Safe (68%)', 'Review (22%)', 'Fraud (10%)'],
        datasets: [{
          data: [68, 22, 10],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          borderWidth: 0, hoverOffset: 8
        }]
      },
      options: {
        cutout: '72%',
        plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 16, font: { size: 12 } } } }
      }
    });
  }
}

// ===== GRAPH VISUALIZATION =====
let networkInstance = null;
function renderGraph() {
  const container = document.getElementById('network-container');
  if (!container || typeof vis === 'undefined') return;
  if (networkInstance) { networkInstance.destroy(); networkInstance = null; }

  const amountVal = document.getElementById('amount-filter')?.value || 0;
  const riskVal = document.getElementById('risk-filter')?.value || 0;

  let rawNodes = [
    { id: 1, label: 'A102\nOrigin', amt: 47.3, risk: 94, color: { background: '#EF4444', border: '#B91C1C' }, font: { color: '#fff', size: 12 }, size: 30, title: 'Account: A102\nBalance: ₹2.4L\nRisk: 94%\nFlag: HIGH RISK' },
    { id: 2, label: 'B205\nShell Co.', amt: 28.1, risk: 78, color: { background: '#EF4444', border: '#B91C1C' }, font: { color: '#fff', size: 12 }, size: 24, title: 'Account: B205\nBalance: ₹87K\nRisk: 78%\nFlag: SHELL CO.' },
    { id: 3, label: 'C309\nMule', amt: 19, risk: 35, color: { background: '#F59E0B', border: '#D97706' }, font: { color: '#fff', size: 12 }, size: 22, title: 'Account: C309\nBalance: ₹14.2L\nRisk: 35%\nFlag: REVIEW' },
    { id: 4, label: 'D411\nReturn', amt: 15, risk: 65, color: { background: '#EF4444', border: '#B91C1C' }, font: { color: '#fff', size: 12 }, size: 24, title: 'Account: D411\nBalance: ₹6.1L\nRisk: 65%\nFlag: FLAGGED' },
    { id: 5, label: 'E512\nNormal', amt: 4, risk: 18, color: { background: '#2563EB', border: '#1D4ED8' }, font: { color: '#fff', size: 12 }, size: 18, title: 'Account: E512\nBalance: ₹1.1L\nRisk: 18%\nFlag: CLEAR' },
    { id: 6, label: 'F601\nClean', amt: 2, risk: 12, color: { background: '#10B981', border: '#059669' }, font: { color: '#fff', size: 12 }, size: 16, title: 'Account: F601\nBalance: ₹34.8L\nRisk: 12%\nFlag: CLEAR' },
  ];

  let filteredNodes = rawNodes.filter(n => n.amt >= (amountVal/2) && n.risk >= riskVal);
  const nodes = new vis.DataSet(filteredNodes);

  const edges = new vis.DataSet([
    { from: 1, to: 2, label: '₹28L', color: { color: '#EF4444' }, width: 3, arrows: 'to', dashes: false },
    { from: 2, to: 3, label: '₹19L', color: { color: '#F59E0B' }, width: 2, arrows: 'to' },
    { from: 3, to: 4, label: '₹15L', color: { color: '#F59E0B' }, width: 2, arrows: 'to' },
    { from: 4, to: 1, label: '₹45L', color: { color: '#EF4444' }, width: 3, arrows: 'to', dashes: [5, 5] },
    { from: 5, to: 3, label: '₹4L', color: { color: '#2563EB' }, width: 1, arrows: 'to' },
    { from: 6, to: 5, label: '₹2L', color: { color: '#10B981' }, width: 1, arrows: 'to' },
  ].filter(e => {
      const fromNode = filteredNodes.find(n => n.id === e.from);
      const toNode = filteredNodes.find(n => n.id === e.to);
      return fromNode && toNode;
  }));

  networkInstance = new vis.Network(container, { nodes, edges }, {
    physics: { solver: 'forceAtlas2Based', stabilization: { iterations: 150 } },
    interaction: { tooltipDelay: 100, hover: true },
    nodes: { shape: 'dot', borderWidth: 3, shadow: { enabled: true, size: 10 } },
    edges: { smooth: { type: 'curvedCW', roundness: 0.2 } }
  });

  networkInstance.on('click', params => {
    if (params.nodes.length) {
      const nodeId = params.nodes[0];
      const node = nodes.get(nodeId);
      const panel = document.getElementById('node-detail');
      panel.innerHTML = `
        <h4>Node Inspector — ${node.label.split('\n')[0]}</h4>
        <div style="margin-top:14px;font-size:0.88rem;color:#64748B;line-height:2">
          ${node.title.replace(/\n/g, '<br>')}
        </div>
        <button class="btn-investigate" style="margin-top:16px;width:100%;padding:12px" onclick="switchSection('replay',null)">🎬 View Replay</button>
      `;
    }
  });
}

// ===== REPLAY ANIMATION =====
const REPLAY_STEPS = [
  { node: 0, arrow: -1, detail: '🏦 <strong>Step 1:</strong> ₹47.3 Lakh deposited into Account A102 (Origin). Triggered velocity alert — 3x normal volume.' },
  { node: 1, arrow: 0, detail: '🏢 <strong>Step 2:</strong> ₹28.1L transferred to B205 (Shell Company) within 4 minutes. No legitimate business activity detected.' },
  { node: 2, arrow: 1, detail: '💼 <strong>Step 3:</strong> ₹19L moved to C309 (Mule Account). Account shows sudden spike from ₹12K average balance.' },
  { node: 3, arrow: 2, detail: '🔁 <strong>Step 4:</strong> ₹15L transferred to D411 (Return Account). Circular pattern confirmed — funds are being layered.' },
  { node: 4, arrow: 3, detail: '🔴 <strong>Step 5 — FRAUD CONFIRMED:</strong> ₹45L returned to A102 completing the circular loop. Pattern: Advanced Layering. Recommended: Freeze all linked accounts.' },
];

let replayTimer = null;
let replayStep = 0;
let isPlaying = false;

function resetReplayUI() {
  document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('lit'));
  document.querySelectorAll('.timeline-arrow').forEach(a => a.classList.remove('lit'));
  document.getElementById('replay-step-label').textContent = 'Step 0/' + REPLAY_STEPS.length;
  document.getElementById('replay-detail-box').innerHTML = '<p>Press Play to start the fraud journey replay animation.</p>';
  replayStep = 0;
  isPlaying = false;
  const btn = document.getElementById('replay-play');
  if (btn) {
    btn.textContent = '▶ Play';
    btn.classList.remove('playing');
  }
  const firstNode = document.getElementById('rt-0');
  if (firstNode) firstNode.classList.add('lit'); 
}

function toggleReplay() {
  const btn = document.getElementById('replay-play');
  if (isPlaying) {
    clearInterval(replayTimer);
    isPlaying = false;
    btn.textContent = '▶ Play';
    btn.classList.remove('playing');
  } else {
    if (replayStep >= REPLAY_STEPS.length) {
      replayStep = 0;
      resetReplayUI();
    }
    isPlaying = true;
    btn.textContent = '⏸ Pause';
    btn.classList.add('playing');
    replayTimer = setInterval(advanceReplay, 1800);
    advanceReplay();
  }
}

function advanceReplay() {
  if (replayStep >= REPLAY_STEPS.length) {
    clearInterval(replayTimer);
    isPlaying = false;
    document.getElementById('replay-play').textContent = '🔁 Replay';
    document.getElementById('replay-play').classList.remove('playing');
    return;
  }
  const s = REPLAY_STEPS[replayStep];
  const nodeEl = document.getElementById('rt-' + s.node);
  if (nodeEl) nodeEl.classList.add('lit');
  
  if (s.arrow >= 0) {
    const arrowEl = document.getElementById('ta-' + s.arrow);
    if (arrowEl) arrowEl.classList.add('lit');
  }
  
  document.getElementById('replay-step-label').textContent = 'Step ' + (replayStep+1) + '/' + REPLAY_STEPS.length;
  document.getElementById('replay-detail-box').innerHTML = '<p>' + s.detail + '</p>';
  replayStep++;
}

// ===== FULL ALERTS PAGE =====
function renderAlertsFull() {
  const list = document.getElementById('full-alerts-list');
  if (!list) return;
  list.innerHTML = ALERTS.map(a => `
    <div class="alert-row">
      <div class="ar-icon">${a.risk > 80 ? '🔴' : a.risk > 60 ? '🟡' : '🟢'}</div>
      <div class="ar-info">
        <h4>${a.id} — ${a.type}</h4>
        <p>${a.account} · ${a.amount}</p>
      </div>
      <div class="ar-right">
        <span class="risk-chip ${getRiskColor(a.risk)}" style="display:block;margin-bottom:8px">${a.risk}%</span>
        <span class="status-badge ${a.status}">${a.status}</span>
      </div>
      <button class="btn-investigate" onclick="investigateAlert('${a.id}')">Investigate</button>
    </div>
  `).join('');
}

// ===== ACCOUNTS =====
function renderAccounts() {
  const grid = document.getElementById('accounts-grid');
  if (!grid) return;
  grid.innerHTML = ACCOUNTS.map(a => `
    <div class="acc-card">
      <div class="acc-top">
        <div>
          <div class="acc-name">${a.name}</div>
          <div class="acc-id">${a.id}</div>
        </div>
        <div class="acc-balance">
          <span>${a.balance}</span>
          <small>${a.txns} txns</small>
        </div>
      </div>
      <div class="acc-risk-bar">
        <div class="acc-risk-fill ${a.riskClass}" style="width:${a.risk}%"></div>
      </div>
      <div class="acc-meta">
        <span class="risk-chip ${a.riskClass}">Risk: ${a.risk}%</span>
        <span class="status-badge ${a.flag === 'Flagged' ? 'active' : a.flag === 'Review' ? 'pending' : 'resolved'}">${a.flag}</span>
      </div>
    </div>
  `).join('');
}

// ===== KYC LOGIC =====
let aadharOtpSent = false;
function autoTab(el, nextId) {
  if (el.value.length >= parseInt(el.maxLength)) {
    const next = document.getElementById(nextId);
    if (next) next.focus();
  }
}

function handleAadharBtn() {
  const btn = document.getElementById('aadhar-btn');
  if (!aadharOtpSent) {
    const a1 = document.getElementById('a1')?.value || '';
    const a2 = document.getElementById('a2')?.value || '';
    const a3 = document.getElementById('a3')?.value || '';
    if ((a1+a2+a3).replace(/\s/g,'').length < 12) {
      alert('Please enter your complete 12-digit Aadhar number.');
      return;
    }
    document.getElementById('otp-section').classList.remove('hidden');
    btn.textContent = 'Verify OTP →';
    aadharOtpSent = true;
  } else {
    const otp = document.getElementById('otp-val')?.value || '';
    if (otp.length < 6) { alert('Please enter the 6-digit OTP.'); return; }
    showPage('kyc-pan');
    aadharOtpSent = false;
    // Add success toast/notif feel
    console.log('Aadhar Verified');
  }
}

function verifyPAN() {
  const pan = document.getElementById('pan-val')?.value || '';
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  if (!panRegex.test(pan.toUpperCase())) {
    alert('Please enter a valid 10-character PAN number (e.g. ABCDE1234F)');
    return;
  }
  document.getElementById('pan-verify-status').classList.remove('hidden');
  setTimeout(() => showPage('kyc-digilocker'), 1200);
}

function connectDigiLocker() {
  const btn = document.querySelector('.btn-digilocker');
  btn.textContent = '⏳ Connecting...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('digi-success').classList.remove('hidden');
    document.getElementById('digi-connect-card').style.opacity = '0.5';
    const nextBtn = document.getElementById('digi-next-btn');
    nextBtn.classList.remove('disabled');
    nextBtn.onclick = () => showPage('kyc-selfie');
  }, 2000);
}

function takeSelfie() {
  const idle = document.getElementById('selfie-idle');
  const scanning = document.getElementById('selfie-scanning');
  const done = document.getElementById('selfie-ok');
  const btn = document.getElementById('selfie-btn');
  
  idle.classList.add('hidden');
  scanning.classList.remove('hidden');
  btn.textContent = '⏳ Scanning...';
  btn.disabled = true;
  
  setTimeout(() => {
    scanning.classList.add('hidden');
    done.classList.remove('hidden');
    btn.textContent = '✓ Verified — Enter Dashboard';
    btn.disabled = false;
    btn.onclick = () => showPage('dashboard');
  }, 3000);
}

// ===== INIT =====
window.onload = () => {
  resetReplayUI();
  showPage('landing');
};
