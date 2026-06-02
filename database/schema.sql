-- Run this once in MySQL before starting the backend.
-- Open MySQL Workbench or the mysql CLI and execute these commands.

CREATE DATABASE IF NOT EXISTS userapp;

USE userapp;

-- Note: You don't actually need to create the `users` table manually.
-- Spring Boot/JPA will create it for you based on the User.java entity
-- because we set `spring.jpa.hibernate.ddl-auto=update` in application.properties.
-- But here's what the table will look like, for your reference:

-- CREATE TABLE users (
--   id BIGINT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255) NOT NULL,
--   age INT NOT NULL
-- );
