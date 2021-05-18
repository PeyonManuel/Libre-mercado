import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import { desktopScreenCondition } from '../Utils/Utilities';

const ProductPublishedScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error: userError, loading: userLoading } = userLogin;
  const [localError, setLocalError] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    (error || userError) && setLocalError(true);
  }, [error, userError]);

  useEffect(() => {
    if (user && product) {
      product.seller._id.toString() === user._id.toString()
        ? setCorrectUser(true)
        : setLocalError(true);
    }
  }, [user, product]);
  return (
    <div className='width-100 flex-center'>
      {loading || userLoading ? (
        <LoadingCircle color='blue' />
      ) : localError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        product &&
        correctUser && (
          <>
            <div className='extra-header product-published'></div>
            <div className='column'>
              <div className='product-published-header row'>
                <div className='headers'>
                  <h3>¡Listo!</h3>
                  <h1>Ya terminaste tu publicación</h1>
                </div>
                <div className='product-image flex-center'>
                  <img src={product.images[0]} alt='product' />
                </div>
              </div>
              <div className='screen-mini-card medium margin-top'>
                <div className='screen-mini-card-header-title'>
                  <h4>
                    Tené en cuenta que tu publicación tardará algunos minutos en
                    aparecer en los resultados de búsquedas.
                  </h4>
                </div>
                <div className='screen-mini-card-body padding margin-top'>
                  <a
                    href={'/product/' + product._id}
                    className={
                      'nodecoration' +
                      (!desktopScreenCondition ? ' width-100' : '')
                    }
                  >
                    <button
                      className={
                        'primary' + (!desktopScreenCondition ? ' block' : '')
                      }
                    >
                      Ver publicación
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default ProductPublishedScreen;
