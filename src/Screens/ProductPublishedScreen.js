import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../Actions/productActions';
import { detailsUser } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';

const ProductPublishedScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error: userError, loading: userLoading } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const {
    user: details,
    loading: loadingDetails,
    error: detailsError,
  } = userDetails;
  const [localError, setLocalError] = useState(false);
  const [correctUser, setCorrectUser] = useState(false);

  useEffect(() => {
    user && dispatch(detailsUser(user._id));
  }, [user, dispatch]);

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    (error || userError || detailsError) && setLocalError(true);
  }, [error, detailsError, userError]);

  useEffect(() => {
    if (details && product) {
      details.products.find((prod) => prod._id === product._id) &&
        setCorrectUser(true);
    } else {
      setLocalError(true);
    }
  }, [details, product]);

  return (
    <>
      {loading || loadingDetails || userLoading ? (
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
                  <button className='primary'>
                    <a
                      href={'/product/' + product._id}
                      className='nodecoration'
                    >
                      Ver publicación
                    </a>
                  </button>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default ProductPublishedScreen;
