import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductDrafts, detailsUser } from '../Actions/userActions';
import MessageBox from '../Components/MessageBox';
import { Redirect } from 'react-router-dom';
import LoadingCircle from '../Components/LoadingCircle';

const DraftsScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { error, user } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { error: detailsError, user: details } = userDetails;
  const userDeleteProductDrafts = useSelector(
    (state) => state.userDeleteProductDrafts
  );
  const {
    loading: loadingDrafts,
    error: errorDrafts,
  } = userDeleteProductDrafts;
  const dispatch = useDispatch();
  const [productDrafts, setProductDrafts] = useState([]);
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

  useEffect(() => {
    dispatch(detailsUser(user._id));
  }, [user, dispatch]);

  useEffect(() => {
    details &&
      details.productDrafts.length > 0 &&
      setProductDrafts(details.productDrafts);
  }, [details]);
  const displayDrafts = () => {
    let drafts = [];
    const length = details && productDrafts.length - 1;
    for (let i = length; i > length - 3; i--) {
      productDrafts[i] &&
        drafts.push(
          <li className='list-relative' key={i}>
            <a
              className='list-item padding row flex-start'
              href={
                productDrafts[i].address
                  ? '/publicar?draft=' + productDrafts[i]._id
                  : '/vender/producto?draft=' + productDrafts[i]._id
              }
            >
              <img
                className='list-img center-cropped'
                src={
                  productDrafts[i].images.length > 0
                    ? productDrafts[i].images[0]
                    : 'https://http2.mlstatic.com/secure/sell/draft_default.svg'
                }
                alt='Imagen del producto'
              />
              <div className='column'>
                <span>{productDrafts[i].name}</span>
                <span className='subtle-text margin-top'>
                  <img
                    className='very-small little-margin-right'
                    src='https://svgshare.com/i/UJR.svg'
                    alt=''
                  />
                  {'Publicación iniciada el ' +
                    parseInt(productDrafts[i].date.split('-')[2]) +
                    ' de ' +
                    months[parseInt(productDrafts[i].date.split('-')[1]) - 1]}
                </span>
              </div>
            </a>
            <button
              className='list-delete absolute-right'
              onClick={() => {
                dispatch(deleteProductDrafts(productDrafts[i]._id));
              }}
            >
              <img
                className='small'
                src='https://svgshare.com/i/UJB.svg'
                alt='Boton borrar'
              />
            </button>
          </li>
        );
    }
    return drafts;
  };
  return (
    <>
      <div className='extra-header post'></div>

      {error || detailsError ? (
        <div className='screen-mini-card medium'>
          <MessageBox variant='danger'>{error || detailsError}</MessageBox>
        </div>
      ) : !details ? (
        <LoadingCircle color='blue' />
      ) : details && details.productDrafts.length < 1 ? (
        <Redirect to='/vender/producto' />
      ) : (
        productDrafts.length > 0 && (
          <>
            <div className='column flex-start'>
              <h1>
                Hola {user && user.name},<br /> ¡qué bueno volver a verte!
              </h1>
              <div className='screen-mini-card post-screen'>
                <div className='screen-mini-card-header-title'>
                  <h2>¿Qué publicación querés continuar?</h2>
                </div>
                <div className='screen-mini-card-body'>
                  <ul className='in-container'>{displayDrafts()}</ul>
                </div>
                <div className='screen-mini-card-footer'>
                  <a href='/vender/producto'>Iniciar nueva publicación</a>
                </div>
              </div>
              {!loadingDrafts && errorDrafts && (
                <div className='screen-mini-card medium'>
                  <MessageBox variant='danger'>{errorDrafts}</MessageBox>
                </div>
              )}
            </div>
          </>
        )
      )}
    </>
  );
};

export default DraftsScreen;
