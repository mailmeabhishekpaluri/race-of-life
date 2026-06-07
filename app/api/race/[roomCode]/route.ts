import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
  _req: NextRequest,
  { params }: { params: { roomCode: string } }
) {
  const code = params.roomCode.toUpperCase();

  const rooms = await sql`SELECT * FROM rooms WHERE room_code = ${code}`;
  const room = rooms[0] ?? null;

  const players = await sql`
    SELECT id, player_name, role_id, role_label, role_emoji,
           yes_count, total_questions, current_level_index,
           last_answered_index, phase, finished,
           created_at, updated_at
    FROM players
    WHERE room_code = ${code}
    ORDER BY yes_count DESC, created_at ASC
  `;

  return NextResponse.json({ room, players });
}
