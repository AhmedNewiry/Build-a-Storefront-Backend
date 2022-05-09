import db_connection from '../database.mjs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
dotenv.config();

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
};

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT id,first_name,last_name,email FROM users';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`couldn't find any products. Error:${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const connection = await db_connection.connect();
      const sql =
        'SELECT id,first_name,last_name,email FROM users where id=($1)';

      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldn't find user ${id}. Error:${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const connection = await db_connection.connect();
      const sql =
        'INSERT INTO users (first_name,last_name,email,password) VALUES ($1,$2,$3,$4) RETURNING id,first_name,last_name';
      const hashedPassword = bcrypt.hashSync(
        (user.password as string) + pepper,
        parseInt(saltRounds as string)
      );
      const result = await connection.query(sql, [
        user.first_name,
        user.last_name,
        user.email,
        hashedPassword,
      ]);
      const createdUser = result.rows[0];
      connection.release();

      return createdUser;
    } catch (error) {
      throw new Error(`couldn't add user: ${user.first_name}. Error:${error}`);
    }
  }
  async delete(id: number): Promise<User> {
    try {
      const connection = await db_connection.connect();
      const sql =
        ' DELETE FROM users where id=($1) RETURNING id,first_name,last_name,email';
      const result = await connection.query(sql, [id]);
      const deletedUser = result.rows[0];
      connection.release();

      return deletedUser;
    } catch (error) {
      throw new Error(`couldn't delete user: ${id}. Error:${error}`);
    }
  }

  async authencticate(email: string, password: string): Promise<User | null> {
    const connection = await db_connection.connect();
    const sql =
      'SELECT id,first_name,last_name,email,password FROM users where email=($1)';
    const result = await connection.query(sql, [email]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password)) {
        return user;
      }
    }
    return null;
  }
}
