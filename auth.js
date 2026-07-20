document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("auth-btn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const authBox = document.getElementById("auth-box");
    const contentBox = document.getElementById("content");

    // Kiểm tra xem trước đó người dùng đã đăng nhập thành công chưa
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        authBox.classList.add("hidden");
        contentBox.classList.remove("hidden");
        if (typeof window.initApp === "function") {
            window.initApp();
        }
        return; // Dừng lại, không bắt hiện màn hình đăng nhập nữa
    }

    function executeLogin() {
        const enteredPassword = passwordInput.value.trim();
        
        const turnstileResponse = document.querySelector('[name="cf-turnstile-response"]');
        if (!turnstileResponse || turnstileResponse.value.trim() === "") {
            errorMsg.textContent = "LỖI: Vui lòng xác thực đám mây cam trước!";
            return;
        }

        if (enteredPassword === SYSTEM_CONFIG.accessKey) {
            // Lưu lại trạng thái đã đăng nhập vào bộ nhớ phiên làm việc
            sessionStorage.setItem("isLoggedIn", "true");

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
