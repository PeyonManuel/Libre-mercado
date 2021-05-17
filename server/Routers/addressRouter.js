import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Address from '../Models/addressModel.js';
import { isAuth } from '../utils.js';

const addressRouter = express.Router();

addressRouter.post(
  '/newaddress',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const address = new Address({
      ...req.body.address,
      user: req.user._id,
    });
    const newAddress = await address.save();
    res.send(newAddress);
  })
);

addressRouter.post(
  '/updateaddress',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const address = await Address.findById(req.body.address._id);
    if (address) {
      if (address.user.toString() === req.user._id.toString()) {
        if (req.body.address.lastUsed === true) {
          const notLastUsed = await Address.findOne({ lastUsed: true });
          if (notLastUsed) {
            await notLastUsed.updateOne({ lastUsed: false });
          }
        }
        await address.updateOne({ address, ...req.body.address });
        const updatedAddress = await address.save();
        res.send(updatedAddress);
      } else {
        res.status(404).send({ message: 'Dirección no pertenece al usuario' });
      }
    } else {
      res.status(404).send({ message: 'Dirección no encontrada' });
    }
  })
);
addressRouter.get(
  '/getuseraddresses',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const addresses = await Address.find({ user: req.user._id });
    if (addresses) {
      res.send(addresses);
    } else {
      res.status(404).send({ message: 'Ninguna dirección encontrada' });
    }
  })
);
addressRouter.post(
  '/deleteaddress',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const address = await Address.findById(req.body.addressId);
    if (address) {
      if (address.user.toString() === req.user._id.toString()) {
        await address.delete();
        res.send(req.body.addressId);
      } else {
        res.status(401).send({ message: 'Dirección no pertenece al usuario' });
      }
    } else {
      res.status(404).send({ message: 'Dirección no encontrada' });
    }
  })
);

export default addressRouter;
