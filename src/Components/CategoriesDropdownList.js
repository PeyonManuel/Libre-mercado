import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCategories } from '../Actions/categoryActions';

const CategoriesDropdownList = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: categoryLoading,
    error: categoryError,
    categories,
  } = categoryList;

  const [technologySection, setTechnologySection] = useState(false);
  const [babySection, setBabySection] = useState(false);
  const [dropDownTimeout, setDropdownTimeout] = useState(null);

  useEffect(() => {
    categories && categories.length === 0 && dispatch(listCategories());
  }, [dispatch, categories]);

  return (
    <div style={{ height: '2.6rem' }}>
      {!categoryError && categories && !categoryLoading && (
        <ul className='row market-options top'>
          <li
            onMouseEnter={() => {
              const messageScreen = document.createElement('div');
              messageScreen.id = 'categories-black-screen';
              messageScreen.className = 'message-screen';
              clearTimeout(dropDownTimeout);
              setDropdownTimeout(
                setTimeout(() => {
                  document
                    .querySelector('.categories-dropdown-header')
                    .classList.add('active');
                }, 500)
              );
            }}
            onMouseLeave={() => {
              clearTimeout(dropDownTimeout);
              document
                .querySelector('.categories-dropdown-header')
                .classList.remove('active');
              setTechnologySection(false);
              setBabySection(false);
            }}
          >
            <div className='dropdown categories-dropdown-header'>
              <a className='nodecoration' href='#categorias'>
                Categorias <i className='fa fa-caret-down'></i>
              </a>
              <div className='categories-dropdown'>
                <section>
                  <ul className='categs-dropdown-1'>
                    <li
                      className='margin-top'
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b506'
                      >
                        Vehiculos
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration'
                        href='/productos?categoria=607db70973b32618a8d3b50d'
                      >
                        Inmuebles
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(true);
                      }}
                    >
                      <a className='nodecoration' href='#Tecnologia'>
                        Tecnología
                      </a>
                      <i
                        className='fas fa-angle-right absolute-right'
                        style={{ height: '1.6rem' }}
                      ></i>
                    </li>

                    <li
                      onMouseEnter={() => {
                        setTechnologySection(false);
                        setBabySection(true);
                      }}
                    >
                      <a className='nodecoration' href='#Bebes'>
                        Juguetes y Bebés
                      </a>
                      <i
                        className='fas fa-angle-right absolute-right'
                        style={{ height: '1.6rem' }}
                      ></i>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b50d'
                      >
                        Hogar y Muebles
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b508'
                      >
                        Electrodomésticos
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b515'
                      >
                        Herramientas
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      {' '}
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b509'
                      >
                        Deportes y Fitness
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b512'
                      >
                        Accesorios para Vehiculos
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      {' '}
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b50f'
                      >
                        Belleza y Cuidado Personal
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b522'
                      >
                        Salud y Equipamiento Medico
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b51b'
                      >
                        Industrias y Oficinas
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b524'
                      >
                        Agro
                      </a>
                    </li>
                    <li
                      onMouseEnter={() => {
                        setBabySection(false);
                        setTechnologySection(false);
                      }}
                    >
                      <a
                        className='nodecoration '
                        href='/productos?categoria=607db70973b32618a8d3b523'
                      >
                        Servicios
                      </a>
                    </li>
                  </ul>
                </section>
                {technologySection && (
                  <section className='categs-dropdown-2'>
                    <div className='width-100'>
                      <h3>Tecnología</h3>
                    </div>
                    <div className='categs-body'>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b50a'
                      >
                        <h5>Celulares y teléfonos</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b507'
                      >
                        <h5>Computación</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b51a'
                      >
                        <h5>Cámaras y Accesorios</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b50b'
                      >
                        <h5>Electrónica, Audio y Video</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b513'
                      >
                        <h5>Consolas y Videojuegos</h5>
                      </a>
                    </div>
                  </section>
                )}
                {babySection && (
                  <section className='categs-dropdown-2'>
                    <div className='width-100'>
                      <h3>Juguetes y Bebés</h3>
                    </div>
                    <div className='categs-body'>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b510'
                      >
                        <h5>Juegos y Juguetes</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b521'
                      >
                        <h5>Souvenirs, Cotillón y Fiestas</h5>
                      </a>
                      <a
                        className='nodecoration margin-right'
                        href='/productos?categoria=607db70973b32618a8d3b516'
                      >
                        <h5>Bebés</h5>
                      </a>
                    </div>
                  </section>
                )}
              </div>
            </div>
          </li>
          <li>
            <a className='nodecoration' href='/historial'>
              Historial
            </a>
          </li>
          <li>
            <a className='nodecoration' href='/vender'>
              Vender
            </a>
          </li>
          <li>
            <a className='nodecoration' href='/ayuda'>
              Ayuda
            </a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default CategoriesDropdownList;
