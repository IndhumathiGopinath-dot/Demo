package com.example.userapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * The entry point of the Spring Boot application.
 *
 * When you run this, Spring Boot:
 *   1. Starts an embedded Tomcat web server on port 8080.
 *   2. Scans the package for @Component, @Service, @Repository, @Controller.
 *   3. Connects to MySQL using the credentials in application.properties.
 *   4. Creates the `users` table if it doesn't exist.
 */
@SpringBootApplication
public class UserAppApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserAppApplication.class, args);
    }
}
