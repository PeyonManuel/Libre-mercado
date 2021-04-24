import React, { useEffect, useRef, useState } from 'react';

const HomeScreenExhibitor = () => {
  const exhibitorRef = useRef();
  const [index, setIndex] = useState(1);
  const [disableBtns, setDisableBtns] = useState(false);
  const [disableScroll, setDisableScroll] = useState(false);

  const items =
    window.devicePixelRatio < 2
      ? [
          'https://http2.mlstatic.com/D_NQ_797135-MLA45643423773_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_953329-MLA45598416456_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_895676-MLA45598052818_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_908982-MLA45599687016_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_843709-MLA45630710225_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_797135-MLA45643423773_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_953329-MLA45598416456_042021-OO.webp',
        ]
      : [
          'https://http2.mlstatic.com/D_NQ_970780-MLA45598416468_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_601816-MLA45598361317_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_606224-MLA45599436546_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_736003-MLA45630645358_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_644199-MLA45643429697_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_970780-MLA45598416468_042021-OO.webp',
          'https://http2.mlstatic.com/D_NQ_601816-MLA45598361317_042021-OO.webp',
        ];
  useEffect(() => {
    for (let i = 1; i < items.length; i++) {
      setTimeout(() => {
        document.querySelector('.card-next-button') &&
          document.querySelector('.card-next-button').click();
      }, 5000 * i);
    }
  }, []);

  const exhibitorContainerRef = useRef();

  useEffect(() => {
    if (exhibitorContainerRef.current) {
      let initialPosition = null;
      let moving = false;
      let transform = 0;
      let diff = 0;
      const carouselLimit =
        (items.length - 1) * -exhibitorContainerRef.current.scrollWidth;
      const getStartPosition = (e) => {
        if (e.target.className === 'exhibitor-img') {
          initialPosition = e.pageX;
          moving = true;
          const transformMatrix =
            exhibitorRef.current &&
            window
              .getComputedStyle(exhibitorRef.current)
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
          exhibitorRef.current.style.transform = 'translateX(' + diff + 'px)';
          if (
            currentPosition - initialPosition >= window.screen.width - 10 ||
            currentPosition - initialPosition <= -window.screen.width + 10
          ) {
            getMouseUp();
          }
        }
      };
      const getMouseUp = () => {
        moving = false;
        if (diff % window.screen.width !== 0) {
          exhibitorRef.current.style.transition = '0.5s';
          exhibitorRef.current.style.transform =
            'translateX(' +
            Math.round(diff / window.screen.width) * window.screen.width +
            'px)';
          setIndex(
            Math.round(
              (exhibitorRef.current.scrollWidth -
                exhibitorContainerRef.current.scrollWidth) /
                window.screen.width
            )
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
  useEffect(() => {
    console.log(index);
  }, [index]);
  return (
    <div className='exhibitor-container' ref={exhibitorContainerRef}>
      {window.devicePixelRatio < 2 && (
        <button
          disabled={disableBtns}
          onClick={() => {
            clearTimeout(0);
            setDisableBtns(true);
            exhibitorRef.current.style.transition = '0.5s';
            exhibitorRef.current.style.transform =
              'translateX(' + (index - 1) * -window.screen.width + 'px)';
            setIndex(index - 1);
          }}
          className='card-back-button exhibitor'
        ></button>
      )}
      <div
        className='fit-content row home-screen-exhibitor'
        style={{ transform: 'translateX(' + -window.screen.width + 'px)' }}
        onTransitionEnd={() => {
          exhibitorRef.current.style.transition = 'none';
          if (index === 0) {
            exhibitorRef.current.style.transform =
              'translateX(' + (items.length - 2) * -window.screen.width + 'px)';
            setIndex(items.length - 2);
          } else if (index === items.length - 1) {
            exhibitorRef.current.style.transform =
              'translateX(' + -window.screen.width + 'px)';
            setIndex(1);
          }
          setDisableBtns(false);
          setDisableScroll(false);
        }}
        ref={exhibitorRef}
      >
        {items.map((item, i) => (
          <div className='home-item' key={i}>
            <img src={item} alt='item' className='exhibitor-img'></img>
          </div>
        ))}
      </div>
      {window.devicePixelRatio < 2 && (
        <button
          disabled={disableBtns}
          onClick={() => {
            setDisableBtns(true);
            exhibitorRef.current.style.transition = '0.5s';
            exhibitorRef.current.style.transform =
              'translateX(' + (index + 1) * -window.screen.width + 'px)';
            setIndex(index + 1);
          }}
          className='card-next-button exhibitor'
        ></button>
      )}
    </div>
  );
};

export default HomeScreenExhibitor;
