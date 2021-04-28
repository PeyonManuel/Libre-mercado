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
      .populate('seller', '_id userName');
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
  '/customsearch',
  expressAsyncHandler(async (req, res) => {
    const filterObject = {};
    if (req.query.search !== 'null') {
      let nameRegex = '.*' + req.query.search + '.*';
      nameRegex = new RegExp(nameRegex, 'i');
      filterObject.name = nameRegex;
    }
    if (req.query.category !== 'null') {
      filterObject.category = req.query.category;
    }
    if (req.query.isStateNew !== 'null') {
      filterObject.isStateNew = req.query.isStateNew;
    }
    if (req.query.noShipping !== 'null') {
      filterObject.noShipping = req.query.noShipping;
    }
    if (req.query.minimum !== 'null') {
      if (req.query.maximum !== 'null') {
        filterObject.price = {
          $gt: req.query.minimum,
          $lt: req.query.maximum,
        };
      } else {
        filterObject.price = { $gt: req.query.minimum };
      }
    } else if (req.query.maximum !== 'null') {
      filterObject.price = { $lt: req.query.maximum };
    }

    const products = await Product.find(filterObject)
      .populate('category')
      .populate('seller', '_id userName');
    res.send(products);
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productDetails = await Product.findById(req.params.id)
      .populate('category')
      .populate('seller', '_id userName');
    if (productDetails) res.send(productDetails);
    else res.status(404).send({ message: 'Product not found' });
  })
);

export default productRouter;
