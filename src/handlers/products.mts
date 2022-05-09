import { Product, ProductStore } from '../models/product.mjs';
import express, { Request, Response, NextFunction } from 'express';
import verifyAuthorization from '../middlewares/verifyAuthorization.mjs';

const store = new ProductStore();

const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const retrievedProducts = await store.index();
    res.json({
      data: retrievedProducts,
      message: 'products are retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};
const show = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const retrievedProduct = await store.show(req.params.id);

    res.json({
      data: retrievedProduct,
      message: 'product is retrieved successfully',
    });
  } catch (err) {
    next(err);
  }
};
const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product: Product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
    };

    const createdProduct = await store.create(product);

    res.json({
      data: createdProduct,
      message: 'product is created successfully',
    });
  } catch (err) {
    next(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products:id', show);
  app.post('/products', verifyAuthorization, create);
};

export default productRoutes;

export { index, show, create };
