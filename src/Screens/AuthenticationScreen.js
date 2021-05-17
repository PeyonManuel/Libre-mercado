import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  authenticateUser,
  checkUserName,
  loginUser,
} from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import { generateAuthenticateToken } from '../Utils/Utilities';

const AuthenticationScreen = (props) => {
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userAuthenticate = useSelector((state) => state.userAuthenticate);
  const { loading, error, success } = userAuthenticate;

  const urlParams = new URLSearchParams(props.location.search);
  const [type] = useState(urlParams.get('Type'));

  const [loginInfo] = useState(
    user &&
      (user.userName
        ? user.userName
        : user.email
        ? user.email
        : user.telephone
        ? user.telephone
        : '')
  );
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(type === 'username' || type === 'email')) {
      window.location.href = '/mis-datos';
    }
  }, [type]);

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      localStorage.setItem(
        'authenticateToken',
        JSON.stringify({ token: generateAuthenticateToken(user) })
      );
      dispatch({ type: 'USER_AUTHENTICATE_RESET' });
      if (type === 'username') {
        window.location.href = '/mis-datos/cambiar-usuario';
      }
      if (type === 'email') {
        window.location.href = '/mis-datos/cambiar-email';
      }
    }
  }, [success, dispatch, user, type]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonClicked === 'login') {
      if (password !== '') {
        dispatch(authenticateUser({ _id: user._id, password: password }));
      }
      if (password === '') {
        setLocalError('Ingresá la clave');
      }
    } else if (buttonClicked === 'dontknowpass') {
      dispatch({ type: 'USER_VERIFYEMAILEXISTS_SUCCESS', payload: user.email });
      dispatch(checkUserName(loginInfo));
      props.history.push('/email-validation?authType=changepsw');
    }
  };

  return (
    <div className='width-100 flex-center'>
      <div className='extra-header'></div>
      <form onSubmit={submitHandler} className='screen-card login-screen'>
        <div>
          <h1>Ahora, tu clave</h1>
          <div className='email-badge row top'>
            <i className='fa fa-user'></i>
            <p className='email-badge__user-name'>{loginInfo}</p>
            <a href='/mis-datos'>
              <i className='fa fa-times' style={{ color: 'black' }}></i>
            </a>
          </div>
        </div>
        <div className='wrapper password'>
          <div className='underline-label-input'>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  if (password) {
                    dispatch(loginUser({ _id: user._id, password }));
                  } else {
                    setLocalError('Ingresá la clave');
                  }
                }
              }}
              autoFocus
            ></input>
            <div className={'underline' + (localError ? ' error' : '')}></div>
            <label>Clave</label>
            <span className={localError ? ' error' : ' noerror'}>
              {localError && localError}
            </span>
          </div>
        </div>
        <div>
          <button
            type='submit'
            className={'primary block' + (loading ? ' loading-padding' : '')}
            onClick={() => {
              setButtonClicked('login');
            }}
            disabled={loading}
          >
            {loading ? <LoadingCircle color='blue' /> : 'Continuar'}
          </button>
          <button
            type='submit'
            className='secondary block'
            onClick={() => {
              setButtonClicked('dontknowpass');
            }}
          >
            No sé mi clave
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthenticationScreen;
