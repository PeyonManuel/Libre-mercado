import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../Actions/categoryActions';
import { desktopScreenCondition } from '../Utils/Utilities';
import LoadingCircle from './LoadingCircle';
import MessageBox from './MessageBox';

const CategorieCards = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList;
  const [categorieCardsIndex, setCategorieCardsIndex] = useState(0);
  const [categoriesContainerWidth, setCategoriesContainerWidth] = useState();
  const [disableScroll, setDisableScroll] = useState(false);
  const [firstClick, setFirstClick] = useState(false);
  const [categoryCardWidth] = useState(window.screen.width > 340 ? 170 : 135);

  const categorieCardsContainerRef = useRef();
  const categorieCardsRef = useRef();

  useEffect(() => {
    categories &&
      categories.length === 0 &&
      !desktopScreenCondition &&
      dispatch(listCategories());
  }, [dispatch, categories]);

  useEffect(() => {
    const updateCategoriesContainerWidth = () => {
      const preliminaryWidth = Math.floor(
        window.innerWidth /
          ((desktopScreenCondition ? window.devicePixelRatio : 1) *
            categoryCardWidth)
      );
      setCategoriesContainerWidth(
        preliminaryWidth % 2 !== 0
          ? (preliminaryWidth - 1) *
              (desktopScreenCondition ? window.devicePixelRatio : 1) *
              categoryCardWidth
          : preliminaryWidth *
              (desktopScreenCondition ? window.devicePixelRatio : 1) *
              categoryCardWidth
      );
    };
    updateCategoriesContainerWidth();
    window.addEventListener('resize', updateCategoriesContainerWidth);
    return () =>
      window.removeEventListener('resize', updateCategoriesContainerWidth);
  }, [categoryCardWidth]);
  useEffect(() => {
    if (categorieCardsRef.current) {
      let currentTransform = 0;
      const transformMatrix =
        categorieCardsRef.current &&
        window
          .getComputedStyle(categorieCardsRef.current)
          .getPropertyValue('transform');
      if (transformMatrix !== 'none') {
        currentTransform = transformMatrix
          ? parseInt(transformMatrix.split(',')[4].trim()) * -1
          : 0;
      }
      setCategorieCardsIndex(
        Math.floor(currentTransform / categoriesContainerWidth)
      );
    }
  }, [categoriesContainerWidth]);

  useEffect(() => {
    if (categorieCardsRef.current) {
      categorieCardsRef.current.style.transform =
        'translateX(' + -categoriesContainerWidth * categorieCardsIndex + 'px)';
    }
  }, [categorieCardsIndex, categoriesContainerWidth]);
  useEffect(() => {
    if (categorieCardsContainerRef.current && !desktopScreenCondition) {
      let initialPosition = null;
      let moving = false;
      let transform = 0;
      let diff = 0;
      const getStartPosition = (e) => {
        if (e.target.className === 'categorie-card flex-center column') {
          initialPosition = e.pageX;
          moving = true;
          const transformMatrix =
            categorieCardsRef.current &&
            window
              .getComputedStyle(categorieCardsRef.current)
              .getPropertyValue('transform');
          if (transformMatrix !== 'none') {
            transform = transformMatrix
              ? parseInt(transformMatrix.split(',')[4].trim())
              : 0;
          }
        }
      };
      const getCurrentPoition = (e) => {
        if (moving && !disableScroll) {
          const currentPosition = e.pageX;
          diff = transform + (currentPosition - initialPosition);
          categorieCardsRef.current.style.transform =
            'translateX(' + diff + 'px)';
          if (
            currentPosition - initialPosition >= window.innerWidth - 10 ||
            currentPosition - initialPosition <= -window.innerWidth + 10
          ) {
            getMouseUp();
          }
        }
      };
      const getMouseUp = () => {
        moving = false;
        if (diff % window.innerWidth !== 0) {
          setCategorieCardsIndex(
            categorieCardsIndex + (diff < transform ? +1 : -1)
          );
          setDisableScroll(true);
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
  return (
    <div className='categorie-cards-screen'>
      {categoryLoading ? (
        <LoadingCircle color='blue' />
      ) : categoryError ? (
        <MessageBox variant='danger'>{categoryError}</MessageBox>
      ) : (
        <>
          <h2>Categorías populares</h2>
          <div style={{ position: 'relative' }}>
            {desktopScreenCondition && categorieCardsIndex > 0 && (
              <button
                className='card-back-button'
                onClick={() => {
                  setCategorieCardsIndex(categorieCardsIndex - 1);
                }}
              ></button>
            )}
            <div
              className='categorie-cards-container'
              ref={categorieCardsContainerRef}
              style={{ width: categoriesContainerWidth }}
            >
              <div
                className='categorie-cards-track'
                style={{
                  width: desktopScreenCondition
                    ? Math.ceil(categories.length / 2) *
                      Math.floor(window.devicePixelRatio * categoryCardWidth)
                    : Math.ceil(categories.length / 2) * categoryCardWidth,
                }}
                ref={categorieCardsRef}
                onTransitionEnd={() => {
                  setDisableScroll(false);
                  if (categorieCardsIndex < 0) {
                    setCategorieCardsIndex(categorieCardsIndex + 1);
                    setDisableScroll(true);
                  }
                  if (
                    categoriesContainerWidth *
                      Math.ceil(
                        categorieCardsRef.current &&
                          parseInt(categorieCardsRef.current.style.width) /
                            categoriesContainerWidth
                      ) <
                      (categorieCardsIndex + 1) * categoriesContainerWidth &&
                    !desktopScreenCondition
                  ) {
                    setCategorieCardsIndex(categorieCardsIndex - 1);
                    setDisableScroll(true);
                  }
                }}
              >
                {categories.map((cat) => {
                  return (
                    <a
                      key={cat.name}
                      className='categorie-card flex-center column'
                      href={'/productos?categoria=' + cat._id}
                    >
                      <img src={cat.svg} alt='categorie' />
                      <span>{cat.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
            {((desktopScreenCondition &&
              categorieCardsRef.current &&
              parseInt(categorieCardsRef.current.style.width) >
                (categorieCardsIndex + 1) * categoriesContainerWidth) ||
              !firstClick) && (
              <button
                className='card-next-button'
                onClick={() => {
                  if (!firstClick) {
                    setFirstClick(true);
                  }
                  setCategorieCardsIndex(categorieCardsIndex + 1);
                }}
              ></button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorieCards;
