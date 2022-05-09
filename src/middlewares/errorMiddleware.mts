import { Request, Response } from 'express';
interface Error {
  message: string;
  name: string;
  status: number;
  stack?: string;
}
const errorHandler = async (err: Error, req: Request, res: Response) => {
  const status = err.status || 500;
  const messege = err.message || 'some thing went wrong';
  res.status(status).json({
    messege: messege,
  });
};

export default errorHandler;
