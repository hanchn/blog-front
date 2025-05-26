#!/bin/bash

# 初始化 package.json
npm init -y

# 安装依赖
npm install express ejs

# 创建目录结构
mkdir -p config routes controllers middleware views/layouts views/partials views/pages public/css public/js public/images utils

# 创建基础文件
touch app.js
touch config/theme.js
touch routes/index.js routes/users.js
touch controllers/homeController.js controllers/userController.js
touch middleware/auth.js middleware/theme.js
touch views/layouts/main.ejs views/layouts/admin.ejs
touch views/partials/header.ejs views/partials/footer.ejs views/partials/sidebar.ejs views/partials/themeSwitcher.ejs
touch views/pages/about.ejs views/pages/user.ejs views/error.ejs
touch public/css/theme-default.css public/css/theme-dark.css
touch utils/helpers.js

echo "初始化完成！"