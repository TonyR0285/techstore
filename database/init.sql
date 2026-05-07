CREATE DATABASE IF NOT EXISTS techstore_db;
USE techstore_db;

CREATE TABLE usuarios (
  id_usuario   INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL,
  correo       VARCHAR(100) NOT NULL UNIQUE,
  password     VARCHAR(255) NOT NULL,
  rol          VARCHAR(30)  NOT NULL DEFAULT 'cliente',
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categorias (
  id_categoria INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(100) NOT NULL
);

CREATE TABLE productos (
  id_producto  INT AUTO_INCREMENT PRIMARY KEY,
  nombre       VARCHAR(150) NOT NULL,
  descripcion  TEXT,
  precio       DECIMAL(10,2) NOT NULL,
  stock        INT NOT NULL DEFAULT 0,
  imagen       VARCHAR(255),
  id_categoria INT,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

CREATE TABLE pedidos (
  id_pedido  INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NOT NULL,
  total      DECIMAL(10,2) NOT NULL,
  estado     VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  direccion  VARCHAR(255),
  fecha      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE detalle_pedido (
  id_detalle  INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido   INT NOT NULL,
  id_producto INT NOT NULL,
  cantidad    INT NOT NULL,
  precio      DECIMAL(10,2) NOT NULL,
  subtotal    DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (id_pedido)   REFERENCES pedidos(id_pedido),
  FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);

CREATE TABLE pagos (
  id_pago      INT AUTO_INCREMENT PRIMARY KEY,
  id_pedido    INT NOT NULL,
  metodo_pago  VARCHAR(50) NOT NULL,
  estado_pago  VARCHAR(30) NOT NULL DEFAULT 'pendiente',
  fecha_pago   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido)
);

-- Datos iniciales
INSERT INTO categorias (nombre) VALUES
  ('Laptops'), ('Celulares'), ('Audio'), ('Gaming'), ('Accesorios'), ('Monitores');

INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES
  ('Laptop Pro 14',          'Laptop para trabajo profesional y estudio.',      3499.00, 15, 1),
  ('Smartphone X5',          'Celular de gama media-alta con cámara 108MP.',    1599.00, 25, 2),
  ('Audífonos Bluetooth Pro','Audífonos inalámbricos con cancelación de ruido.',  249.00, 40, 3),
  ('Mouse Gamer RGB',        'Mouse ergonómico 16000 DPI para videojuegos.',       89.00, 60, 4),
  ('Teclado Mecánico RGB',   'Teclado mecánico retroiluminado switches Blue.',    199.00, 35, 5),
  ('Monitor 24" Full HD',    'Monitor IPS 144Hz para oficina y gaming casual.',   699.00, 20, 6);

INSERT INTO usuarios (nombre, correo, password, rol) VALUES
  ('Admin TechStore', 'admin@techstore.com', '$2b$10$hashedpassword', 'admin');
