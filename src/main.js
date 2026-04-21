import "./style.css";

async function initApp() {
  const app = document.querySelector("#app");
  
  // 骨架屏占位
  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar" style="border-bottom: 1px solid var(--line);"><div class="skeleton-box" style="width: 150px; height: 30px; border-radius: 4px;"></div></header>
      <main>
        <section style="padding: 40px 20px;"><div class="skeleton-box" style="width: 100%; height: 400px; border-radius: 20px;"></div></section>
        <section style="padding: 40px 20px;">
          <div class="skeleton-box" style="width: 300px; height: 40px; border-radius: 8px; margin-bottom: 30px;"></div>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px;">
            <div class="skeleton-box" style="height: 200px; border-radius: 12px;"></div>
            <div class="skeleton-box" style="height: 200px; border-radius: 12px;"></div>
            <div class="skeleton-box" style="height: 200px; border-radius: 12px;"></div>
            <div class="skeleton-box" style="height: 200px; border-radius: 12px;"></div>
          </div>
        </section>
      </main>
    </div>
  `;

  try {
    const [contentRes, productsRes, messagesRes, newsRes] = await Promise.all([
      fetch('/api/content'),
      fetch('/api/products'),
      fetch('/api/messages'),
      fetch('/api/news')
    ]);

    if (!contentRes.ok || !productsRes.ok || !messagesRes.ok || !newsRes.ok) {
      throw new Error('Failed to fetch data');
    }

    const content = await contentRes.json();
    const products = await productsRes.json();
    const messages = await messagesRes.json();
    const news = await newsRes.json();

    const { bannerSlides, metrics, partners, solutions, capabilityTabs, highlights, serviceFlow, cases } = content;

    renderApp(app, { bannerSlides, metrics, partners, solutions, capabilityTabs, highlights, serviceFlow, cases, news, products, messages });
    
    initThemeToggle();
    initMobileMenu();
    initCarousel(bannerSlides);
    initMessageBoard();
    initScrollReveal();

  } catch (err) {
    console.error("Initialization error:", err);
    app.innerHTML = '<div style="padding: 100px; text-align: center; color: red;">加载失败，请确保后端服务已启动。</div>';
  }
}

function renderApp(app, data) {
  const { bannerSlides, metrics, partners, solutions, capabilityTabs, highlights, serviceFlow, cases, news, products, messages } = data;

  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <a class="brand" href="#hero" aria-label="灵创健康首页">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-copy">
            <strong>灵创健康</strong>
            <em>Lingchuang Health</em>
          </span>
        </a>
        <nav class="nav" aria-label="主导航">
          <a href="#solutions">解决方案</a>
          <a href="#capabilities">核心能力</a>
          <a href="#products">产品能力</a>
          <a href="#cases">客户案例</a>
          <a href="/careers.html">加入我们</a>
        </nav>
        <div class="topbar-actions">
          <button class="theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换深色模式">
            <svg class="sun-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            <svg class="moon-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" style="display: none;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          </button>
          <a class="nav-cta" href="#message-board">申请演示</a>
          <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="打开菜单">
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </header>

      <div class="mobile-drawer" id="mobile-drawer">
        <div class="mobile-drawer-header">
          <strong style="color:var(--brand);font-size:1.2rem;">灵创健康</strong>
          <button class="mobile-drawer-close" id="mobile-drawer-close">×</button>
        </div>
        <nav class="mobile-nav">
          <a href="#solutions">解决方案</a>
          <a href="#capabilities">核心能力</a>
          <a href="#products">产品能力</a>
          <a href="#cases">客户案例</a>
          <a href="/careers.html">加入我们</a>
        </nav>
      </div>

      <main>
        <section class="hero" id="hero">
          <div class="hero-copy">
            <p class="eyebrow">DIGITAL HEALTHCARE ECOSYSTEM</p>
            <h1>让医疗服务更智能，让健康连接更自然</h1>
            <p class="hero-text">
              灵创健康专注于数字医疗基础设施与健康服务平台建设，帮助医院、政府、企业与个人构建更高效、更温暖的健康连接。
            </p>
            <div class="hero-actions">
              <a class="button primary" href="#message-board">预约方案咨询</a>
              <a class="button ghost" href="#solutions">查看解决方案</a>
            </div>
            <div class="hero-note">
              <span>服务覆盖</span>
              <p>智慧医院、互联网医疗、区域协同、企业健康、慢病管理、诊后运营</p>
            </div>
          </div>

          <div class="hero-visual">
            <div
              class="hero-carousel"
              role="region"
              aria-roledescription="carousel"
              aria-label="灵创健康首页焦点内容"
            >
              <div class="carousel-slides">
                ${bannerSlides
                  .map(
                    (slide, index) => `
                      <article class="carousel-slide${index === 0 ? " is-active" : ""}" aria-hidden="${index === 0 ? "false" : "true"}">
                        <div class="slide-glow"></div>
                        <div class="slide-topline">${slide.eyebrow}</div>
                        <h2>${slide.title}</h2>
                        <p>${slide.text}</p>
                        <div class="slide-points">
                          ${slide.points.map((point) => `<span>${point}</span>`).join("")}
                        </div>
                        <div class="slide-metric">
                          <strong>${slide.metric}</strong>
                          <em>灵创健康服务能力</em>
                        </div>
                      </article>
                    `,
                  )
                  .join("")}
              </div>

              <div class="carousel-toolbar">
                <div class="carousel-status">
                  <span class="carousel-status-label">焦点场景</span>
                  <strong id="carousel-status-text">${bannerSlides[0].eyebrow}</strong>
                </div>
                <div class="carousel-actions">
                  <button class="carousel-arrow" type="button" data-direction="prev" aria-label="上一张 banner">
                    <span aria-hidden="true">‹</span>
                  </button>
                  <button class="carousel-arrow" type="button" data-direction="next" aria-label="下一张 banner">
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              </div>

              <div class="carousel-dots" aria-label="banner 分页">
                ${bannerSlides
                  .map(
                    (slide, index) => `
                      <button
                        class="carousel-dot${index === 0 ? " is-active" : ""}"
                        type="button"
                        data-slide-index="${index}"
                        aria-label="查看 ${slide.eyebrow}"
                        aria-current="${index === 0 ? "true" : "false"}"
                      ></button>
                    `,
                  )
                  .join("")}
              </div>
            </div>

            <div class="hero-metrics">
              <div class="signal-card">
                <span>医疗数据协同</span>
                <strong>医院 + 区域 + 企业 + 个人</strong>
                <p>以统一服务中台串联多端触点，形成从诊前到诊后的全链路体验。</p>
              </div>
              <div class="journey-card">
                <div>
                  <span>诊前</span>
                  <strong>预约导诊</strong>
                </div>
                <div>
                  <span>诊中</span>
                  <strong>履约协同</strong>
                </div>
                <div>
                  <span>诊后</span>
                  <strong>复诊随访</strong>
                </div>
              </div>
              <div class="grid-card">
                ${metrics
                  .map(
                    (item) => `
                      <article>
                        <strong>${item.value}</strong>
                        <span>${item.label}</span>
                      </article>
                    `,
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </section>

        <section class="partner-strip" aria-label="合作场景">
          ${partners.map((item) => `<span>${item}</span>`).join("")}
        </section>

        <section class="section" id="solutions">
          <div class="section-heading">
            <p>解决方案</p>
            <h2>面向多元医疗与健康场景的产品组合</h2>
          </div>
          <div class="solution-grid">
            ${solutions
              .map(
                (item) => `
                  <article class="solution-card">
                    <span>${item.tag}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="section capability-section" id="capabilities">
          <div class="section-heading split capability-head">
            <div>
              <p>核心能力</p>
              <h2>从连接、数据到运营，构成完整医疗服务底座</h2>
            </div>
            <p class="section-intro">
              以中台能力沉淀可复用的连接方式、数据标准和业务组件，让不同机构场景都能更快进入稳定运营。
            </p>
          </div>
          <div class="capability-grid">
            ${capabilityTabs
              .map(
                (item) => `
                  <article class="capability-card">
                    <span>${item.index}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="section contrast" id="products">
          <div class="section-heading split">
            <div>
              <p>产品能力</p>
              <h2>从底层平台到业务应用，支持快速落地</h2>
            </div>
            <div class="highlight-list">
              ${highlights
                .map(
                  (item) => `
                    <article>
                      <h3>${item.title}</h3>
                      <p>${item.text}</p>
                    </article>
                  `,
                )
                .join("")}
            </div>
          </div>
          
          <div class="product-grid" style="margin-top: 40px;">
            ${products.map((item) => `
              <a href="/detail.html?id=${item.id}" class="product-card-link" style="text-decoration: none; color: inherit;">
                <article class="product-card">
                  <div class="product-card-img-wrap">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" />
                  </div>
                  <div class="product-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <span class="view-more">查看详情 →</span>
                  </div>
                </article>
              </a>
            `).join("")}
          </div>
        </section>

        <section class="section flow-section">
          <div class="section-heading split flow-head">
            <div>
              <p>服务方式</p>
              <h2>以项目落地为核心的全流程协作模式</h2>
            </div>
            <a class="button ghost small" href="#message-board">获取实施建议</a>
          </div>
          <div class="flow-grid">
            ${serviceFlow
              .map(
                (item, index) => `
                  <article class="flow-card">
                    <span>0${index + 1}</span>
                    <h3>${item}</h3>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="section" id="cases">
          <div class="section-heading">
            <p>客户案例</p>
            <h2>用可持续交付能力，支撑真实业务增长</h2>
          </div>
          <div class="case-list">
            ${cases
              .map(
                (item) => `
                  <article class="case-card">
                    <span class="case-city">${item.city}</span>
                    <h3>${item.title}</h3>
                    <p>${item.text}</p>
                  </article>
                `,
              )
              .join("")}
          </div>
        </section>

        <section class="section news-section" id="news">
          <div class="section-heading split">
            <div>
              <p>动态与洞察</p>
              <h2>最新企业资讯</h2>
            </div>
            <a class="button ghost small" href="#news">查看全部</a>
          </div>
          <div class="news-grid">
            ${news.map(item => `
              <a href="/news.html?id=${item.id}" class="news-card-link">
                <article class="news-card-item">
                  <div class="news-card-date">${new Date(item.created_at).toLocaleDateString()}</div>
                  <h3 class="news-card-title">${item.title}</h3>
                  <span class="news-card-more">阅读全文 →</span>
                </article>
              </a>
            `).join('')}
            ${news.length === 0 ? '<div class="news-empty">暂无新闻动态，请在后台发布第一条资讯</div>' : ''}
          </div>
        </section>

        <section class="section" id="message-board">
          <div class="section-heading split">
            <div>
              <p>联系我们</p>
              <h2>在线留言板</h2>
            </div>
            <p class="section-intro">
              有什么需求或建议？请在下方留言，我们会尽快与您联系。
            </p>
          </div>
          <div class="message-board-container">
            <form id="message-form" class="message-form">
              <input type="text" id="msg-name" placeholder="您的姓名或公司名称" required />
              <textarea id="msg-content" placeholder="请输入您的留言内容..." required></textarea>
              <div style="display:flex; gap:10px; align-items:center; margin-bottom:15px;">
                <label style="color:var(--text); font-weight:500;"><span id="captcha-question"></span> = ?</label>
                <input type="number" id="msg-captcha" placeholder="输入验证码" required style="width:100px;" />
              </div>
              <button type="submit" class="button primary">提交留言</button>
            </form>
            <div class="message-list" id="message-list">
              ${messages.length === 0 ? '<div class="message-empty">暂无留言，快来抢沙发吧！</div>' : ''}
              ${messages.map(msg => `
                <div class="message-item">
                  <div class="message-header">
                    <strong>${msg.name}</strong>
                    <span class="time">${new Date(msg.created_at).toLocaleString()}</span>
                  </div>
                  <p>${msg.content}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <section class="section map-section">
          <div class="section-heading text-center">
            <p>联系地址</p>
            <h2>欢迎莅临</h2>
          </div>
          <div class="map-wrapper">
            <iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=Beijing+Technology+Park&t=&z=13&ie=UTF8&iwloc=&output=embed" style="display:block;"></iframe>
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

function initCarousel(bannerSlides) {
  const slides = [...document.querySelectorAll(".carousel-slide")];
  const dots = [...document.querySelectorAll(".carousel-dot")];
  const arrows = [...document.querySelectorAll(".carousel-arrow")];
  const statusText = document.querySelector("#carousel-status-text");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let activeSlideIndex = 0;
  let autoplayId = null;

  function renderCarousel(nextIndex) {
    activeSlideIndex = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === activeSlideIndex;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    dots.forEach((dot, index) => {
      const isActive = index === activeSlideIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    if (statusText && bannerSlides[activeSlideIndex]) {
      statusText.textContent = bannerSlides[activeSlideIndex].eyebrow;
    }
  }

  function stopAutoplay() {
    if (autoplayId) {
      window.clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  function startAutoplay() {
    stopAutoplay();

    if (reducedMotion.matches) {
      return;
    }

    autoplayId = window.setInterval(() => {
      renderCarousel(activeSlideIndex + 1);
    }, 5200);
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      renderCarousel(Number(dot.dataset.slideIndex));
      startAutoplay();
    });
  });

  arrows.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction === "prev" ? -1 : 1;
      renderCarousel(activeSlideIndex + direction);
      startAutoplay();
    });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stopAutoplay();
      return;
    }

    startAutoplay();
  });

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", startAutoplay);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(startAutoplay);
  }

  if (slides.length > 0) {
    renderCarousel(0);
    startAutoplay();
  }
}

function initMessageBoard() {
  const form = document.getElementById('message-form');
  const list = document.getElementById('message-list');
  const emptyMsg = document.querySelector('.message-empty');
  const captchaSpan = document.getElementById('captcha-question');
  
  if (!form || !captchaSpan) return;

  let expectedCaptcha = 0;
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    expectedCaptcha = num1 + num2;
    captchaSpan.textContent = `${num1} + ${num2}`;
    document.getElementById('msg-captcha').value = '';
  };
  generateCaptcha();

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const captchaInput = document.getElementById('msg-captcha');
    if (parseInt(captchaInput.value) !== expectedCaptcha) {
      alert('验证码错误，请重新计算！');
      generateCaptcha();
      return;
    }

    const nameInput = document.getElementById('msg-name');
    const contentInput = document.getElementById('msg-content');
    const submitBtn = form.querySelector('button[type="submit"]');

    submitBtn.disabled = true;
    submitBtn.textContent = "提交中...";

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: nameInput.value, content: contentInput.value })
      });

      if (res.ok) {
        const newMsg = await res.json();
        
        // Remove empty state if exists
        if (emptyMsg) emptyMsg.remove();

        const div = document.createElement('div');
        div.className = 'message-item new-message';
        div.innerHTML = `
          <div class="message-header">
            <strong>${newMsg.name}</strong>
            <span class="time">${new Date().toLocaleString()}</span>
          </div>
          <p>${newMsg.content}</p>
        `;
        
        list.prepend(div);
        form.reset();
        generateCaptcha();
        
        alert('留言提交成功！');
      } else {
        const error = await res.json();
        alert('提交失败: ' + (error.error || '未知错误'));
        generateCaptcha();
      }
    } catch (err) {
      console.error(err);
      alert('网络异常，请稍后再试');
      generateCaptcha();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "提交留言";
    }
  });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  const sun = btn.querySelector('.sun-icon');
  const moon = btn.querySelector('.moon-icon');
  
  // Check local storage or system preference
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

function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const links = drawer.querySelectorAll('a');
  
  const toggleDrawer = () => {
    drawer.classList.toggle('is-open');
    document.body.style.overflow = drawer.classList.contains('is-open') ? 'hidden' : '';
  };
  
  btn.addEventListener('click', toggleDrawer);
  closeBtn.addEventListener('click', toggleDrawer);
  links.forEach(link => link.addEventListener('click', toggleDrawer));
}

function initScrollReveal() {
  const elements = document.querySelectorAll('.solution-card, .capability-card, .flow-card, .news-card, .product-card, .section-heading, .case-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
}

initApp();
