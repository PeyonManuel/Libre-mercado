import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../Actions/orderActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import SubmitRating from '../Components/SubmitRating';
import { desktopScreenCondition } from '../Utils/Utilities';

const UserOrdersScreen = () => {
  const dispatch = useDispatch();
  const userOrders = useSelector((state) => state.userOrders);
  const { loading, error, orders } = userOrders;
  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    orders && setLocalOrders(orders.reverse());
  }, [orders]);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);
  return (
    <div className='width-100 flex-center'>
      {loading ? (
        <LoadingCircle color='blue' />
      ) : error ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        orders &&
        (orders.length > 0 ? (
          <div className='user-order-screen screen'>
            <h1>Compras</h1>
            {localOrders.map((order, i) => {
              const months = [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
              ];
              const currentDate = new Date();
              const deliveredAtDate = order.isDelivered
                ? order.deliveredAt.split('T')[0]
                : null;
              const deliveredAtDateSplitted = deliveredAtDate
                ? deliveredAtDate.split('-')
                : null;
              const deliveredAtFormated = deliveredAtDate
                ? parseInt(deliveredAtDateSplitted[2]) +
                  ' de ' +
                  months[parseInt(deliveredAtDateSplitted[1])] +
                  (currentDate.split('T')[0] === deliveredAtDate
                    ? ' del ' + deliveredAtDateSplitted[0]
                    : '')
                : null;
              return (
                <div className='screen-mini-card medium' key={i}>
                  <div className='screen-mini-card-header'>
                    <h4>
                      {order.isDelivered
                        ? 'Entregado el ' + deliveredAtFormated
                        : 'En camino'}
                    </h4>
                  </div>
                  <div className='screen-mini-card-body column'>
                    {order.orderItems.map((orderItem, j) => {
                      const findUserReview = orderItem.product
                        ? orderItem.product.reviews.find(
                            (review) =>
                              review.user.toString() === order.user.toString()
                          )
                        : null;
                      const userRating = findUserReview
                        ? findUserReview.rating
                        : 0;
                      return (
                        <div className='order-item' key={j}>
                          <div className='row'>
                            <div className='list-img-div'>
                              <img src={orderItem.image} alt='Producto' />
                            </div>
                            <div className='column user-order-info'>
                              <a
                                href={
                                  orderItem.product
                                    ? '/product/' + orderItem.product._id
                                    : '#'
                                }
                                className={orderItem.product ? '' : 'disabled'}
                              >
                                {orderItem.name}
                              </a>
                              <span className='subtle-text'>
                                {'$ ' +
                                  orderItem.price * orderItem.quantity +
                                  ' x ' +
                                  orderItem.quantity +
                                  (orderItem.quantity > 1
                                    ? ' unidades'
                                    : ' unidad')}
                              </span>
                            </div>
                          </div>
                          <div className='row'>
                            <div
                              className={
                                desktopScreenCondition ? 'margin-right' : ''
                              }
                            >
                              {orderItem.product ? (
                                <SubmitRating
                                  product={{
                                    _id: orderItem.product._id,
                                    reviews: orderItem.product.reviews,
                                  }}
                                  userId={order.user}
                                  userRating={userRating}
                                />
                              ) : (
                                <h5>Publicación finalizada</h5>
                              )}
                            </div>
                            <div className='column'>
                              <span className='bold'>Vendedor</span>
                              <span>
                                {order.seller.name + ' ' + order.seller.surname}
                              </span>
                            </div>
                            <button
                              className={
                                'primary' +
                                (desktopScreenCondition
                                  ? ' margin-left'
                                  : ' block margin-top')
                              }
                              onClick={() =>
                                (window.location.href =
                                  '/product/' + orderItem._id)
                              }
                            >
                              Volver a comprar
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='margin-top width-100 flex-center column'>
            <h1>No tienes compras aún</h1>
            <p>¡Empeza a comprar productos!</p>
          </div>
        ))
      )}
    </div>
  );
};

export default UserOrdersScreen;
