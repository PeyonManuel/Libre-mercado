import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCart } from '../Actions/userActions';
import { formatNumber } from '../Utils/Utilities';

const CartItem = ({
  i,
  cartItem,
  setLocalCart,
  setLocalSaved,
  localSaved,
  localCart,
}) => {
  const dispatch = useDispatch();
  const [hasStock, setHasStock] = useState(
    cartItem.quantity <= cartItem.product.stock
  );
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [updateTimeout, setUpdateTimeout] = useState(null);
  const [disableOtherBtn, setDisableOtherBtns] = useState(false);

  useEffect(() => {
    setQuantity(cartItem.quantity);
  }, [cartItem]);
  useEffect(() => {
    setHasStock(quantity <= cartItem.product.stock);
  }, [quantity, cartItem]);

  const removeFromSaved = (cartItem) => {
    setLocalSaved([
      ...localSaved.slice(0, localSaved.indexOf(cartItem)),
      ...localSaved.slice(localSaved.indexOf(cartItem) + 1),
    ]);
  };
  const removeFromCart = (cartItem) => {
    setLocalCart([
      ...localCart.slice(0, localCart.indexOf(cartItem)),
      ...localCart.slice(localCart.indexOf(cartItem) + 1),
    ]);
  };
  const resetTimer = (updateQuantity) => {
    clearTimeout(updateTimeout);
    setDisableOtherBtns(true);
    setUpdateTimeout(
      setTimeout(() => {
        dispatch(
          updateCart(
            {
              product: cartItem.product._id,
              saved: cartItem.saved,
              quantity: updateQuantity,
            },
            'update'
          )
        );
        setDisableOtherBtns(false);
      }, 500)
    );
  };

  return (
    <div className={'cart-item' + (i === 0 ? ' first' : '')} key={i}>
      <div className='cart-item-details'>
        <div className='list-img-div'>
          <img src={cartItem.product.images[0]} alt='Producto' />
        </div>
        <div className='column'>
          <p className='cart-item-name'>{cartItem.product.name}</p>
          <div className='cart-item-buttons'>
            <button
              className='anchor-lookalike'
              onClick={() => {
                if (!disableOtherBtn) {
                  dispatch(
                    updateCart(
                      {
                        product: cartItem.product._id,
                      },
                      'remove'
                    )
                  );
                  cartItem.saved
                    ? removeFromSaved(cartItem)
                    : removeFromCart(cartItem);
                }
              }}
            >
              Eliminar
            </button>
            <button
              disabled={!hasStock}
              className='anchor-lookalike'
              onClick={() => {
                if (!disableOtherBtn) {
                  if (cartItem.product.active && !cartItem.product.Finished) {
                    window.location.href = '/checkout/shipping';
                    localStorage.setItem(
                      'localCheckout',
                      JSON.stringify({
                        products: [
                          {
                            _id: cartItem.product._id,
                            seller: cartItem.product.seller,
                            price: cartItem.product.price,
                            quantity: cartItem.quantity,
                          },
                        ],
                        editingAddress: false,
                      })
                    );
                  }
                  if (!cartItem.product.active || cartItem.product.Finished) {
                    window.location.href = '/product' + cartItem.product._id;
                  }
                }
              }}
            >
              Comprar ahora
            </button>
            <button
              className='anchor-lookalike'
              onClick={() => {
                if (!disableOtherBtn) {
                  dispatch(
                    updateCart(
                      {
                        product: cartItem.product._id,
                      },
                      'changesave'
                    )
                  );
                  if (cartItem.saved) {
                    removeFromSaved(cartItem);
                  }
                  if (!cartItem.saved) {
                    removeFromCart(cartItem);
                  }
                }
              }}
            >
              {cartItem.saved ? 'Agregar al carrito' : 'Guardar para después'}
            </button>
          </div>
        </div>
      </div>
      <div className='column flex-center'>
        <div className='cart-quantity-changer'>
          <button
            disabled={quantity === 1}
            onClick={() => {
              if (hasStock) {
                resetTimer(quantity - 1);
                setQuantity(quantity - 1);
              }
            }}
          >
            -
          </button>
          {quantity && (
            <input
              id={'quantity-input-' + i}
              type='number'
              min='1'
              value={quantity}
              onChange={(e) => {
                if (e.target.value <= cartItem.product.stock) {
                  resetTimer(e.target.value);
                }
                setQuantity(e.target.value);
              }}
            />
          )}
          <button
            disabled={quantity + 1 > cartItem.product.stock}
            onClick={() => {
              if (hasStock) {
                resetTimer(quantity + 1);
                setQuantity(quantity + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <p className={'subtle-text' + (!hasStock ? ' red' : '')}>
          {hasStock
            ? cartItem.product.stock + ' disponibles'
            : 'No hay stock disponible'}
        </p>
      </div>
      <h2>{'$ ' + formatNumber(cartItem.quantity * cartItem.product.price)}</h2>
    </div>
  );
};

export default CartItem;
