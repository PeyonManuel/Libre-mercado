import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions';
import HomeScreenExhibitor from '../Components/HomeScreenExhibitor';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';

const HomeScreen = (props) => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [ammountToMove, setAmmountToMove] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  const moveList = (moveTo) => {
    if (moveTo === 'forward') {
      setAmmountToMove(
        ammountToMove + (window.screen.width / devicePixelRatio) * 0.9375
      );
    } else {
      setAmmountToMove(
        ammountToMove - (window.screen.width / devicePixelRatio) * 0.9375
      );
    }
  };
  useEffect(() => {
    if (
      document.getElementById('product-cards') &&
      document.getElementById('product-cards').offsetWidth <
        ammountToMove + (window.screen.width / devicePixelRatio) * 0.9375
    ) {
      document.getElementById('card-next-button').style.display = 'none';
    } else if (document.getElementById('card-next-button')) {
      document.getElementById('card-next-button').style.display = 'block';
    }
  }, [ammountToMove]);
  return (
    <div className='column width-100 flex-center'>
      {error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <HomeScreenExhibitor />
          <div
            className='flex-center'
            style={{
              position: 'relative',
              width: devicePixelRatio < 2 ? '120rem' : '100vw',
            }}
          >
            {loading ? (
              <LoadingCircle color='blue' />
            ) : (
              <>
                {window.devicePixelRatio < 2 && ammountToMove > 0 && (
                  <button
                    className='card-back-button'
                    onClick={() => moveList('backwards')}
                  ></button>
                )}
                <div className='product-list-container'>
                  <h1>Productos</h1>
                  <div
                    className='row top product-cards'
                    id='product-cards'
                    style={{
                      transform:
                        'translate3d(' + -ammountToMove + 'px, 0px, 0px)',
                    }}
                  >
                    {products.map((product) => (
                      <>
                        <Product
                          key={product._id}
                          product={product}
                          user={user && user}
                          history={props.history}
                        />
                      </>
                    ))}
                  </div>
                </div>

                {window.devicePixelRatio < 2 && (
                  <button
                    id='card-next-button'
                    className='card-next-button'
                    onClick={() => moveList('forward')}
                  ></button>
                )}
              </>
            )}
          </div>
        </>
      )}
      {categoryLoading ? (
        <></>
      ) : categoryError ? (
        <MessageBox variant='danger'>{categoryError}</MessageBox>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HomeScreen;
