import { Pool } from "pg";

export const createWidget = async (pool: Pool, content: string) => {
  const result = await pool.query(
    "INSERT INTO widgets(content) VALUES ($1) RETURNING id, content",
    [content],
  );
  return result.rows[0];
};
