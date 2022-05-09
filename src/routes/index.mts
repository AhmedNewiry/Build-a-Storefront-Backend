import express from 'express';
import user from './api/userRoutes.mjs';
import product from './api/productRoutes.mjs';
import order from './api/orderRoutes.mjs';
const routes = express.Router();

routes.use('/users', user);
routes.use('/products', product);
routes.use('/orders', order);
routes.use('/users/orders', order);

export default routes;
