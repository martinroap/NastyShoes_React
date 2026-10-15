# NastyShoes

Tienda de zapatillas hecha con React y React Bootstrap, basada en la planilla de requerimientos del proyecto. Toda la información funciona en memoria (sin backend ni base de datos), por lo que cada ejecución comienza con el mismo catálogo, usuarios y pedidos.

## Requisitos

- Node.js 20.19+ o 22.12+
- npm

## Ejecutar

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite (normalmente `http://localhost:5173`).

```bash
npm run build      # compilación de producción
npm test           # pruebas unitarias
npm run coverage   # pruebas con reporte de cobertura
```

## Cuenta de administrador de prueba

- Correo: `admin@nastyshoes.cl`
- Contraseña: `admin123`

Cualquier otra cuenta se crea desde "Ingresar → Crear cuenta" y queda con rol **cliente**.

## Estructura del proyecto

| Carpeta | Contenido |
| --- | --- |
| `src/compose` | Componentes de interfaz (catálogo, carrito, checkout, cuenta, administración). |
| `src/data` | Datos iniciales (productos, usuarios) y lógica pura (carrito, pedidos). |
| `src/test` | Pruebas unitarias con Vitest y React Testing Library. |

## Dónde agregar tus zapatillas

Las imágenes y los nombres reales de cada zapatilla se agregan en [`src/data/products.js`](src/data/products.js): completa el campo `image` con la ruta de la foto y `name` con el nombre del modelo. El resto de los campos (marca, precio, stock, tallas, categoría, descripción) ya tiene datos de ejemplo.

## Requerimientos cubiertos

| Requerimiento | Dónde se implementa |
| --- | --- |
| R.1 Registro de clientes | `AccountPanel` + `data/users.js` |
| R.2 Inicio / cierre de sesión | `AccountPanel`, `Header` |
| R.3 Catálogo de zapatillas | `ProductCard`, catálogo en `App` |
| R.4 Búsqueda y filtrado | `ProductFilters` |
| R.5 Detalle del producto | `ProductDetailModal` |
| R.6 Carrito de compra | `CartView` + `data/cart.js` |
| R.7 Proceso de compra | `CheckoutForm` |
| R.8 Gestión de pagos (simulada) | `data/orders.js` (`validatePayment`) |
| R.9 Confirmación y seguimiento de pedidos | `OrderConfirmation`, `AccountPanel` (mis pedidos), `AdminOrders` |
| R.10 Gestión de productos e inventario | `AdminProducts` |
| R.11 Gestión de pedidos | `AdminOrders` |
| R.12 Seguridad de acceso | Contraseñas no se guardan en texto plano; panel de administración solo visible para rol `admin` |
| R.13–R.15 (rendimiento, usabilidad, privacidad) | Diseño simple y responsivo con React Bootstrap; nota de privacidad en el pie de página |

No se incluye una pasarela de pago real: el pago se simula validando el formato de los datos de la tarjeta.
