import "./style.css";

const bannerSlides = [
  {
    eyebrow: "智慧医院",
    title: "统一门诊服务入口，重构患者到院体验",
    text: "从预约、分诊、候诊、缴费到报告触达，帮助医院把分散流程整合成连贯服务链路。",
    points: ["预约导诊", "门诊履约", "报告中心"],
    metric: "平均缩短 28% 到院等待链路",
  },
  {
    eyebrow: "区域协同",
    title: "以区域健康中枢连接基层与专科资源",
    text: "打通居民服务、家医随访、专科协作与公共卫生触点，形成跨机构协同的城市健康网络。",
    points: ["居民档案", "基层协同", "专病管理"],
    metric: "支持多机构统一服务编排",
  },
  {
    eyebrow: "企业健康",
    title: "把员工关怀升级为持续运营的健康服务",
    text: "围绕体检、问诊、心理关怀和风险预警构建企业健康门户，提升福利触达与服务使用率。",
    points: ["员工门户", "在线问诊", "健康画像"],
    metric: "形成可量化的健康福利闭环",
  },
];

const metrics = [
  { value: "300+", label: "合作医疗机构" },
  { value: "1200万+", label: "服务用户" },
  { value: "40+", label: "城市项目覆盖" },
  { value: "99.95%", label: "平台可用性" },
];

const partners = [
  "区域卫健平台",
  "三甲综合医院",
  "专科医疗中心",
  "城市健康云",
  "连锁企业福利",
  "保险健康服务",
];

const solutions = [
  {
    tag: "医院场景",
    title: "智慧医院一体化平台",
    text: "串联门诊、住院、检验、影像与运营数据，帮助医院形成更高效的服务闭环。",
  },
  {
    tag: "区域场景",
    title: "区域健康协同中枢",
    text: "面向城市健康治理，打通居民服务、公共卫生与基层协同，提升统筹效率。",
  },
  {
    tag: "企业场景",
    title: "员工健康管理服务",
    text: "提供体检、问诊、随访与健康档案能力，支持企业福利与风险预警。",
  },
  {
    tag: "个人场景",
    title: "全周期健康服务门户",
    text: "围绕问诊、购药、慢病管理与报告解读，构建连续性的数字健康体验。",
  },
];

const capabilityTabs = [
  {
    index: "01",
    title: "连接能力",
    text: "标准化对接 HIS、LIS、PACS、EMR 与支付、物流、客服系统，减少项目集成复杂度。",
  },
  {
    index: "02",
    title: "数据能力",
    text: "统一主数据、指标体系与权限模型，支持多端业务的安全流转与分析应用。",
  },
  {
    index: "03",
    title: "运营能力",
    text: "覆盖预约转化、患者触达、慢病复诊、会员服务与营销活动的精细化运营。",
  },
];

const products = [
  "互联网医院运营平台",
  "AI 导诊与智能客服",
  "慢病管理与随访系统",
  "体检预约与报告中心",
  "医疗数据驾驶舱",
  "医患协同消息中心",
  "区域健康服务门户",
  "企业健康福利中台",
];

const highlights = [
  {
    title: "可信数据底座",
    text: "围绕医疗合规、安全审计与多角色权限管理构建稳定的数据流转能力。",
  },
  {
    title: "开放连接能力",
    text: "兼容常见院内系统与外部服务生态，缩短医院和平台对接周期。",
  },
  {
    title: "服务运营增长",
    text: "从预约转化、复诊触达、慢病随访到内容服务，支持多种增长路径。",
  },
];

const serviceFlow = [
  "需求诊断与场景梳理",
  "产品方案与技术架构",
  "系统实施与业务联调",
  "培训上线与运营陪跑",
];

const cases = [
  {
    city: "华东某三甲医院",
    title: "门诊服务数字化升级",
    text: "整合预约、候诊、缴费与复诊触达，缩短患者线下停留时间并提升服务满意度。",
  },
  {
    city: "华南区域健康项目",
    title: "基层协同与居民健康档案",
    text: "连接社区、家庭医生与专科资源，提升区域居民慢病连续管理效率。",
  },
  {
    city: "全国连锁企业",
    title: "员工健康福利平台",
    text: "整合问诊、体检、心理关怀与风险预警，形成可量化的健康管理体系。",
  },
];

const news = [
  {
    meta: "行业观察",
    title: "医院数字化不只提效，更在于重构患者体验",
    text: "从预约、候诊到诊后随访，连续性的服务设计正在成为医疗平台建设重点。",
  },
  {
    meta: "产品更新",
    title: "灵创健康发布多场景运营驾驶舱",
    text: "支持预约转化、服务履约、用户活跃与复诊链路的统一指标追踪。",
  },
  {
    meta: "合作动态",
    title: "区域健康协同项目进入规模化交付阶段",
    text: "通过标准化连接能力与实施方法论，提升多机构协同项目的推进速度。",
  },
];

const app = document.querySelector("#app");

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
        <a href="#about">关于我们</a>
      </nav>
      <a class="nav-cta" href="#contact">申请演示</a>
    </header>

    <main>
      <section class="hero" id="hero">
        <div class="hero-copy">
          <p class="eyebrow">DIGITAL HEALTHCARE ECOSYSTEM</p>
          <h1>让医疗服务更智能，让健康连接更自然</h1>
          <p class="hero-text">
            灵创健康专注于数字医疗基础设施与健康服务平台建设，帮助医院、政府、企业与个人构建更高效、更温暖的健康连接。
          </p>
          <div class="hero-actions">
            <a class="button primary" href="#contact">预约方案咨询</a>
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
        <div class="product-cloud">
          ${products.map((item) => `<span>${item}</span>`).join("")}
        </div>
      </section>

      <section class="section flow-section">
        <div class="section-heading split flow-head">
          <div>
            <p>服务方式</p>
            <h2>以项目落地为核心的全流程协作模式</h2>
          </div>
          <a class="button ghost small" href="#contact">获取实施建议</a>
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

      <section class="section news-section">
        <div class="section-heading split news-head">
          <div>
            <p>资讯洞察</p>
            <h2>围绕医疗数字化与健康服务持续输出行业观察</h2>
          </div>
          <p class="section-intro">
            首页保留资讯位，方便后续继续接入文章、动态或新闻模块。
          </p>
        </div>
        <div class="news-grid">
          ${news
            .map(
              (item) => `
                <article class="news-card">
                  <span>${item.meta}</span>
                  <h3>${item.title}</h3>
                  <p>${item.text}</p>
                  <a href="#contact">了解更多</a>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>

      <section class="section about" id="about">
        <div class="about-panel">
          <p>关于灵创健康</p>
          <h2>以技术为底座，以服务为温度，打造可信赖的数字健康品牌</h2>
          <p>
            我们聚焦智慧医疗、健康管理与区域协同，结合产品研发、数据治理与运营服务，为合作伙伴提供兼顾落地与增长的长期支持。
          </p>
        </div>
        <div class="about-stats">
          <article>
            <strong>7 x 24h</strong>
            <span>平台运维支持</span>
          </article>
          <article>
            <strong>多端覆盖</strong>
            <span>Web / H5 / 小程序 / App</span>
          </article>
          <article>
            <strong>全流程</strong>
            <span>咨询、实施、培训、运营</span>
          </article>
        </div>
      </section>
    </main>

    <footer class="footer" id="contact">
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

  statusText.textContent = bannerSlides[activeSlideIndex].eyebrow;
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

renderCarousel(0);
startAutoplay();
