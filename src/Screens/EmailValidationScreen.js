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

const EmailValidationScreen = (props) => {
  const dispatch = useDispatch();
  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { checkedEmail } = userVerifyEmail;
  const userLogin = useSelector((state) => state.userLogin);
  const { success } = userLogin;
  const [input, setInput] = useState(['', '', '', '', '', '']);
  const [hashCode, setHashCode] = useState(
    localStorage.getItem('hashCode')
      ? JSON.parse(localStorage.getItem('hashCode'))
      : null
  );
  const [codeError, setCodeError] = useState(false);
  const [loginType, setLoginType] = useState('');

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
          props.history.push('./');
          break;
      }
      localStorage.removeItem('RegisterCacheValues');
    }
  }, [success, dispatch, props, loginType]);

  useEffect(() => {
    if (!hashCode && checkedEmail) {
      const length = checkedEmail && (checkedEmail.exists ? 6 : 4);
      const randomNumber = generateRandomNumber(length);
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

  const createOtpInputs = (error) => {
    const ammount = checkedEmail.exists ? 6 : 4;
    const div = [];
    for (let i = 0; i < ammount; i++) {
      div.push(
        <input
          key={i}
          id={'input' + i}
          className={
            'otp-input' +
            (i === ammount - 1
              ? ' no-space'
              : ammount === 6 && i === 2
              ? ' big-space'
              : '') +
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
      localStorage.removeItem('hashCode');
    } else {
      setCodeError(true);
    }
  };

  return (
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
                    Te enviamos un código a tu e-mail para que puedas ingresar a
                    tu cuenta.
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
                      <i className='fa fa-times' style={{ color: 'black' }}></i>
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
            <div
              className='otp-inputs'
              onClick={() => {
                const ammount = checkedEmail.exists ? 6 : 4;
                for (let i = 0; i < ammount; i++) {}
              }}
            >
              {createOtpInputs(codeError)}
            </div>
          )}
          <button type='submit' className='primary block'>
            {checkedEmail.exists ? 'Verificar el código' : 'Continuar'}
          </button>
        </form>
      </div>
    </>
  );
};

export default EmailValidationScreen;
