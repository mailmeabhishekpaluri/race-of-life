import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { initDb } from '@/lib/initDb';

export async function GET(_req: NextRequest, { params }: { params: { code: string } }) {
  await initDb();
  const code = params.code.toUpperCase();
  const rooms = await sql`SELECT * FROM rooms WHERE room_code = ${code}`;
  if (rooms.length === 0) return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  const room = rooms[0];

  const players = await sql`
    SELECT id, player_name, role_id, role_label, role_emoji,
           yes_count, total_questions, last_answered_index, phase, finished,
           created_at, updated_at
    FROM players
    WHERE room_code = ${code}
    ORDER BY yes_count DESC, created_at ASC
  `;

  const answeredCount = (players as { last_answered_index: number }[]).filter((p) =>
    p.last_answered_index >= room.current_question_index && room.current_question_index >= 0
  ).length;

  return NextResponse.json({ room, players, answeredCount });
}

export async function PATCH(req: NextRequest, { params }: { params: { code: string } }) {
  await initDb();
  const code = params.code.toUpperCase();
  const { current_question_index, status } = await req.json();
  await sql`
    UPDATE rooms
    SET current_question_index = ${current_question_index},
        status = ${status},
        updated_at = NOW()
    WHERE room_code = ${code}
  `;
  return NextResponse.json({ ok: true });
}
