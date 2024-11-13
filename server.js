import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import bcrypt from 'bcrypt';

const app = express();

app.use(cors());
app.use(express.json());

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


app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password.' });
  }

  console.log('Email received:', email);
  console.log('Password received:', password);

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      console.log('No user found for email:', email);
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = results[0];
    console.log('Password hash stored in database:', user.password_hash);

    const match = await bcrypt.compare(password, user.password_hash);
    if (match) {
      console.log('Password match successful');
      return res.json({
        message: 'Login successful',
        id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email
      });
    } else {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
  });
});

app.post('/api/signup', async (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Please provide email, password, and confirm password.' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], async (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error. Please try again later.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email is already taken. Please use a different email.' });
    }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const insertQuery = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    db.query(insertQuery, [email, password_hash], (err, results) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
      }

      res.status(201).json({
        message: 'User account created successfully',
        user_id: results.insertId
      });
    });
  });
});

app.post('/api/profile', (req, res) => {
  console.log("Received request:", req.body);
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).send('User ID is required');
  }

  const query = 'SELECT * FROM users WHERE user_id = ?';

  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).send('Error fetching user from database');
    }

    if (results.length === 0) {
      return res.status(404).send('No user found');
    }

    res.json(results[0]);
  });
});


app.post('/api/profile/update', (req, res) => {
  console.log("Received update request:", req.body);

  const { user_id, firstName, lastName, phoneNumber, birthDate, gender, address } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const query = `
    UPDATE users 
    SET first_name = ?, last_name = ?, phoneNumber = ?, birthDate = ?, gender = ?, address = ?
    WHERE user_id = ?`;

  db.query(query, [firstName, lastName, phoneNumber, birthDate, gender, address, user_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Error updating user in database' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'No user found to update' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });
  });
});

app.post('/api/settings/email', async (req, res) => {
  const { user_id, newEmail } = req.body;

  if (!user_id || !newEmail) {
    return res.status(400).json({ message: 'User ID and new email are required.' });
  }

  const query = 'UPDATE users SET email = ? WHERE user_id = ?';
  db.query(query, [newEmail, user_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Email updated successfully' });
  });
});

app.post('/api/settings/password', async (req, res) => {
  const { user_id, newPassword, confirmPassword } = req.body;

  if (!user_id || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: 'User ID, new password, and confirm password are required.' });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match.' });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const query = 'UPDATE users SET password_hash = ? WHERE user_id = ?';

  db.query(query, [hashedPassword, user_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Password updated successfully' });
  });
});

app.delete('/api/settings/delete', async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  const query = 'DELETE FROM users WHERE user_id = ?';
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
