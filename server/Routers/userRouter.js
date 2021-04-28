import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import ObjectID from 'mongodb';
import { generateRandomNumber, generateToken, isAuth } from '../utils.js';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/checkname',
  expressAsyncHandler(async (req, res) => {
    let user = await User.findOne({ email: req.body.loginInfo });
    if (user) {
      res.send({
        _id: user._id,
        email: user.email,
      });
    }
    if (!user) {
      user = await User.findOne({ userName: req.body.loginInfo });
      if (user) {
        res.send({
          _id: user._id,
          userName: user.userName,
          email: user.email,
        });
      }
    }
    if (!user) {
      user = await User.findOne({ telephone: req.body.loginInfo });
      if (user) {
        res.send({
          _id: user._id,
          telephone: user.telephone,
          email: user.email,
        });
      }
    }
    if (!user) {
      res.status(404).send({ message: 'Revisá tus datos' });
    }
  })
);

userRouter.post(
  '/login',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id).populate(
      'userData.favorites'
    );
    if (user) {
      if (
        req.body.password
          ? bcrypt.compareSync(req.body.password, user.password)
          : req.body.baseCode === process.env.USER_ADMIN_PASSWORD
      ) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          userData: user.userData,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        res.status(401).send({ message: 'Clave incorrecta' });
      }
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/loginwithcode',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.userId).populate(
      'userData.favorites'
    );
    if (user) {
      if (req.body.code === process.env.REACT_APP_CHANGE_PSW_CODE) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          userData: user.userData,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      } else {
        res.status(401).send({
          message: 'Ocurrio un problema con el codigo de inicio de sesion',
        });
      }
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/updatefavs',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      const exists = user.userData.favorites.find(
        (fav) => fav._id.toString() === req.body.updateFav._id
      );
      if (exists && !req.body.updateFav.noDelete) {
        user.userData.favorites = user.userData.favorites.filter(
          (fav) => fav._id.toString() !== req.body.updateFav._id
        );
      } else if (!exists) {
        user.userData.favorites.push(req.body.updateFav._id);
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);
userRouter.post(
  '/updateProductDrafts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      const updatingDraft = user.productDrafts.find(
        (productDraft) => productDraft._id.toString() === req.body.draft._id
      );
      if (updatingDraft) {
        user.productDrafts[user.productDrafts.indexOf(updatingDraft)] =
          req.body.draft;
      } else {
        if (req.body.draft._id === null) delete req.body.draft._id;
        user.productDrafts.push(req.body.draft);
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        productDrafts: updatedUser.productDrafts,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/deleteProductDrafts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (
      user &&
      user.productDrafts.find(
        (draft) => draft._id.toString() === req.body.draftId
      )
    ) {
      user.productDrafts.splice(
        user.productDrafts.indexOf(req.body.draftId),
        1
      );
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario o draft no encontrado' });
    }
  })
);

userRouter.post(
  '/addProducts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      user.products.push({ productId: req.body.productId });
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/deleteProducts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (
      user &&
      user.products.find(
        (product) => product.productId.toString() === req.body.productId
      )
    ) {
      user.productDrafts.splice(
        user.productDrafts.indexOf(req.body.productId),
        1
      );
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario o draft no encontrado' });
    }
  })
);

userRouter.post(
  '/updateAddresses',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      const updatingAddress = user.addresses.find(
        (address) => address._id.toString() === req.body.address._id
      );
      if (updatingAddress) {
        user.addresses[user.addresses.indexOf(updatingAddress)] =
          req.body.address;
      } else {
        if (req.body.address._id === null) {
          delete req.body.address._id;
        }
        user.addresses.push(req.body.address);
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/deleteAddresses',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      user.addresses.splice(
        user.addresses.findIndex(
          (address) => address._id === req.body.addressId
        ),
        1
      );
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/verifyemailexists',
  expressAsyncHandler(async (req, res) => {
    const emailTest = await User.findOne({ email: req.body.email });
    if (emailTest)
      res.send({
        _id: emailTest._id,
        email: emailTest.email,
        exists: true,
      });
    else
      res.send({
        email: req.body.email,
        exists: false,
      });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    let userName = req.body.name + req.body.surname;
    let userNameTest = userName;
    let exists = true;
    let i = 0;
    while (exists) {
      const userTest = await User.findOne({ userName: userNameTest });
      if (userTest) {
        userNameTest = userName + i;
        i++;
      } else {
        userName = userNameTest;
        exists = false;
      }
    }
    const user = new User({
      userName: userName,
      name: req.body.name,
      surname: req.body.surname,
      dni: req.body.dni,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const newUser = await user.save();
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      userData: newUser.userData,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser),
    });
  })
);

userRouter.post(
  '/updateuser',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id).populate(
      'userData.favorites'
    );
    if (user) {
      if (req.body.updatePassword) {
        await user.updateOne({
          password: bcrypt.hashSync(req.body.user.password, 8),
        });
      } else {
        await user.updateOne({ ...req.body.user });
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id).populate(
        'userData.favorites'
      );
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.body.user.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) res.send({ ...user._doc, password: null });
    else res.status(404).send({ mesage: 'User not found' });
  })
);

export default userRouter;
