import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader: unknown = req.headers.authorization;
    const token = (authHeader as string).split(' ')[1];

    jwt.verify(token, process.env.SECRET_TOKEN as Secret);

    next();
  } catch (error) {
    res.status(401).json({
      message: 'Access denied, invalid token',
    });
  }
};

export default verifyAuth;
