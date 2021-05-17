import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAddress, getUserAddresses } from '../Actions/addressActions';
import MessageBox from './MessageBox';

const UserDataAddress = ({ i, address }) => {
  const dispatch = useDispatch();
  const addressDelete = useSelector((state) => state.addressDelete);
  const { loading, error, deleted } = addressDelete;

  const [openOptions, setOpenOptions] = useState(false);

  const optionsRef = useRef();

  useEffect(() => {
    if (deleted) {
      dispatch(getUserAddresses());
      dispatch({ type: 'DELETE_ADDRESS_RESET' });
    }
  }, [deleted, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = optionsRef;
      if (wrap && !wrap.contains(event.target)) {
        setOpenOptions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='row width-100'>
      <div
        className={
          'column data-screen-address-div' +
          (i > 0 ? ' separator padding-top' : '')
        }
      >
        <p className='data-screen-data bold'>
          {address.street +
            ' ' +
            (address.streetNumber
              ? address.streetNumber
              : '(' + address.reference + ')')}
        </p>
        <p className='subtle-text data-screen-data'>
          {address.province + '(' + address.postalCode + '), ' + address.city}
        </p>
      </div>
      <div className='three-dots-btn' ref={optionsRef}>
        <button onClick={() => setOpenOptions(!openOptions)}>
          <img src='https://svgshare.com/i/Wuc.svg' alt='three dots' />
        </button>
        {openOptions && (
          <ul className='three-dots-options '>
            <li
              onClick={() => {
                localStorage.setItem('currentAddress', JSON.stringify(address));
                window.location.href = '/nueva-direccion';
              }}
            >
              Modificar
            </li>
            <li
              onClick={() => {
                if (!loading) {
                  setOpenOptions(false);
                  dispatch(deleteAddress(address._id));
                }
              }}
            >
              Eliminar
            </li>
            {error && (
              <MessageBox variant='danger'>
                Ha ocurrido un error eliminando el domicilio
              </MessageBox>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDataAddress;
