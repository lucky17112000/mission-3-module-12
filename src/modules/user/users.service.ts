import { pool } from "../../config/db";
import bcypt from "bcrypt";

const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, role } = payload;
  const hashedPassword = await bcypt.hash(password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name,role, email, password) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, role, email, hashedPassword]
  );

  return result;
};

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleuser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateuser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1 , email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );
  return result;
};

const deleteuser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleuser,
  updateuser,
  deleteuser,
};
