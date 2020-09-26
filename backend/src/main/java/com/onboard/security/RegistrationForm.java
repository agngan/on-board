package com.onboard.security;

import com.onboard.entities.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
class RegistrationForm {

    @NotNull
    @Size(min=3, max=20, message = "Username must have 3-20 characters")
    private String username;
    @NotNull
    @Email(message = "Invalid email address")
    private String email;
    @NotNull
    @Size(min=6, message = "Password must have at least 6 characters")
    private String password;
    @NotNull
    @Size(min=6, message = "Password must have at least 6 characters")
    private String repeatedPassword;

    User toUser(PasswordEncoder passwordEncoder){
        return new User(username, passwordEncoder.encode(password), email);
    }
}
