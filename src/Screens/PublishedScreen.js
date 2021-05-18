import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSells } from '../Actions/orderActions';
import { getUserPublishedProducts } from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Publishedproduct from '../Components/Publishedproduct';
import { desktopScreenCondition } from '../Utils/Utilities';

const PublishedScreen = () => {
  const dispatch = useDispatch();
  const publishedProducts = useSelector((state) => state.publishedProducts);
  const { loading, error, products } = publishedProducts;
  const userSells = useSelector((state) => state.userSells);
  const { loading: loadingOrders, error: ordersError, orders } = userSells;

  const [search, setSearch] = useState('');
  const [activeParam, setActiveParam] = useState(true);
  const [localProducts, setLocalProducts] = useState([]);
  const [onDisplayProducts, setOnDisplayProducts] = useState(null);

  useEffect(() => {
    dispatch(getUserSells());
  }, [dispatch]);

  useEffect(() => {
    products && setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    setOnDisplayProducts(
      localProducts.filter((product) => {
        let searchRegex = '.*' + search + '.*';
        searchRegex = new RegExp(searchRegex, 'i');
        return (
          searchRegex.test(product.name) &&
          (activeParam ? product.active : true)
        );
      })
    );
  }, [localProducts, search, activeParam]);
  useEffect(() => {
    dispatch(getUserPublishedProducts());
  }, [dispatch]);
  return (
    <div className='width-100 flex-center'>
      {error || ordersError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        <div className='screen'>
          <div className='margin-left margin-bottom flex-start width-100 column'>
            <h1>Publicaciones</h1>
            <div className='row flex-start'>
              <div className='published-search'>
                <i className='fas fa-search'></i>
                <div className='wrapper margin-left'>
                  <div className='underline-label-input'>
                    <input
                      value={search}
                      type='text'
                      maxLength='20'
                      placeholder='Buscar por titulo'
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <div className='underline'></div>
                  </div>
                </div>
              </div>
              <div className='row margin-left'>
                <h4>Solo activas</h4>
                <div className='switch-container margin-left'>
                  <span
                    onClick={() => {
                      setActiveParam(!activeParam);
                    }}
                    className={'switch' + (activeParam ? ' on' : '')}
                  ></span>
                </div>
                {products && desktopScreenCondition && (
                  <div className='margin-left subtle-text'>
                    {'|   ' + onDisplayProducts.length + ' publicaciones'}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='width-100 flex-center'>
            <div className='published-products'>
              {loading || loadingOrders || !onDisplayProducts ? (
                <LoadingCircle color='blue' />
              ) : onDisplayProducts.length > 0 ? (
                onDisplayProducts.map((product) => (
                  <Publishedproduct
                    key={product._id}
                    product={product}
                    localProducts={localProducts}
                    setLocalProducts={setLocalProducts}
                    activeParam={activeParam}
                    orders={orders}
                  />
                ))
              ) : (
                <div className='flex-center margin-top column'>
                  <img
                    src='https://svgshare.com/i/WuU.svg'
                    alt='No encontrado'
                  />
                  <h3>Nada por acá...</h3>
                  <p className='subtle-text' style={{ textAlign: 'center' }}>
                    No encontramos publicaciones para esta búsqueda. Proba con
                    otra.
                  </p>
                  <button
                    className='anchor-lookalike'
                    onClick={() => setSearch('')}
                  >
                    Borrar búsqueda
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishedScreen;
