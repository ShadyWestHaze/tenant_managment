import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
export const getClient = () => pool.connect();

export const getTenantCount = async () => {
  const result = await query('SELECT COUNT(*) FROM users');
  return parseInt(result.rows[0].count, 10);
};

export const getPendingInvoicesCount = async () => {
  const result = await query('SELECT COUNT(*) FROM payments WHERE is_paid = false');
  return parseInt(result.rows[0].count, 10);
};

export const getTenants = async () => {
  const result = await query('SELECT name, lastname, email, ismanager FROM users');
  return result.rows;
};

export const getNotices = async () => {
  const result = await query('SELECT * FROM notices ORDER BY created_at DESC');
  return result.rows;
};

export const getInvoices = async () => {
  const result = await query(`
    SELECT payments.id, payments.user_id, payments.amount, payments.due_date, payments.is_paid, users.name, users.lastname
    FROM payments
    JOIN users ON payments.user_id = users.id
    ORDER BY payments.due_date DESC
  `);
  return result.rows;
};
