const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE gifts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT,
      price REAL,
      description TEXT
    )
  `);

  db.run(`
    CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTEGER,
      totalPrice REAL,
      status TEXT,
      FOREIGN KEY(userId) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE order_gifts (
      orderId INTEGER,
      giftId INTEGER,
      FOREIGN KEY(orderId) REFERENCES orders(id),
      FOREIGN KEY(giftId) REFERENCES gifts(id)
    )
  `);

  db.run(`INSERT INTO gifts(name, category, price, description) VALUES 
    ('Розы', 'Цветы', 15.0, 'Красные розы'), 
    ('Шоколадные конфеты', 'Сладости', 10.0, 'Набор конфет'), 
    ('Сувенирная чашка', 'Сувениры', 5.0, 'Чашка с принтом')`);
});

module.exports = db;
