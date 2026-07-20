document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("auth-btn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const authBox = document.getElementById("auth-box");
    const contentBox = document.getElementById("content");

    function executeLogin() {
        const enteredPassword = passwordInput.value.trim();
        
        // Kiểm tra xem đã tích chọn đám mây cam Cloudflare chưa
        const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
        if (!turnstileResponse || turnstileResponse.value.trim() === "") {
            errorMsg.textContent = "LỖI: Vui lòng xác thực đám mây cam trước!";
            return;
        }

        // Kiểm tra mật khẩu
        if (enteredPassword === SYSTEM_CONFIG.accessKey) {
            authBox.style.opacity = "0";
            authBox.style.transition = "opacity 0.4s ease";
            
            setTimeout(() => {
                authBox.classList.add("hidden");
                contentBox.classList.remove("hidden");
                if (typeof window.initApp === "function") {
                    window.initApp();
                }
            }, 400);
        } else {
            errorMsg.textContent = "TRUY CẬP BỊ TỪ CHỐI: Sai mật khẩu!";
            passwordInput.style.borderColor = "var(--danger-color)";
        }
    }

    if (authBtn) {
        authBtn.addEventListener("click", executeLogin);
    }

    if (passwordInput) {
        passwordInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                executeLogin();
            }
        });
    }
});
