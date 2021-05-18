import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, updateAddress } from '../Actions/addressActions';
import { listByIdsProducts } from '../Actions/productActions';
import { detailsUser } from '../Actions/userActions';
import CheckoutSideBar from '../Components/CheckoutSideBar';
import LoadingCircle from '../Components/LoadingCircle';
import MessageBox from '../Components/MessageBox';
import { desktopScreenCondition } from '../Utils/Utilities';

const CheckoutScreen = (props) => {
  const dispatch = useDispatch();
  const idListProduct = useSelector((state) => state.idListProduct);
  const { loading, error, products } = idListProduct;
  const userLogin = useSelector((state) => state.userLogin);
  const { error: userError, user } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    error: userDetailsError,
    user: details,
  } = userDetails;
  const userAddresses = useSelector((state) => state.userAddresses);
  const {
    loading: loadingAddresses,
    error: errorAddresses,
    addresses,
  } = userAddresses;

  const [localError, setLocalError] = useState(false);
  const [checkout, setCheckout] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [buying, setBuying] = useState(false);
  const [totalPackages, setTotalPackages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [renderPackages, setRenderPackages] = useState([]);
  const [packages, setPackages] = useState(null);

  useEffect(() => {
    setCheckout(
      localStorage.getItem('localCheckout')
        ? JSON.parse(localStorage.getItem('localCheckout'))
        : null
    );
  }, []);

  useEffect(() => {
    (error || userDetailsError || userError || errorAddresses) &&
      setLocalError(true);
  }, [error, userError, userDetailsError, errorAddresses]);

  useEffect(() => {
    if (checkout) {
      if (!loading && !products) {
        dispatch(
          listByIdsProducts([checkout.products.map((product) => product._id)])
        );
      }
      localStorage.setItem(
        'localCheckout',
        JSON.stringify({ ...checkout, editingAddress: false })
      );
    }
  }, [dispatch, checkout, loading, products]);

  useEffect(() => {
    user && dispatch(detailsUser(user._id));
    user && dispatch(getUserAddresses());
  }, [user, dispatch]);

  useEffect(() => {
    if (details && addresses) {
      const lastUsedAddress = addresses.find(
        (address) => address.lastUsed === true
      );
      if (lastUsedAddress) {
        setSelectedAddress(lastUsedAddress);
      } else {
        setSelectedAddress(addresses[0]);
      }
    }
  }, [details, addresses]);

  useEffect(() => {
    switch (props.history.location.pathname) {
      case '/checkout/shipping/addressHub':
        setEditingAddress(true);
        setBuying(false);
        break;
      case '/checkout/buying':
        setBuying(true);
        setEditingAddress(false);
        break;
      default:
        setBuying(false);
        setEditingAddress(false);
        break;
    }
  }, [props]);

  useEffect(() => {
    if (selectedAddress === undefined) {
      setEditingAddress(true);
    }
  }, [selectedAddress]);

  const checkoutShipping = () => {
    return (
      <div className='checkout-shipping'>
        <h1>Opciones de envío a</h1>
        <div className='checkout-address'>
          {desktopScreenCondition && (
            <div className='svg-container'>
              <img src='https://svgshare.com/i/X3J.svg' alt='Ubicación'></img>
            </div>
          )}
          <div className='checkout-address-details'>
            <span className='street'>
              {selectedAddress.street +
                ' ' +
                (selectedAddress.streetNumber
                  ? selectedAddress.streetNumber
                  : '') +
                (selectedAddress.reference
                  ? ' - ' + selectedAddress.reference
                  : '')}
            </span>
            <span>
              {'C.P. ' +
                selectedAddress.postalCode +
                ' - ' +
                selectedAddress.city +
                ', ' +
                selectedAddress.province}
            </span>
            <span>
              {details.name +
                ' ' +
                details.surname +
                (details.telephone ? details.telephone : '')}
            </span>
          </div>
          <button
            className='anchor-lookalike'
            onClick={() => props.history.push('/checkout/shipping/addressHub')}
          >
            Editar o elegir otro
          </button>
        </div>
      </div>
    );
  };

  const addressHub = () => {
    return (
      <div className='checkout-address-hub'>
        <h1>Mis domicilios</h1>
        {addresses.map((address) => (
          <div
            key={address._id}
            className={
              'checkout-address' +
              (selectedAddress._id.toString() === address._id.toString()
                ? ' selected'
                : '')
            }
            onClick={() => setSelectedAddress(address)}
          >
            <div className='checkout-address-details'>
              <span className='street'>
                {address.street +
                  ' ' +
                  (address.streetNumber ? address.streetNumber : '') +
                  (address.reference ? ' - ' + address.reference : '')}
              </span>
              <span>
                {'C.P. ' +
                  address.postalCode +
                  ' - ' +
                  address.city +
                  ', ' +
                  address.province}
              </span>
              <span>
                {details.name +
                  ' ' +
                  details.surname +
                  (details.telephone ? details.telephone : '')}
              </span>
            </div>
            <button
              className='anchor-lookalike'
              onClick={() => {
                dispatch(updateAddress({ ...address, lastUsed: true }));
                localStorage.setItem(
                  'localCheckout',
                  JSON.stringify({
                    ...checkout,
                    editingAddress: true,
                  })
                );
                localStorage.setItem('currentAddress', JSON.stringify(address));
                window.location.href = '/nueva-direccion';
              }}
            >
              Editar
            </button>
          </div>
        ))}
        {selectedAddress === undefined && (
          <p>No tenés ninguna dirección registrada</p>
        )}
        <div className='checkout-address-hub-buttons'>
          {selectedAddress !== undefined && (
            <button
              className={
                'primary' +
                (desktopScreenCondition ? ' margin-right' : ' block')
              }
              onClick={() => {
                dispatch(
                  updateAddress({
                    ...selectedAddress,
                    lastUsed: true,
                  })
                );
                props.history.push('/checkout/shipping');
              }}
            >
              Continuar
            </button>
          )}
          <button
            className={
              'secondary' + (!desktopScreenCondition ? ' margin-top block' : '')
            }
            onClick={() => {
              localStorage.setItem(
                'localCheckout',
                JSON.stringify({
                  ...checkout,
                  editingAddress: true,
                })
              );
              window.location.href = '/nueva-direccion';
            }}
          >
            Agregar domicilio
          </button>
        </div>
      </div>
    );
  };

  React.useMemo(() => {
    if (checkout && products) {
      const sellers = [
        ...new Set(checkout.products.map((product) => product.seller)),
      ];
      const sellersPackages = sellers.map((seller) => {
        return { seller, products: [] };
      });
      checkout.products.forEach((product) => {
        const thisProductSeller = sellersPackages.find(
          (seller) => seller.seller === product.seller
        );
        sellersPackages[
          sellersPackages.indexOf(thisProductSeller)
        ].products.push({
          _id: product._id,
          price: product.price,
          quantity: product.quantity,
        });
      });
      let packageArray = [{ seller: sellersPackages[0].seller, products: [] }];
      let totalPackagesCounter = 1;
      let totalProductsAcumulator = 0;
      let totalPriceAcumulator = 0;
      sellersPackages.forEach((seller) => {
        seller.products.forEach((product) => {
          const productWithDetails = products.find(
            (detProduct) => detProduct._id.toString() === product._id
          );
          let productQuantity = product.quantity;
          while (productQuantity > 0) {
            let lastPackage = packageArray[packageArray.length - 1];
            let lastPackageTotalQuantity = 0;
            lastPackage.products.forEach((product) => {
              lastPackageTotalQuantity =
                lastPackageTotalQuantity + product.quantity;
            });
            if (
              lastPackageTotalQuantity + 1 <= 5 &&
              seller.seller.toString() === lastPackage.seller.toString()
            ) {
              packageArray[packageArray.length - 1].products.push({
                _id: product._id,
                name: productWithDetails ? productWithDetails.name : '',
                image: productWithDetails.cover ? productWithDetails.cover : '',
                price: product.price,
                quantity:
                  productQuantity > 5 - lastPackageTotalQuantity
                    ? 5 - lastPackageTotalQuantity
                    : productQuantity,
              });
              const thisProductQuantity =
                productQuantity > 5 - lastPackageTotalQuantity
                  ? 5 - lastPackageTotalQuantity
                  : productQuantity;
              productQuantity = productQuantity - thisProductQuantity;
              totalProductsAcumulator =
                totalProductsAcumulator + thisProductQuantity;
              totalPriceAcumulator =
                totalPriceAcumulator + thisProductQuantity * product.price;
            } else {
              packageArray.push({
                seller: seller.seller.toString(),
                products: [
                  {
                    _id: product._id,
                    name: productWithDetails.name
                      ? productWithDetails.name
                      : '',
                    image: productWithDetails.cover
                      ? productWithDetails.cover
                      : '',
                    price: product.price,
                    quantity: productQuantity > 5 ? 5 : productQuantity,
                  },
                ],
              });
              const thisProductQuantity =
                productQuantity > 5 ? 5 : productQuantity;
              productQuantity = productQuantity - thisProductQuantity;
              totalProductsAcumulator =
                totalProductsAcumulator + thisProductQuantity;
              totalPackagesCounter++;
              totalPriceAcumulator =
                totalPriceAcumulator + thisProductQuantity * product.price;
            }
          }
        });
      });
      setTotalPackages(totalPackagesCounter);
      setTotalProducts(totalProductsAcumulator);
      setTotalPrice(totalPriceAcumulator);
      setPackages(packageArray);
      const packagesAcumulator = [];
      packageArray.forEach((pckg, i) => {
        packagesAcumulator.push(
          <>
            {!buying && <h4 className='margin-top'>{'Paquete ' + (i + 1)}</h4>}
            <div
              className={!buying ? 'screen-mini-card' : 'buying-package'}
              key={i}
            >
              {!buying && (
                <div className='screen-mini-card-header row'>
                  <h2>Llega hoy</h2>
                  <h4 className='package-price'>$ 300</h4>
                </div>
              )}
              <div className={!buying ? 'screen-mini-card-body' : ''}>
                {pckg.products.map((product) => (
                  <div className='package-product'>
                    <div className='list-img-div'>
                      <img src={product.image} alt='product' />
                    </div>
                    <div className='package-product-details'>
                      <span className='package-product-name'>
                        {product.name}
                      </span>
                      {!buying && (
                        <span className='package-product-quantity'>
                          {'Cantidad: ' + product.quantity}
                        </span>
                      )}
                      <span className='package-product-price'>
                        {'$ ' + product.price + ' c/u'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      });
      setRenderPackages(packagesAcumulator);
    }
  }, [checkout, products, buying]);
  return (
    <div className='width-100 flex-center height-100'>
      {localError ? (
        <MessageBox variant='danger'>Ha ocurrido un error</MessageBox>
      ) : loading || loadingUserDetails || loadingAddresses ? (
        <LoadingCircle color='blue' />
      ) : (
        products &&
        checkout &&
        addresses &&
        selectedAddress !== null && (
          <div
            className={
              'flex-start screen checkout-screen' +
              (!desktopScreenCondition ? ' column' : '')
            }
          >
            <div
              className={
                'column flex-start' +
                (!desktopScreenCondition ? ' width-100' : '')
              }
            >
              {editingAddress
                ? addressHub()
                : selectedAddress && (
                    <>
                      {checkoutShipping()}
                      <div className='checkout-packages'>
                        {renderPackages}
                        {!buying && (
                          <button
                            className='primary'
                            onClick={() => {
                              props.history.push('/checkout/buying');
                              localStorage.setItem(
                                'localCheckout',
                                JSON.stringify({
                                  ...checkout,
                                  packages,
                                  address: selectedAddress,
                                })
                              );
                            }}
                          >
                            Confirmar
                          </button>
                        )}
                      </div>
                    </>
                  )}
            </div>
            <CheckoutSideBar
              totalProducts={totalProducts}
              totalPackages={totalPackages}
              totalPrice={totalPrice}
              buying={buying}
            />
          </div>
        )
      )}
    </div>
  );
};

export default CheckoutScreen;
