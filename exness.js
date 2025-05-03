// Immediately Invoked Function Expression
(async function() {
    // Load SweetAlert2 if not already loaded
    if (typeof Swal === 'undefined') {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        document.head.appendChild(script);
        
        await new Promise(resolve => {
            script.onload = resolve;
        });
    }

    // Branding configuration
    const BRAND = {
        name: "@traderjisanx",
        telegram: "https://t.me/traderjisanx",
        color: "#00a651",  // Exness green
        darkColor: "#2c3e50",
        lightColor: "#f8f9fa",
        uiCredit: "Exness System by Trader Jisan X"
    };

    // Telegram icon with branding
    const telegramIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="${BRAND.color}" viewBox="0 0 24 24" style="margin-right:8px">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.51.26l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
    </svg>`;

    // Professional loading animation with branding
    const loadingHTML = `<div style="text-align:center;padding:20px">
        <div style="display:inline-block;width:50px;height:50px;border:3px solid ${BRAND.lightColor};
            border-radius:50%;border-top-color:${BRAND.color};animation:swal2-spin 1s linear infinite"></div>
        <p style="margin-top:15px;color:${BRAND.darkColor};font-weight:500">Processing...</p>
        <p style="font-size:12px;color:#6c757d;margin-top:10px">${BRAND.uiCredit}</p>
    </div>`;

    // Function to load script
    const loadScript = async (token) => {
        try {
            Swal.fire({
                title: 'Initializing Exness System',
                html: loadingHTML,
                allowOutsideClick: false,
                showConfirmButton: false,
                backdrop: `rgba(0,0,0,0.7)`,
                footer: `<div style="font-size:12px;color:#6c757d">Powered by ${BRAND.name}</div>`
            });

            const deviceId = localStorage.getItem('exness_device_id');
            const scriptResponse = await fetch(`https://jisanx4899.pythonanywhere.com/exness.js?token=${encodeURIComponent(token)}&device_id=${encodeURIComponent(deviceId)}`);
            
            if (!scriptResponse.ok) {
                throw new Error(`Failed to load script: ${scriptResponse.statusText}`);
            }

            const scriptCode = await scriptResponse.text();
            
            Swal.fire({
                title: 'Ready to Use',
                html: `<div style="text-align:center;color:${BRAND.darkColor}">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z" stroke="${BRAND.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p style="margin-top:15px;font-size:16px">Exness system initialized successfully</p>
                    <p style="font-size:12px;color:#6c757d;margin-top:10px">${BRAND.uiCredit}</p>
                </div>`,
                showConfirmButton: false,
                timer: 1500,
                footer: `<div style="font-size:12px;color:#6c757d">Powered by ${BRAND.name}</div>`
            });
            
            const executeScript = new Function(scriptCode);
            executeScript();
            
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Loading Failed',
                html: `<div style="color:${BRAND.darkColor}">
                    <p>${error.message}</p>
                    <a href="${BRAND.telegram}" target="_blank" style="margin-top:15px;display:inline-flex;align-items:center;text-decoration:none;color:${BRAND.color};font-weight:500">
                        ${telegramIcon} Contact ${BRAND.name}
                    </a>
                </div>`,
                confirmButtonColor: BRAND.color,
                confirmButtonText: 'OK',
                footer: `<div style="font-size:12px;color:#6c757d">${BRAND.uiCredit}</div>`
            });
            console.error('Error loading script:', error);
            await startVerificationProcess();
        }
    };

    // Function to verify license with server
    const verifyLicenseWithServer = async (token) => {
        try {
            const deviceId = localStorage.getItem('exness_device_id') || 'temp_device';
            
            const deviceFingerprint = JSON.stringify({
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                screen: { width: screen.width, height: screen.height },
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                language: navigator.language,
                deviceId: deviceId
            });

            Swal.fire({
                title: 'Verifying License',
                html: loadingHTML,
                allowOutsideClick: false,
                showConfirmButton: false,
                footer: `<div style="font-size:12px;color:#6c757d">${BRAND.uiCredit}</div>`
            });

            const verifyResponse = await fetch('https://jisanx4899.pythonanywhere.com/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    token: token, 
                    device_id: deviceId, 
                    device_fingerprint: deviceFingerprint 
                })
            });
            
            const verificationData = await verifyResponse.json();
            return verificationData.status === 'success';
            
        } catch (error) {
            console.error('Verification error:', error);
            return false;
        }
    };

    // Professional input form with branding
    const showLicenseInput = async () => {
        const { value: licenseToken } = await Swal.fire({
            title: `<div style="color:${BRAND.darkColor};font-size:1.5em">Exness UI Script</div>
                   <div style="font-size:0.8em;color:${BRAND.color};margin-top:5px">${BRAND.uiCredit}</div>`,
            html: `<div style="text-align:left;color:${BRAND.darkColor}">
                <div style="background:${BRAND.lightColor};border-left:4px solid ${BRAND.color};padding:10px;margin-bottom:15px">
                    <p style="margin:0;font-weight:500">Enter your license key to continue</p>
                </div>
                <p style="font-size:0.9em;color:#6c757d">This will authorize your device for Exness system access</p>
            </div>`,
            input: 'text',
            inputPlaceholder: 'Enter license key...',
            inputAttributes: {
                autocapitalize: 'off',
                autocorrect: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Verify License',
            cancelButtonText: 'Cancel',
            confirmButtonColor: BRAND.color,
            cancelButtonColor: '#6c757d',
            footer: `<div style="font-size:0.8em;color:#6c757d;margin-top:10px">
                Need a license? 
                <a href="${BRAND.telegram}" target="_blank" style="color:${BRAND.color};text-decoration:none;font-weight:500">
                    ${telegramIcon} Contact ${BRAND.name}
                </a>
                <div style="margin-top:5px">${BRAND.uiCredit}</div>
            </div>`,
            inputValidator: (value) => {
                if (!value) return 'Please enter your license key';
            },
            backdrop: `rgba(0,0,0,0.5)`,
            width: '500px',
            padding: '2em'
        });

        return licenseToken;
    };

    // Main verification process
    const startVerificationProcess = async () => {
        const licenseToken = await showLicenseInput();
        if (!licenseToken) return;

        // Generate device ID if not exists (hidden from user)
        const storageKey = 'exness_device_id';
        let deviceId = localStorage.getItem(storageKey);
        if (!deviceId) {
            deviceId = 'ex_' + Math.random().toString(36).substr(2, 12);
            localStorage.setItem(storageKey, deviceId);
        }

        const isValid = await verifyLicenseWithServer(licenseToken);
        Swal.close();
        
        if (!isValid) {
            await Swal.fire({
                icon: 'error',
                title: 'Verification Failed',
                html: `<div style="color:${BRAND.darkColor}">
                    <p>The license key you entered is invalid or expired</p>
                    <a href="${BRAND.telegram}" target="_blank" style="margin-top:15px;display:inline-flex;align-items:center;text-decoration:none;color:${BRAND.color};font-weight:500">
                        ${telegramIcon} Contact ${BRAND.name}
                    </a>
                </div>`,
                confirmButtonColor: BRAND.color,
                confirmButtonText: 'Try Again',
                footer: `<div style="font-size:12px;color:#6c757d">${BRAND.uiCredit}</div>`
            });
            return startVerificationProcess();
        }

        // Save valid license
        localStorage.setItem('exness_valid_license', licenseToken);
        
        await Swal.fire({
            title: 'Authorization Complete',
            html: `<div style="text-align:center;color:${BRAND.darkColor}">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M12 3C13.1819 3 14.3522 3.23279 15.4442 3.68508C16.5361 4.13738 17.5282 4.80031 18.364 5.63604C19.1997 6.47177 19.8626 7.46392 20.3149 8.55585C20.7672 9.64778 21 10.8181 21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3Z" stroke="${BRAND.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p style="margin-top:15px;font-size:16px">Your device has been successfully authorized</p>
                <p style="font-size:12px;color:#6c757d;margin-top:10px">${BRAND.uiCredit}</p>
            </div>`,
            showConfirmButton: false,
            timer: 2000,
            footer: `<div style="font-size:12px;color:#6c757d">Powered by ${BRAND.name}</div>`
        });

        await loadScript(licenseToken);
    };

    // Main execution flow
    try {
        // Check for saved license
        const savedLicense = localStorage.getItem('exness_valid_license');
        if (savedLicense) {
            const isValid = await verifyLicenseWithServer(savedLicense);
            if (isValid) {
                await loadScript(savedLicense);
                return;
            } else {
                localStorage.removeItem('exness_valid_license');
                await Swal.fire({
                    icon: 'warning',
                    title: 'Session Expired',
                    html: `<div style="color:${BRAND.darkColor}">
                        <p>Your previous session has expired. Please re-enter your license key</p>
                    </div>`,
                    confirmButtonColor: BRAND.color,
                    confirmButtonText: 'Continue',
                    footer: `<div style="font-size:12px;color:#6c757d">${BRAND.uiCredit}</div>`
                });
            }
        }

        await startVerificationProcess();

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'System Error',
            html: `<div style="color:${BRAND.darkColor}">
                <p>An unexpected error occurred</p>
                <a href="${BRAND.telegram}" target="_blank" style="margin-top:15px;display:inline-flex;align-items:center;text-decoration:none;color:${BRAND.color};font-weight:500">
                    ${telegramIcon} Contact ${BRAND.name}
                </a>
            </div>`,
            confirmButtonColor: BRAND.color,
            confirmButtonText: 'OK',
            footer: `<div style="font-size:12px;color:#6c757d">${BRAND.uiCredit}</div>`
        });
        console.error('System error:', error);
    }
})();
