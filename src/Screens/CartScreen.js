import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartDetails } from '../Actions/userActions';
import CartItem from '../Components/CartItem';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';

const CartScreen = () => {
  const dispatch = useDispatch();
  const userCart = useSelector((state) => state.userCart);
  const { loading: loadingCart, error: cartError, cart } = userCart;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const cartUpdate = useSelector((state) => state.cartUpdate);
  const {
    error: cartUpdateError,
    loading: loadingUpdateCart,
    item,
  } = cartUpdate;

  const [localCart, setLocalCart] = useState([]);
  const [localSaved, setLocalSaved] = useState([]);
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [savedTotalQuantity, setSavedTotalQuantity] = useState(0);
  const [cartSelected, setCartSelected] = useState('cart');

  useEffect(() => {
    user && !cart && dispatch(getCartDetails());
  }, [user, dispatch, cart]);

  useEffect(() => {
    const replaceInCart = (cartItem) => {
      const toBeReplaced = localCart.find(
        (item) =>
          item.product._id.toString() === cartItem.product._id.toString()
      );
      setLocalCart((localCart) => [
        ...localCart.slice(0, localCart.indexOf(toBeReplaced)),
        cartItem,
        ...localCart.slice(localCart.indexOf(toBeReplaced) + 1),
      ]);
    };

    const replaceInSaved = (cartItem) => {
      const toBeReplaced = localSaved.find(
        (item) =>
          item.product._id.toString() === cartItem.product._id.toString()
      );
      setLocalSaved((localSaved) => [
        ...localSaved.slice(0, localSaved.indexOf(toBeReplaced)),
        cartItem,
        ...localSaved.slice(localSaved.indexOf(toBeReplaced) + 1),
      ]);
    };
    if (item) {
      if (item.saved) {
        replaceInSaved(item);
      }
      if (!item.saved) {
        replaceInCart(item);
      }
      dispatch({ type: 'USER_CART_UPDATE_RESET' });
    }
    // eslint-disable-next-line
  }, [item, dispatch]);
  useEffect(() => {
    if (cart) {
      const onlyCartArray = [];
      const onlySavedArray = [];
      cart.forEach((item) => {
        if (item.saved) {
          onlySavedArray.push(item);
        }
        if (!item.saved) {
          onlyCartArray.push(item);
        }
      });
      setLocalCart(onlyCartArray);
      setLocalSaved(onlySavedArray);
    }
  }, [cart]);

  useEffect(() => {
    let cartTotalQuantityAcumulator = 0;
    localCart.forEach(
      (cartItem) => (cartTotalQuantityAcumulator += cartItem.quantity)
    );
    setCartTotalQuantity(cartTotalQuantityAcumulator);
  }, [localCart]);

  useEffect(() => {
    let savedTotalQuantityAcumulator = 0;
    localSaved.forEach(
      (cartItem) => (savedTotalQuantityAcumulator += cartItem.quantity)
    );
    setSavedTotalQuantity(savedTotalQuantityAcumulator);
  }, [localSaved]);

  return (
    <div className='width-100 flex-center'>
      {loadingCart ? (
        <LoadingCircle color='blue' />
      ) : (
        <div className='screen cart-screen'>
          {cartError || cartUpdateError ? (
            <MessageBox variant='danger'>
              Ha ocurrido un error, prueba recargando el sitio
            </MessageBox>
          ) : (
            loadingUpdateCart && (
              <div className='absolute-loading'>
                <LoadingCircle color='blue' />
              </div>
            )
          )}
          <div className='type-of-cart-btns'>
            <button
              className={cartSelected === 'cart' ? 'selected' : ''}
              onClick={() => {
                setCartSelected('cart');
              }}
            >
              {'Carrito (' + cartTotalQuantity + ')'}
            </button>
            <button
              className={cartSelected === 'saved' ? 'selected' : ''}
              onClick={() => {
                setCartSelected('saved');
              }}
            >
              {'Guardados (' + savedTotalQuantity + ')'}
            </button>
          </div>
          <div className='cart-items relative'>
            {cartSelected === 'cart' ? (
              localCart.length > 0 ? (
                localCart.map((item, i) => (
                  <CartItem
                    cartItem={item}
                    i={i}
                    setLocalSaved={setLocalSaved}
                    setLocalCart={setLocalCart}
                    localCart={localCart}
                    localSaved={localSaved}
                  />
                ))
              ) : (
                <div className='width-100 flex-center column margin-top'>
                  <h2 className='gray'>Tu carrito está vacío</h2>
                  <p>¿No sabés qué comprar? ¡Miles de productos te esperan!</p>
                </div>
              )
            ) : localSaved.length > 0 ? (
              localSaved.map((item, i) => (
                <CartItem
                  cartItem={item}
                  i={i}
                  setLocalSaved={setLocalSaved}
                  setLocalCart={setLocalCart}
                  localCart={localCart}
                  localSaved={localSaved}
                />
              ))
            ) : (
              <div className='width-100 flex-center column margin-top'>
                <h2 className='gray'>No tenés productos guardados</h2>
                <p>
                  Si aún no estás decidido en comprar algún producto de tu
                  carrito, podés dejarlo aquí.
                </p>
              </div>
            )}
          </div>
          {cartSelected === 'cart' && localCart.length > 0 && (
            <button
              className='primary'
              onClick={() => {
                window.location.href = '/checkout/shipping';
                localStorage.setItem(
                  'localCheckout',
                  JSON.stringify({
                    products: localCart.map((cartItem) => {
                      return {
                        _id: cartItem.product._id,
                        seller: cartItem.product.seller,
                        price: cartItem.product.price,
                        quantity: cartItem.quantity,
                      };
                    }),
                    editingAddress: false,
                  })
                );
              }}
            >
              Continuar compra
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CartScreen;
