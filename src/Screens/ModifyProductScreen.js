import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailsProduct,
  updateProduct,
  getUserPublishedProducts,
} from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import {
  addErrorToImageList,
  desktopScreenCondition,
  formatNumber,
  validateVideoId,
} from '../Utils/Utilities';
import { move } from 'move-position';

const ModifyProductScreen = (props) => {
  const productId = props.match.params.id;
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error: userError, loading: userLoading } = userLogin;
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: updateError,
    product: updatedProduct,
  } = productUpdate;
  const [localError, setLocalError] = useState(false);
  const [imageError, setImageError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [disableFirstBtn, setDisableFirstBtn] = useState(false);
  const [disableNoShippingBtn, setDisableNoShippingBtn] = useState(false);
  const [disableDescriptionBtn, setDisableDescriptionBtn] = useState(false);
  const [disableVideoBtn, setDisableVideoBtn] = useState(false);
  const [disableIsStateNewBtn, setDisableIsStateNewBtn] = useState(false);
  const [openNoShippingOptions, setOpenNoShippingOptions] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [openIsStateNew, setOpenIsStateNew] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState([]);
  const [noShipping, setNoShipping] = useState(null);
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [validVideoId, setValidVideoId] = useState('');
  const [isStateNew, setIsStateNew] = useState(null);

  useEffect(() => {
    dispatch(getUserPublishedProducts());
  }, [dispatch]);
  useEffect(() => {
    productId && !product && dispatch(detailsProduct(productId));
  }, [dispatch, productId, product]);
  useEffect(() => {
    (error || userError || updateError) && setLocalError(true);
  }, [error, userError, updateError]);
  useEffect(() => {
    if (product) {
      !(product.seller._id === user._id) && setLocalError(true);
      product.name ? setTitle(product.name) : setLocalError(true);
      product.price ? setPrice(product.price) : setLocalError(true);
      product.images ? setImages(product.images) : setLocalError(true);
      product.noShipping === true || product.noShipping === false
        ? setNoShipping(product.noShipping)
        : setLocalError(true);
      product.description
        ? setDescription(product.description)
        : setDescription('');
      if (product.video) {
        setVideo('https://www.youtube.com/watch?v=' + product.video);
        setValidVideoId(product.video);
      } else {
        setVideo('');
      }
      product.isStateNew === true || product.isStateNew === false
        ? setIsStateNew(product.isStateNew)
        : setLocalError(true);
    }
  }, [product, user]);
  useEffect(() => {
    if (updatedProduct) {
      dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: updatedProduct });
      dispatch({ type: 'UPDATE_PRODUCT_RESET' });
    }
  }, [updatedProduct, dispatch]);

  useEffect(() => {
    if (
      (product &&
        product.name === title &&
        product.price === price &&
        product.images === images) ||
      images.length === 0 ||
      price === '0' ||
      price === 0 ||
      title === ''
    ) {
      setDisableFirstBtn(true);
    } else {
      setDisableFirstBtn(false);
    }
  }, [product, title, price, images]);
  useEffect(() => {
    product && noShipping === product.noShipping
      ? setDisableNoShippingBtn(true)
      : setDisableNoShippingBtn(false);
  }, [noShipping, product]);
  useEffect(() => {
    (product && description === product.description) || description === ''
      ? setDisableDescriptionBtn(true)
      : setDisableDescriptionBtn(false);
  }, [description, product]);
  useEffect(() => {
    product && (validVideoId === product.video || videoError || !validVideoId)
      ? setDisableVideoBtn(true)
      : setDisableVideoBtn(false);
  }, [validVideoId, videoError, product]);
  useEffect(() => {
    product && isStateNew === product.isStateNew
      ? setDisableIsStateNewBtn(true)
      : setDisableIsStateNewBtn(false);
  }, [isStateNew, product]);
  useEffect(() => {
    if (loadingUpdate) {
      setDisableFirstBtn(true);
      setDisableNoShippingBtn(true);
      setDisableDescriptionBtn(true);
      setDisableVideoBtn(true);
      setDisableIsStateNewBtn(true);
    }
  }, [loadingUpdate]);
  useEffect(() => {
    if (document.querySelector('#noShipping-caret')) {
      document.querySelector(
        '#noShipping-caret'
      ).style.transform = openNoShippingOptions
        ? 'rotate(0)'
        : 'rotate(-180deg)';
    }
  }, [openNoShippingOptions]);
  useEffect(() => {
    if (document.querySelector('#description-caret')) {
      document.querySelector(
        '#description-caret'
      ).style.transform = openDescription ? 'rotate(0)' : 'rotate(-180deg)';
    }
  }, [openDescription]);
  useEffect(() => {
    if (document.querySelector('#video-caret')) {
      document.querySelector('#video-caret').style.transform = openVideo
        ? 'rotate(0)'
        : 'rotate(-180deg)';
    }
  }, [openVideo]);
  useEffect(() => {
    if (document.querySelector('#isstatenew-caret')) {
      document.querySelector(
        '#isstatenew-caret'
      ).style.transform = openIsStateNew ? 'rotate(0)' : 'rotate(-180deg)';
    }
  }, [openIsStateNew]);
  const CheckDimension = (file) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var height = this.height;
        var width = this.width;
        if (height < 500 || width < 500) {
          addErrorToImageList(
            reader.result,
            '- El tamaño es menor a 500 x 500 px.',
            setImageError
          );
        } else {
          setImages((images) => [...images, this.src]);
        }
      };
    };
  };

  return (
    <div className='width-100 flex-center'>
      {loading || userLoading ? (
        <LoadingCircle color='blue' />
      ) : localError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        product && (
          <div className='screen flex-start column'>
            <a
              className={
                'margin-top' + (!desktopScreenCondition ? ' margin-left' : '')
              }
              href='/publicaciones'
            >
              <strong>{'<'}</strong>
              {' Volver'}
            </a>
            <div className='flex-center screen column'>
              <div className='screen-mini-card medium margin-top'>
                <div className='screen-mini-card-header-title'>
                  <h1>{updatedProduct ? updatedProduct.name : product.name}</h1>
                  <p className='subtle-text'>{' ventas'}</p>
                </div>
                <div className='screen-mini-card-body padding column'>
                  <div className='wrapper modify-product-title'>
                    <div className='underline-label-input big-form'>
                      <input
                        type='text'
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        maxLength='120'
                        value={title}
                      ></input>
                      <div className='underline'></div>
                      <label>Tìtulo</label>
                    </div>
                  </div>
                  <div className='wrapper sell'>
                    <div className='underline-label-input'>
                      <input
                        placeholder='$'
                        type='text'
                        maxLength='12'
                        value={'$ ' + (price > 0 ? formatNumber(price) : '')}
                        onChange={(e) => {
                          setPrice(
                            e.target.value.split('$ ')[1]
                              ? e.target.value
                                  .split('$ ')[1]
                                  .split('.')
                                  .join('')
                              : 0
                          );
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
                    </div>
                  </div>
                  <div className='width-100 separator' />
                  <h4 className='margin-top'>Caracteristicas</h4>
                  <div className='message-div blue row'>
                    <p className='paragraph-with-icon bold'>
                      <img
                        src='https://svgshare.com/i/UNm.svg'
                        alt='tip'
                        className='absolute-left-top circle badge'
                      />
                      Para no perder exposición, asegúrate de que la primera
                      foto tenga fondo blanco puro creado con un editor de
                      imágenes. No agregues bordes, logos ni marcas de agua.
                      <a href='#masconsejos'>Ver más consejos.</a>
                    </p>
                  </div>

                  <div
                    className={
                      'message-div red row' + (!imageError ? ' no-display' : '')
                    }
                  >
                    <div className='width-100 relative'>
                      <p className='paragraph-with-icon bold'>
                        <img
                          src='https://svgshare.com/i/UQW.svg'
                          alt='tip'
                          className='absolute-left-top circle badge'
                        />
                        {imageError}
                      </p>
                    </div>
                    <div className='message-div-content'>
                      <ul id='error-list' className='width-100'></ul>
                    </div>
                  </div>

                  <div
                    className={
                      'image-upload-images-container' +
                      (images.length > 0 ? ' with-scroll' : '')
                    }
                  >
                    <ul
                      className={
                        'image-slider row flex-start' +
                        (images.length > 0 ? ' fit-content' : '')
                      }
                    >
                      <div
                        className={
                          'upload-image-div center column' +
                          (images.length > 0 ? ' in-slider' : '')
                        }
                        role='button'
                        onClick={() => {
                          document.querySelector('#inputfile').click();
                        }}
                        onDragEnter={(e) => {
                          document
                            .querySelector('.upload-image-div')
                            .classList.add('on-drag');
                        }}
                        onDragLeave={(e) => {
                          document
                            .querySelector('.upload-image-div')
                            .classList.remove('on-drag');
                        }}
                        onDrop={(e) => {
                          document
                            .querySelector('.upload-image-div')
                            .classList.remove('on-drag');
                          if (
                            e.dataTransfer.files.length + images.length <=
                            10
                          ) {
                            document.querySelector('#error-list').innerHTML =
                              '';
                            for (
                              var i = 0;
                              i < e.dataTransfer.files.length;
                              i++
                            ) {
                              if (e.dataTransfer.files[i].size / 1000000 <= 5) {
                                const dataType = e.dataTransfer.files[i].type;
                                if (
                                  dataType.includes('image/jpeg') ||
                                  dataType.includes('image/png')
                                ) {
                                  CheckDimension(e.dataTransfer.files[i]);
                                } else {
                                  addErrorToImageList(
                                    'https://svgshare.com/i/UYj.svg',
                                    '- El formato no es JPG o PNG.',
                                    setImageError
                                  );
                                }
                              } else {
                                addErrorToImageList(
                                  'https://svgshare.com/i/UYj.svg',
                                  '- El archivo pesa mas de 5mb',
                                  setImageError
                                );
                              }
                            }
                            if (
                              document.querySelector('#error-list')
                                .innerHTML === ''
                            )
                              setImageError('');
                          } else {
                            document.querySelector('.message-div.red') &&
                              document
                                .querySelector('.message-div.red')
                                .classList.remove('height-auto');
                            document.querySelector('#error-list').innerHTML =
                              '';
                            setImageError('Puedes subir como máximo 10 fotos.');
                          }
                        }}
                      >
                        <img
                          src='https://svgshare.com/i/UPJ.svg'
                          alt='camara'
                        />
                        <span
                          className={
                            images.length > 0
                              ? 'small-text bold'
                              : 'subtle-text'
                          }
                        >
                          Agrega {desktopScreenCondition ? 'o arrastra ' : ''}
                          tus
                          <br /> fotos aquí
                        </span>
                        <input
                          style={{ display: 'none' }}
                          id='inputfile'
                          type='file'
                          accept='image/x-png,image/jpeg,image/jpg'
                          onChange={(e) => {
                            if (e.target.files.length + images.length <= 10) {
                              document.querySelector('#error-list').innerHTML =
                                '';
                              for (var i = 0; i < e.target.files.length; i++) {
                                if (e.target.files[i].size / 1000000 <= 5) {
                                  const dataType = e.target.files[i].type;
                                  if (
                                    dataType.includes('image/jpeg') ||
                                    dataType.includes('image/png')
                                  ) {
                                    CheckDimension(e.target.files[i]);
                                  } else {
                                    addErrorToImageList(
                                      'https://svgshare.com/i/UYj.svg',
                                      '- El formato no es JPG o PNG.',
                                      setImageError
                                    );
                                  }
                                } else {
                                  addErrorToImageList(
                                    'https://svgshare.com/i/UYj.svg',
                                    '- El archivo pesa mas de 5mb',
                                    setImageError
                                  );
                                }
                              }
                              if (
                                document.querySelector('#error-list')
                                  .innerHTML === ''
                              )
                                setImageError('');
                            } else {
                              document.querySelector('.message-div.red') &&
                                document
                                  .querySelector('.message-div.red')
                                  .classList.remove('height-auto');
                              document.querySelector('#error-list').innerHTML =
                                '';
                              setImageError(
                                'Puedes subir como máximo 10 fotos.'
                              );
                            }
                            e.target.value = '';
                          }}
                          multiple
                        ></input>
                      </div>
                      {images &&
                        images.length > 0 &&
                        images.map((image, i) => {
                          return (
                            <li className='image-slider-item' key={i}>
                              <img
                                className='center-cropped'
                                src={image}
                                alt='Subida'
                              />
                              {i === 0 && (
                                <div className='absolute-bottom width-100 cover-page'>
                                  <h3>Portada</h3>
                                </div>
                              )}
                              <div className='image-slider-item-options'>
                                <button
                                  className='image-slider-arrow-btn'
                                  onClick={() => {
                                    if (images.length > 1 && i !== 0) {
                                      setImages(move(images, i, i - 1, false));
                                    }
                                  }}
                                >
                                  <i className='fas fa-caret-left'></i>
                                </button>
                                <button
                                  className='image-slider-del-btn'
                                  onClick={() => {
                                    setImages((images) => [
                                      ...images.slice(0, i),
                                      ...images.slice(i + 1),
                                    ]);
                                  }}
                                >
                                  <img
                                    src='https://svgshare.com/i/Ucx.svg'
                                    alt='boton borrar'
                                  ></img>
                                </button>
                                <button
                                  className='image-slider-arrow-btn'
                                  onClick={() => {
                                    if (
                                      images.length > 1 &&
                                      images.length - 1 !== i
                                    ) {
                                      setImages(move(images, i, i + 1, false));
                                    }
                                  }}
                                >
                                  <i className='fas fa-caret-right'></i>
                                </button>
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
                <div className='screen-mini-card-footer flex-end'>
                  <button
                    className='secondary'
                    onClick={() => {
                      setImageError('');
                      setTitle(product.name);
                      setPrice(product.price);
                      setImages(product.images);
                    }}
                    disabled={disableFirstBtn}
                  >
                    Cancelar
                  </button>
                  <button
                    className={
                      'primary big-form' + (loadingUpdate ? ' no-padding' : '')
                    }
                    onClick={() => {
                      dispatch(
                        updateProduct({
                          _id: product._id,
                          name: title,
                          price: price,
                          images: images,
                        })
                      );
                      setDisableFirstBtn(true);
                    }}
                    disabled={disableFirstBtn}
                  >
                    {loadingUpdate ? (
                      <LoadingCircle color='blue' />
                    ) : (
                      'Confirmar'
                    )}
                  </button>
                </div>
              </div>
              <div className='screen-mini-card medium'>
                <div className='screen-mini-card-header-title column'>
                  <h4>Retiro en persona</h4>
                  <span className='subtle-text'>
                    {product.noShipping
                      ? 'No ofrecés retiro en persona'
                      : 'Ofrecés retiro en persona'}
                  </span>
                  <i
                    id='noShipping-caret'
                    className='fa fa-caret-down absolute-right'
                    aria-hidden='true'
                    onClick={() => {
                      setOpenNoShippingOptions(!openNoShippingOptions);
                    }}
                  ></i>
                </div>
                {openNoShippingOptions && (
                  <>
                    <ul>
                      <li
                        className={
                          'list-relative multiple-selection-btn' +
                          (noShipping === false ? ' selected' : '')
                        }
                      >
                        <button
                          className='list-item padding'
                          onClick={() => {
                            if (noShipping !== false) {
                              setNoShipping(false);
                            }
                          }}
                        >
                          Ofrezco
                        </button>
                      </li>
                      <li
                        className={
                          'list-relative multiple-selection-btn' +
                          (noShipping === true ? ' selected' : '')
                        }
                      >
                        <button
                          className='list-item padding'
                          onClick={() => {
                            if (noShipping !== true) {
                              setNoShipping(true);
                            }
                          }}
                        >
                          No ofrezco
                        </button>
                      </li>
                    </ul>
                    <div className='screen-mini-card-footer flex-end'>
                      <button
                        className='secondary'
                        onClick={() => {
                          setNoShipping(product.noShipping);
                          setOpenNoShippingOptions(false);
                        }}
                        disabled={disableNoShippingBtn}
                      >
                        Cancelar
                      </button>
                      <button
                        className={
                          'primary big-form' +
                          (loadingUpdate ? ' no-padding' : '')
                        }
                        onClick={() => {
                          dispatch(
                            updateProduct({ _id: product._id, noShipping })
                          );
                          setDisableNoShippingBtn(true);
                        }}
                        disabled={disableNoShippingBtn}
                      >
                        {loadingUpdate ? (
                          <LoadingCircle color='blue' />
                        ) : (
                          'Confirmar'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className='screen-mini-card medium'>
                <div className='screen-mini-card-header-title column'>
                  <h4>
                    Descripción{' '}
                    <span className='subtle-text no-user-select'>
                      {' | opcional'}
                    </span>
                  </h4>
                  <span className='subtle-text'>
                    ¿Te faltó contar algo? Agregalo acá
                  </span>

                  <i
                    id='description-caret'
                    className='fa fa-caret-down absolute-right'
                    aria-hidden='true'
                    onClick={() => {
                      setOpenDescription(!openDescription);
                    }}
                  ></i>
                </div>
                {openDescription && (
                  <>
                    <div className='screen-mini-card-body padding column'>
                      <div className='message-div blue row'>
                        <p className='paragraph-with-icon bold'>
                          <img
                            src='https://svgshare.com/i/UNm.svg'
                            alt='tip'
                            className='absolute-left-top circle badge'
                          />
                          No incluyas datos de contacto, como e-mails,
                          teléfonos, direcciones, links ni referencias a sitios
                          externos. Tampoco uses este espacio para indicar la
                          condición de tu producto.
                          <a href='#verpolitica'> Ver política</a>
                        </p>
                      </div>
                      <textarea
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        maxLength='50000'
                        placeholder='¿Te faltó algo? Agregalo como descripción.'
                      ></textarea>
                    </div>
                    <div className='screen-mini-card-footer flex-end'>
                      <button
                        className='secondary'
                        onClick={() => {
                          setDescription(
                            product.description ? product.description : ''
                          );
                          setOpenDescription(false);
                        }}
                        disabled={disableDescriptionBtn}
                      >
                        Cancelar
                      </button>
                      <button
                        className={
                          'primary big-form' +
                          (loadingUpdate ? ' no-padding' : '')
                        }
                        onClick={() => {
                          dispatch(
                            updateProduct({ _id: product._id, description })
                          );
                          setDisableDescriptionBtn(true);
                        }}
                        disabled={disableDescriptionBtn}
                      >
                        {loadingUpdate ? (
                          <LoadingCircle color='blue' />
                        ) : (
                          'Confirmar'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className='screen-mini-card medium'>
                <div className='screen-mini-card-header-title column'>
                  <h4>
                    Video{' '}
                    <span className='subtle-text no-user-select'>
                      {' | opcional'}
                    </span>
                  </h4>
                  <span className='subtle-text'>
                    Agregá el link de Youtube del video
                  </span>

                  <i
                    id='video-caret'
                    className='fa fa-caret-down absolute-right'
                    aria-hidden='true'
                    onClick={() => {
                      setOpenVideo(!openVideo);
                    }}
                  ></i>
                </div>
                {openVideo && (
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
                                validateVideoId(
                                  videoId.substring(0, 11),
                                  setValidVideoId,
                                  setVideoError
                                );
                              } else {
                                setVideoError(
                                  'Solo podés agregar links a videos de YouTube.'
                                );
                                setValidVideoId('');
                              }
                            }}
                          ></input>
                          <div
                            className={
                              'underline' + (videoError ? ' error' : '')
                            }
                          ></div>
                          <span
                            className={
                              'subtle-text' +
                              (videoError ? ' error' : ' noerror')
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
                    <div className='screen-mini-card-footer flex-end'>
                      <button
                        className='secondary'
                        disabled={disableVideoBtn}
                        onClick={() => {
                          setVideo(product.video ? product.video : '');
                          setVideoError('');
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        className={
                          'primary big-form' +
                          (loadingUpdate ? ' no-padding' : '')
                        }
                        disabled={disableVideoBtn}
                        onClick={() => {
                          dispatch(
                            updateProduct({
                              _id: product._id,
                              video: validVideoId,
                            })
                          );
                          setDisableVideoBtn(true);
                        }}
                      >
                        {loadingUpdate ? (
                          <LoadingCircle color='blue' />
                        ) : (
                          'Confirmar'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
              <div className='screen-mini-card medium'>
                <div className='screen-mini-card-header-title column'>
                  <h4>Condición</h4>
                  <span className='subtle-text'>
                    {product.isStateNew ? 'Nuevo' : 'Usado'}
                  </span>
                  <i
                    id='isstatenew-caret'
                    className='fa fa-caret-down absolute-right'
                    aria-hidden='true'
                    onClick={() => {
                      setOpenIsStateNew(!openIsStateNew);
                    }}
                  ></i>
                </div>
                {openIsStateNew && (
                  <>
                    <ul>
                      <li
                        className={
                          'list-relative multiple-selection-btn' +
                          (isStateNew === false ? ' selected' : '')
                        }
                      >
                        <button
                          className='list-item padding'
                          onClick={() => {
                            if (isStateNew !== false) {
                              setIsStateNew(false);
                            }
                          }}
                        >
                          Usado
                        </button>
                      </li>
                      <li
                        className={
                          'list-relative multiple-selection-btn' +
                          (isStateNew === true ? ' selected' : '')
                        }
                      >
                        <button
                          className='list-item padding'
                          onClick={() => {
                            if (isStateNew !== true) {
                              setIsStateNew(true);
                            }
                          }}
                        >
                          Nuevo
                        </button>
                      </li>
                    </ul>
                    <div className='screen-mini-card-footer flex-end'>
                      <button
                        className='secondary'
                        onClick={() => {
                          setIsStateNew(product.isStateNew);
                          setOpenIsStateNew(false);
                        }}
                        disabled={disableIsStateNewBtn}
                      >
                        Cancelar
                      </button>
                      <button
                        className={
                          'primary big-form' +
                          (loadingUpdate ? ' no-padding' : '')
                        }
                        onClick={() => {
                          dispatch(
                            updateProduct({ _id: product._id, isStateNew })
                          );
                          setDisableIsStateNewBtn(true);
                        }}
                        disabled={disableIsStateNewBtn}
                      >
                        {loadingUpdate ? (
                          <LoadingCircle color='blue' />
                        ) : (
                          'Confirmar'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ModifyProductScreen;
