import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// API: Get general site content
app.get('/api/content', (req, res) => {
  db.all('SELECT key, value FROM site_data', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const content = {};
    rows.forEach((row) => {
      content[row.key] = JSON.parse(row.value);
    });
    res.json(content);
  });
});

// API: Get products for showcase
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// API: Get messages for message board
app.get('/api/messages', (req, res) => {
  db.all('SELECT * FROM messages ORDER BY created_at DESC', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Rate Limiting (防刷) for messages
const messageRateLimitMap = new Map();

// API: Submit a new message
app.post('/api/messages', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const lastTime = messageRateLimitMap.get(ip);
  const now = Date.now();
  if (lastTime && now - lastTime < 60000) { // 1 minute limit
    return res.status(429).json({ error: '您提交得太频繁了，请稍后再试。' });
  }
  messageRateLimitMap.set(ip, now);

  const { name, content } = req.body;
  if (!name || !content) {
    res.status(400).json({ error: 'Name and content are required' });
    return;
  }
  
  const stmt = db.prepare('INSERT INTO messages (name, content) VALUES (?, ?)');
  stmt.run(name, content, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({ id: this.lastID, name, content });
  });
  stmt.finalize();
});

// --- ADMIN APIs ---

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  // Simple hardcoded password for demonstration
  if (password === 'admin123') {
    res.json({ token: 'admin-token-xyz' });
  } else {
    res.status(401).json({ error: '密码错误' });
  }
});

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token === 'Bearer admin-token-xyz') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.post('/api/content', requireAuth, (req, res) => {
  const data = req.body; // expects { key, value }
  const stmt = db.prepare('INSERT OR REPLACE INTO site_data (key, value) VALUES (?, ?)');
  stmt.run(data.key, JSON.stringify(data.value), function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
  stmt.finalize();
});

app.post('/api/products/edit', requireAuth, (req, res) => {
  const { id, name, description, image, content } = req.body;
  if (id) {
    db.run('UPDATE products SET name=?, description=?, image=?, content=? WHERE id=?', [name, description, image, content, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  } else {
    db.run('INSERT INTO products (name, description, image, content) VALUES (?, ?, ?, ?)', [name, description, image, content], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    });
  }
});

app.post('/api/products/delete', requireAuth, (req, res) => {
  db.run('DELETE FROM products WHERE id=?', [req.body.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.post('/api/messages/delete', requireAuth, (req, res) => {
  db.run('DELETE FROM messages WHERE id=?', [req.body.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// API: Get news list
app.get('/api/news', (req, res) => {
  db.all('SELECT id, title, created_at FROM news ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get('/api/news/:id', (req, res) => {
  db.get('SELECT * FROM news WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

app.post('/api/news/edit', requireAuth, (req, res) => {
  const { id, title, content } = req.body;
  if (id) {
    db.run('UPDATE news SET title=?, content=? WHERE id=?', [title, content, id], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    });
  } else {
    db.run('INSERT INTO news (title, content) VALUES (?, ?)', [title, content], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    });
  }
});

app.post('/api/news/delete', requireAuth, (req, res) => {
  db.run('DELETE FROM news WHERE id=?', [req.body.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
