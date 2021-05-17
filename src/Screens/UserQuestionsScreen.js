import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addQuestionProduct,
  getUserQuestionProducts,
} from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';

const UserQuestionsScreen = () => {
  const dispatch = useDispatch();
  const productGetUserQuestions = useSelector(
    (state) => state.productGetUserQuestions
  );
  const { loading, error, products } = productGetUserQuestions;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: loadingUser, error: errorUser, user } = userLogin;
  const productAddQuestion = useSelector((state) => state.productAddQuestion);
  const {
    product: productQuestionAdded,
    loading: loadingAddQuestion,
    error: errorAddingQuestion,
  } = productAddQuestion;
  const [localError, setLocalError] = useState(false);
  const [disableQuestionBtn, setDisableQuestionBtn] = useState(true);
  const [localProducts, setLocalProducts] = useState([]);

  useEffect(() => {
    dispatch(getUserQuestionProducts());
  }, [dispatch]);

  useEffect(() => {
    products && setLocalProducts(products);
  }, [products]);

  useEffect(() => {
    if (productQuestionAdded) {
      const productToUpdate = localProducts.find(
        (product) =>
          product._id.toString() === productQuestionAdded._id.toString()
      );
      if (productToUpdate) {
        const index = localProducts.indexOf(productToUpdate);
        setLocalProducts([
          ...localProducts.slice(0, index),
          productQuestionAdded,
          ...localProducts.slice(index + 1),
        ]);
        dispatch({ type: 'PRODUCT_ADD_QUESTION_RESET' });
      } else {
        setLocalError(true);
      }
    }
  }, [productQuestionAdded, localProducts, dispatch]);
  useEffect(() => {
    (error || errorUser) && setLocalError(true);
  }, [error, errorUser]);

  return (
    <div className='width-100 flex-center'>
      {localError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : loadingUser || loading ? (
        <LoadingCircle color='blue' />
      ) : (
        localProducts && (
          <div className='screen margin-top'>
            {localProducts.length > 0 && (
              <div className='message-div blue row'>
                <p className='paragraph-with-icon bold'>
                  <img
                    src='https://svgshare.com/i/UNm.svg'
                    alt='tip'
                    className='absolute-left-top circle badge'
                  />
                  No uses lenguaje inapropiado ni envíes datos de contacto, como
                  e-mails, teléfonos, direcciones, links externos y redes
                  sociales.
                </p>
              </div>
            )}
            {products &&
              (localProducts.length > 0 ? (
                localProducts.map((product, i) => (
                  <div className='product-question-screen' key={product._id}>
                    <div className='product-question-screen-header'>
                      <div className='list-img-div'>
                        <img
                          className='center-cropped'
                          src={product.images[0]}
                          alt='product'
                        />
                      </div>{' '}
                      <div className='product-question-screen-header-name'>
                        <a
                          className='nodecoration'
                          href={'/product/' + product._id}
                        >
                          {product.name}
                        </a>
                      </div>{' '}
                      <div className='product-question-screen-header-price'>
                        <p>{'$ ' + product.price}</p>
                      </div>
                      <div className='product-question-screen-header-stock'>
                        <p className={product.stock <= 10 ? 'low-stock' : ''}>
                          {product.stock <= 10
                            ? '¡Quedan solo ' + product.stock + 'unidades!'
                            : 'Hay stock disponible'}
                        </p>
                      </div>
                      <div className='product-question-screen-header-condition'>
                        {!product.active ? (
                          <p>
                            {' '}
                            <img
                              src='https://svgshare.com/i/UNm.svg'
                              alt='tip'
                              className='absolute-left-top circle badge orange'
                            />
                            Inactiva
                          </p>
                        ) : product.finished ? (
                          <p>
                            {' '}
                            <img
                              src='https://svgshare.com/i/UNm.svg'
                              alt='tip'
                              className='absolute-left-top circle badge'
                            />
                            Publicación finalizada
                          </p>
                        ) : (
                          <button
                            className='primary'
                            onClick={() => {
                              window.location.href = '/checkout/shipping';
                              localStorage.setItem(
                                'localCheckout',
                                JSON.stringify({
                                  products: [
                                    {
                                      _id: product._id,
                                      seller: product.seller,
                                      price: product.price,
                                      quantity: 1,
                                    },
                                  ],
                                  editingAddress: false,
                                })
                              );
                            }}
                          >
                            Comprar
                          </button>
                        )}
                      </div>
                    </div>
                    <ul className='product-question-screen-questions'>
                      {!product.paused && !product.finished && (
                        <li>
                          <div
                            id={'new-question-div-' + i}
                            className='product-question-screen-other-question first-li-div'
                            onClick={() => {
                              if (
                                document.querySelector('#new-question-' + i)
                              ) {
                                document.querySelector(
                                  '#new-question-' + i
                                ).style.display = 'flex';
                                document.querySelector(
                                  '#new-question-div-' + i
                                ).style.display = 'none';
                              }
                            }}
                          >
                            <button className='anchor-lookalike'>
                              Hacer otra pregunta
                            </button>
                          </div>
                          <div
                            id={'new-question-' + i}
                            className='column new-question first-li-div'
                            style={{ display: 'none' }}
                          >
                            <div className='row ask-div'>
                              <input
                                id={'new-question-input-' + i}
                                type='text'
                                maxLength='2000'
                                placeholder={
                                  'Escribe tu pregunta a ' +
                                  product.seller.userName
                                }
                                onChange={(e) => {
                                  const btn = document.querySelector(
                                    '#new-question-btn-' + i
                                  );
                                  if (e.target.value.length < 10) {
                                    btn.disabled = true;
                                  } else {
                                    if (!loadingAddQuestion) {
                                      btn.disabled = false;
                                      setDisableQuestionBtn(false);
                                    }
                                    btn.disabled = disableQuestionBtn;
                                  }
                                }}
                              />
                              <button
                                id={'new-question-btn-' + i}
                                disabled={disableQuestionBtn}
                                className={
                                  'primary big-form' +
                                  (loadingAddQuestion ? ' no-padding' : '')
                                }
                                onClick={() => {
                                  if (
                                    document.querySelector(
                                      '#new-question-input-' + i
                                    ).value.length >= 10
                                  ) {
                                    dispatch(
                                      addQuestionProduct(product, {
                                        whoAsked: user._id,
                                        question: document.querySelector(
                                          '#new-question-input-' + i
                                        ).value,
                                      })
                                    );
                                    setDisableQuestionBtn(true);
                                  }
                                }}
                              >
                                {loadingAddQuestion ? (
                                  <LoadingCircle color='blue' />
                                ) : (
                                  'Preguntar'
                                )}
                              </button>
                              <button
                                className='cross-btn'
                                onClick={() => {
                                  if (
                                    document.querySelector('#new-question-' + i)
                                  ) {
                                    document.querySelector(
                                      '#new-question-' + i
                                    ).style.display = 'none';
                                    document.querySelector(
                                      '#new-question-div-' + i
                                    ).style.display = 'block';
                                  }
                                }}
                              >
                                <i className='fa fa-times'></i>
                              </button>
                            </div>
                            {errorAddingQuestion && (
                              <MessageBox variant='danger'>
                                Ha ocurrido un error con tu pregunta
                              </MessageBox>
                            )}
                          </div>
                        </li>
                      )}
                      {product.questions.map((question, j) => (
                        <li key={j}>
                          <div className='product-question-screen-question-div first-li-div'>
                            <div
                              className='question-information'
                              onClick={() => {
                                const extendedInfo = document.querySelector(
                                  '#question-information-extended-' +
                                    i +
                                    '-' +
                                    j
                                );
                                const arrow = document.querySelector(
                                  '#question-arrow-' + i + '-' + j
                                );
                                const unopenedAnswer = document.querySelector(
                                  '#unopened-answer-' + i + '-' + j
                                );
                                if (question.answer && extendedInfo) {
                                  if (extendedInfo.style.display === 'none') {
                                    extendedInfo.style.display = 'flex';
                                    unopenedAnswer.style.display = 'none';
                                    arrow.style.transform = 'rotate(180deg)';
                                  } else {
                                    extendedInfo.style.display = 'none';
                                    unopenedAnswer.style.display = 'block';
                                    arrow.style.transform = 'rotate(0)';
                                  }
                                }
                              }}
                            >
                              <p className='product-question-screen-question bold'>
                                {question.question}
                              </p>{' '}
                              {question.answer && (
                                <p
                                  id={'unopened-answer-' + i + '-' + j}
                                  className='margin-left product-question-screen-answer subtle-text'
                                >
                                  {question.answer}
                                </p>
                              )}
                              <button className='absolute-right'>
                                <i
                                  id={'question-arrow-' + i + '-' + j}
                                  className='fa fa-caret-down'
                                ></i>
                              </button>
                            </div>

                            {question.answer && (
                              <div
                                id={
                                  'question-information-extended-' + i + '-' + j
                                }
                                className='question-information-extended'
                                style={{ display: 'none' }}
                              >
                                <img
                                  src='https://svgshare.com/i/Wv_.svg'
                                  alt='svg'
                                />
                                <p>{question.answer}</p>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className='width-100 flex-center column'>
                  <h2>No tenes ninguna pregunta</h2>
                  <p>¡Empeza a preguntar a los vendedores!</p>
                </div>
              ))}
          </div>
        )
      )}
    </div>
  );
};

export default UserQuestionsScreen;
