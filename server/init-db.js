import db from './db.js';

const initialContent = {
  bannerSlides: [
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
  ],
  metrics: [
    { value: "300+", label: "合作医疗机构" },
    { value: "1200万+", label: "服务用户" },
    { value: "40+", label: "城市项目覆盖" },
    { value: "99.95%", label: "平台可用性" },
  ],
  partners: [
    "区域卫健平台",
    "三甲综合医院",
    "专科医疗中心",
    "城市健康云",
    "连锁企业福利",
    "保险健康服务",
  ],
  solutions: [
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
  ],
  capabilityTabs: [
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
  ],
  highlights: [
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
  ],
  serviceFlow: [
    "需求诊断与场景梳理",
    "产品方案与技术架构",
    "系统实施与业务联调",
    "培训上线与运营陪跑",
  ],
  cases: [
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
  ],
  news: [
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
  ]
};

const initialProducts = [
  { name: "互联网医院运营平台", description: "面向医院的互联网诊疗服务中台，支持在线问诊、电子处方等。", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=60" },
  { name: "AI 导诊与智能客服", description: "基于大模型的智能导诊与患者答疑服务，提升门诊效率。", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60" },
  { name: "慢病管理与随访系统", description: "建立专病档案，自动化随访计划与预警监控。", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=60" },
  { name: "体检预约与报告中心", description: "全流程体检服务，包括检前预约、检中导流与检后报告解读。", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800&auto=format&fit=crop&q=60" }
];

db.serialize(() => {
  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS site_data (
      key TEXT PRIMARY KEY,
      value TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      image TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert initial data
  const stmtData = db.prepare("INSERT OR REPLACE INTO site_data (key, value) VALUES (?, ?)");
  for (const [key, value] of Object.entries(initialContent)) {
    stmtData.run(key, JSON.stringify(value));
  }
  stmtData.finalize();

  db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
    if (!err && row.count === 0) {
      const stmtProd = db.prepare("INSERT INTO products (name, description, image) VALUES (?, ?, ?)");
      for (const product of initialProducts) {
        stmtProd.run(product.name, product.description, product.image);
      }
      stmtProd.finalize();
    }
  });

  console.log("Database initialized successfully.");
});
