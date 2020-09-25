package com.onboard.security;

import com.onboard.entities.User;
import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
class RegistrationForm {

    private String username;
    private String email;
    private String password;
    private String repeatedPassword;

    User toUser(PasswordEncoder passwordEncoder){
        return new User(username, passwordEncoder.encode(password), email);
    }
}
