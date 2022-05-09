import { Product, ProductStore } from '../models/product.mjs';
import dotenv from 'dotenv';
import supertest from 'supertest';
import app from '../main.mjs';
dotenv.config();
const productStore = new ProductStore();
const request = supertest(app);
const token = process.env.TOKEN;

let productId: unknown;
const product: Product = {
  id: 1,
  name: 'mango',
  price: 10,
  category: 'fruit',
};

describe('product model', () => {
  it('should have index method', () => {
    expect(productStore.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(productStore.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(productStore.create).toBeDefined();
  });
});

describe('testing CRUD actions of product model', () => {
  beforeAll(async () => {
    const createdProduct = await productStore.create(product);
    productId = createdProduct.id;
    // testing create method
    expect(createdProduct.name).toBe(product.name);
  });

  it('index method should return an array of all products', async () => {
    const indexedProducts = await productStore.index();
    expect(indexedProducts).toEqual([
      {
        id: productId as number,
        name: product.name,
        price: product.price,
        category: product.category,
      },
    ]);
  });
  it('show method should return a specific product', async () => {
    const indexedUsers = await productStore.show(productId as string);
    expect(indexedUsers).toEqual({
      id: productId as number,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  });

  it('delete method should delete specific product', async () => {
    const deletedProduct = await productStore.delete(productId as string);
    expect(deletedProduct).toEqual({
      id: productId as number,
      name: product.name,
      price: product.price,
      category: product.category,
    });
  });
});

describe('testing product model endpoints', () => {
  it('testing create endpoint should return the created object ', async () => {
    const response = await request
      .post('/api/products')
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`)
      .send({
        id: 2,
        name: 'apple',
        price: 15,
        category: 'fruit',
      });

    expect(response.body.data.name).toBe('apple');
  });
  it('testing index endpoint should return an array of present products ', async () => {
    const response = await request.get('/api/products');

    expect(response.body.data[0].id).toBe('2');
  });
  it('testing show endpoint should return specific product ', async () => {
    const response = await request.get('/api/products/2');

    expect(response.body.data.name).toBe('apple');
  });
});
