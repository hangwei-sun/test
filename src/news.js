import "./style.css";
import { marked } from "marked";

async function initNews() {
  const app = document.querySelector("#app");
  
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    app.innerHTML = '<div style="padding: 100px; text-align: center; color: red;">未找到新闻 ID</div>';
    return;
  }

  try {
    const res = await fetch(`/api/news/${id}`);
    if (!res.ok) throw new Error('News not found');
    
    const newsItem = await res.json();
    renderNews(app, newsItem);
  } catch (err) {
    console.error(err);
    app.innerHTML = '<div style="padding: 100px; text-align: center; color: red;">加载失败，新闻不存在或已删除。</div>';
  }
}

function renderNews(app, newsItem) {
  const contentHtml = newsItem.content ? marked.parse(newsItem.content) : '<p>暂无内容</p>';

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
          <a href="/careers.html">加入我们</a>
        </nav>
        <div class="topbar-actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换深色模式">
            <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
        </div>
      </header>

      <main style="padding: 60px 20px;">
        <article class="detail-container" style="max-width: 800px; margin: 0 auto; background: var(--surface); padding: 40px; border-radius: 20px; box-shadow: var(--shadow-sm); border: 1px solid var(--line);">
          <a href="/#news" class="back-link">← 返回新闻列表</a>
          <h1 style="font-size: 2.5rem; color: var(--brand); margin-bottom: 20px;">${newsItem.title}</h1>
          <div style="color: var(--muted); margin-bottom: 40px; font-size: 0.95rem;">发布时间：${new Date(newsItem.created_at).toLocaleString()}</div>
          
          <div class="markdown-body">
            ${contentHtml}
          </div>
        </article>
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
  if (!btn) return;
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
  
  btn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
  });
}

initNews();
