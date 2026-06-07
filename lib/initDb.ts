import { sql } from './db';

export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS players (
      id SERIAL PRIMARY KEY,
      room_code VARCHAR(20) NOT NULL,
      player_name VARCHAR(100) NOT NULL,
      role_id VARCHAR(50) NOT NULL,
      role_label VARCHAR(100) NOT NULL,
      role_emoji VARCHAR(10) NOT NULL,
      yes_count INTEGER NOT NULL DEFAULT 0,
      total_questions INTEGER NOT NULL DEFAULT 25,
      current_level_index INTEGER NOT NULL DEFAULT 0,
      phase VARCHAR(20) NOT NULL DEFAULT 'join',
      finished BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_players_room_code ON players(room_code)
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      room_code VARCHAR(10) UNIQUE NOT NULL,
      current_question_index INTEGER NOT NULL DEFAULT -1,
      status VARCHAR(20) NOT NULL DEFAULT 'waiting',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    ALTER TABLE players ADD COLUMN IF NOT EXISTS last_answered_index INTEGER NOT NULL DEFAULT -1
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_rooms_room_code ON rooms(room_code)
  `;
}
