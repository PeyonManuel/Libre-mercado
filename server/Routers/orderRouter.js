import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../Models/categoryModel.js';
import Order from '../Models/orderModel.js';
import { isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
  '/neworders',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = [];
    for (let i = 0; i < req.body.orders.length; i++) {
      if (req.body.orders[i].orderItems.length === 0) {
        res.status(400).send({ message: 'Una de las ordenes estaba vacia' });
      }
      const order = new Order({
        orderItems: req.body.orders[i].orderItems,
        shippingAddress: req.body.orders[i].shippingAddress,
        itemsPrice: req.body.orders[i].itemsPrice,
        shippingPrice: req.body.orders[i].shippingPrice,
        totalPrice: req.body.orders[i].totalPrice,
        seller: req.body.orders[i].seller,
        user: req.user,
      });
      const newOrder = await order.save();
      orders.push(newOrder);
    }
    res.send(orders);
  })
);

orderRouter.get(
  '/getuserorders',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
      .populate('seller', 'name surname')
      .populate('orderItems.product', '_id reviews');
    if (orders) {
      res.send(orders);
    }
    if (!orders) {
      res.status(404).send({
        message: 'No se encontro ninguna compra hecha por el usuario',
      });
    }
  })
);

orderRouter.get(
  '/getusersells',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ seller: req.user._id }).populate(
      'user',
      'name surname'
    );
    if (orders) {
      res.send(orders);
    }
    if (!orders) {
      res.status(404).send({
        message: 'No se encontro ninguna compra hecha por el usuario',
      });
    }
  })
);

export default orderRouter;
