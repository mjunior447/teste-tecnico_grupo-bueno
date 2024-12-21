CREATE DATABASE user_db;
USE user_db;

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (name, email)
VALUES
('adalberto', 'adalb@mail.com'),
('jucelina', 'jucel@mail.com');