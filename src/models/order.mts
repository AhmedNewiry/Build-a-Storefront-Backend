import db_connection from '../database.mjs';

export type Order = {
  id: number;
  product_quantity: number;
  order_status: string;
  user_id: number;
};

export type ProdcutOrders = {
  id: number;
  quantity: number;
  order_id: number;
  product_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT * FROM orders';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`coudlnot find any orders. Error: ${error}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`coudlnot find order ${id}. Error: ${error}`);
    }
  }
  async create(order: Order): Promise<Order> {
    try {
      const connection = await db_connection.connect();
      const sql =
        'INSERT INTO orders (product_quantity,order_status,user_id) VALUES ($1,$2,$3) RETURNING * ';
      const result = await connection.query(sql, [
        order.product_quantity,
        order.order_status,
        order.user_id,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`coudlnot create order ${order.id}. Error: ${error}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const connection = await db_connection.connect();
      const sql =
        ' DELETE FROM orders where id=($1) RETURNING id,product_quantity,order_status,user_id';
      const result = await connection.query(sql, [id]);
      const deletedOrder = result.rows[0];
      connection.release();

      return deletedOrder;
    } catch (error) {
      throw new Error(`couldn't delete order: ${id}. Error:${error}`);
    }
  }

  async getCurrentOrder(user_id: string): Promise<Order> {
    try {
      const connection = await db_connection.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=$1 ';
      const result = await connection.query(sql, [user_id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`couldnot find  the current order. Error:${error} `);
    }
  }

  async addProduct(productOrders: ProdcutOrders): Promise<ProdcutOrders> {
    try {
      const sql =
        'INSERT INTO product_orders (quantity,order_id, product_id) VALUES($1, $2,$3) RETURNING *';

      const connection = await db_connection.connect();

      const result = await connection.query(sql, [
        productOrders.quantity,
        productOrders.order_id,
        productOrders.product_id,
      ]);

      const addedProduct = result.rows[0];

      connection.release();

      return addedProduct;
    } catch (err) {
      throw new Error(
        `Could not add product ${productOrders.product_id} to order ${productOrders.order_id}: ${err}`
      );
    }
  }
}
