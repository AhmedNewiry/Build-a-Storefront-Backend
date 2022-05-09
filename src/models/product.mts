import db_connection from '../database.mjs';

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT * FROM products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`couldnot find any products. Error: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT * FROM products where id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release;
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldnot find product ${id}.Error ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await db_connection.connect();
      const sql =
        'INSERT INTO products (name,price,category) VALUES ($1,$2,$3) RETURNING *';
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.category,
      ]);
      const createdProduct = result.rows[0];

      connection.release();
      return createdProduct;
    } catch (error) {
      throw new Error(`couldnot add product ${product.name}.Error:${error}`);
    }
  }

  async delete(id: string): Promise<Product> {
    try {
      const connection = await db_connection.connect();
      const sql =
        ' DELETE FROM products where id=($1) RETURNING id,name,price,category';
      const result = await connection.query(sql, [id]);
      const deletedProduct = result.rows[0];
      connection.release();

      return deletedProduct;
    } catch (error) {
      throw new Error(`couldn't delete product: ${id}. Error:${error}`);
    }
  }
}
