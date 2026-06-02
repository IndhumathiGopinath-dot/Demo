package com.example.userapp;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * The repository is the layer that talks to the database.
 *
 * By extending JpaRepository<User, Long>, we get methods like:
 *   - save(user)       -> INSERT or UPDATE
 *   - findAll()        -> SELECT * FROM users
 *   - findById(id)     -> SELECT * FROM users WHERE id = ?
 *   - deleteById(id)   -> DELETE FROM users WHERE id = ?
 *
 * We didn't have to write any SQL — Spring Data JPA generates it for us.
 * This is one of the magical things about Spring Boot.
 */
public interface UserRepository extends JpaRepository<User, Long> {
}
