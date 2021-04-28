import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  registerUser,
  updateUserFavorites,
} from '../Actions/userActions';
import { generateRandomNumber } from '../Utils/Utilities';
import bcrypt from 'bcryptjs';
import MessageBox from '../Components/MessageBox';
import LoadingCircle from '../Components/LoadingCircle';

const EmailValidationScreen = (props) => {
  const dispatch = useDispatch();
  const checkedEmail = localStorage.getItem('verifyEmail')
    ? JSON.parse(localStorage.getItem('verifyEmail'))
    : localStorage.getItem('doesEmailExist')
    ? localStorage.getItem('doesEmailExist')
    : null;
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error, loading: loadingLogin } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { error: errorRegistering, loading: loadingRegister } = userRegister;
  const [localError, setLocalError] = useState(false);
  const [input, setInput] = useState(['', '', '', '', '', '']);
  const [hashCode, setHashCode] = useState(
    localStorage.getItem('hashCode')
      ? JSON.parse(localStorage.getItem('hashCode'))
      : null
  );
  const [authType, setAuthType] = useState('');
  const [success, setSuccess] = useState(false);
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    (error || errorRegistering) && setLocalError(true);
  }, [error, errorRegistering]);

  useEffect(() => {
    checkedEmail === null && setLocalError(true);
  }, [checkedEmail]);

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search);
    setAuthType(urlParams.get('authType'));
  }, [props]);
  useEffect(() => {
    const loginTypeSwitch = () => {
      const urlParams = new URLSearchParams(props.location.search);
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
          props.history.push('/vender');
          break;
        case 'new-address':
          props.history.push('/nueva-direccion');
          break;
        default:
          props.history.push('./');
          break;
      }
    };
    if (success) {
      switch (authType) {
        case 'register':
          loginTypeSwitch();
          break;
        case 'changepsw':
          localStorage.removeItem('doesEmailExist');
          localStorage.setItem(
            'emailCodeValidated',
            JSON.stringify({ validated: true })
          );
          props.history.push('/cambiar-contrasena');
          break;
        default:
          props.history.push('/');
          break;
      }
      localStorage.removeItem('RegisterCacheValues');
    }
  }, [success, dispatch, props, authType]);

  useEffect(() => {
    if (!hashCode && checkedEmail) {
      const randomNumber = generateRandomNumber(6);
      const cacheHashCode = bcrypt.hashSync(randomNumber);
      setHashCode(cacheHashCode);
      localStorage.setItem('hashCode', JSON.stringify(cacheHashCode));
      emailjs.send(
        'gmail',
        'template_l9xup0q',
        {
          email: checkedEmail.email,
          subject: 'Te enviamos el código de seguridad',
          title: 'Ingresá a tu cuenta con tu código de seguridad',
          code: randomNumber,
        },
        'user_sr3l7H8k1UCzb3mvTFObR'
      );
    }
  }, [checkedEmail, hashCode]);

  useEffect(() => {
    user && setSuccess(true);
  }, [user]);

  const createOtpInputs = (error) => {
    const ammount = 6;
    const div = [];
    for (let i = 0; i < ammount; i++) {
      div.push(
        <input
          key={i}
          id={'input' + i}
          className={
            'otp-input' +
            (i === ammount - 1 ? ' no-space' : i === 2 ? ' big-space' : '') +
            (error ? ' error' : '')
          }
          type='number'
          value={input[i]}
          onPaste={(e) => {
            const filteredPasteValue = e.clipboardData
              .getData('Text')
              .replace(/\D/g, '');
            e.preventDefault();
            if (
              filteredPasteValue.length <= ammount - i &&
              filteredPasteValue.length > 1
            ) {
              filteredPasteValue
                .split('')
                .map((value, j) =>
                  setInput([
                    ...input.slice(i, i + j),
                    value,
                    ...input.slice(i + j + 1),
                  ])
                );
              setInput([
                ...input.slice(0, i),
                ...filteredPasteValue.split(''),
                ...input.slice(filteredPasteValue.length + i),
              ]);
            }
          }}
          onChange={(e) => {
            setCodeError(false);
            if (e.target.value.length <= 1) {
              setInput([
                ...input.slice(0, i),
                e.target.value,
                ...input.slice(i + 1),
              ]);
            }
            if (e.target.value.length === 1) {
              if (document.getElementById('input' + (i + 1))) {
                document.getElementById('input' + (i + 1)).focus();
              }
            }
          }}
          onKeyDown={(e) => {
            if (e.keyCode === 8 && e.target.value.length === 0) {
              if (document.getElementById('input' + (i - 1))) {
                document.getElementById('input' + (i - 1)).focus();
                setInput([...input.slice(0, i - 1), '', ...input.slice(i)]);
              }
            }
            if (
              e.keyCode !== 17 &&
              e.keyCode !== 86 &&
              e.keyCode !== 8 &&
              e.keyCode !== 67 &&
              /\D/g.test(String.fromCharCode(e.keyCode))
            )
              e.preventDefault();
          }}
        ></input>
      );
    }
    error && div.push(<span className='error'>Codigo incorrecto</span>);
    return div;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (bcrypt.compareSync(input.join(''), hashCode)) {
      if (authType === 'register') {
        if (checkedEmail.exists) {
          dispatch(
            loginUser({
              _id: checkedEmail._id,
              baseCode: '523bhf72y37n782cDFU1FN7NX',
            })
          );
        } else {
          const user = localStorage.getItem('RegisterCacheValues')
            ? JSON.parse(localStorage.getItem('RegisterCacheValues'))
            : null;
          if (user) {
            dispatch(registerUser(user));
          } else {
            alert(
              'Ha ocurrido un error con los datos de registro, volviendo a la pagina de registro'
            );
            props.history.push('/register');
          }
        }
      } else if (authType === 'changepsw') {
        setSuccess(true);
      }
      localStorage.removeItem('hashCode');
    } else {
      setCodeError(true);
    }
  };

  return (
    <>
      {localError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        <>
          <div className='extra-header'></div>
          <div className='empty-header-block'>
            <form
              onSubmit={submitHandler}
              className='screen-card login-screen'
              style={{ height: '38rem' }}
            >
              <div>
                <h1>Ingresá el código que te enviamos por e-mail</h1>
                {checkedEmail &&
                  (checkedEmail.exist ? (
                    <>
                      <p style={{ fontSize: '1.4rem' }}>
                        Te enviamos un código a tu e-mail para que puedas
                        ingresar a tu cuenta.
                      </p>

                      <div className='email-badge row top'>
                        <i className='fa fa-user'></i>
                        <p className='email-badge__user-name'>
                          {checkedEmail.email}
                        </p>
                        <input type='hidden' name='email'>
                          {checkedEmail.email}
                        </input>
                        <a
                          href='/login'
                          onClick={() =>
                            localStorage.removeItem('userCheckNameInfo')
                          }
                        >
                          <i
                            className='fa fa-times'
                            style={{ color: 'black' }}
                          ></i>
                        </a>
                      </div>
                    </>
                  ) : (
                    <p style={{ fontSize: '1.4rem' }}>
                      {'Lo enviamos a '}
                      <b>{checkedEmail.email}</b>
                      {
                        ' para confirmar que te pertenece. Si no lo encontrás revisá tu carpeta de correo no deseado.'
                      }
                    </p>
                  ))}
              </div>
              {checkedEmail && (
                <div className='otp-inputs'>{createOtpInputs(codeError)}</div>
              )}
              <button
                type='submit'
                className={
                  'primary block' +
                  (loadingLogin || loadingRegister ? ' loading-padding' : '')
                }
              >
                {loadingLogin || loadingRegister ? (
                  <LoadingCircle color='white' />
                ) : checkedEmail.exists ? (
                  'Verificar el código'
                ) : (
                  'Continuar'
                )}
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default EmailValidationScreen;
