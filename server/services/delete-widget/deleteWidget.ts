import { Pool } from 'pg';

export const deleteWidget = async (pool: Pool, id: number) => { 
  const result = await pool.query(
    "DELETE FROM widgets WHERE id = $1 RETURNING id", 
    [id] 
  );
  return result.rows; 
};