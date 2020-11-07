CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email text UNIQUE NOT NULL,
  joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
  id serial PRIMARY key,
  hash VARCHAR(100) NOT NULL,
  email text UNIQUE NOT NULL
)

INSERT INTO users (name, email, joined)
VALUES ('vho', 'vho@mail.com', NOW()), ('betty', 'betty@mail.com', NOW())