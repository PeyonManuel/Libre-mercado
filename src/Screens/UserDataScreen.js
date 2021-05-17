import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses } from '../Actions/addressActions';
import { detailsUser } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import UserDataAddress from '../Components/UserDataAddress';

const UserDataScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user: details } = userDetails;
  const userAddresses = useSelector((state) => state.userAddresses);
  const {
    loading: loadingAddresses,
    error: errorAddresses,
    addresses,
  } = userAddresses;

  useEffect(() => {
    user && dispatch(getUserAddresses());
    user && dispatch(detailsUser(user._id));
  }, [user, dispatch]);

  return (
    <div className='width-100 flex-center'>
      {loading ? (
        <LoadingCircle color='blue' />
      ) : error ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        details && (
          <div className='screen data-screen flex-start column'>
            <h1>Mis datos</h1>
            <div className='column width-100'>
              <h2>Datos de cuenta</h2>
              <div className='screen-mini-card width-100 row'>
                <div className='column width-100'>
                  <div
                    className='row width-100 relative pointer'
                    onClick={() =>
                      (window.location.href = '/authentication?Type=username')
                    }
                  >
                    <p className='bold '>Usuario</p>
                    <p className='data-screen-data '>{details.userName}</p>
                    <i className='fas fa-caret-right '></i>
                  </div>
                  <div
                    className='row width-100 relative separator pointer'
                    onClick={() =>
                      (window.location.href = '/authentication?Type=email')
                    }
                  >
                    <p className='bold '>E-mail</p>
                    <p className='data-screen-data '>{details.email}</p>
                    <i className='fas fa-caret-right '></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='column width-100'>
              <h2>Datos de personales</h2>
              <div className='screen-mini-card width-100 row'>
                <div className='column width-100'>
                  <div className='row width-100 relative'>
                    <p className='bold '>Nombre y apellido</p>
                    <p className='data-screen-data '>
                      {details.name + ' ' + details.surname}
                    </p>
                    <i className='fas fa-caret-right '></i>
                  </div>
                  <div className='row width-100 relative separator'>
                    <p className='bold '>Documento</p>
                    <p className='data-screen-data '>{'DNI ' + details.dni}</p>
                    <i className='fas fa-caret-right '></i>
                  </div>
                </div>
              </div>
            </div>
            <div className='column width-100'>
              <h2>Domicilios</h2>
              <div className='screen-mini-card width-100'>
                {loadingAddresses ? (
                  <LoadingCircle color='blue' />
                ) : errorAddresses ? (
                  <MessageBox variant='danger'>
                    Ha ocurrido un error cargando los domicilios
                  </MessageBox>
                ) : (
                  addresses && (
                    <div className='column width-100'>
                      {addresses.map((address, i) => (
                        <UserDataAddress i={i} address={address} />
                      ))}
                      <div className='separator width-100 padding-top'>
                        <a href='nueva-direccion'>Agregar domicilio</a>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default UserDataScreen;
