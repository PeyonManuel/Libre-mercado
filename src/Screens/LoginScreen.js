import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserName } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';

const LoginScreen = (props) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { error, user, success, loading } = userCheckName;
  const [loginInfo, setLoginInfo] = useState(
    user &&
      (user.name
        ? user.name
        : user.email
        ? user.email
        : user.telephone
        ? user.telephone
        : '')
  );
  const [localError, setLocalError] = useState('');
  const [buttonClicked, setButtonClicked] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);
  useEffect(() => {
    if (success) {
      const urlParams = new URLSearchParams(props.location.search);
      const loginType = urlParams.get('loginType');
      if (loginType) {
        if (loginType === 'favorito') {
          window.location.href =
            '/login/enterpass?loginType=favorito&item_id=' +
            props.location.search.split('item_id=')[1];
        } else {
          window.location.href = '/login/enterpass?loginType=' + loginType;
        }
      } else {
        window.location.href = '/login/enterpass';
      }
      dispatch({ type: 'USER_LOGIN_RESET' });
      dispatch({ type: 'USER_CHECKNAME_RESET_SUCCESS' });
    }
  }, [success, props, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonClicked === 'continue') {
      if (loginInfo && loginInfo.trim()) {
        dispatch(checkUserName(loginInfo));
      } else {
        setLocalError('Completá este dato');
      }
    } else if (buttonClicked === 'register') {
      const urlParams = new URLSearchParams(props.location.search);
      const loginType = urlParams.get('loginType');
      if (loginType) {
        if (loginType === 'favorito') {
          window.location.href =
            '/register?loginType=favorito&item_id=' +
            props.location.search.split('item_id=')[1];
        } else {
          window.location.href = '/register?loginType=' + loginType;
        }
      } else {
        window.location.href = '/register';
      }
      dispatch({ type: 'USER_LOGIN_RESET' });
      dispatch({ type: 'USER_CHECKNAME_RESET_SUCCESS' });
    }
  };

  return (
    <div className='width-100 flex-center'>
      <div className='extra-header'></div>
      <form onSubmit={submitHandler} className='screen-card login-screen'>
        <h1>¡Hola! Ingresá tu teléfono, e-mail o usuario</h1>
        <div className='wrapper login'>
          <div className='underline-label-input'>
            <input
              id='login'
              type='text'
              value={loginInfo ? loginInfo : ''}
              onChange={(e) => {
                setLoginInfo(e.target.value);
                setLocalError('');
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  if (loginInfo.trim()) {
                    dispatch(checkUserName(loginInfo));
                  } else {
                    setLocalError('Completá este dato');
                  }
                }
              }}
              className={localError ? 'error' : ''}
              autoFocus
            ></input>
            <div className={'underline' + (localError ? ' error' : '')}></div>
            <label>Teléfono, e-mail o usuario</label>
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
              setButtonClicked('continue');
            }}
            disabled={loading}
          >
            {loading ? <LoadingCircle color='white' /> : 'Continuar'}
          </button>
          <button
            type='submit'
            className='secondary block'
            onClick={() => setButtonClicked('register')}
          >
            Crear cuenta
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
