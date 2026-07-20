const SYSTEM_CONFIG = {
    accessKey: "123456",
    
    sections: [
        {
            title: "1. New (Dành cho người mới)",
            description: "Xem script cơ bản bên dưới. Bấm nút để xác minh mã và chuyển hướng sang web tạm thời.",
            codeSnippet: 'print("Hello Roblox!")\nlocal score = 10\nprint("Score is: " .. score)',
            btnAction: "redirect"
        },
        {
            title: "2. Know Luau? Join Now (Khối Cầu Vồng Tử Vong)",
            description: "Script tạo khối vuông lượn sóng bay sắc cầu vồng, chạm vào là người chơi chết ngay lập tức.",
            codeSnippet: 'local part = Instance.new("Part")\npart.Size = Vector3.new(5, 5, 5)\npart.Anchored = true\npart.Parent = workspace\n\n-- Hiệu ứng cầu vồng & chạm vào chết\ntask.spawn(function()\n    while true do\n        part.Color = Color3.fromHSV(tick() % 5 / 5, 1, 1)\n        for _, child in ipairs(workspace:GetChildren()) do\n            if child:IsA("Model") and child:FindFirstChild("Humanoid") then\n                local hrp = child:FindFirstChild("HumanoidRootPart")\n                if hrp and (hrp.Position - part.Position).Magnitude < 4 then\n                    child.Humanoid.Health = 0\n                end\n            end\n        end\n        task.wait(0.1)\n    end\nend)',
            btnAction: "redirect"
        },
      {
    title: "3. Năng Cao (Full Module)",
    description: "Hệ thống code chuyên sâu. Yêu cầu lấy key qua Linkvertise/Lootlabs (2 phút).",
    codeSnippet: '-- [HỆ THỐNG ĐÃ BỊ KHÓA]\nlocal secured_data = "Cần có Key để giải mã module này!";',
    btnAction: "link",
    buttonLink: "https://loot-link.com/s?N822ewz3"
}
    ]
};
