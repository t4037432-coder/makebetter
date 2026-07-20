window.initApp = function() {
    const container = document.getElementById("card-container");
    if (!container) return;

    container.innerHTML = "";

    SYSTEM_CONFIG.sections.forEach((sec, index) => {
        const card = document.createElement("div");
        card.className = "card";
        
        let actionButtonHTML = "";

        if (sec.btnAction === "copy") {
            actionButtonHTML = `
                <button class="click-btn" onclick="triggerGetCode(${index})">CLICK HERE (Lấy mã ngẫu nhiên)</button>
                
                <div id="ver-box-${index}" class="verification-box">
                    <div id="code-area-${index}" class="code-display-area">Mã: Đang tạo...</div>
                    <div id="timer-${index}" class="timer-text">Hết hạn sau: 60 giây</div>
                    <div class="verify-input-group">
                        <input type="text" id="input-code-${index}" placeholder="Nhập lại mã xác minh..." autocomplete="off">
                        <button class="verify-btn" onclick="verifyUserCode(${index})">XÁC MINH</button>
                    </div>
                </div>
            `;
        } else {
            actionButtonHTML = `
                <a href="${sec.buttonLink}" target="_blank" class="click-btn" style="background: var(--primary-color); color: var(--bg-color);">LẤY KEY (2 PHÚT)</a>
            `;
        }

        card.innerHTML = `
            <h3>${sec.title}</h3>
            <p>${sec.description}</p>
            <pre><code>${sec.codeSnippet}</code></pre>
            ${actionButtonHTML}
        `;
        container.appendChild(card);
    });
};

// Lưu trữ thông tin mã và thời gian đếm ngược của từng card
let activeCodes = {};
let activeTimers = {};

window.triggerGetCode = function(index) {
    const box = document.getElementById(`ver-box-${index}`);
    const codeArea = document.getElementById(`code-area-${index}`);
    const timerText = document.getElementById(`timer-${index}`);
    const inputField = document.getElementById(`input-code-${index}`);
    
    if (!box) return;

    box.style.display = "block";
    inputField.value = "";
    inputField.disabled = false;
    codeArea.classList.remove("success-verified");

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedCode = "LUAU-";
    for (let i = 0; i < 8; i++) {
        generatedCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    activeCodes[index] = generatedCode;
    codeArea.textContent = `Mã xác minh của bạn: ${generatedCode}`;

    if (activeTimers[index]) {
        clearInterval(activeTimers[index]);
    }

    let timeLeft = 60;
    timerText.textContent = `Hết hạn sau: ${timeLeft} giây`;

    activeTimers[index] = setInterval(() => {
        timeLeft--;
        timerText.textContent = `Hết hạn sau: ${timeLeft} giây`;

        if (timeLeft <= 0) {
            clearInterval(activeTimers[index]);
            activeCodes[index] = null;
            codeArea.textContent = "⚠️ Mã đã hết hạn sau 1 phút! Vui lòng bấm lấy mã mới.";
            timerText.textContent = "Trạng thái: Đã vô hiệu hóa";
            inputField.disabled = true;
        }
    }, 1000);
};

window.verifyUserCode = function(index) {
    const inputField = document.getElementById(`input-code-${index}`);
    const codeArea = document.getElementById(`code-area-${index}`);
    const timerText = document.getElementById(`timer-${index}`);
    
    if (!inputField || !activeCodes[index]) {
        alert("Mã đã hết hạn hoặc chưa được tạo!");
        return;
    }

    const userTyped = inputField.value.trim();

    if (userTyped === activeCodes[index]) {
        clearInterval(activeTimers[index]);
        codeArea.textContent = "✅ Xác minh thành công! Đang chuyển hướng...";
        codeArea.classList.add("success-verified");
        timerText.textContent = "Trạng thái: Hoàn tất";
        inputField.disabled = true;

        // Chuyển hướng sang trang web tạm thời sau 1.5 giây
        setTimeout(() => {
            // Bạn có thể thay đổi đường dẫn "success.html" thành bất kỳ trang web nào bạn muốn
            window.location.href = "success.html";
        }, 1500);
    } else {
        alert("Sai mã xác minh! Vui lòng kiểm tra lại.");
    }
};
