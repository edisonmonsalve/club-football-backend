DROP DATABASE IF EXISTS dbappfc;
CREATE DATABASE dbappfc;

USE dbappfc;

CREATE TABLE roles (
  id INT AUTO_INCREMENT,
  title VARCHAR(20) NOT NULL UNIQUE,
  description TINYTEXT,
  PRIMARY KEY(id)
);
INSERT INTO roles (id, title, description)
VALUES 
(1, 'user', "ve y comenta post"),
(2, 'admin', "administrador general"),
(3, 'editor', "crea post");

CREATE TABLE permissions (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL UNIQUE,
  description TINYTEXT,
  PRIMARY KEY(id)
);
INSERT INTO permissions (id, title, description) 
VALUES
(1, "Administrar Usuarios", "ej. Administrador"),
(2, "Crear Noticias", "ej. Administrador, editor"),
(3, "Editar Noticias", "ej. Administrador, editor"),
(4, "Eliminar Noticias", "ej. Administrador, editor"),
(5, "Comentar Noticias", "ej. Administrador, editor, usuario"),
(6, "Moderar Comentarios", "ej. Administrador, editor");

CREATE TABLE roles_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  FOREIGN KEY(role_id) REFERENCES roles(id),
  FOREIGN KEY(permission_id) REFERENCES permissions(id),
  PRIMARY KEY(role_id, permission_id)
);
INSERT INTO roles_permissions (role_id, permission_id)
VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4),
(2, 5),
(2, 6),
(1, 5),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6);


CREATE TABLE users (
  id INT AUTO_INCREMENT,
  role_id INT NOT NULL,
  name VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES roles(id)
);
INSERT INTO users(role_id, name, email, password)
VALUES 
(2, "appfcteam", "email@appfc.team", "password"),
(3, "appfceditor", "emaileditor@appfc.team", "password"),
(1, "user1p", "user@email", "password"),
(1, "user2", "user2@email", "password");


CREATE TABLE news_categories (
  id INT AUTO_INCREMENT,
  title VARCHAR(45) NOT NULL UNIQUE,
  description TINYTEXT,
  PRIMARY KEY(id)
);
INSERT INTO news_categories (title, description)
VALUES
("General", "Noticias generales de informacion o cambios en la aplicacion"),
("Resultados de Partidos", "Incluye detalles sobre los partidos jugados, como el marcador, el resumen del juego y el desempeño de los jugadores."),
("Fichajes y Transferencias", "Noticias sobre jugadores que llegan o se van del club, así como rumores de fichajes y negociaciones."),
("Lesiones y Recuperaciones", "Información sobre lesiones de jugadores, su pronóstico y su proceso de recuperación."),
("Rendimiento de Jugadores", "Análisis del desempeño individual de los jugadores, incluyendo estadísticas y críticas de expertos."),
("Tácticas y Estrategias", "Discusión sobre las tácticas empleadas por el entrenador y cómo estas afectan el rendimiento del equipo."),
("Declaraciones y Entrevistas", "Comentarios de jugadores, entrenadores, directivos y otras personalidades del club."),
("Eventos y Actividades del Club", "Información sobre eventos especiales, actividades comunitarias, y celebraciones relacionadas con el club."),
("Finanzas y Gestión", "Noticias sobre la situación financiera del club, inversiones, y aspectos administrativos."),
("Desarrollo Juvenil", "Información sobre la cantera del club, incluyendo el desempeño de los jóvenes talentos y su progresión."),
("Historial y Estadísticas", "Noticias sobre récords, estadísticas históricas y eventos importantes en la historia del club.");

CREATE TABLE news (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(150) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(255) DEFAULT 'https://esferapublica.org/wp-content/themes/miyazaki/assets/images/default-fallback-image.png',
  author_id INT NOT NULL,
  category_id INT NOT NULL DEFAULT 1,
  state ENUM('Published', 'Pending') DEFAULT 'published',
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  FOREIGN KEY(category_id) REFERENCES news_categories(id),
  FOREIGN KEY(author_id) REFERENCES users(id)
  );
INSERT INTO news (title, content, author_id, category_id)
VALUES
("Testing", "Un nuevo comienzo...", (select id from users where role_id = (select id from roles where title = "admin")), 7),
("Debug", "", 1, default),
("DEBUT SOÑANO", "The great pass of the season with APPFC TEAM 🟩", 2, 3);


CREATE TABLE comments (
  id INT AUTO_INCREMENT,
  content TEXT NOT NULL,
  new_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`id`),
  FOREIGN KEY(new_id) REFERENCES news(id),
  FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO comments (content, new_id, user_id) 
VALUES 
("comment for test", 1, 1),
("comment for debug", 2, 1);

SHOW tables;
