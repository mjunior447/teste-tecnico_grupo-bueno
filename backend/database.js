import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

export async function getUsers() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows;
}

async function getUser(id) {
  try {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id = ?
      `,
      [id]
    );

    return rows[0];
  } catch (error) {
    throw error;
  }
}

export async function createUser(name, email) {
  try {
    const [newUser] = await pool.query(
      `
      INSERT INTO users (name, email)
      VALUES (?, ?)
      `,
      [name, email]
    );

    const id = newUser.insertId;
    return getUser(id);
  } catch (error) {
    throw error;
  }
}

export async function updateUser(id, name, email) {
  try {
    await pool.query(
      `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ?
      `,
      [name, email, id]
    );
  } catch (error) {
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    await pool.query(
      `
        DELETE
        FROM users
        WHERE id = ?
      `,
      [id]
    );
  } catch (error) {
    throw error;
  }
}
