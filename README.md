# 灵创健康网站项目

一个基于 `Vite + Express + SQLite` 的医疗健康网站项目，包含官网首页、多页面内容展示、新闻与产品详情页，以及一个简单的管理后台。

## 功能概览

- 官网首页
- 新闻列表与新闻详情页
- 产品详情页
- 招聘页
- 管理后台
- Express API
- SQLite 数据存储
- GitHub Pages 前端静态发布

## 项目结构

```text
.
├── index.html
├── admin.html
├── news.html
├── detail.html
├── careers.html
├── src/
│   ├── main.js
│   ├── admin.js
│   ├── news.js
│   ├── detail.js
│   ├── careers.js
│   └── style.css
├── server/
│   ├── index.js
│   ├── db.js
│   ├── init-db.js
│   └── database.sqlite
└── .github/workflows/deploy-pages.yml
```

## 本地开发

安装依赖：

```bash
npm install
```

同时启动前端和后端：

```bash
npm run dev
```

单独启动前端：

```bash
npm run dev:frontend
```

单独启动后端：

```bash
npm run dev:backend
```

默认情况下：

- 前端开发服务：`http://localhost:5173`
- 后端服务：`http://localhost:3000`

前端已通过 Vite 代理将 `/api` 请求转发到后端。

## 生产构建

本地构建：

```bash
npm run build
```

本地预览：

```bash
npm run preview
```

GitHub Pages 构建：

```bash
npm run build:pages
```

## 管理后台

管理后台入口：

```text
/admin.html
```

当前后端中包含一个演示用的简单登录接口，适合本地开发和演示环境。

注意：

- 当前鉴权方案较简单
- 管理密码和 token 逻辑仍属于演示实现
- 如果要部署到真实生产环境，建议改成环境变量和正式鉴权方案

## 后端说明

后端基于 `Express`，当前主要提供以下接口：

- `/api/content`
- `/api/products`
- `/api/products/:id`
- `/api/messages`
- `/api/news`
- `/api/news/:id`
- `/api/login`

数据文件位于：

```text
server/database.sqlite
```

## 在线发布

仓库已配置 GitHub Pages 自动部署工作流，推送到 `main` 分支后会自动构建前端静态页面。

预期线上地址：

```text
https://hangwei-sun.github.io/test/
```

## 当前注意事项

- GitHub Pages 只负责前端静态页面，不会自动部署 `Express` 后端
- 如果页面依赖 `/api` 数据，线上还需要单独部署后端服务
- `dist/` 和 `node_modules/` 不应手动提交
