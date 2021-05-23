import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions';
import CategorieCards from '../Components/CategorieCards';
import HomeScreenExhibitor from '../Components/HomeScreenExhibitor';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { desktopScreenCondition } from '../Utils/Utilities';

const HomeScreen = (props) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const [ammountToMoveProductList, setammountToMoveProductList] = useState(0);
  const [productListContainerWidth, setProductListContainerWidth] = useState(
    desktopScreenCondition ? Math.floor(window.innerWidth / 240) * 240 : '100%'
  );
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  useEffect(() => {
    const updateProductListContainerWidth = () => {
      if (desktopScreenCondition) {
        setProductListContainerWidth(Math.floor(window.innerWidth / 240) * 240);
      } else {
        setProductListContainerWidth('100%');
      }
    };
    window.addEventListener('resize', updateProductListContainerWidth);
    return () =>
      window.removeEventListener('resize', updateProductListContainerWidth);
  }, []);
  useEffect(() => {
    if (
      document.getElementById('product-cards') &&
      document.getElementById('product-cards').offsetWidth <
        ammountToMoveProductList +
          (window.screen.width / devicePixelRatio) * 0.9375
    ) {
      document.getElementById('card-next-button').style.display = 'none';
    } else if (document.getElementById('card-next-button')) {
      document.getElementById('card-next-button').style.display = 'block';
    }
  }, [ammountToMoveProductList]);

  const moveList = (moveTo) => {
    if (moveTo === 'forward') {
      setammountToMoveProductList(
        ammountToMoveProductList + 1200 * devicePixelRatio
      );
    } else {
      setammountToMoveProductList(
        ammountToMoveProductList - 1200 * devicePixelRatio
      );
    }
  };

  return (
    <div
      className='column flex-center'
      style={{
        overflow: 'hidden',
        width: desktopScreenCondition ? 'calc(100vw - 1.7rem)' : '100%',
      }}
    >
      <HomeScreenExhibitor />
      {error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div
          className='product-list-container'
          style={{
            width: productListContainerWidth,
          }}
        >
          {loading ? (
            <LoadingCircle color='blue' />
          ) : (
            <div className='relative'>
              {desktopScreenCondition && ammountToMoveProductList > 0 && (
                <button
                  className='card-back-button'
                  onClick={() => moveList('backwards')}
                ></button>
              )}
              <div
                className='flex-center relative'
                style={{
                  width: desktopScreenCondition ? '120rem' : '100vw',
                }}
              >
                <div className='product-list'>
                  <h1>Productos</h1>
                  <div
                    className='row top product-cards'
                    id='product-cards'
                    style={{
                      transform:
                        'translate3d(' +
                        -ammountToMoveProductList +
                        'px, 0px, 0px)',
                    }}
                  >
                    {products
                      .filter((product, i) => {
                        return i < 5;
                      })
                      .map((product) => (
                        <>
                          <Product
                            key={product._id}
                            product={product}
                            user={user && user}
                          />
                        </>
                      ))}
                  </div>
                </div>
              </div>
              {desktopScreenCondition && (
                <button
                  id='card-next-button'
                  className='card-next-button'
                  onClick={() => moveList('forward')}
                ></button>
              )}
            </div>
          )}
        </div>
      )}
      <CategorieCards />
    </div>
  );
};

export default HomeScreen;
