const SYSTEM_CONFIG = {
    accessKey: "123456",
    
    sections: [
        {
            title: "1. New (Dành cho người mới)",
            description: "Xem script cơ bản bên dưới. Bấm nút để chuyển hướng sang trang success.",
            codeSnippet: 'print("Hello Roblox!")\nlocal score = 10\nprint("Score is: " .. score)',
            btnAction: "redirect",
            redirectUrl: "success.html" // Mục 1 trỏ về success.html
        },
        {
            title: "2. Know Luau? Join Now (Khối Cầu Vồng Tử Vong)",
            description: "Script tạo khối vuông lượn sóng bay sắc cầu vồng, chạm vào là người chơi chết ngay lập tức.",
            codeSnippet: 'local part = Instance.new("Part")\npart.Size = Vector3.new(5, 5, 5)\npart.Anchored = true\npart.Parent = workspace\n\n-- Hiệu ứng cầu vồng & chạm vào chết\ntask.spawn(function()\n    while true do\n        part.Color = Color3.fromHSV(tick() % 5 / 5, 1, 1)\n        for _, child in ipairs(workspace:GetChildren()) do\n            if child:IsA("Model") and child:FindFirstChild("Humanoid") then\n                local hrp = child:FindFirstChild("HumanoidRootPart")\n                if hrp and (hrp.Position - part.Position).Magnitude < 4 then\n                    child.Humanoid.Health = 0\n                end\n            end\n        end\n        task.wait(0.1)\n    end\nend)',
            btnAction: "redirect",
            redirectUrl: "https://www.google.com" // Mục 2 trỏ sang Google
        },
        {
            title: "3. Năng Cao (Full Module)",
            description: "Hệ thống code chuyên sâu. Yêu cầu nhập Key 7 ngày để mở khóa.",
            codeSnippet: '-- [HỆ THỐNG ĐÃ MỞ KHÓA THÀNH CÔNG]\nlocal advanced_module = require(script.AdvancedCore);\nadvanced_module:InitializeFullFeatures();\nprint("Luau Full Module Loaded Successfully!");',
            btnAction: "key_wall",
            buttonLink: "https://lootdest.org/s?sEinb7ej",
            redirectUrl: "success.html" // Mục 3 nhập đúng key về success.html
        }
    ]
};
