import express from 'express';
import { index, show, create } from '../../handlers/products.mjs';
import verifyAuth from '../../middlewares/verifyAuthorization.mjs';
const product = express.Router();

product.route('/').get(index).post(verifyAuth, create);
product.route('/:id').get(show);

export default product;
