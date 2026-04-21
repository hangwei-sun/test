import "./style.css";

const jobs = [
  { id: 1, title: '高级前端开发工程师 (React/Vite)', dept: '研发中心', location: '北京', type: '全职', req: '5年以上前端开发经验，精通React生态，对用户体验有极致追求。' },
  { id: 2, title: 'Node.js 后端研发工程师', dept: '研发中心', location: '北京', type: '全职', req: '熟练使用Express/NestJS，熟悉高并发架构与数据库调优。' },
  { id: 3, title: '医疗产品经理', dept: '产品部', location: '上海', type: '全职', req: '3年以上B端SaaS产品设计经验，具有数字医疗行业背景优先。' }
];

async function initCareers() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="/" aria-label="返回首页">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-copy">
            <strong>灵创健康</strong>
            <em>Lingchuang Health</em>
          </span>
        </a>
        <nav class="nav" aria-label="主导航">
          <a href="/">返回首页</a>
          <a href="/careers.html" style="color:var(--brand);">加入我们</a>
        </nav>
        <div class="topbar-actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换深色模式">
            <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
        </div>
      </header>

      <main>
        <section class="detail-hero text-center" style="padding: 100px 20px;">
          <h1 style="font-size: 3rem; color: var(--brand); margin-bottom: 20px;">加入灵创健康</h1>
          <p style="font-size: 1.2rem; color: var(--muted); max-width: 600px; margin: 0 auto;">与顶尖的跨学科团队一起，用科技重塑医疗健康生态的未来。</p>
        </section>

        <section class="section" style="max-width: 900px; margin: 0 auto;">
          <div class="section-heading">
            <h2>开放职位</h2>
          </div>
          <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 40px;">
            ${jobs.map(job => `
              <div class="job-card" style="background: var(--surface); border: 1px solid var(--line); border-radius: 16px; padding: 30px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 15px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <h3 style="margin:0; font-size: 1.4rem; color: var(--brand);">${job.title}</h3>
                  <a href="mailto:hr@lingchuang-health.com?subject=应聘：${job.title}" class="button primary small">投递简历</a>
                </div>
                <div style="display: flex; gap: 15px; font-size: 0.9rem; color: var(--muted);">
                  <span style="background: var(--surface-strong); padding: 4px 10px; border-radius: 4px;">${job.dept}</span>
                  <span style="background: var(--surface-strong); padding: 4px 10px; border-radius: 4px;">${job.location}</span>
                  <span style="background: var(--surface-strong); padding: 4px 10px; border-radius: 4px;">${job.type}</span>
                </div>
                <p style="margin: 0; color: var(--text); line-height: 1.6;">${job.req}</p>
              </div>
            `).join('')}
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer-copy">
          <strong>灵创健康</strong>
          <p>为医疗与健康行业提供更现代、更稳健的数字化体验。</p>
        </div>
      </footer>
    </div>
  `;

  initThemeToggle();
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const sun = btn.querySelector('.sun-icon');
  const moon = btn.querySelector('.moon-icon');
  
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);
  
  const applyTheme = () => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      sun.style.display = 'none';
      moon.style.display = 'block';
    } else {
      document.documentElement.removeAttribute('data-theme');
      sun.style.display = 'block';
      moon.style.display = 'none';
    }
  };
  
  applyTheme();
  
  if (btn) {
    btn.addEventListener('click', () => {
      isDark = !isDark;
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      applyTheme();
    });
  }
}

initCareers();
