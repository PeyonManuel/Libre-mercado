import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, updateUserFavorites } from '../Actions/userActions';

const EnterPassScreen = (props) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { user } = userCheckName;
  const userLogin = useSelector((state) => state.userLogin);
  const { error, success } = userLogin;
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
  const [loginType, setLoginType] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      props.location.search.split('?')[1] &&
      props.location.search.split('?')[1].includes('loginType')
    ) {
      switch (props.location.search.split('?')[1].split('&')[0]) {
        case 'loginType=favorito':
          setLoginType('favorito');
          break;
        case 'loginType=vender':
          setLoginType('vender');
          break;
        default:
          break;
      }
    }
  }, [props]);
  useEffect(() => {
    if (success) {
      switch (loginType) {
        case 'favorito':
          dispatch(
            updateUserFavorites({
              _id: props.location.search.split('item_id=')[1],
              noDelete: true,
            })
          );
          break;
        case 'vender':
          props.history.push('/vender');
          break;
        default:
          break;
      }
      dispatch({ type: 'USER_CHECKNAME_RESET' });
      localStorage.removeItem('userCheckNameInfo');
    }
  }, [success, dispatch, props, loginType]);
  useEffect(() => {
    error && setLocalError(error);
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (buttonClicked === 'login') {
      if (password) {
        dispatch(loginUser({ _id: user._id, password }));
      } else {
        setLocalError('Ingresá la clave');
      }
    } else if (buttonClicked === 'dontknowpass') {
      // do stuff
    }
  };

  return (
    <>
      <div className='extra-header'></div>
      <form onSubmit={submitHandler} className='screen-card login-screen'>
        <div>
          <h1>Ahora, tu clave</h1>
          <div className='email-badge row top'>
            <i className='fa fa-user'></i>
            <p className='email-badge__user-name'>{loginInfo}</p>
            <a
              href='/login'
              onClick={() => localStorage.removeItem('userCheckNameInfo')}
            >
              <i className='fa fa-times' style={{ color: 'black' }}></i>
            </a>
          </div>
        </div>
        <div className='wrapper password'>
          <div className='underline-label-input'>
            <input
              id='password'
              type='password'
              required
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
            className='primary block'
            onClick={() => {
              setButtonClicked('login');
            }}
          >
            Ingresar
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
    </>
  );
};

export default EnterPassScreen;
