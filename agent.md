# Agent Guide

这份文件用于约束后续在本仓库内的修改方式。

## 1. 这个仓库怎么启动

- 安装依赖：`npm install`
- 初始化数据库：`node server/init-db.js` (首次运行或需要重置数据时执行)
- 本地开发：`npm run dev` (通过 concurrently 同时启动 Vite 前端和 Express 后端)
- 本地生产预览：
  1. `npm run build`
  2. `npm run preview`
- GitHub Pages 构建：`npm run build:pages`

补充说明：
- 本地预览默认应访问根路径，例如 `http://127.0.0.1:4173/`
- GitHub Pages 发布路径是 `/test/`

## 2. 测试该跑哪一组

这个仓库当前没有 Jest、Vitest、Playwright 或 Cypress 测试。

当前必须跑的检查只有这两组：
- 本地构建检查：`npm run build`
- Pages 构建检查：`npm run build:pages`

如果改动涉及首屏、轮播、样式或路径配置，建议额外做一次：
- 本地预览冒烟检查：`npm run preview`

## 3. 哪些目录不能碰

默认不要修改这些内容，除非用户明确要求：
- `node_modules/`
- `dist/`
- `.git/`

谨慎修改这些内容：
- `.github/workflows/`
  只在确实需要调整 GitHub Pages 或 CI 行为时修改
- `package-lock.json`
  只有依赖变更时才应更新

可以正常修改的主要目录和文件：
- `src/`
- `index.html`
- `vite.config.js`
- `README.md`

## 4. PR 要符合什么标准

- 必须能在本地正常构建，不引入编译错误
- 不能破坏本地预览路径 `/`
- 不能破坏 GitHub Pages 路径 `/test/`
- 改动要尽量聚焦，不混入无关格式化或无关重构
- UI 改动需要保持移动端可用，不能出现明显空白页、资源 404 或布局错乱
- 如果改了发布相关配置，说明里要写清楚对本地构建和 Pages 的影响

## 5. 做完后必须怎么自检

提交前至少完成以下自检：

1. 运行 `npm run build`
2. 运行 `npm run build:pages`
3. 确认 `dist/index.html` 的资源路径符合当前目标：
   - 本地构建后应为 `/assets/...`
   - Pages 构建后应为 `/test/assets/...`
4. 如果改动涉及页面展示，启动 `npm run preview` 做一次手动冒烟检查
5. 查看 `git status --short`，确认没有误提交 `node_modules`、`dist`、临时文件或无关改动

如果其中任何一步失败，不要直接提交，先修复再继续。

## 6. 开发进度追踪

- **后端补足**：已完成。基于 Node.js + Express + SQLite，提供了 \`/api/content\`, \`/api/products\`, \`/api/messages\` 接口。启动 \`npm run dev\` 时会同步启动后端服务。
- **网站内容可维护**：已完成。前端 \`src/main.js\` 中原本硬编码的数据已移除，改为页面加载时通过 Fetch API 获取数据。
- **产品展示功能**：已完成。前端增强了产品展示的样式，现在通过 `products` 表动态渲染。
- **留言板功能**：已完成。在首页底部增加了留言板表单和列表，数据持久化到 SQLite 数据库的 `messages` 表中。
- **详情页与首页美化**：已完成。为主页产品卡片添加了玻璃质感悬浮动画，并新增了支持 Markdown 渲染的 `detail.html` 产品详情页，后台可配置。
- **阶段二 - 视觉体验与交互升级**：已完成。
  - 骨架屏加载占位（Skeleton Screen）
  - 深色模式切换（Dark Mode），自动跟随系统偏好，支持 localStorage 持久化
  - 滚动入场动效（Scroll Reveal），基于 IntersectionObserver
  - 移动端侧滑抽屉菜单（Mobile Drawer）
- **阶段三 - 业务模块与场景扩展**：已完成。
  - 新闻与洞察专栏：`/api/news` CRUD API + `news.html` 详情页 + 后台管理
  - 招聘页面：`careers.html`，展示开放职位
  - 留言板防刷：前端算术验证码 + 后端 IP 级 60 秒频率限制
  - 地图接入：首页底部嵌入 Google Maps iframe
