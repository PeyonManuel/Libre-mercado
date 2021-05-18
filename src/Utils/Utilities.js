import jwt from 'jsonwebtoken';

export const formatNumber = (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
};

export const generateRandomNumber = (length) => {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};
export const addErrorToImageList = (errorImg, errorDetail, setImageError) => {
  const errorQuantity = document.querySelector('#error-list')
    ? document.querySelector('#error-list').childElementCount + 1
    : 1;
  setImageError(
    `${
      errorQuantity + (errorQuantity > 1 ? ' fotos' : ' foto')
    } no cumple los requisitos. Revisa los errores.`
  );
  document
    .querySelector('#error-list')
    .insertAdjacentHTML(
      'beforeend',
      `<li><div class='row nowrap flex-start list-item ${
        document.querySelector('#error-list').childElementCount === 0
          ? 'first-child'
          : ''
      }'><img class='center-cropped invalid-img'src='${errorImg}' alt='error'/><p class='bold'>${errorDetail}</p></div></li>`
    );
};

export const validateVideoId = (id, setValidVideoId, setVideoError) => {
  var img = new Image();
  img.src = 'http://img.youtube.com/vi/' + id + '/mqdefault.jpg';
  img.onload = function () {
    if (this.width === 120) {
      setValidVideoId('');
      setVideoError('Solo podés agregar links a videos de YouTube.');
    } else {
      setValidVideoId(id);
      setVideoError('');
    }
  };
};
export const desktopScreenCondition =
  (window.devicePixelRatio < 2 && window.screen.width <= 2560) ||
  (window.devicePixelRatio >= 2 && window.screen.width >= 1280);

export const formatDate = (date) => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
};

export const generateAuthenticateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    { expiresIn: '10m' }
  );
};

export const verifyAuthenticationToken = (token) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET || 'somethingsecret',
    (err) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    }
  );
};

export const justMinutesFromDate = (date) => {
  return [
    date.split('T')[1].split(':')[0],
    date.split('T')[1].split(':')[1],
  ].join(':');
};

export const removeMinutesFromDate = (date) => {
  return date.split('T')[0];
};
