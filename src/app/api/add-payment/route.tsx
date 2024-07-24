import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../lib/db';

export async function POST(req: NextRequest) {
  const { userId, amount, dueDate, isPaid } = await req.json();

  if (!userId || !amount || !dueDate || isPaid === undefined) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const client = await getClient();

  try {
    await client.query('BEGIN');

    const userCheck = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (userCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }


    await client.query(
      'INSERT INTO payments (user_id, amount, due_date, is_paid) VALUES ($1, $2, $3, $4)',
      [userId, amount, dueDate, isPaid]
    );

    await client.query('COMMIT');

    return NextResponse.json({ message: 'Payment added successfully' }, { status: 201 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting payment into the database', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    client.release();
  }
}
