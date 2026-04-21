# Agent Guide

这份文件用于约束后续在本仓库内的修改方式。

## 1. 这个仓库怎么启动

- 安装依赖：`npm install`
- 初始化数据库：`node server/init-db.js`
  仅首次运行、需要重置本地演示数据、或数据库文件损坏时执行
- 同时启动前后端：`npm run dev`
- 单独启动前端：`npm run dev:frontend`
- 单独启动后端：`npm run dev:backend`
- 本地生产预览：
  1. `npm run build`
  2. `npm run preview`
- GitHub Pages 构建：`npm run build:pages`

补充说明：
- Vite 前端开发服务默认是 `http://localhost:5173`
- Express 后端默认是 `http://localhost:3000`
- 本地预览默认应访问根路径，例如 `http://127.0.0.1:4173/`
- GitHub Pages 发布路径是 `/test/`
- 前端通过 Vite 代理把 `/api` 转发到本地后端

## 2. 测试该跑哪一组

这个仓库当前没有 Jest、Vitest、Playwright 或 Cypress 测试。

当前至少要跑这几组检查：
- 前端构建检查：`npm run build`
- Pages 构建检查：`npm run build:pages`
- 后端启动检查：`node server/index.js`

如果改动涉及页面展示、路由入口、详情页、后台页面、主题切换、轮播或路径配置，建议额外做一次：
- 本地预览冒烟检查：`npm run preview`

如果改动涉及数据库初始化逻辑，还应补跑：
- `node server/init-db.js`

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
- `server/database.sqlite`
  这是本地数据库文件。除非用户明确希望提交演示数据变化，否则不要随意改动或重建后提交

可以正常修改的主要目录和文件：
- `src/`
- `server/`
- `index.html`
- `admin.html`
- `news.html`
- `detail.html`
- `careers.html`
- `vite.config.js`
- `README.md`
- `agent.md`

## 4. PR 要符合什么标准

- 必须能在本地正常构建，不引入编译错误
- 不能破坏本地预览路径 `/`
- 不能破坏 GitHub Pages 路径 `/test/`
- 不能让多页面入口丢失：
  - `index.html`
  - `admin.html`
  - `news.html`
  - `detail.html`
  - `careers.html`
- 如果改动涉及后端，至少要保证服务能启动，接口路径没有明显拼错
- 改动要尽量聚焦，不混入无关格式化、无关重构或无关数据变更
- UI 改动需要保持移动端可用，不能出现明显空白页、资源 404、脚本报错或布局错乱
- 如果改了发布相关配置，说明里要写清楚对本地构建、Pages 构建和后端联调的影响

## 5. 做完后必须怎么自检

提交前至少完成以下自检：

1. 运行 `npm run build`
2. 运行 `npm run build:pages`
3. 启动后端确认能正常起来：
   - `node server/index.js`
4. 确认 `dist/` 中包含当前页面入口
   - `dist/index.html`
   - `dist/admin.html`
   - `dist/news.html`
   - `dist/detail.html`
   - `dist/careers.html`
5. 确认构建路径符合目标：
   - 本地构建后应为 `/assets/...`
   - Pages 构建后应为 `/test/assets/...`
6. 如果改动涉及页面展示，启动 `npm run preview` 做一次手动冒烟检查
7. 查看 `git status --short`，确认没有误提交 `node_modules`、`dist`、临时文件或无关改动
8. 如果改动涉及数据库，确认是否真的需要提交 `server/database.sqlite`

如果其中任何一步失败，不要直接提交，先修复再继续。

## 6. 当前项目现实约束

- GitHub Pages 只负责前端静态页面，不会自动部署 `Express` 后端
- 线上如果依赖 `/api`，需要额外部署后端服务
- 当前后台登录仍是演示实现，包含硬编码密码和 token
- 如果要面向真实生产环境，优先补正式鉴权、环境变量和数据库迁移策略
