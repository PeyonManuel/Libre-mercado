import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../Actions/categoryActions';
import { customListProducts } from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { desktopScreenCondition } from '../Utils/Utilities';

const SearchScreen = (props) => {
  const urlParams = new URLSearchParams(props.location.search);
  const categoryParam = urlParams.get('categoria');
  const searchParam = urlParams.get('busqueda');
  const stateParam = urlParams.get('estado');
  const shippingParam = urlParams.get('con-envio');
  const minimumParam = urlParams.get('minimo');
  const maximumParam = urlParams.get('maximo');
  const dispatch = useDispatch();
  const customProductList = useSelector((state) => state.customProductList);
  const { loading, error, products } = customProductList;
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error: userError, loading: userLoading } = userLogin;
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [filterBtnClicked, setFilterBtnClicked] = useState(false);
  const [minimum, setMinimum] = useState(minimumParam ? minimumParam : 0);
  const [maximum, setMaximum] = useState(maximumParam ? maximumParam : 0);
  const [phoneFilters, setPhoneFilters] = useState(false);
  useEffect(() => {
    dispatch(
      customListProducts({
        search: searchParam !== '' ? searchParam : null,
        category: categoryParam,
        isStateNew:
          stateParam === 'nuevo' ? true : stateParam === 'usado' ? false : null,
        noShipping: shippingParam === 'true' ? false : null,
        minimum: parseInt(minimumParam) ? minimumParam : null,
        maximum: parseInt(maximumParam) ? maximumParam : null,
      })
    );
    dispatch(listCategories());
  }, [
    dispatch,
    searchParam,
    categoryParam,
    maximumParam,
    minimumParam,
    shippingParam,
    stateParam,
  ]);

  const filters = () => (
    <div
      className={
        desktopScreenCondition ? 'search-sidebar' : 'search-phone-filters'
      }
    >
      {!desktopScreenCondition && (
        <i
          onClick={() => setPhoneFilters(false)}
          className='fa fa-times absolute-left-top'
        ></i>
      )}
      {categories.find((cat) => cat._id.toString() === categoryParam) && (
        <div>
          <a href={'/productos?categoria=' + categoryParam}>
            {
              categories.find((cat) => cat._id.toString() === categoryParam)
                .name
            }
          </a>
        </div>
      )}

      {products && desktopScreenCondition && (
        <div className='search-sidebar-header'>
          <h1 className='no-margin'>
            {searchParam &&
              searchParam.charAt(0).toUpperCase() + searchParam.slice(1)}
          </h1>
          <h4 className='subtle-text'>{products.length + ' resultados'}</h4>
        </div>
      )}
      <div className='switch-shipping-container'>
        <span className='switch-shipping-label bold'>Con envio</span>
        <div className='switch-container'>
          <span
            onClick={() => {
              window.location.href =
                '/productos?busqueda=' +
                (searchParam ? searchParam : '') +
                (categoryParam ? '&categoria=' + categoryParam : '') +
                (stateParam ? '&estado=' + !stateParam : '') +
                (shippingParam !== 'true' ? '&con-envio=true' : '') +
                (minimumParam ? '&minimo=' + minimumParam : '') +
                (maximumParam ? '&maximo=' + maximumParam : '');
            }}
            className={'switch' + (shippingParam === 'true' ? ' on' : '')}
          ></span>
        </div>
      </div>
      <div className='price-div'>
        <h3
          className='bold width-100'
          onClick={() => {
            document
              .querySelector('#price-filter')
              .classList.toggle('filter-closed');
            document
              .querySelector('#state-filter')
              .classList.add('filter-closed');
            document
              .querySelector('#category-filter')
              .classList.add('filter-closed');
          }}
        >
          Precio
        </h3>
        <div
          id='price-filter'
          className={
            'inputs' + (!desktopScreenCondition ? ' filter-closed' : '')
          }
        >
          <input
            type='number'
            placeholder='Mínimo'
            value={minimum > 0 ? minimum : ''}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && minimum > 0) {
                window.location.href =
                  '/productos?busqueda=' +
                  (searchParam ? searchParam : '') +
                  (categoryParam ? '&categoria=' + categoryParam : '') +
                  (stateParam ? '&estado=' + !stateParam : '') +
                  (shippingParam ? '&con-envio=' + shippingParam : '') +
                  (minimum > 0 ? '&minimo=' + minimum : '') +
                  (maximum > 0 ? '&maximo=' + maximum : '');
              } else if (e.keyCode === 189 || e.keyCode === 190) {
                e.preventDefault();
              }
            }}
            onChange={(e) => setMinimum(e.target.value)}
          ></input>
          <input
            type='number'
            placeholder='Máximo'
            value={maximum > 0 ? maximum : ''}
            onChange={(e) => setMaximum(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13 && maximum > 0) {
                window.location.href =
                  '/productos?busqueda=' +
                  (searchParam ? searchParam : '') +
                  (categoryParam ? '&categoria=' + categoryParam : '') +
                  (stateParam ? '&estado=' + !stateParam : '') +
                  (shippingParam ? '&con-envio=' + shippingParam : '') +
                  (minimum > 0 ? '&minimo=' + minimum : '') +
                  (maximum > 0 ? '&maximo=' + maximum : '');
              } else if (e.keyCode === 189 || e.keyCode === 190) {
                e.preventDefault();
              }
            }}
          ></input>
          <button
            disabled={!minimum && !maximum}
            type='button'
            className='arrow-btn'
            onClick={() => {
              window.location.href =
                '/productos?busqueda=' +
                (searchParam ? searchParam : '') +
                (categoryParam ? '&categoria=' + categoryParam : '') +
                (stateParam ? '&estado=' + !stateParam : '') +
                (shippingParam ? '&con-envio=' + shippingParam : '') +
                (minimum > 0 ? '&minimo=' + minimum : '') +
                (maximum > 0 ? '&maximo=' + maximum : '');
            }}
          >
            <i className='fa fa-caret-right' aria-hidden='true'></i>
          </button>
        </div>
      </div>
      <div className='state-div'>
        <h3
          onClick={() => {
            document
              .querySelector('#state-filter')
              .classList.toggle('filter-closed');
            document
              .querySelector('#price-filter')
              .classList.add('filter-closed');
            document
              .querySelector('#category-filter')
              .classList.add('filter-closed');
          }}
        >
          Estado
        </h3>
        <ul
          id='state-filter'
          className={!desktopScreenCondition ? ' filter-closed' : ''}
        >
          <li key={0}>
            <a
              href={
                '/productos?busqueda=' +
                (searchParam ? searchParam : '') +
                (categoryParam ? '&categoria=' + categoryParam : '') +
                (stateParam !== 'nuevo' ? '&estado=nuevo' : '') +
                (shippingParam ? '&con-envio=' + shippingParam : '') +
                (minimumParam ? '&minimo=' + minimum : '') +
                (maximumParam ? '&maximo=' + maximum : '')
              }
              className={
                'subtle-text' + (stateParam === 'nuevo' ? ' bold' : '')
              }
            >
              Nuevo
            </a>
          </li>
          <li key={1}>
            <a
              href={
                '/productos?busqueda=' +
                (searchParam ? searchParam : '') +
                (categoryParam ? '&categoria=' + categoryParam : '') +
                (stateParam !== 'usado' ? '&estado=usado' : '') +
                (shippingParam ? '&con-envio=' + shippingParam : '') +
                (minimumParam ? '&minimo=' + minimum : '') +
                (maximumParam ? '&maximo=' + maximum : '')
              }
              className={
                'subtle-text' + (stateParam === 'usado' ? ' bold' : '')
              }
            >
              Usado
            </a>
          </li>
        </ul>
      </div>

      <div className='category-div margin-top'>
        <h3
          onClick={() => {
            document
              .querySelector('#category-filter')
              .classList.toggle('filter-closed');
            document
              .querySelector('#price-filter')
              .classList.add('filter-closed');
            document
              .querySelector('#state-filter')
              .classList.add('filter-closed');
          }}
        >
          Categorías
        </h3>
        <ul
          id='category-filter'
          className={!desktopScreenCondition ? ' filter-closed' : ''}
        >
          {categories.map((cat) => (
            <li key={cat._id}>
              <a
                href={
                  '/productos?busqueda=' +
                  (searchParam ? searchParam : '') +
                  (categoryParam !== cat._id ? '&categoria=' + cat._id : '') +
                  (stateParam ? '&estado=' + stateParam : '') +
                  (shippingParam ? '&con-envio=' + shippingParam : '') +
                  (minimumParam ? '&minimo=' + minimum : '') +
                  (maximumParam ? '&maximo=' + maximum : '')
                }
                className={
                  'subtle-text' + (categoryParam === cat._id ? ' bold' : '')
                }
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className='search-screen'>
      {error || categoryError || userError ? (
        <MessageBox variant='danger'>
          Ha ocurrido un error, intentalo mas tarde
        </MessageBox>
      ) : categoryLoading || userLoading || loading ? (
        <LoadingCircle color='blue' />
      ) : categories && user && products && products.length > 0 ? (
        <div className='search-ui'>
          {phoneFilters && filters()}
          {desktopScreenCondition && filters()}
          <section className='search-results'>
            <div className='search-topbar flex-end'>
              <button
                onClick={() => {
                  setPhoneFilters(true);
                }}
              >
                Filtros
              </button>
              <span className='styled-dropdown margin-right'>
                <button
                  className='styled-dropdown-btn'
                  onClick={() => setFilterBtnClicked(!filterBtnClicked)}
                >
                  <span>
                    {desktopScreenCondition && <b>Ordenar por: </b>}
                    {selectedFilter === 0 ? 'Menor precio' : 'Mayor precio'}
                  </span>

                  <span>
                    <i
                      style={{ marginLeft: '.5rem' }}
                      className={
                        'fa fa-caret-down style-list-caret blue' +
                        (filterBtnClicked ? ' selected' : '')
                      }
                    ></i>
                  </span>
                </button>
                <ul
                  className={
                    'styled-list search' + (filterBtnClicked ? ' active' : '')
                  }
                >
                  {[0, 1].map((index) => (
                    <li
                      key={index}
                      className={index === selectedFilter ? 'current' : ''}
                      onClick={() => {
                        setFilterBtnClicked(false);
                        setSelectedFilter(index);
                      }}
                    >
                      {index === 0 ? 'Menor precio' : 'Mayor precio'}
                    </li>
                  ))}
                </ul>
              </span>
            </div>
            <div
              className={
                'results width-100 flex-start' +
                (!desktopScreenCondition ? ' product-list search' : '')
              }
            >
              {products
                .sort((a, b) =>
                  selectedFilter === 0 ? a.price - b.price : b.price - a.price
                )
                .map((product) => (
                  <Product
                    key={product._id}
                    product={product}
                    user={user && user}
                    noHover={desktopScreenCondition}
                    smallRating={desktopScreenCondition}
                  />
                ))}
            </div>
          </section>
        </div>
      ) : (
        <div className='no-results-msg-container'>
          <div className='no-results-icon'>
            <svg
              className='ui-search-icon ui-search-icon--not-found ui-search-rescue__icon'
              xmlns='http://www.w3.org/2000/svg'
              width='80'
              height='80'
              viewBox='0 0 80 80'
            >
              <g fill='none' fillRule='evenodd'>
                <path
                  stroke='#484848'
                  strokeLinecap='round'
                  d='M37.891 50.705c4.584-1.85 8.61-5.256 11.216-9.957m2.764-9.071c.456-5.499-1.142-10.977-4.48-15.29a21.276 21.276 0 0 0-6.53-5.599c-5.845-3.24-12.566-3.444-18.403-1.139-4.65 1.836-8.739 5.265-11.375 10.022a22.488 22.488 0 0 0-2.832 10.308 22.102 22.102 0 0 0 3.058 11.86 21.288 21.288 0 0 0 8.02 7.79 21.275 21.275 0 0 0 8.427 2.594 21.853 21.853 0 0 0 10.135-1.518'
                ></path>
                <path
                  stroke='#484848'
                  strokeLinecap='round'
                  d='M28.774 45.86a16.046 16.046 0 0 1-9.688-4.642m-3.693-5.7c-1.4-3.695-1.38-7.782.065-11.41a15.238 15.238 0 0 1 3.392-5.144c3.384-3.384 7.97-4.852 12.444-4.417 3.564.346 7.056 1.9 9.81 4.654 1.9 1.9 3.23 4.153 3.984 6.538a15.83 15.83 0 0 1 .236 8.768 15.246 15.246 0 0 1-3.984 6.947 15.237 15.237 0 0 1-5.289 3.449 15.651 15.651 0 0 1-7.277.956'
                ></path>
                <g fill='#484848' fillRule='nonzero'>
                  <path d='M35.644 35.95l-12-12 .572-.572 12 12z'></path>
                  <path d='M36.215 23.95l-12 12-.57-.572 11.999-12z'></path>
                </g>
                <path
                  stroke='#484848'
                  strokeLinecap='square'
                  d='M52.267 52.61l-6.646-6.647'
                ></path>
                <path
                  fill='#FFDB15'
                  d='M61.601 54.585l-2.823-2.824c-1.405-1.405-3.988-1.099-5.768.682-1.78 1.78-2.087 4.363-.682 5.768l9.599 9.599 8.89 8.89c1.403 1.404 3.987 1.098 5.767-.682 1.78-1.78 2.086-4.364.683-5.768'
                ></path>
                <path
                  stroke='#484848'
                  strokeLinecap='round'
                  d='M52.095 58.273c-1.404-1.405-1.283-3.803.27-5.356s3.951-1.674 5.356-.27l9.6 9.6 8.89 8.89'
                ></path>
              </g>
            </svg>
          </div>
          <div>
            <h3 className='ui-search-rescue__title'>
              Escribí en el buscador lo que querés encontrar.
            </h3>
            <ul className='with-style'>
              <li>
                <strong>Escribí tu búsqueda</strong> en el campo que figura en
                la parte superior de la pantalla.
              </li>
              <li>
                <strong>Navegá por categorías de productos</strong> para
                encontrar el producto que buscás.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;
