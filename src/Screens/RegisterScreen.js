import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userVerifyEmailExists } from '../Actions/userActions';
import { desktopScreenCondition } from '../Utils/Utilities';

const RegisterScreen = (props) => {
  document.body.style.backgroundColor = '#f7f7f7';
  const dispatch = useDispatch();
  const userVerifyEmail = useSelector((state) => state.userVerifyEmail);
  const { checkedEmail, success } = userVerifyEmail;
  const cacheValues = localStorage.getItem('RegisterCacheValues')
    ? JSON.parse(localStorage.getItem('RegisterCacheValues'))
    : null;
  const [name, setName] = useState(cacheValues ? cacheValues.name : '');
  const [surname, setSurname] = useState(
    cacheValues ? cacheValues.surname : ''
  );
  const [dni, setDni] = useState(cacheValues ? cacheValues.dni : '');
  const [email, setEmail] = useState(cacheValues ? cacheValues.email : '');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('Completá este campo');
  const [surnameError, setSurnameError] = useState('Completá este campo');
  const [dniError, setDniError] = useState('Completá este campo');
  const [emailError, setEmailError] = useState('Completá este campo');
  const [passwordError, setPasswordError] = useState(
    'Usá entre 6 y 20 caracteres.'
  );
  const [emailExistsScreen, setEmailExistsScreen] = useState(false);
  const [isSubmited, setIsSubmited] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const wrapperRef = useRef(null);

  useEffect(() => {
    localStorage.removeItem('hashCode');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const { current: wrap } = wrapperRef;
      if (wrap && !wrap.contains(event.target) && emailExistsScreen) {
        setEmailExistsScreen(false);
        setDisableBtn(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [emailExistsScreen]);

  useEffect(() => {
    if (checkedEmail && checkedEmail.exists === false && success) {
      const urlParams = new URLSearchParams(props.location.search);
      const loginType = urlParams.get('loginType');
      if (loginType) {
        if ('favorito') {
          window.location.href =
            '/email-validation?authType=register&loginType=favorito&item_id=' +
            props.location.search.split('item_id=')[1];
        } else {
          window.location.href =
            '/email-validation?authType=register&loginType=' + loginType;
        }
      } else {
        window.location.href = '/email-validation?authType=register';
      }
      dispatch({ type: 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS' });
    } else if (checkedEmail && checkedEmail.exists === true && success) {
      setEmailError('Este e-mail ya está en uso');
      setEmailExistsScreen(true);
      dispatch({ type: 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS' });
    }
  }, [checkedEmail, props, dispatch, success]);

  useEffect(() => {
    localStorage.setItem(
      'RegisterCacheValues',
      JSON.stringify({ name, surname, dni, email, password })
    );
  }, [name, surname, dni, email, password]);

  useEffect(() => {
    if (!(name && name.trim())) setNameError('Completá este campo');
    else {
      if (name.length < 2) setNameError('Ingresá un mínimo de 2 caracteres.');
      else if (/(.)\1{3,}/.test(name))
        setNameError('Evitá ingresar caracteres repetidos.');
      else setNameError('');
    }
  }, [name]);

  useEffect(() => {
    if (!(surname && surname.trim())) setSurnameError('Completá este campo');
    else {
      if (surname.length < 2)
        setSurnameError('Ingresá un mínimo de 2 caracteres.');
      else if (/(.)\1{3,}/.test(surname))
        setSurnameError('Evitá ingresar caracteres repetidos.');
      else setSurnameError('');
    }
  }, [surname]);

  useEffect(() => {
    if (!dni) setDniError('Completá este campo');
    else if (dni.length < 6) setDniError('Ingresá un mínimo de 6 caracteres.');
    else setDniError('');
  }, [dni]);

  useEffect(() => {
    if (!(email && email.trim())) setEmailError('Completá este campo');
    else {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        setEmailError('Usá el formato nombre@ejemplo.com');
      } else setEmailError('');
    }
  }, [email]);

  useEffect(() => {
    if (password.length < 6) {
      setPasswordError(
        'Te faltan ' + (6 - password.length) + ' caracteres más'
      );
      document.getElementById('check').style.opacity = 0;
    } else if (/(.)\1{3,}/.test(password)) {
      setPasswordError('Evitá ingresar caracteres repetidos.');
      document.getElementById('check').style.opacity = 0;
    } else {
      setPasswordError('');
      document.getElementById('check').style.opacity = 1;
    }
  }, [password]);
  const submitHandler = async (e) => {
    e.preventDefault();
    const verifyEmail = async (email) => {
      try {
        setDisableBtn(true);
        const data = await axios.get(
          'https://emailvalidation.abstractapi.com/v1/?api_key=' +
            process.env.REACT_APP_EMAIL_VALIDATION_API_KEY +
            '&email=' +
            email
        );
        if (
          data &&
          data.data &&
          data.data.deliverability &&
          (data.data.deliverability === 'DELIVERABLE' ||
            data.data.deliverability === 'UNKNOWN')
        ) {
          return true;
        } else {
          setDisableBtn(false);
          return false;
        }
      } catch (error) {
        setDisableBtn(false);
        setEmailError('Ha ocurrido un error, intenta nuevamente');
      }
    };
    setIsSubmited(true);
    const verifyEmailResponse = await verifyEmail(email.trim());
    if (!verifyEmailResponse) {
      console.log(verifyEmailResponse);
      if (verifyEmailResponse === undefined) {
        setEmailError('Has hecho muchos intentos');
      }
      if (verifyEmailResponse !== undefined) {
        setEmailError('Ingresá un E-mail valido');
      }
    } else {
      if (
        !(nameError || surnameError || dniError || emailError || passwordError)
      ) {
        dispatch(userVerifyEmailExists(email));
      } else {
        setDisableBtn(false);
      }
    }
  };
  return (
    <>
      {emailExistsScreen && (
        <div className='message-screen'>
          <div className='message-card screen-mini-card' ref={wrapperRef}>
            <button
              className='crossbtn'
              onClick={() => {
                setDisableBtn(false);
                setEmailExistsScreen(false);
              }}
            >
              <i className='fas fa-times'></i>
            </button>
            <h2>
              {'Ya existe una cuenta con '}
              <b>{email}</b>
            </h2>
            <div style={{ marginTop: '1.5rem' }}>
              <button
                className='primary block'
                style={{ marginBottom: '1rem' }}
                onClick={() => props.history.push('/login')}
              >
                Ingresá a tu cuenta
              </button>
              <button
                className='secondary block'
                onClick={() => {
                  setDisableBtn(false);
                  setEmailExistsScreen(false);
                  if (document.getElementById('email')) {
                    document.getElementById('email').focus();
                    document.getElementById('email').setSelectionRange(0, 0);
                  }
                }}
              >
                Usar otro e-mail
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='big-form-block'>
        <div className='register-header row'>
          {' '}
          <h1>Completá tus datos</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className='screen-card big-form-screen'>
            <div className='wrapper'>
              <div className='underline-label-input big-form'>
                <input
                  className={isSubmited && nameError ? ' error' : ''}
                  value={name}
                  type='text'
                  maxLength='20'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
                <div
                  className={
                    'underline' + (isSubmited && nameError ? ' error' : '')
                  }
                ></div>
                <label>Nombre</label>
                <span
                  className={
                    'reg-info-after' + (isSubmited && nameError ? ' error' : '')
                  }
                >
                  {isSubmited && nameError
                    ? nameError
                    : 'Ingresalo tal como figura en tu documento.'}
                </span>
              </div>
            </div>
            <div className='wrapper'>
              <div className='underline-label-input big-form'>
                <input
                  className={isSubmited && surnameError ? ' error' : ''}
                  value={surname}
                  type='text'
                  maxLength='20'
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                ></input>
                <div
                  className={
                    'underline' + (isSubmited && surnameError ? ' error' : '')
                  }
                ></div>
                <label>Apellido</label>
                <span
                  className={
                    'reg-info-after' +
                    (isSubmited && surnameError ? ' error' : '')
                  }
                >
                  {isSubmited && surnameError
                    ? surnameError
                    : 'Ingresalo tal como figura en tu documento.'}
                </span>
              </div>
            </div>
            <div className='wrapper'>
              <div className='underline-label-input big-form'>
                <input
                  className={isSubmited && dniError ? ' error' : ''}
                  value={dni}
                  type='number'
                  onChange={(e) => {
                    if (e.target.value.length <= 8) setDni(e.target.value);
                  }}
                  onKeyDown={(e) => e.keyCode === 190 && e.preventDefault()}
                ></input>
                <div
                  className={
                    'underline' + (isSubmited && dniError ? ' error' : '')
                  }
                ></div>
                <label>DNI</label>
                <span
                  className={
                    'reg-info-after' + (isSubmited && dniError ? ' error' : '')
                  }
                >
                  {isSubmited && dniError ? dniError : ''}
                </span>
              </div>
            </div>
            <div className='wrapper'>
              <div className='underline-label-input big-form'>
                <input
                  className={
                    isSubmited && emailError && !emailExistsScreen
                      ? ' error'
                      : ''
                  }
                  value={email}
                  id='email'
                  type='text'
                  maxLength='40'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></input>
                <div
                  className={
                    'underline' +
                    (isSubmited && emailError && !emailExistsScreen
                      ? ' error'
                      : '')
                  }
                ></div>
                <label>E-mail</label>
                <span
                  className={
                    'reg-info-after' +
                    (isSubmited && emailError && !emailExistsScreen
                      ? ' error'
                      : '')
                  }
                >
                  {isSubmited && emailError
                    ? emailError
                    : 'Asegurate de tener acceso a este e-mail.'}
                </span>
              </div>
            </div>
            <div className='wrapper'>
              <div className='underline-label-input big-form'>
                <input
                  className={isSubmited && passwordError ? ' error' : ''}
                  value={password}
                  type='password'
                  maxLength='20'
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                <div
                  className={
                    'underline' + (isSubmited && passwordError ? ' error' : '')
                  }
                ></div>
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
                <span
                  className={
                    'reg-info-after' +
                    (isSubmited && passwordError ? ' error' : '')
                  }
                >
                  {passwordError}
                </span>
              </div>
            </div>
            <div className='margin-top'>
              <label className='container'>
                {' '}
                Acepto los <a href='#Terminos'>Términos y Condiciones</a> y
                autorizo el uso de mis datos de acuerdo a la{' '}
                <a href='#privacidad'>Declaración de Privacidad</a>.
                <input
                  className={nameError ? ' error' : ''}
                  type='checkbox'
                  onChange={() => setDisableBtn(!disableBtn)}
                />
                <span className='checkmark'></span>
              </label>
            </div>
          </div>
          <div className={desktopScreenCondition ? 'margin-top' : ''}>
            <button
              type='submit'
              className='primary big-form'
              id='submitbtn'
              disabled={disableBtn}
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
