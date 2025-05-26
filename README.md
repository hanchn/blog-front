```
/blog-front
├── app.js                  # 应用入口
├── package.json
├── /config                 # 配置（如主题、环境变量等）
│   └── theme.js
├── /routes                 # 路由定义
│   ├── index.js
│   └── users.js
├── /controllers            # 控制器（业务逻辑）
│   ├── homeController.js
│   └── userController.js
├── /middleware             # 中间件
│   ├── auth.js
│   └── theme.js
├── /views                  # EJS 模板
│   ├── /layouts            # 布局模板
│   │   ├── main.ejs
│   │   └── admin.ejs
│   ├── /partials           # 组件/局部模板
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   ├── sidebar.ejs
│   │   └── themeSwitcher.ejs
│   ├── /pages              # 页面模板
│   │   ├── about.ejs
│   │   └── user.ejs
│   └── error.ejs
├── /public                 # 静态资源
│   ├── /css
│   │   ├── theme-default.css
│   │   └── theme-dark.css
│   ├── /js
│   └── /images
└── /utils                  # 工具函数
    └── helpers.js
```