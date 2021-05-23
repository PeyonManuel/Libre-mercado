import bcrypt from 'bcryptjs';

const data = {
  products: [
    {
      name: 'Chainsaw Man - Tomos Varios - Tatsuki Fujimoto - Ivrea',
      isStateNew: true,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_854953-MLA44857257709_022021-O.webp',
      ],
      category: '607db70973b32618a8d3b518',
      reviews: [],
      price: 495,
      stock: 20,
      description:
        'DAGUERREO LIBROS\
    Somos la primer tienda virtual especializada en artbooks, ciencia ficción y fantasía del mercado. Tenemos libros muy grosos y exclusivos. Si no nos crees, mirá:\
    \
    -------------------------------------------------------------------\
    \
    CHAINSAW MAN\
    de Tatsuki Fujimoto\
    \
    CONSULTAR POR OTROS TOMOS DE ESTA COLECCION\
    EL PRECIO ES POR UNIDAD\
    \
    Edición argentina\
    Formato tankoubon con sobrecubierta\
    \
    ¡IVREA tira de la empuñadura y publicará en Argentina la desaforada CHAINSAW MAN! ¡Ni Leatherface, ni Ash Williams ni Grell Sutcliff se atrevieron a tanto!\
    \
    Una de las más aclamadas obras de la actualidad en la Shonen Jump llega por fin a Argentina. Saldrá en el formato tankoubon habitual con sobrecubierta, bimestralmente.\
    \
    Chainsaw Man narra la historia de Denji, un pobre infeliz que haría cualquier cosa por guita. Su padre se suicidó dejándole una deuda impagable con la mafia, jamás en su vida lo abrazaron y gracias si puede apuntar a comerse una rodaja de pan lactal por día. Cuando ya casi no le quedan órganos que vender, empieza a cazar demonios con su perro-motosierra, Pochita, subsistiendo con el sueño de tener un futuro mejor… Hasta que el mismo mafioso para el que trabajaban les tiende una trampa y ambos mueren descuartizados… al menos por un rato.\
    \
    Resulta que Pochita se fusiona con el corazón de Denji, volviéndolo un híbrido de humano y demonio dándole el poder de convertir sus brazos y cabeza en motosierras, para deleite de la tribuna que quería un buen shonen con gore. A partir de ahí, una bella mujer llamada Makima lo contacta y le da dos opciones: o trabaja como su perro fiel como Devil Hunter estatal o lo ponen a dormir definitivamente… ¡¡Y todo esto en el primer capítulo!!\
    \
    Con el correr de la historia, nos daremos cuenta de que acá posta que no todo es lo que parece, que además de demonios-zombies, demonios-tomate y otros más ridículos, existen también aquellos con el poder de cambiar la historia de la humanidad, y que aun así el mayor enemigo de la humanidad quizás se encuentre entre sus filas.\
    \
    Chainsaw Man es la segunda serie de Tatsuki Fujimoto (la primera siendo Fire Punch), y se publica desde 2018 en la Shonen Jump, llevando hasta la fecha 9 tomos. El autor se declara fan de las películas de acción, cosa que se nota en cada escena, y logra mezclar con mucho tino las premisas típicas del shonen con algunas de las vueltas de tuerca más truculentas de los últimos tiempos.\
    \
    -------------------------------------------------------------------\
    \
    Podes buscarnos en redes sociales.\
    \
    Estamos en Caballito, cerca del Parque Rivadavia.\
    ¿Cómo llegas? Fácil:\
    Tenés el Subte A (estación Acoyte) y el E (estación José María Moreno).\
    O si no, Colectivos: 2, 5, 8, 15, 25, 26, 36, 42, 53, 55, 56, 65, 84, 85, 86, 88, 96, 103, 104, 112, 126, 132, 135, 141, 172, 180, 181\
    \
    Envíamos a través de Mercado Envíos, pero podemos mandar por Correo Argentino, OCA o motomensajería (solo en Capital y Gran Buenos Aires), con costo a cargo del comprador.\
    \
    Aceptamos Mercado Pago. No trabajamos con contrareembolso',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
    {
      name: 'Notebook HP 15-DW1083WM scarlet red 15.6", Intel Pentium Gold 6405U 4GB de RAM 128GB SSD, Intel UHD Graphics 1366x768px Windows 10 Home',
      isStateNew: true,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_920717-MLA44939467848_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_813248-MLA44939558438_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_748058-MLA44940210296_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_810680-MLA44939558439_022021-O.webp',
      ],
      category: '607db70973b32618a8d3b507',
      reviews: [],
      price: 67999,
      stock: 342,
      description:
        'La notebook HP 15-DW1083WM es una solución tanto para trabajar y estudiar como para entretenerte. Al ser portátil, el escritorio dejará de ser tu único espacio de uso para abrirte las puertas a otros ambientes ya sea en tu casa o en la oficina.\
      \
      Pantalla con gran impacto visual\
      Su pantalla LED de 15.6" y 1366x768 px de resolución te brindará colores más vivos y definidos. Tus películas y series preferidas cobrarán vida, ya que ganarán calidad y definición en cada detalle.Su procesador Intel Pentium Gold de 2 núcleos, te permitirá ejecutar programas variados y procesos indispensables para desenvolverte en el día a día, ya sea en tu trabajo o en los momentos de ocio en tu hogar.\
      \
      Potente disco sólido\
      El disco sólido de 128 GB hace que el equipo funcione a gran velocidad y por lo tanto te brinda mayor agilidad para operar con diversos programas.\
      \
      Un procesador exclusivo para los gráficos\
      Su placa de video Intel UHD Graphics convierte a este dispositivo en una gran herramienta de trabajo para cualquier profesional del diseño. Te permitirá lograr una gran performance en todos tus juegos y en otras tareas cotidianas que impliquen procesamiento gráfico.\
      \
      Una batería de larga duración\
      La batería de este equipo tiene una autonomía de alrededor de 12.15 horas. La duración varía según el uso, la configuración y otros factores, pero es ideal para quienes necesitan extender su jornada y seguir trabajando o estudiando con comodidad y sin cables.',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
    {
      name: 'Mochila Porta Notebook Tablet 17 Smart Usb Reforzada Calidad',
      isStateNew: false,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_727173-MLA44856542224_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_818303-MLA44856546113_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_648460-MLA44856532617_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_818588-MLA44856540318_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_634951-MLA44856538438_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_998712-MLA44856532618_022021-O.webp',
      ],
      category: '607db70973b32618a8d3b50c',
      reviews: [],
      price: 3499,
      stock: 210,
      description:
        'VENDEDOR: HAPPY BUY\
      . Mercado Lider Platinium\
      · 12 años de trayectoria\
      · Despachamos tu producto en el día a todo el pais\
      ____________________________________________________\
      Importador Directo de FOREST Argentina\
      \
      · Mochila Ejecutiva Forest\
      · Confeccionado en Nylon Premium altamente reforzada anti desgarre\
      · Compartimiento principal y secundario de gran capacidad y tamaño\
      · Frente rígido\
      · Bolsillo Organizador interno\
      · Cierre doble abertura.\
      · Bolsillo frontal con cierre\
      · Bolsillos Laterales de Red Air Mesh\
      · Puerto USB y Bolsillo para Power bank\
      · Tiras acolchadas y reforzadas Air Mesh\
      · Logo FOREST metálico\
      · Material Semi Impermeable\
      · Bolsillo porta notebook acolchado con sujetador adherido con velcro, para transportar tu notebook de manera segura\
      · Espaldar ergonómico, sistema Air Mesh\
      · Sistema Air Fluid\
      · Zippers Metálicos\
      · Base interior acolchada\
      \
      \
      Brindamos 1 año de garantía oficial\
      Garantía de satisfacción, sino te gusta el producto podes devolverlo dentro de los 30 días posteriores recibida tu compra\
      ____________________________________________________\
      \
      DATOS DEL VENDEDOR:\
      USUARIO: HAPPY--BUY\
      \
      UBICACION: Local al público en pleno centro comercial de Villa Crespo\
      \
      ESTACION DE SUBTE: Malabia - Subte B\
      \
      DIAS DE ATENCION: Lunes a Sábados\
      \
      REALIZAMOS LOS ENVIOS MAS RAPIDOS Y SEGUROS DEL SITIO',
      video: '',
      noShipping: true,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
    {
      name: 'Cable Usb Type C 3.1 Original Ringke Carga Rapida Irrompible',
      isStateNew: true,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_989151-MLA31922339259_082019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_764392-MLA31116215427_062019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_785898-MLA29618578265_032019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_882139-MLA31116222530_062019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_665289-MLA29618576283_032019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_661524-MLA31116215909_062019-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_857702-MLA29618570382_032019-O.webp',
      ],
      category: '607db70973b32618a8d3b50a',
      reviews: [],
      price: 1430,
      stock: 657,
      description:
        'Cable Type C USB 3.1 CARGA RAPIDA hasta 10 veces más rápido que los normales.\
      \
      Carga y sincroniza USB con conector tipo C.\
      \
      Está certificado por Apple, soporta todas las actualizaciones.\
      \
      1 metro de largo, color gris.\
      \
      Excelente calidad, materiales: Aluminio y Nylon cable trenzado.\
      \
      _______________________________________________________\
      \
      NORCEL\
      \
      Somos parte de un grupo de empresas fundadas por jóvenes profesionales emprendedores que buscan formas alternativas de acercarle al público productos importados destinados a facilitar la vida cotidiana. Para esto nos mantenemos en constante capacitación y actualización sobre las últimas tendencias en tecnología, bienestar y ocio.\
      \
      _______________________________________________________\
      \
      \
      FACTURA (A/B):\
      \
      Te pedimos que cargues la documentación correspondiente en la cuenta de Mercado Libre con la que realices la compra. Tenemos un sistema de facturación automática que capta los datos de la cuenta. Si los datos no están correctamente cargados, por defecto se enviará factura B.\
      \
      _______________________________________________________\
      \
      FORMAS DE ENVÍO:\
      \
      - Mercado Envíos a todo el país (Excepto Tierra del Fuego)\
      - Mercado Envíos FLEX (Entrega en el día si compras antes de las 15hs y si la publicación lo permite)\
      \
      Nota: embalamos tus productos sin cargo\
      \
      _______________________________________________________\
      \
      UBICACIÓN:\
      \
      Podes retirar tu compra por nuestra sucursal Palermo de lunes a viernes de 10 a 17hs.\
      Los envíos se están efectuando con NORMALIDAD.\
      \
      _______________________________________________________\
      \
      MUCHAS GRACIAS POR CONFIAR EN NOSOTROS!',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
    {
      name: 'Mini Cry Babies Bebes Llorones Magic Tears Sorpresa',
      isStateNew: false,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_746847-MLA42902999464_072020-O.webp',
      ],
      category: '607db70973b32618a8d3b510',
      reviews: [],
      price: 1884,
      stock: 34,
      description:
        '¡Descubre el mágico mundo de las Cry Babies Magic Tears! Las Magic Tears son mini bebés Cry coleccionables en su propia casa. Aquí encontrarás 1 de los 24 bebés Cry que incluyen 6 accesorios diferentes para jugar. Si tienes suerte, ¡tu hogar podría tener el accesorio dorado! Llena la taza con agua, dale de beber a tu Cry Babies Magic Tears y observa cómo llora con lágrimas reales cuando las pellizcas en su barriga. Todos los bebés Cry tienen un nombre y una personalidad. En cada casa hay un folleto con información personal sobre su lindo Mini Cry Baby.\
      \
      Dimensiones de la casa: diámetro: 11 cm y altura: 13 cm.\
      Tamaño de los bebés llorones: 5.5x5x12 cm aprox\
      \
      El precio publicado corresponde a una Cry Babies Magic Tears sorpresa.\
      Son originales.',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },

    {
      name: 'Colchón 2 Plazas La Cardeuse Native 800 140x190',
      isStateNew: true,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_621012-MLA44771430469_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_775067-MLA44771430471_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_872104-MLA44771430472_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_763198-MLA44771430470_022021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_724213-MLA45822175787_052021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_697008-MLA44771430473_022021-O.webp',
      ],
      category: '607db70973b32618a8d3b50d',
      reviews: [],
      price: 50526,
      stock: 21,
      description:
        'Las imágenes son meramente ilustrativas.\
      \
      El Native 800 se produce con nuestro exclusivo sistema Body Surround de resortes Pocket. Este permite que el colchón se adapte al contorno del cuerpo absorbiendo al máximo la transferencia de movimientos. De esta manera se logra un descanso continuo y sin interrupciones.\
      Gracias al sistema Flip For Better que caracteriza todos nuestros modelos es que el Native cuenta con las mismas propiedades de ambos lados del colchón. A su vez cuenta con 4 manijas laterales reforzadas que facilitan la rotación del producto.\
      Este modelo le permitirá tener una sensación de mullidez y relajación muy alta debido a su Pillow Native que es una capa extra de espuma de alta densidad que se ubica debajo de las tapas del colchón.\
      La terminación se realiza de ambas caras del colchón con tela Jackard de algodón de la más alta calidad. La tela es sometida a procesos que lo protegen del polvo ambiental y los malos olores y a su vez impiden la reproducción de ácarosy bacterias.\
      \
      El envío es gratis a todo el país excepto a tierra del fuego.\
      \
      \
      \
      \
      ¡ESTAMOS ENTREGANDO! Ver condiciones a continuación\
      CONDICIONES DE ENVÍO – IMPORTANTE:\
      \
      Colchones y Sommiers: La entrega es entre 20 y 30 días hábiles desde que se realiza el pedido y se proveen todos los datos de facturación y entrega. El envío es gratis a todo el país excepto a Tierra del Fuego\
      .\
      Envíos a CABA y GBA: Los pedidos en estas zonas serán entregados por La Cardeuse Logística. Nos comunicaremos 48hs. hábiles previas a la entrega para informar el rango horario de la misma. En los casos en los que el domicilio sea un departamento, se subirá el producto por ascensor o escalera sin cargo, siempre que sea posible. La Cardeuse no realiza subidas aéreas.\
      \
      Envíos al Interior del País: Los pedidos al resto del país serán entregados en la planta baja del domicilio por Andreani Logística. Una vez despachado el producto, se enviará el número de tracking para realizar el seguimiento del pedido\
      Se ruega revisar la mercadería detenidamente previo a firmar el remito en conformidad.\
      \
      Almohadas: Las almohadas serán enviadas por MercadoEnvíos. El tiempo de entrega se puede ver calculado en la publicación.\
      \
      Cubrecolchones: La entrega es de hasta 15 días hábiles desde que se realiza el pedido y se proveen todos los datos de facturación y entrega.\
      \
      Cualquier consulta, no dude en preguntar! Estamos a su disposición.\
      \
      La Cardeuse',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
    {
      name: 'Horno Microondas Kelvinator 20 Lts Digital K20dig',
      isStateNew: true,
      images: [
        'https://http2.mlstatic.com/D_NQ_NP_932971-MLA45652346353_042021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_602669-MLA45652346355_042021-O.webp',
        'https://http2.mlstatic.com/D_NQ_NP_685821-MLA45652364221_042021-O.webp',
      ],
      category: '607db70973b32618a8d3b508',
      reviews: [],
      price: 15838,
      stock: 67,
      description:
        'Horno Microondas Kelvinator K20DIG\
      \
      CARACTERÍSTICAS\
      Capacidad: 20 Litros\
      Potencia de Microondas: 700 Watts\
      Frecuencia de Microondas: 2450 Hertz\
      Niveles de Potencias: 5\
      Tipo de Control: Digital\
      Reloj digital\
      Timer digital\
      Traba de seguridad para chicos\
      Alarma de Final de Cocción\
      \
      APARIENCIA\
      Cavidad Interior: Silver\
      Cavidad Exterior: Silver\
      \
      FUNCIONES\
      Cocción con Microondas\
      Descongelado por Peso\
      Descongelado por Tiempo\
      Cocción en Múltiples Etapas\
      \
      DIMENSIONES\
      Alto de la unidad: 258 mm\
      Ancho de la unidad: 439 mm\
      Profundidad de la unidad: 355 mm\
      Peso de la unidad: 11,2 kg\
      Alto de la unidad embalada: 315 mm\
      Ancho de la unidad embalada: 495 mm\
      Profundidad de la unidad embalada: 395 mm\
      Peso de la unidad embalada: 13,9 kg\
      Alto de la cavidad: 220 mm\
      Ancho de la cavidad: 300 mm\
      Profundidad de la cavidad: 295 mm\
      \
      ACCESORIOS\
      Plato giratorio\
      Soporte del plato giratorio',
      video: '',
      noShipping: false,
      active: true,
      seller: '607b1b4a7e5ab125f8615e5f',
      questions: [],
      finished: false,
    },
  ],
};

export default data;
