package com.example.userapp;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Maps the Java class `User` to the database table `users`.
 *
 * One instance of this class = one row in the table.
 *   - id   -> primary key column, auto-incremented by MySQL
 *   - name -> name column
 *   - age  -> age column
 *
 * @Data (from Lombok) auto-generates getters, setters, toString, equals, hashCode.
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Integer age;
}
