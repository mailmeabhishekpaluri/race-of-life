import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { initDb } from '@/lib/initDb';

export async function POST(req: NextRequest) {
  await initDb();
  const { room_code, player_name, role_id, role_label, role_emoji } = await req.json();
  const result = await sql`
    INSERT INTO players (room_code, player_name, role_id, role_label, role_emoji)
    VALUES (${room_code}, ${player_name}, ${role_id}, ${role_label}, ${role_emoji})
    RETURNING id
  `;
  return NextResponse.json({ id: result[0].id });
}
