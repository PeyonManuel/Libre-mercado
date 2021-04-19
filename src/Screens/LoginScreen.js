import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkUserName } from '../Actions/userActions';

const LoginScreen = (props) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { error, user, success } = userCheckName;
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
  const [loginType, setLoginType] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search);
    const condition = urlParams
      ? urlParams.get('loginType')
        ? true
        : false
      : false;
    if (condition) {
      switch (urlParams.get('loginType')) {
        case 'favorito':
          setLoginType('favorito');
          break;
        case 'vender':
          setLoginType('vender');
          break;
        default:
          break;
      }
    }
  }, [props]);
  useEffect(() => {
    error && setLocalError(error);
  }, [error]);
  useEffect(() => {
    if (success) {
      switch (loginType) {
        case 'favorito':
          props.history.push(
            '/login/enterpass?loginType=favorito&item_id=' +
              props.location.search.split('item_id=')[1]
          );
          break;
        case 'vender':
          props.history.push('/login/enterpass?loginType=vender');
          break;
        default:
          props.history.push('/login/enterpass');
          break;
      }
      dispatch({ type: 'USER_CHECKNAME_RESET_SUCCESS' });
    }
  }, [success, props, dispatch, loginType]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonClicked === 'continue') {
      if (loginInfo && loginInfo.trim()) {
        dispatch(checkUserName(loginInfo));
      } else {
        setLocalError('Completá este dato');
      }
    } else if (buttonClicked === 'register') {
      switch (loginType) {
        case 'favorito':
          props.history.push(
            '/register?loginType=favorito&item_id=' +
              props.location.search.split('item_id=')[1]
          );
          break;
        case 'vender':
          props.history.push('/register?loginType=vender');
          break;
        default:
          props.history.push('/register');
          break;
      }
    }
  };

  return (
    <>
      <div className='extra-header'></div>
      <form onSubmit={submitHandler} className='screen-card login-screen'>
        <h1>¡Hola! Ingresá tu teléfono, e-mail o usuario</h1>
        <div className='wrapper'>
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
            className='primary block'
            onClick={() => {
              setButtonClicked('continue');
            }}
          >
            Continuar
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
    </>
  );
};

export default LoginScreen;
