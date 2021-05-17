import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, updateUserFavorites } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';

const EnterPassScreen = (props) => {
  const userCheckName = useSelector((state) => state.userCheckName);
  const { user } = userCheckName;
  const userLogin = useSelector((state) => state.userLogin);
  const { error, user: userSuccess, loading } = userLogin;
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
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    if (userSuccess) {
      const urlParams = new URLSearchParams(props.location.search);
      const condition = urlParams
        ? urlParams.get('loginType')
          ? true
          : false
        : false;
      if (condition) {
        switch (urlParams.get('loginType')) {
          case 'favorito':
            dispatch(
              updateUserFavorites({
                _id: props.location.search.split('item_id=')[1],
                noDelete: true,
              })
            );
            break;
          case 'vender':
            window.location.href = '/vender';
            break;
          case 'new-address':
            window.location.href = '/nueva-direccion';
            break;
          case 'product-question':
            const productQuestion = localStorage.getItem('product-question')
              ? JSON.parse(localStorage.getItem('product-question'))
              : null;
            if (productQuestion) {
              window.location.href = '/product/' + productQuestion._id;
            } else {
              window.location.href = '/';
            }
            break;
          default:
            props.history.push('/');
            break;
        }
      }
      dispatch({ type: 'USER_CHECKNAME_RESET' });
      localStorage.removeItem('userCheckNameInfo');
    }
  }, [userSuccess, dispatch, props]);
  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
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
      dispatch({ type: 'USER_VERIFYEMAILEXISTS_SUCCESS', payload: user.email });
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
          >
            {loading ? <LoadingCircle color='white' /> : 'Ingresar'}
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

export default EnterPassScreen;
