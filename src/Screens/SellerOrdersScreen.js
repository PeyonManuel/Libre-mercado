import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSells } from '../Actions/orderActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import { desktopScreenCondition } from '../Utils/Utilities';

const SellerOrdersScreen = () => {
  const dispatch = useDispatch();
  const userSells = useSelector((state) => state.userSells);
  const { loading, error, orders } = userSells;
  const [localSells, setLocalSells] = useState([]);

  useEffect(() => {
    orders && setLocalSells(orders.reverse());
  }, [orders]);

  useEffect(() => {
    dispatch(getUserSells());
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
            <h1>Ventas</h1>
            {localSells.map((order, i) => {
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
                    {order.orderItems.map((orderItem, j) => (
                      <div className='order-item' key={j}>
                        <div className='row'>
                          <div className='list-img-div'>
                            <img src={orderItem.image} alt='Producto' />
                          </div>
                          <div className='column user-order-info'>
                            <a href={'/product/' + orderItem.product}>
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
                        <div
                          className={
                            desktopScreenCondition ? 'column' : 'row margin-top'
                          }
                        >
                          <span className='bold'>Comprador</span>
                          <span>
                            {order.user.name + ' ' + order.user.surname}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className='width-100 flex-center column'>
            <h1>No tienes ventas aún</h1>
            <p>¡Empeza a vender productos!</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SellerOrdersScreen;
