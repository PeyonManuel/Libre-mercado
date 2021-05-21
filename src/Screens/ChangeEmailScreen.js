import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import { desktopScreenCondition } from '../Utils/Utilities';

const ChangeEmailScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmEmailError, setConfirmEmailError] = useState('');
  const [disableBtn, setDisableBtn] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState(false);

  useEffect(() => {
    if (verifiedEmail) {
      dispatch(updateUser({ email: email }));
    }
  }, [verifiedEmail, dispatch, email]);

  useEffect(() => {
    if (email !== user.email) {
      if (loading) {
        setDisableBtn(true);
      }
      if (!loading) {
        setDisableBtn(false);
      }
      if (email.length < 6) {
        setDisableBtn(true);
      }
      if (email.length >= 6 && !loading) {
        setDisableBtn(false);
      }
      if (!emailError && !loading && email.length >= 6) {
        setDisableBtn(false);
      }
    }
    if (emailError) {
      setDisableBtn(true);
    }
  }, [loading, email, emailError, user]);

  useEffect(() => {
    if (success) {
      window.location.href = '/mis-datos';
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setDisableBtn(true);
      if (error.includes('duplicate key error')) {
        setEmailError('Este e-mail ya esta en uso, elige otro.');
      }
      if (!error.includes('duplicate key error')) {
        setEmailError(error);
      }
    }
    if (!error) {
      setDisableBtn(true);
      setEmailError('');
    }
  }, [error]);
  const verifyEmail = async (email) => {
    setDisableBtn(true);
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      )
    ) {
      // try {
      //   const data = await axios.get(
      //     'https://emailvalidation.abstractapi.com/v1/?api_key=' +
      //       process.env.REACT_APP_EMAIL_VALIDATION_API_KEY +
      //       '&email=' +
      //       email
      //   );
      //   if (
      //     data &&
      //     data.data &&
      //     data.data.deliverability &&
      //     (data.data.deliverability === 'DELIVERABLE' ||
      //       data.data.deliverability === 'UNKNOWN')
      //   ) {
      //     setVerifiedEmail(true);
      //   } else {
      //     setDisableBtn(false);
      //     setEmailError('Ha ocurrido un error, intenta nuevamente');
      //   }
      // } catch (error) {
      //   setDisableBtn(false);
      //   setEmailError('Ha ocurrido un error, intenta nuevamente');
      // }
      // REACHED API QUOTA LIMIT FOR THE MONTH
      setVerifiedEmail(true);
    } else {
      setDisableBtn(false);
      setEmailError('Usá el formato nombre@ejemplo.com');
    }
  };
  return (
    <div className='width-100 flex-center'>
      {user && (
        <div className='screen flex-center' style={{ marginTop: '8rem' }}>
          <div className='flex-start column'>
            <h1>Modificar e-mail</h1>
            <div className='screen-mini-card change-user'>
              <div className='wrapper login margin-top'>
                <div className='underline-label-input big-form'>
                  <input
                    className={emailError ? ' error' : ''}
                    value={email}
                    type='text'
                    maxLength='50'
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (e.target.value === user.emailError) {
                        setEmailError(
                          'Ingresa un e-mail distinto al que estás usando.'
                        );
                      }
                      if (e.target.value !== user.email) {
                        setEmailError('');
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        if (email === confirmEmail) {
                          verifyEmail(email);
                        }
                        if (email !== confirmEmail) {
                          setConfirmEmailError(
                            'El e-mail debe coincidir con el de arriba.'
                          );
                        }
                      }
                    }}
                  ></input>
                  <div
                    className={'underline' + (emailError ? ' error' : '')}
                  ></div>
                  <label>Ingresa tu nuevo e-mail</label>
                  <span
                    className={'reg-info-after' + (emailError ? ' error' : '')}
                  >
                    {emailError
                      ? emailError
                      : 'Ingresalo tal como figura en tu documento.'}
                  </span>
                </div>
              </div>
              <div className='wrapper login' style={{ marginTop: '5rem' }}>
                <div className='underline-label-input big-form'>
                  <input
                    className={confirmEmailError ? ' error' : ''}
                    value={confirmEmail}
                    type='text'
                    maxLength='50'
                    onChange={(e) => {
                      setConfirmEmail(e.target.value);
                      setConfirmEmailError('');
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        if (email === confirmEmail) {
                          verifyEmail(email);
                        }
                        if (email !== confirmEmail) {
                          setConfirmEmailError(
                            'El e-mail debe coincidir con el de arriba.'
                          );
                        }
                      }
                    }}
                  ></input>
                  <div
                    className={
                      'underline' + (confirmEmailError ? ' error' : '')
                    }
                  ></div>
                  <label>Repite tu e-mail</label>
                  <span
                    className={
                      'reg-info-after' + (confirmEmailError ? ' error' : '')
                    }
                  >
                    {confirmEmailError
                      ? confirmEmailError
                      : 'Ingresalo tal como figura en tu documento.'}
                  </span>
                </div>
              </div>
              <div className='row flex-start margin-top padding-top'>
                <button
                  className={
                    'primary big-form margin-top' +
                    (loading ? ' no-padding' : '')
                  }
                  disabled={disableBtn}
                  onClick={() => {
                    if (email === confirmEmail) {
                      verifyEmail(email);
                    }
                    if (email !== confirmEmail) {
                      setConfirmEmailError(
                        'El e-mail debe coincidir con el de arriba.'
                      );
                    }
                  }}
                >
                  {loading ? <LoadingCircle color='blue' /> : 'Guardar'}
                </button>
                <button
                  className={
                    'secondary margin-left' +
                    (!desktopScreenCondition
                      ? ' margin-top block margin-right'
                      : '')
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

export default ChangeEmailScreen;
