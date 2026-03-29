export function renderVerification(container) {
    let currentStep = 1;
    
    function renderStep() {
        container.innerHTML = `
            <div class="verify-page fade-in">
                <div class="verify-card shadow-premium">
                    <div class="verify-header text-center">
                        <h2>Identity Verification</h2>
                        <p class="text-secondary">Mandatory for secure fraud intelligence access</p>
                        <div class="stepper mt-2">
                            <div class="step ${currentStep >= 1 ? 'active' : ''}">1</div>
                            <div class="step-line ${currentStep >= 2 ? 'active' : ''}"></div>
                            <div class="step ${currentStep >= 2 ? 'active' : ''}">2</div>
                            <div class="step-line ${currentStep >= 3 ? 'active' : ''}"></div>
                            <div class="step ${currentStep >= 3 ? 'active' : ''}">3</div>
                        </div>
                    </div>

                    <div id="verify-content" class="mt-3">
                        ${getStepContent()}
                    </div>
                    
                    <div class="verify-trust mt-2 text-center">
                        <small class="text-secondary">🔒 Encrypted with AES-256 | Secured by DigiLocker</small>
                    </div>
                </div>
            </div>
        `;
        bindEvents();
    }

    function getStepContent() {
        switch(currentStep) {
            case 1:
                return `
                    <div class="v-step-box">
                        <h3>Aadhar Verification</h3>
                        <p class="text-secondary mb-1">Enter your 12-digit UIDAI number</p>
                        <div class="form-group">
                            <input type="text" id="aadhar-input" placeholder="XXXX XXXX XXXX" maxlength="14" class="xl-input">
                        </div>
                        <button class="btn btn-navy btn-xl w-100 mt-2" id="btn-next">Send Security OTP</button>
                    </div>
                `;
            case 2:
                return `
                    <div class="v-step-box">
                        <h3>PAN Verification</h3>
                        <p class="text-secondary mb-1">Enter your Permanent Account Number</p>
                        <div class="form-group">
                            <input type="text" id="pan-input" placeholder="ABCDE1234F" maxlength="10" class="xl-input uppercase">
                        </div>
                        <button class="btn btn-navy btn-xl w-100 mt-2" id="btn-next">Validate Documents</button>
                    </div>
                `;
            case 3:
                return `
                    <div class="v-step-box text-center">
                        <h3>DigiLocker Integration</h3>
                        <p class="text-secondary mb-2">Connect your verified digital vault</p>
                        <div class="digilocker-box glass-morphism">
                            <button class="btn-digilocker" id="btn-digilocker">
                                <img src="https://web.digilocker.gov.in/public/assets/img/logo.png" alt="DigiLocker">
                                <span>Login with DigiLocker</span>
                            </button>
                        </div>
                        <div id="digi-status" class="mt-2 status-msg hidden">
                            <span class="text-safe">✓ Identity Vault Connected</span>
                        </div>
                        <button class="btn btn-navy btn-xl w-100 mt-3 disabled" id="btn-finish">Complete Onboarding</button>
                    </div>
                `;
        }
    }

    function bindEvents() {
        const nextBtn = document.getElementById('btn-next');
        const finishBtn = document.getElementById('btn-finish');
        const digiBtn = document.getElementById('btn-digilocker');

        if (nextBtn) {
            nextBtn.onclick = () => {
                currentStep++;
                renderStep();
            };
        }

        if (digiBtn) {
            digiBtn.onclick = () => {
                document.getElementById('digi-status').classList.remove('hidden');
                finishBtn.classList.remove('disabled');
                digiBtn.style.opacity = '0.7';
                digiBtn.innerHTML = 'Connected';
                digiBtn.disabled = true;
            };
        }

        if (finishBtn) {
            finishBtn.onclick = () => {
                window.router.navigate('dashboard');
            };
        }
        
        const aadhar = document.getElementById('aadhar-input');
        if (aadhar) {
            aadhar.oninput = (e) => {
                let v = e.target.value.replace(/\D/g, '');
                e.target.value = v.match(/.{1,4}/g)?.join(' ') || v;
            };
        }
    }

    renderStep();
}
