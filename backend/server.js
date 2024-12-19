const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run(`INSERT INTO users(name, email, password) VALUES(?,?,?)`, [name, email, hash], function(err) {
    if (err) return res.status(400).json({error: err.message});
    res.json({id: this.lastID, name, email});
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({error: err.message});
    if (!user) return res.status(401).json({error: "User not found"});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({error: "Wrong password"});
    res.json({id: user.id, name: user.name, email: user.email});
  });
});

app.get('/api/gifts', (req, res) => {
  db.all(`SELECT * FROM gifts`, [], (err, rows) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(rows);
  });
});

app.post('/api/orders', (req, res) => {
  const { userId, giftIds } = req.body;
  if (!userId || !giftIds || !giftIds.length) return res.status(400).json({error: "Invalid data"});

  const placeholders = giftIds.map(()=>'?').join(',');
  db.all(`SELECT price FROM gifts WHERE id IN (${placeholders})`, giftIds, (err, prices) => {
    if (err) return res.status(500).json({error: err.message});
    const totalPrice = prices.reduce((sum, p) => sum + p.price, 0);
    db.run(`INSERT INTO orders(userId, totalPrice, status) VALUES(?,?,?)`, [userId, totalPrice, 'created'], function (err) {
      if (err) return res.status(500).json({error: err.message});
      const orderId = this.lastID;
      const stmt = db.prepare(`INSERT INTO order_gifts(orderId, giftId) VALUES(?,?)`);
      giftIds.forEach(gid => {
        stmt.run(orderId, gid);
      });
      stmt.finalize();
      res.json({orderId, totalPrice});
    });
  });
});

app.get('/api/orders/:userId', (req, res) => {
  const userId = req.params.userId;
  db.all(`SELECT * FROM orders WHERE userId = ?`, [userId], (err, orders) => {
    if (err) return res.status(500).json({error: err.message});
    res.json(orders);
  });
});

app.listen(4000, ()=> console.log("Backend running on http://localhost:4000"));
