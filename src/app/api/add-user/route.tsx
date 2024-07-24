import { NextRequest, NextResponse } from 'next/server';
import { getClient } from '../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, terms } = await req.json();

  if (!firstName || !lastName || !email || !password || !terms) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  const client = await getClient();

  try {
    await client.query('BEGIN');

    const emailCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      await client.query('ROLLBACK');
      return NextResponse.json({ message: 'This email is already taken' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await client.query(
      'INSERT INTO users (name, lastname, email, password) VALUES ($1, $2, $3, $4)',
      [firstName, lastName, email, hashedPassword]
    );

    await client.query('COMMIT');

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error inserting user into the database', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  } finally {
    client.release();
  }
}
