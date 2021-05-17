import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../Models/userModel.js';
import bcrypt from 'bcryptjs';
import data from '../data.js';
import { generateToken, isAuth } from '../utils.js';

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
    const user = await User.findById(req.body._id);
    if (user) {
      if (
        req.body.password
          ? bcrypt.compareSync(req.body.password, user.password)
          : req.body.baseCode === process.env.USER_ADMIN_PASSWORD
      ) {
        res.send({
          _id: user._id,
          name: user.name,
          userName: user.userName,
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
  '/authenticate',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body._id);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({ success: true });
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
    const user = await User.findById(req.body.userId);
    if (user) {
      if (req.body.code === process.env.REACT_APP_CHANGE_PSW_CODE) {
        res.send({
          _id: user._id,
          name: user.name,
          userName: user.userName,
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
    const user = await User.findById(req.body.user._id);
    if (user) {
      const exists = user.userData.favorites.find(
        (fav) => fav.toString() === req.body.updateFav._id
      );
      if (exists && !req.body.updateFav.noDelete) {
        user.userData.favorites = user.userData.favorites.filter(
          (fav) => fav.toString() !== req.body.updateFav._id
        );
      } else if (!exists) {
        user.userData.favorites.push(req.body.updateFav._id);
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
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
    const user = await User.findById(req.body.user._id);
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
      const updatedUser = await User.findById(req.body.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
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
    const user = await User.findById(req.body.user._id);
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
      const updatedUser = await User.findById(req.body.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
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
    const user = await User.findById(req.body.user._id);
    if (user) {
      if (req.body.product.seller.toString() === user._id.toString()) {
        user.products.push(req.body.product._id);
        await user.save();
        const updatedUser = await User.findById(req.body.user._id);
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          userName: updatedUser.userName,
          email: updatedUser.email,
          userData: updatedUser.userData,
          isAdmin: updatedUser.isAdmin,
          token: req.body.user.token,
        });
      } else {
        res.status(404).send({ message: 'El producto no es de el usuario' });
      }
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/deleteProducts',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.body.user._id);
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
      const updatedUser = await User.findById(req.body.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
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
      userName: newUser.userName,
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
    const user = await User.findById(req.body.user._id);
    if (user) {
      if (req.body.updatePassword) {
        await user.updateOne({
          password: bcrypt.hashSync(req.body.user.password, 8),
        });
      } else {
        await user.updateOne({ ...req.body.user });
      }
      await user.save();
      const updatedUser = await User.findById(req.body.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/updatehistory',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      switch (req.body.typeOfUpdate) {
        case 'add':
          user.history.unshift(req.body.productId);
          if (user.history.length > 5000) {
            user.history.pop();
          }
          break;
        case 'remove':
          user.history = user.history.filter(
            (historyItem) => historyItem.toString() !== req.body.productId
          );
          break;
        case 'readd':
          user.history = user.history.filter(
            (historyItem) =>
              historyItem.toString() !== req.body.productId.toString()
          );
          user.history.unshift(req.body.productId);
          break;
        default:
          res
            .status(422)
            .send({ message: 'No se especifico el tipo de actualización' });
          break;
      }
      await user.save();
      const updatedUser = await User.findById(req.user._id);
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        userName: updatedUser.userName,
        email: updatedUser.email,
        userData: updatedUser.userData,
        isAdmin: updatedUser.isAdmin,
        token: req.token,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.post(
  '/removehistory',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.history = [];
      await user.save();
      const updatedUser = await User.findById(req.user._id);
      res.send({
        history: updatedUser.history,
      });
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.get(
  '/gethistorydetails',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('history');
    if (user) res.send(user.history);
    else res.status(404).send({ mesage: 'User not found' });
  })
);

userRouter.post(
  '/updatecart',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      const existent = user.cart.find(
        (item) => item.product.toString() === req.body.item.product.toString()
      );
      switch (req.body.typeOfUpdate) {
        case 'add':
          if (req.body.item.quantity > 0) {
            if (existent) {
              user.cart = user.cart.map((cartItem) =>
                cartItem.product.toString() === req.body.item.product.toString()
                  ? {
                      product: req.body.item.product,
                      quantity: existent.quantity + req.body.item.quantity,
                    }
                  : cartItem
              );
            }
          } else {
            res
              .status(422)
              .send({ message: 'La cantidad debe ser mayor a cero' });
          }
          if (!existent) {
            user.cart.unshift(req.body.item);
          }
          break;
        case 'update':
          if (existent) {
            user.cart[user.cart.indexOf(existent)] = req.body.item;
          } else {
            res
              .status(404)
              .send({ message: 'Articulo del carrito no encontrado' });
          }
          break;
        case 'changesave':
          if (existent) {
            user.cart[user.cart.indexOf(existent)] = {
              product: existent.product,
              quantity: existent.quantity,
              saved: !existent.saved,
            };
          }
          break;
        case 'remove':
          user.cart = user.cart.filter(
            (cartItem) =>
              cartItem.product.toString() !== req.body.item.product.toString()
          );
          break;
        default:
          res
            .status(422)
            .send({ message: 'No se especifico el tipo de actualización' });
          break;
      }
      await user.save();
      const updatedUser = await User.findById(req.user._id).populate(
        'cart.product'
      );
      const updatedItem = updatedUser.cart.find(
        (item) =>
          item.product._id.toString() === req.body.item.product.toString()
      );
      res.send(updatedItem);
    } else {
      res.status(404).send({ message: 'Usuario no encontrado' });
    }
  })
);

userRouter.get(
  '/getcartdetails',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('cart.product');
    if (user) res.send(user.cart);
    else res.status(404).send({ message: 'Usuario no encontrado' });
  })
);

userRouter.post(
  '/cartremovemultiple',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      req.body.productsIds.forEach((id) => {
        const itemToDelete = user.cart.find(
          (cartItem) => cartItem.product.toString() === id.toString()
        );
        itemToDelete && user.cart.splice(user.cart.indexOf(itemToDelete), 1);
      });
      const newUser = await user.save();
      res.send({ message: 'Carrito limpiado' });
    } else res.status(404).send({ message: 'Usuario no encontrado' });
  })
);

userRouter.post(
  '/pushnotification',
  expressAsyncHandler(async (req, res) => {
    if (req.body.code === process.env.REACT_APP_NOTIFICATION_CODE) {
      const user = await User.findById(req.body.userId);
      if (user) {
        user.notifications = user.userData.notifications.unshift(
          req.body.notification
        );
        await user.save();
        const updatedUser = await User.findById(req.body.userId);
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          userName: updatedUser.userName,
          email: updatedUser.email,
          userData: updatedUser.userData,
          isAdmin: updatedUser.isAdmin,
          token: req.token,
        });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } else {
      res.status(401).send({ message: 'No tiene autorizacion' });
    }
  })
);

userRouter.post(
  '/deletenotification',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      if (
        user.userData.notifications.find(
          (notification) =>
            notification._id.toString() === req.body.notificationId.toString()
        )
      ) {
        user.userData.notifications = user.userData.notifications.filter(
          (notification) =>
            notification._id.toString() !== req.body.notificationId.toString()
        );
        await user.save();
        const updatedUser = await User.findById(req.user._id);
        res.send({
          _id: updatedUser._id,
          name: updatedUser.name,
          userName: updatedUser.userName,
          email: updatedUser.email,
          userData: updatedUser.userData,
          isAdmin: updatedUser.isAdmin,
          token: req.token,
        });
      } else {
        res.status(404).send({ message: 'Notificación no encontrada' });
      }
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
