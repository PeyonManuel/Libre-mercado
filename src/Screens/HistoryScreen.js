import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  detailsUser,
  getHistoryDetails,
  historyRemove,
  updateUser,
} from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { desktopScreenCondition } from '../Utils/Utilities';

const HistoryScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user, error } = userLogin;
  const historyUpdate = useSelector((state) => state.historyUpdate);
  const {
    error: updateHistoryError,
    loading: loadingHistoryUpdate,
  } = historyUpdate;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { error: updateUserError, loading: loadingUserUpdate } = userUpdate;
  const userDetails = useSelector((state) => state.userDetails);
  const { error: detailsError, user: detailedUser } = userDetails;
  const userHistory = useSelector((state) => state.userHistory);
  const { history, error: historyError } = userHistory;
  const removeHistory = useSelector((state) => state.removeHistory);
  const { error: removeHistoryError } = removeHistory;
  const [administrateOpen, setAdministrateOpen] = useState(false);
  const [updateHistoryParam, setUpdateHistoryParam] = useState(false);
  const [localHistory, setLocalHistory] = useState(null);
  const [itemDeleting, setItemDeleting] = useState(null);
  useEffect(() => {
    if (loadingHistoryUpdate && itemDeleting) {
      const newLocalHistory = localHistory.filter((historyItem) => {
        console.log(historyItem._id.toString(), itemDeleting.toString());
        return historyItem._id.toString() !== itemDeleting.toString();
      });
      setLocalHistory(newLocalHistory);
      setItemDeleting(null);
    }
  }, [itemDeleting, loadingHistoryUpdate, localHistory]);
  useEffect(() => {
    user && dispatch(getHistoryDetails());
    user && dispatch(detailsUser(user._id));
  }, [user, dispatch]);
  useEffect(() => {
    history && setLocalHistory(history);
  }, [history]);
  useEffect(() => {
    detailedUser && setUpdateHistoryParam(detailedUser.updateHistory);
  }, [detailedUser]);
  return (
    <div className='width-100 flex-center'>
      {updateHistoryError ||
      error ||
      historyError ||
      removeHistoryError ||
      updateUserError ||
      detailsError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : !localHistory ? (
        <LoadingCircle color='blue' />
      ) : (
        <div className='screen'>
          {loadingUserUpdate ||
            (loadingHistoryUpdate && (
              <div className='absolute-loading'>
                <LoadingCircle color='blue' />
              </div>
            ))}
          <div className='product-list history'>
            <div className='relative'>
              <h1>Tu historial</h1>
              <span className='styled-dropdown absolute-right'>
                <button
                  className='styled-dropdown-btn'
                  onClick={() => setAdministrateOpen(!administrateOpen)}
                >
                  <span>
                    <b>Administrar</b>
                  </span>
                  <span>
                    <i
                      style={{ marginLeft: '.5rem' }}
                      className={
                        'fa fa-caret-down style-list-caret blue' +
                        (administrateOpen ? ' selected' : '')
                      }
                    ></i>
                  </span>
                </button>
              </span>
            </div>
            {administrateOpen && (
              <div className='screen-mini-card width-100 row margin-top flex-start'>
                <div
                  className={
                    'row' +
                    (!desktopScreenCondition ? ' flex-center width-100' : '')
                  }
                >
                  <h4 className='margin-right'>Registro de historial</h4>{' '}
                  <div className='switch-container margin-right'>
                    <span
                      onClick={() => {
                        dispatch(
                          updateUser({
                            updateHistory: !updateHistoryParam,
                          })
                        );
                        setUpdateHistoryParam(!updateHistoryParam);
                      }}
                      className={'switch' + (updateHistoryParam ? ' on' : '')}
                    ></span>
                  </div>
                </div>{' '}
                {desktopScreenCondition && ' |'}
                <button
                  className={
                    'secondary' +
                    (desktopScreenCondition ? ' margin-left' : ' block')
                  }
                  onClick={() => {
                    dispatch(historyRemove());
                    setLocalHistory([]);
                  }}
                >
                  Borra tu historial
                </button>
              </div>
            )}
            {localHistory.length > 0 ? (
              <div className='row top product-cards margin-top'>
                {localHistory.map((hItem) => {
                  return (
                    <Product
                      key={hItem._id}
                      product={hItem}
                      user={user && user}
                      noHover={desktopScreenCondition}
                      smallRating={desktopScreenCondition}
                      removeBtn={true}
                      setItemDeleting={setItemDeleting}
                    />
                  );
                })}
              </div>
            ) : (
              <div className='width-100 flex-center height-100'>
                <h2>
                  Aún no viste publicaciones. ¡Empezá a descubrir todo lo que
                  tenemos para vos!
                </h2>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;
