window.initApp = function() {
    const container = document.getElementById("card-container");
    if (!container) return;

    container.innerHTML = "";

    // Tự động render 3 danh mục ra màn hình
    SYSTEM_CONFIG.sections.forEach((sec) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${sec.title}</h3>
            <p>${sec.description}</p>
            <pre><code>${sec.codeSnippet}</code></pre>
            <a href="${sec.buttonLink}" target="_blank" class="action-btn">${sec.buttonText}</a>
        `;
        container.appendChild(card);
    });
};
