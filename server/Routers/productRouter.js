import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';
import data from '../data.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
      .populate('category')
      .populate('seller');
    res.send(products);
  })
);
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

productRouter.post(
  '/newProduct',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    delete req.body.product._id;
    const product = new Product({
      ...req.body.product,
      seller: req.body.userId,
    });
    const newProduct = await product.save();
    res.send(newProduct);
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productDetails = await Product.findById(req.params.id)
      .populate('category')
      .populate('seller');
    if (productDetails) res.send(productDetails);
    else res.status(404).send({ message: 'Product not found' });
  })
);

export default productRouter;
