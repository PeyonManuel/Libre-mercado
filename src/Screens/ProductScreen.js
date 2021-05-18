import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../Components/MessageBox';
import {
  detailsProduct,
  addQuestionProduct,
  answerQuestionProduct,
} from '../Actions/productActions';
import Rating from '../Components/Rating';
import { desktopScreenCondition, formatNumber } from '../Utils/Utilities';
import {
  detailsUser,
  updateCart,
  updateHistory,
  updateUserFavorites,
} from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';

const ProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userDetails = useSelector((state) => state.userDetails);
  const { user: detailsOfUser } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const productAddQuestion = useSelector((state) => state.productAddQuestion);
  const {
    product: productQuestionAdded,
    loading: loadingAddQuestion,
    error: errorAddingQuestion,
  } = productAddQuestion;
  const productAnswerQuestion = useSelector(
    (state) => state.productAnswerQuestion
  );
  const {
    product: productAnswerAdded,
    loading: loadingAnswer,
    error: errorAnswering,
  } = productAnswerQuestion;
  const cartUpdate = useSelector((state) => state.cartUpdate);
  const {
    success: addToCartSuccess,
    loading: loadingAddToCart,
    error: errorAddingToCart,
  } = cartUpdate;
  const userUpdateFavs = useSelector((state) => state.userUpdateFavs);
  const { error: favError } = userUpdateFavs;
  const [selectedImg, setSelectedImg] = useState(0);
  const [videoSelected, setVideoSelected] = useState(false);
  const [selectedQty, setSelectedQty] = useState(1);
  const [qtyBtnClicked, setQtyBtnClicked] = useState(false);
  const [moreThan6BtnClicked, setMoreThan6BtnClicked] = useState(false);
  const [noStock, setNoStock] = useState(false);
  const [moreQty, setMoreQty] = useState('');
  const [changeHeart, setChangeHeart] = useState(
    user &&
      user.userData &&
      user.userData.favorites &&
      product &&
      product._id &&
      user.userData.favorites.find((fav) => fav._id === product._id)
      ? true
      : false
  );
  const [carouselWidth, setCarouselWidth] = useState('');
  const [historyUpdated, setHistoryUpdated] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [disableQuestionBtn, setDisableQuestionBtn] = useState(false);
  const [userQuestions, setUserQuestions] = useState([]);
  const [otherQuestions, setOtherQuestions] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [productUnavaiable, setProductUnavaiable] = useState(false);
  const [productUnavaiableTimeout, setProductUnavaiableTiemout] = useState(
    false
  );
  const [productRating, setProductRating] = useState(null);
  const [numReviews, setNumReviews] = useState(null);
  const carouselContainerRef = useRef();

  useEffect(() => {
    if (product) {
      let productTotalRating = 0;
      let numReviews = 0;
      product.reviews.forEach((review) => {
        productTotalRating += review.rating;
        numReviews++;
      });
      setProductRating(productTotalRating / numReviews);
      setNumReviews(numReviews);
    }
  }, [product]);
  useEffect(() => {
    if (productUnavaiable) {
      clearTimeout(productUnavaiableTimeout);
      setProductUnavaiableTiemout(
        setTimeout(() => {
          setProductUnavaiable(false);
        }, 10000)
      );
    }
    // eslint-disable-next-line
  }, [productUnavaiable]);

  useEffect(() => {
    if (addToCartSuccess) {
      window.location.href = '/carrito';
      dispatch({ type: 'USER_CART_UPDATE_RESET' });
    }
  }, [addToCartSuccess, dispatch, user]);

  useEffect(() => {
    const productQuestion = localStorage.getItem('product-question')
      ? JSON.parse(localStorage.getItem('product-question'))
      : null;
    if (productQuestion && user && product) {
      if (user._id !== product.seller._id) {
        setNewQuestion(productQuestion.question);
        localStorage.removeItem('product-question');
        document.querySelector('#new-question') &&
          document.querySelector('#new-question').scrollIntoView();
      } else {
        localStorage.removeItem('product-question');
      }
    }
  }, [product, user]);
  useEffect(() => {
    document.querySelector('#product-info') &&
      console.log(document.querySelector('#product-info').clientWidth);
    carouselContainerRef.current &&
      product &&
      setCarouselWidth(
        ((product.images.length + (product.video ? 1 : 0)) *
          (260 < document.querySelector('#product-info').clientWidth
            ? 260
            : document.querySelector('#product-info').clientWidth - 40)) /
          10 +
          'rem'
      );
  }, [product, carouselContainerRef]);
  useEffect(() => {
    if (carouselContainerRef.current && product) {
      let initialPosition = null;
      let moving = false;
      let transform = 0;
      let diff = 0;
      const carouselLimit =
        (product.images.length - (product.video ? 0 : 1)) *
        -(260 < document.querySelector('#product-info').clientWidth
          ? 260
          : document.querySelector('#product-info').clientWidth - 40);
      const getStartPosition = (e) => {
        if (
          e.target.className === 'center-cropped big' ||
          'carousel-card' ||
          'track row nowrap'
        ) {
          initialPosition = e.pageX;
          moving = true;
          const transformMatrix =
            document.querySelector('.track') &&
            window
              .getComputedStyle(document.querySelector('.track'))
              .getPropertyValue('transform');
          if (transformMatrix !== 'none') {
            transform = transformMatrix
              ? parseInt(transformMatrix.split(',')[4].trim())
              : 0;
          }
        }
      };
      const getCurrentPoition = (e) => {
        if (moving && product) {
          const currentPosition = e.pageX;
          diff = transform + (currentPosition - initialPosition);
          document.querySelector('.track').style.transform =
            'translateX(' + diff + 'px)';
        }
      };
      const getMouseUp = () => {
        if (moving) {
          moving = false;
          if (diff < carouselLimit) {
            document.querySelector('.track').style.transform =
              'translateX(' + carouselLimit + 'px)';
          } else if (diff > 0) {
            document.querySelector('.track').style.transform =
              'translateX(' + 0 + 'px)';
          } else if (diff % carouselContainerRef.current.scrollWidth !== 0) {
            document.querySelector('.track').style.transform =
              'translateX(' +
              Math.round(diff / carouselContainerRef.current.scrollWidth) *
                carouselContainerRef.current.scrollWidth +
              'px)';
          }
        }
      };
      if (window.PointerEvent) {
        window.addEventListener('pointerdown', getStartPosition);
        window.addEventListener('pointermove', getCurrentPoition);
        window.addEventListener('pointerup', getMouseUp);
      } else {
        window.addEventListener('touchdown', getStartPosition);
        window.addEventListener('touchmove', getCurrentPoition);
        window.addEventListener('touchup', getMouseUp);
      }

      return () => {
        if (window.PointerEvent) {
          window.removeEventListener('pointerdown', getStartPosition);
          window.removeEventListener('pointermove', getCurrentPoition);
          window.removeEventListener('pointerup', getMouseUp);
        } else {
          window.removeEventListener('touchdown', getStartPosition);
          window.removeEventListener('touchmove', getCurrentPoition);
          window.removeEventListener('touchup', getMouseUp);
        }
      };
    }
    // eslint-disable-next-line
  });

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  useEffect(() => {
    user && !historyUpdated && dispatch(detailsUser(user._id));
  }, [user, historyUpdated, dispatch]);
  useEffect(() => {
    if (
      product &&
      detailsOfUser &&
      detailsOfUser.updateHistory &&
      !historyUpdated
    ) {
      if (
        detailsOfUser.history.find(
          (item) => item.toString() === product._id.toString()
        )
      ) {
        dispatch(updateHistory(product._id, 'readd'));
        setHistoryUpdated(true);
      } else {
        dispatch(updateHistory(product._id, 'add'));
        setHistoryUpdated(true);
      }
    }
  }, [product, dispatch, detailsOfUser, historyUpdated]);
  useEffect(() => {
    if (
      user &&
      product &&
      product._id &&
      user.userData.favorites.filter((fav) => fav._id === product._id)
        .length === 1
    ) {
      setChangeHeart(true);
    } else {
      setChangeHeart(false);
    }
    if (favError) {
      setChangeHeart(false);
    }
  }, [user, product, favError]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target) && qtyBtnClicked) {
        setQtyBtnClicked(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [qtyBtnClicked]);

  useEffect(() => {
    if (!loadingAnswer) {
      setDisableQuestionBtn(false);
      if (editingIndex || editingIndex === 0) {
        document.querySelector('#answer-' + editingIndex).style.display =
          'flex';
        document.querySelector('#edit-answer-' + editingIndex).style.display =
          'none';
        setEditingIndex(null);
      }
    }
    // eslint-disable-next-line
  }, [loadingAnswer]);

  useEffect(() => {
    !loadingAddQuestion && setNewQuestion('');
  }, [loadingAddQuestion]);

  const setQuestions = (product) => {
    if (user) {
      const temporaryUserQuestions = product.questions.filter(
        (question) => question.whoAsked.toString() === user._id
      );
      if (temporaryUserQuestions && temporaryUserQuestions.length > 0) {
        setUserQuestions(temporaryUserQuestions);
      }
      const temporaryOtherQuestions = product.questions.filter(
        (question) => question.whoAsked.toString() !== user._id
      );
      if (temporaryOtherQuestions && temporaryOtherQuestions.length > 0) {
        setOtherQuestions(temporaryOtherQuestions);
      }
    } else {
      setOtherQuestions(product.questions);
    }
  };

  useEffect(() => {
    product && setQuestions(product);
    // eslint-disable-next-line
  }, [product]);
  useEffect(() => {
    productQuestionAdded && setQuestions(productQuestionAdded);
    // eslint-disable-next-line
  }, [productQuestionAdded]);
  useEffect(() => {
    productAnswerAdded && setQuestions(productAnswerAdded);
    // eslint-disable-next-line
  }, [productAnswerAdded]);

  useEffect(() => {
    if (!loadingAddQuestion) {
      newQuestion.length > 10
        ? setDisableQuestionBtn(false)
        : setDisableQuestionBtn(true);
    }
  }, [newQuestion, loadingAddQuestion]);

  const wrapperRef = useRef(null);

  const qtyListDropdown = (stock) => {
    const list = [];
    for (let i = 1; i <= stock; i++) {
      if (i <= 6)
        list.push(
          <li
            key={i}
            className={i === selectedQty ? 'current' : ''}
            onClick={() => {
              setSelectedQty(i);
              setQtyBtnClicked(!qtyBtnClicked);
              setMoreThan6BtnClicked(false);
              setNoStock(false);
              setMoreQty('');
            }}
          >
            {i + (i === 1 ? ' unidad' : ' unidades')}
          </li>
        );
      if (i === 7)
        list.push(
          <li
            className={moreThan6BtnClicked ? 'last-item' : ''}
            onClick={() => {
              !moreThan6BtnClicked && setMoreThan6BtnClicked(true);
            }}
          >
            <span className={moreThan6BtnClicked ? 'hidden' : ''}>
              Más de 6 unidades
            </span>

            <span
              className={
                'row relative' + (moreThan6BtnClicked ? '' : ' hidden')
              }
            >
              <div className='wrapper width-100'>
                <div className='underline-label-input quantity'>
                  <input
                    className={moreThan6BtnClicked ? '' : ' hidden'}
                    id='qtynumber'
                    type='number'
                    min='1'
                    maxLength='5'
                    value={moreQty}
                    onKeyDown={(e) => {
                      setNoStock(false);
                      if (
                        e.keyCode === 189 ||
                        (e.target.value === '' && e.keyCode === 48)
                      )
                        e.preventDefault();
                      if (e.keyCode === 13) {
                        if (moreQty && moreQty <= product.stock) {
                          setSelectedQty(moreQty);
                          setQtyBtnClicked(!qtyBtnClicked);
                          setMoreThan6BtnClicked(false);
                          setNoStock(false);
                        } else {
                          setNoStock(true);
                        }
                      }
                    }}
                    onChange={(e) => setMoreQty(e.target.value)}
                  ></input>
                  <div
                    className={'underline' + (noStock ? ' error' : '')}
                  ></div>
                  <label>Cantidad</label>
                  <span
                    className={'reg-info-after' + (noStock ? ' error' : '')}
                  >
                    {noStock && 'Sin stock'}
                  </span>
                </div>
              </div>
              <button
                type='button'
                className='arrow-btn absolute-right-top'
                onClick={() => {
                  if (moreQty && moreQty <= product.stock) {
                    setSelectedQty(moreQty);
                    setQtyBtnClicked(!qtyBtnClicked);
                    setMoreThan6BtnClicked(false);
                    setNoStock(false);
                  } else {
                    setNoStock(true);
                  }
                }}
              >
                <i className='fa fa-caret-right'></i>
              </button>
            </span>
          </li>
        );
    }
    return list;
  };

  const renderQuestions = (type, questions) => {
    return (
      <div className={type === 'other' ? 'other-questions' : 'user-questions'}>
        <h3>
          {type === 'other'
            ? 'Últimas realizadas'
            : questions.length === 1
            ? 'Tu pregunta'
            : 'Tus preguntas'}
        </h3>
        <div className='width-100'>
          <ul>
            {questions.map((question, i) => {
              const splittedDate = question.answerDate
                ? question.answerDate.toString().split('-')
                : null;
              const day = splittedDate ? splittedDate[2].split('T')[0] : null;
              const month = splittedDate ? splittedDate[1] : null;
              const year = splittedDate ? splittedDate[0] : null;
              const answerDate =
                day && month && year ? day + '/' + month + '/' + year : null;
              return (
                <li className='product-question column' key={question._id}>
                  <div className='question column'>
                    <span>{question.question}</span>
                    {!question.answer &&
                      type === 'other' &&
                      user &&
                      user._id === product.seller._id && (
                        <div className='answer-div'>
                          <textarea
                            id={'answer-' + i}
                            maxLength='2000'
                            type='text'
                          ></textarea>
                          <button
                            className={
                              'primary' + (loadingAnswer ? ' no-padding' : '')
                            }
                            disabled={loadingAnswer}
                            onClick={() => {
                              if (
                                document.querySelector('#answer-' + i).value !==
                                ''
                              ) {
                                dispatch(
                                  answerQuestionProduct(
                                    { _id: product._id, name: product.name },
                                    {
                                      _id: question._id,
                                      answer: document.querySelector(
                                        '#answer-' + i
                                      ).value,
                                      whoAsked: question.whoAsked,
                                    },
                                    false
                                  )
                                );
                              }
                            }}
                          >
                            {loadingAnswer ? (
                              <LoadingCircle color='blue' />
                            ) : (
                              'Responder'
                            )}
                          </button>
                          {errorAnswering && (
                            <MessageBox variant='danger'>
                              Ha ocurrido un problema respondiendo la pregunta
                            </MessageBox>
                          )}
                        </div>
                      )}
                  </div>
                  {question.answer && (
                    <div className='question-answered'>
                      <div id={'answer-' + i} className='column'>
                        <div className='answer'>
                          <img src='https://svgshare.com/i/Wv_.svg' alt='svg' />
                          <p>
                            {question.answer}{' '}
                            {answerDate && <small>{' ' + answerDate}</small>}
                          </p>
                        </div>
                        {user && user._id === product.seller._id && (
                          <button
                            className='anchor-lookalike'
                            onClick={() => {
                              document.querySelector(
                                '#answer-' + i
                              ).style.display = 'none';
                              document.querySelector(
                                '#edit-answer-' + i
                              ).style.display = 'flex';
                            }}
                          >
                            Editar respuesta
                          </button>
                        )}
                      </div>
                      {user && user._id === product.seller._id && (
                        <div
                          id={'edit-answer-' + i}
                          className='answer-div'
                          style={{ display: 'none' }}
                        >
                          <textarea
                            id={'answer-edit-' + i}
                            maxLength='2000'
                            type='text'
                            defaultValue={question.answer}
                          ></textarea>
                          <div className='row flex-start'>
                            <button
                              className='secondary margin-right'
                              onClick={() => {
                                document.querySelector(
                                  '#answer-' + i
                                ).style.display = 'flex';
                                document.querySelector(
                                  '#edit-answer-' + i
                                ).style.display = 'none';
                              }}
                            >
                              Cancelar
                            </button>
                            <button
                              className={
                                'primary' + (loadingAnswer ? ' no-padding' : '')
                              }
                              disabled={loadingAnswer}
                              onClick={() => {
                                if (
                                  document.querySelector('#answer-edit-' + i)
                                    .value !== ''
                                ) {
                                  dispatch(
                                    answerQuestionProduct(
                                      { _id: product._id },
                                      {
                                        _id: question._id,
                                        answer: document.querySelector(
                                          '#answer-edit-' + i
                                        ).value,
                                      },
                                      true
                                    )
                                  );
                                  setEditingIndex(i);
                                }
                              }}
                            >
                              {loadingAnswer ? (
                                <LoadingCircle color='blue' />
                              ) : (
                                'Responder'
                              )}
                            </button>
                          </div>
                          {errorAnswering && (
                            <MessageBox variant='danger'>
                              Ha ocurrido un problema editando la pregunta
                            </MessageBox>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className='width-100 flex-center'>
      {loading ? (
        <LoadingCircle color='blue' />
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        product && (
          <div className='screen product-screen'>
            <div className='column'>
              {!product.active ||
                (product.finished && (
                  <div className={'message-div orange'}>
                    <div className='relative flex-center'>
                      <p className='paragraph-with-icon bold'>
                        <img
                          src='https://svgshare.com/i/UQW.svg'
                          alt='tip'
                          className='absolute-left-top circle badge'
                        />
                        Publicación{' '}
                        {!product.active && !product.finished
                          ? ' pausada'
                          : ' finalizada'}
                      </p>
                    </div>
                  </div>
                ))}
              <span>
                {'| '}
                <a href={'/productos?categoria=' + product.category._id}>
                  {product.category.name}
                </a>
              </span>
            </div>
            <div className='column screen-card'>
              <div className='top width-100 screen-segment first'>
                {desktopScreenCondition && (
                  <div className='row top product-col-1'>
                    <div className='miniature-images column'>
                      {product &&
                        product.images &&
                        product.images.map((img, i) => (
                          <img
                            key={i}
                            className={
                              'img miniature-selector' +
                              (selectedImg === i ? ' selected' : '')
                            }
                            src={img}
                            alt='Miniature preview'
                            onMouseOver={() => {
                              setVideoSelected(false);
                              setSelectedImg(i);
                            }}
                          ></img>
                        ))}
                      {product.images.length < 8 && product.video && (
                        <img
                          key='video'
                          className={
                            'img miniature-selector' +
                            (videoSelected ? ' selected' : '')
                          }
                          src='https://svgshare.com/i/WY_.svg'
                          alt='Miniature preview'
                          onMouseOver={() => {
                            setSelectedImg(-1);
                            setVideoSelected(true);
                          }}
                        ></img>
                      )}
                    </div>
                    <div
                      className='flex-center'
                      style={{ width: '85%', height: '48rem' }}
                    >
                      {selectedImg >= 0 ? (
                        <img
                          className='product-image'
                          src={
                            product &&
                            product.images &&
                            product.images[selectedImg]
                          }
                          alt='Selected product'
                        ></img>
                      ) : (
                        videoSelected && (
                          <iframe
                            className='margin-top'
                            title='Video seleccionado'
                            src={product.video}
                            allow='autoplay; encrypted-media'
                            frameBorder='0'
                            height='380px'
                            width='100%'
                          ></iframe>
                        )
                      )}
                    </div>
                    <div className='column' style={{ maxWidth: '35rem' }}></div>
                  </div>
                )}
                <div
                  id='product-info'
                  className='column top product-col-2 screen-mini-card'
                >
                  <div className='favorite-btn product-screen'>
                    <a
                      href={'/login?loginType=FAVORITE&item_id=' + product._id}
                      onClick={(e) => {
                        if (user) {
                          e.preventDefault();
                          dispatch(
                            updateUserFavorites({
                              _id: product._id,
                              noDelete: false,
                            })
                          );
                          setChangeHeart(!changeHeart);
                        }
                      }}
                    >
                      {user ? (
                        changeHeart ? (
                          <i className='fas fa-heart'></i>
                        ) : (
                          <i className='far fa-heart'></i>
                        )
                      ) : (
                        <i className='far fa-heart'></i>
                      )}
                    </a>
                  </div>
                  <div>
                    <span className='subtle-text'>
                      {product.isStateNew && product.isStateNew
                        ? 'Nuevo'
                        : 'Usado'}
                    </span>
                  </div>
                  <div>
                    <h1 className='break' style={{ margin: '0' }}>
                      {product.name && product.name}
                    </h1>
                  </div>
                  <div>
                    <Rating
                      rating={productRating && productRating}
                      numReviews={numReviews && numReviews}
                    ></Rating>
                  </div>
                  {!desktopScreenCondition && (
                    <div
                      className='carousel-container width-100 margin-top'
                      ref={carouselContainerRef}
                    >
                      <div className='carousel'>
                        <div
                          className='track row nowrap'
                          style={{
                            width: carouselWidth,
                          }}
                        >
                          {product.images.map((img, i) => (
                            <div className='carousel-card' key={i}>
                              <img
                                src={img}
                                alt='product'
                                className='center-cropped big'
                                draggable='false'
                              ></img>
                            </div>
                          ))}
                          {product.video && (
                            <div className='carousel-card'>
                              <iframe
                                className='margin-top'
                                title='Video seleccionado'
                                src={product.video}
                                allow='autoplay; encrypted-media'
                                frameBorder='0'
                                height={15.8 * 10}
                                width='100%'
                              ></iframe>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  <div className='column'>
                    <div className='row'>
                      <span className='price big row'>
                        $ {product.price && formatNumber(product.price)}{' '}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className='seller-link'>
                      Vendido por {product.seller.userName}
                    </span>
                  </div>
                  {(user
                    ? product.seller._id.toString() !== user._id.toString()
                    : true) &&
                  product.active &&
                  !product.finished ? (
                    <>
                      <div>
                        {product.stock && product.stock === 0 ? (
                          <MessageBox variant='danger'>
                            Producto fuera de stock
                          </MessageBox>
                        ) : product.stock === 1 ? (
                          <div>
                            <h2>¡Último disponible!</h2>
                          </div>
                        ) : (
                          <div>
                            <h2>Stock disponible</h2>
                            <span
                              className='styled-dropdown width-100'
                              ref={wrapperRef}
                            >
                              <button
                                className='styled-dropdown-btn'
                                onClick={() => {
                                  setQtyBtnClicked(!qtyBtnClicked);
                                }}
                              >
                                <span>{'Cantidad: '}</span>
                                <span className='selected-qty'>
                                  {selectedQty +
                                    (selectedQty === 1
                                      ? ' unidad'
                                      : ' unidades')}
                                </span>{' '}
                                <span>
                                  <i
                                    className={
                                      'fa fa-caret-down style-list-caret' +
                                      (qtyBtnClicked ? ' selected' : '')
                                    }
                                  ></i>
                                </span>
                                <span
                                  className='subtle-text'
                                  style={{ fontWeight: '100' }}
                                >
                                  {' (' + product.stock + ' disponibles)'}
                                </span>
                              </button>
                              <ul
                                className={
                                  'styled-list product-screen' +
                                  (qtyBtnClicked ? ' active' : '')
                                }
                              >
                                {product &&
                                  product.stock &&
                                  qtyListDropdown(product.stock).map(
                                    (item) => item
                                  )}
                              </ul>
                            </span>
                          </div>
                        )}
                      </div>

                      <div className='column width-100'>
                        <button
                          className='primary block'
                          onClick={() => {
                            if (product.active && !product.finished) {
                              window.location.href = '/checkout/shipping';
                              localStorage.setItem(
                                'localCheckout',
                                JSON.stringify({
                                  products: [
                                    {
                                      _id: product._id,
                                      seller: product.seller,
                                      price: product.price,
                                      quantity: selectedQty,
                                    },
                                  ],
                                  editingAddress: false,
                                })
                              );
                            }
                            if (!product.active || product.finished) {
                              setProductUnavaiable(true);
                            }
                          }}
                        >
                          Comprar ahora
                        </button>
                        <button
                          className='secondary block margin-top'
                          onClick={() => {
                            dispatch(
                              updateCart(
                                {
                                  product: product._id,
                                  quantity: selectedQty,
                                },
                                'add'
                              )
                            );
                          }}
                        >
                          {loadingAddToCart ? (
                            <LoadingCircle color='blue' />
                          ) : (
                            'Agregar al carrito'
                          )}
                        </button>
                      </div>
                    </>
                  ) : user ? (
                    product.seller._id.toString() !== user._id.toString()
                  ) : (
                    true && (
                      <div className={'message-div orange'}>
                        <div className='flex-center relative'>
                          <p className='paragraph-with-icon bold'>
                            <img
                              src='https://svgshare.com/i/UQW.svg'
                              alt='tip'
                              className='absolute-left-top circle badge'
                            />
                            Publicación
                            {!product.active && !product.finished
                              ? ' pausada'
                              : ' finalizada'}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                  {errorAddingToCart && (
                    <MessageBox variant='danger'>
                      Hubo un problema añadiendo al carrito, intentá de nuvo
                    </MessageBox>
                  )}
                  {productUnavaiable && (
                    <MessageBox block={true} variant='danger'>
                      El producto no esta disponible
                    </MessageBox>
                  )}
                </div>
              </div>

              <div className='screen-segment second'>
                {product.description && (
                  <div className='description'>
                    <h1 style={{ fontSize: '2.4rem' }}>Descripción</h1>
                    <pre className='product-description width-100'>
                      {product.description}
                    </pre>
                  </div>
                )}
                {user._id === product.seller._id
                  ? product.questions.length > 0
                  : true && (
                      <div className='product-questions separator width-100'>
                        <h1>Preguntas y respuestas</h1>
                        {((user && product.seller._id !== user._id) ||
                          !user) && (
                          <div className='column'>
                            <h4>Preguntale a {product.seller.userName}</h4>
                            <div className='row ask-div'>
                              <textarea
                                id='new-question'
                                type='text'
                                value={newQuestion}
                                maxLength='2000'
                                onChange={(e) => setNewQuestion(e.target.value)}
                                placeholder='Escribí tu pregunta...'
                              />
                              <button
                                disabled={disableQuestionBtn}
                                className={
                                  'primary big-form' +
                                  (loadingAddQuestion ? ' no-padding' : '')
                                }
                                onClick={() => {
                                  if (user) {
                                    dispatch(
                                      addQuestionProduct(product, {
                                        whoAsked: user._id,
                                        question: newQuestion,
                                      })
                                    );
                                    setDisableQuestionBtn(true);
                                  } else {
                                    localStorage.setItem(
                                      'product-question',
                                      JSON.stringify({
                                        _id: product._id,
                                        question: newQuestion,
                                      })
                                    );
                                    window.location.href =
                                      '/login?loginType=product-question';
                                  }
                                }}
                              >
                                {loadingAddQuestion ? (
                                  <LoadingCircle color='blue' />
                                ) : (
                                  'Preguntar'
                                )}
                              </button>
                            </div>
                            {errorAddingQuestion && (
                              <MessageBox variant='danger'>
                                Ha ocurrido un error con tu pregunta
                              </MessageBox>
                            )}
                          </div>
                        )}
                        <div className='column margin-top'>
                          {userQuestions.length > 0 &&
                            renderQuestions('user', userQuestions)}
                          {otherQuestions.length > 0 &&
                            renderQuestions('other', otherQuestions)}
                        </div>
                      </div>
                    )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductScreen;
