import "./style.css";
import { marked } from "marked";

async function initDetail() {
  const app = document.querySelector("#app");
  app.innerHTML = '<div style="padding: 100px; text-align: center; color: var(--brand);">数据加载中...</div>';

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) {
    app.innerHTML = '<div style="padding: 100px; text-align: center; color: red;">未找到产品 ID</div>';
    return;
  }

  try {
    const res = await fetch(`/api/products/${id}`);
    if (!res.ok) throw new Error('Product not found');
    
    const product = await res.json();
    renderDetail(app, product);
    initThemeToggle();
  } catch (err) {
    console.error(err);
    app.innerHTML = '<div style="padding: 100px; text-align: center; color: red;">加载失败，产品不存在或已删除。</div>';
  }
}

function renderDetail(app, product) {
  const contentHtml = product.content ? marked.parse(product.content) : '<p style="color: var(--muted); padding: 40px 0; text-align: center;">暂无详细内容介绍</p>';

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
          <a class="nav-cta" href="/#message-board">申请演示</a>
        </div>
      </header>

      <main>
        <section class="detail-hero">
          <div class="detail-container">
            <a href="/" class="back-link">← 返回产品列表</a>
            <div class="detail-header-card">
              <div class="detail-img-wrapper">
                <img src="${product.image}" alt="${product.name}" />
              </div>
              <div class="detail-header-info">
                <h1>${product.name}</h1>
                <p class="desc">${product.description}</p>
                <a class="button primary" href="/#message-board">立即咨询此产品</a>
              </div>
            </div>
          </div>
        </section>

        <section class="detail-content section">
          <div class="detail-container">
            <div class="markdown-body">
              ${contentHtml}
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer-copy">
          <strong>灵创健康</strong>
          <p>为医疗与健康行业提供更现代、更稳健的数字化体验。</p>
        </div>
        <div class="footer-cta">
          <a class="button primary" href="mailto:contact@lingchuang-health.com">商务合作</a>
          <div class="footer-links">
            <a href="mailto:contact@lingchuang-health.com">contact@lingchuang-health.com</a>
            <a href="tel:400-800-2026">400-800-2026</a>
          </div>
        </div>
      </footer>
    </div>
  `;
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
  
  // Appply theme immediately before render
  applyTheme();
  
  btn.addEventListener('click', () => {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
  });
}

initDetail();
