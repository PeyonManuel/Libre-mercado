import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAddresses,
  deleteProductDrafts,
  userDeleteProduct,
  detailsUser,
  updateProductDrafts,
  userAddProduct,
} from '../Actions/userActions';
import { formatNumber } from '../Utils/Utilities';
import { Redirect } from 'react-router-dom';
import MessageBox from '../Components/MessageBox';
import { createNewProduct } from '../Actions/productActions';

const PostScreen = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, user } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    user: details,
  } = userDetails;
  const userUpdateProductDrafts = useSelector(
    (state) => state.userUpdateProductDrafts
  );
  const {
    loading: updateLoading,
    error: updateError,
  } = userUpdateProductDrafts;
  const userDeleteProductDrafts = useSelector(
    (state) => state.userDeleteProductDrafts
  );
  const {
    error: errorDeletingDraft,
    deleted: draftDeleted,
  } = userDeleteProductDrafts;
  const newProduct = useSelector((state) => state.newProduct);
  const {
    error: newProductError,
    product,
    loading: creatingProduct,
  } = newProduct;
  const userAddProducts = useSelector((state) => state.userAddProducts);
  const {
    error: errorAddingProduct,
    added,
    loading: addingProduct,
  } = userAddProducts;

  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(props.location.search);
  const draftId = urlParams.get('draft');
  const [draftValues, setDraftValues] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const [maxPercentage, setMaxPercentage] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [price, setPrice] = useState(0);
  const [priceError, setPriceError] = useState('');
  const [justShipping, setJustShipping] = useState(null);
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [videoError, setVideoError] = useState('');

  const [updatingData, setUpdatingData] = useState(false);
  const [descriptionCardOpen, setDescriptionCardOpen] = useState(false);
  const [videoCardOpen, setVideoCardOpen] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingVideo, setEditingVideo] = useState(false);
  const [validVideoId, setValidVideoId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 175) {
        if (document.querySelector('.new-product-steps'))
          document.querySelector('.new-product-steps').style.transform =
            'translateY(5.5rem)';
      } else {
        if (document.querySelector('.new-product-steps'))
          document.querySelector('.new-product-steps').style.transform =
            'translateY(0)';
      }
    };
    document.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (details) {
      const values = details.productDrafts.find(
        (draft) => draft._id.toString() === draftId
      );
      if (values) {
        setDraftValues(values);
      } else {
        props.history.push('/vender');
      }
    }
  }, [details, draftId, updatingData, props]);

  useEffect(() => {
    if (draftValues) {
      if (draftValues.address !== null) {
        setSelectedAddress(draftValues.address);
        setPercentage(25);
      }
      if (draftValues.price) {
        setPrice(draftValues.price);
        setPercentage(50);
      }
      if (draftValues.justShipping !== null) {
        setJustShipping(draftValues.justShipping);
        setPercentage(75);
      }
      if (draftValues.description) {
        setDescription(draftValues.description);
        setDescriptionCardOpen(true);
      }
      if (draftValues.video) {
        setVideo(draftValues.video);
        setVideoCardOpen(true);
        setValidVideoId(draftValues.video.split('v=')[1]);
      }
    }
    setUpdatingData(false);
  }, [draftValues]);
  useEffect(() => {
    percentage > maxPercentage && setMaxPercentage(percentage);
  }, [percentage, maxPercentage]);

  useEffect(() => {
    switch (percentage) {
      case 0:
        document.querySelector('#first-step') &&
          document.querySelector('#first-step').scrollIntoView();
        break;
      case 25:
        document.querySelector('#first-step') &&
          document.querySelector('#first-step').scrollIntoView();
        break;
      case 50:
        if (!updatingData) {
          document.querySelector('#second-step') &&
            document.querySelector('#second-step').scrollIntoView();
        }
        break;
      case 75:
        !updatingData &&
          document.querySelector('#third-step') &&
          document.querySelector('#third-step').scrollIntoView();
        break;
      default:
        break;
    }
  }, [percentage, updatingData]);

  useEffect(() => {
    user && dispatch(detailsUser(user._id));
  }, [dispatch, user]);

  useEffect(() => {
    (updateLoading ||
      loadingDetails ||
      loading ||
      addingProduct ||
      creatingProduct) &&
      setUpdatingData(true);
  }, [updateLoading, loadingDetails, loading, addingProduct, creatingProduct]);

  useEffect(() => {
    if (!product && added) {
      dispatch(createNewProduct(draftValues));
    }
  }, [product, dispatch, added, draftValues]);
  useEffect(() => {
    if (product) {
      dispatch(deleteProductDrafts(draftId));
    } else if (newProductError) {
      dispatch(userDeleteProduct(product._id));
    }
  }, [added, dispatch, product, draftId, newProductError]);

  useEffect(() => {
    draftDeleted && props.history.push('vender/producto-publicado');
  }, [draftDeleted, props]);

  const validateVideoId = (id) => {
    var img = new Image();
    img.src = 'http://img.youtube.com/vi/' + id + '/mqdefault.jpg';
    img.onload = function () {
      if (this.width === 120) {
        setValidVideoId('');
        setVideoError('Solo podés agregar links a videos de YouTube.');
      } else {
        setValidVideoId(id);
        setVideoError('');
      }
    };
  };
  const displayAddresses = () => {
    const addressesForReturn = [];
    details &&
      details.addresses.map((address, i) =>
        addressesForReturn.push(
          <li
            className={
              'list-relative multiple-selection-btn' +
              (selectedAddress === address._id ? ' selected' : '')
            }
            key={i}
          >
            <div className='list-item padding'>
              <a
                className='nodecoration'
                href='#Select-address'
                onClick={() => {
                  setSelectedAddress(address._id);
                  dispatch(
                    updateProductDrafts({
                      ...draftValues,
                      address: address._id,
                    })
                  );
                }}
              >
                <h4>
                  {address.street +
                    ' ' +
                    (address.streetNumber ? address.streetNumber : '')}
                </h4>
                <br />
                <span className='subtle-text'>
                  {address.city + ', ' + address.province}
                </span>
              </a>
              <br />
              <a
                className='small'
                onClick={() => {
                  localStorage.setItem(
                    'currentAddress',
                    JSON.stringify(address)
                  );
                }}
                href={'/nueva-direccion?draft=' + draftId}
              >
                Modificar
              </a>
              <button
                className='list-delete absolute-right'
                onClick={() => {
                  dispatch(deleteAddresses(address._id));
                  if (address._id === selectedAddress) {
                    setSelectedAddress('');
                    setPercentage(0);
                    dispatch(
                      updateProductDrafts({
                        ...draftValues,
                        address: null,
                      })
                    );
                  }
                }}
              >
                <img
                  className='small'
                  src='https://svgshare.com/i/UJB.svg'
                  alt='Boton borrar'
                />
              </button>
            </div>
          </li>
        )
      );
    return addressesForReturn;
  };

  const firstStep = (status) => {
    return (
      <div
        id='first-step'
        className={
          'screen-mini-card medium' + (status === 'disabled' ? ' disabled' : '')
        }
      >
        <div className='screen-mini-card-header-title'>
          <h4>Dirección de la venta</h4>
        </div>
        {details &&
          (details.addresses.length > 0 ? (
            <ul>{displayAddresses()}</ul>
          ) : (
            <div className='screen-mini-card-body padding'>
              <h4>No tenés ninguna dirección registrada</h4>
            </div>
          ))}
        <div className='screen-mini-card-footer'>
          <a
            onClick={() => {
              localStorage.removeItem('currentAddress');
            }}
            href={'/nueva-direccion?draft=' + draftId}
          >
            Cargar nueva dirección
          </a>
        </div>
      </div>
    );
  };
  const secondStep = (status) => {
    return (
      <div
        id='second-step'
        className={
          'screen-mini-card medium' + (status === 'disabled' ? ' disabled' : '')
        }
      >
        <div className='screen-mini-card-header-title'>
          <h4>¿Cuál es el precio?</h4>
        </div>
        <div className='screen-mini-card-body padding'>
          <div className='wrapper sell'>
            <div className='underline-label-input'>
              <input
                placeholder='$'
                type='text'
                maxLength='12'
                className={priceError ? 'error' : ''}
                value={'$ ' + (price > 0 ? formatNumber(price) : '')}
                onChange={(e) => {
                  setPercentage(25);
                  setPrice(
                    e.target.value.split('$ ')[1]
                      ? e.target.value.split('$ ')[1].split('.').join('')
                      : 0
                  );
                  if (e.target.value.length === 2 || e.target.value === '$ ') {
                    setPriceError('El precio mínimo es 1.');
                  } else {
                    setPriceError('');
                  }
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      (e.keyCode >= 48 && e.keyCode <= 57) ||
                      e.keyCode === 8 ||
                      e.keyCode === 37 ||
                      e.keyCode === 39 ||
                      e.keyCode === 46
                    )
                  )
                    e.preventDefault();
                }}
              ></input>
              <div className={'underline' + (priceError ? ' error' : '')}></div>
              <span
                className={'subtle-text' + (priceError ? ' error' : ' noerror')}
              >
                {priceError && priceError}
              </span>
            </div>
          </div>
        </div>
        {percentage === 25 && maxPercentage >= 25 && (
          <div className='screen-mini-card-footer flex-end'>
            <button
              className='secondary'
              disabled={price > 0 ? false : true}
              onClick={() => {
                setPrice(draftValues.price ? draftValues.price : 0);
                setPercentage(maxPercentage);
              }}
            >
              Cancelar
            </button>
            <button
              className='primary'
              disabled={price > 0 ? false : true}
              onClick={() => {
                dispatch(
                  updateProductDrafts({
                    ...draftValues,
                    price,
                  })
                );
              }}
            >
              Confirmar
            </button>
          </div>
        )}
      </div>
    );
  };

  const thirdStep = (status) => {
    return (
      <div
        id='third-step'
        className={
          'screen-mini-card medium' + (status === 'disabled' ? ' disabled' : '')
        }
      >
        <div className='screen-mini-card-header-title'>
          <h4>¿Querés ofrecer retiro en persona?</h4>
        </div>
        <ul>
          <li
            className={
              'list-relative multiple-selection-btn' +
              (justShipping === false ? ' selected' : '')
            }
          >
            <button
              className='list-item padding'
              onClick={() => {
                if (justShipping !== false) {
                  setJustShipping(false);
                  dispatch(
                    updateProductDrafts({
                      ...draftValues,
                      justShipping: false,
                    })
                  );
                }
              }}
            >
              Sí, ofrezco retiro en persona.
            </button>
          </li>
          <li
            className={
              'list-relative multiple-selection-btn' +
              (justShipping === true ? ' selected' : '')
            }
          >
            <button
              className='list-item padding'
              onClick={() => {
                if (justShipping !== true) {
                  setJustShipping(true);
                  dispatch(
                    updateProductDrafts({
                      ...draftValues,
                      justShipping: true,
                    })
                  );
                }
              }}
            >
              No, solo hago envíos.
            </button>
          </li>
        </ul>
      </div>
    );
  };

  const fourthStep = (status) => {
    return (
      <div
        className={
          'screen-mini-card medium' +
          (!descriptionCardOpen ? ' dashed' : '') +
          (status === 'disabled' ? ' disabled' : '')
        }
        onClick={() => setDescriptionCardOpen(true)}
      >
        <div className='screen-mini-card-header-title'>
          <h4>¿Querés agregar una descripción?</h4>
          <span className='subtle-text no-user-select'>{' | (opcional)'}</span>
          {!descriptionCardOpen && (
            <img
              className='absolute-right small mouse-pointer'
              src='https://svgshare.com/i/VnK.svg'
              alt='plus sign'
            ></img>
          )}
        </div>
        {descriptionCardOpen && (
          <>
            <div className='screen-mini-card-body padding column'>
              <div className='message-div blue row'>
                <p className='paragraph-with-icon bold'>
                  <img
                    src='https://svgshare.com/i/UNm.svg'
                    alt='tip'
                    className='absolute-left-top circle badge'
                  />
                  No incluyas datos de contacto, como e-mails, teléfonos,
                  direcciones, links ni referencias a sitios externos. Tampoco
                  uses este espacio para indicar la condición de tu producto.
                  <a href='#verpolitica'> Ver política</a>
                </p>
              </div>
              <textarea
                value={description}
                onChange={(e) => {
                  setEditingDescription(true);
                  setDescription(e.target.value);
                }}
                maxLength='50000'
                placeholder='¿Te faltó algo? Agregalo como descripción.'
              ></textarea>
            </div>
            {editingDescription && (
              <div className='screen-mini-card-footer flex-end'>
                <button
                  className='secondary'
                  disabled={price > 0 ? false : true}
                  onClick={() => {
                    setEditingDescription(false);
                    setDescription(
                      draftValues.description ? draftValues.description : ''
                    );
                  }}
                >
                  Cancelar
                </button>
                <button
                  className='primary'
                  disabled={price > 0 ? false : true}
                  onClick={() => {
                    setEditingDescription(false);
                    dispatch(
                      updateProductDrafts({
                        ...draftValues,
                        description,
                      })
                    );
                  }}
                >
                  Confirmar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const fifthStep = (status) => {
    return (
      <div
        className={
          'screen-mini-card medium' +
          (videoCardOpen ? '' : ' dashed') +
          (status === 'disabled' ? ' disabled' : '')
        }
        onClick={() => setVideoCardOpen(true)}
      >
        <div className='screen-mini-card-header-title'>
          <h4>¿Querés agregar un video?</h4>
          <span className='subtle-text no-user-select'>{' | (opcional)'}</span>
          {!videoCardOpen && (
            <img
              className='absolute-right small mouse-pointer'
              src='https://svgshare.com/i/VnK.svg'
              alt='plus sign'
            ></img>
          )}
        </div>
        {videoCardOpen && (
          <>
            <div className='screen-mini-card-body padding column'>
              <div className='wrapper width-100 margin-bottom'>
                <div className='underline-label-input'>
                  <input
                    placeholder='Ej.: https://www.youtube.com/watch?v=K7sFmiFfl0g'
                    type='text'
                    className={videoError ? 'error' : ''}
                    value={video}
                    maxLength='120'
                    onChange={(e) => {
                      setEditingVideo(true);
                      setVideo(e.target.value);
                      var videoId = e.target.value.split(
                        'youtube.com/watch?v='
                      )[1];
                      if (
                        videoId &&
                        (videoId.substring(11, 12).includes('?') ||
                          videoId.substring(11, 12).includes('&') ||
                          videoId.length === 11)
                      ) {
                        setVideoError('');
                        validateVideoId(videoId.substring(0, 11));
                      } else {
                        setVideoError(
                          'Solo podés agregar links a videos de YouTube.'
                        );
                        setValidVideoId('');
                      }
                    }}
                  ></input>
                  <div
                    className={'underline' + (videoError ? ' error' : '')}
                  ></div>
                  <span
                    className={
                      'subtle-text' + (videoError ? ' error' : ' noerror')
                    }
                  >
                    {videoError && videoError}
                  </span>
                  {!videoError && (
                    <span className='reg-info-after'>
                      Pegá acá el link de YouTube.
                    </span>
                  )}
                </div>
              </div>
              {validVideoId !== '' && (
                <iframe
                  className='margin-top'
                  title='Video seleccionado'
                  src={'https://www.youtube.com/embed/' + validVideoId}
                  allow='autoplay; encrypted-media'
                  frameBorder='0'
                  height='390px'
                  width='100%'
                ></iframe>
              )}
            </div>
            {editingVideo && (
              <div className='screen-mini-card-footer flex-end'>
                <button
                  className='secondary'
                  disabled={price > 0 ? false : true}
                  onClick={() => {
                    setVideo(draftValues.video ? draftValues.video : '');
                    setPercentage(maxPercentage);
                    setVideoError('');
                    setEditingVideo(false);
                  }}
                >
                  Cancelar
                </button>
                <button
                  className='primary'
                  disabled={validVideoId ? false : true}
                  onClick={() => {
                    dispatch(
                      updateProductDrafts({
                        ...draftValues,
                        video:
                          'https://www.youtube.com/watch?v=' + validVideoId,
                      })
                    );
                    setEditingVideo(false);
                  }}
                >
                  Confirmar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const postBtn = (status) => {
    const allPostErrors =
      !errorDeletingDraft && !errorAddingProduct && !newProductError;
    return (
      <div
        className={
          'width-100' +
          (allPostErrors ? ' flex-end' : '') +
          (status === 'disabled' ? ' disabled' : '')
        }
      >
        {allPostErrors ? (
          <button
            className='primary'
            onClick={() => {
              dispatch(userAddProduct(draftValues));
            }}
            disabled={updatingData}
          >
            Publicar
          </button>
        ) : (
          <MessageBox variant='danger'>
            Ha ocurrido un error, por favor recargue la pagina para volver a
            intentarlo.
          </MessageBox>
        )}
      </div>
    );
  };

  return (
    <>
      {!draftId || (details && draftValues === undefined) ? (
        <Redirect to='vender/producto'></Redirect>
      ) : (
        draftValues &&
        (!(draftValues.images.length > 0 && draftValues.stock > 0) ? (
          <Redirect to={'vender/producto?draft=' + draftId}></Redirect>
        ) : error ? (
          <MessageBox>{error}</MessageBox>
        ) : errorDetails ? (
          <MessageBox>{errorDetails}</MessageBox>
        ) : (
          <>
            <div className='extra-header new-product'></div>
            <div className='new-product-steps'>
              <span>
                <span className='step-number'>2</span>
                Condiciones de venta
              </span>
              <div
                className='progress-bar'
                style={{ width: percentage + '%' }}
              ></div>
            </div>
            <div className='column flex-start'>
              <a
                className='margin-bottom'
                href={'/vender/producto?draft=' + draftId}
                style={{ zIndex: '2' }}
              >
                {'<  Anterior'}
              </a>
              <div
                className='row width-100'
                style={{ zIndex: '2', marginBottom: '6rem' }}
              >
                <div>
                  <span className='subtle-text'>Paso 2 de 2</span>
                  <h1 style={{ fontSize: '2.5rem' }}>
                    Para terminar,
                    <br /> definamos las condiciones de venta
                  </h1>
                </div>
                <img
                  src='https://http2.mlstatic.com/secure/sell/images/notebook-v2.svg'
                  alt='arte de zapato'
                ></img>
              </div>
              {updatingData ? (
                firstStep('disabled')
              ) : updateError ? (
                <MessageBox variant='danger'>{updateError}</MessageBox>
              ) : (
                firstStep()
              )}
              {updatingData && percentage >= 25 ? (
                secondStep('disabled')
              ) : percentage === 25 && updateError ? (
                <MessageBox variant='danger'>{updateError}</MessageBox>
              ) : percentage >= 25 ? (
                secondStep()
              ) : (
                maxPercentage >= 25 && secondStep('disabled')
              )}
              {updatingData && percentage >= 50 ? (
                thirdStep('disabled')
              ) : percentage === 50 && updateError ? (
                <MessageBox variant='danger'>{updateError}</MessageBox>
              ) : percentage >= 50 ? (
                thirdStep()
              ) : (
                maxPercentage >= 50 && thirdStep('disabled')
              )}
              {updatingData && percentage >= 75 ? (
                fourthStep('disabled')
              ) : percentage === 75 && updateError ? (
                <MessageBox variant='danger'>{updateError}</MessageBox>
              ) : percentage >= 75 ? (
                fourthStep()
              ) : (
                maxPercentage >= 75 && fourthStep('disabled')
              )}
              {updatingData && percentage >= 75 ? (
                fifthStep('disabled')
              ) : percentage === 75 && updateError ? (
                <MessageBox variant='danger'>{updateError}</MessageBox>
              ) : percentage >= 75 ? (
                fifthStep()
              ) : (
                maxPercentage >= 75 && fifthStep('disabled')
              )}
              {percentage >= 75 &&
                (!editingDescription && !editingVideo
                  ? postBtn()
                  : postBtn('disabled'))}
            </div>
          </>
        ))
      )}
    </>
  );
};

export default PostScreen;
