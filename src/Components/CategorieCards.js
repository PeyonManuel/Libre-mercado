import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../Actions/categoryActions';
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

  const categorieCardsRef = useRef();
  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  useEffect(() => {
    const updateCategoriesContainerWidth = () => {
      const preliminaryWidth = Math.floor(window.innerWidth / 170);
      setCategoriesContainerWidth(
        preliminaryWidth % 2 !== 0
          ? (preliminaryWidth - 1) * 170
          : preliminaryWidth * 170
      );
    };
    updateCategoriesContainerWidth();
    window.addEventListener('resize', updateCategoriesContainerWidth);
    return () =>
      window.removeEventListener('resize', updateCategoriesContainerWidth);
  }, []);
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
  return (
    <div
      style={{
        minHeight: '45rem',
      }}
    >
      {categoryLoading ? (
        <LoadingCircle color='blue' />
      ) : categoryError ? (
        <MessageBox variant='danger'>{categoryError}</MessageBox>
      ) : (
        <>
          <h2>Categorías populares</h2>
          <div style={{ position: 'relative' }}>
            {window.devicePixelRatio < 2 && categorieCardsIndex > 0 && (
              <button
                className='card-back-button'
                onClick={() => {
                  setCategorieCardsIndex(categorieCardsIndex - 1);
                }}
              ></button>
            )}
            <div
              className='categorie-cards-container'
              style={{ width: categoriesContainerWidth }}
            >
              <div
                className='categorie-cards-track'
                style={{ width: Math.ceil(categories.length / 2) * 170 }}
                ref={categorieCardsRef}
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
            {window.devicePixelRatio < 2 &&
              categorieCardsRef.current &&
              parseInt(categorieCardsRef.current.style.width) >
                (categorieCardsIndex + 1) * categoriesContainerWidth && (
                <button
                  className='card-next-button'
                  onClick={() => {
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
