import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNotificationUser } from '../Actions/userActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import {
  formatDate,
  justMinutesFromDate,
  removeMinutesFromDate,
} from '../Utils/Utilities';

const NotificationScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const userDeleteNotification = useSelector(
    (state) => state.userDeleteNotification
  );
  const {
    loading: loadingDeleteNotification,
    error: errorDeletingNotification,
  } = userDeleteNotification;
  const [localNotifications, setLocalNotifications] = useState([]);

  useEffect(() => {
    if (user) {
      setLocalNotifications(user.userData.notifications);
    }
  }, [user]);

  var currentTime = new Date();
  return (
    <div className='width-100 flex-center'>
      {user &&
        (localNotifications.length > 0 ? (
          errorDeletingNotification ? (
            <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
          ) : (
            <div className='screen'>
              {loadingDeleteNotification && (
                <div className='absolute-loading'>
                  <LoadingCircle color='blue' />
                </div>
              )}
              <div className='notification-screen-list'>
                <h2>Notificaciones</h2>
                <ul>
                  {localNotifications.map((noti) => (
                    <li
                      className='separator'
                      key={noti._id}
                      style={{ position: 'relative' }}
                    >
                      <div className='absolute-right-bottom'>
                        <button
                          className='anchor-lookalike'
                          onClick={() => {
                            dispatch(deleteNotificationUser(noti._id));
                            setLocalNotifications(
                              localNotifications.filter(
                                (localNoti) => localNoti._id !== noti._id
                              )
                            );
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                      <a
                        className='row top nodecoration'
                        href={noti.linkTo}
                        onClick={() =>
                          dispatch(deleteNotificationUser(noti._id))
                        }
                      >
                        <h4>
                          {noti.text.split(':')[0]}
                          <br />
                          {noti.text.split(':')[1]}
                        </h4>
                      </a>
                      <p className='notification-date absolute-right-top no-margin'>
                        <i className='fas fa-clock'></i>
                        {formatDate(currentTime) ===
                        removeMinutesFromDate(noti.createdAt)
                          ? justMinutesFromDate(noti.createdAt)
                          : removeMinutesFromDate(noti.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        ) : (
          <h2>No tienes notificaciones</h2>
        ))}
    </div>
  );
};

export default NotificationScreen;
