package com.bookstore.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * User Response DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private String id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private String address;
    private Boolean active;
    private Boolean emailVerified;
    private Set<String> roles;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
}


