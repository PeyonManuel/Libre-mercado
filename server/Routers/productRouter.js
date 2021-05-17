import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../Models/productModel.js';
import data from '../data.js';
import { isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find(
      { active: true, finished: false },
      {
        _id: 1,
        name: 1,
        cover: 1,
        price: 1,
        reviews: 1,
      }
    )
      .populate('category')
      .populate('seller', '_id userName');
    res.send(products);
  })
);
productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany({});
    const createdProducts = await Product.insertMany(
      data.products.map((product) => {
        return { ...product, cover: product.images[0] };
      })
    );
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
      cover: req.body.product.images[0],
      seller: req.body.userId,
    });
    const newProduct = await product.save();
    res.send(newProduct);
  })
);

productRouter.get(
  '/customsearch',
  expressAsyncHandler(async (req, res) => {
    const filterObject = { active: true, finished: false };
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
  '/idlist',
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find(
      {
        _id: { $in: req.headers.idarray.split(',') },
      },
      {
        _id: 1,
        name: 1,
        cover: 1,
        price: 1,
        reviews: 1,
      }
    )
      .populate('category')
      .populate('seller', '_id userName');
    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ message: 'Productos no encontrado' });
    }
  })
);

productRouter.post(
  '/updateproduct',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.product._id);
    if (product) {
      await product.updateOne({ ...req.body.product });
      await product.save();
      const updatedProduct = await Product.findById(
        req.body.product._id
      ).populate('seller', '_id userName');
      res.send(updatedProduct);
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

productRouter.post(
  '/addquestion',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.productId);
    if (product) {
      var today = new Date();
      await product.questions.unshift({
        ...req.body.question,
        questionDate: today,
      });
      await product.save();
      const updatedProduct = await Product.findById(
        req.body.productId
      ).populate('seller', '_id userName');
      res.send(updatedProduct);
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

productRouter.post(
  '/answerquestion',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.body.productId).populate(
      'seller',
      '_id'
    );
    if (product) {
      if (product.seller._id.toString() === req.user._id.toString()) {
        if (
          product.questions.find(
            (question) =>
              question._id.toString() === req.body.question._id.toString()
          )
        ) {
          const questionIndex = product.questions.indexOf(
            product.questions.find(
              (question) =>
                question._id.toString() === req.body.question._id.toString()
            )
          );
          var today = new Date();
          product.questions[questionIndex] = {
            _id: product.questions[questionIndex]._id,
            whoAsked: product.questions[questionIndex].whoAsked,
            question: product.questions[questionIndex].question,
            answer: req.body.question.answer,
            answerDate: today,
          };
        } else {
          res.status(404).send({ message: 'Pregunta no encontrada' });
        }
        await product.save();
        const updatedProduct = await Product.findById(
          req.body.productId
        ).populate('seller', '_id userName');
        res.send(updatedProduct);
      } else {
        res.status(401).send({ message: 'Usuario no autorizado' });
      }
    } else {
      res.status(404).send({ message: 'Producto no encontrado' });
    }
  })
);

productRouter.get(
  '/getuserquestionsproducts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({
      questions: {
        $elemMatch: { whoAsked: req.user._id },
      },
    }).populate('seller', '_id userName');
    if (products) {
      res.send(products);
    } else {
      res.status(404).send({ message: 'Preguntas no encontrado' });
    }
  })
);

productRouter.post(
  '/stockupdate',
  expressAsyncHandler(async (req, res) => {
    if (process.env.REACT_APP_UPDATE_STOCK_CODE === req.body.code) {
      const updatedProducts = [];
      req.body.products.forEach(async (bodyProduct) => {
        const product = await Product.findById(bodyProduct._id);
        await product.updateOne({
          stock: product.stock - bodyProduct.quantityToSubstract,
        });
        if (product.stock === 0) {
          await product.updateOne({
            active: false,
          });
        }
        await product.save();
        const updatedProduct = await Product.findById(bodyProduct._id);
        updatedProducts.push(updatedProduct);
      });
      res.send(updatedProducts);
    } else {
      res.status(401).send({ message: 'No tiene autorización' });
    }
  })
);

productRouter.get(
  '/getuserpublishedproducts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find(
      { seller: req.user._id },
      { _id: 1, name: 1, cover: 1, active: 1, price: 1, stock: 1 }
    );
    if (products) res.send(products);
    else
      res
        .status(404)
        .send({ mesage: 'No se encontraron productos del usuario' });
  })
);

productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const productDetails = await Product.findById(req.params.id)
      .populate('category')
      .populate('seller', '_id userName');
    if (productDetails) res.send(productDetails);
    else res.status(404).send({ message: 'Producto no encontrado' });
  })
);

export default productRouter;
