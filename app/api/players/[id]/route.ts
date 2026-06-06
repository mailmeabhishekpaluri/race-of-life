import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { yes_count, current_level_index, phase, finished } = await req.json();
  await sql`
    UPDATE players
    SET yes_count = ${yes_count},
        current_level_index = ${current_level_index},
        phase = ${phase},
        finished = ${finished},
        updated_at = NOW()
    WHERE id = ${parseInt(params.id)}
  `;
  return NextResponse.json({ ok: true });
}
