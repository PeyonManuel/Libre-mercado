(this.webpackJsonpfrontend = this.webpackJsonpfrontend || []).push([
  [0],
  {
    147: function (e, t, a) {},
    178: function (e, t) {},
    180: function (e, t) {},
    191: function (e, t) {},
    193: function (e, t) {},
    218: function (e, t) {},
    220: function (e, t) {},
    221: function (e, t) {},
    226: function (e, t) {},
    228: function (e, t) {},
    247: function (e, t) {},
    259: function (e, t) {},
    262: function (e, t) {},
    265: function (e, t, a) {
      'use strict';
      a.r(t);
      var s = a(0),
        c = a(1),
        r = a.n(c),
        n = a(50),
        i = a.n(n),
        o = (a(147), a(22)),
        l = a(9),
        d = function () {
          return Object(s.jsxs)('footer', {
            className: 'simple-footer',
            children: [
              Object(s.jsx)('span', {
                className: 'simple-footer_link',
                children: 'C\xf3mo cuidamos tu privacidad',
              }),
              Object(s.jsx)('span', {
                className: 'simple-footer_copyright',
                children: 'Copyright \xa9 1999-2021 MercadoLibre S.R.L.',
              }),
            ],
          });
        },
        u = a(2),
        j = a(3),
        m = a(6),
        b = a.n(m),
        h = a(11),
        p = a(10),
        f = a.n(p),
        O = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a) {
                var s, c;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            a({ type: 'USER_DETAILS_REQUEST' }),
                            (t.prev = 1),
                            (t.next = 4),
                            f.a.get('/api/users/' + e)
                          );
                        case 4:
                          (s = t.sent),
                            (c = s.data),
                            a({ type: 'USER_DETAILS_SUCCESS', payload: c }),
                            (t.next = 12);
                          break;
                        case 9:
                          (t.prev = 9),
                            (t.t0 = t.catch(1)),
                            a({
                              type: 'USER_DETAILS_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 12:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[1, 9]]
                );
              })
            );
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        },
        g = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a) {
                var s, c;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            a({ type: 'USER_CHECKNAME_REQUEST' }),
                            (t.prev = 1),
                            (t.next = 4),
                            f.a.post('/api/users/checkname', { loginInfo: e })
                          );
                        case 4:
                          (s = t.sent),
                            (c = s.data),
                            a({ type: 'USER_CHECKNAME_SUCCESS', payload: c }),
                            localStorage.setItem(
                              'userCheckNameInfo',
                              JSON.stringify(c)
                            ),
                            (t.next = 13);
                          break;
                        case 10:
                          (t.prev = 10),
                            (t.t0 = t.catch(1)),
                            a({
                              type: 'USER_CHECKNAME_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 13:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[1, 10]]
                );
              })
            );
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        },
        x = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a) {
                var s, c;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            a({ type: 'USER_LOGIN_REQUEST' }),
                            (t.prev = 1),
                            (t.next = 4),
                            f.a.post('/api/users/login', e)
                          );
                        case 4:
                          (s = t.sent),
                            (c = s.data),
                            localStorage.setItem('userInfo', JSON.stringify(c)),
                            a({ type: 'USER_LOGIN_SUCCESS', payload: c }),
                            (t.next = 13);
                          break;
                        case 10:
                          (t.prev = 10),
                            (t.t0 = t.catch(1)),
                            a({
                              type: 'USER_LOGIN_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 13:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[1, 10]]
                );
              })
            );
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        },
        v = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a, s) {
                var c, r, n, i;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (c = s()),
                            (r = c.userLogin.user),
                            a({ type: 'UPDATE_USER_FAVORITES_REQUEST' }),
                            (t.prev = 2),
                            (t.next = 5),
                            f.a.post(
                              '/api/users/updatefavs',
                              { user: r, updateFav: e },
                              {
                                headers: { Authorization: 'Bearer ' + r.token },
                              }
                            )
                          );
                        case 5:
                          (n = t.sent),
                            (i = n.data),
                            a({
                              type: 'UPDATE_USER_FAVORITES_SUCCESS',
                              payload: i,
                            }),
                            localStorage.setItem('userInfo', JSON.stringify(i)),
                            a({ type: 'USER_LOGIN_SUCCESS', payload: i }),
                            (t.next = 15);
                          break;
                        case 12:
                          (t.prev = 12),
                            (t.t0 = t.catch(2)),
                            a({
                              type: 'UPDATE_USER_FAVORITES_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 15:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[2, 12]]
                );
              })
            );
            return function (e, a) {
              return t.apply(this, arguments);
            };
          })();
        },
        S = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a) {
                var s, c;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            a({ type: 'USER_VERIFYEMAILEXISTS_REQUEST' }),
                            (t.prev = 1),
                            (t.next = 4),
                            f.a.post('/api/users/verifyemailexists', {
                              email: e,
                            })
                          );
                        case 4:
                          (s = t.sent),
                            (c = s.data),
                            a({
                              type: 'USER_VERIFYEMAILEXISTS_SUCCESS',
                              payload: c,
                            }),
                            localStorage.setItem(
                              'verifyEmail',
                              JSON.stringify(c)
                            ),
                            (t.next = 13);
                          break;
                        case 10:
                          (t.prev = 10),
                            (t.t0 = t.catch(1)),
                            a({
                              type: 'USER_VERIFYEMAILEXISTS_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 13:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[1, 10]]
                );
              })
            );
            return function (e) {
              return t.apply(this, arguments);
            };
          })();
        },
        y = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a, s) {
                var c, r, n, i;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (c = s()),
                            (r = c.userLogin.user),
                            a({ type: 'USER_UPDATE_PRODUCT_DRAFTS_REQUEST' }),
                            (t.prev = 2),
                            (t.next = 5),
                            f.a.post(
                              '/api/users/updateProductDrafts',
                              { draft: e, user: r },
                              {
                                headers: { Authorization: 'Bearer ' + r.token },
                              }
                            )
                          );
                        case 5:
                          (n = t.sent),
                            (i = n.data),
                            a({
                              type: 'USER_UPDATE_PRODUCT_DRAFTS_SUCCESS',
                              payload: i,
                            }),
                            localStorage.setItem('userInfo', JSON.stringify(i)),
                            a({ type: 'USER_LOGIN_SUCCESS', payload: i }),
                            (t.next = 15);
                          break;
                        case 12:
                          (t.prev = 12),
                            (t.t0 = t.catch(2)),
                            a({
                              type: 'USER_UPDATE_PRODUCT_DRAFTS_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 15:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[2, 12]]
                );
              })
            );
            return function (e, a) {
              return t.apply(this, arguments);
            };
          })();
        },
        N = function (e) {
          return (function () {
            var t = Object(h.a)(
              b.a.mark(function t(a, s) {
                var c, r, n, i;
                return b.a.wrap(
                  function (t) {
                    for (;;)
                      switch ((t.prev = t.next)) {
                        case 0:
                          return (
                            (c = s()),
                            (r = c.userLogin.user),
                            a({ type: 'USER_DELETE_PRODUCT_DRAFTS_REQUEST' }),
                            (t.prev = 2),
                            (t.next = 5),
                            f.a.post(
                              '/api/users/deleteProductDrafts',
                              { draftId: e, user: r },
                              {
                                headers: { Authorization: 'Bearer ' + r.token },
                              }
                            )
                          );
                        case 5:
                          (n = t.sent),
                            (i = n.data),
                            a({
                              type: 'USER_DELETE_PRODUCT_DRAFTS_SUCCESS',
                              payload: i,
                            }),
                            localStorage.setItem('userInfo', JSON.stringify(i)),
                            a({ type: 'USER_LOGIN_SUCCESS', payload: i }),
                            (t.next = 15);
                          break;
                        case 12:
                          (t.prev = 12),
                            (t.t0 = t.catch(2)),
                            a({
                              type: 'USER_DELETE_PRODUCT_DRAFTS_FAIL',
                              payload:
                                t.t0.response && t.t0.response.data.message
                                  ? t.t0.response.data.message
                                  : t.t0.message,
                            });
                        case 15:
                        case 'end':
                          return t.stop();
                      }
                  },
                  t,
                  null,
                  [[2, 12]]
                );
              })
            );
            return function (e, a) {
              return t.apply(this, arguments);
            };
          })();
        },
        E = function (e) {
          return e.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        },
        C = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userLogin;
            }).user,
            a = Object(j.c)(function (e) {
              return e.userUpdateFavs;
            }).error,
            r = Object(j.b)(),
            n = Object(c.useState)(
              t && t.userData && t.userData.favorites
                ? t.userData.favorites
                : []
            ),
            i = Object(u.a)(n, 2),
            o = i[0],
            l = i[1],
            d = Object(c.useRef)(null);
          return (
            Object(c.useEffect)(
              function () {
                null !== d.current &&
                  d.current.addEventListener('click', function () {
                    d.current.classList.toggle('toggle'),
                      document
                        .getElementById('small-screen-nav-bar')
                        .classList.toggle('active');
                  });
              },
              [d]
            ),
            Object(c.useEffect)(
              function () {
                switch (e.location.pathname) {
                  case '/':
                    document.querySelector('#inicio') &&
                      document
                        .querySelector('#inicio')
                        .classList.add('current');
                    break;
                  case '/notificaciones':
                    document.querySelector('#notificaciones') &&
                      document
                        .querySelector('#notificaciones')
                        .classList.add('current');
                    break;
                  case '/compras':
                    document.querySelector('#compras') &&
                      document
                        .querySelector('#compras')
                        .classList.add('current');
                    break;
                  case '/favoritos':
                    document.querySelector('#favoritos') &&
                      document
                        .querySelector('#favoritos')
                        .classList.add('current');
                    break;
                  case '/ofertas':
                    document.querySelector('#ofertas') &&
                      document
                        .querySelector('#ofertas')
                        .classList.add('current');
                    break;
                  case '/historial':
                    document.querySelector('#historial') &&
                      document
                        .querySelector('#historial')
                        .classList.add('current');
                    break;
                  case '/vender':
                    document.querySelector('#vender') &&
                      document
                        .querySelector('#vender')
                        .classList.add('current');
                    break;
                  case '/categorias':
                    document.querySelector('#categorias') &&
                      document
                        .querySelector('#categorias')
                        .classList.add('current');
                    break;
                  case '/supermercado':
                    document.querySelector('#supermercado') &&
                      document
                        .querySelector('#supermercado')
                        .classList.add('current');
                    break;
                  case '/ayuda':
                    document.querySelector('#ayuda') &&
                      document.querySelector('#ayuda').classList.add('current');
                }
              },
              [e]
            ),
            Object(c.useEffect)(
              function () {
                ((t && t.userData && t.userData.favorites) ||
                  (t && t.userData && t.userData.favorites && a)) &&
                  l(t.userData.favorites);
              },
              [t, a]
            ),
            Object(s.jsxs)('header', {
              className: 'row',
              children: [
                Object(s.jsxs)('div', {
                  style: {
                    width: '120rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                  },
                  children: [
                    Object(s.jsxs)('div', {
                      className: 'halfs',
                      children: [
                        Object(s.jsxs)('div', {
                          className: 'row half left',
                          children: [
                            Object(s.jsx)('div', {
                              children: Object(s.jsxs)('a', {
                                className: 'nodecoration',
                                href: '/',
                                children: [
                                  Object(s.jsx)('img', {
                                    className: 'logo big-logo',
                                    src: 'https://i.imgur.com/xDUqlt2.png',
                                    alt: 'Mercado libre logo',
                                  }),
                                  Object(s.jsx)('img', {
                                    className: 'logo small-logo',
                                    src:
                                      'https://global-selling.mercadolibre.com/brandprotection/enforcement/images?src=meli-logo.png',
                                    alt: 'Mercado libre logo',
                                  }),
                                ],
                              }),
                            }),
                            Object(s.jsxs)('div', {
                              className: 'searchbar',
                              children: [
                                Object(s.jsx)('input', {
                                  type: 'text',
                                  placeholder:
                                    'Buscar productos, marcas y mas...',
                                }),
                                Object(s.jsx)('i', {
                                  className: 'fa fa-search',
                                }),
                              ],
                            }),
                            Object(s.jsxs)('div', {
                              className: 'row cart',
                              children: [
                                Object(s.jsxs)('div', {
                                  className: 'burger',
                                  ref: d,
                                  children: [
                                    Object(s.jsx)('div', {
                                      className: 'line1',
                                    }),
                                    Object(s.jsx)('div', {
                                      className: 'line2',
                                    }),
                                    Object(s.jsx)('div', {
                                      className: 'line3',
                                    }),
                                  ],
                                }),
                                Object(s.jsx)('i', {
                                  className: 'fa fa-shopping-cart fa-lg',
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(s.jsxs)('div', {
                          className: 'row first-half half left',
                          style: { paddingTop: '1.5rem' },
                          children: [
                            Object(s.jsx)('div', { style: { width: '14rem' } }),
                            Object(s.jsxs)('ul', {
                              className: 'row market-options top',
                              children: [
                                Object(s.jsx)('li', {
                                  children: Object(s.jsxs)('a', {
                                    className: 'nodecoration',
                                    href: '#categorias',
                                    children: [
                                      'Categorias ',
                                      Object(s.jsx)('i', {
                                        className: 'fa fa-caret-down',
                                      }),
                                    ],
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/ofertas',
                                    children: 'Ofertas',
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/historial',
                                    children: 'Historial',
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/supermercado',
                                    children: 'Supermercado',
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  className: 'tiendas-oficiales',
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/tiendasoficiales',
                                    children: 'Tiendas oficiales',
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/vender',
                                    children: 'Vender',
                                  }),
                                }),
                                Object(s.jsx)('li', {
                                  children: Object(s.jsx)('a', {
                                    className: 'nodecoration',
                                    href: '/ayuda',
                                    children: 'Ayuda',
                                  }),
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                    Object(s.jsxs)('ul', {
                      className: 'row user-options half',
                      children: [
                        Object(s.jsx)('li', {
                          children: t
                            ? Object(s.jsxs)('div', {
                                className: 'dropdown',
                                children: [
                                  Object(s.jsxs)('a', {
                                    className: 'nodecoration',
                                    href: '#user',
                                    children: [
                                      Object(s.jsx)('i', {
                                        className: 'fa fa-user  fa-lg',
                                      }),
                                      ' ',
                                      t.name,
                                      ' ',
                                      Object(s.jsx)('i', {
                                        className: 'fa fa-caret-down',
                                      }),
                                    ],
                                  }),
                                  Object(s.jsxs)('ul', {
                                    className: 'dropdown-content',
                                    children: [
                                      Object(s.jsx)('li', {
                                        children: Object(s.jsxs)('a', {
                                          className: 'nodecoration',
                                          href: '/user/' + t._id,
                                          children: [
                                            Object(s.jsx)('i', {
                                              className: 'fa fa-user  fa-3x',
                                            }),
                                            Object(s.jsx)('span', {
                                              children: ' Hola ' + t.name,
                                            }),
                                          ],
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        className: 'separator',
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration ',
                                          href: '#compras',
                                          children: 'Compras',
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration',
                                          href: '#Preguntas',
                                          children: 'Preguntas',
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        className: 'separator',
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration',
                                          href: '#Publicaciones',
                                          children: 'Publicaciones',
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration',
                                          href: '#Ventas',
                                          children: 'Ventas',
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration separator',
                                          href: '#Misdatos',
                                          children: 'Mis datos',
                                        }),
                                      }),
                                      Object(s.jsx)('li', {
                                        className: 'separator',
                                        children: Object(s.jsx)('a', {
                                          className: 'nodecoration',
                                          href: '#salir',
                                          onClick: function () {
                                            r({ type: 'USER_LOGIN_RESET' }),
                                              localStorage.removeItem(
                                                'userInfo'
                                              );
                                          },
                                          children: 'Salir',
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : Object(s.jsxs)('a', {
                                className: 'nodecoration',
                                href: '/register',
                                children: ['Cre\xe1 tu cuenta', ' '],
                              }),
                        }),
                        !t &&
                          Object(s.jsx)('li', {
                            children: Object(s.jsxs)('a', {
                              className: 'nodecoration',
                              href: '/login',
                              children: ['Ingres\xe1', ' '],
                            }),
                          }),
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            className: 'nodecoration',
                            href: '/compras',
                            children: ['Mis compras', ' '],
                          }),
                        }),
                        t &&
                          Object(s.jsx)('li', {
                            children: Object(s.jsxs)('div', {
                              className: 'dropdown',
                              children: [
                                Object(s.jsxs)('a', {
                                  className: 'nodecoration',
                                  href: '#favorites',
                                  children: [
                                    'Favoritos ',
                                    Object(s.jsx)('i', {
                                      className: 'fa fa-caret-down',
                                    }),
                                  ],
                                }),
                                Object(s.jsxs)('ul', {
                                  className: 'dropdown-content favorites',
                                  children: [
                                    Object(s.jsx)('li', {
                                      children: Object(s.jsx)('h2', {
                                        style: { margin: '0' },
                                        children: 'Favoritos',
                                      }),
                                    }),
                                    o.length >= 1
                                      ? o.map(function (e, t) {
                                          return Object(s.jsxs)(
                                            'li',
                                            {
                                              className: 'separator',
                                              style: { position: 'relative' },
                                              children: [
                                                Object(s.jsx)('div', {
                                                  className: 'delbtn-div',
                                                  children: Object(s.jsx)(
                                                    'button',
                                                    {
                                                      onClick: function () {
                                                        r(
                                                          v({
                                                            _id: e._id,
                                                            noDelete: !1,
                                                          })
                                                        ),
                                                          l(
                                                            o.filter(function (
                                                              t
                                                            ) {
                                                              return (
                                                                t._id !== e._id
                                                              );
                                                            })
                                                          );
                                                      },
                                                      children: 'Eliminar',
                                                    }
                                                  ),
                                                }),
                                                Object(s.jsxs)('div', {
                                                  className: 'row buybtns-div',
                                                  style: { columnGap: '1rem' },
                                                  children: [
                                                    Object(s.jsx)('a', {
                                                      href:
                                                        '/product/' +
                                                        e._id +
                                                        '/buy',
                                                      children: 'Comprar',
                                                    }),
                                                    Object(s.jsx)('a', {
                                                      href:
                                                        '/product/' +
                                                        e._id +
                                                        '/buy',
                                                      children:
                                                        'Agregar al carrito',
                                                    }),
                                                  ],
                                                }),
                                                Object(s.jsxs)('a', {
                                                  className:
                                                    'row top nodecoration',
                                                  href: '/product/' + e._id,
                                                  children: [
                                                    Object(s.jsx)('img', {
                                                      className: 'favimg',
                                                      src: e.images[0],
                                                      alt: 'product',
                                                    }),
                                                    Object(s.jsxs)('div', {
                                                      className:
                                                        'column favinfo',
                                                      children: [
                                                        Object(s.jsx)('h2', {
                                                          className: 'favname',
                                                          children: e.name,
                                                        }),
                                                        Object(s.jsxs)('span', {
                                                          className: 'favprice',
                                                          children: [
                                                            '$ ',
                                                            E(e.price),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            },
                                            e._id
                                          );
                                        })
                                      : Object(s.jsx)('li', {
                                          children: Object(s.jsx)('span', {
                                            className: 'nofavs',
                                            children:
                                              'Agreg\xe1 a tus favoritos y seguilos desde aca',
                                          }),
                                        }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            className: 'nodecoration',
                            href: '/carrito',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fa fa-shopping-cart fa-lg',
                              }),
                              ' ',
                            ],
                          }),
                        }),
                        t &&
                          Object(s.jsx)('li', {
                            children: Object(s.jsxs)('div', {
                              className: 'dropdown',
                              children: [
                                Object(s.jsxs)('a', {
                                  className: 'nodecoration',
                                  href: '#notificaciones',
                                  children: [
                                    Object(s.jsx)('i', {
                                      className: 'fa fa-bell fa-lg',
                                    }),
                                    ' ',
                                  ],
                                }),
                                Object(s.jsxs)('ul', {
                                  className: 'dropdown-content notifications',
                                  children: [
                                    Object(s.jsx)('li', {
                                      children: Object(s.jsx)('h2', {
                                        style: { margin: '0' },
                                        children: 'Notificaciones',
                                      }),
                                    }),
                                    Object(s.jsx)('li', {
                                      children: Object(s.jsx)('span', {
                                        className: 'nofavs',
                                        children:
                                          'Por ahora, no hay nada aqu\xed',
                                      }),
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
                Object(s.jsx)('nav', {
                  className: 'small-screen-nav-bar',
                  id: 'small-screen-nav-bar',
                  children: Object(s.jsxs)('ul', {
                    className: 'dropdown-content',
                    children: [
                      Object(s.jsx)('li', {
                        children: t
                          ? Object(s.jsxs)('a', {
                              className: 'nodecoration',
                              style: {
                                color: 'rgba(0, 0, 0, 0.8)',
                                margin: '1rem 0rem',
                              },
                              href: '/user/' + t._id,
                              children: [
                                Object(s.jsx)('i', {
                                  className: 'fa fa-user  fa-3x',
                                }),
                                Object(s.jsx)('span', {
                                  children: ' Hola ' + t.name,
                                }),
                              ],
                            })
                          : Object(s.jsxs)('div', {
                              className: 'small-navbar-notlogged-div',
                              children: [
                                Object(s.jsx)('i', {
                                  className: 'fa fa-user  fa-3x',
                                }),
                                Object(s.jsxs)('div', {
                                  className: 'column',
                                  children: [
                                    Object(s.jsx)('span', {
                                      style: {
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                      },
                                      children: 'Bienvenido',
                                    }),
                                    Object(s.jsx)('span', {
                                      children:
                                        'Ingresa a tu cuenta para ver tus compras, favoritos, etc.',
                                    }),
                                    Object(s.jsxs)('div', {
                                      className: 'row',
                                      style: {
                                        paddingTop: '1rem',
                                        width: '100%',
                                      },
                                      children: [
                                        Object(s.jsx)('form', {
                                          action: '/login',
                                          style: { width: '49%' },
                                          children: Object(s.jsx)('button', {
                                            type: 'submit',
                                            className: 'primary block',
                                            children: 'Ingres\xe1',
                                          }),
                                        }),
                                        Object(s.jsx)('form', {
                                          action: '/register',
                                          style: { width: '49%' },
                                          children: Object(s.jsx)('button', {
                                            className: 'secondary block',
                                            children: 'Cre\xe1 tu cuenta',
                                          }),
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'inicio',
                          className: 'nodecoration small-nav-bar',
                          href: '/',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-home fa-lg',
                            }),
                            'Inicio',
                          ],
                        }),
                      }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'notificaciones',
                            className: 'nodecoration small-nav-bar',
                            href: '/notificaciones',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-bell fa-lg',
                              }),
                              'Notificaciones',
                            ],
                          }),
                        }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'compras',
                            className: 'nodecoration small-nav-bar',
                            href: '/compras',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-shopping-bag fa-lg',
                              }),
                              'Mis compras',
                            ],
                          }),
                        }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'favoritos',
                            className: 'nodecoration small-nav-bar',
                            href: '/favoritos',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-heart fa-lg',
                              }),
                              'Favoritos',
                            ],
                          }),
                        }),
                      Object(s.jsx)('li', {
                        children: Object(s.jsxs)('a', {
                          id: 'ofertas',
                          className: 'nodecoration small-nav-bar',
                          href: '/ofertas',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-percentage fa-lg',
                            }),
                            'Ofertas',
                          ],
                        }),
                      }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'historial',
                            className: 'nodecoration small-nav-bar',
                            href: '/historial',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-clock fa-lg',
                              }),
                              'Historial',
                            ],
                          }),
                        }),
                      Object(s.jsx)('li', {
                        children: Object(s.jsxs)('a', {
                          id: 'vender',
                          className: 'nodecoration small-nav-bar',
                          href: '/vender',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-ticket-alt fa-lg',
                            }),
                            'Vender',
                          ],
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'categorias',
                          className: 'nodecoration small-nav-bar',
                          href: '/categorias',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-list-ul fa-lg',
                            }),
                            'Categorias',
                          ],
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'ayuda',
                          className: 'nodecoration small-nav-bar',
                          href: '/ayuda',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-question-circle fa-lg',
                            }),
                            'Ayuda',
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            })
          );
        },
        _ = function () {
          return Object(s.jsx)('header', {
            className: 'empty',
            children: Object(s.jsxs)('a', {
              className: 'nodecoration',
              href: '/',
              onClick: function () {
                localStorage.removeItem('userCheckNameInfo'),
                  localStorage.removeItem('hashCode');
              },
              children: [
                Object(s.jsx)('img', {
                  className: 'logo big-logo',
                  src: 'https://i.imgur.com/xDUqlt2.png',
                  alt: 'Mercado libre logo',
                }),
                Object(s.jsx)('img', {
                  className: 'logo small-logo',
                  src:
                    'https://global-selling.mercadolibre.com/brandprotection/enforcement/images?src=meli-logo.png',
                  alt: 'Mercado libre logo',
                  style: { marginTop: '-0.5rem' },
                }),
              ],
            }),
          });
        },
        w = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userLogin;
            }).user,
            a = Object(j.b)(),
            r = Object(c.useRef)(null);
          return (
            Object(c.useEffect)(
              function () {
                if (null !== r.current)
                  switch (
                    (r.current.addEventListener('click', function () {
                      r.current.classList.toggle('toggle'),
                        document
                          .getElementById('small-screen-nav-bar')
                          .classList.toggle('active');
                    }),
                    e.location.pathname)
                  ) {
                    case '/':
                      document.querySelector('#inicio') &&
                        document
                          .querySelector('#inicio')
                          .classList.add('current');
                      break;
                    case '/notificaciones':
                      document.querySelector('#notificaciones') &&
                        document
                          .querySelector('#notificaciones')
                          .classList.add('current');
                      break;
                    case '/compras':
                      document.querySelector('#compras') &&
                        document
                          .querySelector('#compras')
                          .classList.add('current');
                      break;
                    case '/favoritos':
                      document.querySelector('#favoritos') &&
                        document
                          .querySelector('#favoritos')
                          .classList.add('current');
                      break;
                    case '/ofertas':
                      document.querySelector('#ofertas') &&
                        document
                          .querySelector('#ofertas')
                          .classList.add('current');
                      break;
                    case '/historial':
                      document.querySelector('#historial') &&
                        document
                          .querySelector('#historial')
                          .classList.add('current');
                      break;
                    case '/vender':
                      document.querySelector('#vender') &&
                        document
                          .querySelector('#vender')
                          .classList.add('current');
                      break;
                    case '/categorias':
                      document.querySelector('#categorias') &&
                        document
                          .querySelector('#categorias')
                          .classList.add('current');
                      break;
                    case '/supermercado':
                      document.querySelector('#supermercado') &&
                        document
                          .querySelector('#supermercado')
                          .classList.add('current');
                      break;
                    case '/ayuda':
                      document.querySelector('#ayuda') &&
                        document
                          .querySelector('#ayuda')
                          .classList.add('current');
                  }
              },
              [r, e]
            ),
            Object(s.jsxs)('header', {
              className: 'empty less row',
              children: [
                Object(s.jsxs)('a', {
                  className: 'nodecoration',
                  href: '/',
                  onClick: function () {
                    localStorage.removeItem('userCheckNameInfo'),
                      localStorage.removeItem('hashCode');
                  },
                  children: [
                    Object(s.jsx)('img', {
                      className: 'logo big-logo',
                      src: 'https://i.imgur.com/xDUqlt2.png',
                      alt: 'Mercado libre logo',
                    }),
                    Object(s.jsx)('img', {
                      className: 'logo small-logo',
                      src:
                        'https://global-selling.mercadolibre.com/brandprotection/enforcement/images?src=meli-logo.png',
                      alt: 'Mercado libre logo',
                      style: { marginTop: '-0.5rem' },
                    }),
                  ],
                }),
                Object(s.jsxs)('div', {
                  className: 'burger less-header',
                  ref: r,
                  children: [
                    Object(s.jsx)('div', { className: 'line1' }),
                    Object(s.jsx)('div', { className: 'line2' }),
                    Object(s.jsx)('div', { className: 'line3' }),
                  ],
                }),
                Object(s.jsxs)('div', {
                  className: 'dropdown less-header',
                  children: [
                    Object(s.jsxs)('a', {
                      className: 'nodecoration',
                      href: '#user',
                      children: [
                        Object(s.jsx)('i', { className: 'fa fa-user  fa-lg' }),
                        ' ',
                        t.name,
                        ' ',
                        Object(s.jsx)('i', { className: 'fa fa-caret-down' }),
                      ],
                    }),
                    Object(s.jsxs)('ul', {
                      className: 'dropdown-content less-header',
                      children: [
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            className: 'nodecoration',
                            href: '/user/' + t._id,
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fa fa-user  fa-3x',
                              }),
                              Object(s.jsx)('span', {
                                children: ' Hola ' + t.name,
                              }),
                            ],
                          }),
                        }),
                        Object(s.jsx)('li', {
                          className: 'separator',
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration ',
                            href: '#compras',
                            children: 'Compras',
                          }),
                        }),
                        Object(s.jsx)('li', {
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration',
                            href: '#Preguntas',
                            children: 'Preguntas',
                          }),
                        }),
                        Object(s.jsx)('li', {
                          className: 'separator',
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration',
                            href: '#Publicaciones',
                            children: 'Publicaciones',
                          }),
                        }),
                        Object(s.jsx)('li', {
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration',
                            href: '#Ventas',
                            children: 'Ventas',
                          }),
                        }),
                        Object(s.jsx)('li', {
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration separator',
                            href: '#Misdatos',
                            children: 'Mis datos',
                          }),
                        }),
                        Object(s.jsx)('li', {
                          className: 'separator',
                          children: Object(s.jsx)('a', {
                            className: 'nodecoration',
                            href: '#salir',
                            onClick: function () {
                              a({ type: 'USER_LOGIN_RESET' }),
                                localStorage.removeItem('userInfo');
                            },
                            children: 'Salir',
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                Object(s.jsx)('nav', {
                  className: 'small-screen-nav-bar less-header',
                  id: 'small-screen-nav-bar',
                  children: Object(s.jsxs)('ul', {
                    className: 'dropdown-content',
                    children: [
                      Object(s.jsx)('li', {
                        children: t
                          ? Object(s.jsxs)('a', {
                              className: 'nodecoration',
                              style: {
                                color: 'rgba(0, 0, 0, 0.8)',
                                margin: '1rem 0rem',
                              },
                              href: '/user/' + t._id,
                              children: [
                                Object(s.jsx)('i', {
                                  className: 'fa fa-user  fa-3x',
                                }),
                                Object(s.jsx)('span', {
                                  children: ' Hola ' + t.name,
                                }),
                              ],
                            })
                          : Object(s.jsxs)('div', {
                              className: 'small-navbar-notlogged-div',
                              children: [
                                Object(s.jsx)('i', {
                                  className: 'fa fa-user  fa-3x',
                                }),
                                Object(s.jsxs)('div', {
                                  className: 'column',
                                  children: [
                                    Object(s.jsx)('span', {
                                      style: {
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                      },
                                      children: 'Bienvenido',
                                    }),
                                    Object(s.jsx)('span', {
                                      children:
                                        'Ingresa a tu cuenta para ver tus compras, favoritos, etc.',
                                    }),
                                    Object(s.jsxs)('div', {
                                      className: 'row',
                                      style: {
                                        paddingTop: '1rem',
                                        width: '100%',
                                      },
                                      children: [
                                        Object(s.jsx)('button', {
                                          className: 'primary',
                                          style: { width: '49%' },
                                          children: 'Ingres\xe1',
                                        }),
                                        Object(s.jsx)('button', {
                                          className: 'secondary',
                                          style: { width: '49%' },
                                          children: 'Cre\xe1 tu cuenta',
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'inicio',
                          className: 'nodecoration small-nav-bar',
                          href: '/',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-home fa-lg',
                            }),
                            'Inicio',
                          ],
                        }),
                      }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'notificaciones',
                            className: 'nodecoration small-nav-bar',
                            href: '/notificaciones',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-bell fa-lg',
                              }),
                              'Notificaciones',
                            ],
                          }),
                        }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'compras',
                            className: 'nodecoration small-nav-bar',
                            href: '/compras',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-shopping-bag fa-lg',
                              }),
                              'Mis compras',
                            ],
                          }),
                        }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'favoritos',
                            className: 'nodecoration small-nav-bar',
                            href: '/favoritos',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-heart fa-lg',
                              }),
                              'Favoritos',
                            ],
                          }),
                        }),
                      Object(s.jsx)('li', {
                        children: Object(s.jsxs)('a', {
                          id: 'ofertas',
                          className: 'nodecoration small-nav-bar',
                          href: '/ofertas',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-percentage fa-lg',
                            }),
                            'Ofertas',
                          ],
                        }),
                      }),
                      t &&
                        Object(s.jsx)('li', {
                          children: Object(s.jsxs)('a', {
                            id: 'historial',
                            className: 'nodecoration small-nav-bar',
                            href: '/historial',
                            children: [
                              Object(s.jsx)('i', {
                                className: 'fas fa-clock fa-lg',
                              }),
                              'Historial',
                            ],
                          }),
                        }),
                      Object(s.jsx)('li', {
                        children: Object(s.jsxs)('a', {
                          id: 'vender',
                          className: 'nodecoration small-nav-bar',
                          href: '/vender',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-ticket-alt fa-lg',
                            }),
                            'Vender',
                          ],
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'categorias',
                          className: 'nodecoration small-nav-bar',
                          href: '/categorias',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-list-ul fa-lg',
                            }),
                            'Categorias',
                          ],
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className: 'separator',
                        children: Object(s.jsxs)('a', {
                          id: 'ayuda',
                          className: 'nodecoration small-nav-bar',
                          href: '/ayuda',
                          children: [
                            Object(s.jsx)('i', {
                              className: 'fas fa-question-circle fa-lg',
                            }),
                            'Ayuda',
                          ],
                        }),
                      }),
                    ],
                  }),
                }),
              ],
            })
          );
        },
        k = a(4),
        R = a(28),
        U = function (e) {
          var t = e.component,
            a = e.redirectTo,
            c = Object(R.a)(e, ['component', 'redirectTo']),
            r = Object(j.c)(function (e) {
              return e.userLogin;
            }).user;
          return Object(s.jsx)(
            l.b,
            Object(k.a)(
              Object(k.a)({}, c),
              {},
              {
                render: function (e) {
                  return r
                    ? Object(s.jsx)(t, Object(k.a)({}, e))
                    : Object(s.jsx)(l.a, { to: '/login' + (a || '') });
                },
              }
            )
          );
        },
        I = function (e) {
          var t = e.component,
            a = Object(R.a)(e, ['component']),
            c = Object(j.c)(function (e) {
              return e.userLogin;
            }).user;
          return Object(s.jsx)(
            l.b,
            Object(k.a)(
              Object(k.a)({}, a),
              {},
              {
                render: function (e) {
                  return c
                    ? Object(s.jsx)(l.a, { to: '/' })
                    : Object(s.jsx)(t, Object(k.a)({}, e));
                },
              }
            )
          );
        },
        T = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userCheckName;
            }).user,
            a = Object(j.c)(function (e) {
              return e.userLogin;
            }),
            r = a.error,
            n = a.success,
            i = Object(c.useState)(
              t &&
                (t.userName
                  ? t.userName
                  : t.email
                  ? t.email
                  : t.telephone
                  ? t.telephone
                  : '')
            ),
            o = Object(u.a)(i, 1)[0],
            l = Object(c.useState)(''),
            d = Object(u.a)(l, 2),
            m = d[0],
            b = d[1],
            h = Object(c.useState)(''),
            p = Object(u.a)(h, 2),
            f = p[0],
            O = p[1],
            g = Object(c.useState)(''),
            S = Object(u.a)(g, 2),
            y = S[0],
            N = S[1],
            E = Object(c.useState)(''),
            C = Object(u.a)(E, 2),
            _ = C[0],
            w = C[1],
            k = Object(j.b)();
          Object(c.useEffect)(
            function () {
              if (
                e.location.search.split('?')[1] &&
                e.location.search.split('?')[1].includes('loginType')
              )
                switch (e.location.search.split('?')[1].split('&')[0]) {
                  case 'loginType=favorito':
                    w('favorito');
                    break;
                  case 'loginType=vender':
                    w('vender');
                }
            },
            [e]
          ),
            Object(c.useEffect)(
              function () {
                if (n) {
                  switch (_) {
                    case 'favorito':
                      k(
                        v({
                          _id: e.location.search.split('item_id=')[1],
                          noDelete: !0,
                        })
                      );
                      break;
                    case 'vender':
                      e.history.push('/vender');
                  }
                  k({ type: 'USER_CHECKNAME_RESET' }),
                    localStorage.removeItem('userCheckNameInfo');
                }
              },
              [n, k, e, _]
            ),
            Object(c.useEffect)(
              function () {
                r && O(r);
              },
              [r]
            );
          return Object(s.jsxs)(s.Fragment, {
            children: [
              Object(s.jsx)('div', { className: 'extra-header' }),
              Object(s.jsxs)('form', {
                onSubmit: function (e) {
                  e.preventDefault(),
                    'login' === y &&
                      (m
                        ? k(x({ _id: t._id, password: m }))
                        : O('Ingres\xe1 la clave'));
                },
                className: 'screen-card login-screen',
                children: [
                  Object(s.jsxs)('div', {
                    children: [
                      Object(s.jsx)('h1', { children: 'Ahora, tu clave' }),
                      Object(s.jsxs)('div', {
                        className: 'email-badge row top',
                        children: [
                          Object(s.jsx)('i', { className: 'fa fa-user' }),
                          Object(s.jsx)('p', {
                            className: 'email-badge__user-name',
                            children: o,
                          }),
                          Object(s.jsx)('a', {
                            href: '/login',
                            onClick: function () {
                              return localStorage.removeItem(
                                'userCheckNameInfo'
                              );
                            },
                            children: Object(s.jsx)('i', {
                              className: 'fa fa-times',
                              style: { color: 'black' },
                            }),
                          }),
                        ],
                      }),
                    ],
                  }),
                  Object(s.jsx)('div', {
                    className: 'wrapper password',
                    children: Object(s.jsxs)('div', {
                      className: 'underline-label-input',
                      children: [
                        Object(s.jsx)('input', {
                          id: 'password',
                          type: 'password',
                          required: !0,
                          value: m,
                          onChange: function (e) {
                            return b(e.target.value);
                          },
                          onKeyDown: function (e) {
                            13 === e.keyCode &&
                              (m
                                ? k(x({ _id: t._id, password: m }))
                                : O('Ingres\xe1 la clave'));
                          },
                          autoFocus: !0,
                        }),
                        Object(s.jsx)('div', {
                          className: 'underline' + (f ? ' error' : ''),
                        }),
                        Object(s.jsx)('label', { children: 'Clave' }),
                        Object(s.jsx)('span', {
                          className: f ? ' error' : ' noerror',
                          children: f && f,
                        }),
                      ],
                    }),
                  }),
                  Object(s.jsxs)('div', {
                    children: [
                      Object(s.jsx)('button', {
                        type: 'submit',
                        className: 'primary block',
                        onClick: function () {
                          N('login');
                        },
                        children: 'Ingresar',
                      }),
                      Object(s.jsx)('button', {
                        type: 'submit',
                        className: 'secondary block',
                        onClick: function () {
                          N('dontknowpass');
                        },
                        children: 'No s\xe9 mi clave',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        D = function (e) {
          return Object(s.jsx)('div', {
            className: 'alert alert-' + e.variant || !1,
            children: e.children,
          });
        },
        L = function (e) {
          var t = e.product,
            a = e.user,
            r = t._id,
            n = t.name,
            i = t.images,
            l = t.price,
            d = t.salePrice,
            m = t.isOnSale,
            b = Object(j.c)(function (e) {
              return e.userUpdateFavs;
            }).error,
            h = Object(j.b)(),
            p = Object(c.useState)(
              !!(
                a &&
                a.userData &&
                a.userData.favorites &&
                a.userData.favorites.find(function (e) {
                  return e._id === r;
                })
              )
            ),
            f = Object(u.a)(p, 2),
            O = f[0],
            g = f[1];
          return (
            Object(c.useEffect)(
              function () {
                a &&
                a.userData &&
                a.userData.favorites &&
                1 ===
                  a.userData.favorites.filter(function (e) {
                    return e._id === r;
                  }).length
                  ? g(!0)
                  : g(!1),
                  b && g(!1);
              },
              [a, r, b]
            ),
            Object(s.jsxs)('div', {
              className: 'card',
              style: { margin: '0' },
              children: [
                Object(s.jsx)('div', {
                  className: 'favorite-btn',
                  children: Object(s.jsx)('a', {
                    href: '?loginType=favorito&item_id=' + r,
                    onClick: function (e) {
                      a &&
                        (e.preventDefault(),
                        h(v({ _id: r, noDelete: !1 })),
                        g(!O));
                    },
                    children:
                      a && O
                        ? Object(s.jsx)('i', { className: 'fas fa-heart' })
                        : Object(s.jsx)('i', { className: 'far fa-heart' }),
                  }),
                }),
                Object(s.jsxs)(
                  o.b,
                  {
                    className: 'nodecoration card-link',
                    to: '/product/' + r,
                    children: [
                      Object(s.jsx)('img', {
                        className: 'card-img center-cropped',
                        src: i[0],
                        alt: n,
                      }),
                      Object(s.jsxs)('div', {
                        className: 'card-body',
                        children: [
                          m
                            ? Object(s.jsxs)('div', {
                                className: 'sale-price-module row top',
                                children: [
                                  Object(s.jsxs)('div', {
                                    className: 'sale-price',
                                    children: ['$ ', E(d)],
                                  }),
                                  Object(s.jsxs)('div', {
                                    className: 'discount small-screen',
                                    children: [
                                      Math.floor(100 * (1 - d / l)),
                                      '% OFF',
                                    ],
                                  }),
                                ],
                              })
                            : Object(s.jsx)('div', {
                                className: 'small-original-price-module',
                                children: Object(s.jsxs)('div', {
                                  className: 'sale-price',
                                  children: ['$ ', E(l)],
                                }),
                              }),
                          Object(s.jsxs)('div', {
                            className: 'row top card-price',
                            children: [
                              Object(s.jsxs)('div', {
                                className: 'price',
                                children: ['$ ', E(l)],
                              }),
                              m &&
                                Object(s.jsxs)('div', {
                                  className: 'discount',
                                  style: { right: '2.5rem' },
                                  children: [
                                    Math.floor(100 * (1 - d / l)),
                                    '% OFF',
                                  ],
                                }),
                            ],
                          }),
                          Object(s.jsx)('div', {
                            className: 'name-module',
                            children: Object(s.jsx)('p', {
                              className: 'product-name',
                              children: n,
                            }),
                          }),
                        ],
                      }),
                    ],
                  },
                  r
                ),
              ],
            })
          );
        },
        A = function (e) {
          var t = Object(j.c)(function (e) {
              return e.productList;
            }),
            a = t.loading,
            r = t.error,
            n = t.products,
            i = Object(j.c)(function (e) {
              return e.categoryList;
            }),
            o = i.loading,
            l = i.error,
            d =
              (i.categories,
              Object(j.c)(function (e) {
                return e.userLogin;
              }).user),
            m = Object(c.useState)(0),
            p = Object(u.a)(m, 2),
            O = p[0],
            g = p[1],
            x = Object(j.b)();
          Object(c.useEffect)(
            function () {
              x(
                (function () {
                  var e = Object(h.a)(
                    b.a.mark(function e(t) {
                      var a, s;
                      return b.a.wrap(
                        function (e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                return (
                                  t({ type: 'PRODUCT_LIST_REQUEST' }),
                                  (e.prev = 1),
                                  (e.next = 4),
                                  f.a.get('/api/products')
                                );
                              case 4:
                                (a = e.sent),
                                  (s = a.data),
                                  t({
                                    type: 'PRODUCT_LIST_SUCCESS',
                                    payload: s,
                                  }),
                                  (e.next = 12);
                                break;
                              case 9:
                                (e.prev = 9),
                                  (e.t0 = e.catch(1)),
                                  t({
                                    type: 'PRODUCT_LIST_FAIL',
                                    payload:
                                      e.t0.response &&
                                      e.t0.response.data.message
                                        ? e.t0.response.data.message
                                        : e.t0.message,
                                  });
                              case 12:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        null,
                        [[1, 9]]
                      );
                    })
                  );
                  return function (t) {
                    return e.apply(this, arguments);
                  };
                })()
              );
            },
            [x]
          );
          var v = function (e) {
            g(
              'forward' === e
                ? O + (window.screen.width / devicePixelRatio) * 0.9375
                : O - (window.screen.width / devicePixelRatio) * 0.9375
            );
          };
          return (
            Object(c.useEffect)(
              function () {
                document.getElementById('product-cards') &&
                document.getElementById('product-cards').offsetWidth <
                  O + (window.screen.width / devicePixelRatio) * 0.9375
                  ? (document.getElementById('card-next-button').style.display =
                      'none')
                  : document.getElementById('card-next-button') &&
                    (document.getElementById('card-next-button').style.display =
                      'block');
              },
              [O]
            ),
            Object(s.jsxs)(s.Fragment, {
              children: [
                a
                  ? Object(s.jsx)(s.Fragment, {})
                  : r
                  ? Object(s.jsx)(D, { variant: 'danger', children: r })
                  : Object(s.jsxs)('div', {
                      style: { position: 'relative', width: '120rem' },
                      children: [
                        O > 0 &&
                          Object(s.jsx)('button', {
                            className: 'card-back-button',
                            onClick: function () {
                              return v('backwards');
                            },
                          }),
                        Object(s.jsxs)('div', {
                          className: 'product-list-container',
                          children: [
                            Object(s.jsx)('h1', { children: 'Productos' }),
                            Object(s.jsx)('div', {
                              className: 'row top product-cards',
                              id: 'product-cards',
                              style: {
                                transform:
                                  'translate3d(' + -O + 'px, 0px, 0px)',
                              },
                              children: n.map(function (t) {
                                return Object(s.jsx)(s.Fragment, {
                                  children: Object(s.jsx)(
                                    L,
                                    {
                                      product: t,
                                      user: d && d,
                                      history: e.history,
                                    },
                                    t._id
                                  ),
                                });
                              }),
                            }),
                          ],
                        }),
                        Object(s.jsx)('button', {
                          id: 'card-next-button',
                          className: 'card-next-button',
                          onClick: function () {
                            return v('forward');
                          },
                        }),
                      ],
                    }),
                o
                  ? Object(s.jsx)(s.Fragment, {})
                  : l
                  ? Object(s.jsx)(D, { variant: 'danger', children: l })
                  : Object(s.jsx)('div', {}),
              ],
            })
          );
        },
        q = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userCheckName;
            }),
            a = t.error,
            r = t.user,
            n = t.success,
            i = Object(c.useState)(
              r &&
                (r.name
                  ? r.name
                  : r.email
                  ? r.email
                  : r.telephone
                  ? r.telephone
                  : '')
            ),
            o = Object(u.a)(i, 2),
            l = o[0],
            d = o[1],
            m = Object(c.useState)(''),
            b = Object(u.a)(m, 2),
            h = b[0],
            p = b[1],
            f = Object(c.useState)(''),
            O = Object(u.a)(f, 2),
            x = O[0],
            v = O[1],
            S = Object(c.useState)(''),
            y = Object(u.a)(S, 2),
            N = y[0],
            E = y[1],
            C = Object(j.b)();
          Object(c.useEffect)(
            function () {
              var t = new URLSearchParams(e.location.search);
              if (!!t && !!t.get('loginType'))
                switch (t.get('loginType')) {
                  case 'favorito':
                    E('favorito');
                    break;
                  case 'vender':
                    E('vender');
                }
            },
            [e]
          ),
            Object(c.useEffect)(
              function () {
                a && p(a);
              },
              [a]
            ),
            Object(c.useEffect)(
              function () {
                if (n) {
                  switch (N) {
                    case 'favorito':
                      e.history.push(
                        '/login/enterpass?loginType=favorito&item_id=' +
                          e.location.search.split('item_id=')[1]
                      );
                      break;
                    case 'vender':
                      e.history.push('/login/enterpass?loginType=vender');
                      break;
                    default:
                      e.history.push('/login/enterpass');
                  }
                  C({ type: 'USER_CHECKNAME_RESET_SUCCESS' });
                }
              },
              [n, e, C, N]
            );
          return Object(s.jsxs)(s.Fragment, {
            children: [
              Object(s.jsx)('div', { className: 'extra-header' }),
              Object(s.jsxs)('form', {
                onSubmit: function (t) {
                  if ((t.preventDefault(), 'continue' === x))
                    l && l.trim() ? C(g(l)) : p('Complet\xe1 este dato');
                  else if ('register' === x)
                    switch (N) {
                      case 'favorito':
                        e.history.push(
                          '/register?loginType=favorito&item_id=' +
                            e.location.search.split('item_id=')[1]
                        );
                        break;
                      case 'vender':
                        e.history.push('/register?loginType=vender');
                        break;
                      default:
                        e.history.push('/register');
                    }
                },
                className: 'screen-card login-screen',
                children: [
                  Object(s.jsx)('h1', {
                    children:
                      '\xa1Hola! Ingres\xe1 tu tel\xe9fono, e-mail o usuario',
                  }),
                  Object(s.jsx)('div', {
                    className: 'wrapper',
                    children: Object(s.jsxs)('div', {
                      className: 'underline-label-input',
                      children: [
                        Object(s.jsx)('input', {
                          id: 'login',
                          type: 'text',
                          value: l || '',
                          onChange: function (e) {
                            d(e.target.value), p('');
                          },
                          onKeyDown: function (e) {
                            13 === e.keyCode &&
                              (l.trim() ? C(g(l)) : p('Complet\xe1 este dato'));
                          },
                          className: h ? 'error' : '',
                          autoFocus: !0,
                        }),
                        Object(s.jsx)('div', {
                          className: 'underline' + (h ? ' error' : ''),
                        }),
                        Object(s.jsx)('label', {
                          children: 'Tel\xe9fono, e-mail o usuario',
                        }),
                        Object(s.jsx)('span', {
                          className: h ? ' error' : ' noerror',
                          children: h && h,
                        }),
                      ],
                    }),
                  }),
                  Object(s.jsxs)('div', {
                    children: [
                      Object(s.jsx)('button', {
                        type: 'submit',
                        className: 'primary block',
                        onClick: function () {
                          v('continue');
                        },
                        children: 'Continuar',
                      }),
                      Object(s.jsx)('button', {
                        type: 'submit',
                        className: 'secondary block',
                        onClick: function () {
                          return v('register');
                        },
                        children: 'Crear cuenta',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        P = function (e) {
          var t = e.rating,
            a = e.numReviews;
          return Object(s.jsxs)('div', {
            className: 'rating',
            children: [
              Object(s.jsx)('span', {
                children: Object(s.jsx)('i', {
                  className:
                    t >= 1
                      ? 'fa fa-star'
                      : t >= 0.5
                      ? 'fa fa-star-half-o'
                      : 'fa fa-star-0',
                }),
              }),
              Object(s.jsx)('span', {
                children: Object(s.jsx)('i', {
                  className:
                    t >= 2
                      ? 'fa fa-star'
                      : t >= 1.5
                      ? 'fa fa-star-half-o'
                      : 'fa fa-star-0',
                }),
              }),
              Object(s.jsx)('span', {
                children: Object(s.jsx)('i', {
                  className:
                    t >= 3
                      ? 'fa fa-star'
                      : t >= 2.5
                      ? 'fa fa-star-half-o'
                      : 'fa fa-star-0',
                }),
              }),
              Object(s.jsx)('span', {
                children: Object(s.jsx)('i', {
                  className:
                    t >= 4
                      ? 'fa fa-star'
                      : t >= 3.5
                      ? 'fa fa-star-half-o'
                      : 'fa fa-star-0',
                }),
              }),
              Object(s.jsx)('span', {
                children: Object(s.jsx)('i', {
                  className:
                    t >= 5
                      ? 'fa fa-star'
                      : t >= 4.5
                      ? 'fa fa-star-half-o'
                      : 'fa fa-star-0',
                }),
              }),
              Object(s.jsx)('span', { children: a + ' opiniones' }),
            ],
          });
        },
        F = function (e) {
          var t = Object(j.b)(),
            a = e.match.params.id,
            r = Object(j.c)(function (e) {
              return e.productDetails;
            }),
            n = r.loading,
            i = r.error,
            l = r.product,
            d = Object(j.c)(function (e) {
              return e.userLogin;
            }).user,
            m = Object(j.c)(function (e) {
              return e.userUpdateFavs;
            }).error,
            p = Object(c.useState)(0),
            O = Object(u.a)(p, 2),
            g = O[0],
            x = O[1],
            S = Object(c.useState)(1),
            y = Object(u.a)(S, 2),
            N = y[0],
            C = y[1],
            _ = Object(c.useState)(!1),
            w = Object(u.a)(_, 2),
            k = w[0],
            R = w[1],
            U = Object(c.useState)(!1),
            I = Object(u.a)(U, 2),
            T = I[0],
            L = I[1],
            A = Object(c.useState)(!1),
            q = Object(u.a)(A, 2),
            F = q[0],
            M = q[1],
            V = Object(c.useState)(''),
            B = Object(u.a)(V, 2),
            G = B[0],
            Q = B[1],
            z = Object(c.useState)(
              !!(
                d &&
                d.userData &&
                d.userData.favorites &&
                l &&
                l._id &&
                d.userData.favorites.find(function (e) {
                  return e._id === l._id;
                })
              )
            ),
            H = Object(u.a)(z, 2),
            Y = H[0],
            J = H[1];
          Object(c.useEffect)(
            function () {
              t(
                (function (e) {
                  return (function () {
                    var t = Object(h.a)(
                      b.a.mark(function t(a) {
                        var s, c;
                        return b.a.wrap(
                          function (t) {
                            for (;;)
                              switch ((t.prev = t.next)) {
                                case 0:
                                  return (
                                    a({ type: 'PRODUCT_DETAILS_REQUEST' }),
                                    (t.prev = 1),
                                    (t.next = 4),
                                    f.a.get('/api/products/' + e)
                                  );
                                case 4:
                                  (s = t.sent),
                                    (c = s.data),
                                    a({
                                      type: 'PRODUCT_DETAILS_SUCCESS',
                                      payload: c,
                                    }),
                                    (t.next = 12);
                                  break;
                                case 9:
                                  (t.prev = 9),
                                    (t.t0 = t.catch(1)),
                                    a({
                                      type: 'PRODUCT_LIST_FAIL',
                                      payload:
                                        t.t0.response &&
                                        t.t0.response.data.message
                                          ? t.t0.response.data.message
                                          : t.t0.message,
                                    });
                                case 12:
                                case 'end':
                                  return t.stop();
                              }
                          },
                          t,
                          null,
                          [[1, 9]]
                        );
                      })
                    );
                    return function (e) {
                      return t.apply(this, arguments);
                    };
                  })();
                })(a)
              );
            },
            [t, a]
          ),
            Object(c.useEffect)(
              function () {
                d &&
                l &&
                l._id &&
                1 ===
                  d.userData.favorites.filter(function (e) {
                    return e._id === l._id;
                  }).length
                  ? J(!0)
                  : J(!1),
                  m && J(!1);
              },
              [d, l, m]
            ),
            Object(c.useEffect)(
              function () {
                var e = function (e) {
                  var t = K.current;
                  t && !t.contains(e.target) && k && R(!1);
                };
                return (
                  document.addEventListener('mousedown', e),
                  function () {
                    document.removeEventListener('mousedown', e);
                  }
                );
              },
              [k]
            );
          var K = Object(c.useRef)(null);
          return Object(s.jsx)(s.Fragment, {
            children: n
              ? Object(s.jsx)(s.Fragment, {})
              : i
              ? Object(s.jsx)(D, { variant: 'danger', children: i })
              : Object(s.jsxs)('div', {
                  className: 'column',
                  style: { margin: '3rem', gap: '1rem' },
                  children: [
                    Object(s.jsx)('span', { children: '| ' }),
                    Object(s.jsxs)('div', {
                      className: 'column screen-card',
                      children: [
                        Object(s.jsxs)('div', {
                          className: 'row top screen-segment first',
                          children: [
                            Object(s.jsxs)('div', {
                              className: 'row top product-col-1',
                              children: [
                                Object(s.jsx)('div', {
                                  className: 'miniature-images column',
                                  children:
                                    l &&
                                    l.images &&
                                    l.images.map(function (e, t) {
                                      return Object(s.jsx)(
                                        'img',
                                        {
                                          className:
                                            'img miniature-selector' +
                                            (g === t ? ' selected' : ''),
                                          src: e,
                                          alt: 'Miniature preview',
                                          onMouseOver: function () {
                                            return x(t);
                                          },
                                        },
                                        t
                                      );
                                    }),
                                }),
                                Object(s.jsx)('div', {
                                  style: { position: 'relative' },
                                  children: Object(s.jsx)('img', {
                                    className: 'product-image',
                                    src: l && l.images && l.images[g],
                                    alt: 'Selected product',
                                  }),
                                }),
                                Object(s.jsx)('div', {
                                  className: 'column',
                                  style: { maxWidth: '35rem', gap: '0.5rem' },
                                }),
                              ],
                            }),
                            Object(s.jsxs)('div', {
                              className:
                                'column top product-col-2 screen-mini-card',
                              style: { gap: '1rem' },
                              children: [
                                Object(s.jsx)('div', {
                                  className: 'favorite-btn product-screen',
                                  children: Object(s.jsx)('a', {
                                    href:
                                      '/login?loginType=FAVORITE&item_id=' +
                                      l._id,
                                    onClick: function (e) {
                                      d &&
                                        (e.preventDefault(),
                                        t(v({ _id: l._id, noDelete: !1 })),
                                        J(!Y));
                                    },
                                    children:
                                      d && Y
                                        ? Object(s.jsx)('i', {
                                            className: 'fas fa-heart',
                                          })
                                        : Object(s.jsx)('i', {
                                            className: 'far fa-heart',
                                          }),
                                  }),
                                }),
                                Object(s.jsx)('div', {
                                  children: Object(s.jsx)('span', {
                                    className: 'subtle-text',
                                    children:
                                      l && l.isStateNew && l.isStateNew
                                        ? 'Nuevo'
                                        : 'Usado',
                                  }),
                                }),
                                Object(s.jsx)('div', {
                                  children: Object(s.jsx)('h1', {
                                    className: 'break',
                                    style: { margin: '0' },
                                    children: l && l.name && l.name,
                                  }),
                                }),
                                Object(s.jsx)('div', {
                                  children: Object(s.jsx)(P, {
                                    rating: l && l.rating && l.rating,
                                    numReviews:
                                      l && l.numReviews && l.numReviews,
                                  }),
                                }),
                                Object(s.jsxs)('div', {
                                  className: 'column',
                                  children: [
                                    l &&
                                      l.isOnSale &&
                                      Object(s.jsxs)('del', {
                                        className: 'saleprice',
                                        children: [
                                          '$ ',
                                          l && l.salePrice && l.salePrice,
                                        ],
                                      }),
                                    Object(s.jsxs)('div', {
                                      className: 'row',
                                      children: [
                                        Object(s.jsxs)('span', {
                                          className: 'price big row',
                                          children: [
                                            '$',
                                            ' ',
                                            l && l.price && E(l.price),
                                            ' ',
                                          ],
                                        }),
                                        l &&
                                          l.isOnSale &&
                                          Object(s.jsxs)('span', {
                                            className: 'discount big',
                                            children: [
                                              l &&
                                                l.salePrice &&
                                                l.price &&
                                                Math.floor(
                                                  100 *
                                                    (1 - l.salePrice / l.price)
                                                ),
                                              '% OFF',
                                            ],
                                          }),
                                      ],
                                    }),
                                  ],
                                }),
                                Object(s.jsx)('div', {
                                  children: Object(s.jsxs)('span', {
                                    className: 'seller-link',
                                    children: [
                                      'Vendido por',
                                      ' ',
                                      l &&
                                        l.seller &&
                                        Object(s.jsx)(o.b, {
                                          to: '/user/' + l.seller._id,
                                          children: l.seller.userName,
                                        }),
                                    ],
                                  }),
                                }),
                                Object(s.jsx)('div', {
                                  children:
                                    l && l.stock && 0 === l.stock
                                      ? Object(s.jsx)(D, {
                                          variant: 'danger',
                                          children: 'Producto fuera de stock',
                                        })
                                      : 1 === l.stock
                                      ? Object(s.jsx)('div', {
                                          children: Object(s.jsx)('h2', {
                                            children:
                                              '\xa1\xdaltimo disponible!',
                                          }),
                                        })
                                      : Object(s.jsxs)('div', {
                                          children: [
                                            Object(s.jsx)('h2', {
                                              children: 'Stock disponible',
                                            }),
                                            Object(s.jsxs)('span', {
                                              className: 'btn-dropdown-qty',
                                              ref: K,
                                              children: [
                                                Object(s.jsxs)('button', {
                                                  className: 'qty',
                                                  onClick: function () {
                                                    R(!k);
                                                  },
                                                  children: [
                                                    Object(s.jsx)('span', {
                                                      children: 'Cantidad: ',
                                                    }),
                                                    Object(s.jsx)('span', {
                                                      className: 'selected-qty',
                                                      children:
                                                        N +
                                                        (1 === N
                                                          ? ' unidad'
                                                          : ' unidades'),
                                                    }),
                                                    ' ',
                                                    Object(s.jsx)('span', {
                                                      children: Object(
                                                        s.jsx
                                                      )('i', {
                                                        className:
                                                          'fa fa-caret-down qty-caret' +
                                                          (k
                                                            ? ' selected'
                                                            : ''),
                                                      }),
                                                    }),
                                                    Object(s.jsx)('span', {
                                                      className: 'subtle-text',
                                                      style: {
                                                        fontWeight: '100',
                                                      },
                                                      children:
                                                        ' (' +
                                                        l.stock +
                                                        ' disponibles)',
                                                    }),
                                                  ],
                                                }),
                                                Object(s.jsx)('ul', {
                                                  className:
                                                    'qty-list' +
                                                    (k ? ' active' : ''),
                                                  children:
                                                    l &&
                                                    l.stock &&
                                                    (function (e) {
                                                      for (
                                                        var t = [],
                                                          a = function (e) {
                                                            e <= 6 &&
                                                              t.push(
                                                                Object(s.jsx)(
                                                                  'li',
                                                                  {
                                                                    className:
                                                                      e === N
                                                                        ? 'current'
                                                                        : '',
                                                                    onClick: function () {
                                                                      C(e),
                                                                        R(!k),
                                                                        L(!1),
                                                                        M(!1),
                                                                        Q('');
                                                                    },
                                                                    children:
                                                                      e +
                                                                      (1 === e
                                                                        ? ' unidad'
                                                                        : ' unidades'),
                                                                  },
                                                                  e
                                                                )
                                                              ),
                                                              7 === e &&
                                                                t.push(
                                                                  Object(
                                                                    s.jsxs
                                                                  )('li', {
                                                                    className: T
                                                                      ? 'last-item'
                                                                      : '',
                                                                    onClick: function () {
                                                                      !T &&
                                                                        L(!0);
                                                                    },
                                                                    children: [
                                                                      Object(
                                                                        s.jsx
                                                                      )(
                                                                        'span',
                                                                        {
                                                                          className: T
                                                                            ? 'hidden'
                                                                            : '',
                                                                          children:
                                                                            'M\xe1s de 6 unidades',
                                                                        }
                                                                      ),
                                                                      Object(
                                                                        s.jsxs
                                                                      )(
                                                                        'span',
                                                                        {
                                                                          className:
                                                                            'row' +
                                                                            (T
                                                                              ? ''
                                                                              : ' hidden'),
                                                                          style: {
                                                                            width:
                                                                              '11.1rem',
                                                                          },
                                                                          children: [
                                                                            Object(
                                                                              s.jsx
                                                                            )(
                                                                              'label',
                                                                              {
                                                                                className: F
                                                                                  ? 'nostock'
                                                                                  : '',
                                                                                htmlFor:
                                                                                  'qtynumber',
                                                                                children:
                                                                                  'Cantidad',
                                                                              }
                                                                            ),
                                                                            Object(
                                                                              s.jsx
                                                                            )(
                                                                              'input',
                                                                              {
                                                                                className: F
                                                                                  ? 'nostock'
                                                                                  : '',
                                                                                id:
                                                                                  'qtynumber',
                                                                                type:
                                                                                  'number',
                                                                                min:
                                                                                  '1',
                                                                                max:
                                                                                  l.stock,
                                                                                value: G,
                                                                                onKeyDown: function (
                                                                                  e
                                                                                ) {
                                                                                  M(
                                                                                    !1
                                                                                  ),
                                                                                    (189 ===
                                                                                      e.keyCode ||
                                                                                      ('' ===
                                                                                        e
                                                                                          .target
                                                                                          .value &&
                                                                                        48 ===
                                                                                          e.keyCode)) &&
                                                                                      e.preventDefault(),
                                                                                    13 ===
                                                                                      e.keyCode &&
                                                                                      (G &&
                                                                                      G <=
                                                                                        l.stock
                                                                                        ? (C(
                                                                                            G
                                                                                          ),
                                                                                          R(
                                                                                            !k
                                                                                          ),
                                                                                          L(
                                                                                            !1
                                                                                          ),
                                                                                          M(
                                                                                            !1
                                                                                          ))
                                                                                        : M(
                                                                                            !0
                                                                                          ));
                                                                                },
                                                                                onChange: function (
                                                                                  e
                                                                                ) {
                                                                                  return Q(
                                                                                    e
                                                                                      .target
                                                                                      .value
                                                                                  );
                                                                                },
                                                                              }
                                                                            ),
                                                                            Object(
                                                                              s.jsx
                                                                            )(
                                                                              'button',
                                                                              {
                                                                                type:
                                                                                  'button',
                                                                                onClick: function () {
                                                                                  G &&
                                                                                  G <=
                                                                                    l.stock
                                                                                    ? (C(
                                                                                        G
                                                                                      ),
                                                                                      R(
                                                                                        !k
                                                                                      ),
                                                                                      L(
                                                                                        !1
                                                                                      ),
                                                                                      M(
                                                                                        !1
                                                                                      ))
                                                                                    : M(
                                                                                        !0
                                                                                      );
                                                                                },
                                                                                children: Object(
                                                                                  s.jsx
                                                                                )(
                                                                                  'i',
                                                                                  {
                                                                                    className:
                                                                                      'fa fa-caret-right',
                                                                                  }
                                                                                ),
                                                                              }
                                                                            ),
                                                                          ],
                                                                        }
                                                                      ),
                                                                    ],
                                                                  })
                                                                );
                                                          },
                                                          c = 1;
                                                        c <= e;
                                                        c++
                                                      )
                                                        a(c);
                                                      return t;
                                                    })(l.stock).map(function (
                                                      e
                                                    ) {
                                                      return e;
                                                    }),
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                }),
                                Object(s.jsxs)('div', {
                                  className: 'column',
                                  style: { width: '100%', gap: '1rem' },
                                  children: [
                                    Object(s.jsx)('button', {
                                      className: 'primary block',
                                      children: 'Comprar ahora',
                                    }),
                                    Object(s.jsx)('button', {
                                      className: 'secondary block',
                                      children: 'Agregar al carrito',
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                        Object(s.jsx)('div', {
                          className: 'screen-segment second',
                          children: Object(s.jsxs)('div', {
                            children: [
                              Object(s.jsx)('h1', {
                                style: { fontSize: '2.4rem' },
                                children: 'Descripci\xf3n',
                              }),
                              Object(s.jsx)('pre', {
                                className: 'product-description',
                                children: l && l.description && l.description,
                              }),
                            ],
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
          });
        },
        M = function (e) {
          document.body.style.backgroundColor = '#f7f7f7';
          var t = Object(j.b)(),
            a = Object(j.c)(function (e) {
              return e.userVerifyEmail;
            }),
            r = a.checkedEmail,
            n = a.success,
            i = localStorage.getItem('RegisterCacheValues')
              ? JSON.parse(localStorage.getItem('RegisterCacheValues'))
              : null,
            o = Object(c.useState)(i ? i.name : ''),
            l = Object(u.a)(o, 2),
            d = l[0],
            m = l[1],
            p = Object(c.useState)(i ? i.surname : ''),
            O = Object(u.a)(p, 2),
            g = O[0],
            x = O[1],
            v = Object(c.useState)(i ? i.dni : ''),
            y = Object(u.a)(v, 2),
            N = y[0],
            E = y[1],
            C = Object(c.useState)(i ? i.email : ''),
            _ = Object(u.a)(C, 2),
            w = _[0],
            k = _[1],
            R = Object(c.useState)(''),
            U = Object(u.a)(R, 2),
            I = U[0],
            T = U[1],
            D = Object(c.useState)('Complet\xe1 este campo'),
            L = Object(u.a)(D, 2),
            A = L[0],
            q = L[1],
            P = Object(c.useState)('Complet\xe1 este campo'),
            F = Object(u.a)(P, 2),
            M = F[0],
            V = F[1],
            B = Object(c.useState)('Complet\xe1 este campo'),
            G = Object(u.a)(B, 2),
            Q = G[0],
            z = G[1],
            H = Object(c.useState)('Complet\xe1 este campo'),
            Y = Object(u.a)(H, 2),
            J = Y[0],
            K = Y[1],
            $ = Object(c.useState)('Us\xe1 entre 6 y 20 caracteres.'),
            W = Object(u.a)($, 2),
            X = W[0],
            Z = W[1],
            ee = Object(c.useState)(!1),
            te = Object(u.a)(ee, 2),
            ae = te[0],
            se = te[1],
            ce = Object(c.useState)(!1),
            re = Object(u.a)(ce, 2),
            ne = re[0],
            ie = re[1],
            oe = Object(c.useState)(''),
            le = Object(u.a)(oe, 2),
            de = le[0],
            ue = le[1],
            je = Object(c.useRef)(null);
          Object(c.useEffect)(function () {
            localStorage.removeItem('hashCode');
          }, []),
            Object(c.useEffect)(
              function () {
                var t = new URLSearchParams(e.location.search);
                if (!!t && !!t.get('loginType'))
                  switch (t.get('loginType')) {
                    case 'favorito':
                      ue('favorito');
                      break;
                    case 'vender':
                      ue('vender');
                  }
              },
              [e]
            ),
            Object(c.useEffect)(
              function () {
                var e = function (e) {
                  var t = je.current;
                  t && !t.contains(e.target) && ae && se(!1);
                };
                return (
                  document.addEventListener('mousedown', e),
                  function () {
                    document.removeEventListener('mousedown', e);
                  }
                );
              },
              [ae]
            ),
            Object(c.useEffect)(
              function () {
                if (r && !1 === r.exists && n) {
                  switch (de) {
                    case 'favorito':
                      e.history.push(
                        '/email-validation?loginType=favorito&item_id=' +
                          e.location.search.split('item_id=')[1]
                      );
                      break;
                    case 'vender':
                      e.history.push('/email-validation?loginType=vender');
                      break;
                    default:
                      e.history.push('/email-validation');
                  }
                  t({ type: 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS' });
                } else
                  r &&
                    !0 === r.exists &&
                    n &&
                    (K('Este e-mail ya est\xe1 en uso'),
                    se(!0),
                    t({ type: 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS' }));
              },
              [r, e, t, n, de]
            ),
            Object(c.useEffect)(
              function () {
                localStorage.setItem(
                  'RegisterCacheValues',
                  JSON.stringify({
                    name: d,
                    surname: g,
                    dni: N,
                    email: w,
                    password: I,
                  })
                );
              },
              [d, g, N, w, I]
            ),
            Object(c.useEffect)(
              function () {
                d && d.trim()
                  ? d.length < 2
                    ? q('Ingres\xe1 un m\xednimo de 2 caracteres.')
                    : /(.)\1{3,}/.test(d)
                    ? q('Evit\xe1 ingresar caracteres repetidos.')
                    : q('')
                  : q('Complet\xe1 este campo');
              },
              [d]
            ),
            Object(c.useEffect)(
              function () {
                g && g.trim()
                  ? g.length < 2
                    ? V('Ingres\xe1 un m\xednimo de 2 caracteres.')
                    : /(.)\1{3,}/.test(g)
                    ? V('Evit\xe1 ingresar caracteres repetidos.')
                    : V('')
                  : V('Complet\xe1 este campo');
              },
              [g]
            ),
            Object(c.useEffect)(
              function () {
                N
                  ? N.length < 6
                    ? z('Ingres\xe1 un m\xednimo de 6 caracteres.')
                    : z('')
                  : z('Complet\xe1 este campo');
              },
              [N]
            ),
            Object(c.useEffect)(
              function () {
                w && w.trim()
                  ? /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                      w
                    )
                    ? K('')
                    : K('Us\xe1 el formato nombre@ejemplo.com')
                  : K('Complet\xe1 este campo');
              },
              [w]
            ),
            Object(c.useEffect)(
              function () {
                I.length < 6
                  ? (Z('Te faltan ' + (6 - I.length) + ' caracteres m\xe1s'),
                    (document.getElementById('check').style.opacity = 0))
                  : /(.)\1{3,}/.test(I)
                  ? (Z('Evit\xe1 ingresar caracteres repetidos.'),
                    (document.getElementById('check').style.opacity = 0))
                  : (Z(''),
                    (document.getElementById('check').style.opacity = 1));
              },
              [I]
            );
          var me = (function () {
            var e = Object(h.a)(
              b.a.mark(function e(a) {
                var s;
                return b.a.wrap(function (e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          a.preventDefault(),
                          (s = (function () {
                            var e = Object(h.a)(
                              b.a.mark(function e(t) {
                                var a;
                                return b.a.wrap(function (e) {
                                  for (;;)
                                    switch ((e.prev = e.next)) {
                                      case 0:
                                        return (
                                          (e.next = 2),
                                          f.a.get(
                                            'https://emailvalidation.abstractapi.com/v1/?api_key=991cebae87a64dd2a83faa0e62123f3b&email=' +
                                              t
                                          )
                                        );
                                      case 2:
                                        if (
                                          !(
                                            (a = e.sent) &&
                                            a.data &&
                                            a.data.deliverability &&
                                            'DELIVERABLE' ===
                                              a.data.deliverability
                                          )
                                        ) {
                                          e.next = 7;
                                          break;
                                        }
                                        return e.abrupt('return', !0);
                                      case 7:
                                        return e.abrupt('return', !1);
                                      case 8:
                                      case 'end':
                                        return e.stop();
                                    }
                                }, e);
                              })
                            );
                            return function (t) {
                              return e.apply(this, arguments);
                            };
                          })()),
                          ie(!0),
                          (e.next = 5),
                          s(w.trim())
                        );
                      case 5:
                        if (e.sent) {
                          e.next = 9;
                          break;
                        }
                        K('Ingres\xe1 un E-mail valido'), (e.next = 10);
                        break;
                      case 9:
                        A || M || Q || J || X || t(S(w));
                      case 10:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            );
            return function (t) {
              return e.apply(this, arguments);
            };
          })();
          return Object(s.jsxs)(s.Fragment, {
            children: [
              ae &&
                Object(s.jsx)('div', {
                  className: 'message-screen',
                  children: Object(s.jsxs)('div', {
                    className: 'message-card screen-mini-card',
                    ref: je,
                    children: [
                      Object(s.jsx)('button', {
                        className: 'crossbtn',
                        onClick: function () {
                          return se(!1);
                        },
                        children: Object(s.jsx)('i', {
                          className: 'fas fa-times',
                        }),
                      }),
                      Object(s.jsxs)('h2', {
                        children: [
                          'Ya existe una cuenta con ',
                          Object(s.jsx)('b', { children: w }),
                        ],
                      }),
                      Object(s.jsxs)('div', {
                        style: { marginTop: '1.5rem' },
                        children: [
                          Object(s.jsx)('button', {
                            className: 'primary block',
                            style: { marginBottom: '1rem' },
                            onClick: function () {
                              return e.history.push('/email-validation');
                            },
                            children: 'Ingres\xe1 a tu cuenta',
                          }),
                          Object(s.jsx)('button', {
                            className: 'secondary block',
                            onClick: function () {
                              se(!1),
                                document.getElementById('email') &&
                                  (document.getElementById('email').focus(),
                                  document
                                    .getElementById('email')
                                    .setSelectionRange(0, 0));
                            },
                            children: 'Usar otro e-mail',
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              Object(s.jsxs)('div', {
                className: 'big-form-block',
                children: [
                  Object(s.jsxs)('div', {
                    className: 'register-header row',
                    children: [
                      ' ',
                      Object(s.jsx)('h1', {
                        children: 'Complet\xe1 tus datos',
                      }),
                    ],
                  }),
                  Object(s.jsxs)('form', {
                    onSubmit: me,
                    children: [
                      Object(s.jsxs)('div', {
                        className: 'screen-card big-form-screen',
                        children: [
                          Object(s.jsx)('div', {
                            className: 'wrapper',
                            children: Object(s.jsxs)('div', {
                              className: 'underline-label-input big-form',
                              children: [
                                Object(s.jsx)('input', {
                                  className: ne && A ? ' error' : '',
                                  value: d,
                                  type: 'text',
                                  maxLength: '20',
                                  onChange: function (e) {
                                    m(e.target.value);
                                  },
                                }),
                                Object(s.jsx)('div', {
                                  className:
                                    'underline' + (ne && A ? ' error' : ''),
                                }),
                                Object(s.jsx)('label', { children: 'Nombre' }),
                                Object(s.jsx)('span', {
                                  className:
                                    'reg-info-after' +
                                    (ne && A ? ' error' : ''),
                                  children:
                                    ne && A
                                      ? A
                                      : 'Ingresalo tal como figura en tu documento.',
                                }),
                              ],
                            }),
                          }),
                          Object(s.jsx)('div', {
                            className: 'wrapper',
                            children: Object(s.jsxs)('div', {
                              className: 'underline-label-input big-form',
                              children: [
                                Object(s.jsx)('input', {
                                  className: ne && M ? ' error' : '',
                                  value: g,
                                  type: 'text',
                                  maxLength: '20',
                                  onChange: function (e) {
                                    x(e.target.value);
                                  },
                                }),
                                Object(s.jsx)('div', {
                                  className:
                                    'underline' + (ne && M ? ' error' : ''),
                                }),
                                Object(s.jsx)('label', {
                                  children: 'Apellido',
                                }),
                                Object(s.jsx)('span', {
                                  className:
                                    'reg-info-after' +
                                    (ne && M ? ' error' : ''),
                                  children:
                                    ne && M
                                      ? M
                                      : 'Ingresalo tal como figura en tu documento.',
                                }),
                              ],
                            }),
                          }),
                          Object(s.jsx)('div', {
                            className: 'wrapper',
                            children: Object(s.jsxs)('div', {
                              className: 'underline-label-input big-form',
                              children: [
                                Object(s.jsx)('input', {
                                  className: ne && Q ? ' error' : '',
                                  value: N,
                                  type: 'number',
                                  onChange: function (e) {
                                    e.target.value.length <= 8 &&
                                      E(e.target.value);
                                  },
                                  onKeyDown: function (e) {
                                    return (
                                      190 === e.keyCode && e.preventDefault()
                                    );
                                  },
                                }),
                                Object(s.jsx)('div', {
                                  className:
                                    'underline' + (ne && Q ? ' error' : ''),
                                }),
                                Object(s.jsx)('label', { children: 'DNI' }),
                                Object(s.jsx)('span', {
                                  className:
                                    'reg-info-after' +
                                    (ne && Q ? ' error' : ''),
                                  children: ne && Q ? Q : '',
                                }),
                              ],
                            }),
                          }),
                          Object(s.jsxs)('div', {
                            className: 'registration-user-fields row',
                            children: [
                              Object(s.jsx)('div', {
                                className: 'wrapper',
                                children: Object(s.jsxs)('div', {
                                  className: 'underline-label-input big-form',
                                  children: [
                                    Object(s.jsx)('input', {
                                      className: ne && J && !ae ? ' error' : '',
                                      value: w,
                                      id: 'email',
                                      type: 'text',
                                      maxLength: '40',
                                      onChange: function (e) {
                                        k(e.target.value);
                                      },
                                    }),
                                    Object(s.jsx)('div', {
                                      className:
                                        'underline' +
                                        (ne && J && !ae ? ' error' : ''),
                                    }),
                                    Object(s.jsx)('label', {
                                      children: 'E-mail',
                                    }),
                                    Object(s.jsx)('span', {
                                      className:
                                        'reg-info-after' +
                                        (ne && J && !ae ? ' error' : ''),
                                      children:
                                        ne && J
                                          ? J
                                          : 'Asegurate de tener acceso a este e-mail.',
                                    }),
                                  ],
                                }),
                              }),
                              Object(s.jsx)('div', {
                                className: 'wrapper',
                                children: Object(s.jsxs)('div', {
                                  className: 'underline-label-input big-form',
                                  children: [
                                    Object(s.jsx)('input', {
                                      className: ne && X ? ' error' : '',
                                      value: I,
                                      type: 'password',
                                      maxLength: '20',
                                      onChange: function (e) {
                                        return T(e.target.value);
                                      },
                                    }),
                                    Object(s.jsx)('div', {
                                      className:
                                        'underline' + (ne && X ? ' error' : ''),
                                    }),
                                    Object(s.jsx)('label', {
                                      children: 'Clave',
                                    }),
                                    Object(s.jsx)('i', {
                                      className: 'fas fa-check fa-xs',
                                      id: 'check',
                                      style: { opacity: '0' },
                                    }),
                                    Object(s.jsx)('i', {
                                      className: 'far fa-question-circle',
                                    }),
                                    Object(s.jsx)('div', {
                                      className: 'reg-help subtle-text',
                                      children:
                                        'Tu clave debe tener entre 6 y 20 caracteres. No incluyas tu nombre, apellido o e-mail, ni caracteres id\xe9nticos consecutivos.',
                                    }),
                                    Object(s.jsx)('span', {
                                      className:
                                        'reg-info-after' +
                                        (ne && X ? ' error' : ''),
                                      children: X,
                                    }),
                                  ],
                                }),
                              }),
                            ],
                          }),
                          Object(s.jsx)('div', {
                            children: Object(s.jsxs)('label', {
                              className: 'container',
                              children: [
                                ' ',
                                'Acepto los ',
                                Object(s.jsx)('a', {
                                  href: '#Terminos',
                                  children: 'T\xe9rminos y Condiciones',
                                }),
                                ' y autorizo el uso de mis datos de acuerdo a la',
                                ' ',
                                Object(s.jsx)('a', {
                                  href: '#privacidad',
                                  children: 'Declaraci\xf3n de Privacidad',
                                }),
                                '.',
                                Object(s.jsx)('input', {
                                  className: A ? ' error' : '',
                                  type: 'checkbox',
                                  onChange: function () {
                                    return (document.getElementById(
                                      'submitbtn'
                                    ).disabled = !document.getElementById(
                                      'submitbtn'
                                    ).disabled);
                                  },
                                }),
                                Object(s.jsx)('span', {
                                  className: 'checkmark',
                                }),
                              ],
                            }),
                          }),
                        ],
                      }),
                      Object(s.jsx)('button', {
                        type: 'submit',
                        className: 'primary big-form',
                        id: 'submitbtn',
                        disabled: !0,
                        children: 'Continuar',
                      }),
                    ],
                  }),
                ],
              }),
            ],
          });
        },
        V = a(15),
        B = a(140),
        G = a.n(B),
        Q = a(79),
        z = a.n(Q),
        H = function (e) {
          var t = Object(j.b)(),
            a = Object(j.c)(function (e) {
              return e.userVerifyEmail;
            }).checkedEmail,
            r = Object(j.c)(function (e) {
              return e.userLogin;
            }).success,
            n = Object(c.useState)(['', '', '', '', '', '']),
            i = Object(u.a)(n, 2),
            o = i[0],
            l = i[1],
            d = Object(c.useState)(
              localStorage.getItem('hashCode')
                ? JSON.parse(localStorage.getItem('hashCode'))
                : null
            ),
            m = Object(u.a)(d, 2),
            p = m[0],
            O = m[1],
            g = Object(c.useState)(!1),
            S = Object(u.a)(g, 2),
            y = S[0],
            N = S[1],
            E = Object(c.useState)(''),
            C = Object(u.a)(E, 2),
            _ = C[0],
            w = C[1];
          Object(c.useEffect)(
            function () {
              var t = new URLSearchParams(e.location.search);
              if (!!t && !!t.get('loginType'))
                switch (t.get('loginType')) {
                  case 'favorito':
                    w('favorito');
                    break;
                  case 'vender':
                    w('vender');
                }
            },
            [e]
          ),
            Object(c.useEffect)(
              function () {
                if (r) {
                  switch (_) {
                    case 'favorito':
                      t(
                        v({
                          _id: e.location.search.split('item_id=')[1],
                          noDelete: !0,
                        })
                      );
                      break;
                    case 'vender':
                      e.history.push('/vender');
                      break;
                    default:
                      e.history.push('./');
                  }
                  localStorage.removeItem('RegisterCacheValues');
                }
              },
              [r, t, e, _]
            ),
            Object(c.useEffect)(
              function () {
                if (!p && a) {
                  var e = (function (e) {
                      for (var t = '', a = 0; a < e; a++)
                        t += '0123456789'[Math.floor(10 * Math.random())];
                      return t;
                    })(a && (a.exists ? 6 : 4)),
                    t = z.a.hashSync(e);
                  O(t),
                    localStorage.setItem('hashCode', JSON.stringify(t)),
                    G.a.send(
                      'gmail',
                      'template_l9xup0q',
                      {
                        email: a.email,
                        subject: 'Te enviamos el c\xf3digo de seguridad',
                        title:
                          'Ingres\xe1 a tu cuenta con tu c\xf3digo de seguridad',
                        code: e,
                      },
                      'user_sr3l7H8k1UCzb3mvTFObR'
                    );
                }
              },
              [a, p]
            );
          return Object(s.jsxs)(s.Fragment, {
            children: [
              Object(s.jsx)('div', { className: 'extra-header' }),
              Object(s.jsx)('div', {
                className: 'empty-header-block',
                children: Object(s.jsxs)('form', {
                  onSubmit: function (s) {
                    if ((s.preventDefault(), z.a.compareSync(o.join(''), p))) {
                      if (a.exists)
                        t(
                          x({
                            _id: a._id,
                            baseCode: '523bhf72y37n782cDFU1FN7NX',
                          })
                        );
                      else {
                        var c = localStorage.getItem('RegisterCacheValues')
                          ? JSON.parse(
                              localStorage.getItem('RegisterCacheValues')
                            )
                          : null;
                        c
                          ? t(
                              ((r = c),
                              (function () {
                                var e = Object(h.a)(
                                  b.a.mark(function e(t) {
                                    var a, s;
                                    return b.a.wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              return (
                                                t({
                                                  type: 'USER_REGISTER_REQUEST',
                                                }),
                                                (e.prev = 1),
                                                (e.next = 4),
                                                f.a.post(
                                                  '/api/users/register',
                                                  r
                                                )
                                              );
                                            case 4:
                                              (a = e.sent),
                                                (s = a.data),
                                                t({
                                                  type: 'USER_REGISTER_SUCCESS',
                                                  payload: s,
                                                }),
                                                localStorage.setItem(
                                                  'userInfo',
                                                  JSON.stringify(s)
                                                ),
                                                t({
                                                  type: 'USER_LOGIN_SUCCESS',
                                                  payload: s,
                                                }),
                                                (e.next = 14);
                                              break;
                                            case 11:
                                              (e.prev = 11),
                                                (e.t0 = e.catch(1)),
                                                t({
                                                  type: 'USER_REGISTER_FAIL',
                                                  payload:
                                                    e.t0.response &&
                                                    e.t0.response.data.message
                                                      ? e.t0.response.data
                                                          .message
                                                      : e.t0.message,
                                                });
                                            case 14:
                                            case 'end':
                                              return e.stop();
                                          }
                                      },
                                      e,
                                      null,
                                      [[1, 11]]
                                    );
                                  })
                                );
                                return function (t) {
                                  return e.apply(this, arguments);
                                };
                              })())
                            )
                          : (alert(
                              'Ha ocurrido un error con los datos de registro, volviendo a la pagina de registro'
                            ),
                            e.history.push('/register'));
                      }
                      localStorage.removeItem('hashCode');
                    } else N(!0);
                    var r;
                  },
                  className: 'screen-card login-screen',
                  style: { height: '38rem' },
                  children: [
                    Object(s.jsxs)('div', {
                      children: [
                        Object(s.jsx)('h1', {
                          children:
                            'Ingres\xe1 el c\xf3digo que te enviamos por e-mail',
                        }),
                        a &&
                          (a.exist
                            ? Object(s.jsxs)(s.Fragment, {
                                children: [
                                  Object(s.jsx)('p', {
                                    style: { fontSize: '1.4rem' },
                                    children:
                                      'Te enviamos un c\xf3digo a tu e-mail para que puedas ingresar a tu cuenta.',
                                  }),
                                  Object(s.jsxs)('div', {
                                    className: 'email-badge row top',
                                    children: [
                                      Object(s.jsx)('i', {
                                        className: 'fa fa-user',
                                      }),
                                      Object(s.jsx)('p', {
                                        className: 'email-badge__user-name',
                                        children: a.email,
                                      }),
                                      Object(s.jsx)('input', {
                                        type: 'hidden',
                                        name: 'email',
                                        children: a.email,
                                      }),
                                      Object(s.jsx)('a', {
                                        href: '/login',
                                        onClick: function () {
                                          return localStorage.removeItem(
                                            'userCheckNameInfo'
                                          );
                                        },
                                        children: Object(s.jsx)('i', {
                                          className: 'fa fa-times',
                                          style: { color: 'black' },
                                        }),
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : Object(s.jsxs)('p', {
                                style: { fontSize: '1.4rem' },
                                children: [
                                  'Lo enviamos a ',
                                  Object(s.jsx)('b', { children: a.email }),
                                  ' para confirmar que te pertenece. Si no lo encontr\xe1s revis\xe1 tu carpeta de correo no deseado.',
                                ],
                              })),
                      ],
                    }),
                    a &&
                      Object(s.jsx)('div', {
                        className: 'otp-inputs',
                        onClick: function () {
                          for (var e = a.exists ? 6 : 4, t = 0; t < e; t++);
                        },
                        children: (function (e) {
                          for (
                            var t = a.exists ? 6 : 4,
                              c = [],
                              r = function (a) {
                                c.push(
                                  Object(s.jsx)(
                                    'input',
                                    {
                                      id: 'input' + a,
                                      className:
                                        'otp-input' +
                                        (a === t - 1
                                          ? ' no-space'
                                          : 6 === t && 2 === a
                                          ? ' big-space'
                                          : '') +
                                        (e ? ' error' : ''),
                                      type: 'number',
                                      value: o[a],
                                      onPaste: function (e) {
                                        var s = e.clipboardData
                                          .getData('Text')
                                          .replace(/\D/g, '');
                                        e.preventDefault(),
                                          s.length <= t - a &&
                                            s.length > 1 &&
                                            (s.split('').map(function (e, t) {
                                              return l(
                                                [].concat(
                                                  Object(V.a)(
                                                    o.slice(a, a + t)
                                                  ),
                                                  [e],
                                                  Object(V.a)(
                                                    o.slice(a + t + 1)
                                                  )
                                                )
                                              );
                                            }),
                                            l(
                                              [].concat(
                                                Object(V.a)(o.slice(0, a)),
                                                Object(V.a)(s.split('')),
                                                Object(V.a)(
                                                  o.slice(s.length + a)
                                                )
                                              )
                                            ));
                                      },
                                      onChange: function (e) {
                                        N(!1),
                                          e.target.value.length <= 1 &&
                                            l(
                                              [].concat(
                                                Object(V.a)(o.slice(0, a)),
                                                [e.target.value],
                                                Object(V.a)(o.slice(a + 1))
                                              )
                                            ),
                                          1 === e.target.value.length &&
                                            document.getElementById(
                                              'input' + (a + 1)
                                            ) &&
                                            document
                                              .getElementById('input' + (a + 1))
                                              .focus();
                                      },
                                      onKeyDown: function (e) {
                                        8 === e.keyCode &&
                                          0 === e.target.value.length &&
                                          document.getElementById(
                                            'input' + (a - 1)
                                          ) &&
                                          (document
                                            .getElementById('input' + (a - 1))
                                            .focus(),
                                          l(
                                            [].concat(
                                              Object(V.a)(o.slice(0, a - 1)),
                                              [''],
                                              Object(V.a)(o.slice(a))
                                            )
                                          )),
                                          17 !== e.keyCode &&
                                            86 !== e.keyCode &&
                                            8 !== e.keyCode &&
                                            67 !== e.keyCode &&
                                            /\D/g.test(
                                              String.fromCharCode(e.keyCode)
                                            ) &&
                                            e.preventDefault();
                                      },
                                    },
                                    a
                                  )
                                );
                              },
                              n = 0;
                            n < t;
                            n++
                          )
                            r(n);
                          return (
                            e &&
                              c.push(
                                Object(s.jsx)('span', {
                                  className: 'error',
                                  children: 'Codigo incorrecto',
                                })
                              ),
                            c
                          );
                        })(y),
                      }),
                    Object(s.jsx)('button', {
                      type: 'submit',
                      className: 'primary block',
                      children: a.exists
                        ? 'Verificar el c\xf3digo'
                        : 'Continuar',
                    }),
                  ],
                }),
              }),
            ],
          });
        },
        Y = a(80),
        J = function (e) {
          var t = new URLSearchParams(e.location.search),
            a = Object(j.c)(function (e) {
              return e.categoryList;
            }),
            r = a.loading,
            n = a.error,
            i = a.categories,
            o = Object(j.c)(function (e) {
              return e.userLogin;
            }).user,
            l = Object(j.c)(function (e) {
              return e.userDetails;
            }),
            d = (l.loading, l.error),
            m = l.user,
            p = Object(j.c)(function (e) {
              return e.userUpdateProductDrafts;
            }),
            g = p.loading,
            x = p.error,
            v = t.get('draft'),
            S = Object(c.useState)(''),
            N = Object(u.a)(S, 2),
            C = N[0],
            _ = N[1],
            w = Object(c.useState)(''),
            R = Object(u.a)(w, 2),
            U = R[0],
            I = R[1],
            T = Object(c.useState)(null),
            L = Object(u.a)(T, 2),
            A = L[0],
            q = L[1],
            P = Object(c.useState)(null),
            F = Object(u.a)(P, 2),
            M = F[0],
            B = F[1],
            G = Object(c.useState)([]),
            Q = Object(u.a)(G, 2),
            z = Q[0],
            H = Q[1],
            J = Object(c.useState)(-1),
            K = Object(u.a)(J, 2),
            $ = K[0],
            W = K[1],
            X = Object(c.useState)(C ? C.stock : ''),
            Z = Object(u.a)(X, 2),
            ee = Z[0],
            te = Z[1],
            ae = Object(c.useState)(!1),
            se = Object(u.a)(ae, 2),
            ce = se[0],
            re = se[1],
            ne = Object(c.useState)(''),
            ie = Object(u.a)(ne, 2),
            oe = ie[0],
            le = ie[1],
            de = Object(c.useState)(''),
            ue = Object(u.a)(de, 2),
            je = ue[0],
            me = ue[1],
            be = Object(c.useState)(!1),
            he = Object(u.a)(be, 2),
            pe = he[0],
            fe = he[1],
            Oe = Object(c.useState)(!1),
            ge = Object(u.a)(Oe, 2),
            xe = ge[0],
            ve = ge[1],
            Se = Object(c.useState)(!1),
            ye = Object(u.a)(Se, 2),
            Ne = ye[0],
            Ee = ye[1],
            Ce = Object(c.useRef)(null),
            _e = Object(c.useRef)(null),
            we = Object(c.useRef)(null),
            ke = Object(j.b)();
          Object(c.useEffect)(function () {
            var e = function (e) {
              var t = Ce.current;
              t &&
                !t.contains(e.target) &&
                document
                  .querySelector('.searchbar-sell')
                  .classList.remove('focused');
            };
            document.addEventListener('mousedown', e);
            var t = function (e) {
              var t = _e.current;
              t &&
                !t.contains(e.target) &&
                (document.querySelector('#help-sign').classList.add('hidden'),
                setTimeout(function () {
                  fe(!1);
                }, 500));
            };
            document.addEventListener('mousedown', t);
            var a = function (e) {
              var t = we.current;
              t &&
                !t.contains(e.target) &&
                document.querySelector('#change-category-cancelbtn').click();
            };
            document.addEventListener('mousedown', a);
            var s = function () {
              window.scrollY >= 160
                ? document.querySelector('.new-product-steps') &&
                  (document.querySelector(
                    '.new-product-steps'
                  ).style.transform = 'translateY(5.5rem)')
                : document.querySelector('.new-product-steps') &&
                  (document.querySelector(
                    '.new-product-steps'
                  ).style.transform = 'translateY(0)');
            };
            document.addEventListener('scroll', s);
            var c = function (e) {
              e.preventDefault();
            };
            return (
              window.addEventListener('dragover', c, !1),
              window.addEventListener('drop', c, !1),
              function () {
                document.removeEventListener('mousedown', a),
                  document.removeEventListener('mousedown', t),
                  document.removeEventListener('mousedown', e),
                  document.removeEventListener('scroll', s),
                  window.removeEventListener('drop', c),
                  window.removeEventListener('dragover', c);
              }
            );
          }, []),
            Object(c.useEffect)(
              function () {
                ke(O(o._id));
              },
              [o, ke]
            ),
            Object(c.useEffect)(
              function () {
                '' === C &&
                  _(
                    v &&
                      m &&
                      m.productDrafts.find(function (e) {
                        return e._id === v;
                      })
                      ? m.productDrafts.find(function (e) {
                          return e._id === v;
                        })
                      : ''
                  );
              },
              [m, v, C]
            ),
            Object(c.useEffect)(
              function () {
                null === v && (_(''), W(0));
              },
              [v]
            ),
            Object(c.useEffect)(
              function () {
                I(C ? C.name : ''),
                  q(C ? C.category : null),
                  B(C ? C.isStateNew : null),
                  H(C ? C.images : []),
                  W(
                    '' !== C && '' !== C.name
                      ? null !== C.category
                        ? null !== C.isStateNew
                          ? C.images && C.images.length > 0
                            ? 100
                            : 67
                          : 33
                        : 16.5
                      : 0
                  ),
                  te(C ? C.stock : '');
              },
              [C]
            ),
            Object(c.useEffect)(
              function () {
                switch ($) {
                  case 0:
                  case 16.5:
                    document.querySelector('#first-step') &&
                      document.querySelector('#first-step').scrollIntoView();
                    break;
                  case 33:
                    g ||
                      x ||
                      (document.querySelector('#second-step') &&
                        document
                          .querySelector('#second-step')
                          .scrollIntoView());
                    break;
                  case 67:
                    !g &&
                      !x &&
                      document.querySelector('#third-step') &&
                      document.querySelector('#third-step').scrollIntoView(),
                      le(''),
                      me('');
                    break;
                  case 100:
                    !g && !x && window.scrollTo(0, document.body.scrollHeight);
                }
              },
              [$, g, x]
            ),
            Object(c.useEffect)(
              function () {
                $ >= 33 &&
                  null === v &&
                  m &&
                  m.productDrafts[m.productDrafts.length - 1] &&
                  e.history.push(
                    'producto?draft=' +
                      m.productDrafts[m.productDrafts.length - 1]._id
                  );
              },
              [m]
            ),
            Object(c.useEffect)(
              function () {
                pe &&
                  document
                    .querySelector('#help-sign')
                    .classList.remove('hidden'),
                  (document.querySelector('body').style.overflow = pe
                    ? 'hidden'
                    : 'auto');
              },
              [pe]
            ),
            Object(c.useEffect)(
              function () {
                xe &&
                  document
                    .querySelector('#change-category-sign')
                    .classList.remove('hidden'),
                  (document.querySelector('body').style.overflow = xe
                    ? 'hidden'
                    : 'auto');
              },
              [xe]
            ),
            Object(c.useEffect)(
              function () {
                $ >= 16.5 &&
                  i &&
                  i.length < 1 &&
                  ke(
                    (function () {
                      var e = Object(h.a)(
                        b.a.mark(function e(t) {
                          var a, s;
                          return b.a.wrap(
                            function (e) {
                              for (;;)
                                switch ((e.prev = e.next)) {
                                  case 0:
                                    return (
                                      t({ type: 'CATEGORY_LIST_REQUEST' }),
                                      (e.prev = 1),
                                      (e.next = 4),
                                      f.a.get('/api/categories')
                                    );
                                  case 4:
                                    (a = e.sent),
                                      (s = a.data),
                                      t({
                                        type: 'CATEGORY_LIST_SUCCESS',
                                        payload: s,
                                      }),
                                      (e.next = 12);
                                    break;
                                  case 9:
                                    (e.prev = 9),
                                      (e.t0 = e.catch(1)),
                                      t({
                                        type: 'CATEGORY_LIST_FAIL',
                                        payload:
                                          e.t0.response &&
                                          e.t0.response.data.message
                                            ? e.t0.response.data.message
                                            : e.t0.message,
                                      });
                                  case 12:
                                  case 'end':
                                    return e.stop();
                                }
                            },
                            e,
                            null,
                            [[1, 9]]
                          );
                        })
                      );
                      return function (t) {
                        return e.apply(this, arguments);
                      };
                    })()
                  );
              },
              [ke, $, i]
            ),
            Object(c.useEffect)(
              function () {
                '' !== C &&
                  g &&
                  !x &&
                  (!0 === C.isStateNew || !1 === C.isStateNew
                    ? C.images && C.images.length > 0 && parseInt(ee) > 0 && !Ne
                      ? W(100)
                      : (W(67), B(C.isStateNew))
                    : W(33));
              },
              [g, x, C, ee, Ne]
            );
          var Re = function (e) {
              var t = new FileReader();
              t.readAsDataURL(e),
                (t.onload = function (e) {
                  var a = new Image();
                  (a.src = e.target.result),
                    (a.onload = function () {
                      var e = this,
                        a = this.height,
                        s = this.width;
                      a < 500 || s < 500
                        ? Te(
                            t.result,
                            '- El tama\xf1o es menor a 500 x 500 px.'
                          )
                        : (W(67),
                          H(function (t) {
                            return [].concat(Object(V.a)(t), [e.src]);
                          }));
                    });
                });
            },
            Ue = function (e) {
              return Object(s.jsxs)('div', {
                id: 'second-step',
                className:
                  'screen-mini-card medium' +
                  ('disabled' === e ? ' disabled' : ''),
                children: [
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-header-title',
                    children: Object(s.jsx)('h2', {
                      children:
                        '\xbfCu\xe1l es la condici\xf3n de tu producto?',
                    }),
                  }),
                  Object(s.jsxs)('ul', {
                    children: [
                      Object(s.jsx)('li', {
                        className:
                          'sell-stateBtn-nuevo multiple-selection-btn' +
                          (!0 === M ? ' selected' : ''),
                        children: Object(s.jsx)('button', {
                          className: 'list-item padding',
                          onClick: function () {
                            !0 !== M &&
                              (B(!0),
                              _(
                                Object(k.a)(
                                  Object(k.a)({}, C),
                                  {},
                                  { isStateNew: !0 }
                                )
                              ),
                              ke(
                                y(
                                  Object(k.a)(
                                    Object(k.a)({}, C),
                                    {},
                                    { isStateNew: !0, _id: v || null }
                                  )
                                )
                              ));
                          },
                          children: 'Nuevo',
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className:
                          'sell-stateBtn-usado multiple-selection-btn' +
                          (!1 === M ? ' selected' : ''),
                        children: Object(s.jsx)('button', {
                          className: 'list-item padding',
                          onClick: function () {
                            !1 !== M &&
                              (B(!1),
                              _(
                                Object(k.a)(
                                  Object(k.a)({}, C),
                                  {},
                                  { isStateNew: !1 }
                                )
                              ),
                              ke(
                                y(
                                  Object(k.a)(
                                    Object(k.a)({}, C),
                                    {},
                                    {
                                      name: U,
                                      category: A,
                                      isStateNew: !1,
                                      images: z,
                                      _id: v || null,
                                    }
                                  )
                                )
                              ));
                          },
                          children: 'Usado',
                        }),
                      }),
                    ],
                  }),
                ],
              });
            },
            Ie = function (e) {
              return Object(s.jsxs)('div', {
                id: 'third-step',
                className:
                  'screen-mini-card medium' +
                  ('disabled' === e ? ' disabled' : ''),
                children: [
                  Object(s.jsxs)('div', {
                    className: 'screen-mini-card-header-title',
                    children: [
                      Object(s.jsx)('h2', {
                        children:
                          'Complet\xe1 la informaci\xf3n de tu producto',
                      }),
                      Object(s.jsx)('button', {
                        className: 'hover-btn absolute-right',
                        onClick: function () {
                          fe(!0);
                        },
                        children: Object(s.jsx)('img', {
                          className: 'smaller',
                          src: 'https://svgshare.com/i/UKg.svg',
                          alt: 'Ayuda',
                        }),
                      }),
                    ],
                  }),
                  Object(s.jsxs)('div', {
                    className: 'screen-mini-card-body padding column',
                    children: [
                      Object(s.jsx)('div', {
                        className: 'message-div blue row',
                        children: Object(s.jsxs)('p', {
                          className: 'paragraph-with-icon bold',
                          children: [
                            Object(s.jsx)('img', {
                              src: 'https://svgshare.com/i/UNm.svg',
                              alt: 'tip',
                              className: 'absolute-left-top circle badge',
                            }),
                            'Para no perder exposici\xf3n, aseg\xfarate de que la primera foto tenga fondo blanco puro creado con un editor de im\xe1genes. No agregues bordes, logos ni marcas de agua.',
                            Object(s.jsx)('a', {
                              href: '#masconsejos',
                              children: 'Ver m\xe1s consejos.',
                            }),
                          ],
                        }),
                      }),
                      Object(s.jsxs)('div', {
                        className:
                          'message-div red row' + (oe ? '' : ' no-display'),
                        children: [
                          Object(s.jsxs)('div', {
                            className: 'width-100 relative',
                            children: [
                              Object(s.jsxs)('p', {
                                className: 'paragraph-with-icon bold',
                                children: [
                                  Object(s.jsx)('img', {
                                    src: 'https://svgshare.com/i/UQW.svg',
                                    alt: 'tip',
                                    className: 'absolute-left-top circle badge',
                                  }),
                                  oe,
                                ],
                              }),
                              oe.includes('no cumple los requisitos') &&
                                Object(s.jsxs)('button', {
                                  className: 'simple absolute-right ',
                                  onClick: function (e) {
                                    var t = document.querySelector(
                                      '#revisar-btn-text'
                                    );
                                    (t.innerHTML =
                                      'Revisar ' === t.innerHTML
                                        ? 'Ocultar '
                                        : 'Revisar '),
                                      document
                                        .querySelector('#revisar-btn-angle')
                                        .classList.toggle('upside-down'),
                                      document
                                        .querySelector('.message-div.red')
                                        .classList.toggle('height-auto');
                                  },
                                  children: [
                                    Object(s.jsx)('span', {
                                      id: 'revisar-btn-text',
                                      children: 'Revisar ',
                                    }),
                                    Object(s.jsx)('i', {
                                      id: 'revisar-btn-angle',
                                      className: 'fas fa-angle-down',
                                    }),
                                  ],
                                }),
                            ],
                          }),
                          Object(s.jsx)('div', {
                            className: 'message-div-content',
                            children: Object(s.jsx)('ul', {
                              id: 'error-list',
                              className: 'width-100',
                            }),
                          }),
                        ],
                      }),
                      Object(s.jsx)('div', {
                        className:
                          'image-upload-images-container' +
                          (z.length > 0 ? ' with-scroll' : ''),
                        children: Object(s.jsxs)('ul', {
                          className:
                            'image-slider row flex-start gap-1' +
                            (z.length > 0 ? ' fit-content' : ''),
                          children: [
                            Object(s.jsxs)('div', {
                              className:
                                'upload-image-div center column' +
                                (z.length > 0 ? ' in-slider' : ''),
                              role: 'button',
                              onClick: function () {
                                document.querySelector('#inputfile').click();
                              },
                              onDragEnter: function (e) {
                                document
                                  .querySelector('.upload-image-div')
                                  .classList.add('on-drag');
                              },
                              onDragLeave: function (e) {
                                document
                                  .querySelector('.upload-image-div')
                                  .classList.remove('on-drag');
                              },
                              onDrop: function (e) {
                                if (
                                  (document
                                    .querySelector('.upload-image-div')
                                    .classList.remove('on-drag'),
                                  e.dataTransfer.files.length + z.length <= 10)
                                ) {
                                  document.querySelector(
                                    '#error-list'
                                  ).innerHTML = '';
                                  for (
                                    var t = 0;
                                    t < e.dataTransfer.files.length;
                                    t++
                                  )
                                    if (
                                      e.dataTransfer.files[t].size / 1e6 <=
                                      5
                                    ) {
                                      var a = e.dataTransfer.files[t].type;
                                      a.includes('image/jpeg') ||
                                      a.includes('image/png')
                                        ? Re(e.dataTransfer.files[t])
                                        : Te(
                                            'https://svgshare.com/i/UYj.svg',
                                            '- El formato no es JPG o PNG.'
                                          );
                                    } else
                                      Te(
                                        'https://svgshare.com/i/UYj.svg',
                                        '- El archivo pesa mas de 5mb'
                                      );
                                  '' ===
                                    document.querySelector('#error-list')
                                      .innerHTML && le('');
                                } else
                                  document.querySelector('.message-div.red') &&
                                    document
                                      .querySelector('.message-div.red')
                                      .classList.remove('height-auto'),
                                    (document.querySelector(
                                      '#error-list'
                                    ).innerHTML = ''),
                                    le('Puedes subir como m\xe1ximo 10 fotos.');
                              },
                              children: [
                                Object(s.jsx)('img', {
                                  src: 'https://svgshare.com/i/UPJ.svg',
                                  alt: 'camara',
                                }),
                                Object(s.jsxs)('span', {
                                  className:
                                    z.length > 0
                                      ? 'small-text bold'
                                      : 'subtle-text',
                                  children: [
                                    'Agrega o arrastra tus',
                                    Object(s.jsx)('br', {}),
                                    ' fotos aqu\xed',
                                  ],
                                }),
                                Object(s.jsx)('input', {
                                  style: { display: 'none' },
                                  id: 'inputfile',
                                  type: 'file',
                                  accept: 'image/x-png,image/jpeg,image/jpg',
                                  onChange: function (e) {
                                    if (
                                      e.target.files.length + z.length <=
                                      10
                                    ) {
                                      document.querySelector(
                                        '#error-list'
                                      ).innerHTML = '';
                                      for (
                                        var t = 0;
                                        t < e.target.files.length;
                                        t++
                                      )
                                        if (e.target.files[t].size / 1e6 <= 5) {
                                          var a = e.target.files[t].type;
                                          a.includes('image/jpeg') ||
                                          a.includes('image/png')
                                            ? Re(e.target.files[t])
                                            : Te(
                                                'https://svgshare.com/i/UYj.svg',
                                                '- El formato no es JPG o PNG.'
                                              );
                                        } else
                                          Te(
                                            'https://svgshare.com/i/UYj.svg',
                                            '- El archivo pesa mas de 5mb'
                                          );
                                      '' ===
                                        document.querySelector('#error-list')
                                          .innerHTML && le('');
                                    } else
                                      document.querySelector(
                                        '.message-div.red'
                                      ) &&
                                        document
                                          .querySelector('.message-div.red')
                                          .classList.remove('height-auto'),
                                        (document.querySelector(
                                          '#error-list'
                                        ).innerHTML = ''),
                                        le(
                                          'Puedes subir como m\xe1ximo 10 fotos.'
                                        );
                                    e.target.value = '';
                                  },
                                  multiple: !0,
                                }),
                              ],
                            }),
                            z &&
                              z.length > 0 &&
                              z.map(function (e, t) {
                                return Object(s.jsxs)(
                                  'li',
                                  {
                                    className: 'image-slider-item',
                                    children: [
                                      Object(s.jsx)('img', {
                                        className: 'center-cropped',
                                        src: e,
                                        alt: 'Subida',
                                      }),
                                      0 === t &&
                                        Object(s.jsx)('div', {
                                          className:
                                            'absolute-bottom width-100 cover-page',
                                          children: Object(s.jsx)('h3', {
                                            children: 'Portada',
                                          }),
                                        }),
                                      Object(s.jsxs)('div', {
                                        className: 'image-slider-item-options',
                                        children: [
                                          Object(s.jsx)('button', {
                                            className: 'image-slider-arrow-btn',
                                            onClick: function () {
                                              W(67),
                                                Ee(!0),
                                                H(
                                                  Object(Y.move)(
                                                    z,
                                                    t,
                                                    t - 1,
                                                    !1
                                                  )
                                                );
                                            },
                                            children: Object(s.jsx)('i', {
                                              className: 'fas fa-caret-left',
                                            }),
                                          }),
                                          Object(s.jsx)('button', {
                                            className: 'image-slider-del-btn',
                                            onClick: function () {
                                              W(67),
                                                Ee(!0),
                                                H(function (e) {
                                                  return [].concat(
                                                    Object(V.a)(e.slice(0, t)),
                                                    Object(V.a)(e.slice(t + 1))
                                                  );
                                                });
                                            },
                                            children: Object(s.jsx)('img', {
                                              src:
                                                'https://svgshare.com/i/Ucx.svg',
                                              alt: 'boton borrar',
                                            }),
                                          }),
                                          Object(s.jsx)('button', {
                                            className: 'image-slider-arrow-btn',
                                            onClick: function () {
                                              W(67),
                                                Ee(!0),
                                                H(
                                                  Object(Y.move)(
                                                    z,
                                                    t,
                                                    t + 1,
                                                    !1
                                                  )
                                                );
                                            },
                                            children: Object(s.jsx)('i', {
                                              className: 'fas fa-caret-right',
                                            }),
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  t
                                );
                              }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper sell',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              maxLength: '5',
                              className: je ? 'error' : '',
                              value: ee > 0 ? E(ee) : '',
                              onChange: function (e) {
                                te(e.target.value.split('.').join('')),
                                  0 === e.target.value.length ||
                                  '0' === e.target.value
                                    ? me('La cantidad m\xednima es 1.')
                                    : (W(67), Ee(!0), me(''));
                              },
                              onKeyDown: function (e) {
                                (e.keyCode >= 48 && e.keyCode <= 57) ||
                                  8 === e.keyCode ||
                                  37 === e.keyCode ||
                                  39 === e.keyCode ||
                                  46 === e.keyCode ||
                                  e.preventDefault();
                              },
                            }),
                            Object(s.jsx)('div', {
                              className: 'underline' + (je ? ' error' : ''),
                            }),
                            Object(s.jsx)('label', { children: 'Cantidad' }),
                            Object(s.jsx)('span', {
                              className:
                                'subtle-text' + (je ? ' error' : ' noerror'),
                              children: je && je,
                            }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  $ < 100 &&
                    Object(s.jsxs)('div', {
                      className: 'screen-mini-card-footer flex-end',
                      children: [
                        Object(s.jsx)('button', {
                          className: 'secondary',
                          onClick: function () {
                            return H([]);
                          },
                          children: 'Cancelar',
                        }),
                        Object(s.jsx)('button', {
                          className: 'primary',
                          onClick: function () {
                            z.length > 0
                              ? '' !== ee && parseInt(ee) > 0
                                ? (_(
                                    Object(k.a)(
                                      Object(k.a)({}, C),
                                      {},
                                      { images: z, stock: parseInt(ee) }
                                    )
                                  ),
                                  ke(
                                    y(
                                      Object(k.a)(
                                        Object(k.a)({}, C),
                                        {},
                                        {
                                          images: z,
                                          stock: parseInt(ee),
                                          _id: v || null,
                                        }
                                      )
                                    )
                                  ),
                                  Ee(!1))
                                : me('La cantidad m\xednima es 1.')
                              : (le('Agreg\xe1 al menos una foto.'),
                                ('' !== ee && 0 !== parseInt(ee)) ||
                                  me('La cantidad m\xednima es 1.'));
                          },
                          children: 'Confirmar',
                        }),
                      ],
                    }),
                ],
              });
            },
            Te = function (e, t) {
              var a = document.querySelector('#error-list')
                ? document.querySelector('#error-list').childElementCount + 1
                : 1;
              le(
                ''.concat(
                  a + (a > 1 ? ' fotos' : ' foto'),
                  ' no cumple los requisitos. Revisa los errores.'
                )
              ),
                document.querySelector('#error-list').insertAdjacentHTML(
                  'beforeend',
                  "<li><div class='row flex-start list-item "
                    .concat(
                      0 ===
                        document.querySelector('#error-list').childElementCount
                        ? 'first-child'
                        : '',
                      "'><img class='center-cropped invalid-img'src='"
                    )
                    .concat(e, "' alt='error'/><p class='bold'>")
                    .concat(t, '</p></div></li>')
                );
            };
          return Object(s.jsx)(s.Fragment, {
            children:
              d || n
                ? Object(s.jsx)('div', {
                    className: 'screen-mini-card medium',
                    children: Object(s.jsx)(D, {
                      variant: 'danger',
                      children: d || n,
                    }),
                  })
                : $ >= 0 &&
                  Object(s.jsxs)(s.Fragment, {
                    children: [
                      Object(s.jsx)('div', {
                        className: 'extra-header new-product',
                      }),
                      Object(s.jsxs)('div', {
                        className: 'new-product-steps',
                        children: [
                          Object(s.jsxs)('span', {
                            children: [
                              Object(s.jsx)('span', {
                                className: 'step-number',
                                children: '1',
                              }),
                              'Datos del producto',
                            ],
                          }),
                          Object(s.jsx)('div', {
                            className: 'progress-bar',
                            style: { width: $ + '%' },
                          }),
                        ],
                      }),
                      Object(s.jsxs)('div', {
                        className: 'column flex-start',
                        children: [
                          Object(s.jsxs)('div', {
                            className: 'row width-100',
                            style: { zIndex: '2', marginBottom: '6rem' },
                            children: [
                              Object(s.jsxs)('div', {
                                children: [
                                  Object(s.jsx)('span', {
                                    className: 'subtle-text',
                                    children: 'Paso 1 de 2',
                                  }),
                                  Object(s.jsx)('h1', {
                                    style: { fontSize: '2.5rem' },
                                    children:
                                      'Empecemos identificando tu producto',
                                  }),
                                ],
                              }),
                              Object(s.jsx)('img', {
                                src:
                                  'https://http2.mlstatic.com/secure/sell/images/shoe-v2.svg',
                                alt: 'arte de zapato',
                              }),
                            ],
                          }),
                          Object(s.jsxs)('div', {
                            id: 'first-step',
                            className:
                              'screen-mini-card medium' +
                              ($ > 16.5 && g ? ' disabled' : ''),
                            children: [
                              $ >= 16.5 &&
                                Object(s.jsxs)('div', {
                                  className: 'screen-mini-card-header',
                                  children: [
                                    ' ',
                                    Object(s.jsx)('a', {
                                      className: 'sell-back-to-search-btn',
                                      href: '#back',
                                      onClick: function (e) {
                                        e.preventDefault(), W(0), q(null);
                                      },
                                      children: 'Volver a buscar',
                                    }),
                                  ],
                                }),
                              Object(s.jsxs)('div', {
                                className:
                                  'screen-mini-card-body padding column',
                                children: [
                                  $ < 16.5
                                    ? Object(s.jsx)('h1', {
                                        children:
                                          'Indic\xe1 producto, marca, modelo y caracter\xedsticas principales',
                                      })
                                    : null === A
                                    ? Object(s.jsx)('h1', {
                                        children:
                                          '\xbfQu\xe9 opci\xf3n lo describe?',
                                      })
                                    : $ < 33
                                    ? Object(s.jsx)('h2', {
                                        children: 'Confirma la categor\xeda',
                                      })
                                    : Object(s.jsx)('h2', {
                                        children:
                                          'La categor\xeda que elegiste',
                                      }),
                                  $ < 16.5 &&
                                    Object(s.jsx)(s.Fragment, {
                                      children: Object(s.jsxs)('div', {
                                        className: 'row',
                                        style: { marginBottom: '1rem' },
                                        children: [
                                          ' ',
                                          Object(s.jsxs)('div', {
                                            className: 'searchbar-sell',
                                            children: [
                                              Object(s.jsx)('i', {
                                                className: 'fa fa-search',
                                              }),
                                              Object(s.jsx)('input', {
                                                autoFocus: !0,
                                                maxLength: '120',
                                                value: U,
                                                onKeyDown: function (e) {
                                                  13 === e.keyCode &&
                                                    (U.trim().length > 0
                                                      ? (q(null), W(16.5))
                                                      : re(!0));
                                                },
                                                onChange: function (e) {
                                                  I(e.target.value), re(!1);
                                                },
                                                ref: Ce,
                                                onFocus: function () {
                                                  document
                                                    .querySelector(
                                                      '.searchbar-sell'
                                                    )
                                                    .classList.add('focused');
                                                },
                                                type: 'text',
                                                placeholder:
                                                  'Ej.: Celular Samsung Galaxy S9 64 GB Negro o 887276246529',
                                              }),
                                              Object(s.jsx)('i', {
                                                className: 'fas fa-times gray',
                                                onClick: function () {
                                                  return I('');
                                                },
                                              }),
                                            ],
                                          }),
                                          Object(s.jsx)('div', {
                                            className:
                                              'search-sell-subtext subtle-text' +
                                              (ce ? ' error' : ''),
                                            children: ce
                                              ? 'Para comenzar, indic\xe1 el producto que quer\xe9s publicar.'
                                              : 'Sum\xe1 las caracter\xedsticas principales del producto para mejorar la b\xfasqueda.',
                                          }),
                                          Object(s.jsx)('button', {
                                            className: 'primary margin-left',
                                            style: { width: '10rem' },
                                            onClick: function () {
                                              U.trim().length > 0
                                                ? (q(null), W(16.5))
                                                : re(!0);
                                            },
                                            children: 'Comenzar',
                                          }),
                                        ],
                                      }),
                                    }),
                                  r
                                    ? Object(s.jsx)(s.Fragment, {})
                                    : n
                                    ? Object(s.jsx)('div', {
                                        className: 'screen-mini-card medium',
                                        children: Object(s.jsx)(D, {
                                          variant: 'danger',
                                          children: n,
                                        }),
                                      })
                                    : Object(s.jsxs)(s.Fragment, {
                                        children: [
                                          null === A &&
                                            $ >= 16.5 &&
                                            Object(s.jsx)('div', {
                                              className:
                                                'sell-categories-list-container',
                                              children: Object(s.jsx)('ul', {
                                                className:
                                                  'sell-categories-list',
                                                children: i.map(function (e) {
                                                  return Object(s.jsx)(
                                                    'li',
                                                    {
                                                      children: Object(s.jsxs)(
                                                        'button',
                                                        {
                                                          onClick: function () {
                                                            q(e._id);
                                                          },
                                                          children: [
                                                            e.name,
                                                            Object(s.jsx)('i', {
                                                              className:
                                                                'fas fa-angle-right absolute-right',
                                                            }),
                                                          ],
                                                        }
                                                      ),
                                                    },
                                                    e._id
                                                  );
                                                }),
                                              }),
                                            }),
                                          null !== A &&
                                            (i &&
                                            i.find(function (e) {
                                              return e._id === A;
                                            })
                                              ? Object(s.jsxs)('div', {
                                                  className: 'column',
                                                  style: { gap: '2rem' },
                                                  children: [
                                                    ' ',
                                                    Object(s.jsxs)('span', {
                                                      className:
                                                        'selected-category-sell',
                                                      children: [
                                                        Object(s.jsx)('img', {
                                                          src: i.find(function (
                                                            e
                                                          ) {
                                                            return e._id === A;
                                                          }).svg,
                                                          onLoad: function () {
                                                            document.querySelector(
                                                              '#selected-category-name'
                                                            ).style.display =
                                                              'flex';
                                                          },
                                                          alt:
                                                            i.find(function (
                                                              e
                                                            ) {
                                                              return (
                                                                e._id === A
                                                              );
                                                            }).name + 'logo',
                                                        }),
                                                        Object(s.jsxs)('span', {
                                                          className: 'column',
                                                          id:
                                                            'selected-category-name',
                                                          hidden: !0,
                                                          children: [
                                                            Object(s.jsx)(
                                                              'span',
                                                              {
                                                                children: i.find(
                                                                  function (e) {
                                                                    return (
                                                                      e._id ===
                                                                      A
                                                                    );
                                                                  }
                                                                ).name,
                                                              }
                                                            ),
                                                            $ >= 33 &&
                                                              Object(s.jsx)(
                                                                'a',
                                                                {
                                                                  href:
                                                                    '#cambiar-categoria',
                                                                  onClick: function () {
                                                                    q(null),
                                                                      W(16.5);
                                                                  },
                                                                  children:
                                                                    'Elegir otra',
                                                                }
                                                              ),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    $ <= 33 &&
                                                      Object(s.jsx)('span', {
                                                        children:
                                                          'Es muy importante que la categor\xeda sea la apropiada para que tus compradores encuentren tu producto. Si no lo es, podr\xedamos pedirte que vuelvas a publicar.',
                                                      }),
                                                  ],
                                                })
                                              : Object(s.jsx)('div', {
                                                  className:
                                                    'screen-mini-card medium',
                                                  children: Object(s.jsx)(D, {
                                                    variant: 'danger',
                                                    children:
                                                      'Se ha producido un error, por favor vuelva a empezar',
                                                  }),
                                                })),
                                        ],
                                      }),
                                ],
                              }),
                              null !== A &&
                                !r &&
                                16.5 === $ &&
                                Object(s.jsx)('div', {
                                  className: 'screen-mini-card-footer flex-end',
                                  children: Object(s.jsx)('button', {
                                    className: 'primary',
                                    onClick: function () {
                                      '' === C ||
                                      null === C.category ||
                                      C.category === A
                                        ? (_({
                                            name: U,
                                            category: A,
                                            images: [],
                                          }),
                                          ke(
                                            y({
                                              name: U,
                                              category: A,
                                              _id: v || null,
                                            })
                                          ))
                                        : ve(!0);
                                    },
                                    children: 'Confirmar',
                                  }),
                                }),
                            ],
                          }),
                          33 === $
                            ? x
                              ? Object(s.jsx)('div', {
                                  className: 'screen-mini-card medium',
                                  children: Object(s.jsx)(D, {
                                    variant: 'danger',
                                    children: x,
                                  }),
                                })
                              : g || null === v
                              ? Ue('disabled')
                              : Ue()
                            : $ > 33 &&
                              (g || null === v ? Ue('disabled') : Ue()),
                          $ >= 67 &&
                            (g || null === v
                              ? Ie('disabled')
                              : x
                              ? Object(s.jsx)('div', {
                                  className: 'screen-mini-card medium',
                                  children: Object(s.jsx)(D, {
                                    variant: 'danger',
                                    children: x,
                                  }),
                                })
                              : Ie()),
                          100 === $ &&
                            Object(s.jsxs)('div', {
                              className: 'row flex-end width-100',
                              children: [
                                Object(s.jsx)('button', {
                                  className: 'primary',
                                  disabled: !(!g && !x),
                                  onClick: function () {
                                    document
                                      .querySelector('#siguiente-link')
                                      .click();
                                  },
                                  children: 'Siguiente',
                                }),
                                Object(s.jsx)('a', {
                                  id: 'siguiente-link',
                                  href: '/publicar?draft=' + v,
                                  hidden: !0,
                                  children: 'Siguiente',
                                }),
                              ],
                            }),
                        ],
                      }),
                      pe &&
                        Object(s.jsx)('div', {
                          id: 'help-sign',
                          className: 'modal-bg hidden center',
                          children: Object(s.jsxs)('div', {
                            className: 'screen-mini-card medium',
                            ref: _e,
                            children: [
                              Object(s.jsxs)('div', {
                                className: 'screen-mini-card-header-title',
                                children: [
                                  Object(s.jsx)('h1', {
                                    children:
                                      'Sac\xe1 las mejores fotos para no perder exposici\xf3n',
                                  }),
                                  Object(s.jsx)('i', {
                                    className:
                                      'fas fa-times absolute-right less-right blue',
                                    onClick: function () {
                                      document
                                        .querySelector('#help-sign')
                                        .classList.add('hidden'),
                                        setTimeout(function () {
                                          fe(!1);
                                        }, 500);
                                    },
                                  }),
                                ],
                              }),
                              Object(s.jsxs)('div', {
                                className: 'screen-mini-card-body padding',
                                children: [
                                  Object(s.jsxs)('div', {
                                    className: 'half-body',
                                    children: [
                                      Object(s.jsxs)('p', {
                                        className: 'paragraph-with-icon bold',
                                        children: [
                                          Object(s.jsx)('img', {
                                            src:
                                              'https://svgshare.com/i/ULR.svg',
                                            className:
                                              'very-small absolute-left-top',
                                            alt: 'check',
                                          }),
                                          'Utiliz\xe1 un editor de im\xe1genes para crear un fondo blanco puro para tu producto. No publiques fotos de tu producto frente una pared u otro elemento.',
                                        ],
                                      }),
                                      Object(s.jsxs)('p', {
                                        className: 'paragraph-with-icon bold',
                                        children: [
                                          Object(s.jsx)('img', {
                                            src:
                                              'https://svgshare.com/i/ULR.svg',
                                            className:
                                              'very-small absolute-left-top',
                                            alt: 'check',
                                          }),
                                          'No le agregues bordes, logos, marcas de agua, banners ni textos promocionales.',
                                        ],
                                      }),
                                      Object(s.jsxs)('p', {
                                        className: 'paragraph-with-icon bold',
                                        children: [
                                          Object(s.jsx)('img', {
                                            src:
                                              'https://svgshare.com/i/ULR.svg',
                                            className:
                                              'very-small absolute-left-top',
                                            alt: 'check',
                                          }),
                                          '\xa1Sac\xe1 fotos grandes! Como m\xednimo deben tener 500 p\xedxeles en uno de sus lados. Te recomendamos 1200 x 1200, para que puedan hacer zoom.',
                                        ],
                                      }),
                                      Object(s.jsxs)('p', {
                                        className: 'paragraph-with-icon bold',
                                        children: [
                                          Object(s.jsx)('img', {
                                            src:
                                              'https://svgshare.com/i/ULR.svg',
                                            className:
                                              'very-small absolute-left-top',
                                            alt: 'check',
                                          }),
                                          'Mostr\xe1 tu producto desde diferentes \xe1ngulos.',
                                        ],
                                      }),
                                      Object(s.jsxs)('p', {
                                        className: 'paragraph-with-icon bold',
                                        children: [
                                          Object(s.jsx)('img', {
                                            src:
                                              'https://svgshare.com/i/ULR.svg',
                                            className:
                                              'very-small absolute-left-top',
                                            alt: 'check',
                                          }),
                                          'Si necesit\xe1s mostrar c\xf3mo se ve tu producto en contexto, hacelo a partir de tu segunda imagen.',
                                        ],
                                      }),
                                    ],
                                  }),
                                  Object(s.jsx)('div', {
                                    className: 'half-body center',
                                    children: Object(s.jsx)('img', {
                                      className: 'medium',
                                      src: 'https://svgshare.com/i/UN4.svg',
                                      alt: 'Shoes',
                                    }),
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                      xe &&
                        Object(s.jsx)('div', {
                          id: 'change-category-sign',
                          className: 'modal-bg hidden center',
                          children: Object(s.jsxs)('div', {
                            className: 'screen-mini-card small',
                            ref: we,
                            children: [
                              Object(s.jsxs)('div', {
                                className: 'screen-mini-card-header-title',
                                children: [
                                  Object(s.jsx)('h1', {
                                    children:
                                      'Con este cambio, perder\xe1s todos los datos que ya hab\xedas completado',
                                  }),
                                  Object(s.jsx)('i', {
                                    className:
                                      'fas fa-times absolute-right less-right blue',
                                    onClick: function () {
                                      document
                                        .querySelector(
                                          '#change-category-cancelbtn'
                                        )
                                        .click();
                                    },
                                  }),
                                ],
                              }),
                              Object(s.jsxs)('div', {
                                className:
                                  'screen-mini-card-body padding column gap-2',
                                children: [
                                  Object(s.jsx)('span', {
                                    className: 'subtle-text',
                                    children:
                                      'Como est\xe1s modificando informacion que elegiste, tendr\xe1s que volver a seleccionarla.',
                                  }),
                                  Object(s.jsxs)('div', {
                                    className: 'row flex-start gap-1',
                                    children: [
                                      Object(s.jsx)('button', {
                                        className: 'primary',
                                        onClick: function () {
                                          B(null),
                                            H([]),
                                            te(0),
                                            _({
                                              name: U,
                                              category: A,
                                              isStateNew: null,
                                              quantity: 0,
                                              images: [],
                                            }),
                                            ke(
                                              y({
                                                name: U,
                                                category: A,
                                                _id: v || null,
                                              })
                                            ),
                                            Ee(!1),
                                            document
                                              .querySelector(
                                                '#change-category-sign'
                                              )
                                              .classList.add('hidden'),
                                            setTimeout(function () {
                                              ve(!1);
                                            }, 500);
                                        },
                                        children: 'Aceptar',
                                      }),
                                      Object(s.jsx)('button', {
                                        id: 'change-category-cancelbtn',
                                        className: 'secondary',
                                        onClick: function () {
                                          q(C.category),
                                            _(
                                              Object(k.a)(
                                                Object(k.a)({}, C),
                                                {},
                                                { name: U }
                                              )
                                            ),
                                            ke(
                                              y(
                                                Object(k.a)(
                                                  Object(k.a)({}, C),
                                                  {},
                                                  { name: U, _id: v || null }
                                                )
                                              )
                                            ),
                                            document
                                              .querySelector(
                                                '#change-category-sign'
                                              )
                                              .classList.add('hidden'),
                                            setTimeout(function () {
                                              ve(!1);
                                            }, 500);
                                        },
                                        children: 'Cancelar',
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                        }),
                    ],
                  }),
          });
        },
        K = function (e) {
          var t = e.component,
            a = Object(R.a)(e, ['component']),
            c = Object(j.c)(function (e) {
              return e.userCheckName;
            }).user;
          return Object(s.jsx)(
            l.b,
            Object(k.a)(
              Object(k.a)({}, a),
              {},
              {
                render: function (e) {
                  return c
                    ? Object(s.jsx)(t, Object(k.a)({}, e))
                    : Object(s.jsx)(l.a, { to: '/login' });
                },
              }
            )
          );
        },
        $ = function (e) {
          var t = e.component,
            a = Object(R.a)(e, ['component']),
            c = localStorage.getItem('RegisterCacheValues');
          return Object(s.jsx)(
            l.b,
            Object(k.a)(
              Object(k.a)({}, a),
              {},
              {
                render: function (e) {
                  return c
                    ? Object(s.jsx)(t, Object(k.a)({}, e))
                    : Object(s.jsx)(l.a, { to: '/' });
                },
              }
            )
          );
        },
        W = function () {
          var e = Object(j.c)(function (e) {
              return e.userLogin;
            }),
            t = e.error,
            a = e.user,
            r = Object(j.c)(function (e) {
              return e.userDetails;
            }),
            n = r.error,
            i = r.user,
            o = Object(j.c)(function (e) {
              return e.userDeleteProductDrafts;
            }),
            d = o.loading,
            m = o.error,
            b = Object(j.b)(),
            h = Object(c.useState)([]),
            p = Object(u.a)(h, 2),
            f = p[0],
            g = p[1],
            x = [
              'Enero',
              'Febrero',
              'Marzo',
              'Abril',
              'Mayo',
              'Junio',
              'Julio',
              'Agosto',
              'Septiembre',
              'Octubre',
              'Noviembre',
              'Diciembre',
            ];
          Object(c.useEffect)(
            function () {
              b(O(a._id));
            },
            [a, b]
          ),
            Object(c.useEffect)(
              function () {
                i && i.productDrafts && g(i.productDrafts);
              },
              [i]
            );
          return Object(s.jsx)(s.Fragment, {
            children:
              t || n
                ? Object(s.jsx)('div', {
                    className: 'screen-mini-card medium',
                    children: Object(s.jsx)(D, {
                      variant: 'danger',
                      children: t || n,
                    }),
                  })
                : i && i.productDrafts.length < 1
                ? Object(s.jsx)(l.a, { to: '/vender/producto' })
                : f.length > 0 &&
                  Object(s.jsxs)(s.Fragment, {
                    children: [
                      Object(s.jsx)('div', { className: 'extra-header post' }),
                      Object(s.jsxs)('div', {
                        className: 'column flex-start',
                        children: [
                          Object(s.jsxs)('h1', {
                            children: [
                              'Hola ',
                              a && a.name,
                              ',',
                              Object(s.jsx)('br', {}),
                              ' \xa1qu\xe9 bueno volver a verte!',
                            ],
                          }),
                          Object(s.jsxs)('div', {
                            className: 'screen-mini-card post-screen',
                            children: [
                              Object(s.jsx)('div', {
                                className: 'screen-mini-card-header-title',
                                children: Object(s.jsx)('h2', {
                                  children:
                                    '\xbfQu\xe9 publicaci\xf3n quer\xe9s continuar?',
                                }),
                              }),
                              Object(s.jsx)('div', {
                                className: 'screen-mini-card-body',
                                children: Object(s.jsx)('ul', {
                                  className: 'in-container',
                                  children: (function () {
                                    for (
                                      var e = [],
                                        t = i && f.length - 1,
                                        a = function (t) {
                                          f[t] &&
                                            e.push(
                                              Object(s.jsxs)(
                                                'li',
                                                {
                                                  className: 'list-relative',
                                                  children: [
                                                    Object(s.jsxs)('a', {
                                                      className:
                                                        'list-item padding row flex-start',
                                                      href: f[t].address
                                                        ? '/publicar?draft=' +
                                                          f[t]._id
                                                        : '/vender/producto?draft=' +
                                                          f[t]._id,
                                                      children: [
                                                        Object(s.jsx)('img', {
                                                          className:
                                                            'list-img center-cropped',
                                                          src:
                                                            f[t].images.length >
                                                            0
                                                              ? f[t].images[0]
                                                              : 'https://http2.mlstatic.com/secure/sell/draft_default.svg',
                                                          alt:
                                                            'Imagen del producto',
                                                        }),
                                                        Object(s.jsxs)('div', {
                                                          className:
                                                            'column list-text-container',
                                                          children: [
                                                            Object(
                                                              s.jsx
                                                            )('span', {
                                                              children:
                                                                f[t].name,
                                                            }),
                                                            Object(
                                                              s.jsxs
                                                            )('span', {
                                                              className:
                                                                'subtle-text',
                                                              children: [
                                                                Object(
                                                                  s.jsx
                                                                )('img', {
                                                                  className:
                                                                    'very-small little-margin-right',
                                                                  src:
                                                                    'https://svgshare.com/i/UJR.svg',
                                                                  alt: '',
                                                                }),
                                                                'Publicaci\xf3n iniciada el ' +
                                                                  parseInt(
                                                                    f[
                                                                      t
                                                                    ].date.split(
                                                                      '-'
                                                                    )[2]
                                                                  ) +
                                                                  ' de ' +
                                                                  x[
                                                                    parseInt(
                                                                      f[
                                                                        t
                                                                      ].date.split(
                                                                        '-'
                                                                      )[1]
                                                                    )
                                                                  ],
                                                              ],
                                                            }),
                                                          ],
                                                        }),
                                                      ],
                                                    }),
                                                    Object(s.jsx)('button', {
                                                      className:
                                                        'list-delete absolute-right',
                                                      onClick: function () {
                                                        b(N(f[t]._id));
                                                      },
                                                      children: Object(
                                                        s.jsx
                                                      )('img', {
                                                        className: 'small',
                                                        src:
                                                          'https://svgshare.com/i/UJB.svg',
                                                        alt: 'Boton borrar',
                                                      }),
                                                    }),
                                                  ],
                                                },
                                                t
                                              )
                                            );
                                        },
                                        c = t;
                                      c > t - 3;
                                      c--
                                    )
                                      a(c);
                                    return e;
                                  })(),
                                }),
                              }),
                              Object(s.jsx)('div', {
                                className: 'screen-mini-card-footer',
                                children: Object(s.jsx)('a', {
                                  href: '/vender/producto',
                                  children: 'Iniciar nueva publicaci\xf3n',
                                }),
                              }),
                            ],
                          }),
                          !d &&
                            m &&
                            Object(s.jsx)('div', {
                              className: 'screen-mini-card medium',
                              children: Object(s.jsx)(D, {
                                variant: 'danger',
                                children: m,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
          });
        },
        X = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userLogin;
            }),
            a = (t.loading, t.error),
            r = t.user,
            n = Object(j.c)(function (e) {
              return e.userDetails;
            }),
            i = n.loading,
            o = n.error,
            d = n.user,
            m = Object(j.c)(function (e) {
              return e.userUpdateProductDrafts;
            }),
            p = m.loading,
            g = m.error,
            x = Object(j.c)(function (e) {
              return e.userDeleteProductDrafts;
            }),
            v = x.error,
            S = x.deleted,
            C = Object(j.c)(function (e) {
              return e.newProduct;
            }),
            _ = (C.error, C.product),
            w = Object(j.c)(function (e) {
              return e.userAddProducts;
            }),
            R = (w.error, w.added),
            U = Object(j.b)(),
            I = new URLSearchParams(e.location.search).get('draft'),
            T = Object(c.useState)(null),
            L = Object(u.a)(T, 2),
            A = L[0],
            q = L[1],
            P = Object(c.useState)(0),
            F = Object(u.a)(P, 2),
            M = F[0],
            V = F[1],
            B = Object(c.useState)(0),
            G = Object(u.a)(B, 2),
            Q = G[0],
            z = G[1],
            H = Object(c.useState)(null),
            Y = Object(u.a)(H, 2),
            J = Y[0],
            K = Y[1],
            $ = Object(c.useState)(0),
            W = Object(u.a)($, 2),
            X = W[0],
            Z = W[1],
            ee = Object(c.useState)(''),
            te = Object(u.a)(ee, 2),
            ae = te[0],
            se = te[1],
            ce = Object(c.useState)(null),
            re = Object(u.a)(ce, 2),
            ne = re[0],
            ie = re[1],
            oe = Object(c.useState)(''),
            le = Object(u.a)(oe, 2),
            de = le[0],
            ue = le[1],
            je = Object(c.useState)(''),
            me = Object(u.a)(je, 2),
            be = me[0],
            he = me[1],
            pe = Object(c.useState)(''),
            fe = Object(u.a)(pe, 2),
            Oe = fe[0],
            ge = fe[1],
            xe = Object(c.useState)(!1),
            ve = Object(u.a)(xe, 2),
            Se = ve[0],
            ye = ve[1],
            Ne = Object(c.useState)(!1),
            Ee = Object(u.a)(Ne, 2),
            Ce = Ee[0],
            _e = Ee[1],
            we = Object(c.useState)(!1),
            ke = Object(u.a)(we, 2),
            Re = ke[0],
            Ue = ke[1],
            Ie = Object(c.useState)(!1),
            Te = Object(u.a)(Ie, 2),
            De = Te[0],
            Le = Te[1],
            Ae = Object(c.useState)(!1),
            qe = Object(u.a)(Ae, 2),
            Pe = qe[0],
            Fe = qe[1],
            Me = Object(c.useState)(''),
            Ve = Object(u.a)(Me, 2),
            Be = Ve[0],
            Ge = Ve[1];
          Object(c.useEffect)(function () {
            document.addEventListener('scroll', function () {
              window.scrollY >= 175
                ? document.querySelector('.new-product-steps') &&
                  (document.querySelector(
                    '.new-product-steps'
                  ).style.transform = 'translateY(5.5rem)')
                : document.querySelector('.new-product-steps') &&
                  (document.querySelector(
                    '.new-product-steps'
                  ).style.transform = 'translateY(0)');
            });
          }, []),
            Object(c.useEffect)(
              function () {
                var e =
                  d &&
                  !i &&
                  !p &&
                  d.productDrafts.find(function (e) {
                    return e._id.toString() === I;
                  });
                e && q(e);
              },
              [d, I, i, p]
            ),
            Object(c.useEffect)(
              function () {
                A &&
                  (null !== A.address && (K(A.address), V(25)),
                  A.price && (Z(A.price), V(50)),
                  null !== A.justShipping && (ie(A.justShipping), V(75)),
                  A.description && (ue(A.description), _e(!0)),
                  A.video && (he(A.video), Ue(!0), Ge(A.video.split('v=')[1]))),
                  ye(!1);
              },
              [A]
            ),
            Object(c.useEffect)(
              function () {
                M > Q && z(M);
              },
              [M, Q]
            ),
            Object(c.useEffect)(
              function () {
                switch (M) {
                  case 0:
                  case 25:
                    document.querySelector('#first-step') &&
                      document.querySelector('#first-step').scrollIntoView();
                    break;
                  case 50:
                    Se ||
                      (document.querySelector('#second-step') &&
                        document
                          .querySelector('#second-step')
                          .scrollIntoView());
                    break;
                  case 75:
                    !Se &&
                      document.querySelector('#third-step') &&
                      document.querySelector('#third-step').scrollIntoView();
                }
              },
              [M, Se]
            ),
            Object(c.useEffect)(
              function () {
                r && U(O(r._id));
              },
              [U, r]
            ),
            Object(c.useEffect)(
              function () {
                (p || i) && ye(!0);
              },
              [p, i]
            ),
            Object(c.useEffect)(
              function () {
                S &&
                  !_ &&
                  U(
                    (function (e) {
                      return (function () {
                        var t = Object(h.a)(
                          b.a.mark(function t(a, s) {
                            var c, r, n, i;
                            return b.a.wrap(
                              function (t) {
                                for (;;)
                                  switch ((t.prev = t.next)) {
                                    case 0:
                                      return (
                                        (c = s()),
                                        (r = c.userLogin.user),
                                        a({ type: 'NEW_PRODUCT_REQUEST' }),
                                        (t.prev = 2),
                                        (t.next = 5),
                                        f.a.post(
                                          'api/products/newProduct',
                                          { product: e, userId: r._id },
                                          {
                                            headers: {
                                              Authorization:
                                                'Bearer ' + r.token,
                                            },
                                          }
                                        )
                                      );
                                    case 5:
                                      (n = t.sent),
                                        (i = n.data),
                                        a({
                                          type: 'NEW_PRODUCT_SUCCESS',
                                          payload: i,
                                        }),
                                        (t.next = 13);
                                      break;
                                    case 10:
                                      (t.prev = 10),
                                        (t.t0 = t.catch(2)),
                                        a({
                                          type: 'NEW_PRODUCT_FAIL',
                                          payload:
                                            t.t0.response &&
                                            t.t0.response.data.message
                                              ? t.t0.response.data.message
                                              : t.t0.message,
                                        });
                                    case 13:
                                    case 'end':
                                      return t.stop();
                                  }
                              },
                              t,
                              null,
                              [[2, 10]]
                            );
                          })
                        );
                        return function (e, a) {
                          return t.apply(this, arguments);
                        };
                      })();
                    })(A)
                  );
              },
              [S, A, U]
            ),
            Object(c.useEffect)(
              function () {
                var e;
                _ &&
                  U(
                    ((e = _._id),
                    (function () {
                      var t = Object(h.a)(
                        b.a.mark(function t(a, s) {
                          var c, r;
                          return b.a.wrap(
                            function (t) {
                              for (;;)
                                switch ((t.prev = t.next)) {
                                  case 0:
                                    return (
                                      (c = s()),
                                      (r = c.userLogin.user),
                                      a({ type: 'USER_ADD_PRODUCTS_REQUEST' }),
                                      (t.prev = 2),
                                      (t.next = 5),
                                      f.a.post(
                                        '/api/users/addProducts',
                                        { productId: e, user: r },
                                        {
                                          headers: {
                                            Authorization: 'Bearer ' + r.token,
                                          },
                                        }
                                      )
                                    );
                                  case 5:
                                    t.sent.data,
                                      a({ type: 'USER_ADD_PRODUCTS_SUCCESS' }),
                                      (t.next = 13);
                                    break;
                                  case 10:
                                    (t.prev = 10),
                                      (t.t0 = t.catch(2)),
                                      a({
                                        type: 'USER_ADD_PRODUCTS_FAIL',
                                        payload:
                                          t.t0.response &&
                                          t.t0.response.data.message
                                            ? t.t0.response.data.message
                                            : t.t0.message,
                                      });
                                  case 13:
                                  case 'end':
                                    return t.stop();
                                }
                            },
                            t,
                            null,
                            [[2, 10]]
                          );
                        })
                      );
                      return function (e, a) {
                        return t.apply(this, arguments);
                      };
                    })())
                  );
              },
              [_, U]
            ),
            Object(c.useEffect)(
              function () {
                R && e.history.push('vender/producto-publicado');
              },
              [R]
            );
          var Qe = function () {
              var e = [];
              return (
                d &&
                  d.addresses.map(function (t, a) {
                    return e.push(
                      Object(s.jsx)(
                        'li',
                        {
                          className:
                            'list-relative multiple-selection-btn' +
                            (J === t._id ? ' selected' : ''),
                          children: Object(s.jsxs)('div', {
                            className: 'list-item padding',
                            children: [
                              Object(s.jsxs)('a', {
                                className: 'nodecoration',
                                href: '#Select-address',
                                onClick: function () {
                                  K(t._id),
                                    U(
                                      y(
                                        Object(k.a)(
                                          Object(k.a)({}, A),
                                          {},
                                          { address: t._id }
                                        )
                                      )
                                    );
                                },
                                children: [
                                  Object(s.jsx)('h4', {
                                    children:
                                      t.street +
                                      ' ' +
                                      (t.streetNumber ? t.streetNumber : ''),
                                  }),
                                  Object(s.jsx)('br', {}),
                                  Object(s.jsx)('span', {
                                    className: 'subtle-text',
                                    children: t.city + ', ' + t.province,
                                  }),
                                ],
                              }),
                              Object(s.jsx)('br', {}),
                              Object(s.jsx)('a', {
                                className: 'small',
                                onClick: function () {
                                  localStorage.setItem(
                                    'currentAddress',
                                    JSON.stringify(t)
                                  );
                                },
                                href: '/nueva-direccion?draft=' + I,
                                children: 'Modificar',
                              }),
                              Object(s.jsx)('button', {
                                className: 'list-delete absolute-right',
                                onClick: function () {
                                  var e;
                                  U(
                                    ((e = t._id),
                                    (function () {
                                      var t = Object(h.a)(
                                        b.a.mark(function t(a, s) {
                                          var c, r, n, i;
                                          return b.a.wrap(
                                            function (t) {
                                              for (;;)
                                                switch ((t.prev = t.next)) {
                                                  case 0:
                                                    return (
                                                      (c = s()),
                                                      (r = c.userLogin.user),
                                                      a({
                                                        type:
                                                          'USER_DELETE_ADDRESSES_REQUEST',
                                                      }),
                                                      (t.prev = 2),
                                                      (t.next = 5),
                                                      f.a.post(
                                                        '/api/users/deleteAddresses',
                                                        {
                                                          addressId: e,
                                                          user: r,
                                                        },
                                                        {
                                                          headers: {
                                                            Authorization:
                                                              'Bearer ' +
                                                              r.token,
                                                          },
                                                        }
                                                      )
                                                    );
                                                  case 5:
                                                    (n = t.sent),
                                                      (i = n.data),
                                                      a({
                                                        type:
                                                          'USER_DELETE_ADDRESSES_SUCCESS',
                                                        payload: i,
                                                      }),
                                                      localStorage.setItem(
                                                        'userInfo',
                                                        JSON.stringify(i)
                                                      ),
                                                      a({
                                                        type:
                                                          'USER_LOGIN_SUCCESS',
                                                        payload: i,
                                                      }),
                                                      (t.next = 15);
                                                    break;
                                                  case 12:
                                                    (t.prev = 12),
                                                      (t.t0 = t.catch(2)),
                                                      a({
                                                        type:
                                                          'USER_DELETE_ADDRESSES_FAIL',
                                                        payload:
                                                          t.t0.response &&
                                                          t.t0.response.data
                                                            .message
                                                            ? t.t0.response.data
                                                                .message
                                                            : t.t0.message,
                                                      });
                                                  case 15:
                                                  case 'end':
                                                    return t.stop();
                                                }
                                            },
                                            t,
                                            null,
                                            [[2, 12]]
                                          );
                                        })
                                      );
                                      return function (e, a) {
                                        return t.apply(this, arguments);
                                      };
                                    })())
                                  ),
                                    t._id === J &&
                                      (K(''),
                                      V(0),
                                      U(
                                        y(
                                          Object(k.a)(
                                            Object(k.a)({}, A),
                                            {},
                                            { address: null }
                                          )
                                        )
                                      ));
                                },
                                children: Object(s.jsx)('img', {
                                  className: 'small',
                                  src: 'https://svgshare.com/i/UJB.svg',
                                  alt: 'Boton borrar',
                                }),
                              }),
                            ],
                          }),
                        },
                        a
                      )
                    );
                  }),
                e
              );
            },
            ze = function (e) {
              return Object(s.jsxs)('div', {
                id: 'first-step',
                className:
                  'screen-mini-card medium' +
                  ('disabled' === e ? ' disabled' : ''),
                children: [
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-header-title',
                    children: Object(s.jsx)('h4', {
                      children: 'Direcci\xf3n de la venta',
                    }),
                  }),
                  d &&
                    (d.addresses.length > 0
                      ? Object(s.jsx)('ul', { children: Qe() })
                      : Object(s.jsx)('div', {
                          className: 'screen-mini-card-body padding',
                          children: Object(s.jsx)('h4', {
                            children:
                              'No ten\xe9s ninguna direcci\xf3n registrada',
                          }),
                        })),
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-footer',
                    children: Object(s.jsx)('a', {
                      onClick: function () {
                        localStorage.removeItem('currentAddress');
                      },
                      href: '/nueva-direccion?draft=' + I,
                      children: 'Cargar nueva direcci\xf3n',
                    }),
                  }),
                ],
              });
            },
            He = function (e) {
              return Object(s.jsxs)('div', {
                id: 'second-step',
                className:
                  'screen-mini-card medium' +
                  ('disabled' === e ? ' disabled' : ''),
                children: [
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-header-title',
                    children: Object(s.jsx)('h4', {
                      children: '\xbfCu\xe1l es el precio?',
                    }),
                  }),
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-body padding',
                    children: Object(s.jsx)('div', {
                      className: 'wrapper sell',
                      children: Object(s.jsxs)('div', {
                        className: 'underline-label-input',
                        children: [
                          Object(s.jsx)('input', {
                            placeholder: '$',
                            type: 'text',
                            maxLength: '12',
                            className: ae ? 'error' : '',
                            value: '$ ' + (X > 0 ? E(X) : ''),
                            onChange: function (e) {
                              V(25),
                                Z(
                                  e.target.value.split('$ ')[1]
                                    ? e.target.value
                                        .split('$ ')[1]
                                        .split('.')
                                        .join('')
                                    : 0
                                ),
                                2 === e.target.value.length ||
                                '$ ' === e.target.value
                                  ? se('El precio m\xednimo es 1.')
                                  : se('');
                            },
                            onKeyDown: function (e) {
                              (e.keyCode >= 48 && e.keyCode <= 57) ||
                                8 === e.keyCode ||
                                37 === e.keyCode ||
                                39 === e.keyCode ||
                                46 === e.keyCode ||
                                e.preventDefault();
                            },
                          }),
                          Object(s.jsx)('div', {
                            className: 'underline' + (ae ? ' error' : ''),
                          }),
                          Object(s.jsx)('span', {
                            className:
                              'subtle-text' + (ae ? ' error' : ' noerror'),
                            children: ae && ae,
                          }),
                        ],
                      }),
                    }),
                  }),
                  25 === M &&
                    Q >= 25 &&
                    Object(s.jsxs)('div', {
                      className: 'screen-mini-card-footer flex-end',
                      children: [
                        Object(s.jsx)('button', {
                          className: 'secondary',
                          disabled: !(X > 0),
                          onClick: function () {
                            Z(A.price ? A.price : 0), V(Q);
                          },
                          children: 'Cancelar',
                        }),
                        Object(s.jsx)('button', {
                          className: 'primary',
                          disabled: !(X > 0),
                          onClick: function () {
                            U(
                              y(
                                Object(k.a)(
                                  Object(k.a)({}, A),
                                  {},
                                  { price: X }
                                )
                              )
                            );
                          },
                          children: 'Confirmar',
                        }),
                      ],
                    }),
                ],
              });
            },
            Ye = function (e) {
              return Object(s.jsxs)('div', {
                id: 'third-step',
                className:
                  'screen-mini-card medium' +
                  ('disabled' === e ? ' disabled' : ''),
                children: [
                  Object(s.jsx)('div', {
                    className: 'screen-mini-card-header-title',
                    children: Object(s.jsx)('h4', {
                      children: '\xbfQuer\xe9s ofrecer retiro en persona?',
                    }),
                  }),
                  Object(s.jsxs)('ul', {
                    children: [
                      Object(s.jsx)('li', {
                        className:
                          'list-relative multiple-selection-btn' +
                          (!1 === ne ? ' selected' : ''),
                        children: Object(s.jsx)('button', {
                          className: 'list-item padding',
                          onClick: function () {
                            !1 !== ne &&
                              (ie(!1),
                              U(
                                y(
                                  Object(k.a)(
                                    Object(k.a)({}, A),
                                    {},
                                    { justShipping: !1 }
                                  )
                                )
                              ));
                          },
                          children: 'S\xed, ofrezco retiro en persona.',
                        }),
                      }),
                      Object(s.jsx)('li', {
                        className:
                          'list-relative multiple-selection-btn' +
                          (!0 === ne ? ' selected' : ''),
                        children: Object(s.jsx)('button', {
                          className: 'list-item padding',
                          onClick: function () {
                            !0 !== ne &&
                              (ie(!0),
                              U(
                                y(
                                  Object(k.a)(
                                    Object(k.a)({}, A),
                                    {},
                                    { justShipping: !0 }
                                  )
                                )
                              ));
                          },
                          children: 'No, solo hago env\xedos.',
                        }),
                      }),
                    ],
                  }),
                ],
              });
            },
            Je = function (e) {
              return Object(s.jsxs)('div', {
                className:
                  'screen-mini-card medium' +
                  (Ce ? '' : ' dashed') +
                  ('disabled' === e ? ' disabled' : ''),
                onClick: function () {
                  return _e(!0);
                },
                children: [
                  Object(s.jsxs)('div', {
                    className: 'screen-mini-card-header-title',
                    children: [
                      Object(s.jsx)('h4', {
                        children: '\xbfQuer\xe9s agregar una descripci\xf3n?',
                      }),
                      Object(s.jsx)('span', {
                        className: 'subtle-text no-user-select',
                        children: ' | (opcional)',
                      }),
                      !Ce &&
                        Object(s.jsx)('img', {
                          className: 'absolute-right small mouse-pointer',
                          src: 'https://svgshare.com/i/VnK.svg',
                          alt: 'plus sign',
                        }),
                    ],
                  }),
                  Ce &&
                    Object(s.jsxs)(s.Fragment, {
                      children: [
                        Object(s.jsxs)('div', {
                          className: 'screen-mini-card-body padding column',
                          children: [
                            Object(s.jsx)('div', {
                              className: 'message-div blue row',
                              children: Object(s.jsxs)('p', {
                                className: 'paragraph-with-icon bold',
                                children: [
                                  Object(s.jsx)('img', {
                                    src: 'https://svgshare.com/i/UNm.svg',
                                    alt: 'tip',
                                    className: 'absolute-left-top circle badge',
                                  }),
                                  'No incluyas datos de contacto, como e-mails, tel\xe9fonos, direcciones, links ni referencias a sitios externos. Tampoco uses este espacio para indicar la condici\xf3n de tu producto.',
                                  Object(s.jsx)('a', {
                                    href: '#verpolitica',
                                    children: ' Ver pol\xedtica',
                                  }),
                                ],
                              }),
                            }),
                            Object(s.jsx)('textarea', {
                              value: de,
                              onChange: function (e) {
                                Le(!0), ue(e.target.value);
                              },
                              maxLength: '50000',
                              placeholder:
                                '\xbfTe falt\xf3 algo? Agregalo como descripci\xf3n.',
                            }),
                          ],
                        }),
                        De &&
                          Object(s.jsxs)('div', {
                            className: 'screen-mini-card-footer flex-end',
                            children: [
                              Object(s.jsx)('button', {
                                className: 'secondary',
                                disabled: !(X > 0),
                                onClick: function () {
                                  Le(!1),
                                    ue(A.description ? A.description : '');
                                },
                                children: 'Cancelar',
                              }),
                              Object(s.jsx)('button', {
                                className: 'primary',
                                disabled: !(X > 0),
                                onClick: function () {
                                  Le(!1),
                                    U(
                                      y(
                                        Object(k.a)(
                                          Object(k.a)({}, A),
                                          {},
                                          { description: de }
                                        )
                                      )
                                    );
                                },
                                children: 'Confirmar',
                              }),
                            ],
                          }),
                      ],
                    }),
                ],
              });
            },
            Ke = function (e) {
              return Object(s.jsxs)('div', {
                className:
                  'screen-mini-card medium' +
                  (Re ? '' : ' dashed') +
                  ('disabled' === e ? ' disabled' : ''),
                onClick: function () {
                  return Ue(!0);
                },
                children: [
                  Object(s.jsxs)('div', {
                    className: 'screen-mini-card-header-title',
                    children: [
                      Object(s.jsx)('h4', {
                        children: '\xbfQuer\xe9s agregar un video?',
                      }),
                      Object(s.jsx)('span', {
                        className: 'subtle-text no-user-select',
                        children: ' | (opcional)',
                      }),
                      !Re &&
                        Object(s.jsx)('img', {
                          className: 'absolute-right small mouse-pointer',
                          src: 'https://svgshare.com/i/VnK.svg',
                          alt: 'plus sign',
                        }),
                    ],
                  }),
                  Re &&
                    Object(s.jsxs)(s.Fragment, {
                      children: [
                        Object(s.jsxs)('div', {
                          className: 'screen-mini-card-body padding column',
                          children: [
                            Object(s.jsx)('div', {
                              className: 'wrapper width-100 margin-bottom',
                              children: Object(s.jsxs)('div', {
                                className: 'underline-label-input',
                                children: [
                                  Object(s.jsx)('input', {
                                    placeholder:
                                      'Ej.: https://www.youtube.com/watch?v=K7sFmiFfl0g',
                                    type: 'text',
                                    className: Oe ? 'error' : '',
                                    value: be,
                                    maxLength: '120',
                                    onChange: function (e) {
                                      Fe(!0), he(e.target.value);
                                      var t = e.target.value.split(
                                        'youtube.com/watch?v='
                                      )[1];
                                      t &&
                                      (t.substring(11, 12).includes('?') ||
                                        t.substring(11, 12).includes('&') ||
                                        11 === t.length)
                                        ? (ge(''),
                                          (function (e) {
                                            var t = new Image();
                                            (t.src =
                                              'http://img.youtube.com/vi/' +
                                              e +
                                              '/mqdefault.jpg'),
                                              (t.onload = function () {
                                                120 === this.width
                                                  ? (Ge(''),
                                                    ge(
                                                      'Solo pod\xe9s agregar links a videos de YouTube.'
                                                    ))
                                                  : (Ge(e), ge(''));
                                              });
                                          })(t.substring(0, 11)))
                                        : (ge(
                                            'Solo pod\xe9s agregar links a videos de YouTube.'
                                          ),
                                          Ge(''));
                                    },
                                  }),
                                  Object(s.jsx)('div', {
                                    className:
                                      'underline' + (Oe ? ' error' : ''),
                                  }),
                                  Object(s.jsx)('span', {
                                    className:
                                      'subtle-text' +
                                      (Oe ? ' error' : ' noerror'),
                                    children: Oe && Oe,
                                  }),
                                  !Oe &&
                                    Object(s.jsx)('span', {
                                      className: 'reg-info-after',
                                      children:
                                        'Peg\xe1 ac\xe1 el link de YouTube.',
                                    }),
                                ],
                              }),
                            }),
                            '' !== Be &&
                              Object(s.jsx)('iframe', {
                                className: 'margin-top',
                                title: 'Video seleccionado',
                                src: 'https://www.youtube.com/embed/' + Be,
                                allow: 'autoplay; encrypted-media',
                                frameBorder: '0',
                                height: '390px',
                                width: '100%',
                              }),
                          ],
                        }),
                        Pe &&
                          Object(s.jsxs)('div', {
                            className: 'screen-mini-card-footer flex-end',
                            children: [
                              Object(s.jsx)('button', {
                                className: 'secondary',
                                disabled: !(X > 0),
                                onClick: function () {
                                  he(A.video ? A.video : ''),
                                    V(Q),
                                    ge(''),
                                    Fe(!1);
                                },
                                children: 'Cancelar',
                              }),
                              Object(s.jsx)('button', {
                                className: 'primary',
                                disabled: !Be,
                                onClick: function () {
                                  U(
                                    y(
                                      Object(k.a)(
                                        Object(k.a)({}, A),
                                        {},
                                        {
                                          video:
                                            'https://www.youtube.com/watch?v=' +
                                            Be,
                                        }
                                      )
                                    )
                                  ),
                                    Fe(!1);
                                },
                                children: 'Confirmar',
                              }),
                            ],
                          }),
                      ],
                    }),
                ],
              });
            },
            $e = function (e) {
              return Object(s.jsx)('div', {
                className:
                  'width-100 flex-end' + ('disabled' === e ? ' disabled' : ''),
                children: v
                  ? Object(s.jsx)(D, { variant: 'danger', children: v })
                  : Object(s.jsx)('button', {
                      className: 'primary',
                      onClick: function () {
                        U(N(I));
                      },
                      disabled: Se,
                      children: 'Publicar',
                    }),
              });
            };
          return Object(s.jsx)(s.Fragment, {
            children:
              !I || (d && void 0 === A)
                ? Object(s.jsx)(l.a, { to: 'vender/producto' })
                : A &&
                  (A.images.length > 0 && A.stock > 0
                    ? a
                      ? Object(s.jsx)(D, { children: a })
                      : o
                      ? Object(s.jsx)(D, { children: o })
                      : Object(s.jsxs)(s.Fragment, {
                          children: [
                            Object(s.jsx)('div', {
                              className: 'extra-header new-product',
                            }),
                            Object(s.jsxs)('div', {
                              className: 'new-product-steps',
                              children: [
                                Object(s.jsxs)('span', {
                                  children: [
                                    Object(s.jsx)('span', {
                                      className: 'step-number',
                                      children: '2',
                                    }),
                                    'Condiciones de venta',
                                  ],
                                }),
                                Object(s.jsx)('div', {
                                  className: 'progress-bar',
                                  style: { width: M + '%' },
                                }),
                              ],
                            }),
                            Object(s.jsxs)('div', {
                              className: 'column flex-start',
                              children: [
                                Object(s.jsx)('a', {
                                  className: 'margin-bottom',
                                  href: '/vender/producto?draft=' + I,
                                  style: { zIndex: '2' },
                                  children: '<  Anterior',
                                }),
                                Object(s.jsxs)('div', {
                                  className: 'row width-100',
                                  style: { zIndex: '2', marginBottom: '6rem' },
                                  children: [
                                    Object(s.jsxs)('div', {
                                      children: [
                                        Object(s.jsx)('span', {
                                          className: 'subtle-text',
                                          children: 'Paso 2 de 2',
                                        }),
                                        Object(s.jsxs)('h1', {
                                          style: { fontSize: '2.5rem' },
                                          children: [
                                            'Para terminar,',
                                            Object(s.jsx)('br', {}),
                                            ' definamos las condiciones de venta',
                                          ],
                                        }),
                                      ],
                                    }),
                                    Object(s.jsx)('img', {
                                      src:
                                        'https://http2.mlstatic.com/secure/sell/images/notebook-v2.svg',
                                      alt: 'arte de zapato',
                                    }),
                                  ],
                                }),
                                Se
                                  ? ze('disabled')
                                  : g
                                  ? Object(s.jsx)(D, {
                                      variant: 'danger',
                                      children: g,
                                    })
                                  : ze(),
                                Se && M >= 25
                                  ? He('disabled')
                                  : 25 === M && g
                                  ? Object(s.jsx)(D, {
                                      variant: 'danger',
                                      children: g,
                                    })
                                  : M >= 25
                                  ? He()
                                  : Q >= 25 && He('disabled'),
                                Se && M >= 50
                                  ? Ye('disabled')
                                  : 50 === M && g
                                  ? Object(s.jsx)(D, {
                                      variant: 'danger',
                                      children: g,
                                    })
                                  : M >= 50
                                  ? Ye()
                                  : Q >= 50 && Ye('disabled'),
                                Se && M >= 75
                                  ? Je('disabled')
                                  : 75 === M && g
                                  ? Object(s.jsx)(D, {
                                      variant: 'danger',
                                      children: g,
                                    })
                                  : M >= 75
                                  ? Je()
                                  : Q >= 75 && Je('disabled'),
                                Se && M >= 75
                                  ? Ke('disabled')
                                  : 75 === M && g
                                  ? Object(s.jsx)(D, {
                                      variant: 'danger',
                                      children: g,
                                    })
                                  : M >= 75
                                  ? Ke()
                                  : Q >= 75 && Ke('disabled'),
                                M >= 75 && (De || Pe ? $e('disabled') : $e()),
                              ],
                            }),
                          ],
                        })
                    : Object(s.jsx)(l.a, { to: 'vender/producto?draft=' + I })),
          });
        },
        Z = function (e) {
          var t = Object(j.c)(function (e) {
              return e.userUpdateAddresses;
            }),
            a = t.loading,
            r = t.error,
            n = localStorage.getItem('currentAddress')
              ? JSON.parse(localStorage.getItem('currentAddress'))
              : null,
            i = Object(c.useState)(n ? n.postalCode : null),
            o = Object(u.a)(i, 2),
            l = o[0],
            d = o[1],
            m = Object(c.useState)(n ? n.street : null),
            p = Object(u.a)(m, 2),
            O = p[0],
            g = p[1],
            x = Object(c.useState)(n ? n.streetNumber : null),
            v = Object(u.a)(x, 2),
            S = v[0],
            y = v[1],
            N = Object(c.useState)(n ? n.additionalInformation : null),
            E = Object(u.a)(N, 2),
            C = E[0],
            _ = E[1],
            w = Object(c.useState)(n ? n.betweenStreets : null),
            k = Object(u.a)(w, 2),
            R = k[0],
            U = k[1],
            I = Object(c.useState)(n ? n.reference : null),
            T = Object(u.a)(I, 2),
            D = T[0],
            L = T[1],
            A = Object(c.useState)(n ? n.province : null),
            q = Object(u.a)(A, 2),
            P = q[0],
            F = q[1],
            M = Object(c.useState)(n ? n.city : null),
            V = Object(u.a)(M, 2),
            B = V[0],
            G = V[1],
            Q = Object(c.useState)(!1),
            z = Object(u.a)(Q, 2),
            H = z[0],
            Y = z[1],
            J = Object(c.useState)(!1),
            K = Object(u.a)(J, 2),
            $ = K[0],
            W = K[1],
            X = Object(j.b)(),
            Z = new URLSearchParams(e.location.search).get('draft');
          Object(c.useEffect)(function () {
            n &&
              null === n.streetNumber &&
              (Y(!0),
              document
                .querySelector('#no-number-check')
                .setAttribute('checked', 'true'));
          }, []),
            Object(c.useEffect)(
              function () {
                var e = document.querySelector('#numero');
                H && e
                  ? (e.setAttribute('readonly', 'true'),
                    e.setAttribute('class', 'subtle-text bigger-font'))
                  : (e.removeAttribute('readonly'), e.removeAttribute('class'));
              },
              [H]
            ),
            Object(c.useEffect)(
              function () {
                !0 !== $ || a || r || e.history.push('publicar?draft=' + Z);
              },
              [$, a, r, Z, e]
            ),
            Object(c.useEffect)(
              function () {
                l && 4 === l.length && O && P && B && (H ? D : S)
                  ? document
                      .querySelector('#submitbtn')
                      .removeAttribute('disabled')
                  : document
                      .querySelector('#submitbtn')
                      .setAttribute('disabled', !0);
              },
              [l, O, S, P, B, D, H]
            );
          var ee = function () {
            var e;
            X(
              ((e = {
                _id: n ? n._id : null,
                postalCode: l,
                street: O,
                streetNumber: H ? null : S,
                additionalInformation: C,
                betweenStreets: R,
                reference: D,
                province: P,
                city: B,
              }),
              (function () {
                var t = Object(h.a)(
                  b.a.mark(function t(a, s) {
                    var c, r, n, i;
                    return b.a.wrap(
                      function (t) {
                        for (;;)
                          switch ((t.prev = t.next)) {
                            case 0:
                              return (
                                (c = s()),
                                (r = c.userLogin.user),
                                a({ type: 'USER_UPDATE_ADDRESSES_REQUEST' }),
                                (t.prev = 2),
                                (t.next = 5),
                                f.a.post(
                                  '/api/users/updateAddresses',
                                  { address: e, user: r },
                                  {
                                    headers: {
                                      Authorization: 'Bearer ' + r.token,
                                    },
                                  }
                                )
                              );
                            case 5:
                              (n = t.sent),
                                (i = n.data),
                                a({
                                  type: 'USER_UPDATE_ADDRESSES_SUCCESS',
                                  payload: i,
                                }),
                                localStorage.setItem(
                                  'userInfo',
                                  JSON.stringify(i)
                                ),
                                a({ type: 'USER_LOGIN_SUCCESS', payload: i }),
                                (t.next = 15);
                              break;
                            case 12:
                              (t.prev = 12),
                                (t.t0 = t.catch(2)),
                                a({
                                  type: 'USER_UPDATE_ADDRESSES_FAIL',
                                  payload:
                                    t.t0.response && t.t0.response.data.message
                                      ? t.t0.response.data.message
                                      : t.t0.message,
                                });
                            case 15:
                            case 'end':
                              return t.stop();
                          }
                      },
                      t,
                      null,
                      [[2, 12]]
                    );
                  })
                );
                return function (e, a) {
                  return t.apply(this, arguments);
                };
              })())
            ),
              W(!0),
              localStorage.removeItem('currentAddress');
          };
          return Object(s.jsxs)('div', {
            className: 'big-form-block',
            children: [
              Object(s.jsx)('div', {
                className: 'register-header row',
                children: Object(s.jsx)('h2', { children: 'Nuevo domicilio' }),
              }),
              Object(s.jsxs)('form', {
                onSubmit: function (e) {
                  e.preventDefault(), ee();
                },
                children: [
                  Object(s.jsxs)('div', {
                    className: 'screen-card big-form-screen',
                    children: [
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input big-form',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                d(e.target.value);
                              },
                              maxLength: '4',
                              onKeyDown: function (e) {
                                (e.keyCode >= 48 && e.keyCode <= 57) ||
                                  8 === e.keyCode ||
                                  37 === e.keyCode ||
                                  39 === e.keyCode ||
                                  67 === e.keyCode ||
                                  88 === e.keyCode ||
                                  86 === e.keyCode ||
                                  17 === e.keyCode ||
                                  9 === e.keyCode ||
                                  46 === e.keyCode ||
                                  e.preventDefault();
                              },
                              value: l || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', {
                              children: 'Codigo postal *',
                            }),
                            Object(s.jsx)('span', {
                              className: 'reg-info-after',
                              children:
                                'Tu codigo postal debe tener 4 caracteres.',
                            }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                g(e.target.value);
                              },
                              maxLength: '40',
                              value: O || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', { children: 'Calle *' }),
                          ],
                        }),
                      }),
                      Object(s.jsxs)('div', {
                        className: 'wrapper',
                        children: [
                          Object(s.jsxs)('div', {
                            className: 'underline-label-input',
                            children: [
                              Object(s.jsx)('input', {
                                id: 'numero',
                                type: H ? 'text' : 'number',
                                onChange: function (e) {
                                  y(e.target.value);
                                },
                                onKeyDown: function (e) {
                                  (e.keyCode >= 48 && e.keyCode <= 57) ||
                                    8 === e.keyCode ||
                                    37 === e.keyCode ||
                                    39 === e.keyCode ||
                                    67 === e.keyCode ||
                                    88 === e.keyCode ||
                                    86 === e.keyCode ||
                                    9 === e.keyCode ||
                                    17 === e.keyCode ||
                                    46 === e.keyCode ||
                                    e.preventDefault();
                                },
                                maxLength: '6',
                                value: H ? 'Sin n\xfamero' : S || '',
                              }),
                              Object(s.jsx)('div', { className: 'underline' }),
                              Object(s.jsx)('label', {
                                children: 'N\xfamero *',
                              }),
                            ],
                          }),
                          Object(s.jsxs)('div', {
                            className: 'row flex-start relative',
                            style: { top: '.5rem', left: '-.5rem' },
                            children: [
                              Object(s.jsx)('input', {
                                id: 'no-number-check',
                                type: 'checkbox',
                                onClick: function (e) {
                                  e.target.checked ? Y(!0) : Y(!1);
                                },
                              }),
                              Object(s.jsx)('label', {
                                htmlFor: 'no-number-check',
                                className: 'subtle-text no-user-select',
                                children: 'Sin n\xfamero',
                              }),
                            ],
                          }),
                        ],
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper relative',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input big-form',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                _(e.target.value);
                              },
                              maxLength: '60',
                              value: C || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', {
                              children: 'Informaci\xf3n adicional',
                            }),
                            Object(s.jsx)('span', {
                              className: 'reg-info-after',
                              children: 'Ej.: Piso 8, Departamento 6.',
                            }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                U(e.target.value);
                              },
                              maxLength: '30',
                              value: R || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', {
                              children: 'Entre calles',
                            }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input big-form',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                L(e.target.value);
                              },
                              maxLength: '60',
                              value: D || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsxs)('label', {
                              children: ['Referencia', H && ' *'],
                            }),
                            Object(s.jsx)('span', {
                              className: 'reg-info-after big-form',
                              children:
                                'Indicaciones para encontrar tu domicilio.',
                            }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                F(e.target.value);
                              },
                              maxLength: '40',
                              value: P || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', { children: 'Provincia *' }),
                          ],
                        }),
                      }),
                      Object(s.jsx)('div', {
                        className: 'wrapper',
                        children: Object(s.jsxs)('div', {
                          className: 'underline-label-input',
                          children: [
                            Object(s.jsx)('input', {
                              type: 'text',
                              onChange: function (e) {
                                G(e.target.value);
                              },
                              maxLength: '40',
                              value: B || '',
                            }),
                            Object(s.jsx)('div', { className: 'underline' }),
                            Object(s.jsx)('label', { children: 'Ciudad *' }),
                          ],
                        }),
                      }),
                    ],
                  }),
                  Object(s.jsx)('button', {
                    type: 'submit',
                    className: 'primary big-form' + ($ ? ' no-padding' : ''),
                    id: 'submitbtn',
                    disabled: !0,
                    children: $
                      ? Object(s.jsx)('div', {
                          id: 'wrapper',
                          children: Object(s.jsx)('div', {
                            className: 'profile-main-loader',
                            children: Object(s.jsx)('div', {
                              className: 'loader',
                              children: Object(s.jsx)('svg', {
                                className: 'circular-loader',
                                viewBox: '25 25 50 50',
                                children: Object(s.jsx)('circle', {
                                  className: 'loader-path',
                                  cx: '50',
                                  cy: '50',
                                  r: '20',
                                  fill: 'none',
                                  stroke: '#70c542',
                                  strokeWidth: '2',
                                }),
                              }),
                            }),
                          }),
                        })
                      : 'Guardar',
                  }),
                ],
              }),
            ],
          });
        },
        ee = function () {
          return (
            Object(c.useEffect)(function () {
              document.querySelector('html').style.fontSize =
                62.5 * window.devicePixelRatio + '%';
            }, []),
            Object(s.jsx)(
              o.a,
              {
                children: Object(s.jsxs)('div', {
                  className: 'grid-container',
                  children: [
                    Object(s.jsxs)(l.d, {
                      children: [
                        Object(s.jsx)(l.b, {
                          path: '/',
                          exact: !0,
                          component: C,
                        }),
                        Object(s.jsx)(l.b, {
                          path: '/product/:id',
                          component: C,
                        }),
                        Object(s.jsx)(l.b, { path: '/user/:id', component: C }),
                        Object(s.jsx)(l.b, {
                          path: '/notificaciones',
                          component: C,
                        }),
                        Object(s.jsx)(U, {
                          path: '/vender',
                          exact: !0,
                          component: w,
                        }),
                        Object(s.jsx)(U, {
                          path: '/vender/producto',
                          component: w,
                        }),
                        Object(s.jsx)(U, { path: '/publicar', component: w }),
                        Object(s.jsx)(U, {
                          path: '/nueva-direccion',
                          component: w,
                        }),
                        Object(s.jsx)(l.b, { path: '*', component: _ }),
                      ],
                    }),
                    Object(s.jsxs)('main', {
                      children: [
                        Object(s.jsx)(l.b, {
                          path: '/',
                          component: A,
                          exact: !0,
                        }),
                        Object(s.jsx)(l.b, {
                          path: '/product/:id',
                          component: F,
                        }),
                        Object(s.jsx)(I, {
                          path: '/register',
                          component: M,
                          exact: !0,
                        }),
                        Object(s.jsx)($, {
                          path: '/email-validation',
                          component: H,
                          exact: !0,
                        }),
                        Object(s.jsx)(I, {
                          path: '/login',
                          component: q,
                          exact: !0,
                        }),
                        Object(s.jsx)(K, {
                          path: '/login/enterpass',
                          component: T,
                        }),
                        Object(s.jsx)(U, {
                          path: '/vender',
                          exact: !0,
                          component: W,
                          redirectTo: '?loginType=vender',
                        }),
                        Object(s.jsx)(U, {
                          path: '/vender/producto',
                          component: J,
                          redirectTo: '?loginType=vender',
                        }),
                        Object(s.jsx)(U, {
                          path: '/publicar',
                          component: X,
                          redirectTo: '?loginType=vender',
                        }),
                        Object(s.jsx)(U, {
                          path: '/nueva-direccion',
                          component: Z,
                          redirectTo: '?loginType=vender',
                        }),
                      ],
                    }),
                    Object(s.jsx)(l.b, { path: '*', exact: !0, component: d }),
                  ],
                }),
              },
              window.location.pathname
            )
          );
        },
        te = function (e) {
          e &&
            e instanceof Function &&
            a
              .e(3)
              .then(a.bind(null, 266))
              .then(function (t) {
                var a = t.getCLS,
                  s = t.getFID,
                  c = t.getFCP,
                  r = t.getLCP,
                  n = t.getTTFB;
                a(e), s(e), c(e), r(e), n(e);
              });
        },
        ae = a(30),
        se = a(141),
        ce = {
          userCheckName: {
            user: localStorage.getItem('userCheckNameInfo')
              ? JSON.parse(localStorage.getItem('userCheckNameInfo'))
              : null,
          },
          userLogin: {
            user: localStorage.getItem('userInfo')
              ? JSON.parse(localStorage.getItem('userInfo'))
              : null,
          },
          userVerifyEmail: {
            checkedEmail: localStorage.getItem('verifyEmail')
              ? JSON.parse(localStorage.getItem('verifyEmail'))
              : null,
          },
        },
        re = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || ae.d,
        ne = Object(ae.c)({
          productList: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { loading: !0, products: [] },
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'PRODUCT_LIST_REQUEST':
                return { loading: !0 };
              case 'PRODUCT_LIST_SUCCESS':
                return { loading: !1, products: t.payload };
              case 'PRODUCT_LIST_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          productDetails: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { loading: !0 },
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'PRODUCT_DETAILS_REQUEST':
                return { loading: !0 };
              case 'PRODUCT_DETAILS_SUCCESS':
                return { loading: !1, product: t.payload };
              case 'PRODUCT_DETAILS_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          newProduct: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { loading: !0 },
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'NEW_PRODUCT_REQUEST':
                return { loading: !0 };
              case 'NEW_PRODUCT_SUCCESS':
                return { loading: !1, product: t.payload };
              case 'NEW_PRODUCT_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userDetails: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_DETAILS_REQUEST':
                return { loading: !0 };
              case 'USER_DETAILS_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'USER_DETAILS_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userCheckName: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_CHECKNAME_REQUEST':
                return { loading: !0 };
              case 'USER_CHECKNAME_SUCCESS':
                return { loading: !1, user: t.payload, success: !0 };
              case 'USER_CHECKNAME_FAIL':
                return { loading: !1, error: t.payload };
              case 'USER_CHECKNAME_RESET_SUCCESS':
                return Object(k.a)(Object(k.a)({}, e), {}, { success: null });
              case 'USER_CHECKNAME_RESET':
                return {};
              default:
                return e;
            }
          },
          userLogin: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_LOGIN_REQUEST':
                return { loading: !0 };
              case 'USER_LOGIN_SUCCESS':
                return { loading: !1, user: t.payload, success: !0 };
              case 'USER_LOGIN_FAIL':
                return { loading: !1, error: t.payload };
              case 'USER_LOGIN_RESET':
                return {};
              default:
                return e;
            }
          },
          userUpdateFavs: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'UPDATE_USER_FAVORITES_REQUEST':
                return { loading: !0 };
              case 'UPDATE_USER_FAVORITES_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'UPDATE_USER_FAVORITES_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userRegister: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_REGISTER_REQUEST':
                return { loading: !0 };
              case 'USER_REGISTER_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'USER_REGISTER_FAIL':
                return { loading: !1, error: t.payload };
              case 'USER_REGISTER_RESET':
                return {};
              default:
                return e;
            }
          },
          userVerifyEmail: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_VERIFYEMAILEXISTS_REQUEST':
                return { loading: !0 };
              case 'USER_VERIFYEMAILEXISTS_SUCCESS':
                return { loading: !1, checkedEmail: t.payload, success: !0 };
              case 'USER_VERIFYEMAILEXISTS_FAIL':
                return { loading: !1, error: t.payload };
              case 'USER_VERIFYEMAILEXISTS_RESET_SUCCESS':
                return Object(k.a)(Object(k.a)({}, e), {}, { success: null });
              case 'USER_VERIFYEMAILEXISTS_RESET':
                return {};
              default:
                return e;
            }
          },
          categoryList: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : { loading: !0, categories: [] },
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'CATEGORY_LIST_REQUEST':
                return { loading: !0 };
              case 'CATEGORY_LIST_SUCCESS':
                return { loading: !1, categories: t.payload };
              case 'CATEGORY_LIST_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userUpdateProductDrafts: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_UPDATE_PRODUCT_DRAFTS_REQUEST':
                return { loading: !0 };
              case 'USER_UPDATE_PRODUCT_DRAFTS_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'USER_UPDATE_PRODUCT_DRAFTS_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userDeleteProductDrafts: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_DELETE_PRODUCT_DRAFTS_REQUEST':
                return { loading: !0 };
              case 'USER_DELETE_PRODUCT_DRAFTS_SUCCESS':
                return { loading: !1, user: t.payload, deleted: !0 };
              case 'USER_DELETE_PRODUCT_DRAFTS_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userAddProducts: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_ADD_PRODUCTS_REQUEST':
                return { loading: !0 };
              case 'USER_ADD_PRODUCTS_SUCCESS':
                return { loading: !1, added: !0 };
              case 'USER_ADD_PRODUCTS_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userUpdateAddresses: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_UPDATE_ADDRESSES_REQUEST':
                return { loading: !0 };
              case 'USER_UPDATE_ADDRESSES_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'USER_UPDATE_ADDRESSES_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
          userDeleteAddresses: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = arguments.length > 1 ? arguments[1] : void 0;
            switch (t.type) {
              case 'USER_DELETE_ADDRESSES_REQUEST':
                return { loading: !0 };
              case 'USER_DELETE_ADDRESSES_SUCCESS':
                return { loading: !1, user: t.payload };
              case 'USER_DELETE_ADDRESSES_FAIL':
                return { loading: !1, error: t.payload };
              default:
                return e;
            }
          },
        }),
        ie = Object(ae.e)(ne, ce, re(Object(ae.a)(se.a)));
      i.a.render(
        Object(s.jsx)(j.a, {
          store: ie,
          children: Object(s.jsx)(r.a.StrictMode, {
            children: Object(s.jsx)(ee, {}),
          }),
        }),
        document.getElementById('root')
      ),
        te();
    },
  },
  [[265, 1, 2]],
]);
//# sourceMappingURL=main.6eec6d18.chunk.js.map
