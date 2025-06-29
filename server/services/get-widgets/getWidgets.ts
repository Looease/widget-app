import { Pool } from 'pg';

export const getWidgets = async (pool: Pool) => {
const result = await pool.query(
    "SELECT * FROM widgets",
  );
  return result.rows;
}