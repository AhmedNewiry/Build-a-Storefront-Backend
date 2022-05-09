import express from 'express';
import verifyAuth from '../../middlewares/verifyAuthorization.mjs';
import {
  index,
  show,
  create,
  getCurrentOrder,
  addProduct,
} from '../../handlers/orders.mjs';
const order = express.Router();

order.route('/').get(index).post(create);
order.route('/:id').get(show);
order.route('/:order_id/products').post(verifyAuth, addProduct);
order.route('/:user_id').get(verifyAuth, getCurrentOrder);

export default order;
