import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddresses } from '../Actions/userActions';

const AddressScreen = (props) => {
  const userUpdateAddresses = useSelector((state) => state.userUpdateAddresses);
  const { loading, error } = userUpdateAddresses;
  const currentAddress = localStorage.getItem('currentAddress')
    ? JSON.parse(localStorage.getItem('currentAddress'))
    : null;
  const [postalCode, setPostalCode] = useState(
    currentAddress ? currentAddress.postalCode : null
  );
  const [street, setStreet] = useState(
    currentAddress ? currentAddress.street : null
  );
  const [streetNumber, setStreetNumber] = useState(
    currentAddress ? currentAddress.streetNumber : null
  );
  const [additionalInformation, setAdditionalInformation] = useState(
    currentAddress ? currentAddress.additionalInformation : null
  );
  const [betweenStreets, setBetweenStreets] = useState(
    currentAddress ? currentAddress.betweenStreets : null
  );
  const [reference, setReference] = useState(
    currentAddress ? currentAddress.reference : null
  );
  const [province, setProvince] = useState(
    currentAddress ? currentAddress.province : null
  );
  const [city, setCity] = useState(currentAddress ? currentAddress.city : null);

  const [noNumberCheck, setNoNumberCheck] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);

  const dispatch = useDispatch();
  const urlParams = new URLSearchParams(props.location.search);
  const draftId = urlParams.get('draft');

  useEffect(() => {
    if (currentAddress && currentAddress.streetNumber === null) {
      setNoNumberCheck(true);
      document
        .querySelector('#no-number-check')
        .setAttribute('checked', 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const numberInput = document.querySelector('#numero');
    if (noNumberCheck && numberInput) {
      numberInput.setAttribute('readonly', 'true');
      numberInput.setAttribute('class', 'subtle-text bigger-font');
    } else {
      numberInput.removeAttribute('readonly');
      numberInput.removeAttribute('class');
    }
  }, [noNumberCheck]);

  useEffect(() => {
    if (isSubmited === true && !loading && !error) {
      props.history.push('publicar?draft=' + draftId);
    }
  }, [isSubmited, loading, error, draftId, props]);

  useEffect(() => {
    if (
      postalCode &&
      postalCode.length === 4 &&
      street &&
      province &&
      city &&
      (noNumberCheck ? reference : streetNumber)
    ) {
      document.querySelector('#submitbtn').removeAttribute('disabled');
    } else {
      document.querySelector('#submitbtn').setAttribute('disabled', true);
    }
  }, [
    postalCode,
    street,
    streetNumber,
    province,
    city,
    reference,
    noNumberCheck,
  ]);

  const handleSubmit = () => {
    dispatch(
      updateAddresses({
        _id: currentAddress ? currentAddress._id : null,
        postalCode,
        street,
        streetNumber: noNumberCheck ? null : streetNumber,
        additionalInformation,
        betweenStreets,
        reference,
        province,
        city,
      })
    );
    setIsSubmited(true);
    localStorage.removeItem('currentAddress');
  };

  return (
    <div className='big-form-block'>
      <div className='register-header row'>
        <h2>Nuevo domicilio</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className='screen-card big-form-screen'>
          <div className='wrapper'>
            <div className='underline-label-input big-form'>
              <input
                type='text'
                onChange={(e) => {
                  setPostalCode(e.target.value);
                }}
                maxLength='4'
                onKeyDown={(e) => {
                  if (
                    !(
                      (e.keyCode >= 48 && e.keyCode <= 57) ||
                      e.keyCode === 8 ||
                      e.keyCode === 37 ||
                      e.keyCode === 39 ||
                      e.keyCode === 67 ||
                      e.keyCode === 88 ||
                      e.keyCode === 86 ||
                      e.keyCode === 17 ||
                      e.keyCode === 9 ||
                      e.keyCode === 46
                    )
                  )
                    e.preventDefault();
                }}
                value={postalCode ? postalCode : ''}
              ></input>
              <div className='underline'></div>
              <label>Codigo postal *</label>
              <span className='reg-info-after'>
                Tu codigo postal debe tener 4 caracteres.
              </span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input'>
              <input
                type='text'
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
                maxLength='40'
                value={street ? street : ''}
              ></input>
              <div className='underline'></div>
              <label>Calle *</label>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input'>
              <input
                id='numero'
                type={noNumberCheck ? 'text' : 'number'}
                onChange={(e) => {
                  setStreetNumber(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (
                    !(
                      (e.keyCode >= 48 && e.keyCode <= 57) ||
                      e.keyCode === 8 ||
                      e.keyCode === 37 ||
                      e.keyCode === 39 ||
                      e.keyCode === 67 ||
                      e.keyCode === 88 ||
                      e.keyCode === 86 ||
                      e.keyCode === 9 ||
                      e.keyCode === 17 ||
                      e.keyCode === 46
                    )
                  )
                    e.preventDefault();
                }}
                maxLength='6'
                value={
                  noNumberCheck
                    ? 'Sin número'
                    : streetNumber
                    ? streetNumber
                    : ''
                }
              ></input>
              <div className='underline'></div>
              <label>Número *</label>
            </div>
            <div
              className='row flex-start relative'
              style={{ top: '.5rem', left: '-.5rem' }}
            >
              <input
                id='no-number-check'
                type='checkbox'
                onClick={(e) => {
                  if (e.target.checked) {
                    setNoNumberCheck(true);
                  } else {
                    setNoNumberCheck(false);
                  }
                }}
              ></input>
              <label
                htmlFor='no-number-check'
                className='subtle-text no-user-select'
              >
                Sin número
              </label>
            </div>
          </div>
          <div className='wrapper relative'>
            <div className='underline-label-input big-form'>
              <input
                type='text'
                onChange={(e) => {
                  setAdditionalInformation(e.target.value);
                }}
                maxLength='60'
                value={additionalInformation ? additionalInformation : ''}
              ></input>
              <div className='underline'></div>
              <label>Información adicional</label>
              <span className='reg-info-after'>
                Ej.: Piso 8, Departamento 6.
              </span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input'>
              <input
                type='text'
                onChange={(e) => {
                  setBetweenStreets(e.target.value);
                }}
                maxLength='30'
                value={betweenStreets ? betweenStreets : ''}
              ></input>
              <div className='underline'></div>
              <label>Entre calles</label>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input big-form'>
              <input
                type='text'
                onChange={(e) => {
                  setReference(e.target.value);
                }}
                maxLength='60'
                value={reference ? reference : ''}
              ></input>
              <div className='underline'></div>
              <label>Referencia{noNumberCheck && ' *'}</label>
              <span className='reg-info-after big-form'>
                Indicaciones para encontrar tu domicilio.
              </span>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input'>
              <input
                type='text'
                onChange={(e) => {
                  setProvince(e.target.value);
                }}
                maxLength='40'
                value={province ? province : ''}
              ></input>
              <div className='underline'></div>
              <label>Provincia *</label>
            </div>
          </div>
          <div className='wrapper'>
            <div className='underline-label-input'>
              <input
                type='text'
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                maxLength='40'
                value={city ? city : ''}
              ></input>
              <div className='underline'></div>
              <label>Ciudad *</label>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className={'primary big-form' + (isSubmited ? ' no-padding' : '')}
          id='submitbtn'
          disabled={true}
        >
          {isSubmited ? (
            <div id='wrapper'>
              <div className='profile-main-loader'>
                <div className='loader'>
                  <svg className='circular-loader' viewBox='25 25 50 50'>
                    <circle
                      className='loader-path'
                      cx='50'
                      cy='50'
                      r='20'
                      fill='none'
                      stroke='#70c542'
                      strokeWidth='2'
                    />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            'Guardar'
          )}
        </button>
      </form>
    </div>
  );
};

export default AddressScreen;
