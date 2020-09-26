package com.onboard.security;

import com.onboard.entities.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
class RegistrationForm {

    @NotNull
    @Size(min = 3, max = 20, message = "Username must have 3-20 characters")
    private String username;
    @NotNull
    @Email(message = "Invalid email address")
    private String email;
    @NotNull
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$",
            message = "Password must have at least 6 characters, contain at least one capital letter, and at least one digit")
    private String password;
    @NotNull
    private String repeatedPassword;

    User toUser(PasswordEncoder passwordEncoder) {
        return new User(username, passwordEncoder.encode(password), email);
    }
}
