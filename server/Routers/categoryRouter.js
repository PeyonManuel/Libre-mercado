import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../Models/categoryModel.js';
import data from '../data.js';

const categoryRouter = express.Router();

categoryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);

categoryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(data.categories);
    res.send({ createdCategories });
  })
);

export default categoryRouter;
