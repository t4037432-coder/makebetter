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
                <button class="click-btn" id="click-btn-${index}" onclick="triggerGetCode(${index})">CLICK HERE (Lấy mã ngẫu nhiên)</button>
                
                <div id="ver-box-${index}" class="verification-box">
                    <div id="code-area-${index}" class="code-display-area">Mã: Đang tạo...</div>
                    <div id="timer-${index}" class="timer-text">Hết hạn sau: 60 giây</div>
                    <div class="verify-input-group">
                        <input type="text" id="input-code-${index}" placeholder="Nhập lại mã xác minh..." autocomplete="off">
                        <button class="verify-btn" onclick="verifyUserCode(${index})">XÁC MINH</button>
                    </div>
                </div>
                
                <div id="success-script-box-${index}" style="display: none; margin-top: 15px;">
                    <div style="font-size: 13px; color: var(--primary-color); margin-bottom: 5px; font-weight: bold;">✅ MÃ XÁC MINH HỢP LỆ:</div>
                    <pre><code id="real-code-${index}">${escapeHtml(sec.codeSnippet)}</code></pre>
                    <button class="click-btn" style="background: var(--primary-color); color: var(--bg-color);" onclick="copyScriptCode(${index})">COPY SCRIPT VÀO BỘ NHỚ</button>
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
            <div id="preview-blur-${index}">
                <pre><code>-- [NỘI DUNG ĐÃ BỊ KHÓA BẢO MẬT] --\nlocal status = "Nhập mã để mở khóa nội dung này";</code></pre>
            </div>
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
            codeArea.textContent = "⚠️ Mã đã hết hạn! Vui lòng tải lại trang để lấy mã mới.";
            timerText.textContent = "Trạng thái: Đã vô hiệu hóa";
            inputField.disabled = true;
        }
    }, 1000);
};

window.verifyUserCode = function(index) {
    const inputField = document.getElementById(`input-code-${index}`);
    const codeArea = document.getElementById(`code-area-${index}`);
    const timerText = document.getElementById(`timer-${index}`);
    const blurPreview = document.getElementById(`preview-blur-${index}`);
    const successBox = document.getElementById(`success-script-box-${index}`);
    const verBox = document.getElementById(`ver-box-${index}`);
    
    if (!inputField || !activeCodes[index]) {
        alert("Mã đã hết hạn hoặc không tồn tại!");
        return;
    }

    const userTyped = inputField.value.trim();

    if (userTyped === activeCodes[index]) {
        clearInterval(activeTimers[index]);

        timerText.textContent = "✨ ĐÃ XÁC THỰC THÀNH CÔNG";
        timerText.style.color = "var(--primary-color)";
        timerText.style.fontWeight = "bold";
        
        codeArea.textContent = "✅ Chính xác!";
        codeArea.classList.add("success-verified");
        inputField.disabled = true;

        setTimeout(() => {
            verBox.style.display = "none";
            if (blurPreview) blurPreview.style.display = "none";
            if (successBox) successBox.style.display = "block";
        }, 400);

    } else {
        alert("Sai mã xác minh! Vui lòng kiểm tra lại.");
    }
};

window.copyScriptCode = function(index) {
    const codeElement = document.getElementById(`real-code-${index}`);
    if (!codeElement) return;

    navigator.clipboard.writeText(codeElement.textContent).then(() => {
        alert("📋 Đã copy code thành công!");
    }).catch(err => {
        alert("Lỗi copy: " + err);
    });
};
