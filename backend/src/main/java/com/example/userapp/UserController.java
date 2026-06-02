package com.example.userapp;

import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * THIS IS THE API.
 *
 * A REST Controller is the bridge between HTTP requests (from your Angular frontend)
 * and your application logic. Each method here corresponds to an HTTP endpoint.
 *
 * @RestController       — Spring auto-converts Java objects to/from JSON.
 * @RequestMapping("/api/users") — Every endpoint here starts with /api/users.
 * @CrossOrigin          — Allows the Angular dev server (port 4200) to call this API.
 *                         (Without this, browsers block cross-origin requests.)
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserRepository userRepository;

    // Spring automatically injects the UserRepository here (dependency injection).
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * GET /api/users
     * Returns a list of all users as JSON.
     *
     * Example response:
     *   [
     *     { "id": 1, "name": "Aman", "age": 22 },
     *     { "id": 2, "name": "Priya", "age": 25 }
     *   ]
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * POST /api/users
     * Accepts JSON like { "name": "Aman", "age": 22 } in the request body,
     * saves it to the database, and returns the saved user (now with an `id`).
     *
     * @RequestBody tells Spring: "convert the incoming JSON into a User object".
     */
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }
}
