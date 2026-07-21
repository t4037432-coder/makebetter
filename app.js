document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("card-container");
    if (!container || typeof SYSTEM_CONFIG === "undefined") return;

    container.innerHTML = "";

    SYSTEM_CONFIG.sections.forEach((section, index) => {
        const card = document.createElement("div");
        card.className = "card"; // Lớp CSS tùy giao diện của bro

        let actionHtml = "";

        // Kiểm tra xem là nút bấm thông thường hay nút nhập Key (key_wall)
        if (section.btnAction === "key_wall") {
            actionHtml = `
                <div class="key-wall-container" style="margin-top: 15px; border-top: 1px dashed #1f293d; padding-top: 15px;">
                    <p style="font-size: 13px; color: #ff9f43; margin-bottom: 8px;">🔒 Module này yêu cầu Key 7 ngày để mở khóa:</p>
                    <div style="display: flex; gap: 8px; margin-bottom: 8px;">
                        <input type="text" id="key-input-${index}" placeholder="Dán key luaurb_... vào đây" style="flex: 1; padding: 10px; background: #060911; border: 1px solid #1f293d; color: #fff; border-radius: 6px; font-family: monospace;">
                        <button onclick="verifyUserKey(${index}, '${section.redirectUrl || "https://google.com"}')" style="padding: 10px 15px; background: var(--primary-color, #00ffcc); color: #0b0f19; border: none; font-weight: bold; border-radius: 6px; cursor: pointer;">XÁC THỰC</button>
                    </div>
                    <a href="${section.buttonLink}" target="_blank" style="display: inline-block; color: #00ffcc; font-size: 13px; text-decoration: underline;">👉 Bấm vào đây để lấy Key Lootlabs (2 phút)</a>
                </div>
            `;
        } else {
            // Các nút bình thường như Mục 1 và 2
            actionHtml = `
                <button class="action-btn" onclick="handleAction('${section.btnAction}')" style="margin-top: 15px; width: 100%; padding: 10px; background: var(--primary-color, #00ffcc); color: #0b0f19; border: none; font-weight: bold; border-radius: 6px; cursor: pointer;">
                    ${section.btnAction === "redirect" ? "CLICK HERE (Lấy mã xác minh)" : "XEM CHI TIẾT"}
                </button>
            `;
        }

        card.innerHTML = `
            <h3>${section.title}</h3>
            <p style="color: #94a3b8; font-size: 14px; margin-bottom: 10px;">${section.description}</p>
            <pre style="background: #060911; padding: 12px; border-radius: 6px; overflow-x: auto; color: #00ffcc; font-family: monospace; font-size: 13px;"><code>${section.codeSnippet}</code></pre>
            ${actionHtml}
        `;

        container.appendChild(card);
    });
});

// Hàm xử lý xác thực Key khi người dùng bấm nút "XÁC THỰC" ở Mục 3
function verifyUserKey(index, redirectUrl) {
    const inputField = document.getElementById(`key-input-${index}`);
    const userEnteredKey = inputField.value.trim();

    // Lấy key đang lưu trong localStorage của trình duyệt (được tạo ở trang key.html)
    let savedData = localStorage.getItem("luau_key_data");
    
    if (!savedData) {
        alert("❌ Bạn chưa có Key! Vui lòng bấm vào link lấy key ở bên dưới để nhận Key 7 ngày.");
        return;
    }

    let keyObj = JSON.parse(savedData);
    const now = new Date().getTime();

    // Kiểm tra xem key có hết hạn 7 ngày chưa
    if (now > keyObj.expiresAt) {
        alert("⏳ Key của bạn đã hết hạn 7 ngày. Vui lòng lấy key mới!");
        return;
    }

    // So khớp key người dùng nhập với key trong máy
    if (userEnteredKey === keyObj.key) {
        alert("🎉 Xác thực thành công! Hệ thống đang chuyển hướng sang trang web tạm thời...");
        // Teleport (chuyển hướng) sang trang web tạm thời thứ 2 của bro
        window.location.href = redirectUrl;
    } else {
        alert("❌ Key không chính xác! Hãy kiểm tra lại ký tự bạn vừa dán.");
    }
}

function handleAction(action) {
    if (action === "redirect") {
        alert("Chuyển hướng xác minh mã thành công!");
    }
}
