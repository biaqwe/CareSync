import * as mysql from 'mysql';
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'pass',
  database: 'CareSync'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

export default db;
