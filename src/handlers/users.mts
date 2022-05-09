import { User, UserStore } from '../models/user.mjs';
import express, { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import verifyAuthorization from '../middlewares/verifyAuthorization.mjs';

const store = new UserStore();
const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const indexedUsers = await store.index();

    res.json({
      data: indexedUsers,

      messege: 'users are succeesfully retrieved',
    });
  } catch (err) {
    next(err);
  }
};

const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToBeShown = await store.show(req.params.id);

    res.json({
      data: userToBeShown,
      message: 'required user is successfully retrieved ',
    });
  } catch (err) {
    next(err);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };
    const createdUser = await store.create(user);

    res.json({
      data: createdUser,
      message: 'user is created successfully',
    });
  } catch (err) {
    next(err);
  }
};

const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: User = {
      id: req.body.id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    };

    const authencticatedUser = await store.authencticate(
      user.email,
      user.password as string
    );
    if (authencticatedUser) {
      const token = jwt.sign(
        { user: authencticatedUser },
        process.env.SECRET_TOKEN as Secret
      );
      res.status(200).json({
        token: token,
        status: 'successful login',
        message: `welcome ${authencticatedUser.first_name}`,
        id: authencticatedUser.id,
        first_name: authencticatedUser.first_name,
        last_name: authencticatedUser.last_name,
      });
    } else {
      res.status(401).json({
        message: 'unauthorized login please check your email and password',
        status: 'unsuccessful login',
      });
    }
  } catch (err) {
    next(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthorization, index);
  app.get('/users/:id', verifyAuthorization, show);
  app.post('/users', create);
  app.post('/users/autheticate', authentication);
};

export { index, show, create, authentication };

export default userRoutes;
