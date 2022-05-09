import { Order, ProdcutOrders, OrderStore } from '../models/order.mjs';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../main.mjs';
import { User, UserStore } from '../models/user.mjs';
import db_connection from '../database.mjs';

dotenv.config();
const orderStore = new OrderStore();
const userStore = new UserStore();
const request = supertest(app);
const token = process.env.TOKEN;

let userId: unknown;
let userTwoId: unknown;
let orderId: unknown;

const order: Order = {
  id: 1,
  product_quantity: 5,
  order_status: 'active',
  user_id: 1,
};

const user: User = {
  id: 1,
  first_name: 'ahmed',
  last_name: 'ali',
  email: 'ahmedali@gmail.com',
  password: 'ahmedali',
};
const userTwo: User = {
  id: 2,
  first_name: 'ali',
  last_name: 'ahmed',
  email: 'ali@gmail.com',
  password: 'ahmedali',
};

const prodcutOrders: ProdcutOrders = {
  id: 1,
  quantity: 5,
  order_id: 1,
  product_id: 2,
};

describe(' order model', () => {
  it('should have index method', () => {
    expect(orderStore.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(orderStore.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(orderStore.create).toBeDefined();
  });
  it('should have add product  method', () => {
    expect(orderStore.addProduct).toBeDefined();
  });
});

describe('testing CRUD actions of order model', () => {
  beforeAll(async () => {
    const createdUser = await userStore.create(user);
    userId = createdUser.id;

    const createdOrder = await orderStore.create(order);
    orderId = createdOrder.id;
    // testing create method of order model
    expect(createdOrder.order_status).toBe(order.order_status);
  });

  afterAll(async () => {
    await userStore.delete(userId as number);
  });

  it('index method should return an array of all ordres', async () => {
    const indexedOrders = await orderStore.index();
    expect(indexedOrders[0].product_quantity).toBe(5);
  });
  it('show method should return a specific order', async () => {
    const indexedOrders = await orderStore.show(orderId as string);
    expect(indexedOrders.product_quantity).toBe(5);
  });
  it('getCurrentOder method should return the current order using user_id', async () => {
    const currentOrder = await orderStore.getCurrentOrder(userId as string);
    expect(currentOrder.product_quantity).toBe(5);
  });
  it('addProduct method should add the quantity of a specific product within a specific order', async () => {
    const addedProduct = await orderStore.addProduct(prodcutOrders);
    expect(addedProduct.quantity).toBe(5);
  });

  it('delete method should delete specific order', async () => {
    const connection = await db_connection.connect();
    const sql = 'DELETE FROM product_orders WHERE id=$1';
    await connection.query(sql, [1]);
    const deletedOrder = await orderStore.delete(orderId as string);
    expect(deletedOrder.product_quantity).toBe(5);
  });
});

describe('testing order model endpoints', () => {
  beforeAll(async () => {
    const createdUser = await userStore.create(userTwo);
    userTwoId = createdUser.id;
  });

  const orderTwo: Order = {
    id: 2,
    product_quantity: 10,
    order_status: 'active',
    user_id: 2,
  };
  it('testing create endpoint should return the created order', async () => {
    const response = await request
      .post('/api/orders')
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send(orderTwo);

    expect(response.status).toBe(200);
  });
  it('testing index endpoint should return an array of all orders ', async () => {
    const response = await request.get('/api/orders');

    expect(response.body.data[0].product_quantity).toBe(10);
  });
  it('testing getCurrentOrder endpoint should return the current order using user_id', async () => {
    const response = await request
      .get(`/api/users/orders/${userTwoId}`)
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.body.data.product_quantity).toBe(10);
  });
  it('testing show endpoint should return specific order ', async () => {
    const response = await request.get('/api/orders/2');

    expect(response.body.data.product_quantity).toBe(10);
  });
  it('testing addProduct endpoint should return specific product quantity ', async () => {
    const response = await request
      .post('/api/orders/2/products')
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`)

      .send({
        id: 2,
        quantity: 15,

        product_id: 2,
      });

    expect(response.body.data.quantity).toBe(15);
  });
});
