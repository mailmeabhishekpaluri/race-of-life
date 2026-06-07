import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { initDb } from '@/lib/initDb';

export async function POST(req: NextRequest) {
  await initDb();
  const { room_code } = await req.json();
  const code = room_code.toUpperCase();
  const result = await sql`
    INSERT INTO rooms (room_code)
    VALUES (${code})
    ON CONFLICT (room_code) DO UPDATE SET updated_at = NOW()
    RETURNING *
  `;
  return NextResponse.json({ room: result[0] });
}
