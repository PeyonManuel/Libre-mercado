import React, { useEffect, useState } from 'react';
import LoadingCircle from './LoadingCircle';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { newOrders } from '../Actions/orderActions';
import MessageBox from './MessageBox';
import {
  cartRemoveMultiple,
  pushNotificationUser,
} from '../Actions/userActions';
import { updateProductsStock } from '../Actions/productActions';

const CheckoutSideBar = ({
  totalPackages,
  totalProducts,
  totalPrice,
  buying,
}) => {
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    loading: loadingCreatingOrder,
    error: errorCreatingOrder,
    success: successCreatingOrder,
  } = orderCreate;
  const productsUpdateStock = useSelector((state) => state.productsUpdateStock);
  const {
    loading: loadingUpdateStock,
    error: errorUpdatingStock,
    success: successUpdatingStock,
  } = productsUpdateStock;
  const [sdkReady, setSdkReady] = useState(false);
  const [checkoutError, setCheckoutError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 85 && !document.querySelector('#paypal-btns')) {
        document.querySelector('#fixed') &&
          document.querySelector('#fixed').classList.add('fixed');
      } else {
        document.querySelector('#fixed') &&
          document.querySelector('#fixed').classList.remove('fixed');
      }
    };
    document.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!window.paypal) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${
        process.env.REACT_APP_PAYPAL_CLIENT_ID || 'sb'
      }`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (errorCreatingOrder) {
      const checkout = localStorage.getItem('localCheckout')
        ? JSON.parse(localStorage.getItem('localCheckout'))
        : null;
      if (checkout) {
        checkout.products.forEach((product) => {
          pushNotificationUser(product.seller._id, {
            text:
              'Ha ocurrido un error con una order, es posible que el stock de uno de tus productos haya cambiado',
            linkTo: '/product/' + product._id,
          });
        });
      } else {
        setCheckoutError(true);
      }
    }
  }, [errorCreatingOrder]);

  useEffect(() => {
    if (successUpdatingStock) {
      const checkout = localStorage.getItem('localCheckout')
        ? JSON.parse(localStorage.getItem('localCheckout'))
        : null;
      if (checkout) {
        const orders = [];
        checkout.packages.forEach((pckg, i) => {
          orders.push({
            orderItems: [],
            shippingAddress: checkout.address._id,
          });
          let itemsPriceAcumulator = 0;
          console.log('Checking out');
          pckg.products.forEach((product) => {
            itemsPriceAcumulator += product.price * product.quantity;
            orders[i].orderItems.push({
              name: product.name,
              image: product.image,
              quantity: product.quantity,
              price: product.price,
              product: product._id,
            });
          });
          orders[i].itemsPrice = itemsPriceAcumulator;
          orders[i].shippingPrice = 300;
          orders[i].totalPrice = itemsPriceAcumulator + 300;
          orders[i].seller = pckg.seller;
        });
        dispatch(newOrders(orders));
      } else {
        setCheckoutError(true);
      }
    }
  }, [successUpdatingStock, dispatch]);

  useEffect(() => {
    if (successCreatingOrder) {
      dispatch({ type: 'CREATE_ORDER_RESET' });
      dispatch({ type: 'PRODUCT_UPDATE_STOCK_RESET' });
      window.location.href = '/mis-compras';
    }
  }, [successCreatingOrder, dispatch]);

  const handleSuccessPayment = () => {
    const checkout = localStorage.getItem('localCheckout')
      ? JSON.parse(localStorage.getItem('localCheckout'))
      : null;
    if (checkout) {
      const productsBought = [];
      checkout.products.forEach((product) =>
        productsBought.push({
          _id: product._id,
          quantityToSubstract: product.quantity,
        })
      );
      dispatch(
        cartRemoveMultiple(productsBought.map((product) => product._id))
      );
      dispatch(updateProductsStock(productsBought));
    } else {
      setCheckoutError(true);
    }
  };
  return (
    <div className='checkout-sidebar'>
      <div id='fixed'>
        <h2>Resumen de compra</h2>
        <div className='width-100 separator'>
          <div className='checkout-details'>
            {' '}
            <p>
              {(totalProducts === 1 ? 'Producto ' : 'Productos ') +
                '(' +
                totalProducts +
                ')'}
            </p>
            <p>{'$ ' + totalPrice}</p>
          </div>
          <div className='checkout-details'>
            <p>Envío</p>
            <p>{'$ ' + totalPackages * 300}</p>
          </div>
          <div className='checkout-total separator'>
            <p>Total</p>
            <p>{'$ ' + (totalPrice + totalPackages * 300)}</p>
          </div>
        </div>
        {buying &&
          (!sdkReady || loadingCreatingOrder || loadingUpdateStock ? (
            <LoadingCircle color='blue' />
          ) : errorCreatingOrder || errorUpdatingStock ? (
            <MessageBox variant='danger'>
              Ha ocurrido un error con la orden
            </MessageBox>
          ) : (
            <div id='paypal-btns'>
              <PayPalButton
                amount={Math.ceil(totalPrice / 110)}
                onSuccess={handleSuccessPayment}
              />
            </div>
          ))}
        {checkoutError && (
          <MessageBox variant='danger'>
            Ha ocurrido un error, por favor vuelve a empezar tu compra
          </MessageBox>
        )}
      </div>
    </div>
  );
};

export default CheckoutSideBar;
