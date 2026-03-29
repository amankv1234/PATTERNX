export function renderAuth(container, mode = 'login') {
    container.innerHTML = `
        <div class="auth-page fade-in">
            <div class="auth-card shadow-premium">
                <div class="text-center mb-3">
                    <img src="/logo.jpeg" alt="Logo" class="logo-image m-center" style="width: 50px; height: 50px;">
                    <h2 class="mt-1">${mode === 'login' ? 'Sign In' : 'Create Account'}</h2>
                    <p class="text-secondary">Access the PatternX Intelligence Engine</p>
                </div>
                
                <form id="auth-form" class="auth-form">
                    <div class="form-group">
                        <label>Email Address</label>
                        <input type="email" placeholder="name@company.com" required>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="••••••••" required>
                    </div>
                    
                    <button type="submit" class="btn btn-navy btn-xl w-100 mt-1">
                        ${mode === 'login' ? 'Continue' : 'Create Account'}
                    </button>
                </form>

                <div class="auth-footer text-center mt-2">
                    <span class="text-secondary">
                        ${mode === 'login' 
                            ? `New to PatternX? <a href="#" class="lnk-blue" onclick="window.router.navigate('register')">Register</a>` 
                            : `Already joined? <a href="#" class="lnk-blue" onclick="window.router.navigate('login')">Sign In</a>`}
                    </span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('auth-form').onsubmit = (e) => {
        e.preventDefault();
        if (mode === 'register') {
            window.router.navigate('verification');
        } else {
            window.router.navigate('dashboard');
        }
    };
}
