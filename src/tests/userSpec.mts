import { User, UserStore } from '../models/user.mjs';

import dotenv from 'dotenv';

import supertest from 'supertest';
import app from '../main.mjs';

const userStore = new UserStore();

const request = supertest(app);
dotenv.config();

let userId: unknown;

const user: User = {
  id: 1,
  first_name: 'ahmed',
  last_name: 'ali',
  email: 'ahmedali@gmail.com',
  password: 'ahmedali',
};

describe('user model', () => {
  it('should have index method', () => {
    expect(userStore.index).toBeDefined();
  });
  it('should have show method', () => {
    expect(userStore.show).toBeDefined();
  });
  it('should have create method', () => {
    expect(userStore.create).toBeDefined();
  });
  it('should have delete method', () => {
    expect(userStore.delete).toBeDefined();
  });
  it('should have authentication  method', () => {
    expect(userStore.authencticate).toBeDefined();
  });
});

describe('testing CRUD actions and authentication method of user model', () => {
  // const hashedPassword = bcrypt.hashSync(
  //   (user.password as string) + pepper,
  //   parseInt(saltRounds as string)
  // );

  beforeAll(async () => {
    const createdUser = await userStore.create(user);
    userId = createdUser.id;
    // testing create method
    expect(createdUser.first_name).toBe(user.first_name);
  });

  // afterAll(async ()=>{
  //         const deletedUser= await userStore.delete(userId as number);

  // })

  it('testing the authenticaton method and it should return the authenticated user', async () => {
    const authencticatedUser = await userStore.authencticate(
      user.email,
      user.password as string
    );

    expect(authencticatedUser?.id).toBe(userId as number);
    expect(authencticatedUser?.email).toBe(user.email);
    expect(authencticatedUser?.first_name).toBe(user.first_name);
    expect(authencticatedUser?.last_name).toBe(user.last_name);
  });

  it('index method should return an array of all users', async () => {
    const indexedUsers = await userStore.index();
    expect(indexedUsers).toEqual([
      {
        id: userId as number,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    ]);
  });
  it('show method should return a specific user', async () => {
    const indexedUsers = await userStore.show(userId as string);
    expect(indexedUsers).toEqual({
      id: userId as number,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  });
  it('delete method should delete specific user', async () => {
    const deletedUser = await userStore.delete(userId as number);
    expect(deletedUser).toEqual({
      id: userId as number,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
  });
});
let token = '';
describe('testing user modle endpoints', () => {
  afterAll(async () => {
    await userStore.delete(2);
  });
  const userTwo: User = {
    id: 2,
    first_name: 'ali',
    last_name: 'ahmed',
    email: 'aliahmed@gmail.com',
    password: 'aliahmed',
  };

  it('testing create endpoint should return created user ', async () => {
    const response = await request
      .post('/api/users')
      .set('content-type', 'application/json')
      .send(userTwo);

    expect(response.body.data.first_name).toBe('ali');
  });

  it('testing authentication endpoint should return status 200 ', async () => {
    const response = await request.post('/api/users/authenticate').send({
      email: userTwo.email,
      password: userTwo.password,
    });

    expect(response.status).toBe(200);
    token = response.body.token;
  });

  it('testing index endpoint should return an array of all users ', async () => {
    const response = await request
      .get('/api/users')
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.body.data[0].first_name).toBe('ali');
  });
  it('testing show endpoint should return specific user ', async () => {
    const response = await request
      .get('/api/users/2')
      .set('content-type', 'application/json')
      .set('authorization', `Bearer ${token}`);

    expect(response.body.data.first_name).toEqual('ali');
  });
});
