window.initApp = function() {
    const container = document.getElementById("card-container");
    if (!container) return;

    container.innerHTML = "";

    SYSTEM_CONFIG.sections.forEach((sec, index) => {
        const card = document.createElement("div");
        card.className = "card";
        
        let actionButtonHTML = "";

        if (sec.btnAction === "redirect") {
            // Cả mục 1 và mục 2 đều dùng chung tính năng: Hiện sẵn script, xác minh đúng mã là teleport sang trang tạm thời
            actionButtonHTML = `
                <button class="click-btn" id="click-btn-${index}" onclick="triggerGetCode(${index})">CLICK HERE (Lấy mã xác minh)</button>
                
                <div id="ver-box-${index}" class="verification-box">
                    <div id="code-area-${index}" class="code-display-area">Mã: Đang tạo...</div>
                    <div id="timer-${index}" class="timer-text">Hết hạn sau: 60 giây</div>
                    <div class="verify-input-group">
                        <input type="text" id="input-code-${index}" placeholder="Nhập mã xác minh..." autocomplete="off">
                        <button class="verify-btn" onclick="verifyAndRedirect(${index})">XÁC MINH & CHUYỂN WEB</button>
                    </div>
                </div>
            `;
        } else {
            // Mục 3: Vượt link
            actionButtonHTML = `
                <a href="${sec.buttonLink}" target="_blank" class="click-btn" style="background: var(--primary-color); color: var(--bg-color);">LẤY KEY (2 PHÚT)</a>
            `;
        }

        // Hiển thị trực tiếp code thật của từng mục để người dùng xem, không bị che mờ
        card.innerHTML = `
            <h3>${sec.title}</h3>
            <p>${sec.description}</p>
            <pre><code id="real-code-${index}">${escapeHtml(sec.codeSnippet)}</code></pre>
            ${actionButtonHTML}
        `;
        container.appendChild(card);
    });
};

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let activeCodes = {};
let activeTimers = {};

window.triggerGetCode = function(index) {
    const box = document.getElementById(`ver-box-${index}`);
    const codeArea = document.getElementById(`code-area-${index}`);
    const timerText = document.getElementById(`timer-${index}`);
    const inputField = document.getElementById(`input-code-${index}`);
    const clickBtn = document.getElementById(`click-btn-${index}`);
    
    if (!box) return;

    box.style.display = "block";
    clickBtn.style.display = "none";
    inputField.value = "";
    inputField.disabled = false;
    codeArea.classList.remove("success-verified");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedCode = "LUAU-";
    for (let i = 0; i < 8; i++) {
        generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    activeCodes[index] = generatedCode;
    codeArea.textContent = `Mã xác minh: ${generatedCode}`;

    if (activeTimers[index]) {
        clearInterval(activeTimers[index]);
    }

    let timeLeft = 60;
    timerText.textContent = `Hết hạn sau: ${timeLeft} giây`;
    timerText.style.color = "var(--danger-color)";

    activeTimers[index] = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Hết hạn sau: ${timeLeft} giây`;

        if (timeLeft <= 0) {
            clearInterval(activeTimers[index]);
            activeCodes[index] = null;
            codeArea.textContent = "⚠️ Mã đã hết hạn! Vui lòng tải lại trang.";
            timerText.textContent = "Trạng thái: Đã vô hiệu hóa";
            inputField.disabled = true;
        }
    }, 1000);
};

// Hàm xác minh cho cả mục 1 và mục 2: Nhập đúng mã sẽ teleport sang trang web tạm thời (success.html)
window.verifyAndRedirect = function(index) {
    const inputField = document.getElementById(`input-code-${index}`);
    const codeArea = document.getElementById(`code-area-${index}`);
    const timerText = document.getElementById(`timer-${index}`);
    
    if (!inputField || !activeCodes[index]) {
        alert("Mã đã hết hạn hoặc chưa được tạo!");
        return;
    }

    if (inputField.value.trim() === activeCodes[index]) {
        clearInterval(activeTimers[index]);
        timerText.textContent = "✨ XÁC THỰC THÀNH CÔNG - ĐANG CHUYỂN HƯỚNG...";
        timerText.style.color = "var(--primary-color)";
        codeArea.textContent = "✅ Thành công!";
        inputField.disabled = true;

        setTimeout(() => {
            window.location.href = "success.html";
        }, 1200);
    } else {
        alert("Sai mã xác minh! Vui lòng kiểm tra lại.");
    }
};
