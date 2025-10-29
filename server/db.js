
import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config(); // ✅ This must be here

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
   ssl: { rejectUnauthorized: false }
});


console.log('Connected to DB:', process.env.DB_NAME);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to DB:", res.rows[0].now);
  }
});
export default pool;
