/* --- MODULE XỬ LÝ XÁC THỰC BẢO MẬT --- */
document.addEventListener("DOMContentLoaded", () => {
    const authBtn = document.getElementById("auth-btn");
    const passwordInput = document.getElementById("password");
    const errorMsg = document.getElementById("error-msg");
    const authBox = document.getElementById("auth-box");
    const contentBox = document.getElementById("content");

    function executeLogin() {
        const enteredValue = passwordInput.value.trim();
        
        // Kiểm tra khớp mật khẩu từ file config.js
        if (enteredValue === SYSTEM_CONFIG.accessKey) {
            // Hiệu ứng ẩn khung mật khẩu và hiện nội dung
            authBox.style.opacity = "0";
            authBox.style.transition = "opacity 0.4s ease";
            
            setTimeout(() => {
                authBox.classList.add("hidden");
                contentBox.classList.remove("hidden");
                // Kích hoạt render dữ liệu sau khi đăng nhập thành công
                if (typeof window.initApp === "function") {
                    window.initApp();
                }
            }, 400);
        } else {
            errorMsg.textContent = "ACCESS DENIED: Mã khóa không chính xác!";
            passwordInput.style.borderColor = "var(--danger-color)";
            
            // Hiệu ứng rung lắc khung nhập khi sai mật khẩu
            authBox.classList.add("shake");
            setTimeout(() => authBox.classList.remove("shake"), 300);
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
