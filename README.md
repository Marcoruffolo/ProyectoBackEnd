# ProyectoBackEnd

Backend de e-commerce construido con Node.js y Express, con base de datos MongoDB Atlas, actualizaciones en tiempo real via Socket.io y renderizado server-side con Handlebars.

---

## Tecnologías

| Tecnología | Versión |
|---|---|
| Node.js | ≥ 18 |
| Express | ^4.x |
| MongoDB (Atlas) | Cloud |
| Mongoose | ^9.4.1 |
| Socket.io | ^4.8.3 |
| Express-Handlebars | ^9.0.1 |
| dotenv | ^17.4.1 |
| nodemon | ^3.x (dev) |

---

## Requisitos previos

- Node.js ≥ 18
- Una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o instancia local de MongoDB)

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd ProyectoBackEnd

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu cadena de conexión a MongoDB
```

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
MONGODB_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/?appName=ProyectoBackEnd
```

---

## Scripts

```bash
npm start       # Inicia el servidor en modo producción
npm run dev     # Inicia el servidor con hot-reload (nodemon)
```

El servidor corre en `http://localhost:8080`.

---

## Estructura del proyecto

```
ProyectoBackEnd/
├── src/
│   ├── app.js                  # Punto de entrada — Express + Socket.io
│   ├── config/
│   │   └── db.js               # Conexión a MongoDB
│   ├── managers/
│   │   ├── productManager.js   # Lógica de negocio — productos
│   │   └── cartManager.js      # Lógica de negocio — carritos
│   ├── models/
│   │   ├── Product.js          # Schema Mongoose de producto
│   │   └── Cart.js             # Schema Mongoose de carrito
│   ├── routes/
│   │   ├── products.router.js  # Rutas /api/products
│   │   └── carts.router.js     # Rutas /api/carts
│   └── views/                  # Templates Handlebars
│       ├── layouts/
│       │   └── main.handlebars
│       ├── home.handlebars
│       ├── product.handlebars
│       ├── cart.handlebars
│       └── realTimeProducts.handlebars
├── data/                       # Archivos JSON locales (legacy)
├── .env                        # Variables de entorno (no commitear)
├── .gitignore
├── package.json
└── README.md
```

---

## API Reference

### Productos — `/api/products`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/products` | Listar productos (paginado, filtrable, ordenable) |
| `GET` | `/api/products/:pid` | Obtener un producto por ID |
| `POST` | `/api/products` | Crear un nuevo producto |
| `PUT` | `/api/products/:pid` | Actualizar un producto |
| `DELETE` | `/api/products/:pid` | Eliminar un producto |

**Query params para `GET /api/products`:**

| Parámetro | Tipo | Default | Descripción |
|---|---|---|---|
| `limit` | Number | 10 | Productos por página |
| `page` | Number | 1 | Número de página |
| `sort` | String | — | `asc` o `desc` (precio) |
| `query` | String | — | Filtrar por categoría |

**Cuerpo para `POST /api/products`:**

```json
{
  "title": "Nombre del producto",
  "description": "Descripción",
  "code": "PROD-001",
  "price": 99.99,
  "status": true,
  "stock": 50,
  "category": "electrónica",
  "thumbnails": ["url-imagen-1", "url-imagen-2"]
}
```

---

### Carritos — `/api/carts`

| Método | Endpoint | Descripción |
|---|---|---|
| `POST` | `/api/carts/` | Crear un nuevo carrito |
| `GET` | `/api/carts/:cid` | Obtener carrito por ID (con productos populados) |
| `POST` | `/api/carts/:cid/product/:pid` | Agregar producto al carrito (suma cantidad si ya existe) |
| `PUT` | `/api/carts/:cid/products/:pid` | Actualizar cantidad de un producto |
| `PUT` | `/api/carts/:cid` | Reemplazar todo el contenido del carrito |
| `DELETE` | `/api/carts/:cid/products/:pid` | Eliminar un producto del carrito |
| `DELETE` | `/api/carts/:cid` | Vaciar el carrito |

---

### Vistas (server-rendered)

| Ruta | Descripción |
|---|---|
| `/products` | Listado de productos |
| `/products/:pid` | Detalle de un producto |
| `/carts/:cid` | Vista del carrito |
| `/realTimeProducts` | Gestión de productos en tiempo real (Socket.io) |

---

## Tiempo real con Socket.io

La página `/realTimeProducts` habilita la creación y eliminación de productos sin recargar la página.

**Eventos del servidor:**
- `updateProducts` — emitido a todos los clientes cuando se agrega o elimina un producto.

**Eventos del cliente:**
- `newProduct` — enviar datos de un nuevo producto.
- `deleteProduct` — enviar ID del producto a eliminar.

---

## Modelos de datos

### Product

```js
{
  title:       String,
  description: String,
  code:        String,
  price:       Number,
  status:      Boolean,
  stock:       Number,
  category:    String,
  thumbnails:  [String]
}
```

### Cart

```js
{
  products: [
    {
      product:  ObjectId,  // ref: "Product"
      quantity: Number
    }
  ]
}
```

---

## Licencia

MIT — ver [LICENSE](LICENSE).
