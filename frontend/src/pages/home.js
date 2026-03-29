export function renderHome(container) {
    container.innerHTML = `
        <div class="landing-page fade-in">
            <nav class="glass-nav">
                <div class="nav-content">
                    <div class="logo">
                        <img src="/logo.jpeg" alt="PatternX" class="logo-image">
                        <span class="logo-text-dark">Pattern<span>X</span></span>
                    </div>
                    <div class="nav-actions">
                        <a href="#" class="lnk" onclick="window.router.navigate('login')">Sign In</a>
                        <button class="btn btn-navy" onclick="window.router.navigate('register')">Join PatternX</button>
                    </div>
                </div>
            </nav>

            <section class="hero-v2">
                <div class="hero-grid">
                    <div class="hero-text-area">
                        <span class="badge-new">NEW: Graph Engine 4.0</span>
                        <h1>Unmasking <span class="highlight">Financial Crime</span> with Intelligence.</h1>
                        <p>PatternX provides real-time fraud detection using advanced graph analytics and DigiLocker-secured verification. Professional grade tools for modern banking.</p>
                        <div class="hero-actions">
                            <button class="btn btn-navy btn-xl" onclick="window.router.navigate('register')">Get Started Now</button>
                            <button class="btn btn-ghost btn-xl" onclick="window.router.navigate('dashboard')">Explore Platform</button>
                        </div>
                        <div class="hero-trust">
                            <span>Trusted by 50+ Banks worldwide</span>
                        </div>
                    </div>
                    <div class="hero-image-area">
                        <div class="dashboard-preview-card card">
                            <div class="preview-header">
                                <div class="dots"><span></span><span></span><span></span></div>
                                <div class="addr">patternx.ai/dashboard</div>
                            </div>
                            <div class="preview-content">
                                <div class="pulse-ring"></div>
                                <div class="mock-graph">
                                    <div class="m-node m-1"></div>
                                    <div class="m-node m-2 danger"></div>
                                    <div class="m-node m-3"></div>
                                    <div class="m-line l-1"></div>
                                    <div class="m-line l-2 danger"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features-v2">
                <div class="section-tag">Powerful Features</div>
                <h2>Everything you need for <span class="text-navy">Fraud Detection</span></h2>
                <div class="feature-rows">
                    <div class="f-row card">
                        <div class="f-icon">🕸️</div>
                        <div class="f-text">
                            <h3>Graph-Based Analysis</h3>
                            <p>Map complex relationships and detect circular transactions instantly using our proprietary engine.</p>
                        </div>
                    </div>
                    <div class="f-row card">
                        <div class="f-icon">🔒</div>
                        <div class="f-text">
                            <h3>Verified Ecosystem</h3>
                            <p>KYC integration with Aadhar, PAN, and DigiLocker ensures you only deal with verified entities.</p>
                        </div>
                    </div>
                    <div class="f-row card">
                        <div class="f-icon">📈</div>
                        <div class="f-text">
                            <h3>Transaction Replay</h3>
                            <p>Time-travel through suspicious fund movements to understand the "How" and "Why" of every flag.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;
}
