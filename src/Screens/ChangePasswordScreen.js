import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailsUser,
  loginUserWithCode,
  updateUser,
} from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';

const ChangePasswordScreen = (props) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, error } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const {
    user: loggedUser,
    error: loginError,
    loading: loadingUser,
  } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    user: userUpdated,
    error: updateError,
    loading: loadingUserUpdate,
  } = userUpdate;

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isSubmited, setIsSubmited] = useState(false);
  const [localError, setLocalError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem('userCheckNameInfo')
      ? JSON.parse(localStorage.getItem('userCheckNameInfo'))
      : null;
    if (userId) {
      dispatch(detailsUser(userId._id));
    } else {
      setLocalError(true);
    }
  }, [dispatch]);

  useEffect(() => {
    (error || loginError || updateError) && setLocalError(true);
    updateError && localStorage.removeItem('userInfo');
  }, [error, loginError, updateError]);

  useEffect(() => {
    if (userUpdated) window.location.href = '/';
  }, [userUpdated, props]);

  useEffect(() => {
    !loadingUser &&
      !userUpdated &&
      isSubmited &&
      dispatch(updateUser({ password }, true));
  }, [loggedUser, dispatch, password, userUpdated, isSubmited, loadingUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(
        loginUserWithCode(user._id, process.env.REACT_APP_CHANGE_PSW_CODE)
      );
      setIsSubmited(true);
    } else {
      setConfirmPasswordError('Las claves deben ser iguales');
    }
  };
  return (
    <div className='width-100 flex-center'>
      {localError ? (
        <MessageBox variant='danger'>
          Ha ocurrido un error, por favor comienza de nuevo el proceso para
          cambiar la clave.
        </MessageBox>
      ) : loading ? (
        <LoadingCircle color='blue' />
      ) : (
        <form onSubmit={submitHandler} style={{ marginTop: '8rem' }}>
          <div className='screen-mini-card medium'>
            <div className='screen-mini-card-header'>
              <h2>Cambia tu clave</h2>
            </div>
            <div className='screen-card big-form-screen'>
              <div className='wrapper'>
                <div className='underline-label-input big-form'>
                  <input
                    value={password}
                    type='password'
                    maxLength='20'
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                  ></input>
                  <div></div>
                  <label>Clave</label>
                  <i
                    className='fas fa-check fa-xs'
                    id='check'
                    style={{ opacity: '0' }}
                  ></i>
                  <i className='far fa-question-circle'></i>
                  <div className='reg-help subtle-text'>
                    Tu clave debe tener entre 6 y 20 caracteres. No incluyas tu
                    nombre, apellido o e-mail, ni caracteres idénticos
                    consecutivos.
                  </div>
                </div>
              </div>
              <div className='wrapper'>
                <div className='underline-label-input big-form'>
                  <input
                    value={confirmPassword}
                    type='password'
                    maxLength='20'
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                  ></input>
                  <div
                    className={
                      'underline' + (confirmPasswordError ? ' error' : '')
                    }
                  ></div>
                  <label>Confirmar clave</label>
                  <span
                    className={
                      'reg-info-after' + (confirmPasswordError ? ' error' : '')
                    }
                  >
                    {confirmPasswordError}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <button
            type='submit'
            className={
              'primary big-form' +
              (loadingUserUpdate || loading || loadingUser ? ' no-padding' : '')
            }
            id='submitbtn'
            disabled={
              password.length < 6 || loadingUserUpdate || loading || loadingUser
            }
          >
            {loadingUserUpdate || loading || loadingUser ? (
              <LoadingCircle color='white' />
            ) : (
              'Confirmar'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ChangePasswordScreen;
