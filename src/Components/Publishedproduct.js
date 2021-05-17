import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProduct } from '../Actions/productActions';
import LoadingCircle from './LoadingCircle';
import MessageBox from './MessageBox';

const Publishedproduct = ({
  product,
  localProducts,
  setLocalProducts,
  orders,
}) => {
  const dispatch = useDispatch();
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: updateError,
    product: updatedProduct,
  } = productUpdate;
  const [openOptions, setOpenOptions] = useState(false);
  const [productSales, setProductSales] = useState(0);

  useEffect(() => {
    let salesCounter = 0;
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (item.product.toString() === product._id.toString()) {
          salesCounter++;
        }
      });
    });
    setProductSales(salesCounter);
  }, [orders, product]);

  const optionsRef = useRef();

  const replaceInLocalProducts = (updatedProduct) => {
    const toBeReplaced = localProducts.find(
      (product) => product._id.toString() === updatedProduct._id.toString()
    );
    setLocalProducts((localProducts) => [
      ...localProducts.slice(0, localProducts.indexOf(toBeReplaced)),
      updatedProduct,
      ...localProducts.slice(localProducts.indexOf(toBeReplaced) + 1),
    ]);
  };
  useEffect(() => {
    if (
      updatedProduct &&
      updatedProduct._id.toString() === product._id.toString()
    ) {
      replaceInLocalProducts(updatedProduct);
      dispatch({ type: 'UPDATE_PRODUCT_RESET' });
    }
    // eslint-disable-next-line
  }, [updatedProduct, dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = optionsRef;
      if (wrap && !wrap.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={'published-product' + (product.active ? '' : ' inactive')}>
      {loadingUpdate ? (
        <div className='width-100 flex-center'>
          {updateError ? (
            <MessageBox variant='danger'>
              Ha habido un error actualizando el producto
            </MessageBox>
          ) : (
            <LoadingCircle color='blue' />
          )}
        </div>
      ) : (
        <>
          <div className='row'>
            <img
              id='published-product-image'
              className='center-cropped margin-right'
              src={product.cover}
              alt='product'
            />
            <div className='published-info'>
              <p className='subtle-text'>#{product._id}</p>
              <h4>
                {product.name.length > 22
                  ? product.name.slice(0, 22) + '...'
                  : product.name}
              </h4>
              <p className='subtle-text'>{productSales + ' ventas'}</p>
            </div>
          </div>
          <h4 className='subtle-text'>{'$ ' + product.price}</h4>
          <h4 className='subtle-text'>{product.stock + ' u.'}</h4>
          <div className='three-dots-btn' ref={optionsRef}>
            <button onClick={() => setOpenOptions(!openOptions)}>
              <img src='https://svgshare.com/i/Wuc.svg' alt='three dots' />
            </button>
            {openOptions && (
              <ul className='three-dots-options'>
                <li
                  onClick={() =>
                    (window.location.href =
                      '/producto/modificar/' + product._id)
                  }
                >
                  Modificar
                </li>
                <li
                  onClick={() =>
                    (window.location.href = '/product/' + product._id)
                  }
                >
                  Ver publicación
                </li>
                {product.active ? (
                  <li
                    onClick={() => {
                      dispatch(
                        updateProduct({ _id: product._id, active: false })
                      );
                      setOpenOptions(false);
                    }}
                  >
                    Pausar
                  </li>
                ) : (
                  <li
                    onClick={() => {
                      dispatch(
                        updateProduct({ _id: product._id, active: true })
                      );
                      setOpenOptions(false);
                    }}
                  >
                    Reactivar
                  </li>
                )}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Publishedproduct;
