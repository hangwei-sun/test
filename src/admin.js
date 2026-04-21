let token = localStorage.getItem('adminToken');

const loginScreen = document.getElementById('login-screen');
const dashboard = document.getElementById('dashboard');

function checkAuth() {
  if (token) {
    loginScreen.style.display = 'none';
    dashboard.style.display = 'block';
    loadData();
  } else {
    loginScreen.style.display = 'block';
    dashboard.style.display = 'none';
  }
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    if (res.ok) {
      const data = await res.json();
      token = data.token;
      localStorage.setItem('adminToken', token);
      checkAuth();
    } else {
      alert('密码错误');
    }
  } catch (err) {
    alert('网络异常');
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  token = null;
  localStorage.removeItem('adminToken');
  checkAuth();
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.target).classList.add('active');
  });
});

async function loadData() {
  loadMessages();
  loadProducts();
  loadNews();
}

async function loadMessages() {
  try {
    const res = await fetch('/api/messages');
    const messages = await res.json();
    const tbody = document.getElementById('messages-tbody');
    tbody.innerHTML = messages.map(msg => `
      <tr>
        <td>${new Date(msg.created_at).toLocaleString()}</td>
        <td>${msg.name}</td>
        <td>${msg.content}</td>
        <td><button class="danger" onclick="deleteMessage(${msg.id})">删除</button></td>
      </tr>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

window.deleteMessage = async (id) => {
  if (!confirm('确定删除此留言？')) return;
  try {
    await fetch('/api/messages/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id })
    });
    loadMessages();
  } catch (err) {
    alert('删除失败');
  }
};

let productsData = [];

async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    productsData = await res.json();
    const tbody = document.getElementById('products-tbody');
    tbody.innerHTML = productsData.map(prod => `
      <tr>
        <td>${prod.id}</td>
        <td>${prod.name}</td>
        <td>${prod.description.substring(0, 30)}...</td>
        <td>
          <button onclick="editProduct(${prod.id})" style="margin-right: 5px;">编辑</button>
          <button class="danger" onclick="deleteProduct(${prod.id})">删除</button>
        </td>
      </tr>
    `).join('');
  } catch (err) {
    console.error(err);
  }
}

window.deleteProduct = async (id) => {
  if (!confirm('确定删除此产品？')) return;
  try {
    await fetch('/api/products/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id })
    });
    loadProducts();
  } catch (err) {
    alert('删除失败');
  }
};

window.editProduct = (id) => {
  const prod = productsData.find(p => p.id === id);
  if (!prod) return;
  document.getElementById('prod-id').value = prod.id;
  document.getElementById('prod-name').value = prod.name;
  document.getElementById('prod-image').value = prod.image;
  document.getElementById('prod-desc').value = prod.description;
  document.getElementById('prod-content').value = prod.content || '';
  document.getElementById('prod-submit').textContent = '更新产品';
  document.getElementById('prod-cancel').classList.remove('hidden');
};

document.getElementById('prod-cancel').addEventListener('click', () => {
  document.getElementById('product-form').reset();
  document.getElementById('prod-id').value = '';
  document.getElementById('prod-submit').textContent = '保存产品';
  document.getElementById('prod-cancel').classList.add('hidden');
});

document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('prod-id').value;
  const name = document.getElementById('prod-name').value;
  const image = document.getElementById('prod-image').value;
  const description = document.getElementById('prod-desc').value;
  const content = document.getElementById('prod-content').value;
  
  try {
    await fetch('/api/products/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id, name, image, description, content })
    });
    document.getElementById('prod-cancel').click();
    loadProducts();
  } catch (err) {
    alert('保存失败');
  }
});

// --- News Management ---

let newsData = [];

async function loadNews() {
  try {
    const res = await fetch('/api/news');
    newsData = await res.json();
    const tbody = document.getElementById('news-tbody');
    tbody.innerHTML = newsData.map(item => `
      <tr>
        <td>${item.id}</td>
        <td>${item.title}</td>
        <td>${new Date(item.created_at).toLocaleString()}</td>
        <td>
          <button onclick="editNews(${item.id})" style="margin-right: 5px;">编辑</button>
          <button class="danger" onclick="deleteNews(${item.id})">删除</button>
        </td>
      </tr>
    `).join('');
    if (newsData.length === 0) {
      tbody.innerHTML = '<tr><td colspan="4" style="text-align:center; color:#999;">暂无新闻，点击下方表单发布第一条资讯</td></tr>';
    }
  } catch (err) {
    console.error(err);
  }
}

window.deleteNews = async (id) => {
  if (!confirm('确定删除此新闻？')) return;
  try {
    await fetch('/api/news/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id })
    });
    loadNews();
  } catch (err) {
    alert('删除失败');
  }
};

window.editNews = async (id) => {
  // Fetch full news content for editing
  try {
    const res = await fetch(`/api/news/${id}`);
    const item = await res.json();
    document.getElementById('news-id').value = item.id;
    document.getElementById('news-title').value = item.title;
    document.getElementById('news-content').value = item.content || '';
    document.getElementById('news-submit').textContent = '更新新闻';
    document.getElementById('news-cancel').classList.remove('hidden');
  } catch (err) {
    alert('加载新闻详情失败');
  }
};

document.getElementById('news-cancel').addEventListener('click', () => {
  document.getElementById('news-form').reset();
  document.getElementById('news-id').value = '';
  document.getElementById('news-submit').textContent = '保存新闻';
  document.getElementById('news-cancel').classList.add('hidden');
});

document.getElementById('news-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('news-id').value;
  const title = document.getElementById('news-title').value;
  const content = document.getElementById('news-content').value;
  
  try {
    await fetch('/api/news/edit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ id: id || undefined, title, content })
    });
    document.getElementById('news-cancel').click();
    loadNews();
  } catch (err) {
    alert('保存失败');
  }
});

checkAuth();
