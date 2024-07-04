import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, terms } = await req.json();

  if (!firstName || !lastName || !email || !password || !terms) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    const emailCheck = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return NextResponse.json({ message: 'This email is already taken' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await query(
      'INSERT INTO users (username, lastname, email, password) VALUES ($1, $2, $3,$4)',
      [firstName,lastName, email, hashedPassword]
    );

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error inserting user into the database', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
