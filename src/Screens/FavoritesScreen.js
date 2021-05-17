import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listByIdsProducts } from '../Actions/productActions';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import Product from '../Components/Product';
import { desktopScreenCondition } from '../Utils/Utilities';

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  const idListProduct = useSelector((state) => state.idListProduct);
  const {
    loading: loadingIdList,
    error: idListError,
    products: idListProducts,
  } = idListProduct;

  useEffect(() => {
    if (user) {
      if (user.userData.favorites.length > 0) {
        dispatch(listByIdsProducts(user.userData.favorites));
      } else {
        dispatch({ type: 'PRODUCT_ID_LIST_RESET' });
      }
    }
  }, [user, dispatch]);

  return (
    <div className='width-100 flex-center'>
      {loadingIdList ? (
        <LoadingCircle color='blue' />
      ) : idListError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : (
        <div className='screen product-list'>
          <h1>Tus favoritos</h1>
          {idListProducts && idListProducts.length > 0 ? (
            <div className='row top product-cards'>
              {idListProducts.map((hItem) => {
                return (
                  <Product
                    key={hItem._id}
                    product={hItem}
                    user={user && user}
                    noHover={desktopScreenCondition}
                    smallRating={desktopScreenCondition}
                  />
                );
              })}
            </div>
          ) : (
            <div className='width-100 flex-center'>
              <h2>Todavía no tenés favoritos</h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesScreen;
