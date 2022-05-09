import { Order, ProdcutOrders, OrderStore } from '../models/order.mjs';
import express, { Request, Response, NextFunction } from 'express';
import verifyAuthorization from '../middlewares/verifyAuthorization.mjs';

const store = new OrderStore();

const index = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const indexedOrders = await store.index();
    res.status(200).json({
      data: indexedOrders,
      message: 'orders are successfully retrieved',
    });
  } catch (err) {
    next(err);
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const showSpecificOrder = await store.show(req.params.id);
    res.status(200).json({
      data: showSpecificOrder,
      message: 'required order is successfully retrieved',
    });
  } catch (err) {
    next(err);
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order: Order = {
      id: req.body.id,
      product_quantity: req.body.product_quantity,
      order_status: req.body.order_status,
      user_id: req.body.user_id,
    };

    const createdOrder = await store.create(order);
    res.status(200).json({
      data: createdOrder,
      message: 'your order is successfully created',
    });
  } catch (err) {
    next(err);
  }
};

const getCurrentOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user_id: string = req.params.user_id;
    const currentOrder = await store.getCurrentOrder(user_id);

    res.status(200).json({
      data: currentOrder,
      message: 'current order is successfully retrieved',
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const addProduct = async (req: Request, res: Response, next: NextFunction) => {

  const ProductInOrder: ProdcutOrders = {
    id: req.body.id,
    quantity: req.body.quantity,
    order_id: parseInt(req.params.order_id),
    product_id: req.body.product_id,
  };

  try {
    const addedProduct = await store.addProduct(ProductInOrder);
    res.status(200).json({
      data: addedProduct,
      message: 'your product is added successfully',
    });
  } catch (err) {
    next(err);
  }
};
const orderRoutes = (app: express.Application) => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.get('/orders/:user_id', verifyAuthorization, getCurrentOrder);
};
export { index, show, create, getCurrentOrder, addProduct };
export default orderRoutes;
