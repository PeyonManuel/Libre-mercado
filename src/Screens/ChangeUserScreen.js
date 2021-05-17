import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import { desktopScreenCondition } from '../Utils/Utilities';

const ChangeUserScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const [userName, setUserName] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    user && setUserName(user.userName);
  }, [user]);

  useEffect(() => {
    if (userName !== user.userName) {
      if (loading) {
        setDisableBtn(true);
      }
      if (!loading) {
        setDisableBtn(false);
      }
      if (userName.length < 3) {
        setDisableBtn(true);
      }
      if (userName.length >= 3 && !loading) {
        setDisableBtn(false);
      }
      if (!userNameError && !loading && userName.length >= 3) {
        setDisableBtn(false);
      }
    }
    if (userNameError) {
      setDisableBtn(true);
    }
  }, [loading, userName, userNameError, user]);

  useEffect(() => {
    if (success) {
      window.location.href = '/mis-datos';
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setDisableBtn(true);
      if (error.includes('duplicate key error')) {
        setUserNameError('Este usuario ya existe, elige otro.');
      }
      if (!error.includes('duplicate key error')) {
        setUserNameError(error);
      }
    }
    if (!error) {
      setDisableBtn(true);
      setUserNameError('');
    }
  }, [error]);

  return (
    <div className='width-100 flex-center'>
      {user && (
        <div className='screen flex-center screen-padding-top'>
          <div className='flex-start column'>
            <h1>Modificar usuario</h1>
            <div className='screen-mini-card change-user'>
              <div className='wrapper login margin-top'>
                <div className='underline-label-input big-form'>
                  <input
                    className={userNameError ? ' error' : ''}
                    value={userName}
                    type='text'
                    maxLength='50'
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (e.target.value === user.userName) {
                        setUserNameError(
                          'Ingresa un usuario distinto al que estás usando.'
                        );
                      }
                      if (e.target.value !== user.userName) {
                        setUserNameError('');
                      }
                    }}
                  ></input>
                  <div
                    className={'underline' + (userNameError ? ' error' : '')}
                  ></div>
                  <label>Nombre de usuario</label>
                  <span
                    className={
                      'reg-info-after' + (userNameError ? ' error' : '')
                    }
                  >
                    {userNameError
                      ? userNameError
                      : 'Ingresalo tal como figura en tu documento.'}
                  </span>
                </div>
              </div>
              <div className='padding-top'>
                <p className='bold'>
                  Para modificar tu usuario, tené en cuenta lo siguiente:
                </p>
                <ul className='with-style'>
                  <li className='margin-left'>
                    No debe tener palabras inapropiadas o vulgares
                  </li>
                  <li className='margin-left'>
                    Debe tener 1 espacio solamente
                  </li>
                  <li className='margin-left'>
                    Debe tener entre 3 y 50 caracteres
                  </li>
                </ul>
              </div>
              <div className='row flex-start margin-top padding-top'>
                <button
                  className={
                    'primary big-form' + (loading ? ' no-padding' : '')
                  }
                  disabled={disableBtn}
                  onClick={() => {
                    dispatch(updateUser({ userName: userName }));
                  }}
                >
                  {loading ? <LoadingCircle color='blue' /> : 'Modificar'}
                </button>
                <button
                  className={
                    'secondary big-form' +
                    (desktopScreenCondition ? ' margin-left' : '')
                  }
                  onClick={() => (window.location.href = '/mis-datos')}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangeUserScreen;
