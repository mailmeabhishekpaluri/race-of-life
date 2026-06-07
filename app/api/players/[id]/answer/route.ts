import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const playerId = parseInt(params.id);
  const { question_index, answer } = await req.json();

  await sql`
    UPDATE players
    SET yes_count = yes_count + ${answer ? 1 : 0},
        last_answered_index = ${question_index},
        finished = ${question_index >= 24},
        phase = ${question_index >= 24 ? 'finished' : 'answered'},
        updated_at = NOW()
    WHERE id = ${playerId}
      AND last_answered_index < ${question_index}
  `;

  return NextResponse.json({ ok: true });
}
